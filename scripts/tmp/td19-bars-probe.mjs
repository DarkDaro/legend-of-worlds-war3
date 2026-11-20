// Проба TD-19a: бары на scaleX — computed transform соответствует проценту, width не задан инлайном
import { chromium } from 'playwright';
import { spawn } from 'child_process';

const server = spawn('python3', ['-m', 'http.server', '8144', '--bind', '127.0.0.1'], { cwd: process.cwd(), stdio: 'ignore' });
await new Promise(r => setTimeout(r, 800));
let fails = 0;
const ok = (cond, label, val) => { console.log(`${cond ? 'ок' : 'ПРОВАЛ'}  ${label}${val ? ' — ' + val : ''}`); if (!cond) fails++; };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));

// 1. balance-dashboard: строки статистики с барами
await page.goto('http://127.0.0.1:8144/balance-dashboard.html', { waitUntil: 'load' });
await page.waitForTimeout(800);
const dash = await page.evaluate(() => {
    const fills = [...document.querySelectorAll('.stat-pct-fill')];
    return fills.slice(0, 3).map(f => {
        const m = f.style.transform.match(/scaleX\(([\d.]+)\)/);
        return { inline: f.style.transform, computed: getComputedStyle(f).transform, w: f.style.width };
    });
});
ok(dash.length >= 3, 'balance-dashboard: бары сгенерированы', String(dash.length));
ok(dash.every(d => d.inline && d.inline.startsWith('scaleX(')), 'balance-dashboard: инлайн transform scaleX', dash[0] && dash[0].inline);
ok(dash.every(d => d.w === ''), 'balance-dashboard: инлайн width пуст');

// 2. compare: выбрать двух героев, бары заполняются
await page.goto('http://127.0.0.1:8144/compare.html', { waitUntil: 'load' });
await page.waitForTimeout(600);
const sel = await page.$('select');
let cmpOk = false, cmpVal = '';
if (sel) {
    const opts = await page.$$('select option');
    await page.evaluate(() => {
        const sels = document.querySelectorAll('select');
        if (sels.length >= 2) {
            const o1 = sels[0].querySelectorAll('option');
            const o2 = sels[1].querySelectorAll('option');
            sels[0].value = o1[1] ? o1[1].value : '';
            sels[1].value = o2[2] ? o2[2].value : '';
            sels[0].dispatchEvent(new Event('change', { bubbles: true }));
            sels[1].dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    await page.waitForTimeout(900);
    const bars = await page.evaluate(() =>
        [...document.querySelectorAll('[data-bar-width]')].slice(0, 3).map(el => ({ ds: el.dataset.barWidth, t: el.style.transform })));
    cmpOk = bars.length > 0 && bars.every(b => b.t && b.t.startsWith('scaleX('));
    cmpVal = bars[0] ? bars[0].ds + ' -> ' + bars[0].t : 'нет баров';
}
ok(cmpOk, 'compare: бары на scaleX по data-bar-width', cmpVal);

// 3. formulas-calc: бар удачи после ввода
await page.goto('http://127.0.0.1:8144/formulas-calc.html', { waitUntil: 'load' });
await page.waitForTimeout(600);
await page.evaluate(() => {
    const b = document.getElementById('luckBase');
    const v = document.getElementById('luckValue');
    if (b) { b.value = '25'; b.dispatchEvent(new Event('input', { bubbles: true })); }
    if (v) { v.value = '150'; v.dispatchEvent(new Event('input', { bubbles: true })); }
});
await page.waitForTimeout(600);
const luck = await page.evaluate(() => {
    const bar = document.getElementById('luckBar');
    return bar ? { t: bar.style.transform, label: document.getElementById('luckBarLabel').textContent } : null;
});
ok(luck && luck.t && luck.t.startsWith('scaleX('), 'formulas-calc: luckBar на scaleX', luck && luck.t + ' метка ' + luck.label);

// 4. armor-calc: бар редукции после ввода брони
await page.goto('http://127.0.0.1:8144/armor-calc.html', { waitUntil: 'load' });
await page.waitForTimeout(600);
await page.evaluate(() => {
    const inp = document.querySelector('#armorInput, input[type="number"]');
    if (inp) { inp.value = '30'; inp.dispatchEvent(new Event('input', { bubbles: true })); }
});
await page.waitForTimeout(700);
const armor = await page.evaluate(() => {
    const bar = document.getElementById('reductionBar');
    return bar ? { t: bar.style.transform, w: bar.style.width } : null;
});
ok(armor && armor.t && armor.t.startsWith('scaleX(') && armor.w === '', 'armor-calc: reductionBar на scaleX, width пуст', armor && armor.t);

ok(errors.length === 0, 'ошибок страницы/консоли нет', errors.join(' | ') || 'чисто');
console.log(fails === 0 ? 'ВСЕ ПРОВЕРКИ ЗЕЛЁНЫЕ' : `ПРОВАЛОВ: ${fails}`);
await browser.close();
server.kill();
process.exit(fails === 0 ? 0 : 1);
