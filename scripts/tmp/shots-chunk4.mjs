#!/usr/bin/env node
/**
 * Скрины контрольных страниц 1280 и 390 + контроль консоли и горизонтального
 * overflow (ритуал чанков §10). Снимки в /tmp/render-chunk4/<page>-<w>.png.
 * Анимации заморожены, но только animation (сброс к базе): transition:none
 * застревает на середине перехода и даёт недетерминированные снимки.
 * JS-циклы (rAF) заморозить так нельзя, их фазовый шум классифицируется отдельно.
 * Запуск: node scripts/tmp/shots-chunk4.mjs
 */
import { mkdirSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = process.cwd();
const OUTDIR = '/tmp/render-chunk4';
mkdirSync(OUTDIR, { recursive: true });

const PAGES = [
    'index.html', 'heroes.html', 'items.html', 'monsters.html', 'map.html',
    'mechanics.html', 'guides.html', 'compare.html', 'storage.html', 'tierlist.html',
    'info.html', 'armor-calc.html', 'lore.html', 'manifesto.html',
];

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp' };
const server = http.createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const rel = urlPath === '/' ? 'index.html' : urlPath.slice(1);
    try {
        const data = await readFile(path.join(ROOT, rel));
        res.writeHead(200, { 'content-type': MIME[extname(rel)] || 'application/octet-stream' });
        res.end(data);
    } catch { res.writeHead(404); res.end('no'); }
});
server.on('error', e => { console.error('Порт 8138: ' + e.message); process.exit(3); });
await new Promise(r => server.listen(8138, r));
console.log('сервер на 8138, стреляем');

const browser = await chromium.launch();
let problems = 0;

// ширины можно передать аргументами (сегментные прогоны: node shots-chunk4.mjs 1280 390),
// длинный прогон в один вызов среда прибивает — сегменты короче и надёжнее
const argvW = process.argv.slice(2).map(Number).filter(Boolean);
for (const width of (argvW.length ? argvW : [1280, 390])) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const consoleMsgs = [];
    page.on('console', m => {
        // внешние https-ресурсы в песочнице дают ERR_CERT_* — шум среды, не сайта
        if (['error', 'warning'].includes(m.type()) && !/ERR_CERT|ERR_NAME|net::/.test(m.text())) consoleMsgs.push(m.type() + ': ' + m.text());
    });
    page.on('pageerror', e => consoleMsgs.push('pageerror: ' + e.message));
    for (const p of PAGES) {
        try {
            await page.goto('http://localhost:8138/' + p, { waitUntil: 'load', timeout: 15000 });
            await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; }' });
            // Картинки ниже вьюпорта НЕ ждём: lazy-изображения вне зоны триггера
            // не загрузятся и onload не придёт — здесь скрипт зависал.
            await page.waitForTimeout(400);
            const overflow = await page.evaluate(() =>
                document.documentElement.scrollWidth - document.documentElement.clientWidth);
            const name = p.replace('.html', '');
            await page.screenshot({ path: path.join(OUTDIR, name + '-' + width + '.png') });
            const flag = overflow > 0 ? '  << ГОРИЗ. СКРОЛЛ ' + overflow + 'px' : '';
            const con = consoleMsgs.length ? '  << КОНСОЛЬ: ' + consoleMsgs.slice(0, 3).join(' | ') : '';
            if (overflow > 0 || consoleMsgs.length) problems++;
            console.log(name + ' @' + width + ': overflow=' + overflow + flag + con);
            consoleMsgs.length = 0;
        } catch (e) {
            console.log(p + ' @' + width + ': ОШИБКА ' + e.message.split('\n')[0]);
            problems++;
        }
    }
    await page.close();
}

await browser.close();
server.close();
console.log(problems ? 'ПРОБЛЕМ: ' + problems : 'Чисто: скролла нет, консоль пуста');
