// Точечные проверки после первого прогона
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = '/home/z/my-project/_local/loww';
const ctx = {
  URLSearchParams: global.URLSearchParams, setTimeout, clearTimeout, confirm: () => false,
  window: { location: { search: '', href: '', hash: '' }, addEventListener: () => {}, matchMedia: () => ({ matches: false }) }, console,
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  document: { addEventListener: () => {}, querySelectorAll: () => [], querySelector: () => null, getElementById: () => null, createElement: () => ({ style: {}, classList: { add: () => {}, toggle: () => {} }, setAttribute: () => {}, addEventListener: () => {} }), head: { appendChild: () => {} } },
  location: { search: '', href: '', hash: '' }, history: { replaceState: () => {} }, navigator: {},
};
vm.createContext(ctx);
for (const f of ['items-db.js', 'item-bonus-parser.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
}
const D = vm.runInContext(`({
  itemsDB, ItemBonusParser: window.ItemBonusParser,
  pageCalcCost: typeof calculateItemCost === 'function' ? calculateItemCost : null
})`, ctx);
const itemsDB = D.itemsDB, P = D.ItemBonusParser, calcCost = D.pageCalcCost;

console.log('=== Крит в описаниях: сколько всего и что распозналось ===');
let critDescr = 0, chanceParsed = 0, dmgParsed = 0;
for (const id in itemsDB) {
  const it = itemsDB[id];
  if (!it.description) continue;
  const d = it.description;
  if (!/критическ/i.test(d)) continue;
  critDescr++;
  const b = P.parseDescription(d);
  const hasChance = b.critChancePct !== 0, hasDmg = b.critDamagePct !== 0;
  if (hasChance) chanceParsed++;
  if (hasDmg) dmgParsed++;
  console.log(`  ${id} ${it.name}: "${d.slice(0, 100)}" => шанс:${hasChance ? b.critChancePct : '—'} урон:${hasDmg ? b.critDamagePct : '—'}`);
}
console.log(`  описаний с «критическ»: ${critDescr}, шанс распознан: ${chanceParsed}, урон распознан: ${dmgParsed}`);

console.log('\n=== Босс-дропы: cost в DB и участие в чужих деревьях ===');
for (const id in (ctx.vm2 = {}, {})) {}
const BOSS = ['I01N','I01L','I0CK','I02E','I0B5','I047','I0G4','I0G3'];
BOSS.forEach(id => console.log(`  ${id} ${itemsDB[id] ? itemsDB[id].name + ' cost=' + itemsDB[id].cost : 'НЕТ В DB'}`));
console.log('  --- кто включает босс-дропы в свои components:');
for (const id in itemsDB) {
  const it = itemsDB[id];
  (it.components || []).forEach(c => {
    if (BOSS.includes(c.itemId)) console.log(`  ${id} ${it.name} <- ${c.itemId} ${itemsDB[c.itemId].name} (учтён в «Общей» по cost=${itemsDB[c.itemId].cost})`);
  });
}

console.log('\n=== Ключи: cnob/rst1/rag1/rin1 цены ===');
['cnob','rst1','rag1','rin1'].forEach(id => console.log(`  ${id} ${itemsDB[id].name} cost=${itemsDB[id].cost}`));

console.log('\n=== formatParsedBonusValue на дробных ===');
[0.05, 1.25, 2.5, 0.5, 3, 10.0].forEach(v => {
  const s = vm.runInContext(`(${function formatParsedBonusValue(value) {
    if (!value) return '';
    const normalized = Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\\.0$/, '');
    return value > 0 ? `+${normalized}` : normalized;
  }.toString()})(${v})`, ctx);
  console.log(`  ${v} -> "${s}"`);
});
