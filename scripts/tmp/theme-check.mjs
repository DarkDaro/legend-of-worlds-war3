#!/usr/bin/env node
/**
 * Проверка темы «Ашенваль» и переключателя тем в панели настроек.
 * 1) прототип в разметке: index и lore открываются в ашенвале без JS-выбора
 *    (accent rgb(128,255,178), фон rgb(9,16,12), theme-color #09100c);
 * 2) неон не тронут: items без атрибута остаётся циановым;
 * 3) панель: пилюли Неон/Ашенваль/Тёмная/По странице перекрывают разметку на любой
 *    странице, meta theme-color следует за выбором;
 * 4) персистентность: перезагрузка держит выбор, «По странице» возвращает разметку;
 * 5) мобильный 390: панель с темой из бургера, скролла нет;
 * 6) тёмная тема: выбор на items, персистентность, перекрытие разметки ашенваля на index;
 * 7) скрины в /tmp/render-theme/.
 * Ошибки консоли: внешние https-ресурсы в песочнице дают ERR_CERT_* — не считаются.
 * Запуск из корня: node scripts/tmp/theme-check.mjs
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
server.on('error', e => { console.error('Порт 8141: ' + e.message); process.exit(3); });
await new Promise(r => server.listen(8141, r));

const browser = await chromium.launch();
let fails = 0;
const ok = (cond, name, extra) => {
    console.log((cond ? 'ок  ' : 'ФАЛ ') + name + (extra ? ' — ' + extra : ''));
    if (!cond) fails++;
};

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const consoleMsgs = [];
page.on('console', m => {
    if (['error', 'warning'].includes(m.type()) && !/ERR_CERT|ERR_NAME|net::/.test(m.text())) consoleMsgs.push(m.type() + ': ' + m.text());
});
page.on('pageerror', e => consoleMsgs.push('pageerror: ' + e.message));

const snap = () => page.evaluate(() => ({
    theme: document.documentElement.getAttribute('data-theme'),
    accent: getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim(),
    bg: getComputedStyle(document.body).backgroundColor,
    tc: (document.querySelector('meta[name="theme-color"]') || {}).content || 'нет',
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
}));

// 1. прототип в разметке
await page.goto('http://localhost:8141/index.html', { waitUntil: 'load', timeout: 15000 });
await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; }' });
await page.waitForTimeout(400);
let s = await snap();
ok(s.theme === 'ashenvale' && s.accent === 'rgb(128, 255, 178)', 'index: дефолт разметки ашенваль, акцент лунно-зелёный', s.accent);
ok(s.bg === 'rgb(9, 16, 12)' && s.tc === '#09100c', 'index: фон ночного леса и theme-color темы', s.bg + ' | ' + s.tc);
ok(s.overflow <= 0, 'index 1280: горизонтального скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'index-ashenvale-1280.png') });

await page.goto('http://localhost:8141/lore.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'ashenvale' && s.accent === 'rgb(128, 255, 178)', 'lore: дефолт разметки ашенваль', s.accent);
ok(s.overflow <= 0, 'lore 1280: горизонтального скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'lore-ashenvale-1280.png') });

// 2. неон не тронут на странице без атрибута
await page.goto('http://localhost:8141/items.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === null && s.accent === 'rgb(0, 230, 255)' && s.tc === '#0b0e14', 'items: без атрибута неон и theme-color неона', s.accent + ' | ' + s.tc);

// 3. переключатель: неон поверх разметки ашенваля на index
await page.goto('http://localhost:8141/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
await page.click('.settings-btn');
await page.waitForTimeout(200);
const pillNeon = await page.$('.settings-theme-btn[data-theme-id="neon"]');
ok(!!pillNeon, 'панель: строка темы с пилюлями есть');
await pillNeon.click();
await page.waitForTimeout(200);
s = await snap();
ok(s.theme === null && s.accent === 'rgb(0, 230, 255)' && s.tc === '#0b0e14', 'index: неон перекрыл разметку, theme-color сменился', s.accent + ' | ' + s.tc);
await page.screenshot({ path: path.join(OUTDIR, 'index-neon-1280.png') });

// 4. персистентность неона перезагрузкой
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === null && s.accent === 'rgb(0, 230, 255)', 'перезагрузка держит выбор неона', s.accent);

// 5. ашенваль на странице без атрибута в разметке
await page.goto('http://localhost:8141/items.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
await page.click('.settings-btn');
await page.waitForTimeout(200);
await page.click('.settings-theme-btn[data-theme-id="ashenvale"]');
await page.waitForTimeout(200);
s = await snap();
ok(s.theme === 'ashenvale' && s.accent === 'rgb(128, 255, 178)' && s.tc === '#09100c', 'items: ашенваль включён выбором, theme-color темы', s.accent);

// 6. «по странице»: на items разметка неон, на index разметка ашенваль
await page.click('.settings-theme-btn[data-theme-id=""]');
await page.waitForTimeout(200);
s = await snap();
ok(s.theme === null && s.accent === 'rgb(0, 230, 255)', 'items: «по странице» вернул разметку (неон)', s.accent);
await page.goto('http://localhost:8141/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'ashenvale' && s.accent === 'rgb(128, 255, 178)', 'index: «по странице» вернул разметку (ашенваль)', s.accent);

// 7. сброс профиля: чистый localStorage снова разметка
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'ashenvale', 'сброс localStorage: index снова ашенваль из разметки', s.theme);

// 8. мобильный 390: панель с темой из бургера
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:8141/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
await page.click('.hamburger-btn');
await page.waitForTimeout(200);
const gearMobile = await page.$('.settings-btn');
let themeMobile = false;
if (gearMobile) {
    await gearMobile.click();
    await page.waitForTimeout(200);
    themeMobile = await page.evaluate(() => {
        const p = document.getElementById('site-settings-root');
        return p && !p.hidden && p.querySelectorAll('.settings-theme-btn').length === 4;
    });
}
ok(themeMobile, 'мобильный 390: панель с четырьмя пилюлями темы открылась из бургера');
s = await snap();
ok(s.overflow <= 0, 'мобильный 390: горизонтального скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'panel-theme-mobile-390.png') });

// 8b. тёмная тема: выбор на items, персистентность, скрины
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:8141/items.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
await page.click('.settings-btn');
await page.waitForTimeout(200);
const pillDark = await page.$('.settings-theme-btn[data-theme-id="dark"]');
ok(!!pillDark, 'панель: пилюля «Тёмная» есть');
await pillDark.click();
await page.waitForTimeout(200);
s = await snap();
ok(s.theme === 'dark' && s.accent === 'rgb(0, 210, 235)' && s.bg === 'rgb(13, 13, 15)' && s.tc === '#0d0d0f', 'items: тёмная включена выбором, фон графит, theme-color темы', s.accent + ' | ' + s.bg + ' | ' + s.tc);
ok(s.overflow <= 0, 'items 1280 тёмная: горизонтального скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'items-dark-1280.png') });
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'dark' && s.accent === 'rgb(0, 210, 235)', 'перезагрузка держит тёмную', s.accent);
// мобильный 390: главная в тёмной поверх разметки ашенваля — выбор перекрывает
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:8141/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'dark' && s.overflow <= 0, 'index 390 тёмная: выбор перекрыл ашенваль разметки, скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'index-dark-390.png') });
await page.evaluate(() => localStorage.clear());

// 9. консоль
ok(consoleMsgs.length === 0, 'консоль чиста (без внешних сертификатов)', consoleMsgs.slice(0, 3).join(' | '));

await browser.close();
server.close();
console.log(fails ? 'ПРОВАЛОВ: ' + fails : 'Все проверки темы зелёные');
process.exit(fails ? 1 : 0);
