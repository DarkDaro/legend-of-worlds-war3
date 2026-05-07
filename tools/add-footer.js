/**
 * add-footer.js
 * Добавляет стандартный футер на все страницы, где его нет.
 * Корневые страницы — ссылки без ../
 * Страницы героев — ссылки с ../
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Футер для корневых страниц
const footerRoot = `
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <span class="footer-logo"><i class="fas fa-shield-alt"></i> Legend of Worlds</span>
                <p>Уникальная карта для Warcraft III</p>
            </div>
            <div class="footer-links">
                <a href="updates.html">Обновления</a>
                <a href="lore.html">Лор</a>
                <a href="support.html">Поддержать</a>
            </div>
            <div class="footer-social">
                <a href="#" title="ВКонтакте"><i class="fab fa-vk"></i></a>
                <a href="#" title="Telegram"><i class="fab fa-telegram"></i></a>
                <a href="#" title="Discord"><i class="fab fa-discord"></i></a>
                <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025&ndash;2026 Legend of Worlds. Все права защищены.</p>
        </div>
    </footer>`;

// Футер для страниц героев (../ prefix)
const footerHeroes = `
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <span class="footer-logo"><i class="fas fa-shield-alt"></i> Legend of Worlds</span>
                <p>Уникальная карта для Warcraft III</p>
            </div>
            <div class="footer-links">
                <a href="../updates.html">Обновления</a>
                <a href="../lore.html">Лор</a>
                <a href="../support.html">Поддержать</a>
            </div>
            <div class="footer-social">
                <a href="#" title="ВКонтакте"><i class="fab fa-vk"></i></a>
                <a href="#" title="Telegram"><i class="fab fa-telegram"></i></a>
                <a href="#" title="Discord"><i class="fab fa-discord"></i></a>
                <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025&ndash;2026 Legend of Worlds. Все права защищены.</p>
        </div>
    </footer>`;

let count = 0;
let skipped = 0;

// Root-level pages (skip test-item-preview, index/compare/faq already have footer)
const rootFiles = fs.readdirSync(ROOT_DIR).filter(f =>
  f.endsWith('.html') && f !== 'test-item-preview.html'
);

rootFiles.forEach(f => {
  const fp = path.join(ROOT_DIR, f);
  let html = fs.readFileSync(fp, 'utf8');

  if (html.includes('class="site-footer"')) {
    console.log('SKIP (already has footer):', f);
    skipped++;
    return;
  }

  // Insert before </body>
  html = html.replace('</body>', footerRoot + '\n</body>');

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

  if (html.includes('class="site-footer"')) {
    console.log('SKIP (already has footer): heroes/' + f);
    skipped++;
    return;
  }

  html = html.replace('</body>', footerHeroes + '\n</body>');

  fs.writeFileSync(fp, html, 'utf8');
  count++;
  console.log('OK: heroes/' + f);
});

console.log('\nUpdated:', count, '| Skipped:', skipped);
