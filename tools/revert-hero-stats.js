/**
 * revert-hero-stats.js
 * Удаляет плейсхолдер-строки (Жизни: —, Мана: — и т.д.) из карточек героев.
 * Для отката перед повторным прогоном add-hero-stats.js.
 */

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'heroes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;

files.forEach(f => {
  const fp = path.join(dir, f);
  let html = fs.readFileSync(fp, 'utf8');

  if (!html.includes('Жизни: —')) {
    console.log('SKIP:', f);
    return;
  }

  // Remove the 6 placeholder lines (with any leading whitespace/indent)
  const lines = html.split('\n');
  const filtered = lines.filter(line => {
    const trimmed = line.trim();
    return !(
      trimmed.includes('Жизни: —</div>') ||
      trimmed.includes('Мана: —</div>') ||
      trimmed.includes('Атака: —</div>') ||
      trimmed.includes('Защита: —</div>') ||
      trimmed.includes('Скорость атаки: —</div>') ||
      trimmed.includes('Реген. здоровья: —</div>')
    );
  });

  fs.writeFileSync(fp, filtered.join('\n'), 'utf8');
  count++;
  console.log('OK:', f);
});

console.log('\nReverted:', count);
