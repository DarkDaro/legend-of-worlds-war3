import { chromium } from 'playwright';
import http from 'http'; import fs from 'fs'; import path from 'path';
const MIME = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.woff2':'font/woff2' };
const server = http.createServer(async (req,res)=>{ let rel=decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'')||'index.html'; if(!path.extname(rel))rel+='.html'; try{const d=await fs.promises.readFile(path.join(process.cwd(),rel));res.writeHead(200,{'content-type':MIME[path.extname(rel)]||'application/octet-stream'});res.end(d);}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(8953,r));
const b = await chromium.launch();
const p = await b.newPage({ viewport:{ width:390, height:844 } });
await p.goto('http://localhost:8953/index.html', { waitUntil:'networkidle' });
await p.click('.settings-btn'); await p.waitForTimeout(300);
const r = await p.evaluate(() => {
    const pnl = document.getElementById('site-settings-root');
    const rect = pnl.getBoundingClientRect();
    const speed = pnl.querySelector('[data-speed="fast"]');
    speed.scrollIntoView({ block: 'center' });
    return { top: Math.round(rect.top), bottom: Math.round(rect.bottom), vh: innerHeight, scrollable: pnl.scrollHeight > pnl.clientHeight };
});
await p.waitForTimeout(200);
const fast = await p.evaluate(() => {
    const b = document.querySelector('[data-speed="fast"]').getBoundingClientRect();
    return b.top >= 0 && b.bottom <= innerHeight;
});
console.log(JSON.stringify(r), 'fast-пилюля в экране:', fast);
await b.close(); server.close();
