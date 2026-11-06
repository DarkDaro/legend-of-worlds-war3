#!/usr/bin/env node
/**
 * check-links.mjs — проверка внутренних ссылок во всех HTML сайта.
 *
 * Что делает:
 *   - обходит корень репозитория (привязка к расположению скрипта, cwd не важен);
 *   - в каждом .html извлекает href="..." и src="..." с номерами строк;
 *   - пропускает внешние (http/https/mailto/tel/javascript/data/…) и схемные ссылки;
 *   - внутренние пути проверяет на существование файла; для ссылок вида
 *     "page.html#якорь" проверяет наличие якоря (id=/name=) в целевом файле;
 *   - каталог-ссылки ("guides/", "./") разворачивает в index.html.
 *
 * Запуск:  node scripts/check-links.mjs   (из любого каталога)
 * Код возврата: 0 — всё чисто, 1 — есть битые ссылки.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'repo-archive']);

/** Рекурсивный обход корня: только .html */
async function walkHtml(dir, acc = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walkHtml(path.join(dir, entry.name), acc);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      acc.push(path.join(dir, entry.name));
    }
  }
  return acc;
}

/** Номер строки по смещению в тексте */
function lineOf(text, pos) {
  let n = 1;
  for (let i = 0; i < pos && i < text.length; i++) if (text[i] === '\n') n++;
  return n;
}

/** Есть ли якорь в HTML-тексте */
function hasAnchor(html, frag) {
  const esc = frag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?:\\sid|\\sname)\\s*=\\s*["']${esc}["']`, 'i');
  return re.test(html);
}

const broken = [];
let totalRefs = 0;
let files = 0;

const htmls = await walkHtml(ROOT);
files = htmls.length;

for (const file of htmls) {
  const text = await fs.readFile(file, 'utf8');
  const refRe = /\b(href|src)\s*=\s*["']([^"']*)["']/gi;
  let m;
  while ((m = refRe.exec(text)) !== null) {
    const raw = m[2].trim();
    const line = lineOf(text, m.index);
    if (!raw || raw.startsWith('#')) continue; // пустые и внутристаничные
    if (/^(https?:|\/\/|mailto:|tel:|javascript:|data:|blob:)/i.test(raw)) continue;
    if (/^\w+:/.test(raw)) continue; // прочие схемы

    const rel = path.relative(ROOT, file);
    const [pathPart, frag] = raw.split('#');
    const clean = pathPart.split('?')[0].trim(); // query (?item=…) — не часть пути
    if (clean === '') continue;

    let target;
    try {
      target = path.resolve(path.dirname(file), decodeURIComponent(clean));
    } catch {
      broken.push(`${rel}:${line}: «${raw}» — некорректный URL-encode`);
      continue;
    }

    // каталог или "." → index.html внутри
    if (target.endsWith(path.sep) || clean.endsWith('/') || clean === '.') {
      target = path.join(target, 'index.html');
    }

    if (!target.startsWith(ROOT + path.sep) && target !== ROOT) {
      broken.push(`${rel}:${line}: «${raw}» — ссылка уходит за пределы репозитория`);
      continue;
    }

    let stat = null;
    try { stat = await fs.stat(target); } catch { /* нет файла */ }
    if (!stat) {
      broken.push(`${rel}:${line}: «${raw}» — файл не найден`);
      continue;
    }
    totalRefs++;
    if (frag) {
      if (stat.isDirectory()) continue;
      const targetHtml = await fs.readFile(target, 'utf8').catch(() => null);
      if (targetHtml === null) continue;
      if (!hasAnchor(targetHtml, frag)) {
        broken.push(`${rel}:${line}: «${raw}» — нет якоря «#${frag}» в целевом файле`);
      }
    }
  }
}

console.log(`Файлов HTML: ${files}; внутренних ссылок проверено: ${totalRefs}; битых: ${broken.length}`);
if (broken.length) {
  console.log('\n--- битые ссылки ---');
  for (const b of broken) console.log(b);
  process.exit(1);
}
