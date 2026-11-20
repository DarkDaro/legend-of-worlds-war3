// counts.js — точный runtime-подсчёт баз (как видит браузер)
const fs = require('fs');
const path = '/home/z/my-project/_local/loww/';
const load = (f) => {
  const code = fs.readFileSync(path + f, 'utf8');
  const sandbox = { location: { search: '', href: '' }, addEventListener: () => {}, matchMedia: () => ({ matches: false }) };
  const stubs = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
  new Function('window', 'localStorage', 'document',
    code + '\n;window.__out = { itemsDB: typeof itemsDB!=="undefined"?itemsDB:undefined, HEROES_DATA: typeof HEROES_DATA!=="undefined"?HEROES_DATA:undefined };')(
    sandbox, stubs, {
      querySelectorAll: () => [], querySelector: () => null, getElementById: () => null, addEventListener: () => {},
      createElement: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {}, remove: () => {} }),
      head: { appendChild: () => {} }, body: { appendChild: () => {} },
    });
  return sandbox.__out;
};

const items = load('items-db.js');
const heroes = load('hero-data.js');
const db = items.itemsDB, heroesData = heroes.HEROES_DATA;

const entries = Object.entries(db);
console.log('=== ПРЕДМЕТЫ (runtime) ===');
console.log('всего записей:', entries.length);
const byType = {};
for (const [, v] of entries) byType[v.type || '(нет type)'] = (byType[v.type || '(нет type)'] || 0) + 1;
console.log('по типам:', JSON.stringify(byType));
const runes = entries.filter(([, v]) => v.type === 'rune');
console.log('рун:', runes.length);
const visible = entries.filter(([k, v]) => v.type !== 'rune');
console.log('не-рун:', visible.length);
const crafted = visible.filter(([, v]) => Array.isArray(v.components) && v.components.length);
console.log('сборных (components.length>0):', crafted.length);
console.log('простых:', visible.length - crafted.length);
console.log('recycled скрытых (hidden=true):', entries.filter(([, v]) => v.hidden).length);
const zeroGold = visible.filter(([, v]) => !v.cost && (v.costCrystals || 0) > 0);
console.log('за кристаллы (cost=0, costCrystals>0):', zeroGold.length);

console.log('\n=== ГЕРОИ (runtime) ===');
console.log('всего записей:', heroesData.length);
const wip = heroesData.filter(h => h.wip), alt = heroesData.filter(h => h.isAltForm);
console.log('wip:', wip.length, '(', wip.map(h => h.heroId).join(', '), ')');
console.log('alt:', alt.length, '(', alt.map(h => h.heroId).join(', '), ')');
const combat = heroesData.filter(h => !h.wip && !h.isAltForm);
console.log('боевых:', combat.length);
