#!/usr/bin/env node
/**
 * restyle-manifesto-support.mjs
 *
 * Переработка двух страниц по претензии владельца «выглядит слабо/мелко/зажато»:
 *
 * 1. css/manifesto-support.css (НОВЫЙ файл) — выразительная типографика в стиле
 *    сайта (неон + стекломорфизм, переменные :root), переопределения поверх all.css:
 *    - manifesto: hero-цитата + stat-сетка (6 плиток), крупные акцентные строки,
 *      ночная статистика (89/152/2), Q&A с крупным вопросом;
 *    - support: контейнер 1200px (было 800), карточки крупнее (padding 32px,
 *      иконка в подложке 64px, h3 1.3rem, p 1rem), кнопки method-link крупные,
 *      акцентные денежные карточки support-card--money, строка thanks крупнее.
 * 2. manifesto.html — подключение css + новая разметка body (hero, stat, night, qa).
 * 3. support.html  — подключение css + класс support-card--money на 3 денежные карточки.
 *
 * Запуск: node scripts/restyle-manifesto-support.mjs (из корня репо).
 * Идемпотентен: повторный запуск даёт тот же результат.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Запускать из корня репо: node /path/to/restyle-manifesto-support.mjs
const ROOT = process.cwd();
if (!readFileSync(join(ROOT, 'manifesto.html'), 'utf8').includes('Манифест')) {
    throw new Error('ROOT не похож на репо: запусти из /home/z/my-project/loww');
}
const p = (...s) => join(ROOT, ...s);
const read = f => readFileSync(p(f), 'utf8');
const write = (f, t) => { writeFileSync(p(f), t); console.log('OK', f, t.length, 'байт'); };

/* ────────────────────────── 1. CSS ────────────────────────── */

const CSS = String.raw`/* ============================================================
   manifesto-support.css — выразительная подача для manifesto.html
   и support.html (09.11: претензия владельца — «мелко, зажато,
   невыразительно»). Грузится ПОСЛЕ css/all.css, переопределяет
   точечно. Переменные — из :root all.css, своих не заводим.
   ============================================================ */

/* ── МАНИФЕСТ ── */

/* hero: цитата-заявление на всю ширину */
.mf-hero {
    text-align: center;
    padding: 30px 24px 8px;
    margin-bottom: 34px;
}
.mf-hero-line {
    font-size: clamp(1.6rem, 4.2vw, 2.6rem);
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: 0.01em;
    color: var(--text-primary);
    text-shadow: 0 0 24px rgba(0, 230, 255, 0.25);
    margin-bottom: 10px;
}
.mf-hero-line em {
    font-style: normal;
    color: var(--accent-cyan);
}
.mf-hero-sub {
    color: var(--text-secondary);
    font-size: 1.05rem;
    max-width: 720px;
    margin: 0 auto;
}

/* stat-сетка: 6 плиток */
.mf-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
    max-width: 1080px;
    margin: 30px auto 0;
}
.mf-stat {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 20px 12px 16px;
    text-align: center;
    transition: 0.25s ease;
}
.mf-stat:hover {
    border-color: var(--glass-border-hover);
    box-shadow: var(--neon-glow);
    transform: translateY(-3px);
}
.mf-stat-num {
    display: block;
    font-size: clamp(1.7rem, 3.4vw, 2.4rem);
    font-weight: 800;
    color: var(--accent-cyan);
    line-height: 1.1;
    text-shadow: 0 0 18px rgba(0, 230, 255, 0.45);
}
.mf-stat-cap {
    display: block;
    margin-top: 6px;
    color: var(--text-secondary);
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

/* секции манифеста: просторнее базовых info-section */
.mf-section { margin: 44px 0; }
.mf-section .section-title { font-size: 1.5rem; }

/* крупная ночная статистика */
.mf-night {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    margin: 26px 0;
}
.mf-night-item {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 18px;
    padding: 26px 20px;
    text-align: center;
}
.mf-night-num {
    display: block;
    font-size: clamp(2.4rem, 5.5vw, 3.4rem);
    font-weight: 800;
    line-height: 1;
    color: var(--accent-cyan);
    text-shadow: 0 0 26px rgba(0, 230, 255, 0.5);
}
.mf-night-item--quiet .mf-night-num { color: var(--text-primary); text-shadow: none; }
.mf-night-cap {
    display: block;
    margin-top: 10px;
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.45;
}

/* акцентная строка внутри текста */
.mf-accent {
    font-size: clamp(1.15rem, 2.4vw, 1.45rem);
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.45;
    margin: 18px 0;
}
.mf-accent em {
    font-style: normal;
    color: var(--accent-cyan);
    text-shadow: 0 0 16px rgba(0, 230, 255, 0.35);
}

/* Q&A: вопрос крупно, ответ — обычный текст */
.mf-qa {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: 18px;
    padding: 26px 28px;
    margin: 18px 0;
    transition: 0.25s ease;
}
.mf-qa:hover {
    border-color: var(--glass-border-hover);
    box-shadow: var(--neon-glow);
}
.mf-q {
    font-size: clamp(1.2rem, 2.6vw, 1.5rem);
    font-weight: 800;
    color: var(--accent-cyan);
    margin-bottom: 12px;
    line-height: 1.3;
}
.mf-a {
    color: var(--text-primary);
    font-size: 1.02rem;
    line-height: 1.65;
}
.mf-a + .mf-a { margin-top: 10px; }

/* финальная строка */
.mf-final {
    text-align: center;
    font-size: clamp(1.25rem, 3vw, 1.7rem);
    font-weight: 800;
    line-height: 1.4;
    color: var(--text-primary);
    padding: 34px 20px;
    margin-top: 40px;
    border-top: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
}
.mf-final em {
    font-style: normal;
    color: var(--accent-cyan);
    text-shadow: 0 0 18px rgba(0, 230, 255, 0.4);
}

@media (max-width: 640px) {
    .mf-hero { padding: 14px 4px 0; }
    .mf-qa { padding: 20px 16px; }
}

/* ── ПОДДЕРЖАТЬ ── */

/* контейнер: шире (было 800px — «зажато») */
.support-container { max-width: 1200px; }

/* сетка: плитки крупнее */
.support-methods {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 22px;
}

/* карточка: просторнее, иконка в подложке */
.support-card { padding: 30px 26px 26px; border-radius: 18px; }
.support-card .method-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    border-radius: 50%;
    background: var(--glass-subtle);
    border: 1px solid var(--glass-tag-border);
}
.support-card h3 { font-size: 1.3rem; margin-bottom: 8px; }
.support-card p { font-size: 0.95rem; line-height: 1.5; }

/* кнопка: полноценная, не чипс */
.support-card .method-link {
    margin-top: 18px;
    padding: 12px 34px;
    font-size: 1rem;
    border-radius: 32px;
}
.support-card .method-link:hover { box-shadow: var(--neon-glow); }

/* денежные карточки: главный акцент страницы */
.support-card--money {
    border-color: rgba(0, 230, 255, 0.3);
    background: linear-gradient(180deg, rgba(0, 230, 255, 0.06), rgba(15, 23, 42, 0.5));
}
.support-card--money:hover { box-shadow: var(--neon-glow-strong); }
.support-card--money .method-link {
    background: var(--accent-cyan);
    color: #0b0e14;
}

/* «Спасибо. Серьёзно.» — не жалкая приписка */
.support-thanks {
    font-size: 1.3rem;
    font-style: normal;
    color: var(--text-primary);
    margin: 36px 0 44px;
    letter-spacing: 0.01em;
}
.support-thanks .fa-heart {
    color: var(--accent-cyan);
    text-shadow: 0 0 14px rgba(0, 230, 255, 0.5);
}
`;

write('css/manifesto-support.css', CSS);

/* ────────────────────────── 2. manifesto.html ────────────────────────── */

let mani = read('manifesto.html');

// 2a. подключение css
if (!mani.includes('manifesto-support.css')) {
    mani = mani.replace(
        '<link rel="stylesheet" href="info-auto-level.css">',
        '<link rel="stylesheet" href="info-auto-level.css">\n    <link rel="stylesheet" href="css/manifesto-support.css">'
    );
}

// 2b. новая разметка body: от первой секции до закрытия wiki-container
const START = '        <!-- Как это делалось -->';
const END = '\n\n    </div>\n';
const i = mani.indexOf(START);
const j = mani.indexOf(END, i);
if (i === -1 || j === -1) throw new Error('manifesto: маркеры не найдены');

const BODY = `        <!-- hero -->
        <div class="mf-hero">
            <p class="mf-hero-line">Один человек. Без команды. Без бюджета.<br><em>Шесть месяцев по ночам.</em></p>
            <p class="mf-hero-sub">Карта, сайт и лор Legend of Worlds — это один автор и его свободное время. Ниже — цифры вместо обещаний.</p>
            <div class="mf-stats">
                <div class="mf-stat"><span class="mf-stat-num">31</span><span class="mf-stat-cap">версия карты</span></div>
                <div class="mf-stat"><span class="mf-stat-num">350</span><span class="mf-stat-cap">коммитов за полгода</span></div>
                <div class="mf-stat"><span class="mf-stat-num">116</span><span class="mf-stat-cap">страниц руками</span></div>
                <div class="mf-stat"><span class="mf-stat-num">74</span><span class="mf-stat-cap">героя</span></div>
                <div class="mf-stat"><span class="mf-stat-num">222</span><span class="mf-stat-cap">предмета</span></div>
                <div class="mf-stat"><span class="mf-stat-num">408</span><span class="mf-stat-cap">стадий ИИ</span></div>
            </div>
        </div>

        <!-- Как это делалось -->
        <div class="info-section mf-section">
            <h2 class="section-title"><i class="fas fa-code-branch"></i> Как это делалось</h2>
            <p class="info-text">
                Карта старше сайта. В архиве обновлений 31 версия, от v3.0 до v6.9. Архив начинается с тройки. Что было до неё, я уже толком не помню, и записано было далеко не всё, если честно.
            </p>
            <p class="info-text">
                Сайт появился 2 мая 2026. Один коммит, 258 файлов разом. Без плана, просто чтобы был. Дальше был май, и май я у себя ни о чём не спрашивал: 234 коммита за месяц. Встал, сел, герои. Сел, предметы. Калькуляторы, стили, страницы. Сплошной поток без пауз и выходных.
            </p>
            <p class="info-text">
                Теперь открываю лог и вижу картину, которую не придумаешь:
            </p>
            <div class="mf-night">
                <div class="mf-night-item"><span class="mf-night-num">89</span><span class="mf-night-cap">коммитов между полуночью и пятью утра</span></div>
                <div class="mf-night-item"><span class="mf-night-num">152</span><span class="mf-night-cap">после десяти вечера</span></div>
                <div class="mf-night-item mf-night-item--quiet"><span class="mf-night-num">2</span><span class="mf-night-cap">в полдень. В самое обычное человеческое время — два.</span></div>
            </div>
            <p class="info-text">
                Так не выглядит человек, который работает днём как все. Так выглядит человек, который не может остановиться.
            </p>
            <p class="info-text">
                Потом июнь, десять коммитов. Июль. Ноль. Открой лог, там дыра, месяц выпал как выключили свет. Я не планировал перерыв и никуда не уезжал. Я однажды открыл проект, посмотрел на него и закрыл. Август двенадцать, сентябрь двадцать три, возвращался рывками, через силу. В ноябре 61, доделываю то, что сам же бросил.
            </p>
            <p class="info-text">
                За полгода: 350 коммитов, 116 страниц руками. Футер я переделывал три раза. Сначала соцсети, но ссылки были мёртвые. Потом навигацию по разделам. Потом выкинул и её, осталась иконка и строчка копирайта. Три раза одно и то же место на 115 страницах. Почти сорок коммитов начинаются со слов «починил» и «фикс». Чтобы не порвать 4093 ссылки, написал проверку. Чтобы не писать как робот, написал ещё одну, она ищет в моих текстах мусор. Один раз эта проверка поймала меня на слове, которое сама и ищет. Мне было не смешно.
            </p>
        </div>

        <!-- Зачем -->
        <div class="info-section mf-section">
            <h2 class="section-title"><i class="fas fa-question-circle"></i> Зачем</h2>
            <p class="mf-accent">За 31 версией слишком много вечеров, чтобы просто выкинуть карту. <em>Вроде для игроков. По сути, чтобы не сгорело.</em></p>
            <p class="info-text">
                Карта делает то, что должна делать: 74 героя, 222 предмета, боты с 408 стадиями покупок, баланс, формулы, ИИ. В голове это не удержать. Кто-то должен был это выложить. Других желающих не нашлось, сделал я. Сайт отвечает ночью, когда я сплю. Или не сплю.
            </p>
        </div>

        <!-- Кому это надо -->
        <div class="info-section mf-section">
            <h2 class="section-title"><i class="fas fa-comment-slash"></i> Да кому это надо</h2>
            <p class="info-text">Отвечу один раз. Не потому что должен. Чтобы потом не отвлекаться.</p>

            <div class="mf-qa">
                <div class="mf-q">«Да кому нужен твой сайт?»</div>
                <div class="mf-a">
                    Мне. Потом тем, кто играет. В карте 74 героя, 222 предмета, боты с 408 стадиями покупок. Это в голове не удержать. Кто-то должен был это выложить. Других желающих не нашлось, сделал я. Сайт отвечает ночью, когда я сплю. Или не сплю. Больше мне аудитория не нужна.
                </div>
            </div>

            <div class="mf-qa">
                <div class="mf-q">«Это никому не надо»</div>
                <div class="mf-a">
                    Пусть. Аквариум тоже никому не нужен, и спичечные модели. Никто у аквариума не спрашивает КПД. Я не брал денег, не съедал ничьё время, никому не мешал. Не нужен рынку, нужен был мне. Хотя нет, вообще никому не нужен, в этом и смысл хобби. Но всё равно объясняю. Всем объясняю. Всю жизнь всем что-то объясняешь.
                </div>
            </div>

            <div class="mf-qa">
                <div class="mf-q">«Сайт по карте? Ты угораешь?»</div>
                <div class="mf-a">
                    Warcraft III вышел в 2002. Кастомки живы до сих пор. У этой карты 31 версия, свой баланс, формулы, ИИ. У любой живой игры рано или поздно появляется вики. Её всегда пишут фанаты, бесплатно, по ночам. Тут фанат один, и он же автор карты. Поэтому вики есть. Если это угар, то вот вопрос тебе: что ты сам сделал за последние полгода? Жду. Не жду.
                </div>
            </div>

            <div class="mf-qa">
                <div class="mf-q">«Ну прикольно»</div>
                <div class="mf-a">
                    Два слова. За полгода по ночам два слова. Окей, я не сдавал проект и оценку не заказывал, засчитано. Только замечу: почти все, кто так отвечает, сами не закончили ни одной своей затеи. Те, кто доводил что-то до конца, отвечают по-другому, конкретнее. Они знают, сколько это стоит. Не в деньгах. Тут денег нет вообще.
                </div>
            </div>

            <p class="mf-accent">Иногда я сам себе задаю первый вопрос из этого списка. Чаще всего это случается в месяцы, когда коммитов ноль. Ответ не меняется: <em>тебе</em>. В июле я думал всё удалить. Не удалил и не знаю почему.</p>
        </div>

        <!-- Если ты пришёл критиковать -->
        <div class="info-section mf-section">
            <h2 class="section-title"><i class="fas fa-shield-alt"></i> Если ты пришёл критиковать</h2>
            <p class="info-text">
                Я готов обсуждать конкретные ошибки, недостатки, коммерческую состоятельность, распределение внимания между картой и сайтом, отсутствие дистрибуции. Это содержательно. На это есть ответ.
            </p>
            <p class="info-text">
                Но если критика идёт через «нахуй это надо», сравнение с чужим успехом без анализа контекста, сведение ценности к одной метрике, обесценивание мотивации или переход на личность — это форма, а не содержание. Внутри такой формы нет предмета для разбора, есть проекция.
            </p>
            <p class="info-text">
                Полный разбор пяти смысловых установок, которыми критика подменяет анализ чужой работы проекцией и чужими кейсами, лежит в репозитории проекта: <a href="https://github.com/DarkDaro/legend-of-worlds-war3/blob/main/docs/ARGUMENT-FALLACIES.md" target="_blank" rel="noopener">docs/ARGUMENT-FALLACIES.md</a>. Это не психология, это формальная карта уловок с контр-ходами. То же, что чекер делает для битых ссылок — детектор формы.
            </p>
        </div>

        <p class="mf-final">Сказать «нахуй не нужен» — это не отзыв на проект.<br>Это <em>отзыв на собственное нежелание разобраться</em>.<br>Я такой отзыв не запрашивал.</p>
    </div>
`;

mani = mani.slice(0, i) + BODY + mani.slice(j + END.length);
write('manifesto.html', mani);

/* ────────────────────────── 3. support.html ────────────────────────── */

let sup = read('support.html');

// 3a. подключение css
if (!sup.includes('manifesto-support.css')) {
    sup = sup.replace(
        '<link rel="stylesheet" href="css/all.css">',
        '<link rel="stylesheet" href="css/all.css">\n    <link rel="stylesheet" href="css/manifesto-support.css">'
    );
}

// 3b. класс --money на три денежные карточки (идемпотентно)
let moneyCount = 0;
for (const icon of ['fa-credit-card"></i>', 'social-bolt"></i>', 'attr-chaos"></i>']) {
    const iconPos = sup.indexOf(icon);
    if (iconPos === -1) { console.log('нет иконки', icon); continue; }
    const openTag = '<div class="support-card">';
    const from = sup.lastIndexOf(openTag, iconPos);
    if (from === -1) { console.log('нет карточки перед', icon); continue; }
    sup = sup.slice(0, from) + '<div class="support-card support-card--money">' + sup.slice(from + openTag.length);
    moneyCount++;
}
console.log('money-классов проставлено:', moneyCount);

write('support.html', sup);
console.log('Готово.');
