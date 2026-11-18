#!/usr/bin/env node
/**
 * Вставка <script src="…js/site-settings.js"> сразу после открывающего <body>
 * на всех страницах сайта. Атрибуты настроек ставятся до первой отрисовки.
 * Префикс пути считается по глубине страницы (../ для подкаталогов).
 * Идемпотентно: страницы с site-settings.js пропускаются.
 * Запуск из корня репозитория: node scripts/tmp/insert-settings-tag.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
if (!fs.existsSync(path.join(ROOT, 'css/base.css'))) {
  console.error('Запускать из корня репозитория');
  process.exit(2);
}

const SKIP_DIRS = new Set(['.git', 'repo-archive', 'node_modules', 'vendor', 'docs', 'scripts', 'archive']);

const walk = (dir, depth, acc) => {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, depth + 1, acc);
    else if (name.endsWith('.html')) acc.push({ file: p, depth });
  }
  return acc;
};

const pages = walk(ROOT, 0, []);
let inserted = 0, skipped = 0, missed = 0;

for (const { file, depth } of pages) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('js/site-settings.js')) { skipped++; continue; }

  const prefix = '../'.repeat(depth);
  const tag = `    <script src="${prefix}js/site-settings.js"></script>\n`;

  // точка вставки — конец открывающего тега <body …>
  const m = html.match(/<body[^>]*>/i);
  if (!m) { console.log('НЕТ <body>: ' + path.relative(ROOT, file)); missed++; continue; }
  const at = m.index + m[0].length;
  html = html.slice(0, at) + '\n' + tag.trimEnd() + html.slice(at);

  fs.writeFileSync(file, html);
  inserted++;
}

console.log(`страниц: ${pages.length}, вставлено: ${inserted}, уже было: ${skipped}, без body: ${missed}`);
