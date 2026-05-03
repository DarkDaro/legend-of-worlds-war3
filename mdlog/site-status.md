# HeroData — Site Status

## Last updated: 2026-05-02

## Mobile Adaptation Status

### ✅ Done
| Page | Status | Notes |
|------|--------|-------|
| index.html | ✅ | Banner, stats (clickable), quick-links, footer responsive |
| heroes.html | ✅ | Grid 6→2 cols, hero cards responsive |
| heroes/*.html | ✅ | Ability cards, params, scepter, back-button, build grid, tips |
| items.html | ✅ | Tabs horizontal scroll, detail panel below |
| mechanics.html | ✅ | Grid 2→1 col |
| guides.html | ✅ | Uses mechanic-card (already responsive) |
| info.html | ✅ | Stats grid, guides grid |
| support.html | ✅ | Banner, logo responsive |
| lore.html | ✅ | Timeline dot fix |
| updates.html | ✅ | Version cards stack naturally |
| changelog.html | ✅ | Same as updates |

### 🔧 Fixed This Session (v3.7)
1. **Hamburger menu** — icon-loader.js injects hamburger-btn, nav hidden on ≤600px, slides open
2. **Item tabs** — horizontal scroll with thin scrollbar on ≤800px, no more wrapping
3. **Banner margins** — negative margin reduced on mobile (prevents horizontal scroll)
4. **Guides** — code word-break added, mechanic-card already responsive
5. **Breadcrumbs** — overflow: hidden + text-overflow: ellipsis on narrow screens
6. **Lore timeline** — dot position fixed on ≤500px, margin-left adjusted
7. **icon-loader.js** — hero detail icon now auto-detects heroes/ subfolder and adds ../ prefix
8. **Stat boxes** — index.html stat boxes are now clickable <a> links to respective pages
9. **Item favorites** — items page now supports `itemFavorites` in localStorage, heart toggles on cards, and a dedicated favorites tab.
10. **Hero build item links** — build slots now open items through `items.html?item=ID` instead of hash anchors, so item detail opens more reliably.
11. **Item detail favorite toggle** — the detail panel now has its own heart button in the header, matching the card-level favorites state.
12. **Hero card standardization started** — `blademaster.html` moved to the shared ability-icon loader convention (`.ability-icon[data-ability]`).
13. **Hero scope note** — only paladin, admiral, and druid are currently in the custom-card set; untouched hero pages stay on the base template until explicitly requested.
14. **Hero card generator** — `generate-hero-cards.js` now reads `hero-card-data.js` and writes safe draft pages to `generated-heroes/` instead of overwriting live hero pages.
15. **Forms example** — `generated-heroes/druid.html` now demonstrates multi-form rendering with tab switching and the shared icon loader.
16. **Hero card generator note** — `generate-hero-cards.js` + `hero-card-data.js` exist as a separate future tool; they write drafts to `generated-heroes/` and do not touch live hero pages.
17. **Items grid collapse** — `items.html` now stores collapsed category state per section in `localStorage`, restores it on load, and shows a visible collapse button on each shop header so the toggle is obvious again. The button is anchored to the right side of the header so long shop names do not hide it.
18. **Header spacing fix** — `.site-header` now has a card-like frame, more internal padding, and an earlier 900px stack breakpoint so logo/navigation do not press against the border on mid-size screens.

### 🎨 Hero Card Improvements (v3.7)
1. **Name format** — "Имя — Прозвище" (Светозар — Паладин, Прохор — Адмирал)
2. **Hotkey badge** — enlarged 28px, cyan glow, orange for ultimate, purple for passive
3. **Recommended items** — 6-slot build grid (.hero-build-grid), emoji icons, links to items.html
4. **Тактика** — combat strategy section (.hero-tips), ability usage combos
5. **Советы** — tips section, counters, warnings, late-game notes
6. **Implemented on** — paladin.html, admiral.html, druid.html. The rest remain on the base template and are not being manually standardized yet.

### ⏳ On Hold
- **Items page preview** — 3 variants tested (tooltip, panel, bottom sheet), user deciding. Test page: test-item-preview.html
- **Monsters page** — raw/incomplete, skip for now
- **Emoji fallback in itemIcon()** — long-press shows raw emoji, needs FA icon fallback
- **Ability icon standardization** — agreed to use a shared loader in `icon-loader.js` instead of manual `<img>` tags in every hero card. Target format: `.ability-icon[data-ability]` → `images/abilities/<heroId>_<ability>.png` with JPG + FA fallback.

### ❌ Known Issues
- Monster page: 2 of 33 icons, 6 of 8 bosses are stubs
- Hero portraits: only 5 of ~20 (admiral, paladin, archmage, farseer, darkranger)
- Ability icons: only 6 (paladin + admiral)
- Analytics: Yandex Metrika counter ID pending
- Build slots link to items.html in general — no anchor navigation to specific item yet

## File Structure
```
HeroData/
├── index.html          (main landing page, clickable stat boxes)
├── heroes.html         (hero grid + filter)
├── items.html          (item catalog + detail panel)
├── mechanics.html      (17 mechanic + 9 mode cards)
├── guides.html         (5 beginner guides)
├── monsters.html       (8 bosses + 18 creeps, incomplete)
├── info.html           (about, stats, installation)
├── lore.html           (5 epochs, Dragon Daro)
├── support.html        (donation, social links)
├── updates.html        (recent versions)
├── changelog.html      (full version archive)
├── style.css           (all styles, ~2700 lines)
├── icon-loader.js      (hamburger menu, scroll-top, param highlight, hero icons with ../ auto-fix)
├── items-db.js         (item rendering logic + grids, depends on items-data.js)
├── items-data.js       (PLANNED: item DB + utilities, shared by items.html and hero pages)
├── hero-builds.js      (PLANNED: hero→item mapping + render function)
├── analytics.js        (template, awaiting counter ID)
├── heroes/             (21 hero card HTML files)
│   ├── paladin.html    (FULL: portrait, 5 abilities, build, tactics, tips)
│   ├── admiral.html    (FULL: portrait, 5 abilities, build, tactics, tips)
│   ├── druid.html      (FULL: 5 abilities, build, tactics, tips, emoji icons, no portrait yet)
│   └── bemo card/      (3 template cards)
├── images/
│   ├── heroes/         (5 portraits)
│   ├── items/          (~100 item icons)
│   ├── abilities/      (6 ability icons)
│   ├── creeps/         (creep icons)
│   └── logo.png, preview.png
├── map/
│   └── test.w3x        (map download)
├── mdlog/              (project notes, scripts, research)
└── test-item-preview.html (items mobile preview test)
```

## CSS Breakpoints
- 1200px: hero grid 5 cols
- 900px: hero grid 4 cols
- 800px: mechanics 1 col, items column + tabs scroll, info stats 2 cols, banners reduced
- 700px: hero grid 3 cols, hero page card compact, build grid 3 cols
- 600px: hamburger menu, body padding reduced
- 500px: hero grid 2 cols, banners small, timeline dot fix
- 480px: hero ability icons 40px, badges tiny, build icons 36px

## Hero Card Template (standard for new heroes)
```
1. Breadcrumbs: Главная › Герои › Прозвище — Имя
2. Panel header: portrait + "Прозвище — Имя" + attribute badge
3. Hero stats: attack range, attribute, speed, role
4. Stats table: STR/INT/AGI + values + growth
5. Description: 1-2 sentences of lore
6. Recommended build: 6 items in .hero-build-grid (JS-rendered, see backlog)
7. Тактика: ability usage, combos, positioning
8. Советы: counters, warnings, late-game tips
9. Abilities: Q/W/E/R/F with icons, params, tags
10. Back button → heroes.html
```

## 📋 Backlog (Return Later)

### items-data.js + hero-builds.js (JS-рендер сборок героев)
**Статус:** Запланировано, НЕ начато
**Причина:** Большой рефакторинг — решили сделать правильно сразу, но задача оказалась слишком объёмной для одного подхода. Нужна отдельная сессия.

**Цель:**
- Извлечь `itemsDB` + `itemIcon()` + утилиты в отдельный файл `items-data.js` (~300 строк)
- Создать `hero-builds.js` с маппингом герой→[itemIds] и функцией рендера
- На страницах героев: слоты предметов рисуются автоматически из ID, иконки берутся из items-db
- Ссылка на предмет: `items.html#<itemId>` (нужна поддержка якорей в items.html)

**Файлы:**
| Файл | Действие |
|------|----------|
| `items-data.js` | **NEW** — itemsDB + itemIcon + утилиты |
| `hero-builds.js` | **NEW** — heroBuilds + renderHeroBuild() |
| `items-db.js` | **EDIT** — убрать дублированные данные (оставить grids + рендер) |
| `items.html` | **EDIT** — добавить `<script src="items-data.js">` перед items-db.js |
| `heroes/*.html` | **EDIT** — заменить ручной HTML сборки на `#hero-build` контейнер + скрипты |

**План:**
1. Создать `items-data.js` — скопировать itemsDB из items-db.js + утилиты (calculateItemCost, findUsedIn, itemIcon, getRecipeCost)
2. Создать `hero-builds.js`:
   ```js
   const heroBuilds = {
       paladin: ['I03G', 'I045', 'I0AF', 'I04H', 'I0E5', 'I0DB'],
       admiral: ['I03G', 'I09T', 'I02B', 'I04H', 'I033', 'I0DB'],
   };
   function renderHeroBuild(heroId) { /* рендер 6 слотов */ }
   ```
3. refactor `items-db.js` — убрать itemsDB, утилиты, добавить `<script src="items-data.js">`
4. Обновить `items.html` — добавить script items-data.js
5. Обновить `heroes/*.html` — заменить hardcoded build slots на `<div id="hero-build"></div>` + scripts

**Риски:**
- refactor items-db.js самый опасный — может сломать items.html
- Пути к картинкам предметов: `images/items/` на главной, `../images/items/` в heroes/
- Скрипты должны загружаться в правильном порядке

**Дополнительно:**
- Добавить поддержку якорей в items.html (`items.html#I03G`) — пока слоты ссылаются на items.html без якоря
