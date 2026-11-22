#!/usr/bin/env node
/**
 * check-connections.mjs — гейт подключений скриптов и стилей (этап 6, по картам).
 *
 * По страницам (117 html):
 *   1. каждый <script src> и <link rel="stylesheet" href> резолвится в существующий файл;
 *   2. у страниц с шапкой site-settings.js ровно один, ui-effects.js не более одного;
 *   3. у страницы с шапкой есть icon-loader.js (создаёт кнопку Ctrl+K и скролл-фичи),
 *      у страницы с icon-loader есть search.js (иначе кнопка мёртвая);
 *   4. search.js подключён ДО icon-loader.js (конвенция сессии 27);
 *   5. порядок стилей: vendor/fontawesome → css/all.css (бандл) → постраничные css;
 *   6. в подкаталогах (heroes/, guides/) все локальные пути идут через ../;
 *   7. site-counters.js страницами не подключается (источник чисел для check-counters).
 *
 * По файлам:
 *   8. каждый js в js/ и js/data/ подключён хоть одной страницей либо в белом списке
 *      динамической загрузки search.js (search-index.js, items-db.js) либо вне рантайма
 *      (site-counters.js) — несвязный файл = находка;
 *   9. каждый css в css/ кроме генерируемого all.css подключён страницей либо входит
 *      в @import-список бандла — несвязный файл = находка;
 *  10. ни одна страница не грузит файл ядра бандла напрямую (двойное применение каскада);
 *  11. все 15 файлов ядра существуют, и css/all.css содержит их полный текст
 *      (нормализованный по пробелам) — правка ядра без пересборки ловится здесь.
 *
 * Гейт read-only. Коды возврата: 0 — чисто, 1 — есть находки.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const ROOT = resolve(new URL('.', import.meta.url).pathname, '..'); // скрипт лежит в scripts/ → корень на уровень выше

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) {
      if (['.git', 'node_modules', 'repo-archive', 'vendor', 'images', 'docs'].includes(name.name)) continue;
      walk(p, exts, out);
    } else if (exts.some(e => name.name.endsWith(e))) out.push(p);
  }
  return out;
}

const findings = [];
const add = (msg) => findings.push(msg);

// ── списки файлов ──
const pages = walk(ROOT, ['.html']);
const jsFiles = walk(join(ROOT, 'js'), ['.js']);
const cssFiles = walk(join(ROOT, 'css'), ['.css']).filter(f => !f.endsWith('all.css'));

// ядро бандла из @import-списка repo-archive/style.css (источник порядка сборки)
const importSrc = readFileSync(join(ROOT, 'repo-archive', 'style.css'), 'utf8');
const bundleFiles = [...importSrc.matchAll(/@import\s+url\('css\/([^']+)'\);/g)].map(m => 'css/' + m[1]);
if (bundleFiles.length !== 15) add(`ядро бандла: в repo-archive/style.css ${bundleFiles.length} @import вместо 15`);

// ── 8/9: карта использования js и css ──
const jsUsed = new Map(jsFiles.map(f => [f, false]));
const cssUsed = new Map(cssFiles.map(f => [f, false]));
const JS_DYNAMIC = new Set(['search-index.js', 'items-db.js']);   // ленивая загрузка search.js
const JS_GATE_ONLY = new Set(['site-counters.js']);               // источник чисел check-counters.py, не рантайм

const BUNDLE_BASES = new Set(bundleFiles.map(f => f.split('/').pop()));

// ── по страницам ──
let scriptsChecked = 0, linksChecked = 0;
for (const page of pages) {
  const rel = relative(ROOT, page);
  const html = readFileSync(page, 'utf8');
  const isSub = rel.includes('/');
  const srcs = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map(m => m[1]);
  const links = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*\shref="([^"]+)"/g)].map(m => m[1]);
  const hasHeader = /class="site-header"|header-nav/.test(html);
  const cnt = (pat) => srcs.filter(s => s.endsWith(pat)).length;

  // 1: резолв путей + 6: ../ в подкаталогах
  for (const s of srcs) {
    scriptsChecked++;
    if (!existsSync(join(dirname(page), s))) add(`${rel}: script НЕ РЕШАЕТСЯ → ${s}`);
    if (isSub && !s.startsWith('../') && !s.startsWith('http') && !s.startsWith('/'))
      add(`${rel}: script без ../ в подкаталоге → ${s}`);
    // карта использования js (по имени файла)
    const base = s.split('/').pop();
    if (jsUsed.has(join(ROOT, 'js', base === s ? '' : '', base)) || [...jsUsed.keys()].some(f => f.endsWith('/' + base)))
      for (const f of jsUsed.keys()) if (f.endsWith('/' + base)) jsUsed.set(f, true);
  }
  for (const s of links) {
    linksChecked++;
    if (!existsSync(join(dirname(page), s))) add(`${rel}: link НЕ РЕШАЕТСЯ → ${s}`);
    if (isSub && !s.startsWith('../') && !s.startsWith('http') && !s.startsWith('/'))
      add(`${rel}: link без ../ в подкаталоге → ${s}`);
    const base = s.split('/').pop();
    if (BUNDLE_BASES.has(base) && s.includes('/css/'))
      add(`${rel}: грузит файл ядра бандла напрямую (${s}) — двойное применение каскада`);
    for (const f of cssUsed.keys()) if (f.endsWith('/' + base) && !s.endsWith('css/all.css')) cssUsed.set(f, true);
  }

  // 2: синглтоны
  if (hasHeader && cnt('site-settings.js') !== 1)
    add(`${rel}: site-settings.js подключён ${cnt('site-settings.js')} раз (ожидался 1)`);
  if (cnt('ui-effects.js') > 1) add(`${rel}: ui-effects.js подключён ${cnt('ui-effects.js')} раз`);

  // 3: проводка поиска
  if (hasHeader && cnt('icon-loader.js') === 0)
    add(`${rel}: шапка есть, icon-loader НЕТ — кнопка поиска и скролл-фичи не создаются`);
  if (cnt('icon-loader.js') > 0 && cnt('search.js') === 0)
    add(`${rel}: icon-loader есть, search.js НЕТ — кнопка Ctrl+K мёртвая`);

  // 4: search.js до icon-loader.js
  const idxSearch = srcs.findIndex(s => s.endsWith('js/search.js'));
  const idxIcon = srcs.findIndex(s => s.endsWith('js/icon-loader.js'));
  if (idxSearch > -1 && idxIcon > -1 && idxSearch > idxIcon)
    add(`${rel}: search.js ПОСЛЕ icon-loader.js`);

  // 5: порядок стилей vendor → бандл → постраничные
  const idxVendor = links.findIndex(s => s.includes('vendor/fontawesome'));
  const idxBundle = links.findIndex(s => s.endsWith('css/all.css'));
  if (hasHeader && idxBundle === -1) add(`${rel}: нет css/all.css`);
  if (idxVendor > -1 && idxBundle > -1 && idxVendor > idxBundle)
    add(`${rel}: vendor ПОСЛЕ бандла`);
  const firstPageCss = links.findIndex(s => s.includes('/css/') && !s.endsWith('css/all.css') && !s.includes('vendor/'));
  if (idxBundle > -1 && firstPageCss > -1 && firstPageCss < idxBundle)
    add(`${rel}: постраничный css ${links[firstPageCss]} ПЕРЕД бандлом`);

  // 7: site-counters не для страниц
  if (srcs.some(s => s.includes('site-counters'))) add(`${rel}: подключён site-counters.js (не рантайм)`);
}

// 8: несвязные js
for (const [f, used] of jsUsed) {
  const base = f.split('/').pop();
  if (!used && !JS_DYNAMIC.has(base) && !JS_GATE_ONLY.has(base))
    add(`js не подключён нигде: ${relative(ROOT, f)}`);
}
// 9: несвязные css
for (const [f, used] of cssUsed) {
  const base = f.split('/').pop();
  if (!used && !bundleFiles.includes('css/' + base))
    add(`css не подключён нигде и не в бандле: ${relative(ROOT, f)}`);
}

// 11: все файлы ядра существуют, бандл содержит их полный текст (свежесть)
const allCssPath = join(ROOT, 'css', 'all.css');
if (!existsSync(allCssPath)) {
  add('css/all.css отсутствует');
} else {
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const all = norm(readFileSync(allCssPath, 'utf8'));
  for (const bf of bundleFiles) {
    const p = join(ROOT, bf);
    if (!existsSync(p)) { add(`файл ядра бандла отсутствует: ${bf}`); continue; }
    if (!all.includes(norm(readFileSync(p, 'utf8'))))
      add(`бандл устарел: ${bf} правился после последней пересборки css/all.css`);
  }
}

console.log(`Страниц: ${pages.length}; script-тегов: ${scriptsChecked}; link-тегов: ${linksChecked}; js: ${jsFiles.length}; css: ${cssFiles.length + 1}; ядро бандла: ${bundleFiles.length}`);
if (findings.length) {
  console.log(`\nНАХОДКИ (${findings.length}):`);
  findings.forEach(f => console.log('  ' + f));
  process.exit(1);
}
console.log('Находок: 0 — подключения чисты');
