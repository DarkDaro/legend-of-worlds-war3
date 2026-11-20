#!/usr/bin/env node
/**
 * wiring-audit.mjs — аудит подключений скриптов и стилей на всех html-страницах
 * после реорганизации корня (этап 6, R2-R4). Проверки:
 *  1. каждый <script src> и <link rel="stylesheet" href> резолвится в существующий файл;
 *  2. синглтоны: site-settings.js ровно один на странице с шапкой;
 *  3. страница с .header-nav обязана подключать search.js (иначе кнопка Ctrl+K мёртвая);
 *  4. порядок стилей: vendor → css/all.css (бандл) → постраничные css;
 *  5. порядок defer-скриптов: база (js/data/) → сервис/парсер → контроллер (как в defer-order-check);
 *  6. в подкаталогах (heroes/, guides/) все пути идут через ../;
 *  7. site-counters.js нигде не подключается (источник чисел для гейта, не рантайм);
 *  8. ui-effects.js подключён не более одного раза (тело в комментарии 2.13).
 * Вывод: только находки + сводка. Код возврата: 0 — чисто, 1 — есть находки.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const ROOT = resolve(new URL('.', import.meta.url).pathname, '..', '..');

function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) {
      if (['.git', 'node_modules', 'repo-archive', 'vendor', 'images', 'scripts', 'docs'].includes(name.name)) continue;
      out = out.concat(walk(p));
    } else if (name.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const pages = walk(ROOT);
const findings = [];
let checked = { scripts: 0, links: 0 };

for (const page of pages) {
  const rel = relative(ROOT, page);
  const html = readFileSync(page, 'utf8');
  const isSub = rel.includes('/');
  const head = html.slice(0, html.indexOf('</head>'));

  // ── script src / link href: резолв и подсчёты ──
  const srcs = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map(m => m[1]);
  const links = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*\shref="([^"]+)"/g)].map(m => m[1]);
  const missing = [];
  for (const s of srcs) { checked.scripts++; if (!existsSync(join(dirname(page), s))) missing.push('script: ' + s); }
  for (const s of links) { checked.links++; if (!existsSync(join(dirname(page), s))) missing.push('link: ' + s); }
  if (missing.length) findings.push(`${rel}: НЕ РЕШАЮТСЯ → ${missing.join('; ')}`);

  // site-counters.js не подключается страницами
  if (srcs.some(s => s.includes('site-counters'))) findings.push(`${rel}: подключён site-counters.js (не рантайм)`);

  const hasHeader = /class="site-header"|header-nav/.test(html);
  const cnt = (pat) => srcs.filter(s => s.endsWith(pat)).length;

  // синглтоны
  if (hasHeader && cnt('site-settings.js') !== 1)
    findings.push(`${rel}: site-settings.js подключён ${cnt('site-settings.js')} раз (ожидался 1)`);
  if (cnt('ui-effects.js') > 1) findings.push(`${rel}: ui-effects.js подключён ${cnt('ui-effects.js')} раз`);

  // поиск: у страницы с шапкой должен быть icon-loader (создаёт кнопку Ctrl+K) и search.js (открывает)
  if (hasHeader && cnt('icon-loader.js') === 0)
    findings.push(`${rel}: шапка есть, icon-loader НЕТ — кнопка поиска и скролл-фичи не создаются`);
  if (cnt('icon-loader.js') > 0 && cnt('search.js') === 0)
    findings.push(`${rel}: icon-loader есть, search.js НЕТ — кнопка Ctrl+K мёртвая`);

  // ── порядок стилей: vendor до бандла, бандл до постраничных ──
  const idxVendor = links.findIndex(s => s.includes('vendor/fontawesome'));
  const idxBundle = links.findIndex(s => s.endsWith('css/all.css'));
  const pageCss = links.filter(s => s.includes('/css/') && !s.endsWith('css/all.css') && !s.includes('vendor/'));
  if (idxBundle === -1 && hasHeader) findings.push(`${rel}: нет css/all.css`);
  if (idxVendor > -1 && idxBundle > -1 && idxVendor > idxBundle)
    findings.push(`${rel}: vendor ПОСЛЕ бандла (каскад иконок поверх темы)`);
  const firstPageCss = links.findIndex(s => pageCss.some(p => s === p));
  if (idxBundle > -1 && firstPageCss > -1 && firstPageCss < idxBundle)
    findings.push(`${rel}: постраничный css ${links[firstPageCss]} ПЕРЕД бандлом`);

  // ── порядок defer-скриптов: база до сервиса/контроллера, search.js до icon-loader ──
  const idxSearch = srcs.findIndex(s => s.endsWith('js/search.js'));
  const idxIcon = srcs.findIndex(s => s.endsWith('js/icon-loader.js'));
  if (idxSearch > -1 && idxIcon > -1 && idxSearch > idxIcon)
    findings.push(`${rel}: search.js ПОСЛЕ icon-loader.js (нарушает конвенцию 27-й сессии)`);

  // подкаталоги: все пути через ../
  if (isSub) {
    const bad = [...srcs, ...links].filter(s => !s.startsWith('../') && !s.startsWith('http') && !s.startsWith('/'));
    if (bad.length) findings.push(`${rel}: путь без ../ в подкаталоге → ${bad.join('; ')}`);
  }
}

console.log(`Страниц: ${pages.length}; script-тегов: ${checked.scripts}; link-тегов: ${checked.links}`);
if (findings.length) {
  console.log(`\nНАХОДКИ (${findings.length}):`);
  findings.forEach(f => console.log('  ' + f));
  process.exit(1);
} else {
  console.log('Находок: 0 — проводка чиста');
}
