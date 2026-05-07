const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const heroFiles = fs.readdirSync('heroes').filter(f => f.endsWith('.html'));

function check(filepath) {
  const html = fs.readFileSync(filepath, 'utf8');
  const name = path.basename(filepath);
  const bodyMatch = html.match(/<body[^>]*class="([^"]*)"/);
  const bodyClass = bodyMatch ? bodyMatch[1] : '(none)';
  const hasCrumbs = html.includes('breadcrumbs');
  const hasFavicon = html.includes('href="images/logo.png"');
  const hasOG = html.includes('og:title');
  const hasFooter = html.includes('site-footer');
  const hasHeader = html.includes('site-header');
  const hasSearch = html.includes('search.js');
  const hasIconLoader = html.includes('icon-loader.js');
  const hasAnalytics = html.includes('analytics.js');
  const hasHeroData = html.includes('hero-data.js');
  const usesMechanicCard = html.includes('mechanic-card');
  const usesInfoSection = html.includes('info-section');
  const usesWikiContainer = html.includes('wiki-container');
  const hasBackButton = html.includes('back-button');
  const hasBtnSecondary = html.includes('btn-secondary');

  return { name, bodyClass, hasCrumbs, hasFavicon, hasOG, hasFooter, hasHeader, hasSearch, hasIconLoader, hasAnalytics, hasHeroData, usesMechanicCard, usesInfoSection, usesWikiContainer, hasBackButton, hasBtnSecondary };
}

console.log('=== ROOT PAGES ===');
files.forEach(f => {
  const c = check(f);
  const issues = [];
  if (!c.hasFavicon) issues.push('NO FAVICON');
  if (!c.hasOG) issues.push('NO OG');
  if (!c.hasFooter) issues.push('NO FOOTER');
  if (!c.hasHeader) issues.push('NO HEADER');
  if (!c.hasCrumbs) issues.push('NO CRUMBS');
  if (!c.hasAnalytics) issues.push('NO ANALYTICS');
  if (!c.hasIconLoader) issues.push('NO ICON-LOADER');
  if (!c.hasSearch) issues.push('NO SEARCH');
  const flag = issues.length ? ' <<<' + issues.join(', ') : '';
  console.log(c.name.padEnd(25), 'body:' + c.bodyClass.padEnd(18), 'mech:' + (c.usesMechanicCard?'Y':'N'), 'info:' + (c.usesInfoSection?'Y':'N'), 'wiki:' + (c.usesWikiContainer?'Y':'N'), 'back:' + (c.hasBackButton?'Y':'N'), 'btn:' + (c.hasBtnSecondary?'Y':'N') + flag);
});

console.log('\n=== HERO PAGES ===');
heroFiles.forEach(f => {
  const c = check('heroes/' + f);
  const issues = [];
  if (!c.hasFavicon) issues.push('NO FAVICON');
  if (!c.hasOG) issues.push('NO OG');
  if (!c.hasFooter) issues.push('NO FOOTER');
  if (!c.hasHeader) issues.push('NO HEADER');
  if (!c.hasCrumbs) issues.push('NO CRUMBS');
  if (!c.hasAnalytics) issues.push('NO ANALYTICS');
  if (!c.hasIconLoader) issues.push('NO ICON-LOADER');
  if (!c.hasSearch) issues.push('NO SEARCH');
  const flag = issues.length ? ' <<<' + issues.join(', ') : '';
  console.log(c.name.padEnd(25), 'body:' + c.bodyClass.padEnd(18), 'mech:' + (c.usesMechanicCard?'Y':'N'), 'info:' + (c.usesInfoSection?'Y':'N'), 'wiki:' + (c.usesWikiContainer?'Y':'N'), 'back:' + (c.hasBackButton?'Y':'N'), 'btn:' + (c.hasBtnSecondary?'Y':'N') + flag);
});
