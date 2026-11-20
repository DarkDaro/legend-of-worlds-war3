#!/usr/bin/env node
/**
 * Проба оживших эффектов (TD-16, чанк 20.11 — указание владельца «включим,
 * умеренно, и в настройки»): cursor-glow, ripple, scroll-progress, переход
 * страниц, строка «Полоса прогресса» в панели.
 * Ошибки консоли: внешние https-ресурсы в песочнице дают ERR_CERT_* — не считаются.
 * Запуск из корня: node scripts/tmp/effects-probe.mjs
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
server.on('error', e => { console.error('Порт 8142: ' + e.message); process.exit(3); });
await new Promise(r => server.listen(8142, r));

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

// 1. свечение курсора: элемент есть, догоняет мышь, тумблер fx выключает и возвращает
await page.goto('http://localhost:8142/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(400);
let glowState = await page.evaluate(() => {
    const g = document.querySelector('.cursor-glow');
    return { exists: !!g, transform: g ? getComputedStyle(g).transform : 'нет' };
});
ok(glowState.exists, 'свечение курсора: элемент создан');
await page.mouse.move(400, 400);
await page.waitForTimeout(350);
const t1 = await page.evaluate(() => getComputedStyle(document.querySelector('.cursor-glow')).transform);
await page.mouse.move(900, 650);
await page.waitForTimeout(350);
const t2 = await page.evaluate(() => getComputedStyle(document.querySelector('.cursor-glow')).transform);
ok(t1 !== 'none' && t2 !== 'none' && t1 !== t2, 'свечение курсора: ореол следует за мышью', t1 + ' → ' + t2);
await page.evaluate(() => window.SiteSettings.set('fx', false));
await page.waitForTimeout(200);
let glowOff = await page.evaluate(() => ({ n: document.querySelectorAll('.cursor-glow').length, fx: window.SiteSettings.get('fx') }));
ok(glowOff.n === 0, 'свечение курсора: fx off убирает элемент на лету', 'осталось ' + glowOff.n + ', fx=' + glowOff.fx);
await page.evaluate(() => window.SiteSettings.set('fx', true));
await page.waitForTimeout(200);
glowOff = await page.evaluate(() => ({ n: document.querySelectorAll('.cursor-glow').length, fx: window.SiteSettings.get('fx') }));
ok(glowOff.n === 1, 'свечение курсора: fx on возвращает элемент', 'стало ' + glowOff.n + ', fx=' + glowOff.fx);

// 2. волна при клике: спан .ripple рождается и умирает, anim off не рождает
await page.waitForTimeout(900); // ждём смерти волны от проверки fx
const rippleRect = await page.evaluate(() => {
    const b = document.querySelector('.header-nav .nav-link');
    if (!b) return { spawned: -1, нет: 'nav-link не найден' };
    const r = b.getBoundingClientRect();
    b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
    return { spawned: document.querySelectorAll('.ripple').length };
});
ok(rippleRect.spawned > 0, 'волна при клике: pointerdown на .nav-link рождает спан .ripple', 'spawned=' + rippleRect.spawned);
await page.waitForTimeout(900);
const rippleCleaned = await page.evaluate(() => document.querySelectorAll('.ripple').length);
ok(rippleCleaned === 0, 'волна при клике: спан умирает после анимации');
await page.evaluate(() => window.SiteSettings.set('anim', false));
await page.waitForTimeout(200);
const rippleGuarded = await page.evaluate(() => {
    const b = document.querySelector('.header-nav .nav-link');
    const r = b.getBoundingClientRect();
    b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }));
    return document.querySelectorAll('.ripple').length;
});
ok(rippleGuarded === 0, 'волна при клике: anim off не рождает волну (гвард от залипания)');
await page.evaluate(() => window.SiteSettings.set('anim', true));
await page.waitForTimeout(200);

// 3. полоса прогресса: scaleX растёт при скролле, тумблер прячет
const bar0 = await page.evaluate(() => getComputedStyle(document.querySelector('.scroll-progress')).transform);
ok(bar0.indexOf('matrix') === 0, 'полоса прогресса: элемент создан, scaleX управляется', bar0);
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(400);
const bar1 = await page.evaluate(() => getComputedStyle(document.querySelector('.scroll-progress')).transform);
ok(bar1 !== bar0 && /matrix\(1(\.\d+)?, 0, 0, 1/.test(bar1), 'полоса прогресса: внизу страницы полоса полная', bar1);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.evaluate(() => window.SiteSettings.set('progress', false));
await page.waitForTimeout(200);
const barHidden = await page.evaluate(() => getComputedStyle(document.querySelector('.scroll-progress')).display);
ok(barHidden === 'none', 'полоса прогресса: тумблер прячет элемент (data-progress)');
await page.evaluate(() => window.SiteSettings.set('progress', true));
await page.waitForTimeout(200);

// 4. панель: строка «Полоса прогресса» с тумблером
await page.click('.settings-btn');
await page.waitForTimeout(250);
const panelRow = await page.evaluate(() => {
    const p = document.getElementById('site-settings-root');
    const sw = p.querySelector('.settings-switch[data-key="progress"]');
    const names = Array.from(p.querySelectorAll('.settings-name')).map(n => n.textContent);
    return { sw: !!sw, rows: p.querySelectorAll('.settings-row').length, hasName: names.indexOf('Полоса прогресса') > -1 };
});
ok(panelRow.sw && panelRow.hasName, 'панель: строка «Полоса прогресса» с тумблером есть', panelRow.rows + ' строк');
await page.keyboard.press('Escape');

// 5. переход страниц: внутренняя ссылка даёт page-leaving и уходит; файлы — нет
await page.waitForTimeout(300);
const navPromise = page.waitForNavigation({ waitUntil: 'load', timeout: 5000 }).catch(() => null);
await page.evaluate(() => { document.querySelector('.header-nav a[href="heroes.html"]').click(); });
await page.waitForTimeout(40);
const leaving = await page.evaluate(() => document.body.classList.contains('page-leaving'));
ok(leaving, 'переход страниц: класс page-leaving ставится перед уходом');
const navOk = await navPromise;
ok(!!navOk && page.url().indexOf('heroes.html') > -1, 'переход страниц: навигация состоялась', page.url());
const leavingCleared = await page.evaluate(() => !document.body.classList.contains('page-leaving'));
ok(leavingCleared, 'переход страниц: на новой странице класс сброшен');

// 6. мобильный 390: свечение спрятано медиазапросом
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:8142/index.html', { waitUntil: 'load', timeout: 15000 });
await page.waitForTimeout(400);
const glowMobile = await page.evaluate(() => {
    const g = document.querySelector('.cursor-glow');
    return g ? getComputedStyle(g).display : 'нет элемента';
});
ok(glowMobile === 'none', 'мобильный 390: свечение спрятано медиазапросом', glowMobile);

// 7. консоль
ok(consoleMsgs.length === 0, 'консоль чиста (без внешних сертификатов)', consoleMsgs.slice(0, 3).join(' | '));

await browser.close();
server.close();
console.log(fails ? 'ПРОВАЛОВ: ' + fails : 'Все проверки эффектов зелёные');
process.exit(fails ? 1 : 0);
