#!/usr/bin/env node
/**
 * Проба чанков P10 (алиасы --glass-*) и батча 404 плана P9 (староакцентные литералы).
 * Снимает computed значения там, где живут алиасы и литералы:
 *  - 404.html: .not-found-links a (фон --surface-bg, рамка --surface-border),
 *    ховер той же ссылки (рамка), .not-found-code (тень rgba старого акцента),
 *    .not-found-links a.primary (рамка-альфа, градиент-фон остаётся литералом);
 *  - items.html: .item-fav-btn (фон и рамка из items-db.js, бывшие --glass-*).
 * Неон должен совпасть байт в байт; ашенваль фиксирует намеренный сдвиг
 * ховера на акцент темы. JSON в файл: node scripts/tmp/p404-probe.mjs /tmp/p404-before.json
 */
import http from 'node:http';
import path from 'node:path';
import { writeFile, readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const OUT = process.argv[2] || '/tmp/p404-out.json';
const ROOT = process.cwd();

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
await new Promise(r => server.listen(8143, r));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const out = {};

// 404.html: неон
await page.goto('http://localhost:8143/404.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
out['404-neon'] = await page.evaluate(() => {
    const link = document.querySelector('.not-found-links a:not(.primary)');
    const linkStyle = getComputedStyle(link);
    const code = getComputedStyle(document.querySelector('.not-found-code'));
    const primary = getComputedStyle(document.querySelector('.not-found-links a.primary'));
    const fav = document.querySelector('.item-fav-btn');
    return {
        linkBg: linkStyle.backgroundColor,
        linkBorder: linkStyle.borderTopColor,
        codeShadow: code.textShadow,
        primaryBorder: primary.borderTopColor,
        primaryBgImage: primary.backgroundImage,
        favBtnOn404: fav ? getComputedStyle(fav).backgroundColor : '(нет на 404)'
    };
});
// ховер неон (пауза длиннее transition 0.2s, иначе ловим середину перехода)
await page.hover('.not-found-links a:not(.primary)');
await page.waitForTimeout(450);
out['404-neon-hover'] = await page.evaluate(() => getComputedStyle(document.querySelector('.not-found-links a:not(.primary)')).borderTopColor);

// 404.html: ашенваль — ховер должен стать акцентом темы (намеренный сдвиг)
await page.evaluate(() => window.SiteSettings.set('theme', 'ashenvale'));
await page.waitForTimeout(250);
await page.hover('.not-found-links a:not(.primary)');
await page.waitForTimeout(450);
out['404-ashenvale-hover'] = await page.evaluate(() => ({
    hoverBorder: getComputedStyle(document.querySelector('.not-found-links a:not(.primary)')).borderTopColor,
    linkBg: getComputedStyle(document.querySelector('.not-found-links a:not(.primary)')).backgroundColor
}));
await page.evaluate(() => localStorage.clear());

// items.html: кнопка избранного из items-db.js (неон)
await page.goto('http://localhost:8143/items.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(500);
out['items-neon'] = await page.evaluate(() => {
    const fav = document.querySelector('.item-fav-btn');
    const styleTag = document.getElementById('item-favorites-style');
    return {
        favExists: !!fav,
        favBg: fav ? getComputedStyle(fav).backgroundColor : '(нет)',
        favBorder: fav ? getComputedStyle(fav).borderTopColor : '(нет)',
        styleHasGlass: styleTag ? styleTag.textContent.includes('--glass-') : '(нет тега)'
    };
});

await browser.close();
server.close();
await writeFile(OUT, JSON.stringify(out, null, 2), 'utf8');
console.log(JSON.stringify(out, null, 2));
process.exit(0);
