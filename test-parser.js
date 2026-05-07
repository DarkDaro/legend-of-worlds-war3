#!/usr/bin/env node
/**
 * item-bonus-parser — тест-утилита
 * ================================
 * Запуск:  node test-parser.js
 *          node test-parser.js --verbose
 *          node test-parser.js --only anomalies
 *
 * Что делает:
 * 1. Сканирует все предметы из itemsDB и ищет аномалии парсера
 * 2. Прогоняет unit-тесты на конкретные паттерны описаний
 * 3. Показывает покрытие: сколько предметов распознано, сколько без бонусов
 *
 * Полезно:
 * — после добавления новых предметов в itemsDB
 * — после изменения паттернов в item-bonus-parser.js
 * — для быстрой проверки «не сломал ли я что-то»
 */

const fs = require('fs');
const path = require('path');

const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');
const ONLY = (process.argv.find(a => a.startsWith('--only=')) || '').replace('--only=', '');

// ── Загрузка itemsDB (без DOM-зависимостей) ──

function loadItemsDB() {
  const code = fs.readFileSync(path.join(__dirname, 'items-db.js'), 'utf8');
  const declStart = code.indexOf('const itemsDB = {');
  if (declStart === -1) throw new Error('itemsDB not found in items-db.js');

  let braceCount = 0;
  let objEnd = -1;
  for (let i = declStart; i < code.length; i++) {
    if (code[i] === '{') braceCount++;
    if (code[i] === '}') {
      braceCount--;
      if (braceCount === 0) { objEnd = i; break; }
    }
  }
  const objCode = code.substring(declStart, objEnd + 1).replace('const itemsDB = ', '');
  return eval('(' + objCode + ')');
}

const itemsDB = loadItemsDB();
const p = require('./item-bonus-parser.js');

// ── Утилиты ──

function fmt(bonus) {
  const parts = [];
  Object.entries(bonus).forEach(([k, v]) => {
    if (v > 0) parts.push(k + ':' + v);
  });
  return parts.length ? '{' + parts.join(', ') + '}' : '(empty)';
}

// ── 1. Сканирование всех предметов ──

function scanAllItems() {
  const anomalies = [];
  const zeroItems = [];
  let totalCount = Object.keys(itemsDB).length;

  Object.entries(itemsDB).forEach(([id, item]) => {
    const b = p.parseDescription(item.description || '');
    const hasAny = Object.values(b).some(v => v > 0);
    if (!hasAny) {
      zeroItems.push({ id, name: item.name, desc: item.description });
      return;
    }

    // Значения вне разумного диапазона
    if (b.strength > 500 || b.agility > 500 || b.intelligence > 500 ||
        b.hp > 50000 || b.mana > 50000 || b.attack > 10000 || b.armor > 500) {
      anomalies.push({ id, name: item.name, reason: 'value_out_of_range', desc: item.description, bonus: b });
    }

    // allStats + одиночный атрибут = возможный двойной счёт
    if (b.allStats > 0 && (b.strength > 0 || b.agility > 0 || b.intelligence > 0)) {
      const text = (item.description || '').toLowerCase();
      if (text.includes('ко всем атрибутам') && text.includes('сил'))
        anomalies.push({ id, name: item.name, reason: 'allStats+singleAttr', desc: item.description });
    }

    // «здоровья и маны» — hp и mana должны совпадать
    const text = (item.description || '').toLowerCase();
    if (text.includes('здоровья и маны') && (b.hp !== b.mana)) {
      anomalies.push({ id, name: item.name, reason: 'hp_mana_mismatch', desc: item.description, bonus: b });
    }

    // «мана за атаку» не должна попадать в mana
    if (b.mana > 0 && text.includes('ман') && text.match(/ман[ыа]?\s+(за|при)\s+атак/)) {
      anomalies.push({ id, name: item.name, reason: 'mana_on_attack_in_mana', desc: item.description, bonus: b });
    }
  });

  const recognizedCount = totalCount - zeroItems.length;

  console.log('╔══════════════════════════════════════╗');
  console.log('║   Скан предметов                    ║');
  console.log('╠══════════════════════════════════════╣');
  console.log('║ Всего предметов:     ' + String(totalCount).padEnd(14) + '║');
  console.log('║ Распознано бонусов:  ' + String(recognizedCount).padEnd(14) + '║');
  console.log('║ Без бонусов:         ' + String(zeroItems.length).padEnd(14) + '║');
  console.log('║ Аномалии:            ' + String(anomalies.length).padEnd(14) + '║');
  console.log('╚══════════════════════════════════════╝');

  if (VERBOSE || ONLY === 'anomalies') {
    if (anomalies.length) {
      console.log('\n⚠️  Аномалии:');
      anomalies.forEach(a => {
        console.log('  ' + a.id + ' ' + a.name + ' — ' + a.reason);
        console.log('    desc: ' + a.desc);
        if (a.bonus) console.log('    bonus: ' + fmt(a.bonus));
      });
    }
    if (zeroItems.length) {
      console.log('\n📭 Предметы без распознанных бонусов:');
      zeroItems.forEach(a => {
        console.log('  ' + a.id + ' ' + a.name + (a.desc ? ' → ' + a.desc : ''));
      });
    }
  }

  return { totalCount, recognizedCount, zeroItems, anomalies };
}

// ── 2. Unit-тесты ──

const unitTests = [
  // Базовые статы
  { desc: '+9 атаки',                              expect: { attack: 9 } },
  { desc: '+4 защиты',                             expect: { armor: 4 } },
  { desc: '+300 здоровья',                          expect: { hp: 300 } },
  { desc: '+300 маны',                             expect: { mana: 300 } },

  // Атрибуты
  { desc: '+1 ко всем атрибутам',                  expect: { allStats: 1 } },
  { desc: '+20 силы',                              expect: { strength: 20 } },
  { desc: '+30 ловкости',                           expect: { agility: 30 } },
  { desc: '+55 разума',                            expect: { intelligence: 55 } },

  // Комбинированные атрибуты
  { desc: '+30 силы/ловкости',                      expect: { strength: 30, agility: 30 } },
  { desc: '+25 ловкости/разума',                    expect: { agility: 25, intelligence: 25 } },
  { desc: '+50 силы/ловкости',                      expect: { strength: 50, agility: 50 } },
  { desc: '+120 силы/ловкости',                     expect: { strength: 120, agility: 120 } },

  // Здоровья и маны вместе
  { desc: '+600 здоровья и маны',                   expect: { hp: 600, mana: 600 } },
  { desc: '+500 здоровья и маны',                   expect: { hp: 500, mana: 500 } },

  // Скорости
  { desc: '+40 скорости бега',                     expect: { movementSpeedFlat: 40 } },
  { desc: '+10% скорости боя',                      expect: { attackSpeedPct: 10 } },
  { desc: '+20% скорости атаки',                    expect: { attackSpeedPct: 20 } },
  { desc: '+20 скорости боя',                       expect: { attackSpeedPct: 20 } },

  // Мана при атаке
  { desc: '+15 маны за атаку',                      expect: { manaOnAttack: 15 } },
  { desc: '+5 маны при атаке',                      expect: { manaOnAttack: 5 } },

  // Регенерация
  { desc: '+180% регенерации маны',                 expect: { manaRegenPct: 180 } },
  { desc: '+100 регенерации здоровья',              expect: { hpRegenFlat: 100 } },
  { desc: '+6% регенерации здоровья/сек вне боя',   expect: { hpRegenPct: 6 } },

  // Защита и уклонение
  { desc: '+15% маг. защита',                       expect: { magicDefensePct: 15 } },
  { desc: '+20% уклонение',                         expect: { evasionPct: 20 } },

  // Спецэффекты
  { desc: '+30% доп. урон заклинаний',              expect: { spellDamagePct: 30 } },

  // Условные бонусы — НЕ должны парситься
  { desc: '+3 ко всем атрибутам за убийство героя', expect: { allStats: 0 } },

  // Сложные реальные описания
  { desc: '+20 силы, +300 атаки, +100% скорости боя',
    expect: { strength: 20, attack: 300, attackSpeedPct: 100 } },
  { desc: '+70 силы, +3000 здоровья, +25% маг. защита, +20% уклонение, +25 ловкости/разума, +15 защиты, +6% регенерации здоровья/сек вне боя',
    expect: { strength: 70, hp: 3000, magicDefensePct: 25, evasionPct: 20, agility: 25, intelligence: 25, armor: 15, hpRegenPct: 6 } },
  { desc: '+600 ко всем атрибутам, +3000 здоровья и маны, +100% усиление лечения, +30% доп. урон заклинаний',
    expect: { allStats: 600, hp: 3000, mana: 3000, spellDamagePct: 30 } },

  // Граничные случаи
  { desc: '',    expect: {} },
  { desc: null,  expect: {} },
  { desc: '10% вампиризм (Орб. эффект)', expect: { vampirismPct: 10 } },
  { desc: '+5% магический вампиризм (на урон >10)', expect: { magicVampirismPct: 5 } },
  { desc: '+5% магический блок (на урон >10)', expect: { magicBlockPct: 5 } },
  { desc: '+10% сопротивление к оглушению', expect: { stunResistPct: 10 } },
  { desc: '+15% сопротивление к сожжению маны', expect: { manaBurnResistPct: 15 } },
  { desc: 'Аура защиты 2 ед. (пассив)', expect: { auraArmor: 2 } },
  { desc: 'Аура скорости (5% AS, 10% MS)', expect: { auraAttackSpeedPct: 5, auraMoveSpeedPct: 10 } },
  { desc: '+50% восстановления маны', expect: { manaRegenPct: 50 } },
  { desc: 'Используется для сборки.',   expect: {} },
];

function runUnitTests() {
  let pass = 0;
  let fail = 0;
  const failures = [];

  unitTests.forEach(t => {
    const b = p.parseDescription(t.desc);
    const testedKeys = new Set();

    // Проверяем ожидаемые ключи
    Object.entries(t.expect).forEach(([k, v]) => {
      testedKeys.add(k);
      if (b[k] !== v) {
        failures.push({ desc: t.desc, key: k, expected: v, got: b[k] });
        fail++;
      } else {
        pass++;
      }
    });

    // Проверяем, что нет лишних распознанных ключей
    Object.keys(b).forEach(k => {
      if (b[k] > 0 && !testedKeys.has(k) && t.expect[k] === undefined) {
        failures.push({ desc: t.desc, key: k, expected: '0 (absent)', got: b[k], extra: true });
        fail++;
      }
    });
  });

  console.log('\n╔══════════════════════════════════════╗');
  console.log('║   Unit-тесты                         ║');
  console.log('╠══════════════════════════════════════╣');
  console.log('║ Тестов:     ' + String(unitTests.length).padEnd(14) + '║');
  console.log('║ Проверок:   ' + String(pass + fail).padEnd(14) + '║');
  console.log('║ Pass:       ' + String(pass).padEnd(14) + '║');
  console.log('║ Fail:       ' + String(fail).padEnd(14) + '║');
  console.log('╚══════════════════════════════════════╝');

  if (failures.length) {
    console.log('\n❌ Ошибки:');
    failures.forEach(f => {
      const tag = f.extra ? 'EXTRA' : 'FAIL';
      console.log('  [' + tag + '] ' + JSON.stringify(f.desc) + ' | ' + f.key + ': expected=' + f.expected + ' got=' + f.got);
    });
  } else {
    console.log('\n✅ Все проверки пройдены');
  }

  return { pass, fail, failures };
}

// ── Запуск ──

console.log('🧪 item-bonus-parser test suite\n');

const scanResult = scanAllItems();
const testResult = runUnitTests();

console.log('\n' + (testResult.fail > 0 ? '❌' : '✅') + ' Итого: ' + testResult.pass + '/' + (testResult.pass + testResult.fail) + ' проверок, ' + scanResult.anomalies.length + ' аномалий');

process.exit(testResult.fail > 0 || scanResult.anomalies.length > 0 ? 1 : 0);
