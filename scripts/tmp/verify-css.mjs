#!/usr/bin/env node
/* Верификация CSS после реконструкции b5a9281.
   A: баланс и незакрытые комментарии
   B: остатки [off]-обёрток
   C: определения var(), самоссылки
   D: var() без определения
   E: литералы палитры вне :root (живой хардкод)
   F: метрики (фигурные скобки/точки с запятой) против a8b68fd — потеря кода
*/
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = '/home/z/my-project/_local/loww';
const CSS = path.join(ROOT, 'css');
const BASE = 'a8b68fd'; // последний коммит до порчи (da6e421^)
let bad = 0;
const P = msg => { console.log(msg); bad++; };

const files = fs.readdirSync(CSS).filter(f => f.endsWith('.css') && f !== 'all.css').sort();

// маскируем комментарии пробелами (строки сохраняются), возвращаем флаг незакрытости
const maskComments = txt => {
  let s = '', inC = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i], n = txt[i + 1];
    if (!inC && c === '/' && n === '*') { inC = true; s += '  '; i++; continue; }
    if (inC && c === '*' && n === '/') { inC = false; s += '  '; i++; continue; }
    s += inC && c !== '\n' ? ' ' : c;
  }
  return { s, unclosed: inC };
};
// дополнительно маскируем блоки :root {...}
const maskRoots = s => {
  for (;;) {
    const m = s.search(/:root\s*\{/);
    if (m < 0) return s;
    let d = 0, e = -1;
    for (let k = s.indexOf('{', m); k < s.length; k++) {
      if (s[k] === '{') d++;
      else if (s[k] === '}') { d--; if (!d) { e = k; break; } }
    }
    if (e < 0) return s; // незакрытый :root — уже поймает A
    s = s.slice(0, m) + s.slice(m, e + 1).replace(/[^\n]/g, ' ') + s.slice(e + 1);
  }
};
const lineOf = (s, i) => s.slice(0, i).split('\n').length;

const cur = {}, masked = {}, full = {};
for (const f of files) {
  const raw = fs.readFileSync(path.join(CSS, f), 'utf8');
  cur[f] = raw;
  const mc = maskComments(raw);
  masked[f] = mc.s; full[f] = maskRoots(mc.s);
  // A
  const open = (raw.match(/\/\*/g) || []).length, close = (raw.match(/\*\//g) || []).length;
  if (open !== close) P(`[A] ${f}: /*=${open} vs */=${close}`);
  if (mc.unclosed) P(`[A] ${f}: незакрытый комментарий в конце файла`);
  // B
  const off = (raw.match(/\[off/g) || []).length;
  if (off) P(`[B] ${f}: осталось [off]-маркеров: ${off}`);
}

// C/D
const defs = new Map(), used = new Map();
for (const f of files) {
  for (const m of masked[f].matchAll(/--([a-zA-Z0-9-]+)\s*:\s*([^;{}]+);/g)) {
    const name = '--' + m[1], val = m[2].replace(/\s+/g, ' ').trim();
    if (!defs.has(name)) defs.set(name, []);
    defs.get(name).push(`${f}:${lineOf(masked[f], m.index)} = ${val}`);
    if (val.includes(`var(${name})`) || val.includes(`var( ${name})`)) P(`[C] самоссылка ${name}: ${f}:${lineOf(masked[f], m.index)}`);
  }
  for (const m of masked[f].matchAll(/var\(\s*(--[a-zA-Z0-9-]+)/g)) {
    if (!used.has(m[1])) used.set(m[1], new Set());
    used.get(m[1]).add(f);
  }
}
for (const [n, fl] of used) if (!defs.has(n)) P(`[D] ${n} используется (${[...fl].join(',')}) но нигде не определён`);
const varInDef = [...defs.entries()].filter(([, arr]) => arr.some(v => v.split(' = ')[1]?.includes('var(')));
console.log(`[C] определений: ${defs.size}, использовано имён: ${used.size}; определения с var() внутри: ${varInDef.length}`);
for (const [n, arr] of varInDef) console.log(`    ${n}: ${arr.map(v => v.split(' = ')[0]).join(', ')}`);

// E: литералы палитры вне :root
const pal = new Map();
{
  const b = maskComments(fs.readFileSync(path.join(CSS, 'base.css'), 'utf8')).s;
  const rm = b.match(/:root\s*\{[\s\S]*?\}/);
  if (rm) for (const m of rm[0].matchAll(/--([a-zA-Z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g)) pal.set(m[2].toLowerCase(), '--' + m[1]);
}
let eCount = 0;
for (const f of files) {
  for (const m of full[f].matchAll(/#[0-9a-fA-F]{3,8}/g)) {
    const v = m[0].toLowerCase();
    if (pal.has(v)) { eCount++; console.log(`[E] ${f}:${lineOf(full[f], m.index)}: ${v} (=${pal.get(v)}) вне :root`); }
  }
}
console.log(`[E] живых литералов палитры вне :root: ${eCount}`);

// F: метрики против a8b68fd
console.log('[F] метрики vs ' + BASE + ' (ожидается 0 дельт; расходится = потерян/задвоен код):');
for (const f of files) {
  const old = execSync(`git show ${BASE}:css/${f}`, { cwd: ROOT, encoding: 'utf8', maxBuffer: 20e6 });
  const met = s => [((s.match(/\{/g) || []).length), ((s.match(/;/g) || []).length)];
  const [b1, s1] = met(maskComments(old).s), [b2, s2] = met(masked[f]);
  if (b1 !== b2 || s1 !== s2) P(`[F] ${f}: скобки ${b1}->${b2}, точки с запятой ${s1}->${s2}`);
}
console.log('[F] сравнение с ' + BASE + ' завершено');

// список корневых html для скринов
const roots = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort();
console.log('[i] корневых html: ' + roots.length + '; есть items.html: ' + roots.includes('items.html') + ', monsters.html: ' + roots.includes('monsters.html'));
console.log(bad ? `\nИТОГ: проблем: ${bad}` : '\nИТОГ: проблем не найдено');
process.exit(bad ? 1 : 0);
