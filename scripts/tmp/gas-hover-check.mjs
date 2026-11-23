#!/usr/bin/env node
/** Добивка переливов: computed рамок в бензиновой теме + скрин hover карточки. */
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = process.cwd();
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
    const rel = req.url === '/' ? 'index.html' : req.url.slice(1).split('?')[0];
    try { res.writeHead(200, { 'content-type': MIME[extname(rel)] || 'application/octet-stream' }); res.end(await readFile(path.join(ROOT, rel))); }
    catch { res.writeHead(404); res.end('no'); }
});
await new Promise(r => server.listen(8145, r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let ok = 0, fail = 0;
const check = (n, c, e) => { c ? (ok++, console.log('  ok  ' + n + (e ? ' — ' + e : ''))) : (fail++, console.log('FAIL  ' + n + (e ? ' — ' + e : ''))); };
await page.goto('http://localhost:8145/heroes.html', { waitUntil: 'networkidle' });
await page.evaluate(() => window.SiteSettings.set('theme', 'gasoline'));
await page.waitForTimeout(300);
let bg = await page.evaluate(() => getComputedStyle(document.querySelector('.hero-card'), '::before').backgroundImage);
check('hero-card::before: ирисцентная плёнка', bg.includes('140, 236, 200') && bg.includes('242, 216, 168'), bg.slice(0, 70));
await page.goto('http://localhost:8145/items.html', { waitUntil: 'networkidle' });
bg = await page.evaluate(() => getComputedStyle(document.querySelector('.item-card'), '::before').backgroundImage);
check('item-card::before: ирисцентная плёнка', bg.includes('140, 236, 200') && bg.includes('242, 216, 168'));
await page.goto('http://localhost:8145/lore.html', { waitUntil: 'networkidle' });
bg = await page.evaluate(() => getComputedStyle(document.querySelector('.lore-text'), '::before').backgroundImage);
check('lore::before: вертикальная плёнка', bg.includes('140, 236, 200') && bg.includes('184, 166, 240'), bg.slice(0, 60));
await page.goto('http://localhost:8145/index.html', { waitUntil: 'networkidle' });
bg = await page.evaluate(() => getComputedStyle(document.querySelector('.cta-section'), '::before').backgroundImage);
check('cta::before: aurora плёнка', bg.includes('140, 236, 200') && bg.includes('242, 216, 168'));
const anim = await page.evaluate(() => getComputedStyle(document.querySelector('.hero-logo-img')).animationName);
check('лого: пульс плёнки logoBorderPulseGasoline', anim === 'float, logoBorderPulseGasoline', anim);
// скрин hover карточки: рамка плёнки видна
await page.goto('http://localhost:8145/heroes.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const card = await page.$('.hero-card');
await card.hover();
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/render-theme/gas-card-hover.png' });
console.log('shot gas-card-hover');
await browser.close();
server.close();
console.log('\nитог: ' + ok + ' ok, ' + fail + ' fail');
process.exit(fail ? 1 : 0);
