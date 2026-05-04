// check-item-icons.js — Проверка иконок предметов
// Запуск: node tools/check-item-icons.js

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(path.join(rootDir, 'images/items'))
    .filter(f => f.endsWith('.png'))
    .map(f => f.replace('.png', ''));

console.log('Иконок в папке:', files.length);

// Диапазон ID предметов (I000–I0KZ)
function generateIds() {
    const ids = [];
    for (let i = 0; i <= 0xFF; i++) {
        ids.push('I' + i.toString(16).toUpperCase().padStart(3, '0'));
    }
    return ids;
}

const allIds = generateIds();
const missing = allIds.filter(id => !files.includes(id));

console.log('Отсутствуют:', missing.length, 'иконок');
console.log(missing.join(', '));