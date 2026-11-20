#!/usr/bin/env node
/* TD-16 верификатор: мёртв ли класс по факту — ищем использование
   во всех HTML (class=, classList, querySelector, конкатенации) и
   во ВСЕХ js (корень + js/ + vendor-исключение). Ничего не правит. */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const CLASSES = [
  // hero-page.css
  'ability-cycle-group','cycle-hint','cycle-key','cycle-label','innate','luck-chance','hero-tips',
  // hero-mobile.css
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

const htmlFiles = readdirSync(ROOT).filter(f => f.endsWith('.html'));
const jsDirs = [ROOT, join(ROOT, 'js')];
const jsFiles = jsDirs.flatMap(d =>
  readdirSync(d).filter(f => f.endsWith('.js')).map(f => join(d, f)));

const htmlBlobs = htmlFiles.map(f => ({ f, s: readFileSync(join(ROOT, f), 'utf8') }));
const jsBlobs = jsFiles.map(f => ({ f: f.replace(ROOT + '/', ''), s: readFileSync(f, 'utf8') }));

function usage(name) {
  const hits = [];
  const re = new RegExp('\\b' + name + '\\b');
  for (const { f, s } of htmlBlobs) {
    if (re.test(s)) {
      // грубая отсечка: слово в другом контексте (id-другой класс) — берём все строки
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
