import { chromium } from 'playwright';
import http from 'http'; import fs from 'fs'; import path from 'path';
const ROOT = process.cwd();
const MIME = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.woff2':'font/woff2','.svg':'image/svg+xml' };
const server = http.createServer(async (req,res)=>{ let rel=decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'')||'index.html'; if(!path.extname(rel))rel+='.html'; try{const d=await fs.promises.readFile(path.join(ROOT,rel));res.writeHead(200,{'content-type':MIME[path.extname(rel)]||'application/octet-stream'});res.end(d);}catch{res.writeHead(404);res.end();} });
await new Promise(r=>server.listen(8947,r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{width:1280,height:800} });
const fontsSeen = [];
page.on('response', r => { if (r.url().match(/\.(woff2?|ttf|otf)/)) fontsSeen.push([r.url().split('/').pop().slice(0,40), r.fromCache?.() ? 'cache' : 'net']); });
await page.addInitScript(() => {
  window.__frames = [];
  new MutationObserver(()=>{}).observe(document, {childList:true, subtree:true});
  const poll = () => {
    const btn = document.querySelector('.header-nav .nav-link');
    if (btn) {
      const r = btn.getBoundingClientRect();
      window.__frames.push([Math.round(r.width), document.fonts.status,
        document.fonts.check('900 14px "Font Awesome 5 Free"'),
        getComputedStyle(btn).fontFamily.slice(0,30)]);
    }
    requestAnimationFrame(poll);
  };
  requestAnimationFrame(poll);
});
await page.goto('http://localhost:8947/index.html', { waitUntil:'load' });
await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(200);
await page.evaluate(()=>{ window.__frames=[]; });
await page.click('.header-nav a[href="heroes.html"]');
await page.waitForURL('**/heroes.html'); await page.waitForLoadState('load');
await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(250);
const frames = await page.evaluate(()=>window.__frames);
console.log('кадры:', JSON.stringify(frames));
console.log('шрифты в сети:', JSON.stringify(fontsSeen));
await browser.close(); server.close();
