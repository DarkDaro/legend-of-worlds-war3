#!/usr/bin/env node
/* Чанк 2 §10: альфа циана в ступени 0.04/0.08/0.12/0.2/0.35/0.6/0.9.
   Идемпотентный: второй прогон делает 0 замен.
   Особые случаи: альфа 0 сохраняется (прозрачное состояние пульсации, не оттенок),
   0.06 -> 0.04 (середина шкалы, консервативно вниз),
   0.1 -> 0.12 (выравнивание с токеном --surface-border). */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
if (path.basename(root) !== 'loww') { console.error('НЕ ТО КОРЕНЬ: ' + root); process.exit(1); }

const STEPS = [0.04, 0.08, 0.12, 0.2, 0.35, 0.6, 0.9];
const OVERRIDE = { '0.06': 0.04, '0.1': 0.12 };

function fmt(v) { return String(v); }

function toStep(alphaStr) {
  const v = parseFloat(alphaStr);
  if (v === 0) return alphaStr; // прозрачное состояние
  if (OVERRIDE[alphaStr] !== undefined) return fmt(OVERRIDE[alphaStr]);
  let best = STEPS[0], bestD = Infinity;
  for (const s of STEPS) {
    const d = Math.abs(v - s);
    if (d < bestD - 1e-12) { bestD = d; best = s; } // равенство держит меньшую ступень
  }
  return fmt(best);
}

const targets = fs.readdirSync(path.join(root, 'css'))
  .filter(f => f.endsWith('.css') && f !== 'all.css')
  .map(f => path.join('css', f));
for (const f of ['aibot.css', 'map.css', 'info-auto-level.css']) {
  if (fs.existsSync(path.join(root, f))) targets.push(f);
}

const pat = /rgba\(\s*var\(\s*--cyan-rgb\s*\)\s*,\s*([0-9]*\.?[0-9]+)\s*\)/g;

let totalChanged = 0, totalChecked = 0;
const mapping = new Map();
for (const rel of targets) {
  const file = path.join(root, rel);
  const src = fs.readFileSync(file, 'utf8');
  let changed = 0, checked = 0;
  const out = src.replace(pat, (m, a) => {
    checked++;
    const step = toStep(a);
    if (step !== a) {
      changed++;
      const k = a + ' -> ' + step;
      mapping.set(k, (mapping.get(k) || 0) + 1);
      return 'rgba(var(--cyan-rgb), ' + step + ')';
    }
    return m;
  });
  totalChecked += checked; totalChanged += changed;
  if (changed > 0) {
    fs.writeFileSync(file, out, 'utf8');
    console.log(rel + ': ' + changed + ' из ' + checked);
  }
}

console.log('ИТОГ: файлов ' + targets.length + ', вхождений проверено ' + totalChecked + ', заменено ' + totalChanged);
const rows = [...mapping.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => k + ' x' + n);
console.log(rows.join('\n'));
