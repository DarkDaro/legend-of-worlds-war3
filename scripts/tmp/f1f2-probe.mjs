#!/usr/bin/env node
// f1f2-probe.mjs — проба чанков F1 (авто-тема) и F2 (скорость анимаций):
// F1: 'auto' + prefers-color-scheme light/dark → неон/тёмная; живая смена без
//     перезагрузки; явная тема и «По странице» работают как раньше.
// F2: data-anim-speed slow/normal/fast → computed animation-duration и
//     transition-duration меняются множителем; data-anim="off" приоритетнее.
import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = http.createServer(async (req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'index.html';
    if (!path.extname(rel)) rel += '.html';
    try { const d = await fs.promises.readFile(path.join(process.cwd(), rel)); res.writeHead(200, { 'content-type': MIME[path.extname(rel)] || 'application/octet-stream' }); res.end(d); }
    catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(8949, r));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
let fails = 0;
const ok = (cond, label, extra) => { console.log((cond ? 'ok   ' : 'FAIL ') + label + (extra ? ' — ' + extra : '')); if (!cond) fails++; };

await page.goto('http://localhost:8949/index.html', { waitUntil: 'networkidle' });
await page.evaluate(() => localStorage.clear());

// F2: скорость
const dur = () => page.evaluate(() => ({
    anim: getComputedStyle(document.querySelector('.home-orb-secondary') || document.body).animationDuration,
    trans: getComputedStyle(document.querySelector('.nav-link')).transitionDuration,
    attr: document.documentElement.getAttribute('data-anim-speed')
}));
await page.evaluate(() => window.SiteSettings.set('animSpeed', 'normal'));
const n = await dur();
await page.evaluate(() => window.SiteSettings.set('animSpeed', 'slow'));
const s = await dur();
await page.evaluate(() => window.SiteSettings.set('animSpeed', 'fast'));
const f = await dur();
ok(n.attr === 'normal' && s.attr === 'slow' && f.attr === 'fast', 'атрибут скорости ставится');
ok(n.trans === '0.15s' && s.trans === '0.225s' && f.trans === '0.075s', 'transition .nav-link 0.15s масштабируется', `${n.trans}/${s.trans}/${f.trans}`);
ok(n.anim === '9s' && s.anim === '13.5s' && f.anim === '4.5s', 'animation орба масштабируется (база 9s по каскаду)', `${n.anim}/${s.anim}/${f.anim}`);
await page.evaluate(() => window.SiteSettings.set('anim', false));
const off = await page.evaluate(() => getComputedStyle(document.querySelector('.nav-link')).transitionDuration);
await page.evaluate(() => window.SiteSettings.set('animSpeed', 'slow'));
const offSlow = await page.evaluate(() => getComputedStyle(document.querySelector('.nav-link')).transitionDuration);
ok(off === offSlow, 'data-anim="off" приоритетнее скорости', `${off} при slow`);
await page.evaluate(() => { window.SiteSettings.set('anim', true); window.SiteSettings.set('animSpeed', 'normal'); });

// F1: авто-тема
await page.emulateMedia({ colorScheme: 'light' });
await page.evaluate(() => window.SiteSettings.set('theme', 'auto'));
const lightTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
await page.emulateMedia({ colorScheme: 'dark' });
await page.waitForTimeout(200); // слушатель matchMedia без перезагрузки
const darkTheme = await page.evaluate(() => ({
    t: document.documentElement.getAttribute('data-theme'),
    tc: document.querySelector('meta[name="theme-color"]').content
}));
ok(lightTheme === null || lightTheme === undefined, 'авто + светлая система → неон (атрибута нет)', String(lightTheme));
ok(darkTheme.t === 'dark' && darkTheme.tc === '#0d0d0f', 'авто + тёмная система → тёмная, theme-color живьём', JSON.stringify(darkTheme));
await page.evaluate(() => window.SiteSettings.set('theme', 'ashenvale'));
const expl = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
await page.emulateMedia({ colorScheme: 'light' });
await page.waitForTimeout(150);
const explAfter = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
ok(expl === 'ashenvale' && explAfter === 'ashenvale', 'явная тема сильнее системной светлости', explAfter);
await page.emulateMedia({ colorScheme: 'dark' });
await page.evaluate(() => window.SiteSettings.set('theme', ''));
const byPage = await page.evaluate(() => ({
    t: document.documentElement.getAttribute('data-theme'),
    auto: localStorage.getItem('site-settings-v1')
}));
ok(byPage.t === null, '«По странице» работает как раньше', String(byPage.t));

// панель: пилюли на месте
await page.evaluate(() => window.SiteSettings.set('theme', 'auto'));
await page.click('.settings-btn');
const pills = await page.evaluate(() => ({
    auto: !!document.querySelector('.settings-theme-btn[data-theme-id="auto"]'),
    speeds: [...document.querySelectorAll('[data-speed]')].map(b => b.getAttribute('data-speed')),
    activeSpeed: (document.querySelector('[data-speed].active') || {}).textContent || ''
}));
ok(pills.auto && pills.speeds.join(',') === 'slow,normal,fast', 'пилюли «Авто» и скорости в панели', JSON.stringify(pills));
ok(pills.activeSpeed === 'Обычно', 'активная скорость подсвечена', pills.activeSpeed);
// localStorage авто сохранился
const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('site-settings-v1') || '{}'));
ok(stored.theme === 'auto', '«Авто» переживает перезагрузку (localStorage)', JSON.stringify(stored.theme));

const errors = [];
page.on('pageerror', e => errors.push(String(e)));
await page.reload({ waitUntil: 'networkidle' });
const afterReload = await page.evaluate(() => ({
    t: document.documentElement.getAttribute('data-theme'),
    spd: document.documentElement.getAttribute('data-anim-speed')
}));
ok(afterReload.t === 'dark' && errors.length === 0, 'после перезагрузки авто-тема тёмная, консоль чиста', `errors=${errors.length}`);

await browser.close();
server.close();
process.exit(fails ? 1 : 0);
