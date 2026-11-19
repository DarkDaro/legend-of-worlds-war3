# CSS Index — HeroData

Если ты читаешь это как человек, а не как я в будущем: ниже карта файлов, токенов и селекторов для правок. Перегенерирована 19.11 по факту (TD-10 закрыт): порядок бандла, реальные размеры, строки именных разделов проверены grep'ом. Системный обзор палитры, стекломорфизма, эффектов, контейнеров и брейкпоинтов — `docs/DESIGN.md`.

## Как грузится CSS — два слоя

1. **Ядро-бандл `css/all.css`** — конкатенация 15 файлов по порядку `@import` из `repo-archive/style.css`. Генератор: `python3 scripts/build-css-bundle.py` (после правки любого css/*.css из ядра — перезапустить). Подключён на всех 116 продуктовых страницах.
2. **Постраничные файлы** — своей ссылкой после бандла: armor-calc, balance, balance-dashboard, bot-builds, compare, creeps, events, faq, formulas-calc, gallery, guides (×7 guide-*.html), manifesto-support (manifesto + support), runes, sitemap-page, storage, tierlist. Плюс корневые: `aibot.css`, `map.css`, `info-auto-level.css` (info + manifesto).

Правка постраничного файла в бандл не попадает — бандл пересобирать не нужно. Правка файла ядра без пересборки на сайт не уедет.

## Ядро-бандл (15 файлов)

| Файл | Размер | Зона ответственности |
|------|--------|----------------------|
| `base.css` | 25.0 KB | Ресеты, переменные: примитивы `--cyan-rgb`/`--subtle-rgb`/окружения/статусов, семантика, тексты, темы `html[data-theme]`, `body`, `.wiki-container`, заголовки |
| `glass.css` | 2.6 KB | Материал стекла: токены `--surface-*`, выключатель `data-glass="off"` |
| `hero-grid.css` | 6.7 KB | heroes.html: фильтры, сетка героев, карточки, бейджи атрибутов |
| `hero-page.css` | 19.1 KB | heroes.html (детали): навигация, иконка, статы, способности, билды, советы |
| `hero-mobile.css` | 3.5 KB | Мобайл-оверрайды страницы героя |
| `lore.css` | 10.1 KB | lore/modes: лор, режимы, **шапка и навигация всего сайта** |
| `mechanics.css` | 31.2 KB | Механики, чейнджлог, карты механик |
| `monsters.css` | 13.6 KB | Монстры, боссы, дропы, способности |
| `home.css` | 16.1 KB | index.html: баннер, кнопки, статистика, быстрые ссылки |
| `info.css` | 23.3 KB | Инфо-страницы: гайды-обзор, автор, ссылки, таймлайн |
| `header-mobile.css` | 2.5 KB | Мобайл-шапка, гамбургер |
| `items.css` | 31.8 KB | items.html: сетка, карточки, детали, дерево компонентов, **бейджи**, bottom sheet |
| `effects.css` | 10.9 KB | Общие эффекты: роли, статы, карточки (hero-card, item-card, stat-box), футер |
| `calc.css` | 25.2 KB | Калькуляторы: слоты, результаты, дерево рецептов, каталог |
| `search.css` | 22.9 KB | Глобальный поиск, build-constructor |

Размеры фактические на 19.11 (бандл 245.4 KB). Позже = выше приоритет при одинаковой специфичности.

## Токены: где жить

| Токен | Где определён | Что красит |
|---|---|---|
| `--cyan-rgb` | base.css `:root`, темы перекрашивают | Акцент: свечения, рамки поверхностей, шиммер (DESIGN §3) |
| `--subtle-rgb` | base.css `:root`, темы перекрашивают | Тонкие поверхности — резерв шкалы `0,255,255` (TD-2 закрыт 19.11) |
| `--bg-*`, `--panel-*`, `--steel-*`, `--surface-rgb`, `--abyss-rgb`, `--info-rgb` | base.css `:root`, темы перекрашивают | Окружение (DESIGN §6) |
| `--red/gold/violet/green/mint/…-rgb` | base.css `:root`, темы **не** перекрашивают | Статусные семейства контента (DESIGN §5) |
| `--surface-bg/-solid/-blur/-border` | glass.css `:root`; `data-glass="off"` глушит blur и уплотняет фон | Стекломорфизм (DESIGN §4) |
| `--surface-subtle/-subtle-hover/-tag-bg/-tag-border/-tag-active` | glass.css `:root`, читают `--subtle-rgb` | Тонкие фоны подзаголовков, кнопок, тегов; контраст — исключение с удвоенными альфами (base.css, блок темы) |
| `--glass-bg/-blur/-border/…` | base.css `:root` — алиасы старых имён | Только 404.html инлайн; закрываются чанком P10 (TD-4) |
| `--text-primary … --text-dim` | base.css `:root`, панель настроек светлит | Текстовая шкала (DESIGN §7) |

Новые темы: перекрасить `--cyan-rgb`, `--subtle-rgb`, окружение — точечно по precedent'у (DESIGN §11).

## Ключевые селекторы — где искать

### Бейджи предметов (detail-badge)
**ВСЕ в `items.css` (408-441)**
- `.detail-badges` (408) — контейнер
- `.detail-badge` (414) — базовый стиль (pill, glass bg)
- `.badge-danger` (425), `.badge-unique` (431), `.badge-class` (438)

**Мобайл-оверрайды**: `hero-mobile.css:26` (для героев), `items.css` @media ~823/910 (для предметов)

### Карточки предметов
- `.item-card` — `items.css:555` + `effects.css:76` (общий hover/glow)
- `.item-icon`, `.item-name` — `items.css`
- Редкость: `.item-card.rarity-cheap/-mid/-expensive` — `items.css:590-595` (прозрачность и тень имени)

### Детальная панель предмета
- `.item-detail-panel` — `items.css:25`
- `.detail-icon`, `.detail-title` — `hero-page.css:79/106` (базовые), `items.css` @media (оверрайды)
- `.detail-description` — `hero-page.css:113`
- `.recipe-title` — `hero-page.css:185`
- `.cost-badges`, `.cost-badge` — `items.css:383-402`
- Bottom sheet: `.item-sheet-overlay` (55), `.item-bottom-sheet` (70) — `items.css`

### Дерево компонентов
- `.component-tree` (122), `.tree-toggle` (133), `.component-item` (158) — `items.css:122-202`

### Карточки героев
- `.hero-card` — `effects.css:73` + `hero-grid.css:69`
- `.hero-attr-badge`, `.unique-badge`, `.wip-badge` — `hero-grid.css`

### Общие (effects.css)
- `.hero-card`, `.item-card`, `.stat-box`, `.quick-link-card` — hover/glow эффекты
- `.role-*` (18-25) — базовые бейджи ролей; табличные — `balance.css`, гайдовые — `guides.css` (см. контроль-список ниже)
- `.stat-*` — цвета статов
- `.version-card`, `.site-footer` — футер и версии

### Шапка и навигация (всего сайта)
- `.site-header` (229), `.logo` (245), `.nav-link` (297) — `lore.css:229-326`
- Мобайл-оверрайды — `header-mobile.css`

## Контроль-список дублей (TD-20, чанк P6)

Правка «одного и того же класса» требует проверки во всех файлах списка — при перегенерации этой карты тоже:

| Семейство | Файлы (вхождений) | Комментарий |
|---|---|---|
| `.col-toggle*` | `balance.css` ×8, `creeps.css` ×8 | Тумблеры колонок таблицы: двойное обслуживание |
| `.role-*` | `effects.css` ×8 (база), `balance.css` ×23 (таблица), `guides.css` ×10 (внутри `.guide-hero-role`) | Базу править аккуратно — таблица и гайды держат свои значения |
| `.support-*` | `monsters.css` ×12, `manifesto-support.css` ×13, `info.css` ×19 | Три страницы, одна лексика |
| `.detail-*` | `hero-page.css` ×7, `hero-mobile.css` ×6, `balance-dashboard.css` ×4, `map.css` ×4, `search.css` ×1 | Самое расползшееся семейство; `search.css` — одиночка |

Статус дублей консолидируется чанком P6 — путь (общий файл или контроль-список) выбирает владелец.

## Правила
- Бейджи (`detail-badge`, `badge-*`) — **только в items.css**, не дублировать
- Общие эффекты (hover, glow) — `effects.css`
- Страница-специфичные стили — в своём файле; правки ядра — через пересборку бандла
- Мобайл-оверрайды — в том же файле через `@media`
- Дубли из контроль-списка — проверять во всех указанных файлах за один заход
