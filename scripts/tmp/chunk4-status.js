#!/usr/bin/env node
/**
 * Чанк 4 §10 (DESIGN.md): статусные семейства — красный, оранж, золото,
 * зелёный, фиолет плюс остаток синего. Массовые замены по правилу RULES 2.3:
 * идемпотентный скрипт из scripts/tmp (вне git), проверка корня в начале,
 * второй прогон даёт ноль замен.
 *
 * Триплеты заведены в :root (base.css). Слияния и пороги:
 *  - близнецы: дельта каналов <= 4 (правило чанка 3): ff8c00 -> --orange-rgb (4),
 *    ffcc00 -> --gold-rgb (4), 1a2a40 -> --panel-raised (0,3,4), 0d1a2a -> --backdrop (0,1,0);
 *  - почти чёрные заливки (все каналы < 50): порог 8 — глаз не различает:
 *    0a0f1a/0a1018/0a0e18/0a1520/0d1520/091421 -> --abyss-rgb (10,16,32),
 *    0a1a2a/0d1a2a/0a1525 -> --backdrop-rgb (13,27,42), 0a1628 в info.css -> --abyss;
 *  - полупрозрачные заливки: сдвиг после альфы < 5: rgba(255,80,80,a) и
 *    rgba(255,82,82,a) -> rgba(var(--red-rgb), a), дельта 5 и 3;
 *  - тексты: ff7777 -> --danger-soft (дельта 12, разные страницы, проверка скрином),
 *    c0d0e0 -> --text-soft (дельта B 8);
 *  - альфа ступенями циановой шкалы 0.04/0.08/0.12/0.2/0.35/0.6/0.9, ближайшая,
 *    override 0.06->0.04 и 0.1->0.12 (чанк 2), альфа 0 сохранена.
 *
 * Не трогает: all.css (пересобирается бандлом), repo-archive/, HTML-инлайн,
 * контент карты (map.css: маркеры 4488ff/88aacc/44ff88/77ffaa/ff66aa/ffaa44,
 * текст на маркерах 0a1628 — примитив --backdrop перекрашивается темой),
 * брендовый 5865f2 (внешний бренд Discord), роли и пары из §5 с одиночными
 * значениями (ff6666, cc44ff, ffaa66, ff8844, ffcc00 роли... wait ffcc00 это
 * initiator — но значение совпадает с --gold-rgb, слияние документировано),
 * тёмные тонированные панели (2a0a0a, 1a0a2a и родня), Material-одиночки,
 * средние светлые тексты вне порога (b0c8f0, c0d4ff, b0c4de, 8ab4f0).
 *
 * Решение по маркерным и брендовым (§10 чанк 4): остаются контентными цветами,
 * токены не заводятся — карта красит сама себя (DESIGN.md §5/§6).
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
if (!readFileSync(path.join(ROOT, 'css/base.css'), 'utf8').includes('--red-rgb')) {
    console.error('Не тот корень: css/base.css не содержит --red-rgb. Запускать из корня репозитория.');
    process.exit(2);
}

const FILES = []
    .concat(readdirSync(path.join(ROOT, 'css')).filter(f => f.endsWith('.css') && f !== 'all.css').map(f => 'css/' + f))
    // корневые живые css: инфо-страница авто-лвл и бота, карта. info-auto-level.css
    // пропустил ещё чанк 3 — дог catching в чанке 4 (инвентарь его всегда видел).
    .concat(['aibot.css', 'map.css', 'info-auto-level.css']);

// Строки-определения кастомных свойств не трогаем: там живут значения токенов.
const DEF_RE = /^\s*--[\w-]+\s*:/;

// Шкала альфы чанка 2: ближайшая ступень, два override, ноль сохраняется.
const STEPS = [0.04, 0.08, 0.12, 0.2, 0.35, 0.6, 0.9];
const OVERRIDE = { '0.06': 0.04, '0.1': 0.12 };
function toStep(a) {
    if (a === 0) return '0';
    if (a >= 1) return '1';
    if (OVERRIDE[a] !== undefined) return String(OVERRIDE[a]);
    let best = STEPS[0];
    for (const s of STEPS) if (Math.abs(s - a) < Math.abs(best - a)) best = s;
    return String(best);
}

// Фиксированные замены. Порядок важен: hex8 раньше своего hex6-префикса.
const FIXED = [
    // красный: альфы hex8
    { f: '#ff555544', r: 'rgba(var(--red-rgb), 0.2)', n: 'красный a=0.267->0.2' },
    { f: '#ff555588', r: 'rgba(var(--red-rgb), 0.6)', n: 'красный a=0.533->0.6' },
    { f: '#ff555522', r: 'rgba(var(--red-rgb), 0.12)', n: 'красный a=0.133->0.12' },
    { f: '#ff5555aa', r: 'rgba(var(--red-rgb), 0.6)', n: 'красный a=0.667->0.6' },
    { f: '#ff555555', r: 'rgba(var(--red-rgb), 0.35)', n: 'красный a=0.333->0.35' },
    { f: '#ff555566', r: 'rgba(var(--red-rgb), 0.35)', n: 'красный a=0.4->0.35' },
    { f: '#ff555533', r: 'rgba(var(--red-rgb), 0.2)', n: 'красный a=0.2' },
    { f: '#ff555510', r: 'rgba(var(--red-rgb), 0.08)', n: 'красный a=0.063->0.08' },
    { f: '#ff5555', r: 'var(--danger)', n: 'опасность база' },
    { f: '#ff5252', r: 'var(--danger)', n: 'красный близнец runes (3)' },
    { f: '#ff444488', r: 'rgba(var(--red-deep-rgb), 0.6)', n: 'глубокий a=0.533->0.6' },
    { f: '#ff444444', r: 'rgba(var(--red-deep-rgb), 0.2)', n: 'глубокий a=0.267->0.2' },
    { f: '#ff444422', r: 'rgba(var(--red-deep-rgb), 0.12)', n: 'глубокий a=0.133->0.12' },
    { f: '#ff4444', r: 'var(--danger-deep)', n: 'опасность глубокий' },
    { f: '#ff6b6b66', r: 'rgba(var(--red-soft-rgb), 0.35)', n: 'мягкий a=0.4->0.35' },
    { f: '#ff6b6b88', r: 'rgba(var(--red-soft-rgb), 0.6)', n: 'мягкий a=0.533->0.6' },
    { f: '#ff6b6b', r: 'var(--danger-soft)', n: 'опасность мягкий' },
    { f: '#ff7777', r: 'var(--danger-soft)', n: 'мягкий слив ff7777 (12)' },
    // оранж
    { f: '#ff880066', r: 'rgba(var(--orange-rgb), 0.35)', n: 'оранж a=0.4->0.35' },
    { f: '#ff8800aa', r: 'rgba(var(--orange-rgb), 0.6)', n: 'оранж a=0.667->0.6' },
    { f: '#ff880044', r: 'rgba(var(--orange-rgb), 0.2)', n: 'оранж a=0.267->0.2' },
    { f: '#ff880055', r: 'rgba(var(--orange-rgb), 0.35)', n: 'оранж a=0.333->0.35' },
    { f: '#ff8800', r: 'var(--warning)', n: 'предупреждение' },
    { f: '#ff8c0044', r: 'rgba(var(--orange-rgb), 0.2)', n: 'оранж близнец a=0.267->0.2' },
    { f: '#ff8c0088', r: 'rgba(var(--orange-rgb), 0.6)', n: 'оранж близнец a=0.533->0.6' },
    { f: '#ff8c00aa', r: 'rgba(var(--orange-rgb), 0.6)', n: 'оранж близнец a=0.667->0.6' },
    { f: '#ff8c0066', r: 'rgba(var(--orange-rgb), 0.35)', n: 'оранж близнец a=0.4->0.35' },
    { f: '#ff8c0022', r: 'rgba(var(--orange-rgb), 0.12)', n: 'оранж близнец a=0.133->0.12' },
    { f: '#ff8c00', r: 'var(--warning)', n: 'оранж близнец ff8c00 (4)' },
    { f: '#ff994444', r: 'rgba(var(--orange-soft-rgb), 0.2)', n: 'оранж мягкий a=0.267->0.2' },
    { f: '#ff994466', r: 'rgba(var(--orange-soft-rgb), 0.35)', n: 'оранж мягкий a=0.4->0.35' },
    { f: '#ff9944', r: 'var(--warning-soft)', n: 'предупреждение мягкий' },
    // золото
    { f: '#ffc80044', r: 'rgba(var(--gold-rgb), 0.2)', n: 'золото a=0.267->0.2' },
    { f: '#ffc800', r: 'var(--gold)', n: 'золото база' },
    { f: '#ffcc00', r: 'var(--gold)', n: 'золото близнец ffcc00 (4)' },
    { f: '#ffd700', r: 'var(--gold-bright)', n: 'золото яркий' },
    { f: '#ffd96666', r: 'rgba(var(--gold-soft-rgb), 0.35)', n: 'золото мягкий a=0.4->0.35' },
    { f: '#ffd966aa', r: 'rgba(var(--gold-soft-rgb), 0.6)', n: 'золото мягкий a=0.667->0.6' },
    { f: '#ffd966', r: 'var(--gold-soft)', n: 'золото мягкий' },
    { f: '#ffc107', r: 'var(--amber)', n: 'янтарь WIP' },
    { f: '#aaaa4444', r: 'rgba(var(--gold-dim-rgb), 0.2)', n: 'золото тусклое a=0.267->0.2' },
    { f: '#aaaa44', r: 'var(--gold-dim)', n: 'золото тусклое' },
    // фиолет
    { f: '#bf7fff44', r: 'rgba(var(--violet-rgb), 0.2)', n: 'магия a=0.267->0.2' },
    { f: '#bf7fffaa', r: 'rgba(var(--violet-rgb), 0.6)', n: 'магия a=0.667->0.6' },
    { f: '#bf7fff66', r: 'rgba(var(--violet-rgb), 0.35)', n: 'магия a=0.4->0.35' },
    { f: '#bf7fff88', r: 'rgba(var(--violet-rgb), 0.6)', n: 'магия a=0.533->0.6' },
    { f: '#bf7fff22', r: 'rgba(var(--violet-rgb), 0.12)', n: 'магия a=0.133->0.12' },
    { f: '#bf7fff55', r: 'rgba(var(--violet-rgb), 0.35)', n: 'магия a=0.333->0.35' },
    { f: '#bf7fff10', r: 'rgba(var(--violet-rgb), 0.08)', n: 'магия a=0.063->0.08' },
    { f: '#bf7fff15', r: 'rgba(var(--violet-rgb), 0.08)', n: 'магия a=0.082->0.08' },
    { f: '#bf7fff', r: 'var(--magic)', n: 'магия база' },
    // зелёные
    { f: '#55ff8844', r: 'rgba(var(--green-rgb), 0.2)', n: 'позитив a=0.267->0.2' },
    { f: '#55ff8833', r: 'rgba(var(--green-rgb), 0.2)', n: 'позитив a=0.2' },
    { f: '#55ff88', r: 'var(--success)', n: 'позитив база' },
    { f: '#00ff8866', r: 'rgba(var(--mint-rgb), 0.35)', n: 'мята a=0.4->0.35' },
    { f: '#00ff8844', r: 'rgba(var(--mint-rgb), 0.2)', n: 'мята a=0.267->0.2' },
    { f: '#00ff88aa', r: 'rgba(var(--mint-rgb), 0.6)', n: 'мята a=0.667->0.6' },
    { f: '#00ff8888', r: 'rgba(var(--mint-rgb), 0.6)', n: 'мята a=0.533->0.6' },
    { f: '#00ff8822', r: 'rgba(var(--mint-rgb), 0.12)', n: 'мята a=0.133->0.12' },
    { f: '#00ff88', r: 'var(--mint)', n: 'мята база' },
    { f: '#00cc6644', r: 'rgba(var(--mint-deep-rgb), 0.2)', n: 'мята глубокая a=0.267->0.2' },
    { f: '#00cc66', r: 'var(--mint-deep)', n: 'мята глубокая (старт кнопки)' },
    { f: '#00ffaa55', r: 'rgba(var(--spring-rgb), 0.35)', n: 'сприн a=0.333->0.35' },
    { f: '#00ffaaaa', r: 'rgba(var(--spring-rgb), 0.6)', n: 'сприн a=0.667->0.6' },
    { f: '#00ffaa44', r: 'rgba(var(--spring-rgb), 0.2)', n: 'сприн a=0.267->0.2' },
    { f: '#00ffaa', r: 'var(--spring)', n: 'сприн база' },
    { f: '#55ff55aa', r: 'rgba(var(--agility-rgb), 0.6)', n: 'ловкость a=0.667->0.6' },
    { f: '#55ff5544', r: 'rgba(var(--agility-rgb), 0.2)', n: 'ловкость a=0.267->0.2' },
    { f: '#55ff5555', r: 'rgba(var(--agility-rgb), 0.35)', n: 'ловкость a=0.333->0.35' },
    { f: '#55ff5566', r: 'rgba(var(--agility-rgb), 0.35)', n: 'ловкость a=0.4->0.35' },
    { f: '#55ff55', r: 'var(--agility)', n: 'ловкость база' },
    { f: '#4caf50', r: 'var(--green-muted)', n: 'зелёный приглушённый' },
    // синий остаток: окружение
    { f: '#2a5070', r: 'var(--steel-blue)', n: 'сталь синяя' },
    { f: '#1a2744', r: 'var(--panel-raised)', n: 'панель приподнятая' },
    { f: '#1a2a40', r: 'var(--panel-raised)', n: 'панель близнец (0,3,4)' },
    { f: '#0a1020', r: 'var(--abyss)', n: 'бездна' },
    { f: '#0a0f1a', r: 'var(--abyss)', n: 'близнец бездны (0,1,6)' },
    { f: '#0a1018', r: 'var(--abyss)', n: 'близнец бездны (0,0,8)' },
    { f: '#0a0e18', r: 'var(--abyss)', n: 'близнец бездны (0,2,8)' },
    { f: '#0a1520', r: 'var(--abyss)', n: 'близнец бездны (0,5,0)' },
    { f: '#0d1520', r: 'var(--abyss)', n: 'близнец бездны (3,5,0)' },
    { f: '#091421', r: 'var(--abyss)', n: 'близнец бездны (1,4,1)' },
    { f: '#0a1a2a', r: 'var(--backdrop)', n: 'подложка близнец (3,1,0)' },
    { f: '#0d1a2a', r: 'var(--backdrop)', n: 'подложка близнец (0,1,0)' },
    { f: '#0a1525', r: 'var(--backdrop)', n: 'подложка близнец (3,6,5)' },
    { f: '#c0d0e0', r: 'var(--text-soft)', n: 'текст soft слив (8)' },
];

// rgba-замены с допуском пробелов, альфа на ступень шкалы. tok — имя примитива без "-rgb".
const RGBX = [
    { re: /rgba\(\s*255,\s*85,\s*85,\s*([\d.]+)\s*\)/g, tok: 'red', n: 'красный альфа' },
    { re: /rgba\(\s*255,\s*80,\s*80,\s*([\d.]+)\s*\)/g, tok: 'red', n: 'красный альфа слив 80 (5)' },
    { re: /rgba\(\s*255,\s*82,\s*82,\s*([\d.]+)\s*\)/g, tok: 'red', n: 'красный альфа слив 82 (3)' },
    { re: /rgba\(\s*255,\s*68,\s*68,\s*([\d.]+)\s*\)/g, tok: 'red-deep', n: 'глубокий альфа' },
    { re: /rgba\(\s*255,\s*107,\s*107,\s*([\d.]+)\s*\)/g, tok: 'red-soft', n: 'мягкий альфа' },
    { re: /rgba\(\s*255,\s*119,\s*119,\s*([\d.]+)\s*\)/g, tok: 'red-soft', n: 'мягкий альфа слив 119' },
    { re: /rgba\(\s*255,\s*153,\s*68,\s*([\d.]+)\s*\)/g, tok: 'orange-soft', n: 'оранж мягкий альфа' },
    { re: /rgba\(\s*255,\s*200,\s*0,\s*([\d.]+)\s*\)/g, tok: 'gold', n: 'золото альфа' },
    { re: /rgba\(\s*255,\s*215,\s*0,\s*([\d.]+)\s*\)/g, tok: 'gold-bright', n: 'золото яркий альфа' },
    { re: /rgba\(\s*255,\s*193,\s*7,\s*([\d.]+)\s*\)/g, tok: 'amber', n: 'янтарь альфа' },
    { re: /rgba\(\s*170,\s*170,\s*68,\s*([\d.]+)\s*\)/g, tok: 'gold-dim', n: 'золото тусклое альфа' },
    { re: /rgba\(\s*191,\s*127,\s*255,\s*([\d.]+)\s*\)/g, tok: 'violet', n: 'магия альфа' },
    { re: /rgba\(\s*85,\s*255,\s*136,\s*([\d.]+)\s*\)/g, tok: 'green', n: 'позитив альфа' },
    { re: /rgba\(\s*0,\s*255,\s*136,\s*([\d.]+)\s*\)/g, tok: 'mint', n: 'мята альфа' },
    { re: /rgba\(\s*76,\s*175,\s*80,\s*([\d.]+)\s*\)/g, tok: 'green-muted', n: 'зелёный приглушённый альфа' },
    { re: /rgba\(\s*9,\s*15,\s*28,\s*([\d.]+)\s*\)/g, tok: 'abyss', n: 'бездна альфа (1,1,4)' },
    { re: /rgba\(\s*13,\s*22,\s*36,\s*([\d.]+)\s*\)/g, tok: 'backdrop', n: 'подложка альфа (0,5,6)' },
];

// Контекстные замены: 0a1628 — фон-градиент info.css уходит в --abyss,
// в map.css тот же литерал это цвет текста на маркерах — контент, не трогаем.
const CONTEXTUAL = [
    { f: '#0a1628', r: 'var(--abyss)', files: ['css/info.css'], n: 'бездна инфо-градиент (0,6,8)' },
];

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
        let line = lines[i];
        for (const rule of FIXED) {
            if (!line.includes(rule.f)) continue;
            const parts = line.split(rule.f);
            bump(rule.n, parts.length - 1);
            fileTotal += parts.length - 1;
            line = parts.join(rule.r);
        }
        for (const rule of CONTEXTUAL) {
            if (!rule.files.includes(rel) || !line.includes(rule.f)) continue;
            const parts = line.split(rule.f);
            bump(rule.n, parts.length - 1);
            fileTotal += parts.length - 1;
            line = parts.join(rule.r);
        }
        for (const rule of RGBX) {
            const before = line;
            line = line.replace(rule.re, (m, a) =>
                'rgba(var(--' + rule.tok + '-rgb), ' + toStep(parseFloat(a)) + ')');
            if (line !== before) {
                const reCount = new RegExp(rule.re.source, 'g');
                const m = before.match(reCount);
                const c = m ? m.length : 0;
                bump(rule.n, c);
                fileTotal += c;
            }
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
