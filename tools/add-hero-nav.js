/**
 * Инструмент добавления навигации на страницы героев
 * Запуск: node tools/add-hero-nav.js
 * 
 * Добавляет hero-nav.js и стили на все HTML-страницы героев
 */

const fs = require('fs');
const path = require('path');

const HEROES_DIR = path.join(__dirname, '..', 'heroes');

// Скрипт навигации (будет вставлен перед </body>)
const NAV_SCRIPT = `
<!-- Hero Navigation -->
<script src="../hero-nav.js"></script>
`;

// Стили для навигации (будут добавлены в <head>)
const NAV_STYLES = `
    <style>
        /* Hero Navigation */
        .hero-nav {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #1a3a5c;
        }
        .hero-nav-btn {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 20px;
            background: #0d1f35;
            border: 1px solid #1a3a5c;
            border-radius: 8px;
            color: #8aa0c0;
            text-decoration: none;
            transition: all 0.2s ease;
        }
        .hero-nav-btn:hover {
            background: #1a3a5c;
            color: #e0e8f0;
            border-color: #00e5ff;
        }
        .hero-nav-btn.prev {
            flex-direction: row;
        }
        .hero-nav-btn.next {
            flex-direction: row-reverse;
        }
        .hero-nav-btn.disabled {
            opacity: 0.4;
            pointer-events: none;
        }
        .hero-nav-info {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .hero-nav-name {
            font-size: 0.9rem;
            font-weight: 600;
            color: #e0e8f0;
        }
        .hero-nav-label {
            font-size: 0.75rem;
            color: #5a7a9a;
        }
        @media (max-width: 600px) {
            .hero-nav-btn {
                padding: 10px 14px;
            }
            .hero-nav-name {
                font-size: 0.8rem;
            }
            .hero-nav-label {
                display: none;
            }
        }
    </style>
`;

function processHeroPage(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Проверяем, нет ли уже скрипта навигации
    if (content.includes('hero-nav.js')) {
        console.log(`  Пропущено (уже есть): ${path.basename(filePath)}`);
        return;
    }
    
    // Добавляем стили в <head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', NAV_STYLES + '\n</head>');
    }
    
    // Добавляем скрипт перед </body>
    if (content.includes('</body>')) {
        content = content.replace('</body>', NAV_SCRIPT + '\n</body>');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  Обработано: ${path.basename(filePath)}`);
}

function main() {
    console.log('=== Добавление навигации на страницы героев ===\n');
    
    const heroFiles = fs.readdirSync(HEROES_DIR)
        .filter(f => f.endsWith('.html') && !f.includes('template'));
    
    console.log(`Найдено ${heroFiles.length} HTML-файлов\n`);
    
    heroFiles.forEach(file => {
        processHeroPage(path.join(HEROES_DIR, file));
    });
    
    console.log('\n=== Готово ===');
    console.log('Теперь создайте hero-nav.js в корне сайта');
}

main();
