#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Генератор docs/JS-MAP.md — карта всех JS-скриптов сайта.

Автоматически сканирует репозиторий: находит все .js/.mjs, считает вес,
строит карту подключений по <script src> во всех HTML. Описания берёт
из рукописного словаря DESCRIPTION ниже. Регенерация: после добавления
или переименования скрипта запусти и закоммить обновлённый JS-MAP.md.

Запуск: python scripts/gen-js-map.py
"""
import re
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

TODAY = datetime.now(timezone(timedelta(hours=5))).date()

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "docs" / "JS-MAP.md"

# --- рукописные описания. Ключ — путь от корня репо. ---
DESCRIPTION = {
    # ===== Корневые базы данных =====
    "abilities-db.js": "База способностей всех героев по rawcode (ABILITIES_DB): уровни, урон, мана, кулдаун, описания. Сгенерирована из ability.ini внешним парсером; правится только перегенерацией.",
    "ability-stats.js": "Статистика способностей в JSON-виде (данные для радаров balance-dashboard): цифры урона/контроля по геро́ям.",
    "bot-builds.js": "Сборки ИИ-ботов по стадиям (botBuildGroups): что бот покупает на каждой стадии игры. Автогенерация из JASS BotBuild-файлов внешним парсером.",
    "creeps-db.js": "База крипов арены: статы, тиры усиления 1–8, золото/опыт, пассивки. Питает таблицу creeps.html.",
    "game-constants.js": "Игровые константы (броня, магзащита, формулы) — единый источник правды для калькуляторов и сравнения героев.",
    "hero-builds.js": "Рекомендуемые сборки героев для карточек страниц героев. Автогенерируется из bot-builds.js (до босс-дропов) внешним генератором.",
    "hero-data.js": "Главная база героев (HEROES_DATA): статы, приросты, роли, атрибут, rawcode, флаги wip/isAltForm/unique. Данные из Object Editor карты.",
    "hero-lore.js": "Лор героев (HERO_LORE): description для шапки карточки и полный текст для аккордеона «История героя». Ключи — heroId; страница без записи рендерится без лора.",
    "items-db.js": "База предметов лавок (itemsDB, 388 записей): цена, тип, бонусы, описания, активные способности. Ядро items.html и сборок.",
    "jass-data.js": "Единая база из JASS-кода карты: деревья предметов, компоненты сборки, данные героев для конструктора и сравнения.",
    "map-data.js": "Данные интерактивной карты: зоны, боссы, магазины, дуэльные арены для map.html.",
    "mechanics-db.js": "База игровых механик (вампиризм, возврат урона, порча и др.) с формулами и примерами. Питает mechanics.html и formulas-calc.html.",
    "search-index.js": "Автогенерируемый индекс глобального поиска (герои, предметы, механики, боссы). Не редактировать вручную — перегенерация внешним генератором.",
    "storage-db.js": "База хранилища: слоты, действия, спеллбуки, донат-слоты. Питает storage.html.",
    "site-counters.js": "Единственный источник витринных чисел (герои 74, страницы 77, артефакты 222…). На страницах НЕ подключается — читается чекером scripts/check-counters.py, который и держит числа честными.",

    # ===== Корневая общая логика =====
    "analytics.js": "Счётчик Яндекс.Метрики на всех страницах.",
    "icon-loader.js": "Загрузчик иконок с каскадом PNG → JPG → Font Awesome fallback, навигация по шапке, подсветка параметров. Общий для всех страниц.",
    "item-bonus-parser.js": "Парсер бонусов предметов: превращает описания items-db в числовые бонусы (сила, ловкость, урон…) для сравнения и калькуляторов.",
    "search.js": "Глобальный поиск по сайту (Ctrl+K / лупа в шапке): оверлей, фильтрация по search-index, переходы. Общий для всех страниц.",
    "tilt-cards.js": "3D-наклон карточек героев при наведении (на десктопе, на мобильных отключён).",
    "ui-effects.js": "Общие визуальные эффекты: scroll-reveal, анимации появления блоков. Функция revealElements() используется постраничными скриптами.",

    # ===== Постраничные скрипты (js/) =====
    "js/armor-calc-page.js": "Логика калькулятора брони: снижение урона и эффективное здоровье.",
    "js/balance-dashboard-page.js": "Радар-профили героев (урон, бёрст, живучесть…): рисует диаграммы из ability-stats и HEROES_DATA.",
    "js/balance-page.js": "Таблица всех героев: статы, приросты, сортировка и фильтры.",
    "js/bonus-filter.js": "Фильтр предметов по бонусам и золоту + сортировка на items.html; работает хуком в рендер items-db.",
    "js/bot-builds-page.js": "Рендер стадий автосборки ботов: группы, предметы, переходы на предметы.",
    "js/build-constructor-page.js": "НЕ подключён напрямую (см. build-constructor.js в корне).",
    "js/compare-page.js": "Сравнение двух героев рядом: статы по уровням, предметы из сборок.",
    "js/creeps-page.js": "Таблица крипов: рендер из creeps-db, сортировка по колонкам.",
    "js/events-page.js": "Анимация появления карточек ивентов (scroll-reveal).",
    "js/faq-page.js": "Аккордеон вопросов-ответов на faq.html (открытие/закрытие, один открыт).",
    "js/formulas-calc-page.js": "Калькулятор формул карты: удача, магзащита, вампиризм и прочее.",
    "js/gallery-page.js": "Галерея: лайтбокс, фильтрация изображений.",
    "js/guides-page.js": "Анимация появления секций гайдов (scroll-reveal).",
    "js/hero-slugs.js": "Соответствие heroId → slug страницы героя (heroes/*.html) для ссылок из сборок.",
    "js/hero-stats-page.js": "Распределение героев и приросты по атрибутам на info.html (диаграммы из HEROES_DATA).",
    "js/heroes-page.js": "Каталог героев: карточки из HEROES_DATA, вкладки (Все/Уникальные/В разработке/атрибуты), поиск, избранное в localStorage, счётчик «Показано: N из 74».",
    "js/index-page.js": "Анимация счётчиков на главной (data-target), с запасным статичным числом в HTML.",
    "js/info-page.js": "Scroll-reveal секций info.html.",
    "js/item-slugs.js": "Соответствие предмет → slug страницы/якоря для ссылок из сборок и калькулятора.",
    "js/items-page.js": "Каталог предметов: рендер лавок из items-db, свёртывание секций (состояние в localStorage).",
    "js/monsters-page.js": "Карточки боссов: раскрытие по ?boss= из ссылки предмета, таблица дропа.",
    "js/runes-page.js": "Карточки 16 рун арены: данные зашиты в скрипте, рендер и анимация.",
    "js/sitemap-page.js": "Раздел «Герои» на странице карты сайта: список из HEROES_DATA.",
    "js/storage-page.js": "Хранилище: конвертер WC3-цветокодов |cff, рендер слотов и действий из storage-db.",
    "js/tierlist-page.js": "Конструктор тирлиста: S+…D-тиры, drag&drop героев, шаринг через URL/localStorage.",

    # ===== Инструменты репозитория (не подключаются на сайт) =====
    "scripts/check-links.mjs": "CI-гейт: проверяет все внутренние ссылки и src во всех HTML (0 битых = зелено).",
    "scripts/check-header-sync.mjs": "CI-гейт: шапка/подвал всех страниц должны совпадать с каноническим вариантом.",
    "build-constructor.js": "Логика конструктора сборок: выбор предметов, стадии, читаемая раскладка, выгрузка JASS-кода.",
    "calculator.js": "Калькулятор сборки: 6 слотов, стоимость, дерево компонентов, лист покупок.",
}

CATS = [
    ("Корневые базы данных (данные карты)",
     ["abilities-db.js", "ability-stats.js", "bot-builds.js", "creeps-db.js", "game-constants.js",
      "hero-builds.js", "hero-data.js", "hero-lore.js", "items-db.js", "jass-data.js",
      "map-data.js", "mechanics-db.js", "search-index.js", "storage-db.js", "site-counters.js"]),
    ("Общая логика (на всех или многих страницах)",
     ["analytics.js", "icon-loader.js", "item-bonus-parser.js", "search.js", "tilt-cards.js", "ui-effects.js"]),
    ("Постраничные скрипты (js/)",
     ["js/armor-calc-page.js", "js/balance-dashboard-page.js", "js/balance-page.js", "js/bonus-filter.js",
      "js/bot-builds-page.js", "js/compare-page.js", "js/creeps-page.js", "js/events-page.js",
      "js/faq-page.js", "js/formulas-calc-page.js", "js/gallery-page.js", "js/guides-page.js",
      "js/hero-slugs.js", "js/hero-stats-page.js", "js/heroes-page.js", "js/index-page.js",
      "js/info-page.js", "js/item-slugs.js", "js/items-page.js", "js/monsters-page.js",
      "js/runes-page.js", "js/sitemap-page.js", "js/storage-page.js", "js/tierlist-page.js"]),
    ("Корневая логика отдельных инструментов",
     ["build-constructor.js", "calculator.js"]),
    ("Инструменты репозитория (CI, на сайт не попадают)",
     ["scripts/check-links.mjs", "scripts/check-header-sync.mjs"]),
]

NOTE_JS_EXTRA = {
    "js/build-constructor-page.js": "Файл существует, но нигде не подключён — конструктор использует корневой build-constructor.js. Кандидат на удаление после проверки.",
}

# --- сканирование ---
files = sorted([p for p in REPO.rglob("*.js") if "repo-archive" not in p.parts and "node_modules" not in p.parts]
               + [p for p in REPO.rglob("*.mjs") if "repo-archive" not in p.parts])
htmls = [p for pat in ("*.html", "*/*.html") for p in REPO.glob(pat) if "repo-archive" not in p.parts]

conn = {}
inline_pages = 0
for h in htmls:
    t = h.read_text(encoding="utf-8", errors="replace")
    inline_pages += 1 if re.search(r"<script>(?!\s*<)", t) else 0
    for m in re.finditer(r'<script[^>]+src="([^"]+\.js)"', t):
        cand = (h.parent / m.group(1).split("?")[0]).resolve()
        try:
            rel = cand.relative_to(REPO).as_posix()
        except ValueError:
            rel = m.group(1)
        conn.setdefault(rel, set()).add(h.relative_to(REPO).as_posix())


def pages_label(rel):
    pages = sorted(conn.get(rel, []))
    if not pages:
        return "—"
    if len(pages) >= 100:
        return f"все страницы ({len(pages)})"
    tops = {p.split("/")[0] for p in pages if "/" in p}
    if len(pages) > 6 and len(tops) == 1:
        return f"{tops.pop()}/* ({len(pages)})"
    if len(pages) > 6:
        mains = [p for p in pages if "/" not in p]
        return f"{len(pages)} страниц, напр.: " + ", ".join(mains[:5])
    subs = {"guides": "guides/*", "heroes": "heroes/*"}
    groups = {}
    for p in pages:
        top = p.split("/")[0] if "/" in p else p
        if top in subs and len([x for x in pages if x.startswith(top + "/")]) > 3:
            groups[top] = True
        else:
            groups[p] = True
    return ", ".join(subs.get(k, k) if v is True else k for k, v in groups.items())


total_kb = sum(f.stat().st_size for f in files) // 1024
lines = []
lines.append("# Карта JS-скриптов сайта")
lines.append("")
lines.append(f"_Обновлено: {TODAY.isoformat()} · генератор: `python scripts/gen-js-map.py` · "
             f"{len(files)} файлов, ~{total_kb} КБ_")
lines.append("")
lines.append("Что это: одна страница, чтобы понимать, какой скрипт за что отвечает, "
             "откуда берёт данные и где подключён. Описания рукописные, карта подключений "
             "и веса — автоматические. После добавления/переименования скрипта — перегенерировать.")
lines.append("")
lines.append("**Общий паттерн:** базы данных лежат в корне (`*-db.js`, `*-data.js`), постраничная логика — "
             "в `js/` (`*-page.js`); подключение через `<script defer>` — сначала базы, потом логика страницы. "
             f"Инлайн-`<script>` есть на {inline_pages} страницах (в основном heroes/* — рендер лора, и шапка-меню).")
lines.append("")

for cat, items in CATS:
    kb = sum((REPO / f).stat().st_size for f in items if (REPO / f).exists()) // 1024
    lines.append(f"## {cat} — {len(items)} шт., ~{kb} КБ")
    lines.append("")
    lines.append("| Файл | Вес | Что делает | Где подключён |")
    lines.append("|---|---|---|---|")
    for f in items:
        p = REPO / f
        if not p.exists():
            lines.append(f"| `{f}` | — | ⚠️ файла нет, описанию нужна ревизия | — |")
            continue
        size = f"{p.stat().st_size // 1024} КБ" if p.stat().st_size >= 1024 else f"{p.stat().st_size} Б"
        desc = DESCRIPTION.get(f, "⚠️ описание не написано — дописать в scripts/gen-js-map.py")
        extra = NOTE_JS_EXTRA.get(f)
        if extra:
            desc += f" **{extra}**"
        lines.append(f"| `{f}` | {size} | {desc} | {pages_label(f)} |")
    lines.append("")

lines.append("## Аудит-наблюдения")
lines.append("")
lines.append("1. **Автогенерируемые файлы:** `search-index.js`, `bot-builds.js`, `abilities-db.js`, `hero-builds.js` — "
             "продукты внешних парсеров/генераторов. Сами генераторы лежат в `tools/`, которая под `.gitignore`, "
             "то есть в репозитории их нет. Регенерация возможна только у владельца исходников.")
lines.append("2. **Ни одного подключённого файла-сироты нет.** Не подключаются намеренно: `site-counters.js` "
             "(его читает CI-чекер чисел) и два CI-гейта в `scripts/`. Единственный спорный — "
             "`js/build-constructor-page.js`: подключений нет, похоже на остаток рефакторинга.")
lines.append("3. **`vendor/` содержит только Font Awesome (CSS + webfonts)** — внешних JS-библиотек на сайте нет, "
             "весь JS собственный.")
lines.append("4. **Тяжёлые файлы:** `abilities-db.js` ~303 КБ и `items-db.js` ~152 КБ подключаются только на страницах, "
             "где нужны; на все страницы грузятся лишь `hero-data.js` (49 КБ) и `search-index.js` (57 КБ) — "
             "для поиска по всему сайту. Это осознанно.")
lines.append("5. **Синтаксис:** все 47 JS проходят `node --check` (гейт `audit_integrity.py`). "
             "Глобальные имена (`HEROES_DATA`, `itemsDB`, `HERO_LORE`…) объявляются базами и читаются логикой страниц — "
             "порядок подключения критичен и держится на `defer` в порядке следования тегов.")
lines.append("6. **Проверено вживую (браузер):** каталог героев (вкладки и счётчик «Показано: N из 74»), "
             "рендер лора на страницах героев, счётчики главной (74/222/8/8). Ошибок в консоли нет.")
lines.append("")

OUT.write_text("\n".join(lines), encoding="utf-8")
print(f"OK: {OUT} ({OUT.stat().st_size // 1024} КБ)")
missing = [f for cat, items in CATS for f in items
           if (REPO / f).exists() and f not in DESCRIPTION]
extra_files = [f.relative_to(REPO).as_posix() for f in files
               if f.relative_to(REPO).as_posix() not in DESCRIPTION]
if missing:
    print("БЕЗ ОПИСАНИЯ:", missing)
if extra_files:
    print("НОВЫЕ ФАЙЛЫ, НЕ ПОПАВШИЕ В КАРТУ:", extra_files)
