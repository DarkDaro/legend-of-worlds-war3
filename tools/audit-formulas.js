// Аудит формул страницы сравнения
// Проверяем все формулы compare.html на конкретных героях

// Загружаем константы и данные
const GC = {
  ARMOR_C: 0.05,
  AGI_ARMOR_FACTOR: 0.05,
  STR_HP_FACTOR: 20,
  INT_MP_FACTOR: 15,
  AGI_ATK_SPEED_FACTOR: 0.01,
  STR_HP_REGEN_FACTOR: 0.05,
  INT_MP_REGEN_FACTOR: 0.05,
  MP_REGEN_BASE: 0.01
};

// Берём тестового героя с полными данными: Адмирал
const hero = {
  id: 'admiral', name: 'Адмирал', attr: 'strength',
  stats: { hp: 650, mp: 150, atk: 25, def: 2, atkSpeed: 2.0, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150,
           strBase: 28, strGain: 3, agiBase: 14, agiGain: 2, intBase: 18, intGain: 2 }
};

// Берём второго: Киборг
const hero2 = {
  id: 'cyborg', name: 'Киборг', attr: 'strength',
  stats: { hp: 650, mp: 150, atk: 25, def: 2, atkSpeed: 2.0, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 150,
           strBase: 20, strGain: 3, agiBase: 16, agiGain: 2, intBase: 24, intGain: 2 }
};

let errors = [];

function getAttrTotal(h, attr, level) {
  if (attr === 'strength') return h.stats.strBase + h.stats.strGain * (level - 1);
  if (attr === 'agility') return h.stats.agiBase + h.stats.agiGain * (level - 1);
  if (attr === 'intelligence') return h.stats.intBase + h.stats.intGain * (level - 1);
  return 0;
}

// Формула: HP = base + totalStr * 20
function calcHP(h, level) {
  return Math.round(h.stats.hp + getAttrTotal(h, 'strength', level) * GC.STR_HP_FACTOR);
}

// Формула: MP = base + totalInt * 15
function calcMP(h, level) {
  return Math.round(h.stats.mp + getAttrTotal(h, 'intelligence', level) * GC.INT_MP_FACTOR);
}

// Формула: Урон = baseAtk + (mainTotal - mainBase)
function calcAttack(h, level) {
  var mainBase = getAttrTotal(h, h.attr, 1); // базовый атрибут на уровне 1
  var mainTotal = getAttrTotal(h, h.attr, level);
  return Math.round(h.stats.atk + (mainTotal - mainBase));
}

// Формула: Броня = baseDef + (totalAgiArmor - baseAgiArmor)
function calcArmor(h, level) {
  var baseAgiArmor = Math.floor(h.stats.agiBase * GC.AGI_ARMOR_FACTOR);
  var totalAgiArmor = Math.floor(getAttrTotal(h, 'agility', level) * GC.AGI_ARMOR_FACTOR);
  return +(h.stats.def + (totalAgiArmor - baseAgiArmor)).toFixed(1);
}

// Формула: Снижение урона = (armor * C) / (1 + armor * C)
function calcDamageReduction(armor) {
  return ((armor * GC.ARMOR_C) / (1 + armor * GC.ARMOR_C) * 100).toFixed(1);
}

// Формула: Скорость атаки = 1 + totalAgi * 0.01
function calcAttackSpeed(h, level) {
  return +(1 + getAttrTotal(h, 'agility', level) * GC.AGI_ATK_SPEED_FACTOR).toFixed(3);
}

// Формула: Реген HP = baseRegen + totalStr * 0.05
function calcHpRegen(h, level) {
  return +((h.stats.hpRegen || 0) + getAttrTotal(h, 'strength', level) * GC.STR_HP_REGEN_FACTOR).toFixed(2);
}

// Формула: Реген MP = baseRegen + totalInt * 0.05
function calcMpRegen(h, level) {
  return +((h.stats.mpRegen || GC.MP_REGEN_BASE) + getAttrTotal(h, 'intelligence', level) * GC.INT_MP_REGEN_FACTOR).toFixed(2);
}

// ── Проверка на уровне 1 ──
console.log('=== ПРОВЕРКА ФОРМУЛ НА УРОВНЕ 1 ===\n');

var level = 1;
console.log('Адмирал (ур.1):');
console.log('  Сила: ' + getAttrTotal(hero, 'strength', level) + ' (ожид. 28)');
console.log('  Ловкость: ' + getAttrTotal(hero, 'agility', level) + ' (ожид. 14)');
console.log('  Разум: ' + getAttrTotal(hero, 'intelligence', level) + ' (ожид. 18)');
console.log('  HP: ' + calcHP(hero, level) + ' (ожид. 650 + 28*20 = 1210)');
console.log('  MP: ' + calcMP(hero, level) + ' (ожид. 150 + 18*15 = 420)');
console.log('  Урон: ' + calcAttack(hero, level) + ' (ожид. 25 + 0 = 25)');
console.log('  Броня: ' + calcArmor(hero, level) + ' (ожид. 2 + 0 = 2)');
console.log('  Снижение: ' + calcDamageReduction(calcArmor(hero, level)) + '% (ожид. ' + calcDamageReduction(2) + '%)');
console.log('  Скор.атаки: ' + calcAttackSpeed(hero, level) + ' (ожид. 1 + 14*0.01 = 1.14)');
console.log('  Реген HP: ' + calcHpRegen(hero, level) + ' (ожид. 1 + 28*0.05 = 2.4)');
console.log('  Реген MP: ' + calcMpRegen(hero, level) + ' (ожид. 0.01 + 18*0.05 = 0.91)');

// ── Проверка на уровне 10 ──
console.log('\n=== ПРОВЕРКА ФОРМУЛ НА УРОВНЕ 10 ===\n');

level = 10;
console.log('Адмирал (ур.10):');
var str10 = 28 + 3 * 9; // 55
var agi10 = 14 + 2 * 9; // 32
var int10 = 18 + 2 * 9; // 36
console.log('  Сила: ' + getAttrTotal(hero, 'strength', level) + ' (ожид. ' + str10 + ')');
console.log('  Ловкость: ' + getAttrTotal(hero, 'agility', level) + ' (ожид. ' + agi10 + ')');
console.log('  Разум: ' + getAttrTotal(hero, 'intelligence', level) + ' (ожид. ' + int10 + ')');
console.log('  HP: ' + calcHP(hero, level) + ' (ожид. ' + (650 + str10 * 20) + ')');
console.log('  MP: ' + calcMP(hero, level) + ' (ожид. ' + (150 + int10 * 15) + ')');
console.log('  Урон: ' + calcAttack(hero, level) + ' (ожид. ' + (25 + (str10 - 28)) + ')');
console.log('  Броня: ' + calcArmor(hero, level) + ' (ожид. ' + (2 + Math.floor(agi10 * 0.05) - Math.floor(14 * 0.05)) + ')');
console.log('  Скор.атаки: ' + calcAttackSpeed(hero, level) + ' (ожид. ' + (1 + agi10 * 0.01).toFixed(3) + ')');

// ── Проверка формулы брони ──
console.log('\n=== ПРОВЕРКА ФОРМУЛЫ БРОНИ ===\n');
var testArmors = [0, 1, 2, 5, 10, 20, 50];
testArmors.forEach(function(a) {
  var reduction = (a * GC.ARMOR_C) / (1 + a * GC.ARMOR_C);
  console.log('  Броня ' + a + ' → снижение ' + (reduction * 100).toFixed(1) + '%');
});

// ── Проверка что compare.html фильтрует героев без полных данных ──
console.log('\n=== ПРОВЕРКА ФИЛЬТРАЦИИ ГЕРОЕВ ===\n');

eval(require('fs').readFileSync(require('path').join(__dirname, '..', 'hero-data.js'), 'utf8'));
var compareData = {};
HEROES_DATA.forEach(function(h) {
  if (!h.strBase || !h.hp) return; // фильтр из compare.html
  compareData[h.heroId] = true;
});
var inCompare = Object.keys(compareData);
var notInCompare = HEROES_DATA.filter(function(h) { return !compareData[h.heroId]; }).map(function(h) { return h.heroId + ' (' + h.name + ')'; });

console.log('Героев в сравнении: ' + inCompare.length + ' из ' + HEROES_DATA.length);
if (notInCompare.length > 0) {
  console.log('Не попадают в сравнение (нет полных данных):');
  notInCompare.forEach(function(n) { console.log('  ' + n); });
}

// ── Проверка формулы урона ──
console.log('\n=== ПРОВЕРКА ФОРМУЛЫ УРОНА ===\n');
// Урон = baseAtk + (mainTotal - mainBase)
// Это значит на уровне 1 урон = baseAtk (т.к. mainTotal = mainBase)
// На уровне N: урон = baseAtk + mainGain * (N-1)
console.log('Адмирал урон ур.1: ' + calcAttack(hero, 1) + ' (ожид. 25)');
console.log('Адмирал урон ур.10: ' + calcAttack(hero, 10) + ' (ожид. ' + (25 + 3*9) + ')');
console.log('Киборг урон ур.1: ' + calcAttack(hero2, 1) + ' (ожид. 25)');
console.log('Киборг урон ур.10: ' + calcAttack(hero2, 10) + ' (ожид. ' + (25 + 3*9) + ')');

// ── Проверка: Герой-ловкач (Иллюзионист) ──
var heroIllu = {
  id: 'illusionist', name: 'Иллюзионист', attr: 'agility',
  stats: { hp: 200, mp: 150, atk: 70, def: 4, atkSpeed: 1.7, hpRegen: 0.50, mpRegen: 0.01, speed: 320, range: 150,
           strBase: 17, strGain: 2, agiBase: 22, agiGain: 3, intBase: 13, intGain: 2 }
};
console.log('\nИллюзионист (ловкость, ур.1):');
console.log('  HP: ' + calcHP(heroIllu, 1) + ' (ожид. ' + (200 + 17*20) + ')');
console.log('  MP: ' + calcMP(heroIllu, 1) + ' (ожид. ' + (150 + 13*15) + ')');
console.log('  Урон: ' + calcAttack(heroIllu, 1) + ' (ожид. 70, осн.атр=ловкость)');
console.log('  Броня: ' + calcArmor(heroIllu, 1) + ' (ожид. ' + (4 + Math.floor(22*0.05) - Math.floor(22*0.05)) + ')');

console.log('\n=== ИТОГ ===');
console.log('Формулы проверены. Если все значения совпадают — всё корректно.');
