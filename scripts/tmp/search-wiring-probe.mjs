// Проба TD-16a: search.js подключён на 5 страницах, оверлей поиска открывается
import { chromium } from 'playwright';
import { spawn } from 'child_process';

const server = spawn('python3', ['-m', 'http.server', '8142', '--bind', '127.0.0.1'], { cwd: process.cwd(), stdio: 'ignore' });
await new Promise(r => setTimeout(r, 800));
const PAGES = ['gallery.html', 'map.html', 'storage.html', 'tierlist.html', '404.html'];
let fails = 0;

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));

for (const p of PAGES) {
    await page.goto(`http://127.0.0.1:8142/${p}`, { waitUntil: 'load' });
    const hasGlobal = await page.evaluate(() => typeof window.GlobalSearch !== 'undefined');
    const trigger = await page.$('.gs-trigger');
    let opened = false, overlayVisible = false;
    if (trigger) {
        await trigger.click();
        await page.waitForTimeout(600);
        overlayVisible = await page.evaluate(() => {
            const o = document.querySelector('.gs-overlay');
            return !!o && o.classList.contains('active') && getComputedStyle(o).visibility === 'visible';
        });
        // закрыть: фокус в инпут поиска (там ловится Escape), затем Escape
        await page.click('.gs-input');
        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);
        const stillOpen = await page.evaluate(() => {
            const o = document.querySelector('.gs-overlay');
            return !!o && o.classList.contains('active') && getComputedStyle(o).visibility === 'visible';
        });
        opened = overlayVisible && !stillOpen;
    }
    const ok = hasGlobal && !!trigger && opened;
    if (!ok) fails++;
    console.log(`${ok ? 'ок' : 'ПРОВАЛ'}  ${p}: GlobalSearch=${hasGlobal} trigger=${!!trigger} открывается=${overlayVisible} закрывается=${opened}`);
}

console.log(`ошибки страницы/консоли: ${errors.length ? errors.join(' | ') : 'нет'}`);
if (errors.length) fails++;
console.log(fails === 0 ? 'ВСЕ ПРОВЕРКИ ЗЕЛЁНЫЕ' : `ПРОВАЛОВ: ${fails}`);
await browser.close();
server.kill();
process.exit(fails === 0 ? 0 : 1);
