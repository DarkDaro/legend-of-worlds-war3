#!/usr/bin/env node
/* TD-16 верификатор: мёртв ли класс по факту — ищем использование
   во ВСЕХ HTML (117 страниц: корень + heroes/ + guides/, включая inline-скрипты)
   и во ВСЕХ js (js/ + js/data/ — базы генерируют разметку с классами).
   Обновлено после реорганизации этапа 6 (R3/R4): раньше сканировал только
   корневые html и js/ без js/data/ — та же ловушка, что у аудита 08.11.
   Ничего не правит. */
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

const CLASSES = [
  // hero-page.css
  'ability-cycle-group','cycle-hint','cycle-key','cycle-label','innate','luck-chance','hero-tips',
  // compare.css
  'ability-cell','ability-passive','compare-card-build',
  // monsters.css
  'boss-stages','boss-stage-desc','boss-stage-threshold','drop-bonus','monster-code','monsters-intro','support-hero',
  // formulas-calc.css
  'chip-value','formula-source-chip','formula-sources','luck-item-total',
  // items.css
  'consumable','hero-reco-list',
  // home.css / effects.css
  'footer-links','footer-social','stat-primary',
  // lore.css, info.css, balance.css, armor-calc.css, calc.css
  'logo-icon','mc-tag-fix','balance-page-icon','armor-toggle','compare-back-link',
  // search.css
  'bc-paste-stage-btn',
  // balance-dashboard.css
  'pct-best','pct-high','pct-low','pct-mid',
];

const htmlFiles = walk(ROOT, ['.html']);                       // 117: корень + heroes/ + guides/
const jsFiles = walk(join(ROOT, 'js'), ['.js']);               // js/ + js/data/

const htmlBlobs = htmlFiles.map(f => ({ f: relative(ROOT, f), s: readFileSync(f, 'utf8') }));
const jsBlobs = jsFiles.map(f => ({ f: relative(ROOT, f), s: readFileSync(f, 'utf8') }));

function usage(name) {
  const hits = [];
  const re = new RegExp('\\b' + name + '\\b');
  for (const { f, s } of htmlBlobs) {
    if (re.test(s)) {
      const lines = s.split('\n').map((l, i) => [i + 1, l]).filter(([, l]) => re.test(l));
      hits.push({ file: f, lines });
    }
  }
  for (const { f, s } of jsBlobs) {
    if (re.test(s)) {
      const lines = s.split('\n').map((l, i) => [i + 1, l]).filter(([, l]) => re.test(l));
      hits.push({ file: f, lines });
    }
  }
  return hits;
}

let deadCount = 0, aliveCount = 0;
for (const c of CLASSES) {
  const hits = usage(c);
  if (hits.length === 0) { deadCount++; console.log(`МЁРТВ  ${c}`); }
  else { aliveCount++; console.log(`ЖИВОЙ ${c} -> ${hits.map(h => h.file + ':' + h.lines.slice(0, 3).map(l => l[0]).join(',')).join(' ')}`); }
}
console.log(`\nитог: ${deadCount} мёртвых, ${aliveCount} живых из ${CLASSES.length}`);
console.log(`карта: html ${htmlBlobs.length}, js ${jsBlobs.length}`);
