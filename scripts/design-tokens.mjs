#!/usr/bin/env node
/**
 * design-tokens.mjs — инвентарь дизайн-значений в css-файлах сайта.
 * Считает: кастомные свойства (токены) и их использование, все цвета
 * по семействам, стекломорфизм (backdrop-filter/blur), тени, градиенты,
 * border-radius, transition/animation, keyframes. Файлы не меняет.
 *
 * Запуск:  node scripts/design-tokens.mjs
 *          node scripts/design-tokens.mjs --md docs/CSS-INVENTORY.md
 * Режим --md перезаписывает файл целиком (только сырые данные).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// санити: работаем только внутри репо сайта
const sanity = readFileSync(path.join(ROOT, 'css/base.css'), 'utf8');
if (!sanity.includes(':root') || !sanity.includes('--accent-cyan')) {
    console.error('Не тот репозиторий: css/base.css не содержит ожидаемых токенов.');
    process.exit(2);
}

const files = execSync('git ls-files -- "*.css"', { cwd: ROOT, encoding: 'utf8' })
    .split('\n').map(s => s.trim()).filter(Boolean)
    .filter(f => !f.startsWith('vendor/') && f !== 'css/all.css'); // бандл генерится отдельно
if (files.length < 10) {
    console.error('Ожидались десятки css-файлов, получено ' + files.length + '. Отмена.');
    process.exit(2);
}

const COLOR_RE = /#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;
const normColor = v => v.toLowerCase().replace(/\s+/g, '');

function toRgb(v) {
    let m = v.match(/^#([0-9a-f]{3,8})$/i);
    if (m) {
        let h = m[1];
        if (h.length === 3 || h.length === 4) h = [...h].map(c => c + c).join('');
        return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
    }
    m = v.match(/^rgba?\(([^)]+)\)$/i);
    if (m) {
        const p = m[1].split(',').map(s => parseFloat(s));
        return { r: p[0], g: p[1], b: p[2] };
    }
    m = v.match(/^hsla?\(([^)]+)\)$/i);
    if (m) {
        const p = m[1].split(',').map(s => parseFloat(s));
        return { hsl: [p[0], p[1], p[2]] };
    }
    return null;
}

// семейство цвета по hue/sat — грубые корзины для группировки отчёта
function classify(v) {
    const c = toRgb(v);
    if (!c) return 'прочее';
    let h, s;
    if (c.hsl) { h = ((c.hsl[0] % 360) + 360) % 360; s = c.hsl[1] / 100; }
    else {
        const r = c.r / 255, g = c.g / 255, b = c.b / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
        s = max === 0 ? 0 : d / max;
        if (d === 0) h = 0;
        else if (max === r) h = 60 * (((g - b) / d) % 6);
        else if (max === g) h = 60 * ((b - r) / d + 2);
        else h = 60 * ((r - g) / d + 4);
        if (h < 0) h += 360;
    }
    if (s < 0.12) {
        if (!c.hsl) {
            const lum = (Math.max(c.r, c.g, c.b) + Math.min(c.r, c.g, c.b)) / 2;
            if (lum >= 200) return 'белый/светлый';
            if (lum < 40) return 'почти чёрный';
        }
        return 'нейтральный';
    }
    if (h >= 165 && h < 210) return 'циан';
    if (h >= 210 && h < 255) return 'синий';
    if (h >= 255 && h < 330) return 'фиолет/магента';
    if (h >= 330 || h < 20) return 'красный';
    if (h >= 20 && h < 45) return 'оранж';
    if (h >= 45 && h < 70) return 'золото/янтарь';
    return 'зелёный';
}

const colorAgg = new Map();   // значение -> { count, files:Set, fam }
const varDefs = new Map();    // токен -> { value, files:Set, root:Set }
const varUse = new Map();     // токен -> число использований var()
const gl = {                  // глобальные агрегаты эффектов
    backdrop: 0, blurVals: new Map(),
    boxShadow: 0, textShadow: 0,
    gradLin: 0, gradRad: 0,
    radius: new Map(),
    transition: 0, animation: 0,
    keyframes: new Set(),
    perFile: []                 // { file, colors, decls }
};

for (const f of files) {
    const src = readFileSync(path.join(ROOT, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, ' ');

    // диапазоны блоков :root (для флага inRoot)
    const rootRanges = [];
    for (const m of src.matchAll(/:root\s*\{/g)) {
        let depth = 1, i = m.index + m[0].length;
        while (i < src.length && depth > 0) {
            if (src[i] === '{') depth++;
            else if (src[i] === '}') depth--;
            i++;
        }
        rootRanges.push([m.index, i]);
    }
    const inRoot = idx => rootRanges.some(([a, b]) => idx >= a && idx < b);

    for (const m of src.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;{}]+)[;}]/gi)) {
        const name = m[1].toLowerCase();
        if (!varDefs.has(name)) varDefs.set(name, { value: m[2].trim(), files: new Set(), root: new Set() });
        const rec = varDefs.get(name);
        rec.files.add(f);
        if (inRoot(m.index)) rec.root.add(f);
    }
    for (const m of src.matchAll(/var\((--[a-z0-9-]+)/gi)) {
        const name = m[1].toLowerCase();
        varUse.set(name, (varUse.get(name) || 0) + 1);
    }

    let colorCount = 0;
    for (const m of src.matchAll(COLOR_RE)) {
        const v = normColor(m[0]);
        colorCount++;
        if (!colorAgg.has(v)) colorAgg.set(v, { count: 0, files: new Set(), fam: classify(v) });
        const rec = colorAgg.get(v);
        rec.count++;
        rec.files.add(f);
    }
    gl.perFile.push({ file: f, colors: colorCount });

    const bd = [...src.matchAll(/backdrop-filter:\s*blur\((\d+(?:\.\d+)?)px\)/g)];
    gl.backdrop += bd.length;
    for (const m of bd) gl.blurVals.set(m[1] + 'px', (gl.blurVals.get(m[1] + 'px') || 0) + 1);
    gl.boxShadow += (src.match(/box-shadow\s*:/g) || []).length;
    gl.textShadow += (src.match(/text-shadow\s*:/g) || []).length;
    gl.gradLin += (src.match(/linear-gradient\(/g) || []).length;
    gl.gradRad += (src.match(/radial-gradient\(/g) || []).length;
    for (const m of src.matchAll(/border-radius\s*:\s*([^;{}]+)[;]/g)) {
        const v = m[1].trim().toLowerCase();
        gl.radius.set(v, (gl.radius.get(v) || 0) + 1);
    }
    gl.transition += (src.match(/transition\s*:/g) || []).length;
    gl.animation += (src.match(/animation\s*:/g) || []).length;
    for (const m of src.matchAll(/@keyframes\s+([\w-]+)/g)) gl.keyframes.add(m[1]);
}

// ---------- вывод ----------
const colors = [...colorAgg.entries()].sort((a, b) => b[1].count - a[1].count);
const famOrder = ['циан', 'синий', 'фиолет/магента', 'красный', 'оранж', 'золото/янтарь', 'зелёный', 'белый/светлый', 'нейтральный', 'почти чёрный', 'прочее'];

console.log('Файлов сканировано: ' + files.length);
console.log('Уникальных цветов: ' + colors.length + ', вхождений: ' + colors.reduce((s, [, r]) => s + r.count, 0));
console.log('Токенов объявлено: ' + varDefs.size + ' (в :root: ' + [...varDefs.values()].filter(r => r.root.size).length + ')');
console.log('backdrop-filter: ' + gl.backdrop + ' (' + [...gl.blurVals.entries()].map(([k, v]) => k + 'x' + v).join(', ') + ')');
console.log('box-shadow: ' + gl.boxShadow + ', text-shadow: ' + gl.textShadow);
console.log('градиенты: linear ' + gl.gradLin + ', radial ' + gl.gradRad);
console.log('transition: ' + gl.transition + ', animation: ' + gl.animation + ', keyframes: ' + gl.keyframes.size);
console.log('\nПо семействам:');
for (const fam of famOrder) {
    const rows = colors.filter(([, r]) => r.fam === fam);
    if (!rows.length) continue;
    const cnt = rows.reduce((s, [, r]) => s + r.count, 0);
    console.log('  ' + fam + ': ' + rows.length + ' значений, ' + cnt + ' вхождений');
    for (const [v, r] of rows.slice(0, 12)) console.log('    ' + v + ' x' + r.count + ' (' + r.files.size + ' ф.)');
    if (rows.length > 12) console.log('    … ещё ' + (rows.length - 12));
}
console.log('\nТокены без использования var(): ' + [...varDefs.keys()].filter(n => !varUse.has(n)).join(', ') || '—');

// ---------- markdown ----------
if (process.argv.includes('--md')) {
    const idx = process.argv.indexOf('--md');
    const outPath = path.resolve(ROOT, process.argv[idx + 1]);
    const tbl = (head, rows) =>
        '| ' + head.join(' | ') + ' |\n|' + head.map(() => '---').join('|') + '|\n' +
        rows.map(r => '| ' + r.join(' | ') + ' |').join('\n') + '\n';
    let md = '# CSS-INVENTORY — сырой инвентарь дизайн-значений в css\n\n';
    md += 'Генератор: `scripts/design-tokens.mjs` (node scripts/design-tokens.mjs --md docs/CSS-INVENTORY.md), перегенерация перезаписывает файл целиком. vendor/ и генерируемый css/all.css исключены. Осмысленные выводы и токен-система — docs/DESIGN.md.\n\n';
    md += '## Итог\n' + tbl(['Показатель', 'Значение'], [
        ['css-файлов', files.length],
        ['уникальных цветов', colors.length],
        ['вхождений цветов', colors.reduce((s, [, r]) => s + r.count, 0)],
        ['кастомных свойств объявлено', varDefs.size],
        ['из них в :root', [...varDefs.values()].filter(r => r.root.size).length],
        ['backdrop-filter: blur()', gl.backdrop],
        ['box-shadow', gl.boxShadow],
        ['text-shadow', gl.textShadow],
        ['linear-gradient()', gl.gradLin],
        ['radial-gradient()', gl.gradRad],
        ['transition:', gl.transition],
        ['animation:', gl.animation],
        ['@keyframes', gl.keyframes.size],
    ]);
    md += '\n## Токены (кастомные свойства)\n\n';
    md += tbl(['Токен', 'Значение', 'var() использований', 'Файлов', 'Где объявлен'],
        [...varDefs.entries()].sort((a, b) => (varUse.get(b[0]) || 0) - (varUse.get(a[0]) || 0)).map(([n, r]) => [
            n, '`' + r.value + '`', varUse.get(n) || 0, r.files.size,
            r.root.size ? ':root ' + [...r.root].join(', ') : [...r.files].join(', ')
        ]));
    md += '\n## Цвета по семействам\n';
    for (const fam of famOrder) {
        const rows = colors.filter(([, r]) => r.fam === fam);
        if (!rows.length) continue;
        md += '\n### ' + fam + ' — ' + rows.length + ' значений, ' + rows.reduce((s, [, r]) => s + r.count, 0) + ' вхождений\n\n';
        md += tbl(['Значение', 'Вхождений', 'Файлов', 'Где'], rows.map(([v, r]) =>
            ['`' + v + '`', r.count, r.files.size, [...r.files].map(f => f.replace(/^css\//, '')).join(', ')]));
    }
    md += '\n## Стекломорфизм и эффекты\n\n';
    md += tbl(['Значение blur', 'Вхождений'], [...gl.blurVals.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, v]));
    md += '\n## border-radius\n\n';
    md += tbl(['Значение', 'Вхождений'], [...gl.radius.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, v]));
    md += '\n## Keyframes\n\n' + [...gl.keyframes].sort().join(', ') + '\n';
    md += '\n## Цветов на файл (top 20)\n\n';
    md += tbl(['Файл', 'Цветовых литералов'], gl.perFile.sort((a, b) => b.colors - a.colors).slice(0, 20).map(r => [r.file, r.colors]));
    writeFileSync(outPath, md);
    console.log('\nMarkdown записан: ' + outPath);
}
