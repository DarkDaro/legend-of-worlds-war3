#!/usr/bin/env node
/**
 * Проверка системы настроек сайта (js/site-settings.js) и стекломорфизма.
 * 1) дефолт: атрибуты on, стекло живо (backdrop-filter 12/8px на поверхностях);
 * 2) тумблеры: glass/anim/fx off — атрибуты ставятся, computed меняется
 *    (backdrop-filter none, анимации none, орбы скрыты);
 * 3) персистентность: перезагрузка держит флаги из localStorage;
 * 4) мобильный 390: шестерёнка доступна из меню бургера, панель открывается,
 *    горизонтального скролла нет;
 * 5) скрины панели в /tmp/render-settings/.
 * Ошибки консоли: внешние https-ресурсы в песочнице дают ERR_CERT_* — не считаются.
 * Запуск из корня: node scripts/tmp/settings-check.mjs
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
const OUTDIR = '/tmp/render-settings';
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
server.on('error', e => { console.error('Порт 8139: ' + e.message); process.exit(3); });
await new Promise(r => server.listen(8139, r));

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

await page.goto('http://localhost:8139/index.html', { waitUntil: 'load', timeout: 15000 });
await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; }' });
await page.waitForTimeout(400);

// 1. дефолт: все атрибуты on
const attrs = await page.evaluate(() => {
    const h = document.documentElement;
    return ['anim', 'glass', 'fx', 'sound'].map(k => h.getAttribute('data-' + k));
});
ok(attrs.join(',') === 'on,on,on,on', 'дефолт: все четыре флага on', attrs.join(','));

// 2. стекло живо: шапка размыта мягкой ступенью
const headerBf = await page.evaluate(() => getComputedStyle(document.querySelector('.site-header')).backdropFilter || getComputedStyle(document.querySelector('.site-header')).webkitBackdropFilter);
ok(headerBf.includes('blur(8px)'), 'стекло живо на шапке', headerBf);

// 3. аудит стекла: все живые backdrop-filter на страницах — из шкалы 12/8
const GLASS_PAGES = ['index.html', 'items.html', 'map.html', 'armor-calc.html', 'storage.html', 'compare.html'];
const audit = {};
for (const p of GLASS_PAGES) {
    await page.goto('http://localhost:8139/' + p, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(250);
    audit[p] = await page.evaluate(() => {
        const vals = new Set();
        for (const el of document.querySelectorAll('*')) {
            const s = getComputedStyle(el);
            const bf = s.backdropFilter || s.webkitBackdropFilter;
            if (bf && bf !== 'none') vals.add(bf);
        }
        return [...vals];
    });
}
const allVals = [...new Set(Object.values(audit).flat())];
ok(allVals.every(v => v === 'blur(12px)' || v === 'blur(8px)'), 'стекло по шкале 12/8 на ' + GLASS_PAGES.length + ' страницах', allVals.join(' | ') || 'пусто');
const totalGlass = Object.values(audit).reduce((n, v) => n + v.length, 0);
console.log('     страниц с живым стеклом: ' + Object.values(audit).filter(v => v.length).length + '/' + GLASS_PAGES.length + ', значений всего: ' + totalGlass);

// 4. панель: открытие с шестерёнки
await page.goto('http://localhost:8139/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
const gear = await page.$('.settings-btn');
ok(!!gear, 'шестерёнка в шапке создана');
await gear.click();
await page.waitForTimeout(200);
const panelVisible = await page.evaluate(() => { const p = document.getElementById('site-settings-root'); return p && !p.hidden; });
ok(panelVisible, 'панель открылась');
await page.screenshot({ path: path.join(OUTDIR, 'settings-desktop-1280.png') });

// 5. тумблеры: стекло, анимации, тяжёлые эффекты
const sw = k => page.evaluate(key => {
    const b = document.querySelector('.settings-switch[data-key="' + key + '"]');
    b.click();
    return document.documentElement.getAttribute('data-' + key);
}, k);

const glassAttr = await sw('glass');
await page.waitForTimeout(150);
const headerBfOff = await page.evaluate(() => getComputedStyle(document.querySelector('.site-header')).backdropFilter || 'none');
const surfaceBg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--surface-bg').trim());
ok(glassAttr === 'off' && !headerBfOff.includes('blur'), 'glass off: атрибут и backdrop-filter снят', headerBfOff + ' | ' + surfaceBg);
ok(surfaceBg === 'rgba(15, 23, 42, 0.92)', 'glass off: стекло стало глухим 0.92', surfaceBg);

const animAttr = await sw('anim');
await page.waitForTimeout(150);
// в разметке есть только орб-secondary: основной класс существует лишь в css
const orbAnim = await page.evaluate(() => { const o = document.querySelector('.home-orb-secondary'); return o ? getComputedStyle(o).animationName : 'нет орба'; });
ok(animAttr === 'off' && orbAnim === 'none', 'anim off: пульсация орба снята', orbAnim);

const fxAttr = await sw('fx');
await page.waitForTimeout(150);
const orbDisplay = await page.evaluate(() => { const o = document.querySelector('.home-orb-secondary'); return o ? getComputedStyle(o).display : 'нет орба'; });
const h1Shadow = await page.evaluate(() => getComputedStyle(document.querySelector('h1')).textShadow);
ok(fxAttr === 'off' && orbDisplay === 'none' && (h1Shadow === 'none' || h1Shadow === ''), 'fx off: орбы скрыты, тени текста сняты', orbDisplay + ' | ' + h1Shadow);

// 6. персистентность: перезагрузка держит выключенное
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(300);
const attrsAfter = await page.evaluate(() => ['anim', 'glass', 'fx'].map(k => document.documentElement.getAttribute('data-' + k)).join(','));
ok(attrsAfter === 'off,off,off', 'перезагрузка держит флаги из localStorage', attrsAfter);

// 7. сброс: чистый профиль снова всё включает
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(300);
const attrsReset = await page.evaluate(() => ['anim', 'glass', 'fx'].map(k => document.documentElement.getAttribute('data-' + k)).join(','));
ok(attrsReset === 'on,on,on', 'сброс localStorage возвращает всё включённое', attrsReset);

// 8. мобильный: бургер → шестерёнка → панель
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:8139/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(300);
await page.click('.hamburger-btn');
await page.waitForTimeout(200);
const gearMobile = await page.$('.settings-btn');
let mobileOpen = false;
if (gearMobile) {
    await gearMobile.click();
    await page.waitForTimeout(200);
    mobileOpen = await page.evaluate(() => { const p = document.getElementById('site-settings-root'); return p && !p.hidden; });
}
ok(mobileOpen, 'мобильный 390: панель открылась из меню бургера');
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
ok(overflow <= 0, 'мобильный 390: горизонтального скролла нет', String(overflow));
await page.screenshot({ path: path.join(OUTDIR, 'settings-mobile-390.png') });

// 9. консоль
ok(consoleMsgs.length === 0, 'консоль чиста (без внешних сертификатов)', consoleMsgs.slice(0, 3).join(' | '));

await browser.close();
server.close();
console.log(fails ? 'ПРОВАЛОВ: ' + fails : 'Все проверки настроек зелёные');
process.exit(fails ? 1 : 0);
