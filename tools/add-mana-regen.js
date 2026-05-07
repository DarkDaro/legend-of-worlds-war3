/**
 * add-mana-regen.js
 * Добавляет строку «Реген. маны: 0.01/сек» после строки «Мана: —»
 * во все карточки героев, где её ещё нет.
 */

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'heroes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;

files.forEach(f => {
  const fp = path.join(dir, f);
  let html = fs.readFileSync(fp, 'utf8');

  if (html.includes('Реген. маны')) {
    console.log('SKIP (already has):', f);
    return;
  }

  // Insert after the Мана line (whether it has a value or —)
  const pattern = /(<div class="stat-item"><i class="fas fa-tint"><\/i> Мана:.*?<\/div>)/;

  if (!pattern.test(html)) {
    console.log('SKIP (Мана line not found):', f);
    return;
  }

  const indent = '                ';
  html = html.replace(pattern, '$1\n' + indent + '<div class="stat-item"><i class="fas fa-tint-slash"></i> Реген. маны: 0.01/сек</div>');

  fs.writeFileSync(fp, html, 'utf8');
  count++;
  console.log('OK:', f);
});

console.log('\nUpdated:', count);
