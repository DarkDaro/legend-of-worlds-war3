/**
 * add-hero-stats.js
 * Добавляет в карточки героев поля: Жизни, Мана, Атака, Защита, Скорость атаки, Реген. здоровья
 * Плейсхолдер «—» — потом заменить на реальные числа.
 *
 * Запуск: node tools/add-hero-stats.js
 */

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'heroes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
let skipped = 0;

const indent = '                ';
const insertBlock = [
  indent + '<div class="stat-item"><i class="fas fa-heart"></i> Жизни: —</div>',
  indent + '<div class="stat-item"><i class="fas fa-tint"></i> Мана: —</div>',
  indent + '<div class="stat-item"><i class="fas fa-fist-raised"></i> Атака: —</div>',
  indent + '<div class="stat-item"><i class="fas fa-shield-alt"></i> Защита: —</div>',
  indent + '<div class="stat-item"><i class="fas fa-clock"></i> Скорость атаки: —</div>',
  indent + '<div class="stat-item"><i class="fas fa-heartbeat"></i> Реген. здоровья: —</div>',
].join('\n');

files.forEach(f => {
  const fp = path.join(dir, f);
  let html = fs.readFileSync(fp, 'utf8');

  // Skip if already has the new stats
  if (html.includes('Жизни:')) {
    console.log('SKIP (already has stats):', f);
    skipped++;
    return;
  }

  // Insert after "Осн. атрибут:" line, before "Скорость:" line
  // Use a regex that captures the attribute line and the speed line opening,
  // then inserts the block between them
  const pattern = /(<div class="stat-item"><i class="fas fa-star"><\/i> Осн\. атрибут:.*?<\/div>)\s*(<div class="stat-item"><i class="fas fa-shoe-prints">)/;

  if (!pattern.test(html)) {
    console.log('SKIP (pattern not found):', f);
    skipped++;
    return;
  }

  html = html.replace(pattern, '$1\n' + insertBlock + '\n' + indent + '$2');

  fs.writeFileSync(fp, html, 'utf8');
  count++;
  console.log('OK:', f);
});

console.log('\nUpdated:', count, '| Skipped:', skipped);
