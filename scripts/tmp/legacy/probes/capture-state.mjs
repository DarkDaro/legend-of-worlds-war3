/**
 * capture-state.mjs — фиксация «до/после» для правок шестерёнки и glass.css.
 *
 * Что делает: откывает контрольные страницы на двух вьюпортах (1280 и 390),
 * ждёт 'load' (не networkidle — RULES 4.6), замораживает анимации инжектом,
 * снимает скриншоты и собирает computed-значения стеклянных поверхностей
 * в один JSON. Имена файлов: <метка>-<страница>-<ширина>.png / .json.
 *
 * Запуск: node capture-state.mjs <метка>   (метка = before | after)
 * Сервер: python3 -m http.server 8791 в корне клона (должен быть поднят).
 */
import { chromium } from 'playwright';
import fs from 'fs';

const TAG = process.argv[2] || 'before';
const BASE = 'http://localhost:8791';
const OUT = `/home/z/my-project/scripts/tmp/state-${TAG}`;
fs.mkdirSync(OUT, { recursive: true });

// контрольные страницы: главная (прототип ашенваля), лавка, лор (ашенваль), герой
const PAGES = [
    ['index', '/index.html'],
    ['items', '/items.html'],
    ['lore', '/lore.html'],
    ['admiral', '/heroes/admiral.html'],
];
const WIDTHS = [1280, 390];

// что выписываем: токены материала стекла на html + computed поверхностей
const PROPS = [
    '--surface-bg', '--surface-bg-hover', '--surface-solid', '--surface-blur',
    '--surface-blur-soft', '--surface-border', '--surface-border-hover',
    '--surface-subtle', '--surface-subtle-hover', '--surface-tag-bg',
    '--surface-tag-border', '--surface-tag-active', '--cyan-rgb', '--data-theme',
];
const SELECTED = [
    '.site-header', '.wiki-container', '.settings-panel',
    '.hero-stats-table', '.gs-trigger', '.settings-btn',
];

const report = {};
const browser = await chromium.launch();
try {
    for (const w of WIDTHS) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 844 } });
        const page = await ctx.newPage();
        for (const [name, path] of PAGES) {
            await page.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
            await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
            await page.waitForTimeout(400);
            const shot = `${OUT}/${TAG}-${name}-${w}.png`;
            await page.screenshot({ path: shot });

            const data = await page.evaluate((args) => {
                const [props, sels] = args;
                const h = document.documentElement;
                const cs = getComputedStyle(h);
                const out = { htmlAttrs: {}, tokens: {}, els: {} };
                for (const a of ['data-theme', 'data-anim', 'data-glass', 'data-fx', 'data-sound']) {
                    out.htmlAttrs[a] = h.getAttribute(a);
                }
                for (const p of props) out.tokens[p] = cs.getPropertyValue(p).trim();
                for (const s of sels) {
                    const el = document.querySelector(s);
                    if (!el) { out.els[s] = null; continue; }
                    const e = getComputedStyle(el);
                    const r = el.getBoundingClientRect();
                    out.els[s] = {
                        bg: e.backgroundColor, bd: e.borderColor, br: e.borderRadius,
                        bf: e.backdropFilter || e.webkitBackdropFilter, blur: e.backdropFilter,
                        pos: e.position, top: e.top, right: e.right, bottom: e.bottom, left: e.left,
                        rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
                        display: e.display,
                    };
                }
                return out;
            }, [PROPS, SELECTED]);
            report[`${name}@${w}`] = data;
        }
        await ctx.close();
    }
} finally {
    await browser.close();
}
fs.writeFileSync(`${OUT}/computed.json`, JSON.stringify(report, null, 1));
console.log('ок, файлы в ' + OUT);
