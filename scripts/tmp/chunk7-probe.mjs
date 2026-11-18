#!/usr/bin/env node
/**
 * Проба реактивности чанка 7 §10: то, что красит JS, следует за токенами.
 * 1) armor-calc: бар снижения — CSSOM-градиент на var(--accent-cyan); подмена
 *    --cyan-rgb и пересчёт меняют computed.
 * 2) balance-dashboard: радар на canvas читает --cyan-rgb на отрисовке; подмена
 *    примитива и перерисовка меняют пиксели canvas.
 * 3) tierlist: drag-ghost строится на var() — проверяется составом строки cssText
 *    (после подмены) через создание элемента и подстановку в DOM.
 * Запуск из корня: node scripts/tmp/chunk7-probe.mjs
 */
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

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
await new Promise(r => server.listen(8139, r));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let failed = 0;
const check = (name, ok, detail) => {
    console.log(name + ': ' + (ok ? 'ОК' : 'ПРОВАЛ') + (detail ? ' — ' + detail : ''));
    if (!ok) failed++;
};

// 1) armor-calc: CSSOM-бар следует за --cyan-rgb
await page.goto('http://localhost:8139/armor-calc.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(400);
const before = await page.evaluate(() => getComputedStyle(document.getElementById('reductionBar')).backgroundImage);
await page.evaluate(() => document.documentElement.style.setProperty('--cyan-rgb', '255, 0, 0'));
await page.evaluate(() => document.getElementById('armorInput').dispatchEvent(new Event('input')));
await page.waitForTimeout(150);
const after = await page.evaluate(() => getComputedStyle(document.getElementById('reductionBar')).backgroundImage);
check('armor-calc бар реагирует', before !== after && after.includes('255, 0, 0'), 'до: ' + before.slice(0, 60) + ' / после: ' + after.slice(0, 60));
await page.evaluate(() => document.documentElement.style.removeProperty('--cyan-rgb'));

// 2) balance-dashboard: canvas-радар перерисовывается из примитива
await page.goto('http://localhost:8139/balance-dashboard.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(500);
const canvasOk = await page.evaluate(() => {
    const sel = document.getElementById('hero1');
    if (!sel || !sel.options.length) return 'селектор пуст';
    sel.value = sel.options[1] ? sel.options[1].value : sel.options[0].value;
    sel.dispatchEvent(new Event('change'));
    return document.querySelector('canvas') ? 'canvas есть' : 'canvas не найден';
});
await page.waitForTimeout(300);
const shot1 = await page.evaluate(() => { const c = document.querySelector('canvas'); return c ? c.toDataURL() : ''; });
await page.evaluate(() => document.documentElement.style.setProperty('--cyan-rgb', '255, 0, 0'));
await page.evaluate(() => { const sel = document.getElementById('hero1'); sel.dispatchEvent(new Event('change')); });
await page.waitForTimeout(300);
const shot2 = await page.evaluate(() => { const c = document.querySelector('canvas'); return c ? c.toDataURL() : ''; });
check('balance-dashboard canvas реагирует', canvasOk === 'canvas есть' && shot1 !== '' && shot1 !== shot2, canvasOk + ', пиксели до/после подмены: ' + (shot1 !== shot2 ? 'различны' : 'одинаковы'));
await page.evaluate(() => document.documentElement.style.removeProperty('--cyan-rgb'));

// 3) tierlist: строка госта собирается с var() — var() в инлайне резолвится
await page.goto('http://localhost:8139/tierlist.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(400);
const ghostVar = await page.evaluate(() => {
    const el = document.createElement('div');
    el.style.cssText = 'background:rgba(var(--container-rgb),0.95);border:1px solid var(--accent-cyan);';
    document.body.appendChild(el);
    const bg = getComputedStyle(el).backgroundColor;
    const bd = getComputedStyle(el).borderTopColor;
    el.remove();
    return bg + ' | ' + bd;
});
check('tierlist гост резолвит var()', ghostVar.includes('rgba(10, 20, 40') && ghostVar.includes('rgb(0, 230, 255)'), ghostVar);

await browser.close();
server.close();
console.log(failed ? 'ПРОВАЛОВ: ' + failed : 'Все три механизма следуют за токенами');
process.exit(failed ? 1 : 0);
