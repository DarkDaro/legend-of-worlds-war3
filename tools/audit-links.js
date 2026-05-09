const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const heroFiles = fs.readdirSync(path.join(root, 'heroes')).filter(f => f.endsWith('.html'));

let broken = [];
let checked = 0;

function resolveLink(baseFile, href) {
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('javascript') || href.startsWith('mailto')) return null;
    // Убрать query params
    href = href.split('?')[0].split('#')[0];
    if (!href) return null;

    let baseDir = path.dirname(baseFile);
    let target = path.resolve(baseDir, href);

    // Проверка существования
    return fs.existsSync(target) ? null : path.relative(root, target);
}

// Проверка корневых HTML
files.forEach(f => {
    const c = fs.readFileSync(path.join(root, f), 'utf8');
    const links = [...c.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    links.forEach(href => {
        const missing = resolveLink(path.join(root, f), href);
        if (missing) broken.push(`${f} → ${href} (не найден: ${missing})`);
        checked++;
    });
});

// Проверка hero HTML
heroFiles.forEach(f => {
    const c = fs.readFileSync(path.join(root, 'heroes', f), 'utf8');
    const links = [...c.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    links.forEach(href => {
        const missing = resolveLink(path.join(root, 'heroes', f), href);
        if (missing) broken.push(`heroes/${f} → ${href} (не найден: ${missing})`);
        checked++;
    });
});

console.log(`Проверено ссылок: ${checked}`);
console.log(`Битых: ${broken.length}`);
if (broken.length) {
    broken.forEach(b => console.log('  ' + b));
} else {
    console.log('✅ Все ссылки работают');
}
