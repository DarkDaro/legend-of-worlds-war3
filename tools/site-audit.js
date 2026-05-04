const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..');

const files = fs.readdirSync(dir);
const htmlFiles = files.filter(f => f.endsWith('.html'));

let errors = [];
let warnings = [];
let info = [];

// Expected pages
const expectedPages = ['index.html', 'heroes.html', 'items.html', 'mechanics.html', 'monsters.html', 'info.html', 'lore.html', 'support.html', 'updates.html', 'changelog.html'];
const heroPages = ['admiral','archmage','blademaster','bloodshaman','chronomancer','cyborg','demonhunter','drowranger','druid','farseer','flamewarden','icelord','illusionist','keeper','lich','mountainking','murloc','necromancer','paladin','priestess','samurai','shadowblade','souleater','thunderer'].map(n => n + '.html');

// Check all expected pages exist
expectedPages.forEach(p => {
  if (!htmlFiles.includes(p)) {
    errors.push('MISSING PAGE: ' + p);
  }
});

// Check navigation links on each page
htmlFiles.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const baseName = f.replace('.html', '');

  // Check for old home.html references
  if (c.includes('home.html')) {
    errors.push(f + ': STILL REFERENCES home.html (should be index.html)');
  }

  // Check nav has correct links
  if (c.includes('header-nav') || c.includes('nav-link')) {
    // Should have link to index.html (main)
    if (!c.includes('href="index.html"')) {
      errors.push(f + ': nav missing link to index.html (main page)');
    }
    // Should have link to heroes.html
    if (!c.includes('href="heroes.html"')) {
      errors.push(f + ': nav missing link to heroes.html');
    }
  }

  // Check favicon
  if (!c.includes('rel="icon"')) {
    warnings.push(f + ': missing favicon');
  }

  // Check OG tags
  if (!c.includes('og:title')) {
    warnings.push(f + ': missing OG meta tags');
  }

  // Check breadcrumbs (except index.html)
  if (baseName !== 'index' && !c.includes('class="breadcrumbs"')) {
    warnings.push(f + ': missing breadcrumbs');
  }

  // Check title format
  const titleMatch = c.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) {
    const title = titleMatch[1];
    if (heroPages.includes(f)) {
      if (!title.includes('· Герои ·')) {
        warnings.push(f + ': title should be "Name · Герои · Legend of Worlds", got "' + title + '"');
      }
    }
  }

  // Check back button on hero pages
  if (heroPages.includes(f)) {
    if (!c.includes('href="heroes.html"') && c.includes('back-button')) {
      const backMatch = c.match(/back-button[^>]+onclick="([^"]+)"/);
      if (backMatch && !backMatch[1].includes('heroes.html')) {
        errors.push(f + ': back button should go to heroes.html, got: ' + backMatch[1]);
      }
    }
  }

  // Check back button on lore/mechanics
  if (baseName === 'lore' || baseName === 'mechanics') {
    if (c.includes('back-button')) {
      const backMatch = c.match(/back-button[^>]+onclick="([^"]+)"/);
      if (backMatch && !backMatch[1].includes('index.html')) {
        errors.push(f + ': back button should go to index.html, got: ' + backMatch[1]);
      }
    }
  }

  // Check CSS link
  if (!c.includes('href="style.css"')) {
    errors.push(f + ': missing style.css link');
  }

  // Check for broken href links to html files
  const hrefs = [...c.matchAll(/href="([^"]+\.html)"/g)].map(m => m[1]);
  hrefs.forEach(h => {
    if (!htmlFiles.includes(h) && !h.includes('archive')) {
      errors.push(f + ': broken link href="' + h + '"');
    }
  });

  // Check for broken JS src
  const srcs = [...c.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  srcs.forEach(s => {
    if (!fs.existsSync(path.join(dir, s))) {
      errors.push(f + ': missing JS file src="' + s + '"');
    }
  });

  // Check active nav class matches page
  if (c.includes('nav-link active')) {
    const activeMatch = c.match(/href="([^"]+)"[^>]*class="[^"]*nav-link active/);
    if (activeMatch) {
      const activePage = activeMatch[1];
      if (baseName === 'index' && activePage !== 'index.html') {
        errors.push(f + ': active nav should be index.html, got ' + activePage);
      }
      if (baseName === 'heroes' && activePage !== 'heroes.html') {
        errors.push(f + ': active nav should be heroes.html, got ' + activePage);
      }
      if (heroPages.includes(f) && activePage !== 'heroes.html') {
        errors.push(f + ': hero page active nav should be heroes.html, got ' + activePage);
      }
    }
  }
});

// Check CSS file
const cssPath = path.join(dir, 'style.css');
if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, 'utf8');
  // Brace balance
  let depth = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}') depth--;
  }
  if (depth !== 0) {
    errors.push('style.css: brace imbalance (depth=' + depth + ')');
  }
  // Check for .breadcrumbs style
  if (!css.includes('.breadcrumbs')) {
    errors.push('style.css: missing .breadcrumbs style');
  }
  // Check for .badge-danger
  if (!css.includes('.badge-danger')) {
    warnings.push('style.css: missing .badge-danger for boss_drop items');
  }
}

// Check JS files
const jsFiles = files.filter(f => f.endsWith('.js') && !f.startsWith('_') && f !== path.basename(__filename));
jsFiles.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  if (c.includes('home.html')) {
    errors.push(f + ': STILL REFERENCES home.html');
  }
});

console.log('=== ERRORS ===');
errors.forEach(e => console.log(e));
if (errors.length === 0) console.log('None');

console.log('\n=== WARNINGS ===');
warnings.forEach(w => console.log(w));
if (warnings.length === 0) console.log('None');

console.log('\n=== INFO ===');
console.log('HTML files checked: ' + htmlFiles.length);
console.log('Expected pages: ' + expectedPages.length);
console.log('Hero pages: ' + heroPages.length);
console.log('JS files: ' + jsFiles.length);
