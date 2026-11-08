# CSS-INVENTORY — сырой инвентарь дизайн-значений в css

Генератор: `scripts/design-tokens.mjs` (node scripts/design-tokens.mjs --md docs/CSS-INVENTORY.md), перегенерация перезаписывает файл целиком. vendor/ и генерируемый css/all.css исключены. Осмысленные выводы и токен-система — docs/DESIGN.md.

## Итог
| Показатель | Значение |
|---|---|
| css-файлов | 35 |
| уникальных цветов | 577 |
| вхождений цветов | 1684 |
| кастомных свойств объявлено | 17 |
| из них в :root | 17 |
| backdrop-filter: blur() | 44 |
| box-shadow | 201 |
| text-shadow | 45 |
| linear-gradient() | 52 |
| radial-gradient() | 58 |
| transition: | 202 |
| animation: | 117 |
| @keyframes | 87 |

## Токены (кастомные свойства)

| Токен | Значение | var() использований | Файлов | Где объявлен |
|---|---|---|---|---|
| --accent-cyan | `#00e6ff` | 302 | 1 | :root css/base.css |
| --glass-border | `rgba(0, 230, 255, 0.12)` | 180 | 1 | :root css/base.css |
| --text-secondary | `#8aa0c0` | 155 | 1 | :root css/base.css |
| --text-primary | `#e0f0ff` | 147 | 1 | :root css/base.css |
| --glass-bg | `rgba(15, 23, 42, 0.5)` | 127 | 1 | :root css/base.css |
| --glass-blur | `12px` | 121 | 1 | :root css/base.css |
| --text-muted | `#6b7c99` | 47 | 1 | :root css/base.css |
| --glass-border-hover | `rgba(0, 230, 255, 0.35)` | 42 | 1 | :root css/base.css |
| --text-dim | `#5a7a9a` | 34 | 1 | :root css/base.css |
| --glass-bg-hover | `rgba(15, 23, 42, 0.65)` | 24 | 1 | :root css/base.css |
| --neon-glow | `0 0 20px rgba(0, 230, 255, 0.2), 0 0 60px rgba(0, 230, 255, 0.08)` | 18 | 1 | :root css/base.css |
| --glass-subtle-hover | `rgba(0, 255, 255, 0.08)` | 13 | 1 | :root css/base.css |
| --neon-glow-strong | `0 0 20px rgba(0, 230, 255, 0.4), 0 0 60px rgba(0, 230, 255, 0.15), inset 0 0 15px rgba(0, 230, 255, 0.03)` | 8 | 1 | :root css/base.css |
| --glass-tag-bg | `rgba(0, 255, 255, 0.06)` | 7 | 1 | :root css/base.css |
| --glass-tag-border | `rgba(0, 255, 255, 0.15)` | 7 | 1 | :root css/base.css |
| --glass-subtle | `rgba(0, 255, 255, 0.04)` | 4 | 1 | :root css/base.css |
| --glass-tag-active | `rgba(0, 255, 255, 0.15)` | 2 | 1 | :root css/base.css |

## Цвета по семействам

### циан — 109 значений, 470 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#00e6ff44` | 33 | 11 | base.css, calc.css, gallery.css, header-mobile.css, hero-page.css, home.css, info.css, items.css, lore.css, search.css, tierlist.css |
| `#00e6ff22` | 26 | 11 | calc.css, effects.css, formulas-calc.css, gallery.css, hero-grid.css, hero-page.css, home.css, items.css, lore.css, monsters.css, storage.css |
| `#00e6ff88` | 24 | 10 | base.css, calc.css, header-mobile.css, hero-page.css, home.css, info.css, items.css, lore.css, monsters.css, search.css |
| `rgba(0,230,255,0.04)` | 22 | 11 | aibot.css, balance-dashboard.css, balance.css, calc.css, creeps.css, effects.css, guides.css, lore.css, search.css, storage.css, repo-archive/balance-dashboard.css |
| `#2a5070` | 22 | 7 | header-mobile.css, hero-grid.css, hero-page.css, items.css, monsters.css, search.css, map.css |
| `#00e6ffaa` | 20 | 8 | bot-builds.css, calc.css, header-mobile.css, hero-grid.css, hero-page.css, items.css, lore.css, monsters.css |
| `rgba(0,230,255,0.1)` | 17 | 9 | aibot.css, calc.css, guides.css, home.css, info.css, items.css, search.css, storage.css, tierlist.css |
| `#00e6ff33` | 17 | 8 | calc.css, hero-grid.css, hero-page.css, home.css, items.css, lore.css, monsters.css, search.css |
| `rgba(0,230,255,0.2)` | 16 | 6 | base.css, guides.css, items.css, mechanics.css, search.css, storage.css |
| `rgba(0,230,255,0.15)` | 16 | 7 | base.css, bot-builds.css, guides.css, info.css, items.css, search.css, storage.css |
| `#00e6ff66` | 15 | 8 | calc.css, gallery.css, hero-grid.css, hero-page.css, home.css, info.css, items.css, monsters.css |
| `#00e5ff` | 13 | 3 | compare.css, info.css, map.css |
| `rgba(0,230,255,0.06)` | 11 | 4 | calc.css, guides.css, lore.css, manifesto-support.css |
| `rgba(0,230,255,0.05)` | 10 | 3 | calc.css, effects.css, search.css |
| `rgba(0,230,255,0.08)` | 8 | 6 | base.css, bot-builds.css, creeps.css, guides.css, home.css, storage.css |
| `#55ffff` | 7 | 3 | home.css, info.css, lore.css |
| `#00e6ff` | 6 | 4 | aibot.css, armor-calc.css, base.css, map.css |
| `#74c0fc` | 6 | 3 | balance.css, calc.css, guides.css |
| `rgba(0,230,255,0.03)` | 6 | 5 | base.css, calc.css, effects.css, hero-page.css, search.css |
| `rgba(0,230,255,0.3)` | 6 | 5 | effects.css, items.css, manifesto-support.css, search.css, tierlist.css |
| `#2196f3` | 5 | 2 | aibot.css, info-auto-level.css |
| `rgba(0,230,255,0.5)` | 5 | 3 | bot-builds.css, manifesto-support.css, search.css |
| `#00e6ffcc` | 5 | 3 | hero-page.css, info.css, items.css |
| `#00e5ff22` | 5 | 2 | info.css, map.css |
| `rgba(0,229,255,0.12)` | 5 | 1 | map.css |
| `rgba(0,230,255,0.4)` | 4 | 3 | base.css, manifesto-support.css, search.css |
| `rgba(0,230,255,0.25)` | 4 | 4 | bot-builds.css, calc.css, manifesto-support.css, storage.css |
| `#182530` | 4 | 2 | calc.css, effects.css |
| `rgba(0,229,255,0.15)` | 4 | 2 | guides.css, info.css |
| `rgba(33,150,243,0.15)` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#42a5f5` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `rgba(0,230,255,0.35)` | 3 | 3 | base.css, manifesto-support.css, map.css |
| `rgba(0,128,255,0.05)` | 3 | 2 | calc.css, effects.css |
| `#0f2535` | 3 | 2 | calc.css, tierlist.css |
| `rgba(0,229,255,0.2)` | 3 | 2 | compare.css, events.css |
| `rgba(0,229,255,0.1)` | 3 | 2 | events.css, info.css |
| `rgba(0,229,255,0.3)` | 3 | 2 | events.css, info.css |
| `rgba(0,229,255,0.06)` | 3 | 3 | events.css, info.css, map.css |
| `#0080ff` | 3 | 3 | hero-grid.css, items.css, search.css |
| `#00e6ff55` | 3 | 3 | hero-page.css, home.css, items.css |
| `#0a1a1a` | 3 | 3 | hero-page.css, lore.css, mechanics.css |
| `#00e6ff15` | 3 | 1 | home.css |
| `rgba(0,229,255,0.35)` | 3 | 2 | info.css, map.css |
| `rgba(0,230,255,0.7)` | 3 | 2 | items.css, storage.css |
| `rgba(96,125,139,0.2)` | 2 | 2 | aibot.css, balance.css |
| `#90a4ae` | 2 | 2 | aibot.css, balance.css |
| `rgba(0,230,255,0.12)` | 2 | 2 | aibot.css, base.css |
| `rgba(0,255,255,0.15)` | 2 | 1 | base.css |
| `rgba(0,128,255,0.04)` | 2 | 1 | calc.css |
| `#1a5a7a` | 2 | 1 | compare.css |
| `#44ccff` | 2 | 1 | effects.css |
| `rgba(0,229,255,0.08)` | 2 | 2 | events.css, info.css |
| `rgba(0,229,255,0.04)` | 2 | 2 | events.css, faq.css |
| `rgba(0,229,255,0.05)` | 2 | 1 | guides.css |
| `#4ecdc4` | 2 | 2 | guides.css, info.css |
| `#c0e4ff` | 2 | 2 | hero-page.css, items.css |
| `#5a8aaa` | 2 | 2 | info.css, monsters.css |
| `rgba(0,230,255,0.45)` | 2 | 2 | info.css, manifesto-support.css |
| `rgba(0,230,255,0.6)` | 2 | 2 | info.css, map.css |
| `#3498db` | 2 | 2 | sitemap-page.css, tierlist.css |
| `rgba(0,255,255,0.05)` | 2 | 1 | storage.css |
| `rgba(0,255,255,0.14)` | 2 | 1 | storage.css |
| `#607d8b` | 1 | 1 | aibot.css |
| `rgba(116,192,252,0.1)` | 1 | 1 | balance.css |
| `rgba(0,255,255,0.04)` | 1 | 1 | base.css |
| `rgba(0,255,255,0.08)` | 1 | 1 | base.css |
| `rgba(0,255,255,0.06)` | 1 | 1 | base.css |
| `#e0f0ff` | 1 | 1 | base.css |
| `#26a5e4` | 1 | 1 | calc.css |
| `rgba(0,229,255,0.03)` | 1 | 1 | compare.css |
| `#3a8aa0` | 1 | 1 | compare.css |
| `rgba(0,150,255,0.12)` | 1 | 1 | creeps.css |
| `#5cb8ff` | 1 | 1 | creeps.css |
| `#00e6ff25` | 1 | 1 | home.css |
| `rgba(0,128,255,0.07)` | 1 | 1 | home.css |
| `rgba(0,229,255,0.02)` | 1 | 1 | info.css |
| `rgba(0,229,255,0.18)` | 1 | 1 | info.css |
| `rgba(0,200,255,0.1)` | 1 | 1 | info.css |
| `rgba(0,200,255,0.3)` | 1 | 1 | info.css |
| `#00c8ff` | 1 | 1 | info.css |
| `#00e5ff11` | 1 | 1 | info.css |
| `#00e5ff33` | 1 | 1 | info.css |
| `rgba(0,229,255,0)` | 1 | 1 | info.css |
| `#6a9ec0` | 1 | 1 | items.css |
| `rgba(64,160,255,0.12)` | 1 | 1 | items.css |
| `rgba(106,205,255,0.8)` | 1 | 1 | items.css |
| `#d2f3ff` | 1 | 1 | items.css |
| `rgba(64,160,255,0.22)` | 1 | 1 | items.css |
| `rgba(0,128,255,0.03)` | 1 | 1 | lore.css |
| `#55ccff44` | 1 | 1 | mechanics.css |
| `#55ccff` | 1 | 1 | mechanics.css |
| `#5a8aa0` | 1 | 1 | mechanics.css |
| `rgba(85,204,255,0.15)` | 1 | 1 | mechanics.css |
| `rgba(0,180,255,0.12)` | 1 | 1 | runes.css |
| `#00b4ff` | 1 | 1 | runes.css |
| `rgba(120,144,156,0.12)` | 1 | 1 | runes.css |
| `#78909c` | 1 | 1 | runes.css |
| `rgba(0,180,255,0.4)` | 1 | 1 | runes.css |
| `rgba(0,180,255,0.3)` | 1 | 1 | runes.css |
| `rgba(0,230,255,0.55)` | 1 | 1 | storage.css |
| `rgba(0,255,255,0.1)` | 1 | 1 | storage.css |
| `rgba(0,255,255,0.03)` | 1 | 1 | storage.css |
| `rgba(0,230,255,0.18)` | 1 | 1 | storage.css |
| `#64b5f6` | 1 | 1 | info-auto-level.css |
| `rgba(33,150,243,0.12)` | 1 | 1 | info-auto-level.css |
| `rgba(33,150,243,0.3)` | 1 | 1 | info-auto-level.css |
| `rgba(0,229,255,0.07)` | 1 | 1 | map.css |
| `#66f0ff` | 1 | 1 | map.css |
| `rgba(0,229,255,0.6)` | 1 | 1 | map.css |

### синий — 129 значений, 343 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#0b0e14` | 21 | 11 | base.css, bot-builds.css, hero-grid.css, hero-page.css, home.css, items.css, lore.css, manifesto-support.css, mechanics.css, monsters.css, tierlist.css |
| `#2a4060` | 15 | 7 | calc.css, effects.css, hero-page.css, home.css, info.css, items.css, lore.css |
| `#05070a` | 12 | 4 | base.css, calc.css, effects.css, home.css |
| `#55aaff` | 12 | 7 | calc.css, effects.css, hero-grid.css, hero-page.css, items.css, lore.css, mechanics.css |
| `#1a3050` | 11 | 9 | header-mobile.css, hero-grid.css, hero-page.css, home.css, items.css, lore.css, mechanics.css, monsters.css, search.css |
| `#d0e0ff` | 10 | 7 | gallery.css, hero-grid.css, hero-page.css, items.css, monsters.css, search.css, storage.css |
| `#1a2744` | 7 | 2 | armor-calc.css, formulas-calc.css |
| `#0f172a` | 7 | 6 | bot-builds.css, compare.css, events.css, faq.css, info.css, search.css |
| `#c0d0e8` | 7 | 2 | calc.css, info.css |
| `#0a1a2a` | 7 | 4 | calc.css, lore.css, mechanics.css, tierlist.css |
| `#55aaff44` | 7 | 4 | calc.css, items.css, lore.css, mechanics.css |
| `#8e97aa` | 7 | 1 | search.css |
| `rgba(13,27,42,0.95)` | 6 | 5 | aibot.css, balance-dashboard.css, balance.css, creeps.css, repo-archive/balance-dashboard.css |
| `#0a0f1a` | 6 | 3 | hero-page.css, mechanics.css, monsters.css |
| `#0a1628` | 6 | 2 | info.css, map.css |
| `#0a1020` | 5 | 3 | armor-calc.css, calc.css, formulas-calc.css |
| `#8aa0c0` | 5 | 2 | base.css, map.css |
| `#d0e4ff` | 5 | 3 | bot-builds.css, effects.css, items.css |
| `#0d1b2a` | 5 | 3 | compare.css, creeps.css, faq.css |
| `#c0d0e0` | 5 | 2 | compare.css, search.css |
| `#5a6a7a` | 5 | 1 | search.css |
| `#4488ff` | 5 | 1 | map.css |
| `#88aacc` | 5 | 1 | map.css |
| `#1a2a40` | 4 | 2 | calc.css, info.css |
| `#111e30` | 4 | 1 | compare.css |
| `#b0c8f0` | 4 | 3 | hero-grid.css, items.css, lore.css |
| `#c0d4ff` | 4 | 2 | hero-page.css, lore.css |
| `#b0c4de` | 4 | 3 | hero-page.css, home.css, mechanics.css |
| `rgba(13,27,42,0.6)` | 4 | 1 | map.css |
| `#5a7a9a` | 3 | 2 | base.css, map.css |
| `#55aaffaa` | 3 | 2 | calc.css, items.css |
| `#0a1520` | 3 | 2 | calc.css, search.css |
| `#3a5a7a` | 3 | 1 | compare.css |
| `#55aaff55` | 3 | 2 | hero-grid.css, items.css |
| `#1e3a5a` | 3 | 2 | hero-page.css, lore.css |
| `#0e1a2b` | 3 | 2 | hero-page.css, lore.css |
| `#8ab4f0` | 3 | 2 | hero-page.css, items.css |
| `rgba(10,20,40,0.8)` | 3 | 2 | info.css, items.css |
| `rgba(15,23,42,0.5)` | 2 | 2 | base.css, manifesto-support.css |
| `#162433` | 2 | 1 | bot-builds.css |
| `#1a2230` | 2 | 2 | calc.css, effects.css |
| `#b0b9d0` | 2 | 1 | calc.css |
| `rgba(15,23,42,0.93)` | 2 | 2 | calc.css, lore.css |
| `#3a4a5a` | 2 | 2 | compare.css, search.css |
| `#0d1f35` | 2 | 1 | compare.css |
| `#5a5a7a` | 2 | 1 | compare.css |
| `#2a2a3a` | 2 | 1 | compare.css |
| `#0d1a2a` | 2 | 1 | compare.css |
| `#66aaff` | 2 | 1 | effects.css |
| `rgba(15,23,42,0.8)` | 2 | 2 | gallery.css, items.css |
| `#aaccff` | 2 | 2 | hero-grid.css, items.css |
| `#3a5070` | 2 | 2 | hero-page.css, home.css |
| `#0d1520` | 2 | 1 | hero-page.css |
| `#0a1525` | 2 | 2 | info.css, monsters.css |
| `#7a8faa` | 2 | 1 | items.css |
| `#c8d8f0` | 2 | 1 | storage.css |
| `#9ab` | 2 | 1 | storage.css |
| `#1a3a5c` | 2 | 1 | map.css |
| `rgba(15,23,42,0.65)` | 1 | 1 | base.css |
| `#6b7c99` | 1 | 1 | base.css |
| `#1a2330` | 1 | 1 | base.css |
| `rgba(10,20,40,0.45)` | 1 | 1 | base.css |
| `#4a76a8` | 1 | 1 | calc.css |
| `#5865f2` | 1 | 1 | calc.css |
| `#55aaff66` | 1 | 1 | calc.css |
| `#091421` | 1 | 1 | compare.css |
| `#7a8a9a` | 1 | 1 | compare.css |
| `rgba(92,107,192,0.15)` | 1 | 1 | creeps.css |
| `#7986cb` | 1 | 1 | creeps.css |
| `rgba(13,27,42,0.9)` | 1 | 1 | creeps.css |
| `#1c2230` | 1 | 1 | effects.css |
| `#1a2430` | 1 | 1 | effects.css |
| `#1e2230` | 1 | 1 | effects.css |
| `#1e2030` | 1 | 1 | effects.css |
| `rgba(0,20,40,0.4)` | 1 | 1 | gallery.css |
| `rgba(5,8,14,0.92)` | 1 | 1 | gallery.css |
| `#1e1e2a` | 1 | 1 | hero-grid.css |
| `#a0b5d0` | 1 | 1 | hero-grid.css |
| `#1a1a2e` | 1 | 1 | hero-grid.css |
| `rgba(10,14,20,0.85)` | 1 | 1 | hero-grid.css |
| `rgba(18,25,40,0.9)` | 1 | 1 | hero-page.css |
| `rgba(15,26,43,0.9)` | 1 | 1 | hero-page.css |
| `#b8cef0` | 1 | 1 | hero-page.css |
| `#8ab4f8` | 1 | 1 | hero-page.css |
| `#152030` | 1 | 1 | hero-page.css |
| `#9bb8d8` | 1 | 1 | hero-page.css |
| `#0a1018` | 1 | 1 | hero-page.css |
| `#132030` | 1 | 1 | hero-page.css |
| `#7a8fa8` | 1 | 1 | hero-page.css |
| `#4da6ff` | 1 | 1 | hero-page.css |
| `#1a2a45` | 1 | 1 | hero-page.css |
| `#05070acc` | 1 | 1 | home.css |
| `#05070a66` | 1 | 1 | home.css |
| `#0a0e18` | 1 | 1 | info.css |
| `#050a12` | 1 | 1 | info.css |
| `rgba(10,20,40,0.55)` | 1 | 1 | info.css |
| `rgba(18,25,40,0.85)` | 1 | 1 | items.css |
| `#d0dff0` | 1 | 1 | items.css |
| `rgba(18,25,40,0.98)` | 1 | 1 | items.css |
| `#1a2e44` | 1 | 1 | items.css |
| `#e0ecff` | 1 | 1 | items.css |
| `#aac4f0` | 1 | 1 | items.css |
| `#2a334a` | 1 | 1 | items.css |
| `rgba(90,122,154,0.4)` | 1 | 1 | items.css |
| `rgba(13,24,42,0.95)` | 1 | 1 | items.css |
| `rgba(9,15,28,0.95)` | 1 | 1 | items.css |
| `#a9c7ff` | 1 | 1 | items.css |
| `rgba(15,23,42,0.96)` | 1 | 1 | items.css |
| `rgba(10,20,40,0.6)` | 1 | 1 | items.css |
| `#4a5f7a` | 1 | 1 | items.css |
| `rgba(15,23,42,0.86)` | 1 | 1 | lore.css |
| `#aac8ff` | 1 | 1 | lore.css |
| `rgba(85,170,255,0.25)` | 1 | 1 | mechanics.css |
| `rgba(85,170,255,0.2)` | 1 | 1 | mechanics.css |
| `rgba(85,170,255,0.4)` | 1 | 1 | mechanics.css |
| `rgba(85,170,255,0.6)` | 1 | 1 | mechanics.css |
| `#1a2540` | 1 | 1 | monsters.css |
| `rgba(15,23,42,0.92)` | 1 | 1 | search.css |
| `#5a6a80` | 1 | 1 | search.css |
| `#060d14` | 1 | 1 | search.css |
| `#a0c0e0` | 1 | 1 | search.css |
| `rgba(13,22,36,0.92)` | 1 | 1 | storage.css |
| `#2a3a4a` | 1 | 1 | storage.css |
| `#4488ff22` | 1 | 1 | map.css |
| `#88aacc22` | 1 | 1 | map.css |
| `#77aaff` | 1 | 1 | map.css |
| `rgba(68,136,255,0.2)` | 1 | 1 | map.css |
| `#aaccee` | 1 | 1 | map.css |
| `rgba(13,27,42,0.7)` | 1 | 1 | map.css |

### фиолет/магента — 52 значений, 122 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#bf7fff` | 24 | 7 | calc.css, hero-page.css, home.css, items.css, lore.css, mechanics.css, monsters.css |
| `#bf7fff44` | 14 | 6 | calc.css, hero-page.css, items.css, lore.css, mechanics.css, monsters.css |
| `#bf7fffaa` | 5 | 3 | calc.css, hero-page.css, items.css |
| `#1a0a2a` | 5 | 3 | hero-page.css, lore.css, mechanics.css |
| `#aa44ff` | 5 | 1 | map.css |
| `#9c27b0` | 4 | 2 | runes.css, info-auto-level.css |
| `#ab47bc` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#bf7fff66` | 3 | 2 | calc.css, hero-page.css |
| `#1a0a1a` | 3 | 3 | info.css, lore.css, mechanics.css |
| `rgba(171,71,188,0.15)` | 2 | 2 | aibot.css, creeps.css |
| `#cc44ff` | 2 | 1 | effects.css |
| `#bf7fff88` | 2 | 1 | hero-page.css |
| `#bf7fff22` | 2 | 2 | hero-page.css, monsters.css |
| `#2a1a3a` | 2 | 2 | hero-page.css, monsters.css |
| `#bf7fff55` | 2 | 2 | home.css, items.css |
| `#aa44aa44` | 2 | 2 | lore.css, mechanics.css |
| `#aa44aa` | 2 | 2 | lore.css, mechanics.css |
| `rgba(191,127,255,0.2)` | 2 | 1 | mechanics.css |
| `rgba(170,68,170,0.3)` | 2 | 1 | mechanics.css |
| `rgba(156,39,176,0.12)` | 2 | 2 | runes.css, info-auto-level.css |
| `rgba(170,120,255,0.4)` | 2 | 1 | storage.css |
| `#c9a6ff` | 2 | 1 | storage.css |
| `rgba(156,39,176,0.15)` | 1 | 1 | balance.css |
| `#aa55ff` | 1 | 1 | formulas-calc.css |
| `#a78bfa` | 1 | 1 | guides.css |
| `#e0b0ff` | 1 | 1 | hero-page.css |
| `#8800ff` | 1 | 1 | hero-page.css |
| `#bf7fff10` | 1 | 1 | home.css |
| `#bf7fff15` | 1 | 1 | home.css |
| `#ff66c4` | 1 | 1 | items.css |
| `#ff66c488` | 1 | 1 | items.css |
| `#1a1020` | 1 | 1 | items.css |
| `#e040fb22` | 1 | 1 | items.css |
| `#e040fb44` | 1 | 1 | items.css |
| `#e040fb88` | 1 | 1 | items.css |
| `#f0a0ff` | 1 | 1 | items.css |
| `#2a1a2a` | 1 | 1 | mechanics.css |
| `rgba(191,127,255,0.3)` | 1 | 1 | mechanics.css |
| `rgba(40,0,40,0.4)` | 1 | 1 | mechanics.css |
| `rgba(191,127,255,0.4)` | 1 | 1 | mechanics.css |
| `rgba(170,68,170,0.25)` | 1 | 1 | mechanics.css |
| `#0f0a1a` | 1 | 1 | monsters.css |
| `rgba(124,77,255,0.12)` | 1 | 1 | runes.css |
| `#7c4dff` | 1 | 1 | runes.css |
| `rgba(124,77,255,0.35)` | 1 | 1 | runes.css |
| `rgba(156,39,176,0.55)` | 1 | 1 | runes.css |
| `rgba(170,120,255,0.07)` | 1 | 1 | storage.css |
| `#ce93d8` | 1 | 1 | info-auto-level.css |
| `rgba(156,39,176,0.3)` | 1 | 1 | info-auto-level.css |
| `#aa44ff22` | 1 | 1 | map.css |
| `#cc77ff` | 1 | 1 | map.css |
| `rgba(170,68,255,0.2)` | 1 | 1 | map.css |

### красный — 98 значений, 250 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#ff5555` | 35 | 12 | armor-calc.css, calc.css, effects.css, formulas-calc.css, guides.css, hero-grid.css, hero-page.css, items.css, lore.css, mechanics.css, monsters.css, search.css |
| `#ff6b6b` | 27 | 10 | aibot.css, balance-dashboard.css, balance.css, bot-builds.css, calc.css, creeps.css, guides.css, info.css, monsters.css, repo-archive/balance-dashboard.css |
| `#ff7777` | 12 | 4 | calc.css, guides.css, monsters.css, map.css |
| `#ff555544` | 11 | 7 | calc.css, info.css, items.css, lore.css, mechanics.css, monsters.css, search.css |
| `#ff4444` | 10 | 5 | items.css, lore.css, mechanics.css, search.css, map.css |
| `rgba(255,85,85,0.15)` | 5 | 1 | guides.css |
| `#ff66aa` | 5 | 1 | map.css |
| `#ff555588` | 4 | 2 | calc.css, info.css |
| `#ff555522` | 4 | 3 | calc.css, info.css, monsters.css |
| `#ff6666` | 4 | 2 | effects.css, search.css |
| `rgba(255,85,85,0.06)` | 4 | 1 | guides.css |
| `#2a0a0a` | 4 | 3 | lore.css, mechanics.css, monsters.css |
| `#ff7043` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#ef5350` | 3 | 3 | aibot.css, balance.css, info-auto-level.css |
| `rgba(255,60,60,0.15)` | 3 | 1 | bot-builds.css |
| `#ff0000` | 3 | 2 | calc.css, info.css |
| `#ff5555aa` | 3 | 2 | calc.css, items.css |
| `#ff555555` | 3 | 2 | hero-grid.css, items.css |
| `#ff8888` | 3 | 2 | items.css, monsters.css |
| `#2a0a1a` | 3 | 2 | lore.css, mechanics.css |
| `rgba(255,80,80,0.4)` | 3 | 2 | search.css, storage.css |
| `#e74c3c` | 3 | 2 | sitemap-page.css, tierlist.css |
| `#f44336` | 3 | 1 | info-auto-level.css |
| `rgba(255,87,34,0.15)` | 2 | 2 | aibot.css, balance.css |
| `rgba(244,67,54,0.15)` | 2 | 2 | aibot.css, balance.css |
| `rgba(255,60,60,0.4)` | 2 | 1 | bot-builds.css |
| `rgba(255,60,60,0.3)` | 2 | 1 | bot-builds.css |
| `#ff555566` | 2 | 1 | calc.css |
| `#ff555533` | 2 | 2 | calc.css, items.css |
| `rgba(255,85,85,0.12)` | 2 | 1 | guides.css |
| `#ffaaaa` | 2 | 2 | hero-grid.css, items.css |
| `#ff444488` | 2 | 1 | items.css |
| `#ff9a9a` | 2 | 1 | items.css |
| `#ff444444` | 2 | 2 | lore.css, mechanics.css |
| `rgba(255,85,85,0.2)` | 2 | 1 | mechanics.css |
| `rgba(255,68,68,0.15)` | 2 | 2 | mechanics.css, search.css |
| `#5a3a3a` | 2 | 1 | search.css |
| `rgba(255,68,68,0.3)` | 2 | 1 | search.css |
| `#ff8080` | 2 | 1 | storage.css |
| `rgba(255,68,68,0.35)` | 2 | 1 | map.css |
| `rgba(255,107,107,0.08)` | 1 | 1 | balance-dashboard.css |
| `rgba(255,107,107,0.1)` | 1 | 1 | balance.css |
| `rgba(255,40,40,0.03)` | 1 | 1 | bot-builds.css |
| `rgba(255,40,40,0.06)` | 1 | 1 | bot-builds.css |
| `rgba(255,40,40,0.1)` | 1 | 1 | bot-builds.css |
| `rgba(255,80,80,0.12)` | 1 | 1 | creeps.css |
| `rgba(255,112,67,0.15)` | 1 | 1 | creeps.css |
| `rgba(255,85,85,0.04)` | 1 | 1 | effects.css |
| `rgba(220,38,38,0.15)` | 1 | 1 | events.css |
| `#ef4444` | 1 | 1 | events.css |
| `rgba(220,38,38,0.3)` | 1 | 1 | events.css |
| `#ff55aa` | 1 | 1 | formulas-calc.css |
| `rgba(255,119,119,0.1)` | 1 | 1 | guides.css |
| `#ff555510` | 1 | 1 | home.css |
| `#ff000044` | 1 | 1 | info.css |
| `#ff000022` | 1 | 1 | info.css |
| `#c0a0b0` | 1 | 1 | info.css |
| `rgba(255,107,107,0.4)` | 1 | 1 | info.css |
| `#3a1a1a` | 1 | 1 | items.css |
| `#ff6b3522` | 1 | 1 | items.css |
| `#ff6b3544` | 1 | 1 | items.css |
| `#ff6b3588` | 1 | 1 | items.css |
| `rgba(255,120,120,0.4)` | 1 | 1 | items.css |
| `rgba(255,120,120,0.12)` | 1 | 1 | items.css |
| `#ff664444` | 1 | 1 | mechanics.css |
| `#ff6644` | 1 | 1 | mechanics.css |
| `rgba(255,85,85,0.3)` | 1 | 1 | mechanics.css |
| `rgba(255,68,68,0.4)` | 1 | 1 | mechanics.css |
| `rgba(255,85,85,0.25)` | 1 | 1 | mechanics.css |
| `rgba(255,102,68,0.2)` | 1 | 1 | mechanics.css |
| `#1a0a0a` | 1 | 1 | monsters.css |
| `#ff6b6b66` | 1 | 1 | monsters.css |
| `#ff6b6b88` | 1 | 1 | monsters.css |
| `rgba(255,82,82,0.12)` | 1 | 1 | runes.css |
| `#ff5252` | 1 | 1 | runes.css |
| `rgba(255,71,87,0.12)` | 1 | 1 | runes.css |
| `#ff4757` | 1 | 1 | runes.css |
| `rgba(180,0,0,0.12)` | 1 | 1 | runes.css |
| `#cc0000` | 1 | 1 | runes.css |
| `rgba(233,30,99,0.12)` | 1 | 1 | runes.css |
| `#e91e63` | 1 | 1 | runes.css |
| `rgba(255,82,82,0.35)` | 1 | 1 | runes.css |
| `rgba(204,0,0,0.45)` | 1 | 1 | runes.css |
| `rgba(233,30,99,0.4)` | 1 | 1 | runes.css |
| `rgba(255,68,68,0.1)` | 1 | 1 | search.css |
| `rgba(255,68,68,0.05)` | 1 | 1 | search.css |
| `rgba(255,80,80,0.05)` | 1 | 1 | search.css |
| `rgba(255,80,80,0.2)` | 1 | 1 | search.css |
| `#ff5050` | 1 | 1 | search.css |
| `rgba(255,80,80,0.1)` | 1 | 1 | search.css |
| `rgba(255,80,80,0.07)` | 1 | 1 | storage.css |
| `rgba(244,67,54,0.12)` | 1 | 1 | info-auto-level.css |
| `rgba(244,67,54,0.3)` | 1 | 1 | info-auto-level.css |
| `#ff444422` | 1 | 1 | map.css |
| `#ff66aa22` | 1 | 1 | map.css |
| `#ff99cc` | 1 | 1 | map.css |
| `rgba(255,102,170,0.3)` | 1 | 1 | map.css |
| `rgba(255,68,68,0.6)` | 1 | 1 | map.css |

### оранж — 52 значений, 129 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#ffa500` | 11 | 5 | balance-dashboard.css, events.css, search.css, tierlist.css, repo-archive/balance-dashboard.css |
| `#ff9944` | 10 | 6 | calc.css, formulas-calc.css, hero-page.css, lore.css, mechanics.css, monsters.css |
| `#ff8800` | 7 | 2 | calc.css, items.css |
| `#ff9800` | 6 | 3 | aibot.css, runes.css, info-auto-level.css |
| `#2a1a0a` | 6 | 5 | hero-page.css, items.css, lore.css, mechanics.css, monsters.css |
| `#ff994444` | 5 | 4 | items.css, lore.css, mechanics.css, monsters.css |
| `#ffaa44` | 5 | 1 | map.css |
| `#ff880066` | 4 | 2 | calc.css, items.css |
| `#ff8800aa` | 4 | 2 | calc.css, items.css |
| `#ff880044` | 4 | 2 | calc.css, items.css |
| `#ff8844` | 4 | 2 | effects.css, hero-grid.css |
| `#ff8c00` | 4 | 1 | hero-page.css |
| `#ff922b` | 3 | 2 | calc.css, guides.css |
| `rgba(255,165,0,0.3)` | 3 | 2 | events.css, search.css |
| `#ff8c0044` | 3 | 1 | hero-page.css |
| `rgba(255,165,0,0.08)` | 2 | 2 | balance-dashboard.css, repo-archive/balance-dashboard.css |
| `rgba(255,165,0,0.2)` | 2 | 2 | balance-dashboard.css, repo-archive/balance-dashboard.css |
| `#ffaa66` | 2 | 1 | effects.css |
| `rgba(255,165,0,0.15)` | 2 | 2 | events.css, search.css |
| `#ff8844aa` | 2 | 1 | hero-grid.css |
| `#ffcc66` | 2 | 1 | hero-page.css |
| `#ff8c0088` | 2 | 1 | hero-page.css |
| `#ff8c00aa` | 2 | 1 | hero-page.css |
| `#ffb347` | 2 | 2 | hero-page.css, items.css |
| `#ffaa33` | 2 | 1 | items.css |
| `#ffaa33aa` | 2 | 1 | items.css |
| `#ffaa3344` | 2 | 1 | items.css |
| `rgba(255,152,0,0.12)` | 2 | 2 | runes.css, info-auto-level.css |
| `rgba(255,165,0,0.06)` | 1 | 1 | balance-dashboard.css |
| `rgba(255,136,68,0.15)` | 1 | 1 | hero-grid.css |
| `#ff884466` | 1 | 1 | hero-grid.css |
| `rgba(255,136,68,0.1)` | 1 | 1 | hero-grid.css |
| `#ffb34744` | 1 | 1 | hero-page.css |
| `#ff8c0022` | 1 | 1 | hero-page.css |
| `#ff8c0066` | 1 | 1 | hero-page.css |
| `#3a1a0a` | 1 | 1 | hero-page.css |
| `#ff994466` | 1 | 1 | hero-page.css |
| `#ffcc44` | 1 | 1 | hero-page.css |
| `#ffbb66` | 1 | 1 | items.css |
| `#ffcc4455` | 1 | 1 | items.css |
| `#ffb088` | 1 | 1 | items.css |
| `#ffaa3355` | 1 | 1 | items.css |
| `#ff880055` | 1 | 1 | items.css |
| `rgba(255,153,68,0.2)` | 1 | 1 | mechanics.css |
| `rgba(255,153,68,0.15)` | 1 | 1 | mechanics.css |
| `rgba(255,165,0,0.05)` | 1 | 1 | search.css |
| `#f39c12` | 1 | 1 | tierlist.css |
| `#ffb74d` | 1 | 1 | info-auto-level.css |
| `rgba(255,152,0,0.3)` | 1 | 1 | info-auto-level.css |
| `#ffaa4422` | 1 | 1 | map.css |
| `#ffcc77` | 1 | 1 | map.css |
| `rgba(255,170,68,0.2)` | 1 | 1 | map.css |

### золото/янтарь — 33 значений, 89 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#ffd966` | 12 | 5 | effects.css, hero-grid.css, items.css, lore.css, monsters.css |
| `#ffd700` | 10 | 4 | guides.css, runes.css, storage.css, tierlist.css |
| `#ffc107` | 8 | 4 | aibot.css, balance.css, creeps.css, runes.css |
| `#ffd43b` | 8 | 5 | balance-dashboard.css, balance.css, calc.css, creeps.css, repo-archive/balance-dashboard.css |
| `#ffc800` | 7 | 5 | bot-builds.css, calc.css, creeps.css, info.css, search.css |
| `rgba(255,200,0,0.12)` | 4 | 4 | calc.css, creeps.css, info.css, search.css |
| `#ffcc00` | 3 | 2 | calc.css, effects.css |
| `rgba(255,200,0,0.3)` | 3 | 3 | calc.css, info.css, search.css |
| `rgba(255,193,7,0.15)` | 2 | 2 | aibot.css, balance.css |
| `rgba(255,200,0,0.4)` | 2 | 2 | bot-builds.css, calc.css |
| `rgba(255,200,0,0.5)` | 2 | 2 | calc.css, search.css |
| `#ffd96666` | 2 | 2 | effects.css, hero-grid.css |
| `#1a1a0a` | 2 | 2 | lore.css, mechanics.css |
| `#aaaa4444` | 2 | 2 | lore.css, mechanics.css |
| `#aaaa44` | 2 | 2 | lore.css, mechanics.css |
| `rgba(255,215,0,0.3)` | 2 | 2 | runes.css, storage.css |
| `rgba(255,215,0,0.35)` | 2 | 1 | storage.css |
| `rgba(255,212,59,0.08)` | 1 | 1 | balance-dashboard.css |
| `rgba(255,200,0,0.2)` | 1 | 1 | bot-builds.css |
| `#ffc80044` | 1 | 1 | calc.css |
| `rgba(255,193,7,0.18)` | 1 | 1 | creeps.css |
| `#ffd966aa` | 1 | 1 | hero-grid.css |
| `rgba(170,170,68,0.15)` | 1 | 1 | mechanics.css |
| `rgba(170,170,68,0.12)` | 1 | 1 | mechanics.css |
| `rgba(255,215,0,0.12)` | 1 | 1 | runes.css |
| `rgba(255,193,7,0.12)` | 1 | 1 | runes.css |
| `rgba(255,215,0,0.15)` | 1 | 1 | runes.css |
| `rgba(255,193,7,0.35)` | 1 | 1 | runes.css |
| `rgba(255,215,0,0.5)` | 1 | 1 | runes.css |
| `rgba(255,200,0,0.35)` | 1 | 1 | search.css |
| `rgba(255,200,0,0.03)` | 1 | 1 | search.css |
| `rgba(255,215,0,0.25)` | 1 | 1 | storage.css |
| `rgba(255,215,0,0.06)` | 1 | 1 | storage.css |

### зелёный — 57 значений, 143 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#4caf50` | 10 | 5 | aibot.css, creeps.css, runes.css, search.css, info-auto-level.css |
| `#00ffaa` | 10 | 3 | armor-calc.css, formulas-calc.css, items.css |
| `#55ff55` | 10 | 5 | calc.css, effects.css, hero-grid.css, hero-page.css, items.css |
| `#44ff88` | 10 | 1 | map.css |
| `#55ff88` | 9 | 7 | calc.css, compare.css, faq.css, guides.css, lore.css, mechanics.css, monsters.css |
| `#00ff88` | 8 | 4 | hero-page.css, home.css, lore.css, mechanics.css |
| `#51cf66` | 4 | 2 | balance.css, calc.css |
| `rgba(76,175,80,0.15)` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#55ff55aa` | 3 | 2 | calc.css, items.css |
| `#55ff5544` | 3 | 2 | calc.css, items.css |
| `#55ff5555` | 3 | 2 | hero-grid.css, items.css |
| `#0a2a1a` | 3 | 3 | hero-page.css, lore.css, mechanics.css |
| `#00ff8866` | 3 | 3 | hero-page.css, home.css, lore.css |
| `#00cc66` | 3 | 3 | hero-page.css, home.css, lore.css |
| `#77ffaa` | 3 | 1 | map.css |
| `#66bb6a` | 2 | 2 | aibot.css, balance.css |
| `#aaffaa` | 2 | 2 | hero-grid.css, items.css |
| `#00ff8844` | 2 | 2 | hero-page.css, mechanics.css |
| `#00ff88aa` | 2 | 2 | home.css, lore.css |
| `#00ffaa55` | 2 | 1 | items.css |
| `#00ffaaaa` | 2 | 1 | items.css |
| `#00ffaa44` | 2 | 1 | items.css |
| `#55ff8844` | 2 | 2 | lore.css, mechanics.css |
| `#55ffcc44` | 2 | 2 | lore.css, mechanics.css |
| `#55ffcc` | 2 | 2 | lore.css, mechanics.css |
| `rgba(85,255,136,0)` | 2 | 1 | mechanics.css |
| `rgba(85,255,204,0.15)` | 2 | 1 | mechanics.css |
| `rgba(76,175,80,0.12)` | 2 | 2 | runes.css, info-auto-level.css |
| `#2ecc71` | 2 | 2 | sitemap-page.css, tierlist.css |
| `#44ff8822` | 2 | 1 | map.css |
| `rgba(68,255,136,0.2)` | 2 | 1 | map.css |
| `rgba(81,207,102,0.1)` | 1 | 1 | balance.css |
| `#55ff5566` | 1 | 1 | calc.css |
| `#4ade80` | 1 | 1 | calc.css |
| `#1a3a0a` | 1 | 1 | compare.css |
| `rgba(139,195,74,0.15)` | 1 | 1 | creeps.css |
| `#8bc34a` | 1 | 1 | creeps.css |
| `#6bcb77` | 1 | 1 | guides.css |
| `#00ff8888` | 1 | 1 | hero-page.css |
| `#00ff8822` | 1 | 1 | hero-page.css |
| `#00cc6644` | 1 | 1 | hero-page.css |
| `#66ffaa` | 1 | 1 | hero-page.css |
| `rgba(100,255,100,0.1)` | 1 | 1 | info.css |
| `rgba(100,255,100,0.3)` | 1 | 1 | info.css |
| `#64ff64` | 1 | 1 | info.css |
| `#1a2a0a` | 1 | 1 | mechanics.css |
| `rgba(0,255,136,0.15)` | 1 | 1 | mechanics.css |
| `rgba(0,255,136,0.2)` | 1 | 1 | mechanics.css |
| `rgba(85,255,136,0.3)` | 1 | 1 | mechanics.css |
| `rgba(85,255,136,0.15)` | 1 | 1 | mechanics.css |
| `#0a1a0a` | 1 | 1 | monsters.css |
| `#55ff8833` | 1 | 1 | monsters.css |
| `rgba(0,230,118,0.12)` | 1 | 1 | runes.css |
| `#00e676` | 1 | 1 | runes.css |
| `rgba(0,230,118,0.25)` | 1 | 1 | runes.css |
| `#81c784` | 1 | 1 | info-auto-level.css |
| `rgba(76,175,80,0.3)` | 1 | 1 | info-auto-level.css |

### белый/светлый — 18 значений, 75 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#fff` | 25 | 10 | base.css, hero-grid.css, home.css, info.css, items.css, lore.css, mechanics.css, monsters.css, storage.css, map.css |
| `#ffffff` | 14 | 8 | base.css, bot-builds.css, header-mobile.css, info.css, items.css, lore.css, mechanics.css, map.css |
| `rgba(255,255,255,0.04)` | 13 | 8 | aibot.css, balance-dashboard.css, balance.css, creeps.css, events.css, guides.css, info.css, repo-archive/balance-dashboard.css |
| `rgba(255,255,255,0.06)` | 3 | 3 | balance-dashboard.css, bot-builds.css, repo-archive/balance-dashboard.css |
| `#e3e9f5` | 3 | 2 | base.css, items.css |
| `#e0e8f0` | 3 | 1 | map.css |
| `rgba(255,255,255,0.03)` | 2 | 1 | info.css |
| `rgba(255,255,255,0.1)` | 2 | 2 | runes.css, info-auto-level.css |
| `rgba(255,255,255,0.25)` | 1 | 1 | bot-builds.css |
| `rgba(255,255,255,0.2)` | 1 | 1 | bot-builds.css |
| `rgba(255,255,255,0.12)` | 1 | 1 | hero-grid.css |
| `#f0f5ff` | 1 | 1 | items.css |
| `#e2e8f0` | 1 | 1 | items.css |
| `#ffffff44` | 1 | 1 | mechanics.css |
| `rgba(255,255,255,0.35)` | 1 | 1 | mechanics.css |
| `rgba(255,255,255,0.5)` | 1 | 1 | runes.css |
| `rgba(255,255,255,0.08)` | 1 | 1 | storage.css |
| `rgba(255,255,255,0.05)` | 1 | 1 | info-auto-level.css |

### нейтральный — 13 значений, 17 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#999` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#555` | 3 | 3 | balance-dashboard.css, tierlist.css, repo-archive/balance-dashboard.css |
| `rgba(120,120,120,0.15)` | 1 | 1 | aibot.css |
| `#adb5bd` | 1 | 1 | balance.css |
| `rgba(150,150,150,0.1)` | 1 | 1 | balance.css |
| `#666` | 1 | 1 | calc.css |
| `rgba(150,150,150,0.12)` | 1 | 1 | creeps.css |
| `rgba(150,150,150,0.15)` | 1 | 1 | creeps.css |
| `#aaa` | 1 | 1 | creeps.css |
| `#95a5a6` | 1 | 1 | tierlist.css |
| `#5a5a5a` | 1 | 1 | tierlist.css |
| `#3a3a3a` | 1 | 1 | tierlist.css |
| `#777` | 1 | 1 | tierlist.css |

### почти чёрный — 16 значений, 46 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#00000055` | 15 | 5 | effects.css, hero-page.css, home.css, items.css, lore.css |
| `rgba(0,0,0,0.15)` | 7 | 2 | aibot.css, guides.css |
| `#00000080` | 6 | 5 | gallery.css, hero-grid.css, hero-page.css, items.css, storage.css |
| `rgba(0,0,0,0.5)` | 3 | 2 | items.css, search.css |
| `#1a1a1a` | 2 | 2 | mechanics.css, tierlist.css |
| `rgba(0,0,0,0.3)` | 2 | 2 | search.css, tierlist.css |
| `rgba(0,0,0,0.25)` | 2 | 2 | storage.css, tierlist.css |
| `#00000066` | 1 | 1 | calc.css |
| `#000` | 1 | 1 | hero-grid.css |
| `#00000077` | 1 | 1 | home.css |
| `rgba(0,0,0,0.62)` | 1 | 1 | items.css |
| `#000000cc` | 1 | 1 | items.css |
| `rgba(0,0,0,0.7)` | 1 | 1 | search.css |
| `#000000aa` | 1 | 1 | search.css |
| `rgba(0,0,0,0.35)` | 1 | 1 | storage.css |
| `rgba(0,0,0,0.4)` | 1 | 1 | map.css |

## Стекломорфизм и эффекты

| Значение blur | Вхождений |
|---|---|
| 8px | 24 |
| 1px | 9 |
| 12px | 4 |
| 6px | 4 |
| 16px | 2 |
| 4px | 1 |

## border-radius

| Значение | Вхождений |
|---|---|
| 12px | 76 |
| 8px | 75 |
| 10px | 56 |
| 6px | 47 |
| 50% | 43 |
| 4px | 31 |
| 16px | 24 |
| 3px | 19 |
| 30px | 18 |
| 20px | 13 |
| 14px | 13 |
| 2px | 10 |
| 5px | 5 |
| 18px | 5 |
| 24px | 4 |
| 40px | 3 |
| 50px | 3 |
| 0 8px 8px 0 | 2 |
| 9px | 1 |
| 20px 20px 0 0 | 1 |
| 18px 18px 0 0 | 1 |
| 32px | 1 |
| 0 2px 2px 0 | 1 |
| 1px | 1 |
| 14px 14px 0 0 | 1 |

## Keyframes

abilityIconPulse, auroraBanner, auroraShift, bannerFadeIn, crownFloat, ctaBorderPulse, fadeSlideUp, float, galleryFadeIn, homeOrb2Pulse, homeOrbPulse, infoListIconPop, infoOrbPulse, infoStatBounce, logoBorderPulse, loreBorderShimmer, markerPulseCyan, markerPulseRed, mechBarrierRing, mechBlockShake, mechClickPress, mechClockSlowSpin, mechCorruptSpread, mechDiceRoll, mechDrainPulse, mechDrainRing, mechFireDim, mechFireEscalate, mechFireGlow, mechFlashFade, mechHeartGlow, mechHeartbeat, mechLightningFlash, mechPrismatic, mechPrismaticRing, mechPureFlash, mechRadiance, mechReflectBounce, mechSheenSweep, mechSuppressDim, mechSuppressOverlay, mechWindSway, modeBanSlam, modeBossAppear, modeGoldShake, modeNoBooksSlash, modeRandomSpin, modeSlashAppear, modeSoloFade, modeSpellShrink, modeTeamBounce, modeTurboPulse, modesPromoPulse, pageIn, pageOut, qlIconPop, rippleExpand, runeArmorSheen, runeBarrierRing, runeCoinShake, runeCrystalSparkle, runeCrystalSpin, runeDash, runeDrain, runeDrainIn, runeDrop, runeFade, runeFlame, runeGauge, runeGoldSheen, runeHealRing, runeHeartbeat, runeLevelGlow, runeLevelUp, runeManaPool, runeRefreshSpin, runeSpeedSweep, runeSplit, runeSplitGhost, runeStatSteps, runeWealthGlow, runeWealthWave, sparkleSweep, statIconBounce, timelinePulse, titleShimmer, ytPulse

## Цветов на файл (top 20)

| Файл | Цветовых литералов |
|---|---|
| css/items.css | 201 |
| css/hero-page.css | 134 |
| map.css | 125 |
| css/calc.css | 115 |
| css/mechanics.css | 102 |
| css/search.css | 98 |
| css/guides.css | 80 |
| css/info.css | 77 |
| css/lore.css | 68 |
| css/effects.css | 57 |
| css/home.css | 56 |
| css/storage.css | 54 |
| css/monsters.css | 51 |
| css/hero-grid.css | 50 |
| aibot.css | 44 |
| css/runes.css | 41 |
| css/balance.css | 35 |
| css/compare.css | 34 |
| css/creeps.css | 34 |
| css/bot-builds.css | 32 |
