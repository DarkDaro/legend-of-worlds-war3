#!/usr/bin/env node
/**
 * Скрины ашенваля после перекраски 20.11: items 1280/390 и lore 1280.
 * Тема включается выбором в localStorage (как из панели), скрины в /tmp/render-theme/.
 * Запуск из корня: node scripts/tmp/ashenvale-shots.mjs
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
const OUTDIR = '/tmp/render-theme';
mkdirSync(OUTDIR, { recursive: true });

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

const setTheme = async () => {
    await page.goto('http://localhost:8143/items.html', { waitUntil: 'load', timeout: 15000 });
    await page.evaluate(() => localStorage.setItem('site-settings-v1', JSON.stringify({ theme: 'ashenvale' })));
};

await setTheme();
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(OUTDIR, 'items-ashenvale-1280.png') });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(OUTDIR, 'items-ashenvale-390.png') });

await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:8143/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(OUTDIR, 'index-ashenvale-choice-1280.png') });

await browser.close();
server.close();
console.log('скрины сняты в ' + OUTDIR);
process.exit(0);
