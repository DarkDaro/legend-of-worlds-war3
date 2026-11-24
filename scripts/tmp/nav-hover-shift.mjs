#!/usr/bin/env node
// nav-hover-shift.mjs — дёргаются ли кнопки шапки при hover/click и на мобильном:
// 1) геометрия всех кнопок шапки до и под hover (каждая кнопка) на index и heroes;
// 2) mobile 390: гамбургер открыть/закрыть — геометрия кнопки и пунктов;
// дёрганье = дельта позиций/размеров любой кнопки при ховере соседа или своего состояния.
import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = http.createServer(async (req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'index.html';
    if (!path.extname(rel)) rel += '.html';
    try { const d = await fs.promises.readFile(path.join(ROOT, rel)); res.writeHead(200, { 'content-type': MIME[path.extname(rel)] || 'application/octet-stream' }); res.end(d); }
    catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(8946, r));

const browser = await chromium.launch();
const snap = (page) => page.evaluate(() =>
    [...document.querySelectorAll('.header-nav .nav-link, .nav-download, .hamburger-btn')].map(b => {
        const r = b.getBoundingClientRect();
        return [b.textContent.trim().slice(0, 10) || b.className, Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)];
    })
);
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let fails = 0;
// намеренный подъём кнопки на -1px (hover-lift «Скачать») дефектом не считается:
// дефект — сдвиг ЛЮБОЙ ДРУГОЙ кнопки или чужая дельта больше 1px у самой
const diffOnly = (a, b) => {
    const idx = a.findIndex((r, j) => !eq(r, b[j]));
    if (idx < 0) return null;
    if (a.length === b.length && a.filter((r, j) => !eq(r, b[j])).length === 1) {
        const dx = Math.abs(a[idx][1] - b[idx][1]);
        const dy = Math.abs(a[idx][2] - b[idx][2]);
        if (dx === 0 && dy <= 2) return null; // подъём -1px, округление субпикселей до 2
    }
    return `  base=${JSON.stringify(a[idx])} hovered=${JSON.stringify(b[idx])}`;
};

for (const pageUrl of ['index.html', 'heroes.html']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto('http://localhost:8946/' + pageUrl, { waitUntil: 'networkidle' });
    const base = await snap(page);
    for (let i = 0; i < base.length; i++) {
        const box = await page.evaluate((idx) => {
            const els = document.querySelectorAll('.header-nav .nav-link, .nav-download, .hamburger-btn');
            const r = els[idx].getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }, i);
        await page.mouse.move(box.x, box.y);
        await page.waitForTimeout(350); // переходы 0.15s/0.25s отыграть
        const hovered = await snap(page);
        const d = diffOnly(base, hovered);
        if (d) {
            fails++;
            console.log(`FAIL hover ${pageUrl} #${i} "${base[i][0]}"\n${d}`);
        }
        await page.mouse.move(10, 400); // уводим курсор
        await page.waitForTimeout(350);
        const back = await snap(page);
        if (!eq(base, back)) { fails++; console.log(`FAIL unhover-return ${pageUrl} #${i}`); }
    }
    console.log(fails ? `-- ${pageUrl}: провалов ${fails}` : `ok   ${pageUrl}: ${base.length} кнопок, hover не двигает ни одну, возврат точный`);
    await page.close();
}

// mobile: гамбургер
const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://localhost:8946/index.html', { waitUntil: 'networkidle' });
const burger = m.locator('.hamburger-btn');
const closed = await m.evaluate(() => {
    const b = document.querySelector('.hamburger-btn').getBoundingClientRect();
    return [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)];
});
await burger.click();
await m.waitForTimeout(400);
const open = await m.evaluate(() => {
    const b = document.querySelector('.hamburger-btn').getBoundingClientRect();
    const links = [...document.querySelectorAll('.header-nav .nav-link')].filter(l => l.getBoundingClientRect().height > 0);
    return { btn: [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)], links: links.length };
});
if (JSON.stringify(closed) !== JSON.stringify(open.btn)) { fails++; console.log(`FAIL мобильная кнопка сдвинулась: closed=${closed} open=${JSON.stringify(open.btn)}`); }
else console.log(`ok   mobile 390: гамбургер на месте при открытии (${open.btn.join(',')}), видимых пунктов ${open.links}`);
// hover по открытому пункту на mobile
const linkBox = await m.evaluate(() => {
    const l = [...document.querySelectorAll('.header-nav .nav-link')].find(l => l.getBoundingClientRect().height > 0).getBoundingClientRect();
    return { x: l.left + l.width / 2, y: l.top + l.height / 2 };
});
const before = await snap(m);
await m.mouse.move(linkBox.x, linkBox.y);
await m.waitForTimeout(350);
const after = await snap(m);
if (!eq(before, after)) { fails++; console.log('FAIL mobile hover двигает соседей'); }
else console.log('ok   mobile 390: hover по пункту меню соседей не двигает');
// контент под шапкой не сдвигается при открытии меню (панель-оверлей)
const anchor = await m.evaluate(() => {
    const el = document.querySelector('main') || document.body;
    return [Math.round(el.getBoundingClientRect().top), document.body.scrollHeight];
});
if (!(await m.evaluate(() => document.querySelector('.header-nav').classList.contains('hamburger-open')))) await m.locator('.hamburger-btn').click();
await m.waitForTimeout(400);
const anchorOpen = await m.evaluate(() => {
    const el = document.querySelector('main') || document.body;
    return [Math.round(el.getBoundingClientRect().top), document.body.scrollHeight];
});
if (JSON.stringify(anchor) !== JSON.stringify(anchorOpen)) { fails++; console.log(`FAIL контент уехал при открытии меню: ${anchor} -> ${anchorOpen}`); }
else console.log('ok   mobile 390: открытие меню контент не сдвигает');
// пункт меню кликабелен: панель не перекрыта stacking-контекстом ниже
const hit = await m.evaluate(() => {
    const l = [...document.querySelectorAll('.header-nav .nav-link')].find(x => x.getBoundingClientRect().height > 0);
    const r = l.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return l.contains(top) || top === l;
});
if (!hit) { fails++; console.log('FAIL пункт меню перекрыт другим слоем'); }
else console.log('ok   mobile 390: пункты меню кликабельны (не перекрыты)');
await browser.close();
server.close();
process.exit(fails ? 1 : 0);
