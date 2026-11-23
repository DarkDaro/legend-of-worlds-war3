#!/usr/bin/env node
// nav-transition-poll.mjs — что видит глаз при переходе между страницами:
// поллим координаты .header-nav и .nav-link каждый кадр от клика до полной
// отрисовки. Любое отклонение от финальных координат = видимое дёргание.
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
await new Promise(r => server.listen(8946, r));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

// инъекция поллера до загрузки страницы
await page.addInitScript(() => {
    window.__frames = [];
    const poll = () => {
        const nav = document.querySelector('.header-nav');
        if (nav) {
            const r = nav.getBoundingClientRect();
            const btn = document.querySelector('.header-nav .nav-link');
            const br = btn ? btn.getBoundingClientRect() : null;
            window.__frames.push([Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height), br ? Math.round(br.left) : -1, br ? Math.round(br.width) : -1]);
        } else {
            window.__frames.push(null);
        }
        requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
});

const transitions = [
    ['index', 'heroes', 'Герои'],
    ['heroes', 'items', 'Предметы'],
    ['items', 'mechanics', 'Механики'],
    ['mechanics', 'lore', 'Лор'],
];

let fail = 0;
for (const [from, to, label] of transitions) {
    await page.goto(`http://localhost:8946/${from}.html`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    window__frames_reset: await page.evaluate(() => { window.__frames = []; });
    await page.click(`.header-nav a[href="${to}.html"]`);
    await page.waitForURL(`**/${to}.html`);
    await page.waitForLoadState('load');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const frames = await page.evaluate(() => window.__frames);
    const valid = frames.filter(f => f);
    const final = valid[valid.length - 1];
    const bad = valid.filter(f => f[0] !== final[0] || f[1] !== final[1] || f[3] !== final[3] || f[4] !== final[4] || f[5] !== final[5]);
    const nulls = frames.filter(f => !f).length;
    if (bad.length || nulls > 2) { fail++; console.log(`FAIL ${from}->${to} (${label}): кадров ${frames.length}, пустых ${nulls}, отклонений ${bad.length}; примеры: ${JSON.stringify(bad.slice(0, 3))} финал=${JSON.stringify(final)}`); }
    else console.log(`ok  ${from}->${to} (${label}): кадров ${frames.length}, пустых ${nulls}, позиция стабильна ${JSON.stringify(final)}`);
}

await browser.close(); server.close();
console.log(fail ? `ЕСТЬ отклонения: ${fail}` : 'переходы стабильны');
