#!/usr/bin/env node
/**
 * Чанк 3 §10 (DESIGN.md): синее семейство — тёмные подложки, рамки, светлые тексты,
 * информационный синий. Массовые замены по правилу RULES 2.3: идемпотентный скрипт
 * из scripts/tmp (вне git), проверка корня в начале, второй прогон даёт ноль замен.
 *
 * Замены (решения по контекстам зафиксированы в DESIGN.md §6 и SESSIONS):
 *  - подложки: #0b0e14 -> var(--text-ink) для color: / var(--bg-base) для фонов,
 *    #05070a -> var(--bg-deep), градиентные стопы 1a2330-семейства -> var(--bg-glow);
 *  - близнецы вливаются: rgba(10,14,20) -> --bg-rgb, rgba(5,8,14) -> --bg-deep-rgb,
 *    rgba(15,26,43) -> --surface-rgb, rgba(13,24,42) -> --backdrop-rgb,
 *    стопы #162433/#182530/#1a2230/#1c2230/#1a2430/#1e2030/#1e2230 -> --bg-glow-rgb,
 *    #d0e4ff -> --text-strong (сдвиг канала G на 4);
 *  - поверхности: #0f172a -> var(--surface-solid), rgba(15,23,42,a) -> rgba(var(--surface-rgb), a);
 *  - панели и подложки: rgba(18,25,40,a) -> rgba(var(--panel-rgb), a),
 *    rgba(10,20,40,a) -> rgba(var(--container-rgb), a),
 *    #0d1b2a -> var(--backdrop-solid), rgba(13,27,42,a) -> rgba(var(--backdrop-rgb), a);
 *  - рамки: #2a4060 -> var(--steel), #1a3050 -> var(--steel-deep);
 *  - информационный синий: #55aaff -> var(--info-blue), альфы на ступени шкалы
 *    0.267->0.2, 0.333->0.35, 0.4->0.35, 0.667->0.6 (те же ступени, что у циана);
 *  - светлые тексты: #d0e0ff/#d0e4ff -> var(--text-strong), #c0d0e8 -> var(--text-soft),
 *    точные совпадения #8aa0c0 -> var(--text-secondary), #5a7a9a -> var(--text-dim);
 *  - мёртвые фолбэки var(--surface-bg, rgba(13,27,42,0.6)) в map.css -> var(--surface-bg)
 *    (аналог TD-13: --surface-bg объявлен в :root, фолбэк не срабатывает никогда).
 *
 * Не трогает: all.css (пересобирается бандлом), repo-archive/, HTML-инлайн,
 * маркерные и брендовые синие карты (#4488ff, #88aacc, #5865f2), #0a1628 (текст
 * на ярких маркерах, контентная семантика), средние светлые тексты (#b0c8f0 и
 * прочие) и #1a2744/#0a1020 калькуляторов — остаток чанка 4.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
if (!readFileSync(path.join(ROOT, 'css/base.css'), 'utf8').includes('--cyan-rgb')) {
    console.error('Не тот корень: css/base.css не содержит --cyan-rgb. Запускать из корня репозитория.');
    process.exit(2);
}

const FILES = []
    .concat(readdirSync(path.join(ROOT, 'css')).filter(f => f.endsWith('.css') && f !== 'all.css').map(f => 'css/' + f))
    .concat(['aibot.css', 'map.css']);

// Строки-определения кастомных свойств не трогаем: там живут значения токенов.
const DEF_RE = /^\s*--[\w-]+\s*:/;

// Фиксированные замены. Порядок важен: hex8 раньше своего hex6-префикса.
const FIXED = [
    { f: 'var(--surface-bg, rgba(13, 27, 42, 0.6))', r: 'var(--surface-bg)', n: 'мёртвый фолбэк map' },
    { f: '#05070acc', r: 'rgba(var(--bg-deep-rgb), 0.8)', n: 'глубина a=0.8' },
    { f: '#05070a66', r: 'rgba(var(--bg-deep-rgb), 0.4)', n: 'глубина a=0.4' },
    { f: '#55aaff44', r: 'rgba(var(--info-rgb), 0.2)', n: 'инфо 0.267->0.2' },
    { f: '#55aaff55', r: 'rgba(var(--info-rgb), 0.35)', n: 'инфо 0.333->0.35' },
    { f: '#55aaff66', r: 'rgba(var(--info-rgb), 0.35)', n: 'инфо 0.4->0.35' },
    { f: '#55aaffaa', r: 'rgba(var(--info-rgb), 0.6)', n: 'инфо 0.667->0.6' },
    { f: '#55aaff', r: 'var(--info-blue)', n: 'инфо-акцент' },
    { f: '#d0e4ff', r: 'var(--text-strong)', n: 'текст близнец d0e4ff' },
    { f: '#d0e0ff', r: 'var(--text-strong)', n: 'текст strong' },
    { f: '#c0d0e8', r: 'var(--text-soft)', n: 'текст soft' },
    { f: '#8aa0c0', r: 'var(--text-secondary)', n: 'точное совпадение secondary' },
    { f: '#5a7a9a', r: 'var(--text-dim)', n: 'точное совпадение dim' },
    { f: '#0b0e14', r: 'CONTEXT', n: 'база/чернила' },
    { f: '#05070a', r: 'var(--bg-deep)', n: 'глубина' },
    { f: '#0f172a', r: 'var(--surface-solid)', n: 'поверхность сплошная' },
    { f: '#0d1b2a', r: 'var(--backdrop-solid)', n: 'подложка сплошная' },
    { f: '#162433', r: 'var(--bg-glow)', n: 'близнец свечения' },
    { f: '#182530', r: 'var(--bg-glow)', n: 'близнец свечения' },
    { f: '#1a2230', r: 'var(--bg-glow)', n: 'близнец свечения' },
    { f: '#1a2330', r: 'var(--bg-glow)', n: 'свечение базовое' },
    { f: '#1a2430', r: 'var(--bg-glow)', n: 'близнец свечения' },
    { f: '#1c2230', r: 'var(--bg-glow)', n: 'близнец свечения' },
    { f: '#1e2030', r: 'var(--bg-glow)', n: 'близнец свечения' },
    { f: '#1e2230', r: 'var(--bg-glow)', n: 'близнец свечения' },
    { f: '#2a4060', r: 'var(--steel)', n: 'стальная рамка' },
    { f: '#1a3050', r: 'var(--steel-deep)', n: 'рамка тёмная' },
];

// Regex-замены rgba с допуском пробелов. Альфа переносится дословно, кроме
// информационного синего: его альфы выравниваются на ступени шкалы.
const RGBX = [
    { re: /rgba\(\s*15,\s*23,\s*42,\s*([\d.]+)\s*\)/g, r: 'rgba(var(--surface-rgb), $1)', n: 'поверхность' },
    { re: /rgba\(\s*15,\s*26,\s*43,\s*([\d.]+)\s*\)/g, r: 'rgba(var(--surface-rgb), $1)', n: 'поверхность близнец' },
    { re: /rgba\(\s*18,\s*25,\s*40,\s*([\d.]+)\s*\)/g, r: 'rgba(var(--panel-rgb), $1)', n: 'панель' },
    { re: /rgba\(\s*10,\s*20,\s*40,\s*([\d.]+)\s*\)/g, r: 'rgba(var(--container-rgb), $1)', n: 'контейнер' },
    { re: /rgba\(\s*13,\s*27,\s*42,\s*([\d.]+)\s*\)/g, r: 'rgba(var(--backdrop-rgb), $1)', n: 'подложка' },
    { re: /rgba\(\s*13,\s*24,\s*42,\s*([\d.]+)\s*\)/g, r: 'rgba(var(--backdrop-rgb), $1)', n: 'подложка близнец' },
    { re: /rgba\(\s*10,\s*14,\s*20,\s*([\d.]+)\s*\)/g, r: 'rgba(var(--bg-rgb), $1)', n: 'база близнец' },
    { re: /rgba\(\s*5,\s*8,\s*14,\s*([\d.]+)\s*\)/g, r: 'rgba(var(--bg-deep-rgb), $1)', n: 'глубина близнец' },
    { re: /rgba\(\s*85,\s*170,\s*255,\s*([\d.]+)\s*\)/g, r: 'INFO', n: 'инфо альфа' },
];

function infoStep(a) {
    if (a < 0.3) return '0.2';
    if (a < 0.5) return '0.35';
    if (a < 0.75) return '0.6';
    return '0.9';
}

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
            let r = rule.r;
            if (r === 'CONTEXT') {
                r = /(^|[^-\w])color\s*:/.test(line) ? 'var(--text-ink)' : 'var(--bg-base)';
            }
            const parts = line.split(rule.f);
            bump(rule.n, parts.length - 1);
            fileTotal += parts.length - 1;
            line = parts.join(r);
        }
        for (const rule of RGBX) {
            const before = line;
            if (rule.r === 'INFO') {
                line = line.replace(rule.re, (m, a) => 'rgba(var(--info-rgb), ' + infoStep(parseFloat(a)) + ')');
            } else {
                line = line.replace(rule.re, rule.r);
            }
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
