#!/usr/bin/env node
/**
 * Проба вычисленных значений пяти тонких поверхностей (чанк P8, TD-2).
 * На items.html (в разметке неон) прогоняются 6 состояний темы:
 * неон (атрибут снят), ашенваль, тёмная, контраст, астральная, зимняя.
 * Для каждого состояния в DOM ставятся 5 пробных div, каждый красит фон
 * одной поверхностью, читается computed backgroundColor — это истина
 * рендера; рядом снимается сырой токен --surface-* и примитив --subtle-rgb.
 * Результат печатается в JSON-файл: node scripts/tmp/subtle-computed.mjs /tmp/subtle-before.json
 */
import http from 'node:http';
import path from 'node:path';
import { writeFile, readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const OUT = process.argv[2] || '/tmp/subtle-out.json';
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
await new Promise(r => server.listen(8142, r));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const THEMES = [
    ['neon', null],
    ['ashenvale', 'ashenvale'],
    ['dark', 'dark'],
    ['contrast', 'contrast'],
    ['astral', 'astral'],
    ['winter', 'winter']
];
const PROBES = ['--surface-subtle', '--surface-subtle-hover', '--surface-tag-bg', '--surface-tag-border', '--surface-tag-active'];

const out = {};
await page.goto('http://localhost:8142/items.html', { waitUntil: 'load', timeout: 15000 });
for (const [name, id] of THEMES) {
    await page.evaluate(t => window.SiteSettings.set('theme', t === null ? 'neon' : t), id);
    await page.waitForTimeout(250);
    const data = await page.evaluate(probes => {
        const html = document.documentElement;
        const raw = {};
        for (const p of probes) raw[p] = getComputedStyle(html).getPropertyValue(p).trim();
        raw['--subtle-rgb'] = getComputedStyle(html).getPropertyValue('--subtle-rgb').trim() || '(нет)';
        const computed = {};
        for (const p of probes) {
            const d = document.createElement('div');
            d.setAttribute('data-probe', p);
            d.style.background = 'var(' + p + ')';
            d.style.display = 'none';
            document.body.appendChild(d);
            computed[p] = getComputedStyle(d).backgroundColor;
            d.remove();
        }
        return { theme: html.getAttribute('data-theme'), raw, computed };
    }, PROBES);
    out[name] = data;
    console.log(name + ': тема=' + data.theme + ' | subtle=' + data.computed['--surface-subtle'] + ' | primitive=' + data.raw['--subtle-rgb']);
}
await browser.close();
server.close();
await writeFile(OUT, JSON.stringify(out, null, 2), 'utf8');
console.log('файл: ' + OUT);
process.exit(0);
