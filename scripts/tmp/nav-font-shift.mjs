#!/usr/bin/env node
// nav-font-shift.mjs — проверка сдвига навигации при загрузке страницы:
// 1) btnX/navH сразу после domcontentloaded (иконки не отрисованы) vs после fonts.ready;
// 2) то же с заблокированным файлом шрифта FontAwesome (худший случай первого захода);
// 3) скрин кропа шапки на трёх страницах для глаз.
import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = http.createServer(async (req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'index.html';
    if (!path.extname(rel)) rel += '.html';
    try { const d = await fs.promises.readFile(path.join(ROOT, rel)); res.writeHead(200, { 'content-type': MIME[path.extname(rel)] || 'application/octet-stream' }); res.end(d); }
    catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(8945, r));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const measure = () => page.evaluate(() => {
    const nav = document.querySelector('.header-nav');
    const btn = document.querySelector('.header-nav .nav-link');
    const nr = nav.getBoundingClientRect(), br = btn.getBoundingClientRect();
    const row2 = document.querySelectorAll('.header-nav .nav-link').length > 9;
    return { navX: Math.round(nr.left), navY: Math.round(nr.top), navW: Math.round(nr.width), navH: Math.round(nr.height), btnX: Math.round(br.left), btnW: Math.round(br.width) };
});

async function probe(label, blockFonts) {
    if (blockFonts) await page.route('**/*.woff2*', r => r.abort());
    else await page.unroute('**/*.woff2*');
    await page.goto('http://localhost:8945/index.html', { waitUntil: 'domcontentloaded' });
    const early = await measure();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const late = await measure();
    const shift = JSON.stringify(early) !== JSON.stringify(late);
    console.log(`${shift ? 'FAIL' : 'ok  '} ${label}: early=${JSON.stringify(early)} late=${JSON.stringify(late)}`);
}

await probe('шрифт на месте', false);
await page.evaluate(() => localStorage.clear()).catch(() => {});
await probe('шрифт заблокирован (первый заход)', true);

// скрины шапки для глаз
await page.unroute('**/*.woff2*');
for (const name of ['index', 'heroes', 'lore']) {
    await page.goto(`http://localhost:8945/${name}.html`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: `/tmp/render-theme/nav-${name}.png`, clip: { x: 0, y: 0, width: 1280, height: 200 } });
}
await browser.close(); server.close();
console.log('скрины шапки сняты');
