# CSS-INVENTORY — сырой инвентарь дизайн-значений в css

Генератор: `scripts/design-tokens.mjs` (node scripts/design-tokens.mjs --md docs/CSS-INVENTORY.md), перегенерация перезаписывает файл целиком. vendor/, генерируемый css/all.css и замороженный repo-archive/ исключены. Осмысленные выводы и токен-система — docs/DESIGN.md.

## Итог
| Показатель | Значение |
|---|---|
| css-файлов | 34 |
| уникальных цветов | 370 |
| вхождений цветов | 1257 |
| кастомных свойств объявлено | 81 |
| из них в :root | 81 |
| backdrop-filter: blur() | 155 |
| box-shadow | 205 |
| text-shadow | 46 |
| linear-gradient() | 52 |
| radial-gradient() | 52 |
| transition: | 204 |
| animation: | 117 |
| @keyframes | 85 |

## Токены (кастомные свойства)

| Токен | Значение | var() использований | Файлов | Где объявлен |
|---|---|---|---|---|
| --cyan-rgb | `0, 230, 255` | 342 | 1 | :root css/base.css |
| --accent-cyan | `rgb(var(--cyan-rgb))` | 315 | 1 | :root css/base.css |
| --surface-border | `rgba(var(--cyan-rgb), 0.12)` | 178 | 1 | :root css/glass.css |
| --text-secondary | `#8aa0c0` | 155 | 1 | :root css/base.css |
| --text-primary | `#e0f0ff` | 153 | 1 | :root css/base.css |
| --surface-blur | `12px` | 129 | 1 | :root css/glass.css |
| --surface-bg | `rgba(var(--surface-rgb), 0.5)` | 122 | 1 | :root css/glass.css |
| --red-rgb | `255, 85, 85` | 59 | 1 | :root css/base.css |
| --text-muted | `#7484a0` | 44 | 1 | :root css/base.css |
| --surface-border-hover | `rgba(var(--cyan-rgb), 0.35)` | 44 | 1 | :root css/glass.css |
| --text-dim | `#66829f` | 38 | 1 | :root css/base.css |
| --danger-soft | `rgb(var(--red-soft-rgb))` | 37 | 1 | :root css/base.css |
| --danger | `rgb(var(--red-rgb))` | 36 | 1 | :root css/base.css |
| --violet-rgb | `191, 127, 255` | 35 | 1 | :root css/base.css |
| --info-rgb | `85, 170, 255` | 30 | 1 | :root css/base.css |
| --surface-blur-soft | `8px` | 28 | 1 | :root css/glass.css |
| --magic | `rgb(var(--violet-rgb))` | 24 | 1 | :root css/base.css |
| --surface-bg-hover | `rgba(var(--surface-rgb), 0.65)` | 24 | 1 | :root css/glass.css |
| --steel-blue | `rgb(var(--steel-blue-rgb))` | 23 | 1 | :root css/base.css |
| --orange-rgb | `255, 136, 0` | 23 | 1 | :root css/base.css |
| --abyss | `rgb(var(--abyss-rgb))` | 20 | 1 | :root css/base.css |
| --text-ink | `rgb(var(--bg-rgb))` | 19 | 1 | :root css/base.css |
| --neon-glow | `0 0 20px rgba(var(--cyan-rgb), 0.2), 0 0 60px rgba(var(--cyan-rgb), 0.08)` | 18 | 1 | :root css/base.css |
| --red-deep-rgb | `255, 68, 68` | 16 | 1 | :root css/base.css |
| --gold-rgb | `255, 200, 0` | 16 | 1 | :root css/base.css |
| --surface-rgb | `15, 23, 42` | 15 | 1 | :root css/base.css |
| --text-strong | `#d0e0ff` | 15 | 1 | :root css/base.css |
| --steel | `rgb(var(--steel-rgb))` | 15 | 1 | :root css/base.css |
| --text-soft | `#c0d0e8` | 14 | 1 | :root css/base.css |
| --bg-glow | `rgb(var(--bg-glow-rgb))` | 13 | 1 | :root css/base.css |
| --agility-rgb | `85, 255, 85` | 13 | 1 | :root css/base.css |
| --surface-subtle-hover | `rgba(var(--cyan-rgb), 0.14)` | 13 | 2 | :root css/glass.css |
| --bg-deep | `rgb(var(--bg-deep-rgb))` | 12 | 1 | :root css/base.css |
| --info-blue | `rgb(var(--info-rgb))` | 12 | 1 | :root css/base.css |
| --mint-rgb | `0, 255, 136` | 12 | 1 | :root css/base.css |
| --danger-deep | `rgb(var(--red-deep-rgb))` | 12 | 1 | :root css/base.css |
| --gold-soft | `rgb(var(--gold-soft-rgb))` | 12 | 1 | :root css/base.css |
| --backdrop-rgb | `13, 27, 42` | 11 | 1 | :root css/base.css |
| --steel-deep | `rgb(var(--steel-deep-rgb))` | 11 | 1 | :root css/base.css |
| --panel-raised | `rgb(var(--panel-raised-rgb))` | 11 | 1 | :root css/base.css |
| --warning | `rgb(var(--orange-rgb))` | 11 | 1 | :root css/base.css |
| --agility | `rgb(var(--agility-rgb))` | 11 | 1 | :root css/base.css |
| --gold-bright-rgb | `255, 215, 0` | 10 | 1 | :root css/base.css |
| --warning-soft | `rgb(var(--orange-soft-rgb))` | 10 | 1 | :root css/base.css |
| --gold | `rgb(var(--gold-rgb))` | 10 | 1 | :root css/base.css |
| --spring | `rgb(var(--spring-rgb))` | 10 | 1 | :root css/base.css |
| --green-muted | `rgb(var(--green-muted-rgb))` | 10 | 1 | :root css/base.css |
| --orange-soft-rgb | `255, 153, 68` | 9 | 1 | :root css/base.css |
| --success | `rgb(var(--green-rgb))` | 9 | 1 | :root css/base.css |
| --mint | `rgb(var(--mint-rgb))` | 9 | 1 | :root css/base.css |
| --green-rgb | `85, 255, 136` | 8 | 1 | :root css/base.css |
| --gold-bright | `rgb(var(--gold-bright-rgb))` | 8 | 1 | :root css/base.css |
| --amber | `rgb(var(--amber-rgb))` | 8 | 1 | :root css/base.css |
| --neon-glow-strong | `0 0 20px rgba(var(--cyan-rgb), 0.35), 0 0 60px rgba(var(--cyan-rgb), 0.12), inset 0 0 15px rgba(var(--cyan-rgb), 0.04)` | 8 | 1 | :root css/base.css |
| --red-soft-rgb | `255, 107, 107` | 7 | 1 | :root css/base.css |
| --spring-rgb | `0, 255, 170` | 7 | 1 | :root css/base.css |
| --green-muted-rgb | `76, 175, 80` | 7 | 1 | :root css/base.css |
| --surface-tag-bg | `rgba(var(--cyan-rgb), 0.12)` | 7 | 2 | :root css/glass.css |
| --surface-tag-border | `rgba(var(--cyan-rgb), 0.32)` | 7 | 2 | :root css/glass.css |
| --surface-solid | `rgb(var(--surface-rgb))` | 7 | 1 | :root css/glass.css |
| --container-rgb | `10, 20, 40` | 6 | 1 | :root css/base.css |
| --amber-rgb | `255, 193, 7` | 6 | 1 | :root css/base.css |
| --subtle-rgb | `0, 255, 255` | 5 | 1 | :root css/base.css |
| --backdrop-solid | `rgb(var(--backdrop-rgb))` | 5 | 1 | :root css/base.css |
| --gold-dim-rgb | `170, 170, 68` | 5 | 1 | :root css/base.css |
| --bg-deep-rgb | `5, 7, 10` | 4 | 1 | :root css/base.css |
| --gold-soft-rgb | `255, 217, 102` | 4 | 1 | :root css/base.css |
| --surface-subtle | `rgba(var(--cyan-rgb), 0.08)` | 4 | 2 | :root css/glass.css |
| --bg-rgb | `11, 14, 20` | 3 | 1 | :root css/base.css |
| --panel-rgb | `18, 25, 40` | 3 | 1 | :root css/base.css |
| --mint-deep | `rgb(var(--mint-deep-rgb))` | 3 | 1 | :root css/base.css |
| --abyss-rgb | `10, 16, 32` | 2 | 1 | :root css/base.css |
| --bg-base | `rgb(var(--bg-rgb))` | 2 | 1 | :root css/base.css |
| --mint-deep-rgb | `0, 204, 102` | 2 | 1 | :root css/base.css |
| --gold-dim | `rgb(var(--gold-dim-rgb))` | 2 | 1 | :root css/base.css |
| --surface-tag-active | `rgba(var(--cyan-rgb), 0.28)` | 2 | 2 | :root css/glass.css |
| --bg-glow-rgb | `26, 35, 48` | 1 | 1 | :root css/base.css |
| --steel-rgb | `42, 64, 96` | 1 | 1 | :root css/base.css |
| --steel-deep-rgb | `26, 48, 80` | 1 | 1 | :root css/base.css |
| --steel-blue-rgb | `42, 80, 112` | 1 | 1 | :root css/base.css |
| --panel-raised-rgb | `26, 39, 68` | 1 | 1 | :root css/base.css |

## Цвета по семействам

### циан — 40 значений, 63 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#74c0fc` | 6 | 3 | balance.css, calc.css, guides.css |
| `#2196f3` | 5 | 2 | aibot.css, info-auto-level.css |
| `rgba(33,150,243,0.15)` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#42a5f5` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#0f2535` | 3 | 2 | calc.css, tierlist.css |
| `#0a1a1a` | 3 | 3 | hero-page.css, lore.css, mechanics.css |
| `rgba(96,125,139,0.2)` | 2 | 2 | aibot.css, balance.css |
| `#90a4ae` | 2 | 2 | aibot.css, balance.css |
| `#1a5a7a` | 2 | 1 | compare.css |
| `#44ccff` | 2 | 1 | effects.css |
| `#c0e4ff` | 2 | 2 | hero-page.css, items.css |
| `#3498db` | 2 | 2 | sitemap-page.css, tierlist.css |
| `#607d8b` | 1 | 1 | aibot.css |
| `rgba(116,192,252,0.1)` | 1 | 1 | balance.css |
| `#e0f0ff` | 1 | 1 | base.css |
| `#26a5e4` | 1 | 1 | calc.css |
| `#3a8aa0` | 1 | 1 | compare.css |
| `rgba(0,150,255,0.12)` | 1 | 1 | creeps.css |
| `#5cb8ff` | 1 | 1 | creeps.css |
| `#4ecdc4` | 1 | 1 | guides.css |
| `#6a9ec0` | 1 | 1 | items.css |
| `rgba(64,160,255,0.12)` | 1 | 1 | items.css |
| `rgba(106,205,255,0.8)` | 1 | 1 | items.css |
| `#d2f3ff` | 1 | 1 | items.css |
| `rgba(64,160,255,0.22)` | 1 | 1 | items.css |
| `#55ccff44` | 1 | 1 | mechanics.css |
| `#55ccff` | 1 | 1 | mechanics.css |
| `#5a8aa0` | 1 | 1 | mechanics.css |
| `rgba(85,204,255,0.15)` | 1 | 1 | mechanics.css |
| `#5a8aaa` | 1 | 1 | monsters.css |
| `rgba(0,180,255,0.12)` | 1 | 1 | runes.css |
| `#00b4ff` | 1 | 1 | runes.css |
| `rgba(120,144,156,0.12)` | 1 | 1 | runes.css |
| `#78909c` | 1 | 1 | runes.css |
| `rgba(0,180,255,0.4)` | 1 | 1 | runes.css |
| `rgba(0,180,255,0.3)` | 1 | 1 | runes.css |
| `#64b5f6` | 1 | 1 | info-auto-level.css |
| `rgba(33,150,243,0.12)` | 1 | 1 | info-auto-level.css |
| `rgba(33,150,243,0.3)` | 1 | 1 | info-auto-level.css |
| `#66f0ff` | 1 | 1 | map.css |

### синий — 70 значений, 122 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#8e97aa` | 7 | 1 | search.css |
| `#5a6a7a` | 5 | 1 | search.css |
| `#4488ff` | 5 | 1 | map.css |
| `#88aacc` | 5 | 1 | map.css |
| `#0a1628` | 5 | 1 | map.css |
| `#111e30` | 4 | 1 | compare.css |
| `#b0c8f0` | 4 | 3 | hero-grid.css, items.css, lore.css |
| `#c0d4ff` | 4 | 2 | hero-page.css, lore.css |
| `#3a5a7a` | 3 | 1 | compare.css |
| `#1e3a5a` | 3 | 2 | hero-page.css, lore.css |
| `#0e1a2b` | 3 | 2 | hero-page.css, lore.css |
| `#b0c4de` | 3 | 2 | hero-page.css, mechanics.css |
| `#8ab4f0` | 3 | 2 | hero-page.css, items.css |
| `#b0b9d0` | 2 | 1 | calc.css |
| `#3a4a5a` | 2 | 2 | compare.css, search.css |
| `#0d1f35` | 2 | 1 | compare.css |
| `#5a5a7a` | 2 | 1 | compare.css |
| `#2a2a3a` | 2 | 1 | compare.css |
| `#66aaff` | 2 | 1 | effects.css |
| `#aaccff` | 2 | 2 | hero-grid.css, items.css |
| `#7a8faa` | 2 | 1 | items.css |
| `#c8d8f0` | 2 | 1 | storage.css |
| `#9ab` | 2 | 1 | storage.css |
| `#1a3a5c` | 2 | 1 | map.css |
| `#d0e0ff` | 1 | 1 | base.css |
| `#c0d0e8` | 1 | 1 | base.css |
| `#8aa0c0` | 1 | 1 | base.css |
| `#7484a0` | 1 | 1 | base.css |
| `#66829f` | 1 | 1 | base.css |
| `#a8bcdc` | 1 | 1 | base.css |
| `#8ea3c0` | 1 | 1 | base.css |
| `#7e9ab8` | 1 | 1 | base.css |
| `#4a76a8` | 1 | 1 | calc.css |
| `#5865f2` | 1 | 1 | calc.css |
| `#7a8a9a` | 1 | 1 | compare.css |
| `rgba(92,107,192,0.15)` | 1 | 1 | creeps.css |
| `#7986cb` | 1 | 1 | creeps.css |
| `rgba(0,20,40,0.4)` | 1 | 1 | gallery.css |
| `#1e1e2a` | 1 | 1 | hero-grid.css |
| `#a0b5d0` | 1 | 1 | hero-grid.css |
| `#1a1a2e` | 1 | 1 | hero-grid.css |
| `#3a5070` | 1 | 1 | hero-page.css |
| `#b8cef0` | 1 | 1 | hero-page.css |
| `#8ab4f8` | 1 | 1 | hero-page.css |
| `#152030` | 1 | 1 | hero-page.css |
| `#9bb8d8` | 1 | 1 | hero-page.css |
| `#132030` | 1 | 1 | hero-page.css |
| `#7a8fa8` | 1 | 1 | hero-page.css |
| `#4da6ff` | 1 | 1 | hero-page.css |
| `#1a2a45` | 1 | 1 | hero-page.css |
| `#050a12` | 1 | 1 | info.css |
| `#d0dff0` | 1 | 1 | items.css |
| `#1a2e44` | 1 | 1 | items.css |
| `#e0ecff` | 1 | 1 | items.css |
| `#aac4f0` | 1 | 1 | items.css |
| `#2a334a` | 1 | 1 | items.css |
| `rgba(90,122,154,0.4)` | 1 | 1 | items.css |
| `#a9c7ff` | 1 | 1 | items.css |
| `#4a5f7a` | 1 | 1 | items.css |
| `#aac8ff` | 1 | 1 | lore.css |
| `#1a2540` | 1 | 1 | monsters.css |
| `#5a6a80` | 1 | 1 | search.css |
| `#060d14` | 1 | 1 | search.css |
| `#a0c0e0` | 1 | 1 | search.css |
| `#2a3a4a` | 1 | 1 | storage.css |
| `#4488ff22` | 1 | 1 | map.css |
| `#88aacc22` | 1 | 1 | map.css |
| `#77aaff` | 1 | 1 | map.css |
| `rgba(68,136,255,0.2)` | 1 | 1 | map.css |
| `#aaccee` | 1 | 1 | map.css |

### фиолет/магента — 40 значений, 64 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#1a0a2a` | 5 | 3 | hero-page.css, lore.css, mechanics.css |
| `#aa44ff` | 5 | 1 | map.css |
| `#9c27b0` | 4 | 2 | runes.css, info-auto-level.css |
| `#ab47bc` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#1a0a1a` | 3 | 3 | info.css, lore.css, mechanics.css |
| `rgba(171,71,188,0.15)` | 2 | 2 | aibot.css, creeps.css |
| `#cc44ff` | 2 | 1 | effects.css |
| `#2a1a3a` | 2 | 2 | hero-page.css, monsters.css |
| `#aa44aa44` | 2 | 2 | lore.css, mechanics.css |
| `#aa44aa` | 2 | 2 | lore.css, mechanics.css |
| `rgba(170,68,170,0.3)` | 2 | 1 | mechanics.css |
| `rgba(156,39,176,0.12)` | 2 | 2 | runes.css, info-auto-level.css |
| `rgba(170,120,255,0.4)` | 2 | 1 | storage.css |
| `#c9a6ff` | 2 | 1 | storage.css |
| `rgba(156,39,176,0.15)` | 1 | 1 | balance.css |
| `#aa55ff` | 1 | 1 | formulas-calc.css |
| `#a78bfa` | 1 | 1 | guides.css |
| `#e0b0ff` | 1 | 1 | hero-page.css |
| `#8800ff` | 1 | 1 | hero-page.css |
| `#ff66c4` | 1 | 1 | items.css |
| `#ff66c488` | 1 | 1 | items.css |
| `#1a1020` | 1 | 1 | items.css |
| `#e040fb22` | 1 | 1 | items.css |
| `#e040fb44` | 1 | 1 | items.css |
| `#e040fb88` | 1 | 1 | items.css |
| `#f0a0ff` | 1 | 1 | items.css |
| `#2a1a2a` | 1 | 1 | mechanics.css |
| `rgba(40,0,40,0.4)` | 1 | 1 | mechanics.css |
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

### красный — 51 значений, 83 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#ff66aa` | 5 | 1 | map.css |
| `#ff6666` | 4 | 2 | effects.css, search.css |
| `#2a0a0a` | 4 | 3 | lore.css, mechanics.css, monsters.css |
| `#ff7043` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#ef5350` | 3 | 3 | aibot.css, balance.css, info-auto-level.css |
| `rgba(255,60,60,0.15)` | 3 | 1 | bot-builds.css |
| `#ff8888` | 3 | 2 | items.css, monsters.css |
| `#2a0a1a` | 3 | 2 | lore.css, mechanics.css |
| `#e74c3c` | 3 | 2 | sitemap-page.css, tierlist.css |
| `#f44336` | 3 | 1 | info-auto-level.css |
| `rgba(255,87,34,0.15)` | 2 | 2 | aibot.css, balance.css |
| `rgba(244,67,54,0.15)` | 2 | 2 | aibot.css, balance.css |
| `rgba(255,60,60,0.4)` | 2 | 1 | bot-builds.css |
| `rgba(255,60,60,0.3)` | 2 | 1 | bot-builds.css |
| `#ffaaaa` | 2 | 2 | hero-grid.css, items.css |
| `#ff9a9a` | 2 | 1 | items.css |
| `#5a3a3a` | 2 | 1 | search.css |
| `#ff8080` | 2 | 1 | storage.css |
| `rgba(255,40,40,0.03)` | 1 | 1 | bot-builds.css |
| `rgba(255,40,40,0.06)` | 1 | 1 | bot-builds.css |
| `rgba(255,40,40,0.1)` | 1 | 1 | bot-builds.css |
| `#ff0000` | 1 | 1 | calc.css |
| `rgba(255,112,67,0.15)` | 1 | 1 | creeps.css |
| `rgba(220,38,38,0.15)` | 1 | 1 | events.css |
| `#ef4444` | 1 | 1 | events.css |
| `rgba(220,38,38,0.3)` | 1 | 1 | events.css |
| `#ff55aa` | 1 | 1 | formulas-calc.css |
| `#3a1a1a` | 1 | 1 | items.css |
| `#ff6b3522` | 1 | 1 | items.css |
| `#ff6b3544` | 1 | 1 | items.css |
| `#ff6b3588` | 1 | 1 | items.css |
| `rgba(255,120,120,0.4)` | 1 | 1 | items.css |
| `rgba(255,120,120,0.12)` | 1 | 1 | items.css |
| `#ff664444` | 1 | 1 | mechanics.css |
| `#ff6644` | 1 | 1 | mechanics.css |
| `rgba(255,102,68,0.2)` | 1 | 1 | mechanics.css |
| `#1a0a0a` | 1 | 1 | monsters.css |
| `rgba(255,71,87,0.12)` | 1 | 1 | runes.css |
| `#ff4757` | 1 | 1 | runes.css |
| `rgba(180,0,0,0.12)` | 1 | 1 | runes.css |
| `#cc0000` | 1 | 1 | runes.css |
| `rgba(233,30,99,0.12)` | 1 | 1 | runes.css |
| `#e91e63` | 1 | 1 | runes.css |
| `rgba(204,0,0,0.45)` | 1 | 1 | runes.css |
| `rgba(233,30,99,0.4)` | 1 | 1 | runes.css |
| `#ff5050` | 1 | 1 | search.css |
| `rgba(244,67,54,0.12)` | 1 | 1 | info-auto-level.css |
| `rgba(244,67,54,0.3)` | 1 | 1 | info-auto-level.css |
| `#ff66aa22` | 1 | 1 | map.css |
| `#ff99cc` | 1 | 1 | map.css |
| `rgba(255,102,170,0.3)` | 1 | 1 | map.css |

### оранж — 36 значений, 73 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#ffa500` | 8 | 4 | balance-dashboard.css, events.css, search.css, tierlist.css |
| `#ff9800` | 6 | 3 | aibot.css, runes.css, info-auto-level.css |
| `#2a1a0a` | 6 | 5 | hero-page.css, items.css, lore.css, mechanics.css, monsters.css |
| `#ffaa44` | 5 | 1 | map.css |
| `#ff8844` | 4 | 2 | effects.css, hero-grid.css |
| `#ff922b` | 3 | 2 | calc.css, guides.css |
| `rgba(255,165,0,0.3)` | 3 | 2 | events.css, search.css |
| `#ffaa66` | 2 | 1 | effects.css |
| `rgba(255,165,0,0.15)` | 2 | 2 | events.css, search.css |
| `#ff8844aa` | 2 | 1 | hero-grid.css |
| `#ffcc66` | 2 | 1 | hero-page.css |
| `#ffb347` | 2 | 2 | hero-page.css, items.css |
| `#ffaa33` | 2 | 1 | items.css |
| `#ffaa33aa` | 2 | 1 | items.css |
| `#ffaa3344` | 2 | 1 | items.css |
| `rgba(255,152,0,0.12)` | 2 | 2 | runes.css, info-auto-level.css |
| `rgba(255,165,0,0.06)` | 1 | 1 | balance-dashboard.css |
| `rgba(255,165,0,0.08)` | 1 | 1 | balance-dashboard.css |
| `rgba(255,165,0,0.2)` | 1 | 1 | balance-dashboard.css |
| `rgba(255,136,68,0.15)` | 1 | 1 | hero-grid.css |
| `#ff884466` | 1 | 1 | hero-grid.css |
| `rgba(255,136,68,0.1)` | 1 | 1 | hero-grid.css |
| `#ffb34744` | 1 | 1 | hero-page.css |
| `#3a1a0a` | 1 | 1 | hero-page.css |
| `#ffcc44` | 1 | 1 | hero-page.css |
| `#ffbb66` | 1 | 1 | items.css |
| `#ffcc4455` | 1 | 1 | items.css |
| `#ffb088` | 1 | 1 | items.css |
| `#ffaa3355` | 1 | 1 | items.css |
| `rgba(255,165,0,0.05)` | 1 | 1 | search.css |
| `#f39c12` | 1 | 1 | tierlist.css |
| `#ffb74d` | 1 | 1 | info-auto-level.css |
| `rgba(255,152,0,0.3)` | 1 | 1 | info-auto-level.css |
| `#ffaa4422` | 1 | 1 | map.css |
| `#ffcc77` | 1 | 1 | map.css |
| `rgba(255,170,68,0.2)` | 1 | 1 | map.css |

### золото/янтарь — 4 значений, 11 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#ffd43b` | 6 | 4 | balance-dashboard.css, balance.css, calc.css, creeps.css |
| `#1a1a0a` | 2 | 2 | lore.css, mechanics.css |
| `#ffd700` | 2 | 1 | tierlist.css |
| `rgba(255,212,59,0.08)` | 1 | 1 | balance-dashboard.css |

### зелёный — 81 значений, 714 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `rgba(var(--cyan-rgb)` | 339 | 29 | aibot.css, balance-dashboard.css, balance.css, base.css, bot-builds.css, calc.css, compare.css, creeps.css, effects.css, events.css, faq.css, formulas-calc.css, gallery.css, glass.css, guides.css, header-mobile.css, hero-grid.css, hero-page.css, home.css, info.css, items.css, lore.css, manifesto-support.css, mechanics.css, monsters.css, search.css, storage.css, tierlist.css, map.css |
| `rgba(var(--red-rgb)` | 58 | 14 | calc.css, creeps.css, effects.css, guides.css, hero-grid.css, home.css, info.css, items.css, lore.css, mechanics.css, monsters.css, runes.css, search.css, storage.css |
| `rgba(var(--violet-rgb)` | 34 | 7 | calc.css, hero-page.css, home.css, items.css, lore.css, mechanics.css, monsters.css |
| `rgba(var(--info-rgb)` | 26 | 7 | calc.css, effects.css, hero-grid.css, home.css, items.css, lore.css, mechanics.css |
| `rgba(var(--orange-rgb)` | 22 | 3 | calc.css, hero-page.css, items.css |
| `rgba(var(--gold-rgb)` | 15 | 5 | bot-builds.css, calc.css, creeps.css, info.css, search.css |
| `rgba(var(--red-deep-rgb)` | 15 | 5 | items.css, lore.css, mechanics.css, search.css, map.css |
| `rgba(var(--surface-rgb)` | 14 | 9 | base.css, calc.css, gallery.css, glass.css, hero-page.css, items.css, lore.css, manifesto-support.css, search.css |
| `rgba(var(--agility-rgb)` | 12 | 4 | calc.css, hero-grid.css, info.css, items.css |
| `rgba(var(--mint-rgb)` | 11 | 4 | hero-page.css, home.css, lore.css, mechanics.css |
| `rgba(var(--backdrop-rgb)` | 10 | 7 | aibot.css, balance-dashboard.css, balance.css, creeps.css, items.css, storage.css, map.css |
| `#44ff88` | 10 | 1 | map.css |
| `rgba(var(--gold-bright-rgb)` | 9 | 2 | runes.css, storage.css |
| `rgba(var(--orange-soft-rgb)` | 8 | 5 | hero-page.css, items.css, lore.css, mechanics.css, monsters.css |
| `rgba(var(--green-rgb)` | 7 | 3 | lore.css, mechanics.css, monsters.css |
| `rgba(var(--green-muted-rgb)` | 6 | 5 | aibot.css, balance.css, creeps.css, runes.css, info-auto-level.css |
| `rgba(var(--red-soft-rgb)` | 6 | 5 | balance-dashboard.css, balance.css, guides.css, info.css, monsters.css |
| `rgba(var(--container-rgb)` | 6 | 3 | base.css, info.css, items.css |
| `rgba(var(--spring-rgb)` | 6 | 1 | items.css |
| `rgba(var(--amber-rgb)` | 5 | 4 | aibot.css, balance.css, creeps.css, runes.css |
| `rgba(var(--subtle-rgb)` | 5 | 1 | glass.css |
| `#51cf66` | 4 | 2 | balance.css, calc.css |
| `rgb(var(--info-rgb)` | 4 | 4 | base.css, hero-grid.css, items.css, search.css |
| `rgba(var(--gold-dim-rgb)` | 4 | 2 | lore.css, mechanics.css |
| `rgb(var(--cyan-rgb)` | 3 | 3 | base.css, home.css, lore.css |
| `rgba(var(--gold-soft-rgb)` | 3 | 2 | effects.css, hero-grid.css |
| `rgba(var(--bg-deep-rgb)` | 3 | 2 | gallery.css, home.css |
| `rgba(var(--panel-rgb)` | 3 | 2 | hero-page.css, items.css |
| `#0a2a1a` | 3 | 3 | hero-page.css, lore.css, mechanics.css |
| `#77ffaa` | 3 | 1 | map.css |
| `#66bb6a` | 2 | 2 | aibot.css, balance.css |
| `rgb(var(--bg-rgb)` | 2 | 1 | base.css |
| `#aaffaa` | 2 | 2 | hero-grid.css, items.css |
| `#55ffcc44` | 2 | 2 | lore.css, mechanics.css |
| `#55ffcc` | 2 | 2 | lore.css, mechanics.css |
| `rgba(85,255,204,0.15)` | 2 | 1 | mechanics.css |
| `#2ecc71` | 2 | 2 | sitemap-page.css, tierlist.css |
| `#44ff8822` | 2 | 1 | map.css |
| `rgba(68,255,136,0.2)` | 2 | 1 | map.css |
| `rgba(81,207,102,0.1)` | 1 | 1 | balance.css |
| `rgb(var(--bg-deep-rgb)` | 1 | 1 | base.css |
| `rgb(var(--bg-glow-rgb)` | 1 | 1 | base.css |
| `rgb(var(--backdrop-rgb)` | 1 | 1 | base.css |
| `rgb(var(--steel-rgb)` | 1 | 1 | base.css |
| `rgb(var(--steel-deep-rgb)` | 1 | 1 | base.css |
| `rgb(var(--steel-blue-rgb)` | 1 | 1 | base.css |
| `rgb(var(--panel-raised-rgb)` | 1 | 1 | base.css |
| `rgb(var(--abyss-rgb)` | 1 | 1 | base.css |
| `rgb(var(--red-rgb)` | 1 | 1 | base.css |
| `rgb(var(--red-deep-rgb)` | 1 | 1 | base.css |
| `rgb(var(--red-soft-rgb)` | 1 | 1 | base.css |
| `rgb(var(--orange-rgb)` | 1 | 1 | base.css |
| `rgb(var(--orange-soft-rgb)` | 1 | 1 | base.css |
| `rgb(var(--gold-rgb)` | 1 | 1 | base.css |
| `rgb(var(--gold-bright-rgb)` | 1 | 1 | base.css |
| `rgb(var(--gold-soft-rgb)` | 1 | 1 | base.css |
| `rgb(var(--amber-rgb)` | 1 | 1 | base.css |
| `rgb(var(--gold-dim-rgb)` | 1 | 1 | base.css |
| `rgb(var(--violet-rgb)` | 1 | 1 | base.css |
| `rgb(var(--green-rgb)` | 1 | 1 | base.css |
| `rgb(var(--mint-rgb)` | 1 | 1 | base.css |
| `rgb(var(--mint-deep-rgb)` | 1 | 1 | base.css |
| `rgb(var(--spring-rgb)` | 1 | 1 | base.css |
| `rgb(var(--agility-rgb)` | 1 | 1 | base.css |
| `rgb(var(--green-muted-rgb)` | 1 | 1 | base.css |
| `#4ade80` | 1 | 1 | calc.css |
| `#1a3a0a` | 1 | 1 | compare.css |
| `rgba(139,195,74,0.15)` | 1 | 1 | creeps.css |
| `#8bc34a` | 1 | 1 | creeps.css |
| `rgb(var(--surface-rgb)` | 1 | 1 | glass.css |
| `#6bcb77` | 1 | 1 | guides.css |
| `rgba(var(--bg-rgb)` | 1 | 1 | hero-grid.css |
| `rgba(var(--mint-deep-rgb)` | 1 | 1 | hero-page.css |
| `#66ffaa` | 1 | 1 | hero-page.css |
| `rgba(var(--abyss-rgb)` | 1 | 1 | items.css |
| `#1a2a0a` | 1 | 1 | mechanics.css |
| `#0a1a0a` | 1 | 1 | monsters.css |
| `rgba(0,230,118,0.12)` | 1 | 1 | runes.css |
| `#00e676` | 1 | 1 | runes.css |
| `rgba(0,230,118,0.25)` | 1 | 1 | runes.css |
| `#81c784` | 1 | 1 | info-auto-level.css |

### белый/светлый — 19 значений, 64 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#fff` | 20 | 9 | base.css, hero-grid.css, home.css, items.css, lore.css, mechanics.css, monsters.css, storage.css, map.css |
| `#ffffff` | 14 | 7 | base.css, bot-builds.css, header-mobile.css, items.css, lore.css, mechanics.css, map.css |
| `rgba(255,255,255,0.04)` | 9 | 6 | aibot.css, balance-dashboard.css, balance.css, creeps.css, events.css, guides.css |
| `#e0e8f0` | 3 | 1 | map.css |
| `rgba(255,255,255,0.06)` | 2 | 2 | balance-dashboard.css, bot-builds.css |
| `rgba(255,255,255,0.03)` | 2 | 1 | info.css |
| `rgba(255,255,255,0.1)` | 2 | 2 | runes.css, info-auto-level.css |
| `#f2f8ff` | 1 | 1 | base.css |
| `#e4eefc` | 1 | 1 | base.css |
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

### нейтральный — 13 значений, 16 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#999` | 3 | 3 | aibot.css, balance.css, creeps.css |
| `#555` | 2 | 2 | balance-dashboard.css, tierlist.css |
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

### почти чёрный — 16 значений, 47 вхождений

| Значение | Вхождений | Файлов | Где |
|---|---|---|---|
| `#00000055` | 15 | 5 | effects.css, hero-page.css, home.css, items.css, lore.css |
| `rgba(0,0,0,0.15)` | 7 | 2 | aibot.css, guides.css |
| `#00000080` | 6 | 5 | gallery.css, hero-grid.css, hero-page.css, items.css, storage.css |
| `rgba(0,0,0,0.5)` | 3 | 2 | items.css, search.css |
| `rgba(0,0,0,0.4)` | 2 | 2 | base.css, map.css |
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

## Стекломорфизм и эффекты

| Значение blur | Вхождений |
|---|---|
| --surface-blur | 127 |
| --surface-blur-soft | 28 |

## border-radius

| Значение | Вхождений |
|---|---|
| 12px | 74 |
| 8px | 74 |
| 10px | 55 |
| 6px | 47 |
| 50% | 32 |
| 4px | 31 |
| 16px | 23 |
| 30px | 18 |
| 3px | 17 |
| 14px | 14 |
| 20px | 13 |
| 2px | 10 |
| 5px | 5 |
| 18px | 5 |
| 24px | 4 |
| 40px | 3 |
| 50px | 3 |
| 0 8px 8px 0 | 2 |
| 11px | 1 |
| 9px | 1 |
| 20px 20px 0 0 | 1 |
| 18px 18px 0 0 | 1 |
| 32px | 1 |
| 0 2px 2px 0 | 1 |
| 1px | 1 |
| 14px 14px 0 0 | 1 |

## Keyframes

abilityIconPulse, auroraBanner, auroraShift, bannerFadeIn, crownFloat, ctaBorderPulse, fadeSlideUp, float, galleryFadeIn, infoListIconPop, infoStatBounce, logoBorderPulse, loreBorderShimmer, markerPulseCyan, markerPulseRed, mechBarrierRing, mechBlockShake, mechClickPress, mechClockSlowSpin, mechCorruptSpread, mechDiceRoll, mechDrainPulse, mechDrainRing, mechFireDim, mechFireEscalate, mechFireGlow, mechFlashFade, mechHeartGlow, mechHeartbeat, mechLightningFlash, mechPrismatic, mechPrismaticRing, mechPureFlash, mechRadiance, mechReflectBounce, mechSheenSweep, mechSuppressDim, mechSuppressOverlay, mechWindSway, modeBanSlam, modeBossAppear, modeGoldShake, modeNoBooksSlash, modeRandomSpin, modeSlashAppear, modeSoloFade, modeSpellShrink, modeTeamBounce, modeTurboPulse, modesPromoPulse, orbFloat, pageIn, pageOut, qlIconPop, rippleExpand, runeArmorSheen, runeBarrierRing, runeCoinShake, runeCrystalSparkle, runeCrystalSpin, runeDash, runeDrain, runeDrainIn, runeDrop, runeFade, runeFlame, runeGauge, runeGoldSheen, runeHealRing, runeHeartbeat, runeLevelGlow, runeLevelUp, runeManaPool, runeRefreshSpin, runeSpeedSweep, runeSplit, runeSplitGhost, runeStatSteps, runeWealthGlow, runeWealthWave, sparkleSweep, statIconBounce, timelinePulse, titleShimmer, ytPulse

## Цветов на файл (top 20)

| Файл | Цветовых литералов |
|---|---|
| css/items.css | 156 |
| css/hero-page.css | 97 |
| map.css | 93 |
| css/search.css | 80 |
| css/mechanics.css | 76 |
| css/calc.css | 66 |
| css/base.css | 65 |
| css/guides.css | 55 |
| css/lore.css | 50 |
| css/info.css | 47 |
| css/storage.css | 47 |
| css/home.css | 40 |
| css/runes.css | 36 |
| css/hero-grid.css | 34 |
| css/effects.css | 33 |
| aibot.css | 31 |
| css/balance.css | 30 |
| info-auto-level.css | 29 |
| css/creeps.css | 28 |
| css/monsters.css | 26 |
