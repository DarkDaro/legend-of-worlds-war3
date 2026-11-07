#!/usr/bin/env node
/**
 * check-header-sync.mjs — страж синхронности общей шапки сайта.
 *
 * Сайт без сборки: шапка <header class="site-header"> скопирована в каждую
 * страницу, рассинхрон уже ловили руками (ARCHITECTURE §11.1, «фикс навигации
 * на всех страницах» из v6.8). Футер собирает генератор place-footer.py,
 * шапке генератора нет — вместо неё этот гейт.
 *
 * Что делает: извлекает шапку из каждой обслуживаемой страницы, канонизирует
 * (снимает метку активного раздела, срезает ../ префиксы подкаталогов,
 * схлопывает пробелы) и требует, чтобы канонический вариант был ровно один.
 *
 * Исключения: 404.html и site-validator.html — собственные каркасы без общей шапки.
 * Запуск: node scripts/check-header-sync.mjs   (из любого каталога)
 * Коды возврата: 0 — одна каноническая шапка на всех; 1 — рассинхрон или шапка не найдена.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['.git', 'repo-archive', 'node_modules', 'vendor', 'scripts', 'docs']);
const EXCLUDE = new Set(['404.html', 'site-validator.html']);

function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.has(name)) out = out.concat(walk(p));
    } else if (name.endsWith('.html')) {
      out.push(p);
    }
  }
  return out;
}

const pages = walk(ROOT).filter((p) => !EXCLUDE.has(relative(ROOT, p)));
const variants = new Map();
const missing = [];

for (const page of pages) {
  const rel = relative(ROOT, page).split(sep).join('/');
  const html = readFileSync(page, 'utf8');
  const m = html.match(/<header class="site-header">[\s\S]*?<\/header>/);
  if (!m) {
    missing.push(rel);
    continue;
  }
  const canon = m[0]
    // метка текущего раздела — легитимное отличие, снимаем
    .replace(/class="([^"]*)"/g, (s, cls) => {
      const rest = cls.split(/\s+/).filter((c) => c && c !== 'active').join(' ');
      return `class="${rest}"`;
    })
    // префикс подкаталога — легитимное отличие, срезаем
    .replace(/((?:href|src)=")\.\.\//g, '$1')
    // пробелы и разбивка на строки не участвуют в сравнении
    .replace(/\s+/g, ' ')
    .trim();
  if (!variants.has(canon)) variants.set(canon, []);
  variants.get(canon).push(rel);
}

console.log(`Страниц с шапкой: ${pages.length - missing.length}; канонических вариантов шапки: ${variants.size}`);

let ok = true;
if (missing.length) {
  ok = false;
  console.log('\nБез общей шапки (ожидались только исключения):');
  for (const rel of missing) console.log('  ' + rel);
}
if (variants.size > 1) {
  ok = false;
  console.log('\nРАССИНХРОН ШАПОК. Варианты:');
  for (const [canon, list] of variants) {
    console.log(`  вариант, ${list.length} стр.: ${list.slice(0, 6).join(', ')}${list.length > 6 ? ' …' : ''}`);
    console.log(`    начало: ${canon.slice(0, 140)}…`);
  }
}
if (!ok) process.exit(1);
