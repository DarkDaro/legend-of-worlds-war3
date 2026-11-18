#!/usr/bin/env node
// Миграция фундамента токенов (чанк 1 плана DESIGN.md §10 + переименование стекла §4).
// Одноразовая идемпотентная правка живых css, живёт в scripts/tmp/ (RULES 2.3).
//
// Что делает:
//   1. rgba(0,230,255,X) и близнец rgba(0,229,255,X) -> rgba(var(--cyan-rgb), X), альфа сохраняется дословно
//   2. #00e6ffXY и близнец #00e5ffXY (8-значный hex) -> rgba(var(--cyan-rgb), A), A = XY/255, 3 знака
//   3. #00e6ff и близнец #00e5ff -> var(--accent-cyan) (близнец отличается каналом 229/230, глазом неотличим)
//   4. var(--glass-*) -> var(--surface-*) (переименование стекла; алиасы --glass-* остаются в :root base.css)
//
// base.css правится руками, сгенерированный css/all.css пересобирается build-css-bundle.py, repo-archive не трогаем.
// Повторный запуск даёт 0 замен. Замены внутри url(...data:image...) пропускаются с предупреждением.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
if (!/loww$/.test(ROOT)) {
    console.error('Запуск из корня репозитория loww, сейчас: ' + ROOT);
    process.exit(1);
}

const targets = [];
for (const name of readdirSync(join(ROOT, 'css')).sort()) {
    if (name.endsWith('.css') && name !== 'all.css' && name !== 'base.css') {
        targets.push(join(ROOT, 'css', name));
    }
}
for (const name of ['aibot.css', 'map.css', 'info-auto-level.css']) {
    const p = join(ROOT, name);
    try { if (statSync(p).isFile()) targets.push(p); } catch { /* файла нет, ок */ }
}

const alphaFromHex = (h) => String(Math.round((parseInt(h, 16) / 255) * 1000) / 1000);

const reRgba = /rgba\(\s*0\s*,\s*(?:230|229)\s*,\s*255\s*,\s*([0-9.]+)\s*\)/gi;
const reHex8 = /#00e[56]ff([0-9a-f]{2})(?![0-9a-f])/gi;
const reHex6 = /#00e[56]ff(?![0-9a-f])/gi;
const reGlass = /var\(--glass-([a-z-]+)\)/g;

const totals = { rgba: 0, hex8: 0, hex6: 0, glass: 0, skippedDataUri: 0 };
const perFile = [];

for (const path of targets) {
    const src = readFileSync(path, 'utf8');
    const counts = { rgba: 0, hex8: 0, hex6: 0, glass: 0, skippedDataUri: 0 };
    const outLines = src.split('\n').map((line) => {
        if (/data:image/i.test(line)) {
            if (reRgba.test(line) || reHex8.test(line) || reHex6.test(line)) {
                counts.skippedDataUri += 1;
                totals.skippedDataUri += 1;
            }
            return line; // data-URI не красим: var() внутри него не работает
        }
        let out = line.replace(reRgba, (m, a) => { counts.rgba += 1; return 'rgba(var(--cyan-rgb), ' + a + ')'; });
        out = out.replace(reHex8, (m, h) => { counts.hex8 += 1; return 'rgba(var(--cyan-rgb), ' + alphaFromHex(h) + ')'; });
        out = out.replace(reHex6, () => { counts.hex6 += 1; return 'var(--accent-cyan)'; });
        out = out.replace(reGlass, (m, s) => { counts.glass += 1; return 'var(--surface-' + s + ')'; });
        return out;
    });

    const changed = counts.rgba + counts.hex8 + counts.hex6 + counts.glass;
    if (changed > 0 || counts.skippedDataUri > 0) {
        writeFileSync(path, outLines.join('\n'));
        for (const k of Object.keys(totals)) totals[k] += counts[k];
        perFile.push(path.replace(ROOT + '/', '') + '  rgba:' + counts.rgba + ' hex8:' + counts.hex8 + ' hex6:' + counts.hex6 + ' glass:' + counts.glass + (counts.skippedDataUri ? '  пропущено data-URI: ' + counts.skippedDataUri : ''));
    }
}

console.log('Файлов в очереди: ' + targets.length);
console.log('Изменено файлов: ' + perFile.length);
for (const line of perFile) console.log('  ' + line);
console.log('Замены: rgba(0,229/230,255) -> ' + totals.rgba + ', hex8 -> ' + totals.hex8 + ', hex6 -> ' + totals.hex6 + ', glass->surface -> ' + totals.glass);
console.log('Пропущено строк с data-URI (проверить руками): ' + totals.skippedDataUri);
console.log('Прошло замен: ' + (totals.rgba + totals.hex8 + totals.hex6 + totals.glass) + ', предупреждений: ' + totals.skippedDataUri);
