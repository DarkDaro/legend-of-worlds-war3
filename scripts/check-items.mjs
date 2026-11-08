#!/usr/bin/env node
// check-items.mjs — инварианты предметного блока (см. docs/JS-META.md).
// Проверяет согласованность items-db ↔ item-slugs ↔ bot-builds ↔ hero-builds
// ↔ босс-дропы и покрытие парсера бонусов. Ничего не меняет, только отчёт.
// Exit 1 — на битые ссылки/целостность; расхождения цен и слепые зоны парсера
// печатает как INFO/WARN (известные особенности данных карты).
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import vm from 'vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = f => readFileSync(join(root, f), 'utf8');

// Песочница: скрипты ждут браузерное окружение (запуск с defer в проде).
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
for (const f of ['items-db.js', 'js/item-slugs.js', 'bot-builds.js', 'hero-builds.js',
                 'jass-data.js', 'item-bonus-parser.js']) {
  vm.runInContext(read(f), ctx, { filename: f });
}
const grab = n => vm.runInContext(`typeof ${n} !== 'undefined' ? ${n} : undefined`, ctx);
const items = grab('itemsDB'), slugs = grab('ITEM_SLUGS'), bots = grab('botBuildGroups'),
      heroBuilds = grab('heroBuilds'), // hero-builds.js — предметы {id, name} по 74 героям
      bossDrops = grab('BOSS_DROP_ITEMS'), bossComps = grab('BOSS_COMPONENT_ITEMS'),
      Parser = ctx.ItemBonusParser;

let errors = 0, warns = 0;
const P = s => console.log(s);
const ERR = s => { errors++; P('  ОШИБКА: ' + s); };
const WARN = s => { warns++; P('  внимание: ' + s); };

P(`itemsDB: ${Object.keys(items).length} предметов; ITEM_SLUGS: ${Object.keys(slugs).length}`);

// 1. Целостность itemsDB
const dupNames = {};
for (const [k, it] of Object.entries(items)) {
  if (!it.id || it.id !== k) ERR(`id≠ключ: ${k}`);
  if (typeof it.cost !== 'number' || it.cost < 0) ERR(`плохой cost: ${k}=${it.cost}`);
  if (it.name) (dupNames[it.name] = dupNames[it.name] || []).push(k);
}
const dups = Object.entries(dupNames).filter(([, v]) => v.length > 1);
if (dups.length) dups.forEach(([n, v]) => WARN(`одинаковые имена: ${n} → ${v.join(', ')}`));

// 2. Слаги
const slugBad = Object.keys(slugs).filter(k => !items[k]);
slugBad.forEach(x => ERR(`slug на несуществующий предмет: ${x}`));
const itemsNoSlug = Object.keys(items).filter(k => !(k in slugs));
P(`без slug (фолбэк по id): ${itemsNoSlug.length}${itemsNoSlug.length ? ' → ' + itemsNoSlug.join(', ') : ''}`);

// 3-5. Внешние ссылки на предметы. Формат ссылок у источников разный:
//   bot-builds — по имени {name, keep}; hero-builds — пара {id, name};
//   босс-дропы (jass-data) — rawcode-строки.
const nameIndex = {};
for (const [k, it] of Object.entries(items)) if (it.name) (nameIndex[it.name] = nameIndex[it.name] || []).push(k);
const walkNodes = (o, fn) => {
  if (Array.isArray(o)) { o.forEach(x => walkNodes(x, fn)); return; }
  if (o && typeof o === 'object') { fn(o); for (const v of Object.values(o)) walkNodes(v, fn); }
};

let botRefs = 0;
walkNodes(bots, n => {
  if (typeof n.name === 'string' && typeof n.keep === 'boolean') {
    botRefs++;
    if (!nameIndex[n.name]) ERR(`bot-builds: нет предмета с именем «${n.name}»`);
  }
});
P(`bot-builds: предметов в стадиях ${botRefs}`);

let hbRefs = 0;
walkNodes(heroBuilds, n => {
  if (typeof n.id === 'string' && /^[A-Z0-9]{4}$/.test(n.id)) {
    hbRefs++;
    if (!items[n.id]) { ERR(`hero-builds: нет предмета ${n.id} (${n.name})`); return; }
    if (n.name && items[n.id].name !== n.name)
      WARN(`hero-builds: ${n.id} имя «${n.name}» ≠ в базе «${items[n.id].name}»`);
  }
});
P(`hero-builds: предметов ${hbRefs}`);

const collect = (o, acc) => {
  if (typeof o === 'string') { acc.push(o); return acc; }
  for (const v of Object.values(o || {})) collect(v, acc);
  return acc;
};
const bossRefs = collect([bossDrops, bossComps], []).filter(id => /^[a-z]?[A-Z0-9]{3,4}$/.test(id));
const bossBroken = [...new Set(bossRefs.filter(id => !items[id]))];
P(`босс-дропы: ссылок ${bossRefs.length}, битых ${bossBroken.length}`);
bossBroken.forEach(x => ERR(`босс-дропы: нет предмета ${x}`));

// 6. Деревья компонентов. Две методики:
//    глубокая сумма = «Общая» на сайте (calculateItemCost, дропы бесплатны) — главная;
//    прямая = сумма записанных цен детей — видно, у кого расходится собственная бухгалтерия.
const deepDiff = [], directDiff = [];
let trees = 0;
for (const [k, it] of Object.entries(items)) {
  if (!Array.isArray(it.components) || !it.components.length) continue;
  trees++;
  const deep = vm.runInContext(`calculateItemCost('${k}')`, ctx);
  if (typeof it.cost === 'number' && it.cost !== deep) deepDiff.push(k);
  let direct = 0, bad = false;
  for (const c of it.components) {
    const child = items[c.itemId];
    if (!child) { ERR(`дерево ${k} (${it.name}): нет компонента ${c.itemId}`); bad = true; break; }
    direct += (c.costOverride !== undefined ? c.costOverride : child.cost) * (c.quantity || 1);
  }
  if (!bad && typeof it.cost === 'number' && it.cost !== direct) directDiff.push(k);
}
P(`составных предметов (деревья): ${trees}`);
P(`цена ≠ глубокой сумме («Общая» на сайте): ${deepDiff.length} (INFO — разбор по группам: docs/COST-AUDIT.md, КРИТИЧНО)`);
if (deepDiff.length) P(`  список: ${deepDiff.join(', ')}`);
P(`цена ≠ сумме записанных детей (корни собственной бухгалтерии): ${directDiff.length}`);
if (directDiff.length) P(`  список: ${directDiff.join(', ')}`);

// 7. Парсер бонусов
let withPlus = 0, zero = 0, samples = [];
for (const it of Object.values(items)) {
  if (!it.description) continue;
  const b = Parser.parseDescription(it.description);
  const total = Object.values(b || {}).reduce((s, v) => s + (typeof v === 'number' ? Math.abs(v) : 0), 0);
  if (/\+\d/.test(it.description) && total === 0) { withPlus++; if (samples.length < 10) samples.push(it.id); }
}
P(`парсер: описаний с «+N», не распознанных ни в одно поле: ${withPlus}${withPlus ? ' → ' + samples.join(', ') : ''} (известные слепые зоны — книги «+N к силе», сферы «+N% урона», опыт/уровни; см. JS-META.md)`);

P(errors || warns ? `\nитог: ошибок ${errors}, предупреждений ${warns}` : '\nитог: всё чисто');
process.exit(errors ? 1 : 0);
