#!/usr/bin/env node
/* dead-scan.mjs — свежий скан мёртвых классов по ПОЛНОЙ карте (после этапа 6).
   Извлекает классы из живых css (комментарии-обёртки 2.13 вычищаются перед
   извлечением — отключённые правила не считаются живыми) и ищет каждое имя
   во всех 117 html (включая inline-скрипты) и всех 48 js (включая js/data/).
   Кандидат = 0 попаданий по слову. Кандидаты вручную проверяются на
   динамическую сборку имён ('pct-' + key) перед вердиктом. Ничего не правит. */
import { readdirSync, readFileSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const SKIP = new Set(['.git', 'node_modules', 'repo-archive', 'vendor', 'images', 'docs']);

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) {
      if (SKIP.has(name.name)) continue;
      walk(p, exts, out);
    } else if (exts.some(e => name.name.endsWith(e))) out.push(p);
  }
  return out;
}

// живой css: css/ без генерируемого all.css
const cssFiles = walk(join(ROOT, 'css'), ['.css']).filter(f => !f.endsWith('all.css'));
const htmlFiles = walk(ROOT, ['.html']);
const jsFiles = walk(join(ROOT, 'js'), ['.js']);

const mapBlobs = [
  ...htmlFiles.map(f => ({ f: relative(ROOT, f), s: readFileSync(f, 'utf8') })),
  ...jsFiles.map(f => ({ f: relative(ROOT, f), s: readFileSync(f, 'utf8') })),
];

// классы из css без комментариев (обёртки 2.13 не извлекаются)
const classes = new Map(); // имя -> файлы
for (const f of cssFiles) {
  const raw = readFileSync(f, 'utf8');
  const live = raw.replace(/\/\*[\s\S]*?\*\//g, ' ');
  for (const m of live.matchAll(/\.([A-Za-z_][\w-]*)/g)) {
    const name = m[1];
    if (!classes.has(name)) classes.set(name, []);
    classes.set(name, classes.get(name).concat(relative(ROOT, f)));
  }
}

function usage(name) {
  const re = new RegExp('\\b' + name + '\\b');
  return mapBlobs.filter(b => re.test(b.s)).map(b => b.f);
}

const dead = [], live = 0;
let liveCount = 0;
for (const [name, files] of classes) {
  const hits = usage(name);
  if (hits.length === 0) dead.push({ name, files: [...new Set(files)] });
  else liveCount++;
}

console.log(`css файлов: ${cssFiles.length}; уникальных классов: ${classes.size}; живых: ${liveCount}; кандидатов в мёртвые: ${dead.length}`);
if (dead.length) {
  console.log('\nКандидаты (требуют ручной проверки на динамическую сборку имён):');
  for (const d of dead) console.log(`  ${d.name}  [${d.files.join(', ')}]`);
}
