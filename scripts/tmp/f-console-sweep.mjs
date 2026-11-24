// f-console-sweep.mjs — ошибки и битые запросы на шести представительных страницах
// после F1/F2 (site-settings на всех; калькуляторы и дашборд — свой js).
import { chromium } from 'playwright';
import http from 'http'; import fs from 'fs'; import path from 'path';
const MIME = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2' };
const server = http.createServer(async (req,res)=>{ let rel=decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'')||'index.html'; if(!path.extname(rel))rel+='.html'; try{const d=await fs.promises.readFile(path.join(process.cwd(),rel));res.writeHead(200,{'content-type':MIME[path.extname(rel)]||'application/octet-stream'});res.end(d);}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(8954,r));
const PAGES = ['index.html','items.html','balance-dashboard.html','build-constructor.html','aibot.html','lore.html'];
const b = await chromium.launch();
let fails = 0;
for (const pg of PAGES) {
    const p = await b.newPage({ viewport:{ width:1280, height:800 } });
    const errs = [], bad = [];
    p.on('pageerror', e => errs.push(String(e).slice(0, 120)));
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 120)); });
    p.on('requestfailed', r => bad.push(r.url().split('/').pop()));
    p.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url().split('/').pop()); });
    await p.goto('http://localhost:8954/' + pg, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    // настройки: авто + fast, полная смена, перезагрузка
    await p.evaluate(() => { window.SiteSettings.set('theme', 'auto'); window.SiteSettings.set('animSpeed', 'fast'); });
    await p.emulateMedia({ colorScheme: 'dark' });
    await p.waitForTimeout(200);
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    const state = await p.evaluate(() => ({ t: document.documentElement.getAttribute('data-theme'), s: document.documentElement.getAttribute('data-anim-speed') }));
    const okPage = errs.length === 0 && bad.length === 0 && state.t === 'dark' && state.s === 'fast';
    if (!okPage) fails++;
    console.log((okPage ? 'ok   ' : 'FAIL ') + pg + ` theme=${state.t} speed=${state.s}` + (errs.length ? ' errors: ' + errs.join(' | ') : '') + (bad.length ? ' bad: ' + bad.join(', ') : ''));
    await p.close();
}
await b.close(); server.close();
process.exit(fails ? 1 : 0);
