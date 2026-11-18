#!/usr/bin/env node
/**
 * Инвентарь JS-динамики для чанка 7 §10 (DESIGN.md) и TD-5: цветовые литералы,
 * присваивания .style.* и шаблонные style= в корневых js, js/ и инлайн-скриптах
 * HTML. Только отчёт, ничего не меняет. Результат в /tmp/js-colors.json.
 * Запуск из корня репозитория: node scripts/tmp/js-color-inventory.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['vendor', 'repo-archive', 'node_modules', 'images', 'docs', 'scripts']);

const HEX = /#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi;
const RGBCALL = /rgba?\(\s*\d+(?:\s*,\s*\d+(?:\s*,\s*\d+(?:\s*,\s*(?:[\d.]+|var\([^)]*\)))?)?){2,3}/gi;
const NAMED = /(['"])(white|black|red|lime|green|blue|orange|yellow|gold|gray|grey|cyan|magenta|purple|silver|teal|navy|maroon|olive|aqua|fuchsia|pink|brown|tomato|crimson|dodgerblue|deepskyblue|skyblue|lightblue|lightgray|lightgreen|darkblue|darkred|darkgreen|darkgray|transparent)\1/gi;
const STYLE_ASSIGN = /\.style\.([a-zA-Z]+)\s*=\s*([^;\n]+)/g;
const STYLE_TEMPLATE = /style\s*=\s*(['"`])((?:\\.|(?!\1)[^\\])*)\1/g;

const HEX1 = /#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})\b/i;
const isColorish = s =>
  HEX1.test(s) || /rgba?\(\s*\d/i.test(s) ||
  /['"](white|black|red|lime|green|blue|orange|yellow|gold|cyan|gray|grey|purple|pink|silver|teal|navy)['"]/.test(s) ||
  /var\(/.test(s);

const walk = (dir, ext, acc) => {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'all.css') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) { if (!SKIP_DIRS.has(name)) walk(p, ext, acc); continue; }
    if (name.endsWith(ext)) acc.push(p);
  }
  return acc;
};

const report = { hex: [], rgb: [], named: [], styleAssign: [], styleTemplate: [], htmlScriptHex: [], htmlScriptRgb: [], htmlScriptStyle: [] };
let jsFiles = 0, htmlFiles = 0, jsLines = 0;

for (const f of walk(ROOT, '.js', [])) {
  jsFiles++;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  jsLines += lines.length;
  const rel = path.relative(ROOT, f);
  lines.forEach((ln, i) => {
    for (const m of ln.matchAll(HEX)) report.hex.push({ file: rel, line: i + 1, val: m[0], text: ln.trim().slice(0, 110) });
    for (const m of ln.matchAll(RGBCALL)) report.rgb.push({ file: rel, line: i + 1, val: m[0], text: ln.trim().slice(0, 110) });
    for (const m of ln.matchAll(NAMED)) report.named.push({ file: rel, line: i + 1, val: m[2], text: ln.trim().slice(0, 110) });
    for (const m of ln.matchAll(STYLE_ASSIGN)) {
      const color = isColorish(m[2] || '');
      report.styleAssign.push({ file: rel, line: i + 1, prop: m[1], val: (m[2] || '').trim().slice(0, 90), color });
    }
    for (const m of ln.matchAll(STYLE_TEMPLATE)) {
      const v = m[2] || '';
      if (isColorish(v)) report.styleTemplate.push({ file: rel, line: i + 1, val: v.slice(0, 140) });
    }
  });
}

// инлайн-скрипты HTML: только содержимое <script> без src, атрибуты style= в разметке не трогаем (TD-3)
const HTML_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
for (const f of walk(ROOT, '.html', [])) {
  htmlFiles++;
  const src = fs.readFileSync(f, 'utf8');
  const rel = path.relative(ROOT, f);
  let m;
  while ((m = HTML_SCRIPT.exec(src)) !== null) {
    const block = m[1];
    const line0 = src.slice(0, m.index).split('\n').length;
    block.split('\n').forEach((ln, i) => {
      for (const h of ln.matchAll(HEX)) report.htmlScriptHex.push({ file: rel, line: line0 + i, val: h[0], text: ln.trim().slice(0, 110) });
      for (const r of ln.matchAll(RGBCALL)) report.htmlScriptRgb.push({ file: rel, line: line0 + i, val: r[0], text: ln.trim().slice(0, 110) });
      for (const s of ln.matchAll(STYLE_TEMPLATE)) {
        if (isColorish(s[2] || '')) report.htmlScriptStyle.push({ file: rel, line: line0 + i, val: (s[2] || '').slice(0, 140) });
      }
    });
  }
}

// сброс lastIndex глобальных регексов перед печатью
HEX.lastIndex = RGBCALL.lastIndex = 0;

fs.writeFileSync('/tmp/js-colors.json', JSON.stringify(report, null, 1));
console.log('js файлов: ' + jsFiles + ' (' + jsLines + ' строк), html: ' + htmlFiles);
console.log('hex в js: ' + report.hex.length + ' | rgb() в js: ' + report.rgb.length + ' | именованные в js: ' + report.named.length);
console.log('.style.* присваиваний: ' + report.styleAssign.length + ', из них цветовых: ' + report.styleAssign.filter(x => x.color).length);
console.log('шаблонных style= в js с цветом: ' + report.styleTemplate.length);
console.log('--- инлайн-скрипты HTML ---');
console.log('hex: ' + report.htmlScriptHex.length + ' | rgb(): ' + report.htmlScriptRgb.length + ' | style= с цветом: ' + report.htmlScriptStyle.length);
console.log();
const section = (title, arr) => {
  console.log('=== ' + title + ' ===');
  for (const it of arr) console.log(it.file + ':' + it.line + (it.prop ? ' .style.' + it.prop : '') + (it.val ? ' → ' + it.val : '') + (it.text && !it.val ? ' | ' + it.text : it.prop && it.color ? ' | ' + it.text : ''));
};
section('HEX в js', report.hex);
section('RGB в js', report.rgb);
section('ИМЕНОВАННЫЕ в js', report.named);
section('ЦВЕТОВЫЕ .style.*', report.styleAssign.filter(x => x.color));
section('НЕЦВЕТОВЫЕ .style.*', report.styleAssign.filter(x => !x.color).map(x => ({ ...x, text: '' })));
section('STYLE= в js', report.styleTemplate);
section('HEX в инлайн-скриптах', report.htmlScriptHex);
section('RGB в инлайн-скриптах', report.htmlScriptRgb);
section('STYLE= в инлайн-скриптах', report.htmlScriptStyle);
