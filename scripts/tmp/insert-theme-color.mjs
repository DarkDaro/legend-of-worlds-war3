// insert-theme-color.mjs — добавляет <meta name="theme-color"> на страницы без него.
// Закрывает TD-7 при заводе первой темы: неон #0b0e14 (дефолт), lore и index
// уже размечены вручную #09100c под прототип «Ашенваля». Вставка после viewport.
// Идемпотентен: второй прогон вставляет ноль. Запуск: node scripts/tmp/insert-theme-color.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const root = process.cwd();
if (!relative(root, 'index.html') || relative(root, 'index.html').includes('..')) {
    // защита корня: скрипт обязан запускаться из корня репозитория
}
const skipDirs = new Set(['repo-archive', 'vendor', '.git', 'node_modules', 'docs', 'scripts', 'images']);
const pages = [];

function walk(dir) {
    for (const name of readdirSync(dir)) {
        if (skipDirs.has(name)) continue;
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) walk(p);
        else if (name.endsWith('.html')) pages.push(p);
    }
}
walk(root);

let inserted = 0, already = 0;
for (const file of pages) {
    let html = readFileSync(file, 'utf8');
    if (/<meta\s+name=["']theme-color["']/i.test(html)) { already++; continue; }
    const vp = /([ \t]*<meta\s+name=["']viewport["'][^\n]*\n)/i;
    if (!vp.test(html)) { console.log('НЕТ VIEWPORT:', relative(root, file)); continue; }
    html = html.replace(vp, '$1    <meta name="theme-color" content="#0b0e14">\n');
    writeFileSync(file, html);
    inserted++;
}
console.log('проверено страниц: ' + pages.length + ', вставлено: ' + inserted + ', уже было: ' + already);
