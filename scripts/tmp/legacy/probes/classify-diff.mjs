#!/usr/bin/env node
/* Строгая сверка: HEAD == a8b68fd − [off]-обёртки ± палитровые замены?
   Остаточные диффы после нормализации = то, что надо смотреть руками. */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = '/home/z/my-project/_local/loww';
const BASE = 'a8b68fd';

// палитра: канонический токен для литерала И для var(--name)
const PAL = [
  ['--text-primary', '#e0f0ff'],
  ['--text-secondary', '#8aa0c0'],
  ['--text-muted', '#6b7c99'],
  ['--text-dim', '#5a7a9a'],
  ['--accent-cyan', '#00e6ff'],
  ['--glass-bg', 'rgba(15,23,42,0.5)'],
  ['--glass-bg-hover', 'rgba(15,23,42,0.65)'],
  ['--glass-border', 'rgba(0,230,255,0.12)'],
  ['--glass-border-hover', 'rgba(0,230,255,0.35)'],
  ['--glass-subtle', 'rgba(0,255,255,0.04)'],
  ['--glass-subtle-hover', 'rgba(0,255,255,0.08)'],
  ['--glass-tag-bg', 'rgba(0,255,255,0.06)'],
  ['--glass-tag-border', 'rgba(0,255,255,0.15)'],
  ['--glass-tag-active', 'rgba(0,255,255,0.15)'],
];
const canon = s => {
  for (const [name, lit] of PAL) {
    // литерал с любыми пробелами внутри rgba(...)
    const litRe = lit.includes('rgba(')
      ? lit.replace('(', String.raw`\(`).replace(')', String.raw`\)`).replace(/,/g, String.raw`\s*,\s*`)
      : lit;
    s = s.replace(new RegExp(litRe, 'gi'), name);
    s = s.split(`var(${name})`).join(name);
  }
  // neon-glow: составные тени целиком -> токен
  s = s.replace(/0\s*0\s*20px\s*rgba\(0,\s*230,\s*255,\s*0?\.2\),\s*0\s*0\s*60px\s*rgba\(0,\s*230,\s*255,\s*0?\.08\)/g, '--neon-glow');
  s = s.split('var(--neon-glow)').join('--neon-glow');
  s = s.replace(/0\s*0\s*20px\s*rgba\(0,\s*230,\s*255,\s*0?\.4\),\s*0\s*0\s*60px\s*rgba\(0,\s*230,\s*255,\s*0?\.15\),\s*inset\s*0\s*0\s*15px\s*rgba\(0,\s*230,\s*255,\s*0?\.03\)/g, '--neon-glow-strong');
  s = s.split('var(--neon-glow-strong)').join('--neon-glow-strong');
  return s;
};

// снять [off]-обёртки: маркер (1-2 строки), затем "/*", содержимое, "*/"
const unwrap = txt => {
  const lines = txt.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('[off 08.11')) {
      while (i < lines.length && !lines[i].includes('*/')) i++; // добить маркер до закрытия
      if (i + 1 < lines.length && lines[i + 1].trim() === '/*') {
        i += 2; // съели "/*" — i встал на первую строку содержимого
        while (i < lines.length && lines[i].trim() !== '*/') { out.push(lines[i]); i++; }
        // lines[i] == "*/" — съедется инкрементом for
      }
      continue;
    }
    out.push(lines[i]);
  }
  return out.join('\n');
};
const norm = txt => canon(unwrap(txt)).split('\n').map(l => l.replace(/\s+$/, ''));

let suspicious = 0;
const files = execSync('git ls-tree --name-only HEAD css/', { cwd: ROOT, encoding: 'utf8' })
  .split('\n').filter(f => f.endsWith('.css') && !f.endsWith('all.css'));

for (const rel of files) {
  const f = path.basename(rel);
  const old = execSync(`git show ${BASE}:${rel}`, { cwd: ROOT, encoding: 'utf8', maxBuffer: 20e6 });
  const cur = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const a = norm(old), b = norm(cur);
  // простой LCS-диф построчно
  const A = a.filter(l => l.trim() !== ''), B = b.filter(l => l.trim() !== '');
  const n = A.length, m = B.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const diffs = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) { i++; j++; continue; }
    const del = [], add = [];
    while (i < n && (j >= m || dp[i + 1][j] >= dp[i][j + 1])) del.push(A[i++]);
    while (j < m && (i >= n || dp[i + 1][j] < dp[i][j + 1])) add.push(B[j++]);
    diffs.push({ del, add });
  }
  while (i < n) dels: diffs.push({ del: [A[i++]], add: [] });
  while (j < m) diffs.push({ del: [], add: [B[j++]] });
  if (diffs.length) {
    suspicious++;
    console.log(`\n=== ${f}: ${diffs.length} блок(ов) расхождений ===`);
    for (const d of diffs.slice(0, 8)) {
      for (const l of d.del) console.log('  - ' + l.slice(0, 150));
      for (const l of d.add) console.log('  + ' + l.slice(0, 150));
    }
    if (diffs.length > 8) console.log(`  ... ещё ${diffs.length - 8}`);
  }
}
console.log(suspicious ? `\nФайлов с расхождениями: ${suspicious} — смотреть руками` : '\nИДЕАЛ: расхождений нет — реконструкция точна');
