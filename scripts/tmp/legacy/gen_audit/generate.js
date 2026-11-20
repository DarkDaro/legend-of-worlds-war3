/* Технический аудит сайта Legend of Worlds — генерация docx.
 * Рецепт обложки: R1 (Pure Paragraph Left), палитра DM-1 (Deep Cyan, tech).
 * Язык: русский. Шрифты: TNR (тело) + Arial (заголовки) — полная кириллица. */
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, PageBreak, Header, Footer, PageNumber, NumberFormat,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
  TableLayoutType, SectionType, TableOfContents, LevelFormat,
} = require("docx");
const fs = require("fs");

/* ---------- палитра DM-1 ---------- */
const P = {
  bg: "162235", accent: "37DCF2",
  cover: { titleColor: "FFFFFF", subtitleColor: "B0B8C0", metaColor: "90989F", footerColor: "687078" },
  table: { headerBg: "1B6B7A", headerText: "FFFFFF", accentLine: "1B6B7A", innerLine: "C8DDE2", surface: "EDF3F5" },
  h1: "162235", h2: "1B6B7A",
};
const FONT = { ascii: "Times New Roman", hAnsi: "Times New Roman", eastAsia: "SimSun" };
const FONT_H = { ascii: "Arial", hAnsi: "Arial", eastAsia: "SimHei" };

const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };

function safeText(v, ph) {
  if (v === undefined || v === null || v === "" || String(v) === "NaN" || String(v) === "undefined") return ph || "—";
  return String(v);
}

/* ---------- layout-хелперы обложки (design-system.md) ---------- */
/* Для кириллицы ширина символа ≈ pt*11 twips (CJK-оценка pt*20 завышает в 2 раза). */
function splitTitleLines(title, charsPerLine) {
  if (title.length <= charsPerLine) return [title];
  const breakAfter = new Set([..."，。、；：！？", ..."-_—–·/", ..." \t"]);
  const lines = [];
  let remaining = title;
  while (remaining.length > charsPerLine) {
    let breakAt = -1;
    for (let i = charsPerLine; i >= Math.floor(charsPerLine * 0.6); i--) {
      if (i < remaining.length && breakAfter.has(remaining[i - 1])) { breakAt = i; break; }
    }
    if (breakAt === -1) {
      const limit = Math.min(remaining.length, Math.ceil(charsPerLine * 1.3));
      for (let i = charsPerLine + 1; i < limit; i++) {
        if (breakAfter.has(remaining[i - 1])) { breakAt = i; break; }
      }
    }
    if (breakAt === -1) breakAt = charsPerLine;
    lines.push(remaining.slice(0, breakAt).trim());
    remaining = remaining.slice(breakAt).trim();
  }
  if (remaining) lines.push(remaining);
  if (lines.length > 1 && lines[lines.length - 1].length <= 2) {
    const last = lines.pop();
    lines[lines.length - 1] += last;
  }
  return lines;
}
function calcTitleLayout(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  const charWidth = (pt) => pt * 11; // кириллица/латиница ≈ половина ширины CJK
  const charsPerLine = (pt) => Math.floor(maxWidthTwips / charWidth(pt));
  let titlePt = preferredPt, lines;
  while (titlePt >= minPt) {
    const cpl = charsPerLine(titlePt);
    if (cpl < 2) { titlePt -= 2; continue; }
    lines = splitTitleLines(title, cpl);
    if (lines.length <= 3) break;
    titlePt -= 2;
  }
  if (!lines || lines.length > 3) { lines = splitTitleLines(title, charsPerLine(minPt)); titlePt = minPt; }
  return { titlePt, titleLines: lines };
}
function calcCoverSpacing(params) {
  const { titleLineCount = 1, titlePt = 36, hasSubtitle = false, hasEnglishLabel = false,
    metaLineCount = 0, fixedHeight = 800, pageHeight = 16838, marginTop = 0, marginBottom = 0 } = params;
  const SAFETY = 1200;
  const usableHeight = pageHeight - marginTop - marginBottom - SAFETY;
  const titleHeight = titleLineCount * (titlePt * 23 + 200);
  const subtitleHeight = hasSubtitle ? (12 * 23 + 600) : 0;
  const englishLabelHeight = hasEnglishLabel ? (9 * 23 + 600) : 0;
  const metaHeight = metaLineCount * (10 * 23 + 100);
  const implicitParaHeight = 3 * 300;
  const contentHeight = titleHeight + subtitleHeight + englishLabelHeight + metaHeight + fixedHeight + implicitParaHeight;
  const safeRemaining = Math.max(usableHeight - contentHeight, 400);
  const FOOTER_MIN = 800;
  const rawTop = Math.floor(safeRemaining * 0.45);
  const rawBottom = Math.floor(safeRemaining * 0.45);
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN);
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400);
  const midSpacing = Math.max(safeRemaining - topSpacing - bottomSpacing, 0);
  return { topSpacing, midSpacing, bottomSpacing };
}

/* ---------- Recipe R1 ---------- */
function buildCoverR1(config) {
  const PC = config.palette;
  const padL = 1200, padR = 800;
  const availableWidth = 11906 - padL - padR - 300;
  const { titlePt, titleLines } = calcTitleLayout(config.title, availableWidth, 34, 24);
  const titleSize = titlePt * 2;
  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length, fixedHeight: 400,
  });
  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: PC.accent, space: 12 };
  const children = [];
  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }));
  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: PC.accent, space: 8 } },
      children: [new TextRun({ text: config.englishLabel.split("").join("  "), size: 18, color: PC.accent, font: FONT_H, characterSpacing: 40 })],
    }));
  }
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: titleLines[i], size: titleSize, bold: true, color: PC.cover.titleColor, font: FONT_H })],
    }));
  }
  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL }, spacing: { after: 800 },
      children: [new TextRun({ text: config.subtitle, size: 24, color: PC.cover.subtitleColor, font: FONT })],
    }));
  }
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80 },
      border: { left: accentLeft },
      children: [new TextRun({ text: safeText(line), size: 24, color: PC.cover.metaColor, font: FONT })],
    }));
  }
  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }));
  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: PC.accent, space: 8 } },
    spacing: { before: 200 },
    children: [
      new TextRun({ text: config.footerLeft || "", size: 16, color: PC.cover.footerColor, font: FONT_H }),
      new TextRun({ text: "                                        " }),
      new TextRun({ text: config.footerRight || "", size: 16, color: PC.cover.footerColor, font: FONT_H }),
    ],
  }));
  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: PC.bg }, borders: noBorders, children })],
    })],
  })];
}

/* ---------- конструкторы тела ---------- */
function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 160, line: 312 },
    children: [new TextRun({ text, bold: true, color: P.h1, font: FONT_H })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120, line: 312 },
    children: [new TextRun({ text, bold: true, color: P.h2, font: FONT_H })] });
}
function body(text, opts) {
  opts = opts || {};
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: opts.noIndent ? 0 : 709 },
    spacing: { line: 312, after: 120 },
    children: [new TextRun({ text, size: 24, color: "000000", font: FONT })],
  });
}
function bodyRuns(runs, opts) {
  opts = opts || {};
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: opts.noIndent ? 0 : 709 },
    spacing: { line: 312, after: 120 },
    children: runs.map(r => new TextRun({ text: r.t, bold: !!r.b, size: 24, color: "000000", font: FONT })),
  });
}
function listItem(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 312, after: 80 },
    children: [new TextRun({ text, size: 24, color: "000000", font: FONT })],
  });
}
function tCaption(text) {
  return new Paragraph({
    keepNext: true, alignment: AlignmentType.LEFT, spacing: { before: 160, after: 80, line: 312 },
    children: [new TextRun({ text, bold: true, size: 21, color: P.h2, font: FONT_H })],
  });
}
function mkTable(headers, rows, widths) {
  const mkCell = (text, isHeader, w) => new TableCell({
    width: { size: w, type: WidthType.PERCENTAGE },
    shading: isHeader ? { type: ShadingType.CLEAR, fill: P.table.headerBg } : undefined,
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: AlignmentType.LEFT, spacing: { line: 312 },
      children: [new TextRun({
        text: safeText(text), bold: isHeader, size: 21,
        color: isHeader ? P.table.headerText : "000000", font: FONT,
      })],
    })],
  });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: P.table.accentLine },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: P.table.accentLine },
      left: NB, right: NB,
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: P.table.innerLine },
      insideVertical: NB,
    },
    rows: [
      new TableRow({ tableHeader: true, cantSplit: true, children: headers.map((t, i) => mkCell(t, true, widths[i])) }),
      ...rows.map(r => new TableRow({ cantSplit: true, children: r.map((t, i) => mkCell(t, false, widths[i])) })),
    ],
  });
}

/* ---------- график ---------- */
const chartBuf = fs.readFileSync("/home/z/my-project/scripts/gen_audit/chart_js_weights.png");
const CHART_W = 520, CHART_H = Math.round(520 * 600 / 1520);

/* ---------- содержимое ---------- */
const coverConfig = {
  title: "Технический аудит сайта Legend of Worlds",
  subtitle: "Прочность реализации, технический долг и точки роста SEO",
  englishLabel: "TECHNICAL AUDIT",
  metaLines: [
    "Объект: DarkDaro/legend-of-worlds-war3 — статический сайт на GitHub Pages",
    "Срез: main = origin/main, коммит ec86b54",
    "Методы: стат-анализ 116 страниц, CI-гейты, headless-браузер",
    "Дата проведения: 7 ноября 2026 года",
  ],
  footerLeft: "legend-of-worlds-war3",
  footerRight: "ноябрь 2026",
  palette: P,
};

const bodyChildren = [];

/* 1. Резюме */
bodyChildren.push(h1("1. Резюме для владельца"));
bodyChildren.push(body("Цель аудита — оценить, насколько прочно реализован сайт-энциклопедия legend-of-worlds-war3 (статика без сборки на GitHub Pages), зафиксировать накопленный технический долг и определить, что можно докрутить для поисковой оптимизации. Проверка выполнена 7 ноября 2026 года по состоянию ветки main, синхронной с origin/main (коммит ec86b54). Отдельно проверялись три ранее открытых вопроса: дубль balance-dashboard.css, расхождение витринных чисел и остатки несведённых page-скриптов."));
bodyChildren.push(bodyRuns([
  { t: "Общий вердикт: сайт технически крепкий. " , b: true },
  { t: "Оба CI-гейта проекта зелёные — 4 343 внутренние ссылки без единой битой, 205 просмотренных файлов без маркеров незавершённости. Все 46 JavaScript-файлов проходят синтаксическую проверку. Двенадцать ключевых страниц, включая страницу героя, каталог предметов, калькулятор и баланс-дашборд, загружены в headless-браузере: ни одной ошибки в консоли, ни одной недогруженной картинки, динамический рендер из баз данных отрабатывает корректно. Живой сайт отдаёт тот же контент, что и репозиторий." },
]));
bodyChildren.push(body("SEO-фундамент для самописной статики выше среднего: canonical выверен на всех 116 страницах, Open Graph и Twitter-теги оформлены, хлебные навигации размечены JSON-LD на 110 страницах, sitemap.xml и robots.txt на месте, title и description уникальны по всему сайту, на каждой странице ровно один h1, подключена Яндекс.Метрика. Всего зафиксировано 18 находок: девять относятся к точкам SEO-докрутки, девять — к техническому долгу. Критических среди них нет; все они локальны и не требуют архитектурных изменений. Рекомендуемый план — три пакета правок, описанные в разделе 7: пакеты A и B выполняются одним коммитом каждый по команде владельца, пакет C состоит из решений, которые зарезервированы за владельцем проекта."));

/* 2. Методика */
bodyChildren.push(h1("2. Объём, методика и границы аудита"));
bodyChildren.push(body("Аудит охватывает все 116 HTML-страниц (33 корневых, 77 страниц героев, 6 гайдов), 46 JS-файлов и 34 CSS-файла рабочего дерева репозитория. Методы и результаты сведены в таблицу 1: каждый слой проверялся отдельным инструментом, чтобы выводы не опирались на единственную методику."));
bodyChildren.push(tCaption("Таблица 1. Методы проверки и их результаты"));
bodyChildren.push(mkTable(
  ["Метод", "Охват", "Результат"],
  [
    ["Стат-анализ HTML (title, description, canonical, OG/Twitter, JSON-LD, h1, lang, viewport, alt, defer)", "116 страниц", "18 находок, критических нет"],
    ["Сверка sitemap.xml ↔ файлы ↔ canonical; robots.txt", "114 URL карты", "3 правки (см. п. 4.2)"],
    ["Синтаксический контроль node --check", "46 JS-файлов", "Ошибок нет"],
    ["CI-гейты проекта: check-links.mjs, check-slop.py", "4 343 ссылки; 205 файлов", "0 битых; 0 находок"],
    ["Сверка баз: дубли идентификаторов и содержимого (abilities-db.js)", "452 записи", "Дублей id нет; 2 группы совпадающих описаний"],
    ["Рантайм-смоук в headless-Chrome: консоль, рендер, изображения", "12 страниц", "0 ошибок JS; 0 битых картинок"],
    ["Замер весов ресурсов; проверка соглашений (js/, repo-archive, defer, lazy)", "весь репозиторий", "См. раздел 6"],
  ],
  [42, 26, 32],
));
bodyChildren.push(body("За рамками аудита остались Lighthouse-метрики на реальном сетевом соединении, поведение в устаревших браузерах и серверные заголовки GitHub Pages — последними управляет платформа, а не репозиторий. Содержательное качество текстов гайдов и лора не оценивалось: это редакторская задача, а не техническая.", { noIndent: false }));

/* 3. Прочность */
bodyChildren.push(h1("3. Подтверждённая прочность: инфраструктура, рантайм, данные"));
bodyChildren.push(body("Инфраструктура. Оба линтер-гейта гоняются на каждый пуш через GitHub Actions, то есть регрессия ссылок и появление заглушек контролируются автоматически — редкая дисциплина для статических сайтов. Дубль balance-dashboard.css, обнаруженный ранее, уже устранён: корневая копия перенесена в repo-archive, страница подключает актуальную версию из css/. Page-скрипты сведены в js/ (12 файлов перенесено, 13 страниц обновлены), правило зафиксировано в docs/ARCHITECTURE.md."));
bodyChildren.push(body("Рантайм. Двенадцать страниц прогнаны в headless-Chrome с ожиданием сетевого затишья: главная, каталоги героев и предметов, две страницы героев, калькулятор, сборки ИИ, тирлист, баланс-дашборд, сравнение героев, гайд и страница 404. Ни одна не выдала ошибок JavaScript, недогруженных ресурсов или битых изображений. Выборочная проверка рендера: на странице Паладина отрисованы пять карточек способностей с иконками; в каталоге предметов из базы отрисовано 197 карточек — остальные скрыты фильтрами по умолчанию, это не дефект."));
bodyChildren.push(body("Данные. В abilities-db.js — 452 записи способностей без единого дубликата идентификатора. Витринные числа синхронизированы: 74 боевых героя, 222 артефакта в каталоге (123 сборных и 99 базовых), 8 боссов, 8 механик — те же значения на главной, в README и на живом сайте. Отдельные страховки реализации — фолбэк-цепочка иконок PNG, затем JPG, затем иконка Font Awesome, «страховка» scroll-reveal, показывающая контент через 3 секунды даже при отказе обсервера, defer у всех внешних скриптов и picture-обёртки с webp — говорят об устойчивой к деградации сборке. Архитектурных угроз не обнаружено: риски сосредоточены в SEO-гигиене, а не в коде."));

/* 4. SEO */
bodyChildren.push(h1("4. SEO-аудит: фундамент и точки роста"));
bodyChildren.push(h2("4.1. Фундамент уже выдерживает проверку"));
bodyChildren.push(body("Базовая поисковая гигиена выполнена системно, а не точечно — это видно из таблицы 2. Особенно ценно, что canonical выверен на всех страницах без исключения, включая подкаталоги, а title и description не дублируются нигде на 116 страницах."));
bodyChildren.push(tCaption("Таблица 2. Покрытие SEO-элементов по 116 страницам"));
bodyChildren.push(mkTable(
  ["Элемент", "Состояние", "Оценка"],
  [
    ["canonical", "116 из 116, хост и путь верные", "Отлично"],
    ["og: title, description, image, url", "114 из 116 (нет только на 404 и site-validator)", "Хорошо"],
    ["twitter:card", "114 из 116", "Хорошо"],
    ["JSON-LD разметка", "BreadcrumbList на 110 страницах, FAQPage на одной", "Частично, см. 4.2"],
    ["title: уникальность и длина 20–70 символов", "116 из 116, дублей нет", "Отлично"],
    ["description: уникальность", "116 из 116, но 17 короче 50 символов", "См. 4.2"],
    ["h1: ровно один на странице", "116 из 116", "Отлично"],
    ["lang=ru и meta viewport", "116 из 116", "Отлично"],
    ["sitemap.xml и robots.txt", "114 URL; sitemap указан в robots", "Хорошо, см. 4.2"],
    ["Яндекс.Метрика", "Все контентные страницы (через analytics.js)", "Отлично"],
  ],
  [34, 42, 24],
));
bodyChildren.push(h2("4.2. Девять точек SEO-докрутки"));
bodyChildren.push(body("Перечисленные ниже пункты упорядочены по ожидаемому эффекту; первые четыре — самые дешёвые при заметной пользе для сниппетов и индексации."));
bodyChildren.push(listItem("Короткие meta description: 17 страниц (15 страниц героев, changelog, support) уложились в 35–49 символов. Сниппеты в выдаче формируются обеднённо; стоит расширить до 100–150 символов, добавив роль и ключевые способности героя.", "seo-list"));
bodyChildren.push(listItem("Относительный og:image на шести страницах гайдов (../images/preview.png): соцсети и поисковые боты относительный путь не разворачивают, превью не соберётся. Нужен абсолютный URL, как на остальных 109 страницах.", "seo-list"));
bodyChildren.push(listItem("og:image 256×256 пикселей — рекомендация для соцсетей 1200×630. Стоит собрать обложку og-cover из логотипа и скрина арены; текущая картинка проходит минимум, но выглядит мелко в превью.", "seo-list"));
bodyChildren.push(listItem("Служебные страницы без запрета индексации: 404.html, sitemap-page.html и site-validator.html. Им нужен meta robots noindex; у site-validator.html, кроме того, нет canonical, description и OG-тегов.", "seo-list"));
bodyChildren.push(listItem("sitemap.xml: главная указана как /index.html при каноническом адресе без имени файла; lastmod заморожен на 2026-10-24, хотя контент менялся позже; в карту включён sitemap-page.html, который получит noindex.", "seo-list"));
bodyChildren.push(listItem("JSON-LD на главной: единственная страница без разметки — самая цитируемая. Стоит добавить WebSite с названием сайта и, при желании, VideoGame с указанием платформы Warcraft III.", "seo-list"));
bodyChildren.push(listItem("Фавиконки: везде подключён только logo.png 64×64. Нет корневого favicon.ico и apple-touch-icon 180×180 — закладки и ярлыки на телефонах получат заглушку. Набор генерируется из логотипа за один прогон.", "seo-list"));
bodyChildren.push(listItem("Пустые alt у контентных изображений в monsters.html — 16 штук: крипы и предметы в таблице дропа. Декоративные пустые alt на баннерах допустимы, но у смысловых картинок alt нужен.", "seo-list"));
bodyChildren.push(listItem("README: в разделе гайдов указано «2 гайда на героев (Адмирал, Друид)», фактически их шесть — добавлены Архимаг, Иллюзионист, Паладин и Громовержец.", "seo-list"));

/* 5. Долг */
bodyChildren.push(h1("5. Реестр технического долга"));
bodyChildren.push(body("В реестр сведены все незакрытые шероховатости, включая перенесённые из docs/BACKLOG.md. Приоритет P2 означает «стоит сделать в ближайшие итерации», P3 — «можно отложить без риска». Оценки трудозатрат даны в часах чистой работы с учётом прогона гейтов после правок."));
bodyChildren.push(tCaption("Таблица 3. Реестр находок и незавершённых решений"));
bodyChildren.push(mkTable(
  ["№", "Находка", "Влияние", "Приоритет", "Оценка"],
  [
    ["1", "calculator.js и build-constructor.js остались в корне — page-скрипты вне js/", "Нарушение собственного соглашения о структуре", "P2", "0,5 ч"],
    ["2", "Совпадающие записи в abilities-db.js: A12E = A19Z («Бочонок с пивом»), A19C = A19D («Святой дух»)", "Вероятно, легитимно — спеллбуки разных паладинов; нужна сверка с картой", "P3", "0,5 ч сверки"],
    ["3", "A19B «Духи падших»: levels 1 вместо 3 (abilities-db.js:438, известная недоделка)", "Неполные данные способности в живом дереве", "P2", "0,5 ч"],
    ["4", "Шрифты fa-brands и fa-regular (~420 КБ) не используются: все 3 327 вставок иконок — solid", "Мёртвый груз репозитория; на рантайм не влияет", "P3", "0,5 ч"],
    ["5", "Шапка и футер продублированы вручную в 116 файлах", "Каждая правка хвоста — массовая правка; известное ограничение", "P2", "редизайн футера уже в планах владельца"],
    ["6", "site-validator.html — служебный инструмент в публичном доступе", "Мусор в индексе, путаница для посетителей", "P2", "решение владельца + noindex"],
    ["7", "«Лавка предметов» — база и иконки целы в archive/mini-site", "Функционал вне сайта; решение о возврате не принято", "P3", "решение владельца"],
    ["8", "style.css — агрегатор из 14 @import: каскадное обнаружение CSS", "Лёгкий «водопад» загрузки; при HTTP/2 приемлемо, философия «без сборки» соблюдается", "P3", "развёртывание в link затронет 116 файлов"],
    ["9", "JPG-фолбэки picture: lore-bag.jpg 677 КБ, maplows.jpg 595 КБ", "Грузятся только браузерами без webp (менее 3% трафика)", "P3", "0,5 ч на пересжатие"],
    ["10", "Аналитика отсутствует на 404.html и site-validator.html", "Некритично для служебных страниц", "P3", "по желанию"],
  ],
  [5, 30, 33, 12, 20],
));
bodyChildren.push(body("Отдельно зафиксируем, что НЕ является долгом. Хардкод способностей в HTML страниц героев — осознанное SEO-решение, задокументированное в ARCHITECTURE.md. Автогенерируемые hero-slugs.js и item-slugs.js трогать вручную нельзя — это тоже соглашение. Большая abilities-db.js оправдана: монолит грузится только двумя страницами, которым он нужен."));

/* 6. Производительность */
bodyChildren.push(h1("6. Производительность: измеренные веса и соглашения"));
bodyChildren.push(body("Суммарный вес рабочего дерева умеренный: HTML — 2,1 МБ на 116 страниц (в среднем около 18 КБ на страницу), JavaScript — 1,3 МБ, CSS — 505 КБ, изображения — 5,3 МБ. Ключевое в том, как вес распределён: тяжёлые базы подключаются точечно тем страницам, которым нужны, а не всем подряд."));
bodyChildren.push(new Paragraph({
  alignment: AlignmentType.CENTER, keepNext: true, spacing: { before: 120, after: 40 },
  children: [new ImageRun({ data: chartBuf, transformation: { width: CHART_W, height: CHART_H }, type: "png" })],
}));
bodyChildren.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { after: 160 },
  children: [new TextRun({ text: "Рис. 1. Вес базовых JS-файлов, КБ (abilities-db.js подключён только двум страницам)", size: 21, color: "606060", font: FONT })],
}));
bodyChildren.push(body("Универсальные icon-loader.js и analytics.js весят около килобайта и грузятся на всех страницах. items-db.js (153 КБ) обслуживает 21 страницу каталогов и калькуляторов, search-index.js (57 КБ) — 26 страниц с глобальным поиском. Дисциплина загрузки образцовая для статики: 100% внешних скриптов с defer, у 240 из 356 изображений указан lazy-режим, тяжёлые баннеры обёрнуты в picture с webp-источником и JPG-фолбэком. GitHub Pages отдаёт контент в сжатом виде, кэширование платформенное."));
bodyChildren.push(body("Из фактических весов следует единственный практический вывод: главный шрифтовый вес — Font Awesome solid (woff2 153 КБ), и он оправдан, поскольку иконки используются 3 327 раз. Устаревшие JPG-фолбэки и неиспользуемые брендовые шрифты (пункты 9 и 4 реестра) — единственные резервы экономии, и оба не влияют на типового посетителя."));

/* 7. Выводы */
bodyChildren.push(h1("7. Выводы и план действий"));
bodyChildren.push(body("Вывод первый: вопрос «насколько сайт крепкий» закрыт — крепкий. Критических дефектов нет, гейты зелёные, рантайм чистый, данные консистентны, инфраструктура самоконтролируемая. Вывод второй: под SEO есть что докрутить, и вся докрутка дешёвая — девять конкретных пунктов раздела 4.2 не требуют ни архитектуры, ни новых страниц."));
bodyChildren.push(tCaption("Таблица 4. Пакеты правок, ожидающие команды владельца"));
bodyChildren.push(mkTable(
  ["Пакет", "Состав", "Оценка", "Условие запуска"],
  [
    ["A. SEO-докрутка", "description на 17 страницах; абсолютный og:image на 6 гайдах; noindex для 3 служебных страниц; 3 правки sitemap.xml; JSON-LD главной; favicon-набор; alt в monsters.html; README про 6 гайдов", "2–3 ч, один коммит", "команда владельца"],
    ["B. Чистка", "перенос calculator.js и build-constructor.js в js/; удаление неиспользуемых fa-brands и fa-regular; пересжатие JPG-фолбэков", "1–1,5 ч, один коммит", "команда владельца"],
    ["C. Решения", "A19B levels 3; сверка дублей A12E/A19Z и A19C/A19D с картой; судьба site-validator.html и «Лавки»; редизайн футера; обложка og-cover 1200×630 (нужен скрин арены)", "по решениям", "решения владельца"],
  ],
  [16, 44, 18, 22],
));
bodyChildren.push(body("Рекомендуемый порядок — A, затем B, затем C по мере принятия решений; после каждого пакета прогоняются check-links, check-slop и смоук-тест браузера, что занимает минуты. Найденные в аудите пункты следует дописать в docs/BACKLOG.md по правилу журнала; правило «файлы не удалять» соблюдается: fa-brands и fa-regular при чистке переносятся в repo-archive, а не уничтожаются. Напоминание из бэклога остаётся в силе: после завершения всех работ — отозвать fine-grained токен доступа."));

/* ---------- сборка документа ---------- */
const pgSize = { width: 11906, height: 16838 };
const pgMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

function pageFooter(marker) {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: marker, font: FONT })],
    })],
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 24, color: "000000" },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: FONT_H, size: 30, bold: true, color: P.h1 },
        paragraph: { spacing: { before: 360, after: 160, line: 312 } },
      },
      heading2: {
        run: { font: FONT_H, size: 26, bold: true, color: P.h2 },
        paragraph: { spacing: { before: 240, after: 120, line: 312 } },
      },
    },
  },
  numbering: {
    config: [{
      reference: "seo-list",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    }],
  },
  sections: [
    { /* Секция 1: обложка — без номера страницы */
      properties: { page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: buildCoverR1(coverConfig),
    },
    { /* Секция 2: оглавление — римские номера */
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } },
      },
      footers: { default: pageFooter("7F7F7F") },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER, spacing: { before: 480, after: 360 },
          children: [new TextRun({ text: "Содержание", bold: true, size: 32, color: P.h1, font: FONT_H })],
        }),
        new TableOfContents("Содержание", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({
          spacing: { before: 200 },
          children: [new TextRun({
            text: "Примечание: оглавление построено на полях Word. После редактирования документа кликните по оглавлению правой кнопкой мыши и выберите «Обновить поле».",
            italics: true, size: 18, color: "888888", font: FONT,
          })],
        }),
      ],
    },
    { /* Секция 3: тело — арабские номера с 1 */
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Технический аудит · Legend of Worlds", size: 18, color: "808080", font: FONT })],
          })],
        }),
      },
      footers: { default: pageFooter("808080") },
      children: bodyChildren,
    },
  ],
});

Packer.toBuffer(doc).then(buf => {
  const out = "/home/z/my-project/download/Технический_аудит_сайта_Legend_of_Worlds.docx";
  fs.writeFileSync(out, buf);
  console.log("written:", out, buf.length, "bytes");
});
