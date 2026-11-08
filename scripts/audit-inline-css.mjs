#!/usr/bin/env node
/**
 * audit-inline-css.mjs — снимок хардкода стилей внутри HTML.
 *
 * Что считает:
 *   - style="..." атрибуты разметки (декларации, свойства, цвета);
 *   - <style> блоки (размер, декларации, дубли между файлами);
 *   - стили, которые генерируют inline <script> внутри HTML (шаблоны style=,
 *     setProperty, cssText) и внешние js/*.js (отдельной строкой отчёта);
 *   - цвета против палитры :root из css/base.css: что совпадает с токенами
 *     (механическая замена на var()), что вне палитры;
 *   - повторяющиеся style="..." паттерны (кандидаты на вынос в классы);
 *   - подключения css файлов по страницам.
 *
 * Метод: только чтение, сайт не трогает. Список файлов из git ls-files,
 * то есть ровно те HTML, что в репозитории, без локального мусора.
 *
 * Запуск:  node scripts/audit-inline-css.mjs [--md docs/CSS-INLINE-AUDIT.md]
 *
 * Правило проекта: аудит-отчёт сайт не меняет, правки отдельным чанком
 * по решению владельца. При перегенерации отчёта ручной раздел после
 * маркера «выводы ниже ведутся вручную» сохраняется.
 *
 * Внутри отчёт собирается конкатенацией обычных строк, без вложенных
 * шаблонных литералов: после истории с одной сломанной строкой это
 * осознанное правило для всех генераторов отчётов.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// --- корень и файлы ---------------------------------------------------------

const sanity = readFileSync(path.join(ROOT, 'index.html'), 'utf8');
if (!sanity.includes('Legend of Worlds')) {
  console.error('ОШИБКА: index.html не похож на сайт Legend of Worlds, проверь корень');
  process.exit(2);
}

const tracked = (pattern) =>
  execSync('git ls-files -- "' + pattern + '"', { cwd: ROOT, encoding: 'utf8' })
    .split('\n').map((s) => s.trim()).filter(Boolean);

const htmlFiles = tracked('*.html');
const jsFiles = tracked('js/*.js').concat(tracked('*.js')).filter((v, i, a) => a.indexOf(v) === i);
if (htmlFiles.length < 100) {
  console.error('ОШИБКА: подозрительно мало HTML (' + htmlFiles.length + '), проверь git ls-files');
  process.exit(2);
}

// --- парсеры ----------------------------------------------------------------

const COLOR_RE = /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;

/** декларации из текста: prop:value через точку с запятой, мусор отбрасывается */
function splitDecls(text) {
  const out = [];
  for (const chunk of String(text).split(';')) {
    const i = chunk.indexOf(':');
    if (i < 0) continue;
    const prop = chunk.slice(0, i).trim().toLowerCase();
    const value = chunk.slice(i + 1).trim().replace(/\s+/g, ' ');
    if (!/^[a-z-]{2,32}$/.test(prop) || !value) continue;
    out.push({ prop, value });
  }
  return out;
}

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const normColor = (s) => s.trim().toLowerCase().replace(/\s+/g, '');

/** нормализация style="..." в ключ повторяемости */
function normAttrKey(decls) {
  return decls
    .map((d) => d.prop + ':' + d.value.toLowerCase())
    .sort()
    .join(';');
}

/** HTML -> разметка без комментариев + список inline-скриптов */
function splitHtml(html) {
  const scripts = [];
  const markup = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_m, attrs, body) => {
      scripts.push({ attrs: attrs || '', body: body || '' });
      return ' ';
    });
  return { markup, scripts };
}

// --- палитра :root из base.css -----------------------------------------------

function readPalette() {
  const base = readFileSync(path.join(ROOT, 'css', 'base.css'), 'utf8');
  const map = new Map(); // нормализованное значение -> имя переменной
  const root = base.match(/:root\s*\{([\s\S]*?)\}/);
  if (root) {
    for (const m of root[1].matchAll(/^\s*(--[\w-]+)\s*:\s*([^;]+);/gm)) {
      const val = normColor(m[2]);
      if (!map.has(val)) map.set(val, m[1]);
    }
  }
  return map;
}
const palette = readPalette();

// --- проход по HTML ------------------------------------------------------------

const files = [];
const propAgg = new Map();       // prop -> { count, values: Map }
const colorAgg = new Map();      // normColor -> { raw, count, files:Set, pal, where:Set }
const attrKeyAgg = new Map();    // нормализованный style= -> { count, files:Set, sample }
const blockAgg = new Map();      // содержимое <style> -> { count, files:Set, bytes }
const cssLinksAgg = new Map();   // href -> число страниц
const htmlScriptAgg = { styleAttr: 0, setProperty: 0, cssText: 0 };

function bumpProp(prop, value) {
  if (!propAgg.has(prop)) propAgg.set(prop, { count: 0, values: new Map() });
  const rec = propAgg.get(prop);
  rec.count += 1;
  rec.values.set(value, (rec.values.get(value) || 0) + 1);
}

function bumpColor(raw, where, file) {
  const norm = normColor(raw);
  if (!colorAgg.has(norm)) {
    colorAgg.set(norm, { raw, count: 0, files: new Set(), where: new Set(), pal: palette.get(norm) || null });
  }
  const rec = colorAgg.get(norm);
  rec.count += 1;
  rec.files.add(file);
  rec.where.add(where);
}

function gatherColors(text, where, file) {
  for (const m of String(text).matchAll(COLOR_RE)) bumpColor(m[0], where, file);
}

for (const rel of htmlFiles) {
  const html = readFileSync(path.join(ROOT, rel), 'utf8');
  const { markup, scripts } = splitHtml(html);
  const rec = {
    file: rel,
    attrCount: 0, attrDecls: 0,
    blockCount: 0, blockBytes: 0, blockDecls: 0,
    scriptStyleAttr: 0, scriptSetProperty: 0, scriptCssText: 0,
    cssLinks: [],
  };

  // style="..." атрибуты разметки
  for (const m of markup.matchAll(/style\s*=\s*"([^"]*)"/g)) {
    const decls = splitDecls(m[1]);
    rec.attrCount += 1;
    rec.attrDecls += decls.length;
    for (const d of decls) bumpProp(d.prop, d.value);
    for (const d of decls) if (!/^var\(/.test(d.value)) gatherColors(d.value, 'attr', rel);
    const key = normAttrKey(decls);
    if (key) {
      if (!attrKeyAgg.has(key)) attrKeyAgg.set(key, { count: 0, files: new Set(), sample: decls.map((d) => d.prop + ': ' + d.value).join('; ') });
      attrKeyAgg.get(key).count += 1;
      attrKeyAgg.get(key).files.add(rel);
    }
  }
  for (const m of markup.matchAll(/style\s*=\s*'([^']*)'/g)) {
    const decls = splitDecls(m[1]);
    rec.attrCount += 1;
    rec.attrDecls += decls.length;
    for (const d of decls) bumpProp(d.prop, d.value);
  }

  // <style> блоки
  for (const m of markup.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    const body = m[1];
    rec.blockCount += 1;
    rec.blockBytes += body.length;
    const clean = stripComments(body);
    const decls = splitDecls(clean);
    rec.blockDecls += decls.length;
    for (const d of decls) bumpProp(d.prop, d.value);
    gatherColors(clean, 'block', rel);
    const key = clean.replace(/\s+/g, ' ').trim();
    if (key) {
      if (!blockAgg.has(key)) blockAgg.set(key, { count: 0, files: new Set(), bytes: body.length });
      blockAgg.get(key).count += 1;
      blockAgg.get(key).files.add(rel);
    }
  }

  // inline <script>: шаблонные style=, setProperty, cssText
  for (const s of scripts) {
    rec.scriptStyleAttr += (s.body.match(/style\s*=\s*["']/g) || []).length;
    rec.scriptSetProperty += (s.body.match(/setProperty\(/g) || []).length;
    rec.scriptCssText += (s.body.match(/cssText/g) || []).length;
  }
  htmlScriptAgg.styleAttr += rec.scriptStyleAttr;
  htmlScriptAgg.setProperty += rec.scriptSetProperty;
  htmlScriptAgg.cssText += rec.scriptCssText;

  // подключения стилей
  for (const m of markup.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)) {
    const href = (m[0].match(/href=["']([^"']+)["']/i) || [])[1];
    if (href) {
      rec.cssLinks.push(href);
      cssLinksAgg.set(href, (cssLinksAgg.get(href) || 0) + 1);
    }
  }

  rec.totalDecls = rec.attrDecls + rec.blockDecls;
  files.push(rec);
}

// --- проход по внешним js --------------------------------------------------------

const jsScore = (s) => s.styleAssign + s.setProperty + s.cssText + s.colors;
const jsStats = jsFiles.map((rel) => {
  const src = readFileSync(path.join(ROOT, rel), 'utf8');
  return {
    file: rel,
    styleAssign: (src.match(/\.style\s*\.\s*[A-Za-z]+\s*=/g) || []).length,
    setProperty: (src.match(/setProperty\(/g) || []).length,
    cssText: (src.match(/cssText/g) || []).length,
    colors: (src.match(COLOR_RE) || []).length,
  };
}).filter((s) => jsScore(s) > 0).sort((a, b) => jsScore(b) - jsScore(a));

// --- агрегаты ----------------------------------------------------------------------

files.sort((a, b) => b.totalDecls - a.totalDecls || b.attrCount - a.attrCount);
const totals = files.reduce((t, f) => ({
  attrCount: t.attrCount + f.attrCount,
  attrDecls: t.attrDecls + f.attrDecls,
  blockCount: t.blockCount + f.blockCount,
  blockBytes: t.blockBytes + f.blockBytes,
  blockDecls: t.blockDecls + f.blockDecls,
}), { attrCount: 0, attrDecls: 0, blockCount: 0, blockBytes: 0, blockDecls: 0 });

const groupAgg = new Map();
for (const f of files) {
  const dir = path.dirname(f.file) === '.' ? 'корень' : path.dirname(f.file);
  if (!groupAgg.has(dir)) groupAgg.set(dir, { files: 0, attrCount: 0, attrDecls: 0, blockDecls: 0 });
  const g = groupAgg.get(dir);
  g.files += 1; g.attrCount += f.attrCount; g.attrDecls += f.attrDecls; g.blockDecls += f.blockDecls;
}

const colorsAll = [...colorAgg.values()].sort((a, b) => b.count - a.count);
const colorsPalette = colorsAll.filter((c) => c.pal);
const colorsOff = colorsAll.filter((c) => !c.pal);
const dupAttrs = [...attrKeyAgg.entries()].filter(([, r]) => r.count > 1).sort((a, b) => b[1].count - a[1].count);
const dupBlocks = [...blockAgg.entries()].filter(([, r]) => r.count > 1);

// --- консоль --------------------------------------------------------------------------

const out = [];
const add = (s) => out.push(s);
add('='.repeat(72));
add('АУДИТ ХАРДКОДА СТИЛЕЙ В HTML, файлов: ' + htmlFiles.length);
add('='.repeat(72));
add('style= атрибуты: ' + totals.attrCount + ' в ' + files.filter((f) => f.attrCount).length + ' файлах, деклараций: ' + totals.attrDecls);
add('<style> блоки: ' + totals.blockCount + ' в ' + files.filter((f) => f.blockCount).length + ' файлах, ' + totals.blockBytes + ' байт, деклараций: ' + totals.blockDecls);
add('inline-скрипты HTML: шаблонных style= ' + htmlScriptAgg.styleAttr + ', setProperty ' + htmlScriptAgg.setProperty + ', cssText ' + htmlScriptAgg.cssText);
add('всего деклараций в HTML: ' + (totals.attrDecls + totals.blockDecls));
add('');
add('ТОП ФАЙЛОВ по декларациям (attr+block):');
for (const f of files.slice(0, 20)) {
  add('  ' + String(f.totalDecls).padStart(4) + '  attr ' + String(f.attrCount).padStart(3) + '/' + String(f.attrDecls).padStart(3) + '  block ' + f.blockCount + '/' + String(f.blockBytes).padStart(6) + 'B  ' + f.file);
}
add('');
add('ГРУППЫ КАТАЛОГОВ:');
for (const [dir, g] of [...groupAgg.entries()].sort((a, b) => (b[1].attrDecls + b[1].blockDecls) - (a[1].attrDecls + a[1].blockDecls))) {
  add('  ' + dir + ': файлов ' + g.files + ', style= ' + g.attrCount + ' (декл. ' + g.attrDecls + '), блоки декл. ' + g.blockDecls);
}
add('');
add('ТОП СВОЙСТВ:');
for (const [prop, rec] of [...propAgg.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 20)) {
  const top = [...rec.values.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([v, c]) => v + ' x' + c).join(', ');
  add('  ' + String(rec.count).padStart(4) + '  ' + prop + ': ' + top);
}
add('');
add('ЦВЕТА: уникальных значений ' + colorsAll.length);
add('  совпадают с палитрой :root: ' + colorsPalette.length + ' значений, ' + colorsPalette.reduce((s, c) => s + c.count, 0) + ' вхождений');
for (const c of colorsPalette.slice(0, 15)) add('    ' + c.raw + '  ->  ' + c.pal + '  x' + c.count + '  (' + c.files.size + ' файлов)');
add('  вне палитры: ' + colorsOff.length + ' значений, ' + colorsOff.reduce((s, c) => s + c.count, 0) + ' вхождений');
for (const c of colorsOff.slice(0, 25)) add('    ' + c.raw + '  x' + c.count + '  (' + c.files.size + ' файлов)  [' + [...c.where].join(',') + ']');
add('');
add('ПОВТОРЯЮЩИЕСЯ style= ПАТТЕРНЫ (кандидаты на вынос):');
for (const [, rec] of dupAttrs.slice(0, 15)) {
  add('  x' + rec.count + '  ' + rec.sample.slice(0, 100) + (rec.sample.length > 100 ? '...' : ''));
}
add('');
add('ДУБЛИ <style> БЛОКОВ МЕЖДУ ФАЙЛАМИ:');
if (!dupBlocks.length) add('  нет');
for (const [, rec] of dupBlocks.slice(0, 10)) add('  x' + rec.count + ' файлов, ' + rec.bytes + ' байт: ' + [...rec.files].slice(0, 5).join(', ') + (rec.files.size > 5 ? '...' : ''));
add('');
add('ПОДКЛЮЧЕНИЯ CSS:');
for (const [href, n] of [...cssLinksAgg.entries()].sort((a, b) => b[1] - a[1])) add('  ' + String(n).padStart(3) + '  ' + href);
add('');
add('СТИЛИ ИЗ ВНЕШНИХ JS (топ 12):');
for (const s of jsStats.slice(0, 12)) {
  add('  ' + String(s.styleAssign).padStart(4) + ' assign, ' + String(s.setProperty).padStart(3) + ' setProperty, ' + String(s.cssText).padStart(3) + ' cssText, ' + String(s.colors).padStart(4) + ' цветов  ' + s.file);
}
console.log(out.join('\n'));

// --- markdown (конкатенация обычных строк, без вложенных шаблонов) ---------------------

const mdArg = process.argv.indexOf('--md');
if (mdArg > -1) {
  const mdPath = path.resolve(ROOT, process.argv[mdArg + 1]);
  const manualMarker = '<!-- выводы ниже ведутся вручную, скрипт при перегенерации их сохраняет -->';

  const md = [];
  const T = (cells) => cells.join(' | ');
  const table = (rows) => rows.map((r) => '| ' + T(r) + ' |').join('\n');
  const q = (s) => '`' + s + '`'; // бэктики в одинарных строках безопасны

  md.push('# CSS-INLINE-AUDIT — хардкод стилей внутри HTML');
  md.push('');
  md.push('Снимок на ' + new Date().toISOString().slice(0, 10) + '. Генератор: ' + q('scripts/audit-inline-css.mjs') + ', перегенерация перезаписывает всё, кроме раздела после маркера «выводы ниже ведутся вручную». Метод: чтение ' + htmlFiles.length + ' HTML из git, разбор style= атрибутов разметки, <style> блоков и inline-скриптов, сверка цветов с палитрой :root из base.css. Сайт не тронут: правки по отчёту отдельным чанком по решению владельца.');
  md.push('');
  md.push('## Итог');
  md.push('');
  md.push(table([
    ['Показатель', 'Значение'],
    ['style= атрибутов в разметке', totals.attrCount + ' в ' + files.filter((f) => f.attrCount).length + ' файлах из ' + htmlFiles.length],
    ['деклараций в них', String(totals.attrDecls)],
    ['<style> блоков', totals.blockCount + ' в ' + files.filter((f) => f.blockCount).length + ' файлах, ' + totals.blockBytes + ' байт'],
    ['деклараций в блоках', String(totals.blockDecls)],
    ['шаблонных style= в inline-скриптах страниц', String(htmlScriptAgg.styleAttr)],
    ['setProperty / cssText в inline-скриптах', htmlScriptAgg.setProperty + ' / ' + htmlScriptAgg.cssText],
    ['всего деклараций в HTML', String(totals.attrDecls + totals.blockDecls)],
    ['уникальных цветов', colorsAll.length + ' (с палитрой: ' + colorsPalette.length + ', вне: ' + colorsOff.length + ')'],
    ['вхождений цветов, совпадающих с :root', String(colorsPalette.reduce((s, c) => s + c.count, 0))],
    ['вхождений цветов вне палитры', String(colorsOff.reduce((s, c) => s + c.count, 0))],
  ]));
  md.push('');
  md.push('## Файлы: style= и <style> по убыванию веса');
  md.push('');
  md.push(table([['Файл', 'style=', 'декл. attr', '<style>', 'байт', 'декл. блоков', 'всего декл.']].concat(
    files.filter((f) => f.totalDecls > 0).slice(0, 40).map((f) => [f.file, String(f.attrCount), String(f.attrDecls), String(f.blockCount), String(f.blockBytes), String(f.blockDecls), String(f.totalDecls)])
  )));
  md.push('');
  md.push('Остальные файлы: ноль деклараций или единичные атрибуты, полный список в консольном выводе скрипта.');
  md.push('');
  md.push('## Группы каталогов');
  md.push('');
  md.push(table([['Каталог', 'Файлов', 'style=', 'декл. attr', 'декл. блоков']].concat(
    [...groupAgg.entries()].sort((a, b) => (b[1].attrDecls + b[1].blockDecls) - (a[1].attrDecls + a[1].blockDecls))
      .map(([dir, g]) => [dir, String(g.files), String(g.attrCount), String(g.attrDecls), String(g.blockDecls)])
  )));
  md.push('');
  md.push('## Свойства (top 20)');
  md.push('');
  md.push(table([['Свойство', 'Вхождений', 'Значения (top 3)']].concat(
    [...propAgg.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 20).map(([prop, rec]) => {
      const top = [...rec.values.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([v, c]) => q(v) + ' x' + c).join(', ');
      return [prop, String(rec.count), top];
    })
  )));
  md.push('');
  md.push('## Цвета против палитры :root');
  md.push('');
  md.push('Совпадения: значение уже есть в токенах, замена на var() механическая и не меняет рендер.');
  md.push('');
  md.push(table([['Значение', 'Токен', 'Вхождений', 'Файлов']].concat(
    colorsPalette.map((c) => [q(c.raw), c.pal, String(c.count), String(c.files.size)])
  )));
  md.push('');
  md.push('Вне палитры: решение редизайна — токенизировать, оставить как уникальный контент или привести к ближайшему токену.');
  md.push('');
  md.push(table([['Значение', 'Вхождений', 'Файлов', 'Где']].concat(
    colorsOff.map((c) => [q(c.raw), String(c.count), String(c.files.size), [...c.where].join(', ')])
  )));
  md.push('');
  md.push('## Повторяющиеся style= паттерны');
  md.push('');
  md.push('Кандидаты на вынос в классы: одинаковые наборы деклараций на многих страницах.');
  md.push('');
  md.push(table([['Раз', 'Декларации', 'Файлов']].concat(
    dupAttrs.slice(0, 25).map(([, r]) => [String(r.count), r.sample.slice(0, 140), String(r.files.size)])
  )));
  md.push('');
  md.push('## Дубли <style> блоков между файлами');
  md.push('');
  md.push(dupBlocks.length
    ? table([['Файлов с одинаковым блоком', 'Байт', 'Где']].concat(dupBlocks.slice(0, 10).map(([, r]) => [String(r.count), String(r.bytes), [...r.files].join(', ')])))
    : 'Нет: каждый блок уникален.');
  md.push('');
  md.push('## Подключения css по страницам');
  md.push('');
  md.push(table([['Файл css', 'Страниц']].concat(
    [...cssLinksAgg.entries()].sort((a, b) => b[1] - a[1]).map(([href, n]) => [href, String(n)])
  )));
  md.push('');
  md.push('## Стили из внешних js (top 12)');
  md.push('');
  md.push('Прямые присваивания .style.*, setProperty, cssText и цветовые литералы в коде. Выносится не в разметку, а в токены и классы, либо через CSS-переменные.');
  md.push('');
  md.push(table([['Файл', 'style.* =', 'setProperty', 'cssText', 'цветовых литералов']].concat(
    jsStats.slice(0, 12).map((s) => [s.file, String(s.styleAssign), String(s.setProperty), String(s.cssText), String(s.colors)])
  )));
  md.push('');
  md.push(manualMarker);
  md.push('');

  let finalMd = md.join('\n');
  if (existsSync(mdPath)) {
    const old = readFileSync(mdPath, 'utf8');
    const i = old.indexOf(manualMarker);
    if (i > -1) {
      const manual = old.slice(i + manualMarker.length);
      finalMd = finalMd.replace(manualMarker + '\n', manualMarker + manual);
    }
  }
  writeFileSync(mdPath, finalMd);
  console.log('\nОтчёт: ' + path.relative(ROOT, mdPath));
}
