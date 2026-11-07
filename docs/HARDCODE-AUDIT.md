# Аудит хардкода в CSS: литералы вместо переменных — 08.11.2026

Вопрос владельца: «где жёстко вписан хардкод вместо переменных». Метод: скрипт-аудит
(`scripts/tmp/hardcode_audit.py`, рабочая копия в `scripts/tmp/`, не часть сайта) разобрал
31 css-файл (`all.css` исключён — это бандл-копия): все цветовые литералы (`#hex`, `rgb/rgba`),
`box-shadow`, `font-family`, `border-radius`, `z-index` — и сверил с палитрой `:root`
(`base.css`, 18 переменных). Перед заменой проверено: переменные нигде не переопределяются
вне `:root`; бандл пересобирается байт-в-байт (`build-css-bundle.py` идемпотентен).

## Что исправлено — 257 замен в 20 файлах, рендер не меняется

Правило замены: только точные совпадения значения с уже существующей переменной.
Строки-определения `--x: …` в base.css не тронуты; содержимое комментариев (резервные
`[off]`-правила) не тронуто; 8-значные hex с альфой не тронуты (см. ниже).

| Литера́л | Заменён на | Раз |
|---|---|---|
| `#00e6ff` | `var(--accent-cyan)` | 140 |
| `#e0f0ff` | `var(--text-primary)` | 38 |
| `#8aa0c0` | `var(--text-secondary)` | 26 |
| `#5a7a9a` | `var(--text-dim)` | 21 |
| `rgba(0,230,255,.12)` | `var(--glass-border)` | 18 |
| `rgba(0,230,255,.35)` | `var(--glass-border-hover)` | 7 |
| `#6b7c99` | `var(--text-muted)` | 4 |
| `rgba(15,23,42,.5)` | `var(--glass-bg)` | 2 |
| полная композиция `0 0 20px rgba(0,230,255,.2), 0 0 60px rgba(0,230,255,.08)` | `var(--neon-glow)` | 1 |
| **Итого** | | **257** |

Файлы-лидеры: items.css (34), calc.css (32), storage.css (27), monsters.css (24),
search.css (23), home.css (21), hero-page.css (20), info.css (19). Диф симметричный
(590 вставок / 590 удалений — менялись только значения), бандл пересобран.

Проверки после замены: независимый скрипт снял все комментарии и пересчитал — **живого
хардкода, у которого существует переменная, 0** (остались только определения `:root` и
резервные `[off]`-правила); `var(--accent-cyan)` резолвится в `#00e6ff`, `var(--text-primary)`
в `#e0f0ff` (computed style в браузере); консоль и ошибки чисты на items / calculator /
heroes (детальный вид); баланс скобок во всех файлах цел, мусорных `var(` нет.

Практический смысл: раньше смена одного акцента в `:root` красила бы только часть сайта —
298 литералов `#00e6ff`-семейства остались бы старыми. Теперь точечные копии палитры (257)
следуют за переменными автоматически, и редизайн может начинаться с правки `:root`.

## Что осталось хардкодом — честный список и почему

1. **base.css `:root`** — источник правды, там литералы обязаны быть. Это не долг.
2. **Резервные `[off 08.11 css-аудит]`-правила** (внутри комментариев, отключены по решению
   владельца): в них осталось ~17 hex-литералов (`#00e6ff` ×9, `#8aa0c0` ×5, `#5a7a9a` ×3).
   При возврате правила в строй — заменить на `var()`, маркер уже требует снять обёртку.
3. **Одиночные альфы циана без переменных**: `rgba(0,230,255,0.2)` ×16, `0.15` ×16,
   `0.08` ×8, `0.03` ×6, `0.4` ×3. Подставить существующую переменную нельзя корректно:
   `var(--neon-glow)` — составная двухчастная тень, а не цвет для `border`/`background`.
   Лечится только новыми переменными — решение редизайна (заготовка ниже).
4. **8-значные hex с альфой** (`#00e6ff22`, `#ff555533`, …) — больше сотни использований.
   Через `var()` не выражаются без `color-mix()` / relative color syntax; это отдельное
   решение с проверкой целевых браузеров, не механическая замена.

## Готовая заготовка токенов для редизайна

Ниже — НЕ сделанные изменения, а карта к ним: что повторяется и под каким именем просится в `:root`.

**Семантические цвета (переменной нет, повторяются массово):**

| Токен-кандидат | Значение | Использований | Файлы |
|---|---|---|---|
| `--danger` | `#ff5555` | 65 (+16 rgba-альф) | 12 файлов |
| `--magic` | `#bf7fff` | 54 | 7 |
| `--info` | `#55aaff` | 26 | 7 |
| `--warning` | `#ff8800` | 20 | 2 |
| `--success` | `#55ff55` | 20 | 5 |
| `--gold` | `#ffd966` | 15 | 5 |

**Инфраструктура (фоны/границы без имён):** `#0b0e14` ×20 (фон страницы), `#05070a` ×14
(глубокий фон), `#2a5070` ×18 (граница-стронг), `#2a4060` ×15 (граница-софт), `#1a3050` ×11
(панель), `#d0e0ff` ×10 (яркий текст) — кандидаты `--bg-page`, `--bg-deep`, `--border-strong`,
`--border-soft`, `--bg-panel`, `--text-bright`.

**Неоднородности, которые редизайн может свести к одному токену:**
- три циана: `#00e6ff` (акцент), `rgba(0,229,255,…)` ×26 (compare/events/faq/guides/info),
  `rgba(0,255,255,…)` ×11 (glass-tag в base/storage);
- три красных: `#ff5555` / `#ff6b6b` ×24 / `#ff7777` ×11;
- четыре зелёных: `#55ff55` / `#00ff88` ×17 / `#00ffaa` ×16 / `#55ff88` ×12;
- три оранжевых: `#ff8800` / `#ff9944` ×16 / `#ff8c00` ×13 (только hero-page);
- два золотых: `#ffd966` / `#ffd700` ×10.

**Шкала радиусов:** 12px ×63, 8px ×49, 6px ×39, 10px ×37, 50% ×30, 4px ×21, 16px ×20,
30px ×18, 3px ×15 → токены `--radius-xs … --radius-pill`.

**Шрифты:** шесть вариантов monospace-стека (`Consolas` в четырёх написаниях, с
`'Courier New'`, с `'Monaco'`, голый `monospace`) → один токен `--font-mono`;
body-стек `'Segoe UI', 'Inter', system-ui` встречается один раз (base.css) — можно
закрепить как `--font-body`.

**Тени-повторы:** `0 0 20px var(--accent-cyan)` ×5, `0 0 25px var(--accent-cyan)` ×4,
`0 0 10px #00e6ff33` ×4, `0 0 12px #00e6ff44` ×4 — кандидаты `--glow-sm/--glow-lg`.

**z-шкала (задокументирована, не менялась — риск регрессий слоёв):** 0…3 (контент),
10 (search-строка), 1000 (calc/lore/tierlist шапки), 1900/1910/2000 (items bottom sheet),
5000/9999 (search overlay), 10000 (gallery lightbox).

## Вне CSS — замечено, не трогалось

- JS: `#00e6ff` ×4 и `#e0f0ff`/`#8aa0c0` по ×1 в `balance-dashboard-page.js`,
  `tierlist-page.js`, `armor-calc-page.js` (цвета canvas/радаров). При редизайне
  синхронизировать руками — CSS-переменные туда не подставишь без рефакторинга.
- HTML: палитра в инлайн-стилях только в `site-validator.html` — по правилу не трогаем.

## Приложение: полный автотчёт после замен

Сгенерирован `scripts/tmp/hardcode_audit.py` (all.css исключён; в разделе 1 остатки —
определения `:root` и резервные правила, разделы 2–6 — вход редизайна).

## 2. Все цветовые литералы по базовому цвету (топ-30 семейств)

- `#00e6ff` — 157× — варианты: #00e6ff66, #00e6ff55, #00e6ff15, #00e6ff33, #00e6ff25, #00e6ffcc, #00e6ff44, #00e6ff22, #00e6ff, #00e6ff88, #00e6ffaa
  - файлы: base.css, bot-builds.css, calc.css, effects.css, formulas-calc.css, gallery.css, header-mobile.css, hero-grid.css, hero-page.css, home.css, info.css, items.css
- `rgb(0,230,255)` — 122× — варианты: rgba(0,230,255,0.25), rgba(0,230,255,0.45), rgba(0,230,255,0.08), rgba(0,230,255,0.3), rgba(0,230,255,0.2), rgba(0,230,255,0.35), rgba(0,230,255,0.4), rgba(0,230,255,0.1), rgba(0,230,255,0.05), rgba(0,230,255,0.7), rgba(0,230,255,0.03), rgba(0,230,255,0.04), rgba(0,230,255,0.06), rgba(0,230,255,0.12), rgba(0,230,255,0.15), rgba(0,230,255,0.18), rgba(0,230,255,0.55), rgba(0,230,255,0.6), rgba(0,230,255,0.5)
  - файлы: balance-dashboard.css, balance.css, base.css, bot-builds.css, calc.css, creeps.css, effects.css, guides.css, hero-page.css, home.css, info.css, items.css
- `#ff5555` — 65× — варианты: #ff5555aa, #ff555533, #ff555555, #ff555510, #ff555522, #ff555566, #ff555544, #ff5555, #ff555588
  - файлы: armor-calc.css, calc.css, effects.css, formulas-calc.css, guides.css, hero-grid.css, hero-page.css, home.css, info.css, items.css, lore.css, mechanics.css
- `#bf7fff` — 54× — варианты: #bf7fffaa, #bf7fff55, #bf7fff88, #bf7fff15, #bf7fff44, #bf7fff10, #bf7fff22, #bf7fff66, #bf7fff
  - файлы: calc.css, hero-page.css, home.css, items.css, lore.css, mechanics.css, monsters.css
- `#55aaff` — 26× — варианты: #55aaffaa, #55aaff44, #55aaff55, #55aaff66, #55aaff
  - файлы: calc.css, effects.css, hero-grid.css, hero-page.css, items.css, lore.css, mechanics.css
- `rgb(0,229,255)` — 26× — варианты: rgba(0,229,255,0.35), rgba(0,229,255,0.05), rgba(0,229,255,0.04), rgba(0,229,255,0.3), rgba(0,229,255,0.1), rgba(0,229,255,0), rgba(0,229,255,0.2), rgba(0,229,255,0.15), rgba(0,229,255,0.08), rgba(0,229,255,0.03), rgba(0,229,255,0.06), rgba(0,229,255,0.02), rgba(0,229,255,0.18)
  - файлы: compare.css, events.css, faq.css, guides.css, info.css
- `#000000` — 25× — варианты: #00000066, #000000aa, #00000080, #00000077, #00000055, #000000cc
  - файлы: calc.css, effects.css, gallery.css, hero-grid.css, hero-page.css, home.css, items.css, lore.css, search.css, storage.css
- `#ff6b6b` — 24× — варианты: #ff6b6b88, #ff6b6b66, #ff6b6b
  - файлы: balance-dashboard.css, balance.css, bot-builds.css, calc.css, creeps.css, guides.css, info.css, monsters.css
- `rgb(255,255,255)` — 20× — варианты: rgba(255,255,255,0.04), rgba(255,255,255,0.06), rgba(255,255,255,0.08), rgba(255,255,255,0.03), rgba(255,255,255,0.35), rgba(255,255,255,0.25), rgba(255,255,255,0.5), rgba(255,255,255,0.12), rgba(255,255,255,0.1), rgba(255,255,255,0.2)
  - файлы: balance-dashboard.css, balance.css, bot-builds.css, creeps.css, events.css, guides.css, hero-grid.css, info.css, mechanics.css, runes.css, storage.css
- `#0b0e14` — 20× — варианты: #0b0e14
  - файлы: base.css, bot-builds.css, hero-grid.css, hero-page.css, home.css, items.css, lore.css, mechanics.css, monsters.css, tierlist.css
- `#55ff55` — 20× — варианты: #55ff5555, #55ff55aa, #55ff5544, #55ff55, #55ff5566
  - файлы: calc.css, effects.css, hero-grid.css, hero-page.css, items.css
- `#ff8800` — 20× — варианты: #ff880044, #ff8800aa, #ff880055, #ff8800, #ff880066
  - файлы: calc.css, items.css
- `#2a5070` — 18× — варианты: #2a5070
  - файлы: header-mobile.css, hero-grid.css, hero-page.css, items.css, monsters.css, search.css
- `#00ff88` — 17× — варианты: #00ff8888, #00ff8866, #00ff88, #00ff8822, #00ff88aa, #00ff8844
  - файлы: hero-page.css, home.css, lore.css, mechanics.css
- `#00ffaa` — 16× — варианты: #00ffaa, #00ffaa44, #00ffaa55, #00ffaaaa
  - файлы: armor-calc.css, formulas-calc.css, items.css
- `#ff9944` — 16× — варианты: #ff9944, #ff994444, #ff994466
  - файлы: calc.css, formulas-calc.css, hero-page.css, items.css, lore.css, mechanics.css, monsters.css
- `rgb(255,85,85)` — 16× — варианты: rgba(255,85,85,0.3), rgba(255,85,85,0.15), rgba(255,85,85,0.2), rgba(255,85,85,0.25), rgba(255,85,85,0.04), rgba(255,85,85,0.06), rgba(255,85,85,0.12)
  - файлы: effects.css, guides.css, mechanics.css
- `rgb(0,0,0)` — 16× — варианты: rgba(0,0,0,0.7), rgba(0,0,0,0.25), rgba(0,0,0,0.15), rgba(0,0,0,0.5), rgba(0,0,0,0.62), rgba(0,0,0,0.3), rgba(0,0,0,0.35)
  - файлы: guides.css, items.css, search.css, storage.css, tierlist.css
- `#2a4060` — 15× — варианты: #2a4060
  - файлы: calc.css, effects.css, hero-page.css, home.css, info.css, items.css, lore.css
- `#ffd966` — 15× — варианты: #ffd966aa, #ffd966, #ffd96666
  - файлы: effects.css, hero-grid.css, items.css, lore.css, monsters.css
- `#05070a` — 14× — варианты: #05070a, #05070a66, #05070acc
  - файлы: base.css, calc.css, effects.css, home.css
- `#ffffff` — 14× — варианты: #ffffff, #ffffff44
  - файлы: base.css, bot-builds.css, header-mobile.css, info.css, items.css, lore.css, mechanics.css
- `rgb(255,200,0)` — 14× — варианты: rgba(255,200,0,0.5), rgba(255,200,0,0.12), rgba(255,200,0,0.03), rgba(255,200,0,0.2), rgba(255,200,0,0.4), rgba(255,200,0,0.3), rgba(255,200,0,0.35)
  - файлы: bot-builds.css, calc.css, creeps.css, info.css, search.css
- `#ff8c00` — 13× — варианты: #ff8c00aa, #ff8c0066, #ff8c0044, #ff8c0022, #ff8c0088, #ff8c00
  - файлы: hero-page.css
- `#55ff88` — 12× — варианты: #55ff8844, #55ff88, #55ff8833
  - файлы: calc.css, compare.css, faq.css, guides.css, lore.css, mechanics.css, monsters.css
- `rgb(0,255,255)` — 11× — варианты: rgba(0,255,255,0.06), rgba(0,255,255,0.1), rgba(0,255,255,0.03), rgba(0,255,255,0.08), rgba(0,255,255,0.14), rgba(0,255,255,0.15), rgba(0,255,255,0.04), rgba(0,255,255,0.05)
  - файлы: base.css, storage.css
- `#ff7777` — 11× — варианты: #ff7777
  - файлы: calc.css, guides.css, monsters.css
- `#1a3050` — 11× — варианты: #1a3050
  - файлы: header-mobile.css, hero-grid.css, hero-page.css, home.css, items.css, lore.css, mechanics.css, monsters.css, search.css
- `#d0e0ff` — 10× — варианты: #d0e0ff
  - файлы: gallery.css, hero-grid.css, hero-page.css, items.css, monsters.css, search.css, storage.css
- `#ffd700` — 10× — варианты: #ffd700
  - файлы: guides.css, runes.css, storage.css, tierlist.css

## 3. box-shadow: повторы (кроме var(--neon-*))

- `0 0 20px var(--accent-cyan)` — 5×: bot-builds.css, items.css, lore.css
- `0 0 10px #00e6ff33` — 4×: hero-grid.css, hero-page.css, items.css
- `0 0 25px var(--accent-cyan)` — 4×: hero-grid.css, hero-page.css, items.css, lore.css
- `0 0 12px #00e6ff44` — 4×: hero-page.css, lore.css, search.css

## 4. font-family: уникальные стеки

- `'Font Awesome 6 Free'` — 6×: hero-grid.css, hero-page.css, runes.css
- `monospace` — 4×: armor-calc.css, formulas-calc.css, guides.css
- `monospace; color: var(--accent-cyan); font-size: 0.9rem; margin-bottom: 4px; }` — 4×: guides.css
- `inherit` — 4×: items.css, search.css
- `'Segoe UI', 'Inter', system-ui, sans-serif` — 1×: base.css
- `Consolas, 'Courier New', monospace` — 1×: info.css
- `Consolas, monospace` — 1×: items.css
- `'Consolas', 'Courier New', monospace` — 1×: mechanics.css
- `'Consolas', monospace` — 1×: monsters.css
- `'Consolas', 'Monaco', monospace` — 1×: search.css

## 5. border-radius: топ повторов

- `12px` — 63× — файлы: armor-calc.css, balance.css, creeps.css, effects.css, events.css, formulas-calc.css, gallery.css, guides.css
- `8px` — 49× — файлы: armor-calc.css, balance.css, bot-builds.css, calc.css, compare.css, creeps.css, faq.css, formulas-calc.css
- `6px` — 39× — файлы: armor-calc.css, balance.css, bot-builds.css, calc.css, compare.css, creeps.css, formulas-calc.css, guides.css
- `10px` — 37× — файлы: armor-calc.css, calc.css, compare.css, events.css, guides.css, hero-grid.css, hero-mobile.css, hero-page.css
- `50%` — 30× — файлы: calc.css, effects.css, events.css, gallery.css, guides.css, hero-grid.css, home.css, info.css
- `4px` — 21× — файлы: balance.css, bot-builds.css, creeps.css, events.css, guides.css, info.css, search.css, storage.css
- `16px` — 20× — файлы: base.css, hero-mobile.css, home.css, items.css, lore.css, mechanics.css, monsters.css, search.css
- `30px` — 18× — файлы: bot-builds.css, calc.css, hero-page.css, items.css, lore.css, monsters.css, search.css
- `3px` — 15× — файлы: bot-builds.css, calc.css, compare.css, creeps.css, events.css, faq.css, search.css, storage.css

## 6. z-index шкала

- `0` — 17× — файлы: calc.css, effects.css, home.css, info.css
- `2` — 10× — файлы: balance.css, creeps.css, hero-grid.css, home.css, info.css, items.css, search.css
- `1` — 5× — файлы: compare.css, home.css, info.css
- `1000` — 3× — файлы: calc.css, lore.css, tierlist.css
- `3` — 2× — файлы: hero-grid.css, home.css
- `sticky; top: 0; background: rgba(13,27,42,0.95); backdrop-filter: blur(8px); z-index: 2` — 1× — файлы: balance-dashboard.css
- `10000` — 1× — файлы: gallery.css
- `1900` — 1× — файлы: items.css
- `1910` — 1× — файлы: items.css
- `2000` — 1× — файлы: items.css
- `5000` — 1× — файлы: search.css
- `10` — 1× — файлы: search.css
- `-1` — 1× — файлы: search.css
- `9999` — 1× — файлы: search.css

## История

- 08.11.2026 — аудит + 257 замен (этот коммит). Отчёт — снимок; новые токены заводить
  отдельным заходом при редизайне.
