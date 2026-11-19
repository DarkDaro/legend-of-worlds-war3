// radar-theme-probe.mjs — TD-23: канвас-радар дашборда перерисовывается при живой смене темы.
// Открывает balance-dashboard.html, оборачивает stroke у 2D-контекста, чтобы видеть
// каждый strokeStyle, меняет тему через SiteSettings и проверяет, что после смены
// появляются штрихи в акценте новой темы (астральный фиолет), а после возврата в неон — снова циан.
// Без слушателя site-settings:change в balance-dashboard-page.js вторая проверка падает.
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
await new Promise(r => server.listen(8149, r));

const browser = await chromium.launch();
let fails = 0;
const ok = (cond, name, extra) => {
    console.log((cond ? 'ок  ' : 'ФАЛ ') + name + (extra ? ' — ' + extra : ''));
    if (!cond) fails++;
};

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const consoleErrors = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', e => consoleErrors.push(String(e)));

await page.addInitScript(() => {
    window.__strokes = [];
    const orig = CanvasRenderingContext2D.prototype.stroke;
    CanvasRenderingContext2D.prototype.stroke = function () {
        try { window.__strokes.push(String(this.strokeStyle)); } catch (e) {}
        return orig.apply(this, arguments);
    };
});

await page.goto('http://localhost:8149/balance-dashboard.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(400);

const baseline = await page.evaluate(() => window.__strokes.length);
ok(baseline > 0, 'радар отрисован при загрузке, штрихи сняты', String(baseline));
const neonSeen = await page.evaluate(() => window.__strokes.some(s => s.indexOf('0, 230, 255') !== -1));
ok(neonSeen, 'в неоне штрихи в циане 0,230,255');

// смена темы неон → астральная: слушатель обязан перерисовать канвас.
// канвас сериализует непрозрачные цвета в hex (rgb(0, 230, 255) → #00e6ff),
// поэтому последний штрих каждой отрисовки сравниваем с акцентом, посчитанным из --cyan-rgb
const hexOf = '(() => { const p = getComputedStyle(document.documentElement).getPropertyValue("--cyan-rgb").trim().split(",").map(x => parseInt(x, 10)); return "#" + p.map(x => x.toString(16).padStart(2, "0")).join(""); })()';
const lastStroke = 'window.__strokes[window.__strokes.length - 1]';

const neonHex = await page.evaluate(hexOf);
const neonLast = await page.evaluate(lastStroke);
ok(neonLast === neonHex, 'неон: последний штрих в акценте темы', neonLast + ' = ' + neonHex);

await page.evaluate(() => SiteSettings.set('theme', 'astral'));
await page.waitForTimeout(300);
const astralHex = await page.evaluate(hexOf);
const astralLast = await page.evaluate(lastStroke);
const astralRings = await page.evaluate(() => window.__strokes.some(s => s.indexOf('178, 102, 255') !== -1));
ok(astralLast === astralHex, 'астральная: последний штрих перекрасился вслед за темой', astralLast + ' = ' + astralHex);
ok(astralRings, 'астральная: сетка радара тоже в акценте темы');

// возврат в неон («по странице»): перерисовка снова в циане
await page.evaluate(() => SiteSettings.set('theme', ''));
await page.waitForTimeout(300);
const total = await page.evaluate(() => window.__strokes.length);
const backLast = await page.evaluate(lastStroke);
ok(total > baseline, 'возврат в неон тоже перерисовал канвас', baseline + ' → ' + total);
ok(backLast === neonHex, 'после возврата последний штрих снова неоновый', backLast + ' = ' + neonHex);

ok(consoleErrors.length === 0, 'консоль чиста', consoleErrors.join(' | ').slice(0, 200));

console.log('итог: прошло ' + (9 - fails) + ', упало ' + fails);
await browser.close();
server.close();
process.exit(fails ? 1 : 0);
