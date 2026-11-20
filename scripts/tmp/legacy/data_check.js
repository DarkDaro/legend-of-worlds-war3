// Сверка данных items-db.js / hero-builds.js / bot-builds.js / jass-data.js с логикой страниц.
// Запуск: node /home/z/my-project/scripts/data_check.js (cwd = корень репо)
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = '/home/z/my-project/_local/loww';
const ctx = {
  URLSearchParams: global.URLSearchParams,
  setTimeout, clearTimeout,
  confirm: () => false,
  window: {},
  console,
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  document: {
    addEventListener: () => {},
    querySelectorAll: () => [],
    querySelector: () => null,
    getElementById: () => null,
    createElement: () => ({ style: {}, classList: { add: () => {}, toggle: () => {} }, setAttribute: () => {}, addEventListener: () => {} }),
    head: { appendChild: () => {} },
    addEventListener: () => {},
  },
  window: { addEventListener: () => {}, matchMedia: () => ({ matches: false }), location: { search: '', href: '', hash: '' } },
  location: { search: '', href: '', hash: '' },
  history: { replaceState: () => {} },
  navigator: {},
};
ctx.globalThis = ctx;
vm.createContext(ctx);

function load(file) {
  const code = fs.readFileSync(path.join(ROOT, file), 'utf8');
  try {
    vm.runInContext(code, ctx, { filename: file });
  } catch (e) {
    console.log(`[LOAD FAIL] ${file}: ${e.message}`);
  }
}

load('items-db.js');
load('item-bonus-parser.js');
load('js/item-slugs.js');
load('hero-builds.js');
load('bot-builds.js');
load('jass-data.js');
load('hero-data.js');

// const/let в vm не попадают в свойства контекста — собираем отдельным скриптом
const D = vm.runInContext(`({
  itemsDB: typeof itemsDB !== 'undefined' ? itemsDB : {},
  grids: typeof grids !== 'undefined' ? grids : {},
  BOSS_DROPS: typeof BOSS_DROPS !== 'undefined' ? BOSS_DROPS : {},
  ItemBonusParser: (typeof ItemBonusParser !== 'undefined' ? ItemBonusParser : (typeof window !== 'undefined' && window.ItemBonusParser) ? window.ItemBonusParser : null),
  ITEM_SLUGS: typeof ITEM_SLUGS !== 'undefined' ? ITEM_SLUGS : {},
  heroBuilds: typeof heroBuilds !== 'undefined' ? heroBuilds : {},
  botBuildGroups: typeof botBuildGroups !== 'undefined' ? botBuildGroups : {},
  HERO_BUILD_DATA: typeof HERO_BUILD_DATA !== 'undefined' ? HERO_BUILD_DATA : {},
  pageCalcCost: typeof calculateItemCost === 'function' ? calculateItemCost : null
})`, ctx);
const itemsDB = D.itemsDB;
const grids = D.grids;
const P = D.ItemBonusParser;
console.log(`загружено: предметов ${Object.keys(itemsDB).length}, гридов ${Object.keys(grids).length}, парсер ${P ? 'да' : 'НЕТ'}, pageCalcCost ${D.pageCalcCost ? 'да' : 'НЕТ'}`);

console.log('=== A. Целостность grids <-> itemsDB ===');
let allGridIds = [];
for (const [g, ids] of Object.entries(grids)) {
  for (const id of ids) {
    allGridIds.push({ g, id });
    if (!itemsDB[id]) console.log(`  [GHOST] ${g}: ${id} нет в itemsDB`);
  }
}
const seen = {};
for (const { g, id } of allGridIds) {
  if (seen[id]) console.log(`  [DUP] ${id} в ${seen[id]} и ${g}`);
  else seen[id] = g;
}
const dbIds = Object.keys(itemsDB).filter(id => id !== 'recipe');
const orphans = dbIds.filter(id => !seen[id] && !itemsDB[id].hidden && itemsDB[id].type !== 'rune');
console.log(`  grids: ${allGridIds.length} слотов, itemsDB: ${dbIds.length} предметов`);
console.log(`  сиропы (в DB, не в гридах, не hidden/rune): ${orphans.length}`);
orphans.forEach(id => console.log(`    ${id} ${itemsDB[id].name} (type=${itemsDB[id].type}, cost=${itemsDB[id].cost})`));
const hiddenInGrids = allGridIds.filter(({ id }) => itemsDB[id] && (itemsDB[id].hidden || itemsDB[id].type === 'rune'));
console.log(`  hidden/rune в гридах (рендерятся и всегда скрываются): ${hiddenInGrids.map(x => x.id).join(', ') || 'нет'}`);

console.log('\n=== B. item.cost vs calculateItemCost страницы (составные предметы) ===');
const calcCost = D.pageCalcCost || (() => 0);
let costMismatch = 0, compItems = 0;
for (const id of dbIds) {
  const it = itemsDB[id];
  if (it.components && it.components.length) {
    compItems++;
    const full = calcCost(id);
    if (typeof it.cost === 'number' && it.cost > 0 && it.cost !== full) {
      costMismatch++;
      const comps = it.components.map(c => `${c.itemId}${c.quantity ? 'x' + c.quantity : ''}${c.costOverride ? '=' + c.costOverride : ''}`).join(' + ');
      console.log(`  [COST] ${id} ${it.name}: cost=${it.cost}, расчёт=${full} (${comps})`);
    }
  }
}
console.log(`  составных: ${compItems}, расхождений cost vs расчёт: ${costMismatch}`);

console.log('\n=== B2. Битые ссылки в components / upgradesTo ===');
let broken = 0;
for (const id of dbIds) {
  const it = itemsDB[id];
  (it.components || []).forEach(c => {
    if (!itemsDB[c.itemId]) { broken++; console.log(`  [COMP] ${id} ${it.name} -> ${c.itemId} нет в DB`); }
  });
  (it.upgradesTo || []).forEach(u => {
    if (!itemsDB[u]) { broken++; console.log(`  [UPG] ${id} ${it.name} -> ${u} нет в DB`); }
  });
}
Object.keys(D.BOSS_DROPS || {}).forEach(id => { if (!itemsDB[id]) { broken++; console.log(`  [BOSS] ${id} нет в DB`); } });
if (!broken) console.log('  битых ссылок нет');

console.log('\n=== C. Дата-зависимые кандидаты парсера ===');
const descs = dbIds.map(id => itemsDB[id].description || '').filter(Boolean);
console.log(`  описаний: ${descs.length}`);
const find = (re, label) => {
  const hits = [];
  for (const id of dbIds) {
    const d = itemsDB[id].description || '';
    const m = d.match(re);
    if (m) hits.push(`${id} ${itemsDB[id].name}: "${m[0]}"`);
  }
  console.log(`  ${label}: ${hits.length}${hits.length ? '\n    ' + hits.slice(0, 10).join('\n    ') : ''}`);
};
find(/маг\.?\s+вампиризм/i, '«маг. вампиризм» (с точкой — парсер line 207 НЕ берёт: требует «маг» + пробел)');
find(/магический вампиризм/i, '«магический вампиризм» (берётся)');
find(/маг\.?\s+блок/i, '«маг. блок» (с точкой — line 211 не берёт)');
find(/магический блок/i, '«магический блок» (берётся)');
find(/x\s*\d+(?:[.,]\d+)?\s*урон/i, '«xN урон» (critDamagePct = N*100)');
find(/\+\d+(?:[.,]\d+)?\s*[^,]+\/[^,]+/, '«+N A/B» слэш-комбо (проход 1 удаляет текст)');
console.log('  --- слэш-комбо, где ОБЕ стороны НЕ атрибуты (значение теряется):');
const attrTok = v => /сил|ловк|разум|интел/i.test(v);
for (const id of dbIds) {
  const d = itemsDB[id].description || '';
  const re = /\+(\d+(?:[.,]\d+)?)\s+([^,]+?)\/([^,]+?)(?=(?:,|$))/g;
  let m;
  while ((m = re.exec(d))) {
    if (!attrTok(m[2]) && !attrTok(m[3])) console.log(`    ${id} ${itemsDB[id].name}: "${m[0]}"`);
  }
}
find(/\d+(?:[.,]\d+)?\s*урон[а-яё]*/i, 'упоминания «урон» вообще (для сверки крит-семантики)');

console.log('\n=== C2. Что парсер берёт из типичных описаний (выборка) ===');
const samples = ['I0CQ', 'modt', 'ofir', 'I00A', 'I0GL', 'I03J', 'I02Z'];
samples.forEach(id => {
  const it = itemsDB[id];
  if (!it) return;
  const b = P.parseDescription(it.description || '');
  const nz = Object.entries(b).filter(([, v]) => v !== 0);
  console.log(`  ${id} ${it.name}: "${(it.description || '').slice(0, 90)}" => ${JSON.stringify(nz)}`);
});

console.log('\n=== D. Дубликаты имён в itemsDB (ломают findItemByName) ===');
const nameMap = {};
for (const id of dbIds) {
  const n = itemsDB[id].name;
  if (!n) continue;
  (nameMap[n] = nameMap[n] || []).push(id);
}
const dupNames = Object.entries(nameMap).filter(([, ids]) => ids.length > 1);
console.log(`  дублей имён: ${dupNames.length}${dupNames.length ? '\n    ' + dupNames.map(([n, ids]) => `"${n}": ${ids.join(', ')}`).join('\n    ') : ''}`);

console.log('\n=== E. heroBuilds / botBuilds: ссылки на предметы ===');
const heroBuilds = D.heroBuilds || {};
let hbBroken = 0, hbTotal = 0;
for (const [hid, hb] of Object.entries(heroBuilds)) {
  const items = Array.isArray(hb) ? hb : (hb && hb.items) || [];
  items.forEach(it => {
    hbTotal++;
    if (!itemsDB[it.id]) { hbBroken++; console.log(`  [HB] ${hid}: ${it.id} (${it.name || '?'}) нет в itemsDB`); }
  });
}
console.log(`  heroBuilds: героев ${Object.keys(heroBuilds).length}, предметов ${hbTotal}, битых ${hbBroken}`);
const botGroups = D.botBuildGroups || {};
const HBD = D.HERO_BUILD_DATA || {};
const findItemByName = (name) => { for (const id of dbIds) if (itemsDB[id].name === name) return itemsDB[id]; return null; };
let bbBroken = 0, bbTotal = 0;
const bbUnresolved = new Set();
for (const [g, grp] of Object.entries(botGroups)) {
  (grp.stages || []).forEach(st => {
    (st.items || []).forEach(slot => {
      bbTotal++;
      if (slot.name && !findItemByName(slot.name)) { bbBroken++; bbUnresolved.add(`${g}: "${slot.name}"`); }
    });
  });
}
console.log(`  botBuildGroups: групп ${Object.keys(botGroups).length}, слотов предметов ${bbTotal}, не найдено по имени ${bbBroken}${bbBroken ? '\n    ' + [...bbUnresolved].slice(0, 15).join('\n    ') : ''}`);
const heroIdsInHBD = new Set(Object.values(HBD).map(d => d.heroId).filter(Boolean));
console.log(`  HERO_BUILD_DATA: записей ${Object.keys(HBD).length}, с heroId ${heroIdsInHBD.size}`);

console.log('\n=== F. slug-маппинг: покрытие гридов ===');
const slugs = D.ITEM_SLUGS || {};
const missingSlugs = dbIds.filter(id => !slugs[id]);
console.log(`  предметов без slug: ${missingSlugs.length} (idFromSlug вернёт как есть — не баг, но链接 по slug для них не построишь)`);
console.log(`  примеры: ${missingSlugs.slice(0, 8).join(', ')}`);
const slugDup = {};
for (const [id, s] of Object.entries(slugs)) { (slugDup[s] = slugDup[s] || []).push(id); }
const dups = Object.entries(slugDup).filter(([, ids]) => ids.length > 1);
console.log(`  одинаковых slug у разных предметов: ${dups.length}${dups.length ? ' -> ' + dups.map(([s, ids]) => `${s}: ${ids.join(',')}`).join('; ') : ''}`);
