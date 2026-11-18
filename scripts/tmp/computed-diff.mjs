#!/usr/bin/env node
/**
 * Сверка computed-значений до/после чанка (ритуал §10).
 * Запуск: node scripts/tmp/computed-diff.mjs /tmp/computed-before.json /tmp/computed-after.json
 */
import { readFileSync } from 'node:fs';

const [beforeFile, afterFile] = process.argv.slice(2);
if (!beforeFile || !afterFile) {
    console.error('Нужны два файла: до и после.');
    process.exit(2);
}
const before = JSON.parse(readFileSync(beforeFile, 'utf8'));
const after = JSON.parse(readFileSync(afterFile, 'utf8'));

let totalPairs = 0;
for (const page of Object.keys(before)) {
    if (!after[page]) { console.log(page + ': НЕТ В ПОСЛЕ'); continue; }
    const b = new Set(before[page]);
    const a = new Set(after[page]);
    const removed = before[page].filter(v => !a.has(v));
    const added = after[page].filter(v => !b.has(v));
    if (!removed.length && !added.length) continue;
    console.log('\n=== ' + page + ': -' + removed.length + ' +' + added.length + ' ===');
    const max = Math.max(removed.length, added.length);
    for (let i = 0; i < max; i++) {
        const r = removed[i] || '—';
        const ad = added[i] || '—';
        // сокращаем: boxShadow/textShadow длинные — показываем целиком, они главные свидетели
        console.log('  - ' + r);
        if (ad !== '—') console.log('  + ' + ad);
        totalPairs++;
    }
}
console.log('\nСтрок различий: ' + totalPairs);
