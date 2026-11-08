#!/usr/bin/env node
/**
 * fix-manifesto-public.mjs — решения владельца от 09.11:
 *
 * 1. На публичных страницах НЕ показывать технические метрики разработки
 *    (коммиты, страницы, логи, кухня) — «количество часов и строк кода не
 *    доказывает ценность; чужой опыт для таких людей не значит ничего».
 *    Наружу — только метрики продукта (то, что игрок видит).
 * 2. Ссылку на репозиторий с публичной страницы убрать (не приглашение
 *    на открытый исходник).
 * 3. Тон секций сохранить, фактуру — человеческую (провалы, ночи, возврат),
 *    без цифр разработки.
 *
 * Идемпотентен. Запуск из корня репо.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
if (!readFileSync(join(ROOT, 'manifesto.html'), 'utf8').includes('Манифест')) {
    throw new Error('ROOT не похож на репо: запусти из корня репо');
}
const p = (...s) => join(ROOT, ...s);
const read = f => readFileSync(p(f), 'utf8');
const write = (f, t) => { writeFileSync(p(f), t); console.log('OK', f, t.length, 'байт'); };

let m = read('manifesto.html');
let edits = 0;
const replace = (from, to, label) => {
    if (!m.includes(from)) { console.log('SKIP (нет маркера):', label); return; }
    m = m.replace(from, to);
    edits++;
    console.log('OK:', label);
};

/* 1. hero-sub: без «цифры вместо обещаний» */
replace(
    'Карта, сайт и лор Legend of Worlds — это один автор и его свободное время. Ниже — цифры вместо обещаний.',
    'Карта, сайт и лор Legend of Worlds — это один автор и его свободное время. Эта страница — о том, зачем проект существует.',
    'hero-sub'
);

/* 2. stat-сетка: только продукт (коммиты и страницы — убрать) */
replace(
`            <div class="mf-stats">
                <div class="mf-stat"><span class="mf-stat-num">31</span><span class="mf-stat-cap">версия карты</span></div>
                <div class="mf-stat"><span class="mf-stat-num">350</span><span class="mf-stat-cap">коммитов за полгода</span></div>
                <div class="mf-stat"><span class="mf-stat-num">116</span><span class="mf-stat-cap">страниц руками</span></div>
                <div class="mf-stat"><span class="mf-stat-num">74</span><span class="mf-stat-cap">героя</span></div>
                <div class="mf-stat"><span class="mf-stat-num">222</span><span class="mf-stat-cap">предмета</span></div>
                <div class="mf-stat"><span class="mf-stat-num">408</span><span class="mf-stat-cap">стадий ИИ</span></div>
            </div>`,
`            <div class="mf-stats">
                <div class="mf-stat"><span class="mf-stat-num">31</span><span class="mf-stat-cap">версия карты</span></div>
                <div class="mf-stat"><span class="mf-stat-num">74</span><span class="mf-stat-cap">героя</span></div>
                <div class="mf-stat"><span class="mf-stat-num">222</span><span class="mf-stat-cap">предмета</span></div>
                <div class="mf-stat"><span class="mf-stat-num">408</span><span class="mf-stat-cap">стадий ИИ</span></div>
                <div class="mf-stat"><span class="mf-stat-num">9</span><span class="mf-stat-cap">режимов игры</span></div>
                <div class="mf-stat"><span class="mf-stat-num">16</span><span class="mf-stat-cap">рун на арене</span></div>
            </div>`,
    'stat-сетка → продукт'
);

/* 3. «Как это делалось»: человеческая история без метрик разработки */
const HOW_OLD_START = '        <!-- Как это делалось -->';
const HOW_NEW = `        <!-- Как это делалось -->
        <div class="info-section mf-section">
            <h2 class="section-title"><i class="fas fa-code-branch"></i> Как это делалось</h2>
            <p class="info-text">
                Карта старше сайта. В архиве обновлений 31 версия, от v3.0 до v6.9. Что было до неё, я уже толком не помню, и записано было далеко не всё.
            </p>
            <p class="info-text">
                Сайт появился 2 мая 2026, без плана — просто чтобы был. Дальше был поток: герои, предметы, калькуляторы, страницы. Без пауз и выходных.
            </p>
            <p class="info-text">
                Почти всё это сделано ночью. Не потому что романтика — потому что другое время взять неоткуда.
            </p>
            <p class="info-text">
                Потом был месяц, когда я не сделал ничего. Не планировал перерыв и никуда не уезжал — просто однажды открыл проект, посмотрел на него и закрыл. Возвращался рывками, через силу. Сейчас доделываю то, что сам же бросил.
            </p>
        </div>
`;
const HOW_OLD_END = '        <!-- Зачем -->';
const a = m.indexOf(HOW_OLD_START);
const b = m.indexOf(HOW_OLD_END);
if (a !== -1 && b !== -1 && b > a) {
    m = m.slice(0, a) + HOW_NEW + m.slice(b);
    edits++;
    console.log('OK: секция «Как это делалось» переписана без метрик разработки');
} else {
    console.log('SKIP: секция «Как это делалось» не найдена');
}

/* 4. «Если ты пришёл критиковать»: без ссылки на репозиторий */
const CRIT_OLD_START = '        <!-- Если ты пришёл критиковать -->';
const CRIT_OLD_END = '        <p class="mf-final">';
const CRIT_NEW = `        <!-- Если ты пришёл критиковать -->
        <div class="info-section mf-section">
            <h2 class="section-title"><i class="fas fa-shield-alt"></i> Если ты пришёл критиковать</h2>
            <p class="info-text">
                Я готов обсуждать конкретные ошибки, недостатки, коммерческую состоятельность, распределение внимания между картой и сайтом, отсутствие дистрибуции. Это содержательно. На это есть ответ.
            </p>
            <p class="info-text">
                Но если критика идёт через «нахуй это надо», сравнение с чужим успехом без анализа контекста, сведение ценности к одной метрике, обесценивание мотивации или переход на личность — это форма, а не содержание. Внутри такой формы нет предмета для разбора, есть проекция. Содержание в такой форме вторично: отвечая на него, ты соглашаешься с формой.
            </p>
            <p class="info-text">
                Количество часов и объём работы ценность не доказывают — я это знаю лучше многих. Доказательства, которые нельзя прожить со стороны, в споре не работают. Поэтому здесь их нет. Есть продукт, и его можно просто открыть и посмотреть.
            </p>
        </div>

`;
const c = m.indexOf(CRIT_OLD_START);
const d = m.indexOf(CRIT_OLD_END);
if (c !== -1 && d !== -1 && d > c) {
    m = m.slice(0, c) + CRIT_NEW + m.slice(d);
    edits++;
    console.log('OK: секция «Если ты пришёл критиковать» переписана без ссылки на репо');
} else {
    console.log('SKIP: секция «Если ты пришёл критиковать» не найдена');
}

/* 5. Контроль: в манифесте не должно остаться технических метрик и ссылки на репо */
const bad = ['коммит', 'страниц рук', '4093', 'футер', 'ARGUMENT-FALLACIES', 'github.com/DarkDaro'];
const left = bad.filter(w => m.toLowerCase().includes(w.toLowerCase()));
console.log(left.length ? 'ОСТАЛОСЬ (проверить): ' + left.join(', ') : 'ЧИСТО: технических метрик и ссылки на репо нет');

write('manifesto.html', m);
console.log('Правок применено:', edits);
