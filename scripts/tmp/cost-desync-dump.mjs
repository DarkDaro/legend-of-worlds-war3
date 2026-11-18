#!/usr/bin/env node
// Дамп полного разбора рассинхрона «цена ≠ дереву».
// Использует СОБСТВЕННЫЕ функции сайта (calculateItemCost/getRecipeCost/
// bossDropValueInTree из items-db.js), чтобы числа совпадали с панелью 1:1.
import { readFileSync } from 'fs';
import vm from 'vm';

const root = '/home/z/my-project/_local/loww';
const ctx = { console, module: undefined, URLSearchParams, addEventListener: () => {} };
ctx.window = ctx; ctx.globalThis = ctx;
ctx.location = { search: '', href: 'http://localhost/' };
ctx.localStorage = { getItem: () => null, setItem: () => {} };
const stubEl = { style: {}, appendChild: () => {}, addEventListener: () => {},
  classList: { add: () => {}, remove: () => {}, toggle: () => {} } };
ctx.document = { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
  addEventListener: () => {}, createElement: () => stubEl,
  head: { appendChild: () => {} }, body: { appendChild: () => {} } };
ctx.matchMedia = () => ({ matches: false, addEventListener: () => {} });
vm.createContext(ctx);
vm.runInContext(readFileSync(`${root}/items-db.js`, 'utf8'), ctx, { filename: 'items-db.js' });
const R = expr => vm.runInContext(expr, ctx);

const items = R('itemsDB');
const calcCost = id => R(`calculateItemCost('${id}')`);
const calcRecipe = id => R(`getRecipeCost(itemsDB['${id}'])`);
const calcDrop = id => R(`bossDropValueInTree('${id}')`);

const isDrop = it => it && (it.type === 'boss_drop' || (it.tags || []).includes('boss_drop'));

// Прямая сумма (для сравнения методик)
const directSum = it => (it.components || []).reduce((s, c) => {
  if (c.costOverride !== undefined) return s + c.costOverride;
  const ch = items[c.itemId];
  if (!ch || isDrop(ch)) return s;
  return s + ch.cost * (c.quantity || 1);
}, 0);

const lines = [];
for (const [id, it] of Object.entries(items)) {
  if (!Array.isArray(it.components) || !it.components.length) continue;
  const deep = calcCost(id);
  if (it.cost === deep) continue;
  const rec = calcRecipe(id), drop = calcDrop(id), ds = directSum(it);
  lines.push({ id, name: it.name, cost: it.cost, deep, ds, rec, drop,
    delta: it.cost - deep, comps: (it.components || []).map(c => {
      const ch = items[c.itemId];
      return {
        raw: c.itemId, name: ch ? ch.name : c.itemId,
        qty: c.quantity || 1, override: c.costOverride,
        unit: ch ? ch.cost : null, type: ch ? ch.type : '?',
        isDrop: isDrop(ch), line: c.costOverride !== undefined
          ? c.costOverride
          : (ch ? ch.cost * (c.quantity || 1) : null),
        composite: ch ? !!(ch.components && ch.components.length) : false,
      };
    }) });
}
lines.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

for (const L of lines) {
  console.log(`\n### ${L.id} — ${L.name}`);
  console.log(`Золото(записано): ${L.cost} | Общая(глубокая): ${L.deep} | Δ=${L.delta > 0 ? '+' : ''}${L.delta} | прямая сумма: ${L.ds} | рецепт: ${L.rec} | босс-дропы в дереве: ${L.drop}`);
  for (const c of L.comps) {
    console.log(`   - ${c.raw} ${c.name} ×${c.qty}${c.override !== undefined ? ` (costOverride ${c.override})` : ''} → строка ${c.line}${c.isDrop ? ' [БОСС-ДРОП]' : ''}${c.composite ? ' [составной]' : ''}${c.type === 'recipe' ? ' [свиток]' : ''}`);
  }
}
console.log(`\n=== всего расхождений (по глубокой сумме): ${lines.length}`);
console.log('id-список:', lines.map(l => l.id).join(', '));
