/**
 * Аудит тем, стилей и анимаций — отчёт владельцу Legend of Worlds (19.11.2026).
 * Обложка R1 (Pure Paragraph Left), палитра DS-1 Deep Sea, 3 секции (обложка / содержание / тело).
 * Запуск: node scripts/audit-report/generate.js (из /home/z/my-project).
 */
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, NumberFormat, AlignmentType, HeadingLevel,
  WidthType, BorderStyle, ShadingType, SectionType, TableOfContents,
  TableLayoutType, PageBreak,
} = require("docx");
const fs = require("fs");

/* ── палитра DS-1 Deep Sea (design-system.md) ── */
const P = {
  bg: "0B1C2C", accent: "529286",
  cover: { titleColor: "FFFFFF", subtitleColor: "B0B8C0", metaColor: "90989F", footerColor: "687078" },
  table: { headerBg: "529286", headerText: "FFFFFF", accentLine: "529286", innerLine: "BECFCC", surface: "E8ECEB" },
  headingColor: "0B1C2C", body: "000000", secondary: "606060",
};
const BODY_FONT = { ascii: "Times New Roman", hAnsi: "Times New Roman" };
const HEAD_FONT = { ascii: "Arial", hAnsi: "Arial" };
const NB = { style: BorderStyle.NONE, size: 0, color: "auto" };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };

/* ── обложка: перенос строк для кириллицы (ширина знака ~0.58 от CJK) ── */
function splitLines(title, charsPerLine) {
  if (title.length <= charsPerLine) return [title];
  const words = title.split(" ");
  const lines = []; let cur = "";
  for (const w of words) {
    const probe = cur ? cur + " " + w : w;
    if (probe.length <= charsPerLine || !cur) cur = probe;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  if (lines.length > 1 && lines[lines.length - 1].length <= 2) {
    const last = lines.pop(); lines[lines.length - 1] += " " + last;
  }
  return lines;
}
function calcTitleLayoutCyr(title, maxWidthTwips, preferredPt = 40, minPt = 24) {
  const charW = (pt) => pt * 20 * 0.58;
  let titlePt = preferredPt, lines;
  while (titlePt >= minPt) {
    const cpl = Math.floor(maxWidthTwips / charW(titlePt));
    lines = splitLines(title, cpl);
    if (lines.length <= 3) break;
    titlePt -= 2;
  }
  return { titlePt, titleLines: lines };
}
function calcCoverSpacing(p) {
  const { titleLineCount = 1, titlePt = 36, hasSubtitle = false, hasEnglishLabel = false,
    metaLineCount = 0, fixedHeight = 800, pageHeight = 16838, marginTop = 0, marginBottom = 0 } = p;
  const SAFETY = 1200;
  const usable = pageHeight - marginTop - marginBottom - SAFETY;
  const titleH = titleLineCount * (titlePt * 23 + 200);
  const subH = hasSubtitle ? (12 * 23 + 600) : 0;
  const engH = hasEnglishLabel ? (9 * 23 + 600) : 0;
  const metaH = metaLineCount * (10 * 23 + 100);
  const content = titleH + subH + engH + metaH + fixedHeight + 3 * 300;
  const rest = Math.max(usable - content, 400);
  const FOOTER_MIN = 800;
  const rawTop = Math.floor(rest * 0.45), rawBottom = Math.floor(rest * 0.45);
  const bottomSpacing = Math.max(rawBottom, FOOTER_MIN);
  const topSpacing = Math.max(rawTop - Math.max(0, FOOTER_MIN - rawBottom), 400);
  return { topSpacing, midSpacing: Math.max(rest - topSpacing - bottomSpacing, 0), bottomSpacing };
}

/* ── Recipe R1: Pure Paragraph Cover (design-system.md, адаптация кириллицы) ── */
function buildCoverR1(config) {
  const C = config.palette;
  const padL = 1200, padR = 800;
  const availableWidth = 11906 - padL - padR - 300;
  const { titlePt, titleLines } = calcTitleLayoutCyr(config.title, availableWidth, 40, 24);
  const titleSize = titlePt * 2;
  const spacing = calcCoverSpacing({
    titleLineCount: titleLines.length, titlePt,
    hasSubtitle: !!config.subtitle, hasEnglishLabel: !!config.englishLabel,
    metaLineCount: (config.metaLines || []).length, fixedHeight: 400,
  });
  const accentLeft = { style: BorderStyle.SINGLE, size: 8, color: C.accent, space: 12 };
  const children = [];
  children.push(new Paragraph({ spacing: { before: spacing.topSpacing } }));
  if (config.englishLabel) {
    children.push(new Paragraph({
      indent: { left: padL, right: padR }, spacing: { after: 500 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.accent, space: 8 } },
      children: [new TextRun({ text: config.englishLabel.split("").join("  "), size: 18, color: C.accent, font: HEAD_FONT, characterSpacing: 40 })],
    }));
  }
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      indent: { left: padL },
      spacing: { after: i < titleLines.length - 1 ? 100 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: titleLines[i], size: titleSize, bold: true, color: C.cover.titleColor, font: HEAD_FONT })],
    }));
  }
  if (config.subtitle) {
    children.push(new Paragraph({
      indent: { left: padL }, spacing: { after: 800 },
      children: [new TextRun({ text: config.subtitle, size: 24, color: C.cover.subtitleColor, font: BODY_FONT })],
    }));
  }
  for (const line of (config.metaLines || [])) {
    children.push(new Paragraph({
      indent: { left: padL + 200 }, spacing: { after: 80 },
      border: { left: accentLeft },
      children: [new TextRun({ text: line, size: 24, color: C.cover.metaColor, font: BODY_FONT })],
    }));
  }
  children.push(new Paragraph({ spacing: { before: spacing.bottomSpacing } }));
  children.push(new Paragraph({
    indent: { left: padL, right: padR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: C.accent, space: 8 } },
    spacing: { before: 200 },
    children: [
      new TextRun({ text: config.footerLeft || "", size: 16, color: C.cover.footerColor, font: HEAD_FONT }),
      new TextRun({ text: "                                        " }),
      new TextRun({ text: config.footerRight || "", size: 16, color: C.cover.footerColor, font: HEAD_FONT }),
    ],
  }));
  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: C.bg }, borders: noBorders, children })],
    })],
  })];
}

/* ── хелперы тела ── */
function h1(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160, line: 312 },
    children: [new TextRun({ text: num + ". " + text, bold: true, size: 32, color: P.headingColor, font: HEAD_FONT })],
  });
}
function h2(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120, line: 312 },
    children: [new TextRun({ text: num + ". " + text, bold: true, size: 28, color: P.headingColor, font: HEAD_FONT })],
  });
}
function body(runs) {
  const children = (typeof runs === "string")
    ? [new TextRun({ text: runs, size: 24, color: P.body, font: BODY_FONT })]
    : runs;
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: 480 },
    spacing: { line: 312, after: 80 },
    children,
  });
}
function r(text, opts) { return new TextRun(Object.assign({ text, size: 24, color: P.body, font: BODY_FONT }, opts || {})); }
function bold(text) { return r(text, { bold: true }); }
function caption(text) {
  return new Paragraph({
    keepNext: true, spacing: { before: 160, after: 80, line: 312 },
    children: [new TextRun({ text, bold: true, size: 21, color: P.headingColor, font: HEAD_FONT })],
  });
}
function cell(text, opts) {
  opts = opts || {};
  return new TableCell({
    width: { size: opts.w, type: WidthType.PERCENTAGE },
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined,
    margins: { top: 60, bottom: 60, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      spacing: { line: 276 },
      children: [new TextRun({ text: String(text), bold: !!opts.bold, size: opts.size || 21, color: opts.color || P.body, font: opts.head ? HEAD_FONT : BODY_FONT })],
    })],
  });
}
function table(headers, widths, rows, headerSize) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.table.accentLine },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.table.accentLine },
      left: NB, right: NB,
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: P.table.innerLine },
      insideVertical: NB,
    },
    rows: [
      new TableRow({
        tableHeader: true, cantSplit: true,
        children: headers.map((t, i) => cell(t, { w: widths[i], fill: P.table.headerBg, color: P.table.headerText, bold: true, center: true, head: true, size: headerSize || 21 })),
      }),
      ...rows.map((row, ri) => new TableRow({
        cantSplit: true,
        children: row.map((t, i) => {
          const o = (typeof t === "object") ? t : { text: t };
          return cell(o.text, { w: widths[i], center: o.center, bold: o.bold, fill: o.fill || (ri % 2 === 1 ? P.table.surface : undefined) });
        }),
      })),
    ],
  });
}

/* ── колонтитулы ── */
function pageHeader() {
  return new Header({ children: [new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: P.table.innerLine, space: 4 } },
    children: [new TextRun({ text: "Аудит тем, стилей и анимаций — Legend of Worlds", size: 18, color: "808080", font: HEAD_FONT })],
  })] });
}
function pageFooter() {
  return new Footer({ children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080", font: BODY_FONT })],
  })] });
}

/* ══ содержание (front matter) ══ */
const frontMatter = [
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 240, after: 240 },
    children: [new TextRun({ text: "Содержание", bold: true, size: 32, color: P.headingColor, font: HEAD_FONT })],
  }),
  new TableOfContents("Содержание", { hyperlink: true, headingStyleRange: "1-2" }),
  new Paragraph({
    spacing: { before: 200 },
    children: [new TextRun({ text: "Примечание: содержание собрано на полях; после правок обновите его: правый щелчок → «Обновить поле».", italics: true, size: 18, color: "888888", font: BODY_FONT })],
  }),
];

/* ══ тело отчёта ══ */
const bodyChildren = [];

/* 1. Резюме */
bodyChildren.push(h1("1", "Резюме"));
bodyChildren.push(body([
  r("По запросу владельца проведён аудит тем, стилей и анимаций сайта «Легенда миров» (вики Warcraft III). Проверка выполнена 19 ноября 2026 года после закрытия конвейера палитр, когда на сайте работают неон и пять тем на общем механизме: ашенваль, тёмная, высокий контраст, астральная и зимняя морозная. Аудит охватил 31 файл CSS (23 159 строк вместе с бандлом), 25 файлов JavaScript, 117 HTML-страниц и три унаследованных файла стилей в корне репозитория."),
]));
bodyChildren.push(body([
  bold("Главный вывод: база тем здорова, критических конфликтов не обнаружено."),
  r(" Восемнадцать токенов окружения и тонких поверхностей перекрашены симметрично во всех пяти темах, без пропусков; карта meta theme-color совпадает с фонами всех шести режимов; контраст основного текста лежит в диапазоне 16,2–17,6:1 при пороге доступности 4,5:1; четыре штатных гейта зелёные (4 251 ссылка без битых, тексты чисты, шапка канонична на 115 страницах, счётчики сходятся), чекер тем проходит 46 проверок из 46."),
]));
bodyChildren.push(body([
  r("Одновременно аудит зафиксировал семь групп недоработок, каждая записана в реестр техдолга с ценой закрытия (TD-16 – TD-22, реестр вырос с 7 до 14 строк). Наиболее заметные: мёртвый CSS — блок несуществующего «глобального поиска», полоса прогресса скролла, ripple и cursor-glow, который при этом обещан пользователю в подсказке панели настроек; остатки старого цианового акцента (#55ffff и storage-заливки), вспыхивающие мимо акцента темы; устаревший синий 0,128,255 в свечениях; ступень текста --text-dim ниже порога WCAG AA на пяти темах из шести; анимации раскладки (max-height, width) вместо transform; дубли селекторов между файлами страниц; счётчики главной, продолжающие работать при включённом prefers-reduced-motion."),
]));
bodyChildren.push(body([
  r("Правок кода аудит не вносил: все находки задокументированы в docs/TECH-DEBT.md, журнале сессий (15) и паспорте проекта (12), коммит 3a1443f запушен в main. Рекомендуемый порядок работ и полный реестр приведены в разделах 8 и 9."),
]));

/* 2. Методика */
bodyChildren.push(h1("2", "Методика и охват проверки"));
bodyChildren.push(body([
  r("Статическая часть выполнена разовым скриптом "),
  r("scripts/tmp/audit_themes_styles.py", { font: { ascii: "Courier New", hAnsi: "Courier New" }, size: 22 }),
  r(" (положен в репозиторий вместе с отчётом). Скрипт разбирает базу токенов и все тематические блоки html[data-theme], сверяет симметрию перекраски по темам, сопоставляет карту THEME_COLORS из js/site-settings.js со значениями --bg-rgb, находит цветовые литералы вне токенных зон, строит карту z-index, инвентаризирует @keyframes, бесконечные анимации, transition-свойства и !important, ищет дубли селекторов между файлами и считает контраст WCAG текстовой и статусных шкал на фоне каждой темы."),
]));
bodyChildren.push(body([
  r("Динамическая часть: полный прогон штатных проверок — check-links (117 файлов HTML, 4 251 внутренняя ссылка, 0 битых), check-text (236 файлов, 0 находок), check-header-sync (115 страниц с шапкой, 1 канонический вариант), check-counters (предметы 388, артефакты 222, крипы 25 — сходятся с site-counters.js) и чекера тем scripts/tmp/theme-check.mjs (46 проверок: computed-значения акцентов и фонов всех шести режимов, персистентность выбора, перекрытие разметки ашенволя, мобильный 390, стекло, примерные настройки). Дополнительно просмотрены скриншоты контрольных состояний: items 1280 в астральной и зимней, heroes 1280 в высоком контрасте, главная 1280 в ашенвале."),
]));
bodyChildren.push(body([
  r("За рамками аудита остались: правки кода (аудит только фиксирует), постраничный визуальный обход всех 34 страниц во всех шести режимах (проверены контрольные экраны, остальное покрывают гейты и чекер) и вопрос TD-15 о нейтральных белом и чёрном, который по решению владельца разбирается отдельно с ним."),
]));

/* 3. Состояние системы тем */
bodyChildren.push(h1("3", "Состояние системы тем: что в норме"));
bodyChildren.push(h2("3.1", "Симметрия токенов"));
bodyChildren.push(body([
  r("Каждая тема переопределяет одинаковый набор из 18 токенов: примитив акцента --cyan-rgb, двенадцать триплетов окружения §6 (--bg-rgb, --bg-deep-rgb, --bg-glow-rgb, --container-rgb, --panel-rgb, --surface-rgb, --backdrop-rgb, --steel-rgb, --steel-deep-rgb, --steel-blue-rgb, --panel-raised-rgb, --abyss-rgb) и пять имён тонких поверхностей (--surface-subtle, --surface-subtle-hover, --surface-tag-bg, --surface-tag-border, --surface-tag-active). Пропусков нет: любой токен, перекрашенный в одной теме, перекрашен и в остальных четырёх. Статусные семейства §5 и информационный синий сознательно остаются общими — это зафиксированное решение дизайн-системы, а не дефект."),
]));
bodyChildren.push(h2("3.2", "Переключатель и meta theme-color"));
bodyChildren.push(body([
  r("Карта THEME_COLORS в js/site-settings.js содержит все шесть режимов и совпадает с фактическими фонами: неон #0b0e14 против 11,14,20; ашенваль #09100c против 9,16,12; тёмная #0d0d0f против 13,13,15; высокий контраст #040406 против 4,4,6; астральная #0d0a14 против 13,10,20; зимняя #0e1218 против 14,18,24. Чекер тем подтверждает: семь пилюль в панели, явный выбор перекрывает разметку ашенволя на главной и lore, «по странице» возвращает исходный режим, выбор переживает перезагрузку, мобильная панель открывается из бургера без скролла."),
]));
bodyChildren.push(h2("3.3", "Контраст текста и статусов"));
bodyChildren.push(body([
  r("Текстовая шкала §7 общая для всех тем; таблица ниже показывает контраст каждой ступени на фоне темы (порог WCAG AA для обычного текста — 4,5:1). Значения ступеней MUTED и DIM, попадающие ниже порога, выделены полужирным — это единственная зона риска, разобранная в разделе 4.3."),
]));
bodyChildren.push(caption("Таблица 1. Контраст текстовой шкалы по темам (WCAG, больше — лучше)"));
bodyChildren.push(table(
  ["Тема", "PRIMARY", "STRONG", "SOFT", "SECONDARY", "MUTED", "DIM"],
  [16, 13, 13, 13, 16, 15, 14],
  [
    ["Неон (дефолт)", { text: "16.6", center: true }, { text: "14.5", center: true }, { text: "12.4", center: true }, { text: "7.2", center: true }, { text: "4.6", center: true }, { text: "4.3", center: true, bold: true }],
    ["Ашенваль", { text: "16.6", center: true }, { text: "14.5", center: true }, { text: "12.3", center: true }, { text: "7.2", center: true }, { text: "4.6", center: true }, { text: "4.3", center: true, bold: true }],
    ["Тёмная", { text: "16.7", center: true }, { text: "14.6", center: true }, { text: "12.4", center: true }, { text: "7.3", center: true }, { text: "4.6", center: true }, { text: "4.3", center: true, bold: true }],
    ["Высокий контраст", { text: "17.6", center: true }, { text: "15.4", center: true }, { text: "13.1", center: true }, { text: "7.7", center: true }, { text: "4.8", center: true }, { text: "4.6", center: true }],
    ["Астральная", { text: "16.9", center: true }, { text: "14.7", center: true }, { text: "12.5", center: true }, { text: "7.4", center: true }, { text: "4.6", center: true }, { text: "4.4", center: true, bold: true }],
    ["Зимняя морозная", { text: "16.2", center: true }, { text: "14.1", center: true }, { text: "12.0", center: true }, { text: "7.0", center: true }, { text: "4.4", center: true, bold: true }, { text: "4.2", center: true, bold: true }],
  ],
  18
));
bodyChildren.push(body([
  r("Статусные цвета на всех фонах дают 6,8–8,4:1 (gold-dim, green-muted, info-blue) — запас большой. Контраст акцента темы на её же фоне для UI-элементов также с большим запасом: самый бледный акцент зимней (175,220,255) на фоне 14,18,24 даёт около 11:1."),
]));
bodyChildren.push(h2("3.4", "Визуальная проверка"));
bodyChildren.push(body([
  r("Скриншоты контрольных состояний целостны: астральная и зимняя на «Лавке предметов» читаются без чужих оттенков в каркасных элементах, высокий контраст на списке героев предельно различим, ашенваль на главной держит ночнолесную палитру. Единственное наблюдение вне токенов: растровый баннер главной и иконка приложения остаются фиолетово-космическими в любой теме — картинка не перекрашивается атрибутом темы по определению. Это не дефект кода, а вопрос контента рядом с TD-15: на скриншоте ашенволя артизображение заметно спорит с зелёным каркасом."),
]));

/* 4. Конфликты и утечки тем */
bodyChildren.push(h1("4", "Конфликты и утечки тем"));
bodyChildren.push(h2("4.1", "Остатки старого акцента вне строки TD-2 (TD-17)"));
bodyChildren.push(body([
  r("Долг TD-2 описывает пять токенов тонких поверхностей, которые в неоне держат литерал 0,255,255 вне --cyan-rgb. Аудит нашёл тринадцать живых вхождений того же семейства за пределами этой строки. Семь hex-литералов #55ffff: четыре hover-акцента в info.css (иконки списка, значение статистики, рамка карточки автора, иконки карточек-ссылок), середина пульса logoBorderPulse и hover-иконка quick-link в home.css, градиентная линия под заголовком lore в lore.css. Шесть rgba(0,255,255,…) с альфами 0.03–0.14 — тонкие заливки storage.css."),
]));
bodyChildren.push(body([
  bold("Эффект: "),
  r("в не-неоновых темах эти элементы вспыхивают старым цианом мимо акцента темы. Самый заметный случай — пульс логотипа на главной: рамка дышит от var(--accent-cyan) к #55ffff и обратно, поэтому в астральной теме она дважды за цикл мигает чужим бирюзовым на фиолетовом фоне."),
]));
bodyChildren.push(h2("4.2", "Устаревший информационный синий 0,128,255 (TD-18)"));
bodyChildren.push(body([
  r("Семь живых вхождений старого синего: четыре свечения и orb на страницах калькулятора (calc.css, альфы 0.04–0.05), стоп градиента в home.css и lore.css, items-orb в effects.css (последний задокументирован в §6 как осознанный, остальные четыре места — нет). Плюс #0080ff как второй стоп полосы прогресса скролла — но сам .scroll-progress мёртв (см. раздел 7.1). На астральной и зимней темах синие свечения остаются синими: при альфах 0.03–0.07 эффект слабый, однако это неосознанный остаток — либо он переводится на --info-blue/--cyan-rgb, либо вносится в осознанный список §6."),
]));
bodyChildren.push(h2("4.3", "Текст вне шкалы §7 и доступность (TD-21)"));
bodyChildren.push(body([
  r("Базовый цвет тела в base.css — литерал #e3e9f5, тогда как шкала задаёт --text-primary #e0f0ff. Из-за этого базовый текст не совпадает с первой ступенью шкалы и не реагирует на настройку «Яркий текст» (html[data-text=\"on\"] поднимает токены шкалы, но цвет тела остаётся литералом). Отдельно: ступень --text-dim #5a7a9a даёт 4,2–4,4:1 на пяти темах из шести ниже порога AA 4,5:1 (60 использований, часто это подсказки 0.7rem), а MUTED на зимней — 4,4:1. Рекомендация: поднять ступень примерно до #6480a0, пересчитать зимнюю MUTED и перевести тело на var(--text-primary) — либо осознанно зафиксировать отступление."),
]));
bodyChildren.push(h2("4.4", "Что не является конфликтом"));
bodyChildren.push(body([
  r("Зелёная кнопка «Скачать карту» (--mint) на главной остаётся зелёной во всех темах, статусы предметов не перекрашиваются, маркеры карты и брендовый Discord остаются контентными литералами — это решения §5 и журнала решений, аудит подтверждает их корректную реализацию. Дубли селекторов между бандлом all.css и файлами-источниками — конструкция генератора сборки, а не рассинхрон: бандл пересобирается скриптом и идемпотентен."),
]));

/* 5. Анимации */
bodyChildren.push(h1("5", "Анимации и движение"));
bodyChildren.push(h2("5.1", "Инвентарь и выключатели"));
bodyChildren.push(body([
  r("В живых файлах 87 именованных @keyframes и 41 объявление бесконечной анимации (пульсации орбов, шиммер заголовков, мерцания механик и рун). Движение покрыто двумя глобальными выключателями: медиаправило prefers-reduced-motion: reduce обнуляет длительность и счётчик повторов всех CSS-анимаций и переходов, а настройка «Анимации» (html[data-anim=\"off\"]) полностью отключает animation и transition с !important. Проверка обоих механизмов входит в чекер тем — конфликтов между ними нет, сами правила корректны."),
]));
bodyChildren.push(h2("5.2", "JS-движение (TD-22)"));
bodyChildren.push(body([
  r("requestAnimationFrame живёт в двух местах. В js/index-page.js — счётчики статистики главной: запуск охраняется флагом SiteSettings.get('anim') и стартует только при появлении блока в кадре; но matchMedia('(prefers-reduced-motion: reduce)') не проверяется — у пользователей с вестибулярными нарушениями числа всё равно анимируются, потому что CSS-заглушка гасит только стилевые анимации. В js/tierlist-page.js — разовое удаление призрачного элемента перетаскивания, это не анимационный цикл и охрана ему не нужна. Цена закрытия TD-22 — одна проверка matchMedia рядом с проверкой флага."),
]));
bodyChildren.push(h2("5.3", "Анимации раскладки (TD-19)"));
bodyChildren.push(body([
  r("Transition по свойствам, вызывающим перерасчёт раскладки, обнаружен в 11 группах: аккордеоны на max-height (lore-контент в двух файлах, тела монстров в двух файлах, ответы FAQ, таблица бонусов крипов, спойлеры aibot), бары на width (балансовый дашборд, сравнение в двух вариантах, формульный калькулятор), сдвиг padding-left у пунктов списка info и padding/margin у сетки предметов. Площади маленькие и заметных подтормаживаний нет, однако паттерн разрастается: правильные механизмы — grid-template-rows для аккордеонов, transform: scaleX для баров, translateX для ховер-сдвигов. Отдельная мелочь: у .settings-switch и .settings-theme-btn переход записан как transition: 0.2s без списка свойств — анимируется всё подряд."),
]));

/* 6. Наслоения */
bodyChildren.push(h1("6", "Наслоения и карта z-index"));
bodyChildren.push(body([
  r("Живая карта слоёв выстроена последовательно и конфликтов не имеет. Шапка сайта не является sticky или fixed, поэтому основная масса потенциальных конфликтов «шапка против панелей» отсутствует по определению; мобильная навигация раскрывается в потоке, тоже без z-index."),
]));
bodyChildren.push(caption("Таблица 2. Карта z-index живых и мёртвых слоёв"));
bodyChildren.push(table(
  ["Значение", "Слой", "Состояние"],
  [14, 60, 26],
  [
    [{ text: "-1", center: true }, "Декор под контентом: cursor-glow", "Мёртв (элемента нет)"],
    [{ text: "0", center: true }, "Фоновые орбы и баннеры страниц (::after, ::before)", "Живой"],
    [{ text: "1–3", center: true }, "Содержимое баннеров, бейджи уникальности/WIP, заголовки сравнительных таблиц", "Живой"],
    [{ text: "10", center: true }, "Ripple-эффект и маркеры карты", "Ripple мёртв, маркеры живые"],
    [{ text: "100", center: true }, "Маркер карты при перетаскивании", "Живой"],
    [{ text: "1000", center: true }, "Мобильная кнопка настроек, кнопка «наверх», тосты калькулятора и тирлиста", "Живой"],
    [{ text: "1900/1910", center: true }, "Оверлей и шторка листа предмета", "Живой"],
    [{ text: "2000", center: true }, "Тултип предмета", "Живой"],
    [{ text: "3000", center: true }, "Панель настроек", "Живой"],
    [{ text: "5000", center: true }, "Оверлей «глобального поиска» gs-overlay", "Мёртв (блока нет)"],
    [{ text: "9999", center: true }, "Полоса прогресса скролла", "Мёртв (элемента нет)"],
    [{ text: "10000", center: true }, "Лайтбокс галереи", "Живой"],
  ]
));
bodyChildren.push(body([
  r("Единственный практический нюанс: на мобильных тосты тирлиста и калькулятора (z-index 1000, низ экрана по центру) и круглая кнопка настроек (тот же слой, правый нижний угол) делят нижнюю полосу — на узких экранах длинный текст тоста может подойти вплотную к кнопке. Косметический риск, отдельно фиксировать в реестре не потребовалось. Мёртвые слои 5000 и 9999 искажают карту и уходят вместе с TD-16."),
]));

/* 7. Мёртвый код и дубли */
bodyChildren.push(h1("7", "Мёртвый код и дубли между файлами"));
bodyChildren.push(h2("7.1", "Мёртвый CSS (TD-16)"));
bodyChildren.push(body([
  r("Проверено перекрёстно по всем HTML и JS, включая динамическую сборку имён классов. Блок «глобального поиска» в search.css — 29 селекторов .gs-* — не используется ни разу: фичи нет на страницах, в скриптах и даже в бэклоге. .scroll-progress и .ripple стилизованы, но элементов с такими классами не существует. Правило html[data-fx=\"off\"] .cursor-glow и подсказка тумблера «Тяжёлые эффекты» («декоративные орбы, свечение курсора, неоновые тени текста») ссылаются на несуществующий элемент: тумблер обещает поведение, которого на сайте нет. Кроме того, 36 мёртвых классов из CSS-аудита 8 ноября (footer-social, stat-primary, hero-tips и другие) остались в коде — выборочная проверка подтверждает."),
]));
bodyChildren.push(h2("7.2", "Дубли селекторов между файлами страниц (TD-20)"));
bodyChildren.push(body([
  r("Четыре кластера «одних и тех же» классов живут в двух и более независимых файлах: переключатели колонок balance/creeps (пять селекторов), роли героев balance/effects/guides (восемь), блоки поддержки monsters/manifesto-support/info, детальные карточки hero-mobile/hero-page/search/balance-dashboard/map. Правка такого класса требует ручной синхронизации в нескольких файлах — рассинхрон невидим и проявится только на одной из страниц. Цена закрытия — консолидация в общий файл либо контроль-список при перегенерации карты селекторов css/INDEX.md (связано с открытым TD-10)."),
]));
bodyChildren.push(h2("7.3", "Прочие наблюдения"));
bodyChildren.push(body([
  r("Три унаследованных файла стилей лежат в корне (map.css, aibot.css, info-auto-level.css) и грузятся после бандла — порядок осознанный, но файлы выпадают из инвентаря css/. Служебная site-validator.html живёт без общего бандла — допустимо для инструмента проверки. Тумблер «Звук» — честная заглушка: контента звука нет ни в JS, ни в HTML, подсказка об этом предупреждает."),
]));

/* 8. Улучшения */
bodyChildren.push(h1("8", "Что слабо и что улучшить: приоритеты"));
bodyChildren.push(body([
  r("Находки сведены в три очереди по соотношению эффекта и цены. Первая очередь — то, что видно на темах уже сейчас и закрывается одним заходом. Вторая — гигиена кода, снижающая риск будущих ошибок. Третья — системные заходы по паттернам."),
]));
bodyChildren.push(caption("Таблица 3. Рекомендуемый порядок работ"));
bodyChildren.push(table(
  ["Приоритет", "Работа", "TD", "Эффект и цена"],
  [14, 44, 10, 32],
  [
    [{ text: "P1", center: true, bold: true }, "Перекрасить 13 остатков старого акцента (#55ffff в info/home/lore, заливки storage) на токены", { text: "TD-17", center: true }, "Ховеры и пульс логотипа следуют теме; один заход вместе с закрытием TD-2"],
    [{ text: "P1", center: true, bold: true }, "Поднять ступень --text-dim и зимнюю MUTED, перевести цвет тела на var(--text-primary)", { text: "TD-21", center: true }, "Мелкий текст проходит AA 4,5:1; шкала становится единственным источником текста"],
    [{ text: "P2", center: true, bold: true }, "Снять мёртвый CSS: gs-*, scroll-progress, ripple, cursor-glow, 36 классов из аудита 08.11; переписать подсказку fx", { text: "TD-16", center: true }, "Меньше бандл и честная карта селекторов; computed-сверка после снятия"],
    [{ text: "P2", center: true, bold: true }, "Решить судьбу синего 0,128,255: токен или осознанный список §6", { text: "TD-18", center: true }, "Свечения калькулятора следуют теме либо остаток задокументирован"],
    [{ text: "P3", center: true, bold: true }, "Перевести аккордеоны и бары на grid-template-rows / transform", { text: "TD-19", center: true }, "Движение без перерасчёта раскладки; заход по одному паттерну"],
    [{ text: "P3", center: true, bold: true }, "Консолидировать дубли .col-toggle/.role-*/.support-*/.detail-*", { text: "TD-20", center: true }, "Правка одного класса в одном месте; связать с перегенерацией INDEX (TD-10)"],
    [{ text: "P3", center: true, bold: true }, "Добавить matchMedia prefers-reduced-motion в счётчики главной", { text: "TD-22", center: true }, "Одна проверка; полное покрытие движения для вестибулярных пользователей"],
    [{ text: "P3", center: true, bold: true }, "Долг чанков консолидации: TD-2, TD-3, TD-4, TD-10, TD-15", { text: "—", center: true }, "По плану §10 и решениям владельца"],
  ],
  18
));

/* 9. Реестр техдолга */
bodyChildren.push(h1("9", "Реестр техдолга после аудита"));
bodyChildren.push(body([
  r("По конвенции проекта долги фиксируются в день обнаружения. Аудит пополнил docs/TECH-DEBT.md семью строками; реестр вырос с 7 до 14: двенадцать открытых, один принят (TD-6 — базовый уровень браузеров), один отложен (TD-11 — color-mix до сдвига базового уровня). Ниже — свод; полные формулировки с ценой закрытия — в реестре."),
]));
bodyChildren.push(caption("Таблица 4. Реестр docs/TECH-DEBT.md на 19.11.2026"));
bodyChildren.push(table(
  ["ID", "Суть", "Статус"],
  [10, 70, 20],
  [
    [{ text: "TD-2", center: true }, "Тонкие поверхности неона держат оттенок 0,255,255 вне --cyan-rgb: темы перекрашивают их явно", "Открыт"],
    [{ text: "TD-3", center: true }, "Инлайн-стили HTML: 334 декларации, около 160 продуктовых, с hex-литералами", "Открыт"],
    [{ text: "TD-4", center: true }, "Алиасы --glass-* в :root держатся ради 404.html", "Открыт"],
    [{ text: "TD-6", center: true }, "Браузеры без кастомных свойств не получают темы", "Принят 18.11"],
    [{ text: "TD-10", center: true }, "css/INDEX.md отстал от жизни после переименования стекла", "Открыт"],
    [{ text: "TD-11", center: true }, "color-mix() отложен до сдвига базового уровня браузеров", "Отложен 18.11"],
    [{ text: "TD-15", center: true }, "Нейтральные белый и чёрный вне токенов — решение с владельцем", "Открыт 19.11"],
    [{ text: "TD-16", center: true, bold: true }, "Мёртвый CSS: gs-*, scroll-progress, ripple, cursor-glow, классы 08.11", "Открыт 19.11"],
    [{ text: "TD-17", center: true, bold: true }, "Остатки акцента вне TD-2: #55ffff ×7, заливки storage ×6", "Открыт 19.11"],
    [{ text: "TD-18", center: true, bold: true }, "Старый синий 0,128,255 вне осознанного списка §6", "Открыт 19.11"],
    [{ text: "TD-19", center: true, bold: true }, "Layout-transitions: max-height ×5, width ×4, сдвиги отступами", "Открыт 19.11"],
    [{ text: "TD-20", center: true, bold: true }, "Дубли селекторов между файлами страниц, четыре кластера", "Открыт 19.11"],
    [{ text: "TD-21", center: true, bold: true }, "Доступность текста: dim/muted ниже AA, тело вне шкалы §7", "Открыт 19.11"],
    [{ text: "TD-22", center: true, bold: true }, "Счётчики главной мимо prefers-reduced-motion", "Открыт 19.11"],
  ]
));

/* 10. Заключение */
bodyChildren.push(h1("10", "Заключение и следующие шаги"));
bodyChildren.push(body([
  r("Аудит подтверждает: конструкция тем — один примитив акцента плюс симметричное перекрашивание окружения — выдержала появление пяти палитр без конфликтов и протечек в каркасных элементах. Всё найденное — не поломки механизма, а хвосты прежних эпох: литералы до токенизации, несостоявшиеся фичи, паттерны до появления правил. Это делает найденное дешёвым в закрытии: ни одна из семи новых строк реестра не требует переделки фундамента."),
]));
bodyChildren.push(body([
  r("Рекомендуемый следующий шаг — один заход P1 (TD-17 вместе с закрытием TD-2 и TD-21): три файла-правки, пересборка бандла, скрины пяти тем глазами, снятие сразу трёх строк реестра. Затем по желанию владельца — гигиена P2 (мёртвый CSS и синий) и системные P3. Отдельно с владельцем остаются TD-15 (нейтральные белый и чёрный) и вопрос о растровых артах главной, которые не перекрашиваются темами. Материалы аудита: скрипт scripts/tmp/audit_themes_styles.py, реестр docs/TECH-DEBT.md, журнал SESSIONS (15), паспорт PROJECT-META (12), коммит 3a1443f в main."),
]));

/* ══ сборка документа ══ */
const pgSize = { width: 11906, height: 16838 };
const pgMargin = { top: 1440, bottom: 1440, left: 1701, right: 1417 };

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: BODY_FONT, size: 24, color: P.body },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: {
        run: { font: HEAD_FONT, size: 32, bold: true, color: P.headingColor },
        paragraph: { spacing: { before: 360, after: 160, line: 312 }, outlineLevel: 0 },
      },
      heading2: {
        run: { font: HEAD_FONT, size: 28, bold: true, color: P.headingColor },
        paragraph: { spacing: { before: 240, after: 120, line: 312 }, outlineLevel: 1 },
      },
    },
  },
  sections: [
    { /* обложка */
      properties: { page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: buildCoverR1({
        title: "Аудит тем, стилей и анимаций",
        subtitle: "Legend of Worlds — энциклопедия Warcraft III (DarkDaro/legend-of-worlds-war3)",
        englishLabel: "THEME AND STYLE AUDIT",
        metaLines: [
          "Дата: 19 ноября 2026 года",
          "Коммит аудита: 3a1443f (main, запушен)",
          "Методика: скрипт-аудит, гейты, theme-check (46), скрины тем",
        ],
        footerLeft: "Legend of Worlds",
        footerRight: "2026-11-19",
        palette: P,
      }),
    },
    { /* содержание — римские */
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } },
      },
      headers: { default: pageHeader() },
      footers: { default: pageFooter() },
      children: frontMatter,
    },
    { /* тело — арабские с 1 */
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: { default: pageHeader() },
      footers: { default: pageFooter() },
      children: bodyChildren,
    },
  ],
});

const OUT = "/home/z/my-project/download/Аудит_тем_стилей_и_анимаций_2026-11-19.docx";
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("OK: " + OUT + " (" + buf.length + " bytes)");
});
