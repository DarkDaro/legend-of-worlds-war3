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
 * 7) высокий контраст: выбор на items, персистентность, перекрытие разметки, theme-color;
 * 7b) астральная: выбор на items, персистентность, перекрытие разметки, theme-color;
 * 8) стекломорфизм: вкл/выкл на items (фон 0.92, blur 0, шапка none), мобильный авто-режим;
 * 9) примерные настройки: яркий текст (#e0f0ff → #ffffff) и фон главной (картинка убирается);
 * 10) все темы по списку на heroes: акцент, theme-color, скролл, возврат неона;
 * 11) скрины в /tmp/render-theme/.
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
        return p && !p.hidden && p.querySelectorAll('.settings-theme-btn').length === 6;
    });
}
ok(themeMobile, 'мобильный 390: панель с шестью пилюлями темы открылась из бургера');
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

// 8c. высокий контраст: выбор на items, персистентность, перекрытие разметки, скрины
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:8141/items.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
await page.click('.settings-btn');
await page.waitForTimeout(200);
const pillContrast = await page.$('.settings-theme-btn[data-theme-id="contrast"]');
ok(!!pillContrast, 'панель: пилюля «Высокий контраст» есть');
await pillContrast.click();
await page.waitForTimeout(200);
s = await snap();
ok(s.theme === 'contrast' && s.accent === 'rgb(0, 255, 255)' && s.bg === 'rgb(4, 4, 6)' && s.tc === '#040406', 'items: высокий контраст включён выбором, фон почти чёрный, theme-color темы', s.accent + ' | ' + s.bg + ' | ' + s.tc);
ok(s.overflow <= 0, 'items 1280 контраст: горизонтального скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'items-contrast-1280.png') });
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'contrast' && s.accent === 'rgb(0, 255, 255)', 'перезагрузка держит высокий контраст', s.accent);
// мобильный 390: главная в контрасте поверх разметки ашенваля — выбор перекрывает
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:8141/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'contrast' && s.overflow <= 0, 'index 390 контраст: выбор перекрыл ашенваль разметки, скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'index-contrast-390.png') });
await page.evaluate(() => localStorage.clear());

// 8d. астральная: выбор на items, персистентность, перекрытие разметки, скрины
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:8141/items.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
await page.click('.settings-btn');
await page.waitForTimeout(200);
const pillAstral = await page.$('.settings-theme-btn[data-theme-id="astral"]');
ok(!!pillAstral, 'панель: пилюля «Астральная» есть');
await pillAstral.click();
await page.waitForTimeout(200);
s = await snap();
ok(s.theme === 'astral' && s.accent === 'rgb(178, 102, 255)' && s.bg === 'rgb(13, 10, 20)' && s.tc === '#0d0a14', 'items: астральная включена выбором, фон фиолетовый, theme-color темы', s.accent + ' | ' + s.bg + ' | ' + s.tc);
ok(s.overflow <= 0, 'items 1280 астральная: горизонтального скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'items-astral-1280.png') });
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'astral' && s.accent === 'rgb(178, 102, 255)', 'перезагрузка держит астральную', s.accent);
// мобильный 390: главная в астральной поверх разметки ашенваля — выбор перекрывает
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:8141/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
s = await snap();
ok(s.theme === 'astral' && s.overflow <= 0, 'index 390 астральная: выбор перекрыл ашенваль разметки, скролла нет', String(s.overflow));
await page.screenshot({ path: path.join(OUTDIR, 'index-astral-390.png') });
await page.evaluate(() => localStorage.clear());

// 9. стекломорфизм: включён, выключен, мобильный авто-режим
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://localhost:8141/items.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
let glassOn = await page.evaluate(() => {
    const el = document.querySelector('.site-header');
    return {
        blur: getComputedStyle(document.documentElement).getPropertyValue('--surface-blur').trim(),
        header: getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter || ''
    };
});
ok(glassOn.blur === '12px' && glassOn.header.indexOf('blur(') === 0, 'стекло 1280 включено: шкала 12px, шапка размывается (8px)', glassOn.blur + ' | ' + glassOn.header);
await page.evaluate(() => window.SiteSettings.set('glass', false));
await page.waitForTimeout(200);
let glassOff = await page.evaluate(() => {
    const el = document.querySelector('.site-header');
    return {
        bg: getComputedStyle(document.documentElement).getPropertyValue('--surface-bg').trim(),
        blur: getComputedStyle(document.documentElement).getPropertyValue('--surface-blur').trim(),
        header: getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter || ''
    };
});
ok(glassOff.bg.indexOf('0.92') > -1 && glassOff.blur === '0px' && glassOff.header === 'none', 'стекло выключено: фон почти глухой 0.92, blur 0, у шапки none', glassOff.bg + ' | ' + glassOff.blur + ' | ' + glassOff.header);
await page.evaluate(() => window.SiteSettings.set('glass', true));
await page.waitForTimeout(200);
// мобильный 768-: стекло гаснет само медиа-запросом, флаг включён
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
const glassMobile = await page.evaluate(() => {
    const el = document.querySelector('.site-header');
    return getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter || '';
});
ok(glassMobile === 'none', 'мобильный 390: стекло гаснет само медиа-запросом, шапка глухая', glassMobile);

// 10. примерные настройки: яркий текст и фон главной
await page.setViewportSize({ width: 1280, height: 900 });
await page.waitForTimeout(300);
const textOff = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim());
await page.evaluate(() => window.SiteSettings.set('text', true));
await page.waitForTimeout(200);
const textOn = await page.evaluate(() => ({
    primary: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
    body: getComputedStyle(document.body).color
}));
ok(textOff === '#e0f0ff' && textOn.primary === '#ffffff', 'яркий текст: шкала светлеет с #e0f0ff до #ffffff', textOff + ' | ' + textOn.primary);
await page.evaluate(() => window.SiteSettings.set('text', false));
await page.waitForTimeout(200);
await page.goto('http://localhost:8141/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
const decorOn = await page.evaluate(() => getComputedStyle(document.querySelector('.hero-banner-bg')).display);
await page.evaluate(() => window.SiteSettings.set('decor', false));
await page.waitForTimeout(200);
const decorOff = await page.evaluate(() => ({
    bg: getComputedStyle(document.querySelector('.hero-banner-bg')).display,
    btn: getComputedStyle(document.querySelector('.hero-banner .btn, .hero-actions .btn, .hero-content .btn') || document.body).display,
    scroll: document.documentElement.scrollWidth - document.documentElement.clientWidth
}));
ok(decorOn !== 'none' && decorOff.bg === 'none' && decorOff.scroll <= 0, 'фон главной: картинка убирается, раскладка не сдвигается', decorOn + ' | ' + decorOff.bg + ' | overflow ' + decorOff.scroll);
await page.screenshot({ path: path.join(OUTDIR, 'index-nodecor-1280.png') });
await page.evaluate(() => window.SiteSettings.set('decor', true));
await page.waitForTimeout(200);
await page.evaluate(() => localStorage.clear());

// 11. все темы по списку на контентной странице heroes
await page.goto('http://localhost:8141/heroes.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
const THEME_LIST = [
    ['ashenvale', 'rgb(128, 255, 178)', '#09100c'],
    ['dark', 'rgb(0, 210, 235)', '#0d0d0f'],
    ['contrast', 'rgb(0, 255, 255)', '#040406'],
    ['astral', 'rgb(178, 102, 255)', '#0d0a14']
];
for (const [id, accent, tc] of THEME_LIST) {
    await page.evaluate(t => window.SiteSettings.set('theme', t), id);
    await page.waitForTimeout(200);
    s = await snap();
    ok(s.theme === id && s.accent === accent && s.tc === tc && s.overflow <= 0, 'heroes: тема ' + id + ' — акцент, theme-color, без скролла', s.accent + ' | ' + s.tc);
}
await page.evaluate(() => window.SiteSettings.set('theme', 'neon'));
await page.waitForTimeout(200);
s = await snap();
ok(s.theme === null && s.accent === 'rgb(0, 230, 255)', 'heroes: неон возвращается снятием атрибута', s.accent);
await page.evaluate(() => window.SiteSettings.set('theme', 'contrast'));
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(OUTDIR, 'heroes-contrast-1280.png') });
await page.evaluate(() => localStorage.clear());

// 12. консоль
ok(consoleMsgs.length === 0, 'консоль чиста (без внешних сертификатов)', consoleMsgs.slice(0, 3).join(' | '));

await browser.close();
server.close();
console.log(fails ? 'ПРОВАЛОВ: ' + fails : 'Все проверки темы зелёные');
process.exit(fails ? 1 : 0);
