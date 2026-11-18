#!/usr/bin/env node
/**
 * Чанк 5 §10 (DESIGN.md): сводка blur-ступеней стекломорфизма (TECH-DEBT TD-8).
 * До чанка живые ступени: 8px x24 (контейнеры, шапки, панели), 12px x4 (карточки,
 * уже токен --surface-blur), 6px x4 (bottom sheet предметов, галерея), 16px x2
 * (панель детали предмета), 4px x1 (поиск). Девять упоминаний 1px — условия
 * @supports not (backdrop-filter: blur(1px)), не ступени.
 *
 * Шкала из двух значений (решение чанка 5):
 *  --surface-blur: 12px      — карточки и сильное стекло, сюда вливается 16px;
 *  --surface-blur-soft: 8px  — контейнеры и точечные поверхности, сюда вливаются 6px и 4px.
 * Дельта влитий 2–4px на полупрозрачном стекле над тёмным фоном глазом не различима,
 * проверка скринами 1280/390. Идемпотентный скрипт по правилу RULES 2.3, второй
 * прогон даёт ноль замен. Не трогает: all.css (бандл), repo-archive/, HTML-инлайн,
 * мобильное отключение blur в search.css (@media 768), условия @supports.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
if (!readFileSync(path.join(ROOT, 'css/base.css'), 'utf8').includes('--surface-blur-soft')) {
    console.error('Не тот корень: css/base.css не содержит --surface-blur-soft. Запускать из корня репозитория.');
    process.exit(2);
}

const FILES = []
    .concat(readdirSync(path.join(ROOT, 'css')).filter(f => f.endsWith('.css') && f !== 'all.css').map(f => 'css/' + f))
    .concat(['aibot.css', 'map.css', 'info-auto-level.css']);

const DEF_RE = /^\s*--[\w-]+\s*:/;

// ступень -> токен. 8px и влитые 6/4px на мягкую, 16px и живые 12px на сильную.
const TO_TOKEN = { '8': 'soft', '6': 'soft', '4': 'soft', '16': 'main', '12': 'main' };
const TOKEN_NAME = { soft: 'var(--surface-blur-soft)', main: 'var(--surface-blur)' };

const RE = /backdrop-filter:\s*blur\((\d+(?:\.\d+)?)px\)/g;

const counts = new Map();
function bump(n, k) { counts.set(n, (counts.get(n) || 0) + k); }

let total = 0;
for (const rel of FILES) {
    const p = path.join(ROOT, rel);
    const src = readFileSync(p, 'utf8');
    const lines = src.split('\n');
    let fileTotal = 0;
    for (let i = 0; i < lines.length; i++) {
        if (DEF_RE.test(lines[i])) continue;
        if (lines[i].includes('@supports')) continue; // запрос blur(1px) — не ступень
        let line = lines[i];
        const before = line;
        line = line.replace(RE, (m, px) => {
            const tok = TO_TOKEN[px];
            if (!tok) return m; // 1px и прочие незаводские значения не трогаем
            return 'backdrop-filter: blur(' + TOKEN_NAME[tok] + ')';
        });
        if (line !== before) {
            const c = (before.match(new RegExp(RE.source, 'g')) || []).length;
            for (const m of before.matchAll(new RegExp(RE.source, 'g'))) {
                bump('blur(' + m[1] + 'px) -> ' + (TO_TOKEN[m[1]] === 'soft' ? '--surface-blur-soft' : '--surface-blur'), 1);
            }
            fileTotal += c;
        }
        lines[i] = line;
    }
    if (fileTotal > 0) {
        writeFileSync(p, lines.join('\n'));
        total += fileTotal;
        console.log(rel + ': ' + fileTotal);
    }
}

console.log('---');
for (const [n, c] of [...counts.entries()].sort()) console.log(n + ': ' + c);
console.log('ВСЕГО ЗАМЕН: ' + total);
