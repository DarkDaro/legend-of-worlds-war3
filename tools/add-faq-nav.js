/**
 * add-faq-nav.js
 * Добавляет ссылку на FAQ в навигацию всех страниц.
 * Вставляет после «Гайды» и перед «Лор».
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// FAQ link for root pages
const faqLinkRoot = '            <a href="faq.html" class="nav-link"><i class="fas fa-question-circle"></i> ЧаВо</a>';
// FAQ link for hero pages (../ prefix)
const faqLinkHeroes = '            <a href="../faq.html" class="nav-link"><i class="fas fa-question-circle"></i> ЧаВо</a>';

let count = 0;
let skipped = 0;

// Root-level pages
const rootFiles = fs.readdirSync(ROOT_DIR).filter(f =>
  f.endsWith('.html') && f !== 'test-item-preview.html' && f !== 'index.html' && f !== 'faq.html'
);

rootFiles.forEach(f => {
  const fp = path.join(ROOT_DIR, f);
  let html = fs.readFileSync(fp, 'utf8');

  if (html.includes('faq.html')) {
    console.log('SKIP (already has faq):', f);
    skipped++;
    return;
  }

  // Insert after Гайды link, before Лор link
  const pattern = /(<a href="guides\.html" class="nav-link[^"]*"><i class="fas fa-book-open"><\/i> Гайды<\/a>)(\s*)(<a href="lore\.html")/;
  if (!pattern.test(html)) {
    console.log('SKIP (pattern not found):', f);
    skipped++;
    return;
  }

  html = html.replace(pattern, '$1\n' + faqLinkRoot + '$2$3');
  fs.writeFileSync(fp, html, 'utf8');
  count++;
  console.log('OK:', f);
});

// Hero pages
const heroesDir = path.join(ROOT_DIR, 'heroes');
const heroFiles = fs.readdirSync(heroesDir).filter(f => f.endsWith('.html'));

heroFiles.forEach(f => {
  const fp = path.join(heroesDir, f);
  let html = fs.readFileSync(fp, 'utf8');

  if (html.includes('faq.html')) {
    console.log('SKIP (already has faq): heroes/' + f);
    skipped++;
    return;
  }

  const pattern = /(<a href="\.\.\/guides\.html" class="nav-link[^"]*"><i class="fas fa-book-open"><\/i> Гайды<\/a>)(\s*)(<a href="\.\.\/lore\.html")/;
  if (!pattern.test(html)) {
    console.log('SKIP (pattern not found): heroes/' + f);
    skipped++;
    return;
  }

  html = html.replace(pattern, '$1\n' + faqLinkHeroes + '$2$3');
  fs.writeFileSync(fp, html, 'utf8');
  count++;
  console.log('OK: heroes/' + f);
});

// faq.html itself — add active class
const faqFp = path.join(ROOT_DIR, 'faq.html');
let faqHtml = fs.readFileSync(faqFp, 'utf8');
// Insert FAQ link with active class after Гайды
const faqPattern = /(<a href="guides\.html" class="nav-link[^"]*"><i class="fas fa-book-open"><\/i> Гайды<\/a>)(\s*)(<a href="lore\.html")/;
if (faqPattern.test(faqHtml) && !faqHtml.includes('faq.html')) {
  faqHtml = faqHtml.replace(faqPattern, '$1\n' + '            <a href="faq.html" class="nav-link active"><i class="fas fa-question-circle"></i> ЧаВо</a>$2$3');
  fs.writeFileSync(faqFp, faqHtml, 'utf8');
  count++;
  console.log('OK: faq.html (with active)');
}

console.log('\nUpdated:', count, '| Skipped:', skipped);
