// reduced-motion-probe.mjs — TD-22: счётчики главной уважают prefers-reduced-motion.
// Два контекста playwright: с эмуляцией reduce числа в .stat-number остаются
// конечными сразу после скролла к блоку (анимация не стартует), без reduce —
// в середине анимации текст отличается от конечного, после 1.2с сходится к нему.
// Без проверки matchMedia в index-page.js первый контекст падает.
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.xml': 'text/xml', '.txt': 'text/plain' };

const server = createServer(async (req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]) === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]).slice(1);
    try {
        const data = await readFile(join(ROOT, rel));
        res.writeHead(200, { 'content-type': MIME[extname(rel)] || 'application/octet-stream' });
        res.end(data);
    } catch { res.writeHead(404); res.end('no'); }
});
await new Promise(r => server.listen(8151, r));

const browser = await chromium.launch();
let fails = 0;
const ok = (cond, name, extra) => {
    console.log((cond ? 'ок  ' : 'ФАЛ ') + name + (extra ? ' — ' + extra : ''));
    if (!cond) fails++;
};

// чтение чисел и ожидаемых конечных значений
// в HTML числа стоят без суффикса («74»), анимация завершает со суффиксом («74+»)
// — это довоенное поведение, не TD-22; reduce сверяем с правдой HTML, финал — с target+суффикс
const readNums = '(() => { const els = [...document.querySelectorAll(".stat-number[data-target]")]; return els.map(el => ({ text: el.textContent, target: parseInt(el.dataset.target, 10) })); })()';
const expectedFinals = '(() => { const els = [...document.querySelectorAll(".stat-number[data-target]")]; return els.map(el => { const t = parseInt(el.dataset.target, 10); return t + (t >= 10 ? "+" : ""); }); })()';
const scrollToStats = 'document.querySelector(".stats-section").scrollIntoView({ block: "center" })';

// 1. reduce: числа остаются конечными
const ctxA = await browser.newContext({ viewport: { width: 1280, height: 600 }, reducedMotion: 'reduce' });
const errsA = [];
ctxA.on('pageerror', e => errsA.push(String(e)));
const pageA = await ctxA.newPage();
await pageA.goto('http://localhost:8151/index.html', { waitUntil: 'load', timeout: 15000 });
const truthA = await pageA.evaluate(readNums);
await pageA.evaluate(scrollToStats);
await pageA.waitForTimeout(500);
const numsA = await pageA.evaluate(readNums);
const stayedA = numsA.length > 0 && numsA.every((n, i) => n.text === truthA[i].text);
ok(stayedA, 'reduce: числа конечные сразу после скролла, анимация не стартует', numsA.map(n => n.text).join(' | '));
ok(errsA.length === 0, 'reduce: консоль чиста', errsA.join(' | ').slice(0, 200));
await ctxA.close();

// 2. без reduce: анимация идёт и завершается на конечных значениях
const ctxB = await browser.newContext({ viewport: { width: 1280, height: 600 }, reducedMotion: 'no-preference' });
const errsB = [];
ctxB.on('pageerror', e => errsB.push(String(e)));
const pageB = await ctxB.newPage();
await pageB.goto('http://localhost:8151/index.html', { waitUntil: 'load', timeout: 15000 });
const truthTexts = (await pageB.evaluate(readNums)).map(n => n.text);
await pageB.evaluate(scrollToStats);
await pageB.waitForTimeout(150);
const numsMid = await pageB.evaluate(readNums);
const movedMid = numsMid.length > 0 && numsMid.some((n, i) => n.text !== truthTexts[i]);
ok(movedMid, 'без reduce: в середине анимации числа отличаются от конечных', numsMid.map(n => n.text).join(' | '));
await pageB.waitForTimeout(1200);
const numsEnd = await pageB.evaluate(readNums);
const finB = await pageB.evaluate(expectedFinals);
const settledB = numsEnd.length > 0 && numsEnd.every((n, i) => n.text === finB[i]);
ok(settledB, 'без reduce: после анимации числа сходятся к конечным', numsEnd.map(n => n.text).join(' | '));
ok(errsB.length === 0, 'без reduce: консоль чиста', errsB.join(' | ').slice(0, 200));
await ctxB.close();

console.log('итог: прошло ' + (5 - fails) + ', упало ' + fails);
await browser.close();
server.close();
process.exit(fails ? 1 : 0);
