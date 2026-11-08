#!/usr/bin/env node
/* 09.11: faq — «страница выглядит жалко и не убедительно».
   1) 14 ответов переписаны развёрнуто (факты карты: 408 стадий/19 групп, 31 версия,
      8 боссов, 9 режимов, константа брони 0.05 и т.д.) + перекрёстные ссылки.
   2) JSON-LD FAQPage синхронизирован: было 12 вопросов из 14, стало 14.
   3) Внизу один ряд из 4 одинаковых кнопок .calc-link-btn (было два разных стиля).
   4) css/faq.css: укрупнение катов/ответов, max-height 500→1200px.
   Идемпотентный: повторный запуск даёт то же содержимое. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

const ROOT = process.cwd();
if (!existsSync(path.join(ROOT, 'faq.html')) || !existsSync(path.join(ROOT, 'scripts', 'check-links.mjs'))) {
    console.error('ROOT не похож на репо:', ROOT);
    process.exit(1);
}
const FILE = path.join(ROOT, 'faq.html');
const CSS = path.join(ROOT, 'css', 'faq.css');

let html = await readFile(FILE, 'utf8');
const before = html.length;

/* ---------- JSON-LD (14 вопросов, plain text) ---------- */
const J = (name, text) => `    {\n      "@type": "Question",\n      "name": "${name}",\n      "acceptedAnswer": {\n        "@type": "Answer",\n        "text": "${text}"\n      }\n    }`;

const JSONLD_ITEMS = [
    J('Как установить карту?', 'Скачайте файл карты (.w3x) и поместите его в папку Documents/Warcraft III/Maps/. Если папки нет, создайте её. После этого карта появится в списке кастомных игр. Карта рассчитана на Warcraft III 1.26a; актуальная версия — v6.9, всего в архиве 31 версия, с v3.0 до v6.9.'),
    J('Карта не отображается в списке. Что делать?', 'Проверьте по порядку: файл лежит в Documents/Warcraft III/Maps/ и имеет расширение .w3x; версия игры подходит карте; файл скачался целиком и не повреждён. Некоторые версии патча меняют расположение папки карт. После перемещения файла перезапустите игру. Если у вас карта видна, а у других в лобби нет — файл должен быть как минимум у хоста.'),
    J('Как играть с ботами?', 'Создайте лобби с картой и добавьте компьютерных игроков в свободные слоты. Закупка и поведение у ботов встроены: они сами выбирают героев, качают способности, фармят и покупают предметы по 408 стадиям закупки в 19 группах.'),
    J('Какие клавиши у способностей?', 'Воинская способность на F, основные на Q, W, E, ультимейт на R. Прокачивать вручную не нужно: способности растут вместе с уровнем героя. Таблица автопрокачки — на странице информации.'),
    J('Как выбрать режимы перед игрой?', 'Режимы выбирает хост до старта матча в ящике на базе. Всего в карте 9 режимов — от классической арены до хаоса и случайного героя; есть режим боссов, турбо, бан героев, потеря золота.'),
    J('Как работает автосборка в 1 клик?', 'Нажмите кнопку сборки — герой сам продаст устаревшие предметы, докупит нужные для текущей стадии и перейдёт к следующей по уровню. Стадии с босс-предметами доступны только при включённом режиме боссов. Ту же логику можно просчитать в калькуляторе сборок на сайте.'),
    J('Что такое Скипетр Владыки?', 'Предмет, усиливающий ультимейт каждого героя. Эффект индивидуальный: от дополнительного урона до шанса мгновенной перезарядки. Точный эффект скипетра смотрите в карточке героя.'),
    J('Как считается броня и защита?', 'Защита = базовая + ловкость × 0.05. Снижение урона: (Защита × 0.05) / (1 + Защита × 0.05). Константа карты 0.05, а не стандартные 0.06 — каждая единица защиты даёт меньше снижения, чем в обычном WC3. Посчитать можно в калькуляторе брони на сайте.'),
    J('Как работает удача?', 'Удача увеличивает шанс срабатывания случайных эффектов (крит, оглушение, уклонение). Формула нелинейная: Итог = Базовый% + Удача × (1 − Базовый% / 100). Чем выше базовый шанс, тем меньше прибавка. Все источники удачи складываются.'),
    J('Когда появляются боссы?', 'Боссы появляются в специальном режиме боссов. В карте 8 боссов: у каждого свои стадии HP, способности и таблица дропа с шансами. Таймеры спавна и условия — в карточках боссов на странице монстров.'),
    J('В чём разница между физическим и магическим вампиризмом?', 'Физический вампиризм восстанавливает здоровье от автоатак, несколько источников складываются мультипликативно. Магический восстанавливает здоровье от заклинаний и работает только со способностями.'),
    J('Откуда данные на сайте?', 'Все данные взяты напрямую из карты Legend of Worlds авторства DarkDaro: статы 74 героев, 222 предмета, формулы, режимы, боссы и крипы. Данные соответствуют актуальной версии карты и обновляются вместе с ней.'),
    J('Как сообщить о баге?', 'Напишите автору на legendofworldswarcraft@gmail.com или через страницу информации. Укажите: где воспроизводится (сайт или карта), героя, предмет или механику, что сделали и что произошло вместо ожидаемого.'),
    J('Как предложить героя или механику?', 'Идеи принимаются через сообщество карты: группа ВКонтакте, Telegram, Discord — ссылки на странице поддержки. Предложение с конкретикой разбирается быстрее, чем идея в одно предложение.')
].join(',\n');

const NEW_JSONLD = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${JSONLD_ITEMS}
  ]
}
</script>`;

/* ---------- Ответы (HTML) ---------- */
const A = (body, links = []) => `${body}${links.map(([href, label]) => `\n                    <div class="faq-link"><i class="fas fa-arrow-right"></i> <a href="${href}">${label}</a></div>`).join('')}`;

const ITEMS = {
    install: A('Скачайте файл карты (<code>.w3x</code>) и поместите его в папку <code>Documents/Warcraft III/Maps/</code>. Если папки нет, создайте её. После этого карта появится в списке кастомных игр.\n                    Карта рассчитана на Warcraft III 1.26a. Актуальная версия — v6.9, всего в архиве 31 версия, с v3.0 до v6.9: вся история изменений собрана в архиве обновлений.', [['updates.html', 'Архив обновлений: версии и изменения'], ['info.html', 'Страница информации']]),
    missing: A('Проверьте по порядку: файл лежит в <code>Documents/Warcraft III/Maps/</code> и имеет расширение <code>.w3x</code>; версия игры подходит карте; файл скачался целиком и не повреждён. Некоторые версии патча меняют расположение папки карт — если обновляли игру, папку стоит проверить заново. После перемещения файла перезапустите игру. Если у вас карта видна, а у других игроков в лобби нет — файл должен быть как минимум у хоста.'),
    bots: A('Создайте лобби с картой и добавьте компьютерных игроков в свободные слоты. Закупка и поведение у ботов встроены: они сами выбирают героев, качают способности, фармят и покупают предметы по стадиям — вся закупка ботов разбита на 408 стадий в 19 группах. Как устроены стадии и поведение ботов — на отдельных страницах.', [['bot-builds.html', 'Сборка ИИ: 408 стадий покупок'], ['aibot.html', 'Поведение ИИ-ботов']]),
    keys: A('Воинская способность на <strong>F</strong>, основные на <strong>Q</strong>, <strong>W</strong>, <strong>E</strong>, ультимейт на <strong>R</strong>. Прокачивать вручную не нужно: способности растут вместе с уровнем героя. Полное описание всех пяти способностей каждого из 74 героев — в карточках героев, таблица автопрокачки по уровням — на странице информации.', [['info.html#auto-level', 'Автопрокачка: таблица уровней'], ['heroes.html', 'Все герои']]),
    modes: A('Режимы выбирает хост до старта матча в ящике на базе. Всего в карте 9 режимов — от классической арены до хаоса и случайного героя; есть режим боссов, турбо, бан героев, потеря золота. Режим определяет правила матча, поэтому его стоит определить до старта.', [['modes.html', 'Все игровые режимы']]),
    build: A('Нажмите кнопку сборки — герой сам продаст устаревшие предметы, докупит нужные для текущей стадии и перейдёт к следующей, когда дойдёт до её уровня. Стадии с босс-предметами открываются только при включённом режиме боссов. Ту же логику можно просчитать заранее на сайте: калькулятор сборок считает стоимость и разбивку по стадиям для любого героя.', [['calculator.html', 'Калькулятор сборок'], ['mechanics.html', 'Механика «Сборка в 1 клик»']]),
    scepter: A('Предмет, усиливающий ультимейт каждого героя. Эффект индивидуальный: у одних героев — дополнительный урон, у других — шанс мгновенной перезарядки. Скипетр меняет ценность ульты в бою, поэтому его место в сборке стоит проверять в карточке своего героя.', [['heroes.html', 'Карточки героев'], ['mechanics.html', 'Механика «Скипетр Владыки»']]),
    armor: A('Защита = базовая + ловкость × 0.05. Снижение урона рассчитывается по формуле: (Защита × 0.05) / (1 + Защита × 0.05). Константа карты — 0.05, а не стандартные для Warcraft III 0.06: каждая единица защиты даёт меньше снижения, чем в обычном варе. Подставить свои значения и увидеть результат можно в калькуляторе брони.', [['armor-calc.html', 'Калькулятор брони'], ['mechanics.html', 'Все механики']]),
    luck: A('Удача увеличивает шанс срабатывания случайных эффектов: крита, оглушения, уклонения. Формула нелинейная: Итог = Базовый% + Удача × (1 − Базовый% / 100). Чем выше базовый шанс, тем меньше прибавка от удачи. Все источники удачи складываются, поэтому собирать её с нескольких предметов не так выгодно, как кажется.', [['mechanics.html', 'Механика «Удача»']]),
    bosses: A('Боссы появляются в специальном режиме боссов, который хост включает перед матчем. В карте 8 боссов: у каждого свои стадии HP, набор способностей и таблица дропа с шансами. Таймеры спавна и условия появления собраны в карточках боссов.', [['monsters.html', 'Карточки боссов'], ['modes.html', 'Режим боссов']]),
    vamp: A('Физический вампиризм восстанавливает здоровье от автоатак; несколько источников складываются мультипликативно, а не простой суммой. Магический вампиризм восстанавливает здоровье от заклинаний и работает только со способностями. Из-за разной механики одни и те же проценты дают разный результат — формулы и примеры в карточках механик.', [['mechanics.html', 'Механики вампиризма']]),
    data: A('Все данные взяты напрямую из карты Legend of Worlds: статы 74 героев, 222 предмета, формулы, режимы, боссы и крипы. Данные соответствуют актуальной версии карты и обновляются вместе с ней. Если заметили расхождение с игрой — напишите автору, это самый быстрый способ починить.'),
    bug: A('Напишите автору на <a href="mailto:legendofworldswarcraft@gmail.com">legendofworldswarcraft@gmail.com</a> или через страницу информации. Чтобы разобрали быстрее, укажите: где воспроизводится (сайт или карта), героя, предмет или механику, что сделали и что произошло вместо ожидаемого.', [['info.html', 'Страница информации']]),
    ideas: A('Идеи принимаются через сообщество карты: группа ВКонтакте, Telegram, Discord — все ссылки собраны на странице поддержки. Предложение с конкретикой — что за механика, как она должна работать, на каких героях проявляется — разбирается быстрее, чем идея в одно предложение.', [['support.html', 'Страница поддержки']])
};

const Q = (q, answer, open = false) => `            <div class="faq-item${open ? ' open' : ''}">
                <div class="faq-question">${q} <i class="fas fa-chevron-right"></i></div>
                <div class="faq-answer">
                    ${answer}
                </div>
            </div>`;

const NEW_MIDDLE = `    <div class="wiki-container">
        <div class="breadcrumbs"><a href="index.html">Главная</a><span class="sep">›</span><span class="current">ЧаВо</span></div>

        <h1><i class="fas fa-question-circle"></i> Часто задаваемые вопросы</h1>
        <p style="color:var(--text-secondary); margin-bottom:28px; font-size:1.05rem;">Быстрые ответы по установке, режимам, механикам и данным сайта. Раскройте вопрос — внутри развёрнутый ответ и ссылки на нужный раздел.</p>

        <!-- Установка и запуск -->
        <div class="faq-section">
            <div class="faq-section-title"><i class="fas fa-download"></i> Установка и запуск</div>

${Q('Как установить карту?', ITEMS.install, true)}

${Q('Карта не отображается в списке. Что делать?', ITEMS.missing)}

${Q('Как играть с ботами?', ITEMS.bots)}
        </div>

        <!-- Геймплей -->
        <div class="faq-section">
            <div class="faq-section-title"><i class="fas fa-gamepad"></i> Геймплей</div>

${Q('Какие клавиши у способностей?', ITEMS.keys)}

${Q('Как выбрать режимы перед игрой?', ITEMS.modes)}

${Q('Как работает автосборка в 1 клик?', ITEMS.build)}

${Q('Что такое Скипетр Владыки?', ITEMS.scepter)}

${Q('Как считается броня и защита?', ITEMS.armor)}

${Q('Как работает удача?', ITEMS.luck)}

${Q('Когда появляются боссы?', ITEMS.bosses)}

${Q('В чём разница между физическим и магическим вампиризмом?', ITEMS.vamp)}
        </div>

        <!-- Сайт -->
        <div class="faq-section">
            <div class="faq-section-title"><i class="fas fa-globe"></i> Сайт</div>

${Q('Откуда данные на сайте?', ITEMS.data)}

${Q('Как сообщить о баге?', ITEMS.bug)}

${Q('Как предложить героя или механику?', ITEMS.ideas)}
        </div>

        <!-- Единый ряд перекрёстных ссылок -->
        <div class="related-links" style="text-align:center; margin: 36px 0;">
            <a href="index.html" class="calc-link-btn"><i class="fas fa-home"></i> На главную</a>
            <a href="guides.html" class="calc-link-btn"><i class="fas fa-book-open"></i> Гайды</a>
            <a href="mechanics.html" class="calc-link-btn"><i class="fas fa-cogs"></i> Механики</a>
            <a href="support.html" class="calc-link-btn"><i class="fas fa-heart"></i> Поддержать проект</a>
        </div>
    </div>

            `;

/* ---------- Замены ---------- */
const ldStart = html.indexOf('<script type="application/ld+json">');
if (ldStart === -1 || !html.slice(ldStart, ldStart + 400).includes('FAQPage')) {
    console.error('JSON-LD FAQPage не найден');
    process.exit(1);
}
const ldEnd = html.indexOf('</script>', ldStart) + '</script>'.length;

const midStart = html.indexOf('    <div class="wiki-container">');
const midEnd = html.indexOf('<footer class="site-footer">');
if (midStart === -1 || midEnd === -1 || midEnd < midStart) {
    console.error('Якоря средней части не найдены:', midStart, midEnd);
    process.exit(1);
}

html = html.slice(0, ldStart) + NEW_JSONLD + html.slice(ldEnd);

// после первой замены индексы сместились — ищем заново
const midStart2 = html.indexOf('    <div class="wiki-container">');
const midEnd2 = html.indexOf('<footer class="site-footer">');
html = html.slice(0, midStart2) + NEW_MIDDLE + html.slice(midEnd2);

/* ---------- Контроль ---------- */
const nItems = (html.match(/class="faq-item/g) || []).length;
const nQuestions = (html.match(/"@type": "Question"/g) || []).length;
const nBtns = (html.match(/class="calc-link-btn"/g) || []).length;
const checks = [
    [nItems === 14, `faq-item = ${nItems}, ждали 14`],
    [nQuestions === 14, `JSON-LD Question = ${nQuestions}, ждали 14`],
    [nBtns === 4, `calc-link-btn = ${nBtns}, ждали 4`],
    [!html.includes('btn-secondary'), 'остался btn-secondary'],
    [html.includes('408 стадий в 19 группах'), 'нет факта о стадиях']
];
const failed = checks.filter(([ok]) => !ok);
if (failed.length) {
    console.error('Контроль не прошёл:', failed.map(([, m]) => m).join('; '));
    process.exit(1);
}

await writeFile(FILE, html);
console.log(`faq.html: ${before} → ${html.length} байт; items 14, JSON-LD 14, кнопок 4 (единый стиль)`);

/* ---------- css/faq.css: укрупнение ---------- */
let css = await readFile(CSS, 'utf8');
const MARK = '/* === 09.11: укрупнение катов и ответов';
if (!css.includes(MARK)) {
    css = css.trimEnd() + `

        ${MARK} («жалко и не убедительно» — укрупнили, развернули, обрезку 500px сняли) === */
        .faq-section-title { font-size: 1.25rem; margin-bottom: 18px; padding-bottom: 10px; }
        .faq-section-title i { font-size: 1rem; }
        .faq-item { margin-bottom: 12px; border-radius: 12px; }
        .faq-question { padding: 18px 22px; font-size: 1.08rem; font-weight: 600; gap: 16px; }
        .faq-question i { font-size: 0.8rem; }
        .faq-answer { font-size: 0.97rem; line-height: 1.7; padding: 0 22px; color: var(--text-primary); }
        .faq-item.open .faq-answer { max-height: 1200px; padding: 0 22px 20px; }
        .faq-answer .faq-link { font-size: 0.88rem; margin-top: 10px; }
        .faq-answer .faq-link i { font-size: 0.75rem; }
        .faq-answer code { font-size: 0.9rem; }
        .page-faq .related-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
        .page-faq .related-links .calc-link-btn { margin-bottom: 0; padding: 12px 26px; font-size: 0.95rem; border-radius: 10px; }
        @media (max-width: 800px) {
            .faq-section-title { font-size: 1.15rem; }
            .faq-question { font-size: 1.02rem; padding: 15px 18px; }
            .faq-answer { font-size: 0.93rem; }
            .page-faq .related-links .calc-link-btn { padding: 10px 20px; font-size: 0.88rem; }
        }
        @media (max-width: 600px) {
            .faq-question { font-size: 0.98rem; padding: 13px 16px; }
            .faq-answer { font-size: 0.91rem; padding: 0 16px; }
            .faq-item.open .faq-answer { padding: 0 16px 16px; }
        }
        @media (max-width: 480px) {
            .faq-section-title { font-size: 1.05rem; }
            .faq-question { font-size: 0.94rem; padding: 12px 14px; gap: 10px; }
            .faq-answer { font-size: 0.9rem; line-height: 1.6; }
            .faq-item.open .faq-answer { padding: 0 14px 14px; }
            .page-faq .related-links { flex-direction: column; align-items: stretch; }
            .page-faq .related-links .calc-link-btn { justify-content: center; }
        }
`;
    await writeFile(CSS, css);
    console.log('css/faq.css: блок укрупнения добавлен');
} else {
    console.log('css/faq.css: блок уже стоит, пропуск');
}
