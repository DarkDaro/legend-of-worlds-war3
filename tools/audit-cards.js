const fs = require('fs');
const path = require('path');

const heroesDir = path.join(__dirname, '..', 'heroes');
const files = fs.readdirSync(heroesDir).filter(f => f.endsWith('.html'));

let errors = [];
let warnings = [];

for (const f of files) {
    const c = fs.readFileSync(path.join(heroesDir, f), 'utf8');
    const id = f.replace('.html', '');

    // 1. Пути к скриптам/стилям (должны быть ../)
    if (c.includes('../../hero-data.js') || c.includes('../../search.js')) {
        errors.push(`${id}: битые пути к скриптам (../../ вместо ../)`);
    }
    if (c.includes('href="style.css"') || c.includes('src="icon-loader.js"') || c.includes('src="analytics.js"')) {
        errors.push(`${id}: пути без ../ (style.css, icon-loader.js, analytics.js)`);
    }

    // 2. Нет ../heroes/ в ссылках (все файлы в одной папке)
    const badNav = c.match(/href="[^"]*\.\.\/heroes\/[^"]*"/g);
    if (badNav) {
        errors.push(`${id}: ссылки ../heroes/ в навигации (${badNav.length})`);
    }

    // 3. data-ability вместо img для иконок способностей
    const imgAbilities = c.match(/ability-icon.*<img/g);
    if (imgAbilities) {
        errors.push(`${id}: старый формат иконок (img вместо data-ability)`);
    }

    // 4. hero-nav наличие
    if (!c.includes('hero-nav')) {
        warnings.push(`${id}: нет hero-nav`);
    }

    // 5. hero-build наличие
    if (!c.includes('hero-build')) {
        warnings.push(`${id}: нет hero-build`);
    }

    // 6. btn-secondary вместо back-button
    if (c.includes('back-button')) {
        errors.push(`${id}: старый back-button вместо btn-secondary`);
    }

    // 7. footer
    if (!c.includes('site-footer')) {
        errors.push(`${id}: нет footer`);
    }

    // 8. FontAwesome подключен
    if (!c.includes('font-awesome')) {
        errors.push(`${id}: не подключен FontAwesome`);
    }

    // 9. style.css подключен
    if (!c.includes('style.css')) {
        errors.push(`${id}: не подключен style.css`);
    }

    // 10. hero-data.js подключен
    if (!c.includes('hero-data.js')) {
        errors.push(`${id}: не подключен hero-data.js`);
    }
}

// Проверка hero-data.js — все heroId имеют соответствующие HTML файлы
const heroData = fs.readFileSync(path.join(__dirname, '..', 'hero-data.js'), 'utf8');
const heroIdMatches = [...heroData.matchAll(/heroId:\s*'([^']+)'/g)];
const heroIds = heroIdMatches.map(m => m[1]);

for (const hid of heroIds) {
    if (!files.includes(hid + '.html')) {
        errors.push(`hero-data.js: heroId '${hid}' не имеет HTML файла`);
    }
}

// Проверка HTML файлов — все есть в hero-data.js
for (const f of files) {
    const id = f.replace('.html', '');
    if (!heroIds.includes(id)) {
        warnings.push(`${id}.html: нет в hero-data.js`);
    }
}

// Проверка hero-nav цепочки — все ссылки должны вести на существующие файлы
for (const f of files) {
    const c = fs.readFileSync(path.join(heroesDir, f), 'utf8');
    const id = f.replace('.html', '');
    const navLinks = [...c.matchAll(/href="([^"]+\.html)"/g)]
        .map(m => m[1])
        .filter(h => !h.includes('index') && !h.includes('heroes.html') && !h.includes('calculator') && !h.includes('..'));

    for (const link of navLinks) {
        const target = path.join(heroesDir, link);
        if (!fs.existsSync(target)) {
            errors.push(`${id}: ссылка на несуществующий файл '${link}'`);
        }
    }
}

console.log('=== АУДИТ КАРТОЧЕК ГЕРОЕВ ===\n');
console.log(`Проверено файлов: ${files.length}`);
console.log(`Героев в hero-data.js: ${heroIds.length}\n`);

if (errors.length === 0) {
    console.log('✅ Ошибок нет');
} else {
    console.log(`❌ Ошибки (${errors.length}):`);
    errors.forEach(e => console.log('  ' + e));
}

if (warnings.length > 0) {
    console.log(`\n⚠️ Предупреждения (${warnings.length}):`);
    warnings.forEach(w => console.log('  ' + w));
}

console.log('\n=== СПИСОК ФАЙЛОВ ===');
files.sort().forEach(f => console.log('  ' + f));
