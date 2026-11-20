#!/usr/bin/env node
/**
 * Проба орбов и тумблера «Декоративные орбы» (20.11).
 * 1) перенос: index (элемент + ::after), heroes, info, monsters (красный),
 *    новые mechanics/updates — орб жив, анимация orbFloat, длительности;
 * 2) тумблер: строка в панели, orbs off — content none / display none,
 *    fx off орбы больше НЕ прячет (cursor-glow при этом умирает);
 * 3) anim off глушит движение, орб остаётся статичным пятном.
 * Ошибки консоли: внешние https-ресурсы в песочнице дают ERR_CERT_* — не считаются.
 * Запуск из корня: node scripts/tmp/orbs-check.mjs
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
await new Promise(r => server.listen(8141, r));

let ok = 0, fail = 0;
function check(name, cond, extra) {
    if (cond) { ok++; console.log('  ok  ' + name + (extra ? ' — ' + extra : '')); }
    else { fail++; console.log('FAIL  ' + name + (extra ? ' — ' + extra : '')); }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const cs = (sel, pseudo) => page.evaluate(([s, p]) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const st = getComputedStyle(el, p || null);
    return { content: st.content, display: st.display, anim: st.animationName, dur: st.animationDuration, bg: st.backgroundImage, w: st.width, op: st.opacity };
}, [sel, pseudo || '']);

async function go(url) {
    await page.goto('http://localhost:8141/' + url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(150);
}

// 1. главная: элемент + ::after
await go('index.html');
let e = await cs('.home-orb-secondary');
check('index: элемент орба видим', e && e.display !== 'none', e && e.display);
check('index: элемент анимируется orbFloat', e && e.anim === 'orbFloat', e && e.anim + ' ' + e.dur);
check('index: элемент 350px', e && e.w === '350px', e && e.w);
e = await cs('body', '::after');
check('index: ::after орб жив (content)', e && e.content === '""', e && e.content);
check('index: ::after orbFloat 11s', e && e.anim === 'orbFloat' && e.dur === '11s', e && e.anim + ' ' + e.dur);

// 2. heroes: карточная витрина
await go('heroes.html');
e = await cs('body', '::after');
check('heroes: орб жив', e && e.content === '""' && e.anim === 'orbFloat', e && (e.anim + ' ' + e.dur));
check('heroes: 500px (как было)', e && e.w === '500px', e && e.w);

// 3. info: второй элемент
await go('info.html');
e = await cs('.info-orb');
check('info: орб анимируется 12s', e && e.anim === 'orbFloat' && e.dur === '12s', e && e.anim + ' ' + e.dur);
check('info: цвет cyan 0.04 как было', e && (e.bg || '').includes('0, 230, 255') && (e.bg || '').includes('0.04'), (e && e.bg || '').slice(0, 80));

// 4. monsters: красный цвет сохранён
await go('monsters.html');
e = await cs('body', '::after');
check('monsters: красный 255,85,85', e && (e.bg || '').includes('255, 85, 85'), (e && e.bg || '').slice(0, 80));

// 5. новые страницы
for (const [f, sel] of [['mechanics.html', 'body.page-mechanics'], ['events.html', 'body.page-events'], ['map.html', 'body.page-map'], ['support.html', 'body.page-support'], ['updates.html', 'body.page-updates']]) {
    await go(f);
    e = await cs('body', '::after');
    check(f.split('.')[0] + ': орб появился', e && e.content === '""' && e.anim === 'orbFloat', e && (e.anim + ' ' + e.dur));
}

// 6. панель: строка и тумблер
await go('index.html');
await page.click('.settings-btn');
const orbRow = await page.evaluate(() => {
    const sw = document.querySelector('.settings-switch[data-key="orbs"]');
    if (!sw) return null;
    const row = sw.closest('.settings-row');
    return { name: row.querySelector('.settings-name').textContent, checked: sw.getAttribute('aria-checked') };
});
check('панель: строка «Декоративные орбы»', !!orbRow && orbRow.name === 'Декоративные орбы', orbRow && orbRow.checked);
check('панель: по умолчанию включён', orbRow && orbRow.checked === 'true', orbRow && orbRow.checked);

// 7. тумблер orbs off
await page.evaluate(() => SiteSettings.set('orbs', false));
e = await cs('body', '::after');
check('orbs off: ::after снят (content none)', e && e.content === 'none', e && e.content);
e = await cs('.home-orb-secondary');
check('orbs off: элемент скрыт', e && e.display === 'none', e && e.display);
const attr = await page.evaluate(() => document.documentElement.getAttribute('data-orbs'));
check('orbs off: data-orbs="off"', attr === 'off', attr);
await page.evaluate(() => SiteSettings.set('orbs', true));
e = await cs('body', '::after');
check('orbs on: вернулся', e && e.content === '""', e && e.content);

// 8. fx off больше не прячет орбы, но прячет свечение
await page.evaluate(() => SiteSettings.set('fx', false));
e = await cs('.home-orb-secondary');
check('fx off: орб остаётся (свой тумблер)', e && e.display !== 'none', e && e.display);
const glowGone = await page.evaluate(() => !document.querySelector('.cursor-glow'));
check('fx off: свечение курсора умерло', glowGone);
await page.evaluate(() => SiteSettings.set('fx', true));

// 9. anim off: движение глушится, пятно остаётся
await page.evaluate(() => SiteSettings.set('anim', false));
e = await cs('body', '::after');
check('anim off: анимация none, пятно живо', e && e.anim === 'none' && e.content === '""', e && e.anim);
await page.evaluate(() => SiteSettings.set('anim', true));

// 10. перезагрузка: флаг держится в localStorage
await page.evaluate(() => SiteSettings.set('orbs', false));
await page.reload({ waitUntil: 'domcontentloaded' });
e = await cs('body', '::after');
check('перезагрузка: orbs off держится', e && e.content === 'none', e && e.content);
await page.evaluate(() => SiteSettings.set('orbs', true));

await browser.close();
server.close();
console.log('\nитог: ' + ok + ' ok, ' + fail + ' fail');
process.exit(fail ? 1 : 0);
