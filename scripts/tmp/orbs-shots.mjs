#!/usr/bin/env node
/** Скрины орбов глазами: index/heroes/info — десктоп 1280 и мобильный 390. */
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = process.cwd();
mkdirSync('/tmp/render-orbs', { recursive: true });
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
    const rel = req.url === '/' ? 'index.html' : req.url.slice(1).split('?')[0];
    try { res.writeHead(200, { 'content-type': MIME[extname(rel)] || 'application/octet-stream' }); res.end(await readFile(path.join(ROOT, rel))); }
    catch { res.writeHead(404); res.end('no'); }
});
await new Promise(r => server.listen(8143, r));
const browser = await chromium.launch();
async function shot(page, url, name) {
    await page.goto('http://localhost:8143/' + url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: '/tmp/render-orbs/' + name + '.png' });
    console.log('shot ' + name);
}
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await shot(desktop, 'index.html', 'index-d');
await shot(desktop, 'heroes.html', 'heroes-d');
await shot(desktop, 'info.html', 'info-d');
await shot(desktop, 'mechanics.html', 'mechanics-d');
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await shot(mobile, 'index.html', 'index-m');
await shot(mobile, 'heroes.html', 'heroes-m');
await browser.close();
server.close();
