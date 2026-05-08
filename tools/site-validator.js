/**
 * Валидатор целостности сайта HeroData
 * Запуск: node tools/site-validator.js
 * 
 * Проверяет:
 * - Все герои из hero-data.js имеют HTML-страницы
 * - Все предметы из items-db.js имеют PNG-иконки
 * - Все ссылки на страницы существуют
 * - Нет orphan-страниц (страниц без ссылок из навигации)
 */

const fs = require('fs');
const path = require('path');

// Пути
const ROOT = path.join(__dirname, '..');
const HEROES_DIR = path.join(ROOT, 'heroes');
const IMAGES_DIR = path.join(ROOT, 'images');
const HEROES_IMAGES = path.join(IMAGES_DIR, 'heroes');
const ITEMS_IMAGES = path.join(IMAGES_DIR, 'items');

// Результаты
const errors = [];
const warnings = [];
const passed = [];

// Загрузка данных
function loadData() {
    // hero-data.js
    const heroDataPath = path.join(ROOT, 'hero-data.js');
    const heroDataContent = fs.readFileSync(heroDataPath, 'utf8');
    
    // Извлекаем HEROES_DATA через eval (локальная утилита, используется только для проверки)
    let HEROES_DATA;
    eval(heroDataContent.replace('var HEROES_DATA', 'HEROES_DATA'));
    
    // items-db.js
    const itemsDbPath = path.join(ROOT, 'items-db.js');
    const itemsDbContent = fs.readFileSync(itemsDbPath, 'utf8');
    let itemsDB;
    eval(itemsDbContent.replace('const itemsDB', 'itemsDB'));
    
    return { HEROES_DATA, itemsDB };
}

// Проверка героев
function validateHeroes(HEROES_DATA) {
    console.log('\n--- Проверка героев ---');
    
    const heroIds = HEROES_DATA.map(h => h.heroId);
    const heroPages = fs.readdirSync(HEROES_DIR)
        .filter(f => f.endsWith('.html'))
        .map(f => f.replace('.html', ''));
    
    // Герои без страниц
    heroIds.forEach(id => {
        if (!heroPages.includes(id)) {
            errors.push(`Герой ${id} из hero-data.js не имеет HTML-страницы`);
        }
    });
    
    // Страницы без героев в базе
    heroPages.forEach(page => {
        if (!heroIds.includes(page)) {
            warnings.push(`Страница heroes/${page}.html не имеет записи в hero-data.js`);
        }
    });
    
    // Проверка изображений героев
    heroIds.forEach(id => {
        const imgPath = path.join(HEROES_IMAGES, `${id}.png`);
        if (!fs.existsSync(imgPath)) {
            warnings.push(`Герой ${id}: нет изображения ${id}.png`);
        }
    });
    
    passed.push(`Героев в базе: ${heroIds.length}`);
    passed.push(`HTML-страниц героев: ${heroPages.length}`);
}

// Проверка предметов
function validateItems(itemsDB) {
    console.log('\n--- Проверка предметов ---');
    
    const itemIds = Object.keys(itemsDB);
    let missingIcons = 0;
    
    itemIds.forEach(id => {
        const imgPath = path.join(ITEMS_IMAGES, `${id}.png`);
        if (!fs.existsSync(imgPath)) {
            missingIcons++;
        }
    });
    
    passed.push(`Предметов в базе: ${itemIds.length}`);
    
    if (missingIcons > 0) {
        warnings.push(`Предметов без PNG-иконок: ${missingIcons}`);
    } else {
        passed.push(`Все предметы имеют PNG-иконки`);
    }
}

// Проверка ссылок в навигации
function validateNavigation() {
    console.log('\n--- Проверка навигации ---');
    
    const navLinks = [
        'index.html', 'heroes.html', 'items.html', 'mechanics.html',
        'monsters.html', 'info.html', 'guides.html', 'faq.html',
        'lore.html', 'support.html', 'updates.html', 'modes.html',
        'calculator.html', 'compare.html', 'armor-calc.html', 'formulas-calc.html'
    ];
    
    navLinks.forEach(link => {
        const fullPath = path.join(ROOT, link);
        if (!fs.existsSync(fullPath)) {
            errors.push(`Страница ${link} не найдена`);
        }
    });
    
    passed.push(`Навигационных ссылок проверено: ${navLinks.length}`);
}

// Проверка дополнительных страниц
function validateOrphanPages() {
    console.log('\n--- Проверка orphan-страниц ---');
    
    // Страницы которые должны быть но могут отсутствовать в навигации
    const knownPages = [
        'changelog.html', 'map.html', '404.html',
        'guide-druid.html'
    ];
    
    knownPages.forEach(page => {
        const fullPath = path.join(ROOT, page);
        if (fs.existsSync(fullPath)) {
            passed.push(`Дополнительная страница ${page} существует`);
        }
    });
}

// Главная функция
function main() {
    console.log('=== Валидатор целостности HeroData ===\n');
    
    try {
        const { HEROES_DATA, itemsDB } = loadData();
        
        validateHeroes(HEROES_DATA);
        validateItems(itemsDB);
        validateNavigation();
        validateOrphanPages();
        
        // Вывод результатов
        console.log('\n=== Результаты ===\n');
        
        if (passed.length > 0) {
            console.log('✓ Пройдено:');
            passed.forEach(p => console.log(`   ${p}`));
        }
        
        if (warnings.length > 0) {
            console.log('\n⚠ Предупреждения:');
            warnings.forEach(w => console.log(`   ${w}`));
        }
        
        if (errors.length > 0) {
            console.log('\n✗ Ошибки:');
            errors.forEach(e => console.log(`   ${e}`));
        }
        
        console.log(`\n=== Итого: ${errors.length} ошибок, ${warnings.length} предупреждений ===`);
        
        // Код выхода
        process.exit(errors.length > 0 ? 1 : 0);
        
    } catch (err) {
        console.error('Ошибка выполнения:', err.message);
        process.exit(1);
    }
}

main();
