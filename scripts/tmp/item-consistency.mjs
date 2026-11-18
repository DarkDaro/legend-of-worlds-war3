#!/usr/bin/env node
// Сверка консистентности предметного блока: items-db ↔ slugs ↔ bot-builds ↔
// hero-builds ↔ jass-data ↔ парсер бонусов. Только отчёт, ничего не меняет.
import { readFileSync } from 'fs';
import vm from 'vm';

const root = '/home/z/my-project/_local/loww';
const ctx = { console, module: undefined, window: {}, localStorage: { getItem: () => null, setItem: () => {} } };
ctx.window = ctx; ctx.globalThis = ctx;
const stubEl = { style: {}, appendChild: () => {}, addEventListener: () => {}, classList: { add: () => {}, remove: () => {}, toggle: () => {} } };
ctx.document = { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {}, createElement: () => ({ ...stubEl, textContent: '' }), head: { appendChild: () => {} }, body: { appendChild: () => {} } };
ctx.URLSearchParams = URLSearchParams;
ctx.location = { search: '', href: 'http://x/' };
ctx.addEventListener = () => {};
ctx.matchMedia = () => ({ matches: false, addEventListener: () => {} });
vm.createContext(ctx);
const load = f => vm.runInContext(readFileSync(`${root}/${f}`, 'utf8'), ctx, { filename: f });
const grab = name => vm.runInContext(`typeof ${name} !== 'undefined' ? ${name} : undefined`, ctx);

load('game-constants.js');
load('items-db.js');
load('js/item-slugs.js');
load('bot-builds.js');
load('hero-builds.js');
load('jass-data.js');
load('item-bonus-parser.js');

const items = grab('itemsDB'), slugs = grab('ITEM_SLUGS'),
      bots = grab('botBuildGroups'), heroBuilds = grab('HERO_BUILD_DATA'),
      bossDrops = grab('BOSS_DROP_ITEMS'), bossComps = grab('BOSS_COMPONENT_ITEMS'),
      Parser = ctx.ItemBonusParser;

const P = s => console.log(s);
P(`itemsDB: ${Object.keys(items).length} записей; slugs: ${Object.keys(slugs).length}`);

// 1. Целостность itemsDB
let noId = 0, idMismatch = [], badCost = [], noDesc = 0, dupNames = {};
for (const [k, it] of Object.entries(items)) {
  if (!it.id) noId++;
  else if (it.id !== k) idMismatch.push(`${k} ≠ ${it.id}`);
  if (typeof it.cost !== 'number' || it.cost < 0) badCost.push(`${k}: ${it.cost}`);
  if (!it.description) noDesc++;
  if (it.name) (dupNames[it.name] = dupNames[it.name] || []).push(k);
}
const dups = Object.entries(dupNames).filter(([, v]) => v.length > 1);
P(`\n== 1. itemsDB ==`);
P(`без id: ${noId}; id≠ключ: ${idMismatch.length}; плохой cost: ${badCost.length}; без описания: ${noDesc}`);
idMismatch.slice(0, 5).forEach(x => P('  ' + x));
badCost.slice(0, 5).forEach(x => P('  ' + x));
P(`дубликатов имён: ${dups.length}`); dups.slice(0, 8).forEach(([n, v]) => P(`  ${n}: ${v.join(', ')}`));

// 2. slugs ↔ itemsDB: ключи slugs = rawcode → slug-строка
const slugKeys = new Set(Object.keys(slugs));
const slugBad = Object.keys(slugs).filter(k => !items[k]);
const itemsNoSlug = Object.keys(items).filter(k => !slugKeys.has(k));
P(`\n== 2. ITEM_SLUGS ==`);
P(`slug'ов с битым rawcode: ${slugBad.length}`);
slugBad.slice(0, 8).forEach(x => P('  ' + x));
P(`предметов без slug (фолбэк по id): ${itemsNoSlug.length}`);
itemsNoSlug.slice(0, 8).forEach(x => P('  ' + x + ' (' + (items[x].name || '?') + ')'));

// 3. bot-builds ↔ itemsDB
const collect = (o, acc) => { for (const v of Object.values(o || {})) {
  if (typeof v === 'string') acc.push(v);
  else if (Array.isArray(v)) v.forEach(x => typeof x === 'string' ? acc.push(x) : collect(x, acc));
  else if (v && typeof v === 'object') collect(v, acc);
} return acc; };
const botItems = collect(bots, []);
const botMissing = [...new Set(botItems.filter(id => !/^[A-Z0-9]{4}$/.test(id) ? false : !items[id]))];
P(`\n== 3. bot-builds ==`);
P(`ссылок на предметы: ${botItems.length}; битых: ${botMissing.length}`);
botMissing.slice(0, 10).forEach(x => P('  ' + x));

// 4. hero-builds ↔ itemsDB
const hbItems = collect(heroBuilds, []);
const hbMissing = [...new Set(hbItems.filter(id => /^[A-Z0-9]{4}$/.test(id) && !items[id]))];
P(`\n== 4. hero-builds ==`);
P(`ссылок: ${hbItems.length}; битых: ${hbMissing.length}`);
hbMissing.slice(0, 10).forEach(x => P('  ' + x));

// 5. босс-дропы
const bdMissing = [...new Set([...collect(bossDrops, []), ...collect(bossComps, [])]
  .filter(id => /^[A-Z0-9]{4}$/.test(id) && !items[id]))];
P(`\n== 5. босс-дропы ==`);
P(`битых ссылок: ${bdMissing.length}`); bdMissing.slice(0, 10).forEach(x => P('  ' + x));

// 6. Деревья компонентов в itemsDB: битые ссылки и цена
P(`\n== 6. Деревья компонентов (items-db) ==`);
let trees = 0, compMissing = [], costDiff = [];
for (const [k, it] of Object.entries(items)) {
  if (!Array.isArray(it.components) || !it.components.length) continue;
  trees++;
  let sum = 0, bad = [];
  for (const c of it.components) {
    const child = items[c.itemId];
    if (!child) { bad.push(c.itemId); continue; }
    sum += (c.costOverride !== undefined ? c.costOverride : child.cost) * (c.quantity || 1);
  }
  if (bad.length) compMissing.push(`${k} (${it.name}): ${bad.join(', ')}`);
  else if (typeof it.cost === 'number' && it.cost !== sum) costDiff.push(`${k} (${it.name}): цена ${it.cost} vs дерево ${sum}`);
}
P(`деревьев: ${trees}; битые компоненты: ${compMissing.length}; цена ≠ дереву: ${costDiff.length}`);
compMissing.slice(0, 8).forEach(x => P('  ' + x));
costDiff.slice(0, 14).forEach(x => P('  ' + x));
const noDescItems = Object.values(items).filter(it => !it.description);
P(`предметов без описания: ${noDescItems.length}`);
noDescItems.slice(0, 25).forEach(it => P(`  ${it.id} (${it.name || '?'}), type=${it.type || '?'}`));

// 7. Парсер бонусов: покрытие описаний
P(`\n== 7. Парсер бонусов ==`);
let parsed = 0, withPlusButZero = 0, samples = [];
for (const it of Object.values(items)) {
  if (!it.description) continue;
  const b = Parser.parseDescription ? Parser.parseDescription(it.description) : Parser.parse(it.description);
  const total = Object.values(b || {}).reduce((s, v) => s + (typeof v === 'number' ? Math.abs(v) : 0), 0);
  if (total > 0) parsed++;
  else if (/\+\d/.test(it.description)) { withPlusButZero++; if (samples.length < 10) samples.push(`${it.id} ${it.name}: «${it.description.slice(0, 70)}»`); }
}
P(`описаний распознано: ${parsed}; с «+N» но нулевой разбор: ${withPlusButZero}`);
samples.forEach(x => P('  ' + x));
