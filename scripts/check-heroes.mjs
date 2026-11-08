#!/usr/bin/env node
// check-heroes.mjs — инварианты геройского блока (см. docs/JS-META.md, раздел «Герои»).
// Согласованность: HEROES_DATA ↔ страницы heroes/*.html ↔ heroBuilds ↔ HERO_LORE
// ↔ HERO_BUILD_DATA ↔ HERO_RAWCODES ↔ галерея. Ничего не меняет, только отчёт.
// Exit 1 — на битые ссылки/страницы; неполнота данных карты — INFO/WARN.
import { readFileSync, readdirSync } from 'fs';
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
for (const f of ['hero-data.js', 'hero-lore.js', 'hero-builds.js', 'jass-data.js',
                 'js/hero-slugs.js', 'items-db.js']) {
  vm.runInContext(read(f), ctx, { filename: f });
}
const grab = n => vm.runInContext(`typeof ${n} !== 'undefined' ? ${n} : undefined`, ctx);
const heroes = grab('HEROES_DATA'), lore = grab('HERO_LORE'), builds = grab('heroBuilds'),
      buildData = grab('HERO_BUILD_DATA'), rawcodes = grab('HERO_RAWCODES'),
      items = grab('itemsDB');

let errors = 0, warns = 0;
const P = s => console.log(s);
const ERR = s => { errors++; P('  ОШИБКА: ' + s); };
const WARN = s => { warns++; P('  внимание: ' + s); };

// ── 1. Целостность HEROES_DATA ──
// wip-записи по замыслу содержат только приросты (шапка файла: «Поля с 0 — ждут
// заполнения»), поэтому личностные поля обязательны у всех, статы — у не-wip.
const REQ_ALL = ['heroId', 'name', 'rawcode', 'attr', 'roles', 'roleNames'];
const REQ_STATS = ['strBase', 'strGain', 'agiBase', 'agiGain', 'intBase', 'intGain',
                   'hp', 'mp', 'atk', 'def', 'speed', 'range'];
const byId = {}, byRaw = {};
let wip = 0, alt = 0;
const zeroFields = [], noStats = [];
for (const h of heroes) {
  if (!h.heroId) { ERR(`запись без heroId: ${h.name || JSON.stringify(h).slice(0, 60)}`); continue; }
  if (byId[h.heroId]) ERR(`дубль heroId: ${h.heroId}`);
  byId[h.heroId] = h;
  if (h.rawcode) {
    if (byRaw[h.rawcode]) ERR(`дубль rawcode: ${h.rawcode} (${byRaw[h.rawcode].heroId} и ${h.heroId})`);
    byRaw[h.rawcode] = h;
  }
  if (h.wip) wip++;
  if (h.isAltForm) alt++;
  for (const f of REQ_ALL) if (h[f] === undefined) ERR(`${h.heroId}: нет поля ${f}`);
  if (!h.wip)
    for (const f of REQ_STATS) if (h[f] === undefined) ERR(`${h.heroId}: нет поля ${f}`);
  else {
    const missing = REQ_STATS.filter(f => h[f] === undefined);
    if (missing.length === REQ_STATS.length) noStats.push(h.heroId);
  }
  for (const f of ['hp', 'mp', 'atk', 'def', 'atkSpeed', 'hpRegen', 'mpRegen',
                   'speed', 'range', 'sightDay', 'sightNight', 'strBase', 'agiBase', 'intBase'])
    if (h[f] === 0) zeroFields.push(`${h.heroId}.${f}`);
}
const byAttr = {};
for (const h of heroes) byAttr[h.attr] = (byAttr[h.attr] || 0) + 1;
P(`HEROES_DATA: ${heroes.length} героев (сила ${byAttr.strength || 0}, ловкость ${byAttr.agility || 0}, разум ${byAttr.intelligence || 0}); wip ${wip}, альт-форм ${alt}`);

// ── 2. Вселенная слагов: 6 множеств ──
const pages = readdirSync(join(root, 'heroes')).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5));
const pageSet = new Set(pages);
const ids = new Set(heroes.map(h => h.heroId));
const buildKeys = new Set(Object.keys(builds));
const loreKeys = new Set(Object.keys(lore));
const slugVals = new Set(Object.values(rawcodes));
const buildDataIds = new Set(Object.values(buildData).map(d => d.heroId).filter(Boolean));
P(`слаги: страницы ${pages.length}, HEROES_DATA ${ids.size}, heroBuilds ${buildKeys.size}, HERO_LORE ${loreKeys.size}, HERO_RAWCODES ${slugVals.size}, HERO_BUILD_DATA ${buildDataIds.size}`);

// ── 3. Страницы героев ──
// Связки строятся в JS (карточки heroes-page.js и renderHeroNav), статический
// check-links их не видит — сверяем здесь. Порядок HEROES_DATA = порядок страниц.
for (const h of heroes) {
  if (h.isAltForm || h.wip) continue;          // без страницы — норм
  if (!pageSet.has(h.heroId)) ERR(`${h.heroId}: героя нет среди heroes/*.html, ссылка из сетки heroes.html поведёт на 404`);
}
for (const slug of pages) {
  if (!ids.has(slug)) ERR(`heroes/${slug}.html: нет записи в HEROES_DATA (renderHeroStats вернёт «Данные героя недоступны»)`);
}
// Страницы wip-героев существуют, но скрыты: карточка некликабельна
// (heroes-page.js: if (hero.wip) return), героя нет в поиске (search.js)
// и в листании (renderHeroNav фильтрует wip) — страница доступна только по URL.
const wipPages = pages.filter(s => byId[s] && (byId[s].wip || byId[s].isAltForm));
P(`страницы wip/альт-форм (скрыты из сетки/поиска/навигации, видны только по URL): ${wipPages.length}${wipPages.length ? ' → ' + wipPages.join(', ') : ''}`);

// ── 4. Внутренности каждой страницы ──
// Данные грузятся с defer, блоки на страницах защищены typeof — недогруз
// данных НЕ падает, а молча опускает блок. Проверяем подключения явно.
const NEED = ['hero-data.js', 'hero-lore.js', 'hero-builds.js', 'jass-data.js'];
let badDeps = 0, badCall = 0, noNav = 0, loreCalls = 0, loreMissing = 0;
for (const slug of pages) {
  const html = read(join('heroes', slug + '.html'));
  for (const dep of NEED)
    if (!html.includes(`"${dep}"`) && !html.includes(`'${dep}'`) && !html.includes(`/${dep}`)) {
      ERR(`heroes/${slug}.html: не подключён ${dep} — блок молча пропадёт (typeof-защита)`); badDeps++;
    }
  const m = html.match(/renderHeroStats\(\s*['"]([^'"]+)['"]/);
  if (!m) { WARN(`heroes/${slug}.html: нет вызова renderHeroStats`); badCall++; }
  else {
    if (m[1] !== slug) ERR(`heroes/${slug}.html: renderHeroStats('${m[1]}') ≠ имени файла`);
    if (!ids.has(m[1])) ERR(`heroes/${slug}.html: renderHeroStats('${m[1]}') — нет такого heroId`);
  }
  if (!/renderHeroNav\(/.test(html)) { WARN(`heroes/${slug}.html: нет renderHeroNav (листание героев)`); noNav++; }
  const lm = [...html.matchAll(/HERO_LORE\[["']([^"']+)["']\]/g)].map(x => x[1]);
  for (const k of new Set(lm)) {
    loreCalls++;
    if (!loreKeys.has(k)) { ERR(`heroes/${slug}.html: HERO_LORE[${k}] — нет в hero-lore.js`); loreMissing++; }
  }
}
P(`страницы: подключения данных — битых ${badDeps}; вызовов renderHeroStats без пары ${badCall}; без renderHeroNav ${noNav}; ссылок на лор ${loreCalls}, битых ${loreMissing}`);

// ── 5. Rawcode-связки ──
let rawNoBuildData = 0, rawSlugMismatch = 0, nameMismatch = [], orphanRaw = [];
for (const h of heroes) {
  if (!h.rawcode) { WARN(`${h.heroId}: пустой rawcode`); continue; }
  const bd = buildData[h.rawcode];
  // wip/альт-формы вне HERO_BUILD_DATA/HERO_RAWCODES — по замыслу (там только
  // герои ботов); у опубликованного героя отсутствие в карте — реальная проблема.
  const hidden = h.wip || h.isAltForm;
  if (!bd) { hidden ? orphanRaw.push(h.heroId) : WARN(`${h.heroId} (${h.rawcode}): нет в HERO_BUILD_DATA`); if (!hidden) rawNoBuildData++; }
  else if (bd.name !== h.name && !h.isAltForm) nameMismatch.push(`${h.heroId}: «${h.name}» ↔ карта «${bd.name}»`);
  const slug = rawcodes[h.rawcode];
  if (slug !== h.heroId && !hidden) { WARN(`${h.heroId}: HERO_RAWCODES[${h.rawcode}] = ${slug}`); rawSlugMismatch++; }
}
P(`вне карт карты-ботов (HERO_BUILD_DATA/HERO_RAWCODES), по замыслу wip/альт: ${orphanRaw.length} → ${orphanRaw.join(', ')}`);
P(`опубликованных героев вне HERO_BUILD_DATA: ${rawNoBuildData}; slug-мисматчей ${rawSlugMismatch}`);
if (nameMismatch.length) { WARN(`имена ≠ карте (HERO_BUILD_DATA): ${nameMismatch.length}`); nameMismatch.forEach(s => P(`  ${s}`)); }
// Обратная сторона: HERO_RAWCODES на неизвестные HEROES_DATA
for (const [rc, slug] of Object.entries(rawcodes))
  if (!ids.has(slug)) WARN(`HERO_RAWCODES: ${rc} → ${slug}, такого heroId нет`);
// HERO_BUILD_DATA.heroId без записи в HEROES_DATA
for (const [rc, d] of Object.entries(buildData))
  if (d.heroId && !ids.has(d.heroId)) WARN(`HERO_BUILD_DATA: ${rc} (${d.name}) → ${d.heroId}, в HEROES_DATA нет`);

// ── 6. heroBuilds (автоген из bot-builds; генератора tools/ в репо НЕТ) ──
let buildHeroes = 0, buildItems = 0, buildBad = 0, selfNameBad = 0;
for (const [slug, b] of Object.entries(builds)) {
  buildHeroes++;
  if (b.name !== slug) { WARN(`heroBuilds[${slug}].name = ${b.name}`); selfNameBad++; }
  if (!ids.has(slug)) ERR(`heroBuilds[${slug}]: нет такого героя в HEROES_DATA`);
  for (const it of b.items || []) {
    buildItems++;
    const db = items[it.id];
    if (!db) { ERR(`heroBuilds[${slug}]: предмет ${it.id} (${it.name}) отсутствует в itemsDB`); buildBad++; }
    else if (it.name && db.name !== it.name) WARN(`heroBuilds[${slug}]: ${it.id} имя «${it.name}» ≠ базе «${db.name}»`);
  }
}
P(`heroBuilds: героев ${buildHeroes}, предметов ${buildItems} (битых ${buildBad}, имя≠слаг ${selfNameBad}); покрытие страниц: ${[...buildKeys].filter(k => pageSet.has(k)).length}/${pages.length}`);
const noBuild = pages.filter(k => !buildKeys.has(k));
if (noBuild.length) P(`  без автосборки (${noBuild.length}): ${noBuild.join(', ')}`);

// ── 7. Лор ──
const noLore = pages.filter(k => !loreKeys.has(k));
P(`HERO_LORE: записей ${loreKeys.size}; страниц без лора ${noLore.length}${noLore.length ? ': ' + noLore.join(', ') : ''}`);
const orphanLore = [...loreKeys].filter(k => !ids.has(k));
if (orphanLore.length) WARN(`HERO_LORE: ключи без героя — ${orphanLore.join(', ')}`);

// ── 8. Галерея: type 'hero' ведёт по link на heroes/*.html ──
const gal = read('js/gallery-page.js');
const galLinks = [...new Set([...gal.matchAll(/heroes\/([a-z0-9-]+)\.html/g)].map(m => m[1]))];
let galBad = 0;
for (const slug of galLinks)
  if (!pageSet.has(slug)) { ERR(`галерея: link на heroes/${slug}.html — страницы нет`); galBad++; }
P(`галерея: ссылок на героев ${galLinks.length}, битых ${galBad}`);

// ── 9. Полнота статов (карта) ──
P(`wip без базовых статов (по замыслу, ждут данных из карты): ${noStats.length}`);
P(`нули в базовых статах («ждут заполнения»; у опубликованных героев видно на странице): ${zeroFields.length}${zeroFields.length ? ' → ' + zeroFields.join(', ') : ''}`);

P(errors || warns ? `\nитог: ошибок ${errors}, предупреждений ${warns}` : '\nитог: всё чисто');
process.exit(errors ? 1 : 0);
