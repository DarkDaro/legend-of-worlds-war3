#!/usr/bin/env node
// p11-computed.mjs — снимок computed цветов для P11 (TD-15, нейтральные на токены):
// по всем элементам выборки страниц собирает boxShadow/backgroundImage/color/borderColor/
// textShadow, где встречается rgb(255,…) или rgb(0,…), в JSON. Второй прогон (после
// пересборки) сравнивает: расхождение = FAIL. Запуск: node scripts/tmp/p11-computed.mjs [before|after]
import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const MODE = process.argv[2] || 'before';
const OUT = '/tmp/p11-computed.json';
const OUT2 = '/tmp/p11-after.json';
const PAGES = ['index.html', 'items.html', 'heroes.html', 'lore.html', 'mechanics.html'];
const THEMES = ['', 'ashenvale', 'astral', 'winter']; // пусто = неон по умолчанию

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = http.createServer(async (req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'index.html';
    if (!path.extname(rel)) rel += '.html';
    try { const d = await fs.promises.readFile(path.join(process.cwd(), rel)); res.writeHead(200, { 'content-type': MIME[path.extname(rel)] || 'application/octet-stream' }); res.end(d); }
    catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(8948, r));

const browser = await chromium.launch();
const snap = {};
for (const pg of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    for (const th of THEMES) {
        await page.goto('http://localhost:8948/' + pg, { waitUntil: 'networkidle' });
        await page.evaluate((t) => {
            const h = document.documentElement;
            if (t) h.setAttribute('data-theme', t); else h.removeAttribute('data-theme');
        }, th);
        await page.waitForTimeout(300);
        const vals = await page.evaluate(() => {
            const re = /rgba?\(\s*(255|0)\s*,\s*(255|0)\s*,\s*(255|0)/;
            const out = [];
            for (const el of document.querySelectorAll('body, body *')) {
                const cs = getComputedStyle(el);
                for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'backgroundImage', 'boxShadow', 'textShadow']) {
                    const v = cs[prop];
                    if (v && re.test(v)) out.push(prop + ':' + v);
                }
            }
            return out;
        });
        snap[pg + '|' + (th || 'neon')] = vals;
    }
    await page.close();
}
await browser.close();
server.close();

if (MODE === 'before') {
    fs.writeFileSync(OUT, JSON.stringify(snap, null, 1));
    const total = Object.values(snap).reduce((s, a) => s + a.length, 0);
    console.log('before: страниц-тем', Object.keys(snap).length, 'значений', total, '->', OUT);
} else {
    const prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    // анимированные акцентные тройки (лерп свечения) меняются каждый кадр —
    // выносим их из сравнения; нейтральные (255/0) остаются байт-в-байт
    const norm = (arr) => arr.map(v => v.replace(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g, (m) => {
        return /^rgba?\(\s*(0|255)\s*,\s*(0|255)\s*,\s*(0|255)/.test(m) ? m : 'rgba(ACCENT';
    })).sort();
    let fails = 0, checked = 0;
    for (const k of Object.keys(prev)) {
        if (!snap[k]) { fails++; console.log('FAIL нет снимка', k); continue; }
        const a = norm(prev[k]), b = norm(snap[k]);
        checked += a.length;
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            fails++;
            const idx = a.findIndex((v, i) => v !== b[i]);
            console.log('FAIL', k, `#${idx}\n  было: ${a[idx]}\n  стало: ${b[idx]}`);
        }
    }
    fs.writeFileSync(OUT2, JSON.stringify(snap));
    console.log(fails ? `провалов ${fails}` : `ok  computed байт в байт: ${checked} значений на ${Object.keys(prev).length} страниц-тем совпали`);
    process.exit(fails ? 1 : 0);
}
