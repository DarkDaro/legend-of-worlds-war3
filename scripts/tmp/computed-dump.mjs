#!/usr/bin/env node
/**
 * Дамп computed-значений цвета с контрольных страниц (ритуал чанков §10).
 * Поднимает статический сервер на корне репо, обходит страницы, для каждого
 * элемента собирает уникальные computed-строки: color, background, градиенты,
 * рамки, тени, svg fill/stroke. Результат — JSON {страница: [значения]}.
 *
 * Запуск: node scripts/tmp/computed-dump.mjs /tmp/computed-before.json
 * Дамп идёт с замороженными анимациями (урок чанка 3): пульсации свечений
 * дают фазовый шум на кадрах и путают сверку.
 */
import { writeFileSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = process.cwd();
const OUT = process.argv[2];
if (!OUT) {
    console.error('Укажи файл вывода: node scripts/tmp/computed-dump.mjs out.json');
    process.exit(2);
}

const PAGES = [
    'index.html', 'heroes.html', 'items.html', 'monsters.html', 'map.html',
    'mechanics.html', 'guides.html', 'info.html', 'search.html', 'compare.html',
    'tierlist.html', 'lore.html', 'armor-calc.html', 'formulas-calc.html',
    'calculator.html', 'balance.html', 'balance-dashboard.html', 'events.html',
    'faq.html', 'runes.html', 'creeps.html', 'storage.html', 'aibot.html',
    'bot-builds.html', 'gallery.html', 'updates.html', 'manifesto.html',
    'modes.html', 'sitemap-page.html', '404.html',
    'site-validator.html', 'heroes/admiral.html',
];

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp' };

const server = http.createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const rel = urlPath === '/' ? 'index.html' : urlPath.slice(1);
    try {
        const data = await readFile(path.join(ROOT, rel));
        res.writeHead(200, { 'content-type': MIME[extname(rel)] || 'application/octet-stream' });
        res.end(data);
    } catch {
        res.writeHead(404); res.end('no');
    }
});
await new Promise(r => server.listen(8137, r));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const dump = {};
for (const p of PAGES) {
    try {
        await page.goto('http://localhost:8137/' + p, { waitUntil: 'load', timeout: 15000 });
        await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
        await page.waitForTimeout(500);
        dump[p] = await page.evaluate(() => {
            const vals = new Set();
            const props = ['color', 'backgroundColor', 'backgroundImage', 'borderTopColor',
                'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'outlineColor',
                'boxShadow', 'textShadow', 'fill', 'stroke', 'backdropFilter', 'webkitBackdropFilter'];
            for (const el of document.querySelectorAll('*')) {
                const cs = getComputedStyle(el);
                for (const pr of props) {
                    const v = cs[pr];
                    if (v && v !== 'none' && v !== 'normal' && v !== 'rgba(0, 0, 0, 0)') vals.add(v);
                }
            }
            return [...vals].sort();
        });
        console.log(p + ': ' + dump[p].length + ' значений');
    } catch (e) {
        console.log(p + ': ОШИБКА ' + e.message.split('\n')[0]);
        dump[p] = null;
    }
}

await browser.close();
server.close();
writeFileSync(OUT, JSON.stringify(dump, null, 1));
console.log('Записан ' + OUT);
