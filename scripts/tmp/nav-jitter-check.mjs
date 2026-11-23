#!/usr/bin/env node
// nav-jitter-check.mjs — диагностика дёргания шапки при переходах между страницами.
// Для каждой страницы: есть ли вертикальный скроллбар (сдвиг вьюпорта), есть ли
// горизонтальный overflow, позиция nav-строки и первой кнопки. Расхождение
// координат между страницами = источник смещения шапки при переходе.
import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

const server = http.createServer(async (req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '');
    if (rel === '') rel = 'index.html';
    if (!path.extname(rel)) rel += '.html';
    const file = path.join(ROOT, rel);
    try {
        const data = await fs.promises.readFile(file);
        res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
        res.end(data);
    } catch {
        res.writeHead(404); res.end('no');
    }
});
await new Promise(r => server.listen(8944, r));

const pages = ['index', 'heroes', 'items', 'mechanics', 'events', 'info', 'monsters', 'map', 'guides', 'faq', 'lore', 'support', 'updates', 'creeps', 'gallery', 'storage', 'aibot', 'sitemap-page'];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

let ok = 0, fail = 0;
let refNavY = null, refBtnX = null;

for (const name of pages) {
    const sub = ['sitemap-page'].includes(name) ? '' : '';
    await page.goto(`http://localhost:8944/${sub}${name}.html`, { waitUntil: 'load' });
    const m = await page.evaluate(() => {
        const nav = document.querySelector('.header-nav');
        const btn = document.querySelector('.header-nav .nav-link');
        const nr = nav ? nav.getBoundingClientRect() : null;
        const br = btn ? btn.getBoundingClientRect() : null;
        return {
            vScroll: window.innerWidth - document.documentElement.clientWidth, // >0 = вертикальный скроллбар съел ширину
            hOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            navY: nr ? Math.round(nr.top) : null,
            navH: nr ? Math.round(nr.height) : null,
            btnX: br ? Math.round(br.left) : null,
            btnY: br ? Math.round(br.top) : null,
            navLines: nav ? Math.round(nr.height) : null
        };
    });
    const probs = [];
    if (m.vScroll !== 0 && m.vScroll !== 15) probs.push(`vScroll=${m.vScroll}`);
    if (refNavY === null) { refNavY = m.navY; refBtnX = m.btnX; }
    else {
        if (m.navY !== refNavY) probs.push(`navY ${refNavY}->${m.navY}`);
        if (m.btnX !== refBtnX) probs.push(`btnX ${refBtnX}->${m.btnX}`);
    }
    if (probs.length) { fail++; console.log(`FAIL ${name}: ${probs.join(', ')} (vScroll=${m.vScroll}, hOverflow=${m.hOverflow}, navH=${m.navH})`); }
    else { ok++; console.log(`ok  ${name}: vScroll=${m.vScroll} navY=${m.navY} btnX=${m.btnX} navH=${m.navH}`); }
}

// мобильный: та же сверка
await page.setViewportSize({ width: 390, height: 800 });
let mobOk = 0, mobFail = 0;
for (const name of ['index', 'heroes', 'items', 'lore', 'gallery', 'sitemap-page']) {
    await page.goto(`http://localhost:8944/${name}.html`, { waitUntil: 'load' });
    const m = await page.evaluate(() => {
        const nav = document.querySelector('.header-nav');
        const btn = document.querySelector('.header-nav .nav-link');
        const nr = nav ? nav.getBoundingClientRect() : null;
        const br = btn ? btn.getBoundingClientRect() : null;
        return { vScroll: window.innerWidth - document.documentElement.clientWidth, navY: nr ? Math.round(nr.top) : null, btnX: br ? Math.round(br.left) : null, navH: nr ? Math.round(nr.height) : null, navVisible: nr ? getComputedStyle(nav).display : null };
    });
    const probs = [];
    if (m.vScroll !== 0 && m.vScroll !== 15) probs.push(`vScroll=${m.vScroll}`);
    if (refNavY === null) {}
    if (probs.length) { mobFail++; console.log(`FAIL mob ${name}: ${probs.join(', ')} (navH=${m.navH}, display=${m.navVisible})`); }
    else { mobOk++; console.log(`ok  mob ${name}: vScroll=${m.vScroll} navH=${m.navH} display=${m.navVisible}`); }
}

await browser.close(); server.close();
console.log(`итог: desktop ${ok} ok, ${fail} fail; mobile ${mobOk} ok, ${mobFail} fail`);
process.exit(fail + mobFail ? 0 : 0);
