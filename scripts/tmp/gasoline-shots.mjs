#!/usr/bin/env node
/** Скрины бензиновой темы глазами: heroes и index (десктоп 1280). */
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const ROOT = process.cwd();
mkdirSync('/tmp/render-theme', { recursive: true });
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.json': 'application/json' };
const server = http.createServer(async (req, res) => {
    const rel = req.url === '/' ? 'index.html' : req.url.slice(1).split('?')[0];
    try { res.writeHead(200, { 'content-type': MIME[extname(rel)] || 'application/octet-stream' }); res.end(await readFile(path.join(ROOT, rel))); }
    catch { res.writeHead(404); res.end('no'); }
});
await new Promise(r => server.listen(8144, r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const [f, name] of [['index.html', 'gas-index'], ['heroes.html', 'gas-heroes'], ['lore.html', 'gas-lore']]) {
    await page.goto('http://localhost:8144/' + f, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.SiteSettings.set('theme', 'gasoline'));
    await page.waitForTimeout(600);
    await page.screenshot({ path: '/tmp/render-theme/' + name + '.png' });
    console.log('shot ' + name);
}
await browser.close();
server.close();
