# CSS-INLINE-AUDIT — хардкод стилей внутри HTML

Снимок на 2026-11-08. Генератор: `scripts/audit-inline-css.mjs`, перегенерация перезаписывает всё, кроме раздела после маркера «выводы ниже ведутся вручную». Метод: чтение 117 HTML из git, разбор style= атрибутов разметки, <style> блоков и inline-скриптов, сверка цветов с палитрой :root из base.css. Сайт не тронут: правки по отчёту отдельным чанком по решению владельца.

## Итог

| Показатель | Значение |
| style= атрибутов в разметке | 90 в 26 файлах из 117 |
| деклараций в них | 182 |
| <style> блоков | 7 в 6 файлах, 9396 байт |
| деклараций в блоках | 152 |
| шаблонных style= в inline-скриптах страниц | 79 |
| setProperty / cssText в inline-скриптах | 0 / 0 |
| всего деклараций в HTML | 334 |
| уникальных цветов | 42 (с палитрой: 2, вне: 40) |
| вхождений цветов, совпадающих с :root | 4 |
| вхождений цветов вне палитры | 90 |

## Файлы: style= и <style> по убыванию веса

| Файл | style= | декл. attr | <style> | байт | декл. блоков | всего декл. |
| site-validator.html | 2 | 2 | 2 | 5803 | 102 | 104 |
| events.html | 22 | 36 | 0 | 0 | 0 | 36 |
| 404.html | 0 | 0 | 1 | 2057 | 33 | 33 |
| mechanics.html | 8 | 14 | 1 | 854 | 15 | 29 |
| aibot.html | 11 | 22 | 0 | 0 | 0 | 22 |
| lore.html | 4 | 12 | 1 | 415 | 2 | 14 |
| balance-dashboard.html | 3 | 12 | 0 | 0 | 0 | 12 |
| heroes/arbiter.html | 3 | 7 | 0 | 0 | 0 | 7 |
| heroes/blademaster.html | 3 | 7 | 0 | 0 | 0 | 7 |
| heroes/thunder-lord-2.html | 3 | 7 | 0 | 0 | 0 | 7 |
| modes.html | 3 | 7 | 0 | 0 | 0 | 7 |
| items.html | 5 | 6 | 0 | 0 | 0 | 6 |
| gallery.html | 1 | 6 | 0 | 0 | 0 | 6 |
| runes.html | 1 | 6 | 0 | 0 | 0 | 6 |
| storage.html | 1 | 6 | 1 | 117 | 0 | 6 |
| info.html | 3 | 5 | 0 | 0 | 0 | 5 |
| faq.html | 2 | 5 | 0 | 0 | 0 | 5 |
| updates.html | 2 | 5 | 0 | 0 | 0 | 5 |
| heroes.html | 2 | 4 | 0 | 0 | 0 | 4 |
| sitemap-page.html | 2 | 3 | 0 | 0 | 0 | 3 |
| bot-builds.html | 2 | 2 | 0 | 0 | 0 | 2 |
| calculator.html | 2 | 2 | 0 | 0 | 0 | 2 |
| map-changes.html | 1 | 2 | 0 | 0 | 0 | 2 |
| build-constructor.html | 1 | 1 | 0 | 0 | 0 | 1 |
| guides/guide-admiral.html | 1 | 1 | 0 | 0 | 0 | 1 |
| guides/guide-druid.html | 1 | 1 | 0 | 0 | 0 | 1 |
| monsters.html | 1 | 1 | 1 | 150 | 0 | 1 |

Остальные файлы: ноль деклараций или единичные атрибуты, полный список в консольном выводе скрипта.

## Группы каталогов

| Каталог | Файлов | style= | декл. attr | декл. блоков |
| корень | 34 | 79 | 159 | 152 |
| heroes | 77 | 9 | 21 | 0 |
| guides | 6 | 2 | 2 | 0 |

## Свойства (top 20)

| Свойство | Вхождений | Значения (top 3) |
| color | 61 | `var(--accent-cyan)` x10, `var(--text-secondary)` x10, `#00e5ff` x8 |
| font-size | 29 | `0.9rem` x4, `0.85rem` x4, `0.8rem` x4 |
| padding | 23 | `0` x6, `12px 16px` x3, `40px 20px` x1 |
| margin-bottom | 20 | `24px` x6, `8px` x4, `18px` x4 |
| display | 19 | `flex` x10, `none` x7, `inline-flex` x1 |
| text-align | 17 | `center` x13, `right` x2, `left` x2 |
| gap | 17 | `12px` x7, `8px` x4, `10px` x3 |
| margin-top | 16 | `32px` x5, `24px` x4, `8px` x1 |
| align-items | 12 | `center` x9, `flex-start` x2, `stretch` x1 |
| border-radius | 12 | `10px` x6, `8px` x3, `12px` x2 |
| background | 10 | `rgba(255,193,7,0.08)` x3, `var(--glass-bg)` x1, `linear-gradient(135deg, #ffc80022, #ffc80011)` x1 |
| border | 10 | `1px solid rgba(255,193,7,0.35)` x3, `1px solid #1a3a5c` x3, `none` x2 |
| margin | 9 | `10px 0` x3, `36px 0` x1, `30px 0` x1 |
| justify-content | 8 | `center` x6, `space-between` x2 |
| border-color | 7 | `rgba(0,229,255,0.3)` x2, `#00e6ff44` x1, `rgba(255,165,0,0.3)` x1 |
| overflow-x | 7 | `auto` x7 |
| font-weight | 6 | `600` x4, `700` x2 |
| flex-wrap | 6 | `wrap` x6 |
| line-height | 4 | `1` x1, `1.6` x1, `1.5` x1 |
| text-decoration | 4 | `none` x4 |

## Цвета против палитры :root

Совпадения: значение уже есть в токенах, замена на var() механическая и не меняет рендер.

| Значение | Токен | Вхождений | Файлов |
| `#5a7a9a` | --text-dim | 3 | 1 |
| `#00e6ff` | --accent-cyan | 1 | 1 |

Вне палитры: решение редизайна — токенизировать, оставить как уникальный контент или привести к ближайшему токену.

| Значение | Вхождений | Файлов | Где |
| `#00e5ff` | 13 | 2 | attr, block |
| `#ffc107` | 6 | 3 | attr |
| `#1a3a5c` | 5 | 1 | block |
| `#0d1b2a` | 4 | 1 | block |
| `#ffaa44` | 4 | 1 | block |
| `#ff4444` | 4 | 1 | block |
| `rgba(0,229,255,0.3)` | 3 | 2 | attr, block |
| `rgba(255,193,7,0.08)` | 3 | 3 | attr |
| `rgba(255,193,7,0.35)` | 3 | 3 | attr |
| `rgba(255,255,255,0.08)` | 3 | 1 | block |
| `#c0d0e0` | 3 | 1 | block |
| `#55ff88` | 3 | 1 | block |
| `#00e6ff44` | 2 | 1 | block |
| `#ff6b35` | 2 | 1 | attr |
| `#ef4444` | 2 | 1 | attr |
| `#ff7777` | 2 | 2 | attr |
| `#ffc800` | 2 | 1 | attr |
| `rgba(5, 7, 10, 0.75)` | 2 | 1 | block |
| `#4fc3f7` | 2 | 1 | block |
| `#0a1628` | 2 | 1 | block |
| `#0a1a2a` | 1 | 1 | block |
| `#0f2535` | 1 | 1 | block |
| `rgba(255,165,0,0.3)` | 1 | 1 | attr |
| `#ffa500` | 1 | 1 | attr |
| `rgba(220,38,38,0.3)` | 1 | 1 | attr |
| `#ffc80022` | 1 | 1 | attr |
| `#ffc80011` | 1 | 1 | attr |
| `rgba(255,255,255,0.03)` | 1 | 1 | block |
| `rgba(79,195,247,0.15)` | 1 | 1 | block |
| `rgba(239,83,80,0.18)` | 1 | 1 | block |
| `#ef5350` | 1 | 1 | block |
| `#00a8cc` | 1 | 1 | block |
| `#0d1f35` | 1 | 1 | block |
| `#e0e8f0` | 1 | 1 | block |
| `#55ff8833` | 1 | 1 | block |
| `#ffaa4433` | 1 | 1 | block |
| `#ff444433` | 1 | 1 | block |
| `#111e30` | 1 | 1 | block |
| `#00e5ff22` | 1 | 1 | block |
| `rgba(255, 68, 68, 0.06)` | 1 | 1 | block |

## Повторяющиеся style= паттерны

Кандидаты на вынос в классы: одинаковые наборы деклараций на многих страницах.

| Раз | Декларации | Файлов |
| 7 | display: none | 5 |
| 6 | color: #ffc107 | 3 |
| 5 | overflow-x: auto; padding: 0 | 1 |
| 5 | color: var(--accent-cyan) | 3 |
| 5 | color: #00e5ff | 1 |
| 4 | margin-top: 32px; text-align: center | 4 |
| 3 | color: var(--text-secondary); margin-bottom: 24px; font-size: 1.05rem | 3 |
| 3 | color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 18px | 1 |
| 3 | margin-top: 24px; text-align: center; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap | 3 |
| 3 | background: rgba(255,193,7,0.08); border: 1px solid rgba(255,193,7,0.35); border-radius: 10px; padding: 12px 16px; margin: 10px 0 | 3 |
| 2 | text-decoration: none | 1 |
| 2 | color: var(--accent-cyan); margin-right: 10px | 2 |
| 2 | color: #ff6b35 | 1 |
| 2 | color: #ef4444 | 1 |
| 2 | border-color: rgba(0,229,255,0.3) | 1 |
| 2 | color: #ff7777 | 2 |
| 2 | font-size: 48px | 1 |
| 2 | overflow-x: auto | 1 |
| 2 | color: var(--text-muted); font-size: 0.85rem | 2 |

## Дубли <style> блоков между файлами

| Файлов с одинаковым блоком | Байт | Где |
| 2 | 150 | monsters.html, storage.html |

## Подключения css по страницам

| Файл css | Страниц |
| ../vendor/fontawesome/css/all.min.css | 83 |
| ../css/all.css | 83 |
| vendor/fontawesome/css/all.min.css | 34 |
| css/all.css | 33 |
| ../css/guides.css | 6 |
| info-auto-level.css | 2 |
| css/manifesto-support.css | 2 |
| aibot.css | 1 |
| css/armor-calc.css | 1 |
| css/balance-dashboard.css | 1 |
| css/balance.css | 1 |
| css/bot-builds.css | 1 |
| css/compare.css | 1 |
| css/creeps.css | 1 |
| css/events.css | 1 |
| css/faq.css | 1 |
| css/formulas-calc.css | 1 |
| css/gallery.css | 1 |
| css/guides.css | 1 |
| map.css | 1 |
| css/runes.css | 1 |
| css/sitemap-page.css | 1 |
| css/storage.css | 1 |
| css/tierlist.css | 1 |

## Стили из внешних js (top 12)

Прямые присваивания .style.*, setProperty, cssText и цветовые литералы в коде. Выносится не в разметку, а в токены и классы, либо через CSS-переменные.

| Файл | style.* = | setProperty | cssText | цветовых литералов |
| icon-loader.js | 16 | 0 | 0 | 0 |
| items-db.js | 8 | 0 | 0 | 7 |
| js/balance-dashboard-page.js | 2 | 0 | 0 | 11 |
| js/hero-stats-page.js | 0 | 0 | 0 | 13 |
| js/info-page.js | 13 | 0 | 0 | 0 |
| js/tierlist-page.js | 3 | 0 | 3 | 3 |
| js/item-slugs.js | 7 | 0 | 0 | 0 |
| ui-effects.js | 7 | 0 | 0 | 0 |
| js/armor-calc-page.js | 2 | 0 | 0 | 4 |
| map-data.js | 5 | 0 | 0 | 1 |
| search.js | 2 | 0 | 0 | 4 |
| js/bot-builds-page.js | 3 | 0 | 0 | 1 |

<!-- выводы ниже ведутся вручную, скрипт при перегенерации их сохраняет -->

## Выводы и почва для дизайн-системы (ручной раздел)

Масштаб умеренный: 334 декларации на 117 страниц. Почти половина приходится на два файла, которые не являются продуктом в обычном смысле: site-validator.html (104 декларации, не трогаем по решению владельца от 07.11) и 404.html (33). Реальный продуктовый хардкод сосредоточен в шести файлах: events (36), mechanics (29), aibot (22), lore (14), balance-dashboard (12), storage (6). Герои почти чисты: 9 атрибутов на 77 страниц, выносить там почти нечего.

Хардкод в HTML — три слоя разной природы:

1. Механика без решений: 4 вхождения точных совпадений с :root (#5a7a9a ×3, #00e6ff ×1) — меняются на var() при первом же касании файла, рендер не меняется.
2. Сбитые близнецы токенов: #00e5ff ×13 (events.html и site-validator.html) против --accent-cyan #00e6ff — разница в одной цифре, глазом неотличимо, но это дрейф палитры. Такие вещи дешевле всего ловит именно этот скрипт, поэтому он оставлен в scripts/ на постоянную работу.
3. Внепалитровые семейства: янтарный #ffc107 / #ffc800 / #ffaa44 / rgba(255,193,7,…) на wip-страницах героев (arbiter, blademaster, thunder-lord-2) и в events; красные #ff4444 / #ef4444 / #ff7777 / #ef5350; тёмные фоны панелей #0d1b2a / #0a1628 / #0a1a2a / #0f2535. Здесь нужно решение владельца: завести токены (gold/warning, danger, panel-фон) в :root и DESIGN.md, либо признать цвет контентным и оставить.

Повторяющиеся наборы деклараций — кандидаты на утилитарные классы: display:none ×7, overflow-x:auto; padding:0 ×5, color:var(--accent-cyan) ×5, margin-top:32px; text-align:center ×4, текстовый блок «color:var(--text-secondary); margin-bottom:24px» ×3, янтарная карточка-подсказка ×3. По правилу DESIGN.md порядок такой: класс сначала в css и в документ, потом в разметку.

<style> блоки продуктовых страниц (404.html 2057 Б, mechanics.html 854 Б, lore.html 415 Б, storage.html 117 Б) выносятся в css/*.css с пересборкой бандла build-css-bundle.py. Дублей между файлами нет, каждый блок уникален.

Слой JS — отдельный разговор редизайна: 68 прямых присваиваний .style.* и 44 цветовых литерала в 12 файлах (js/hero-stats-page.js 13 цветов, js/balance-dashboard-page.js 11, items-db.js 7), плюс 79 шаблонных style= внутри inline-скриптов страниц. Динамике либо читать var() через getComputedStyle, либо брать токены из game-constants.js, это решение вместе с редизайном.

Предлагаемый порядок будущего чанка (после решения владельца): точные совпадения в var(); #00e5ff в events.html на var(--accent-cyan); <style> блоки продуктовых страниц в css-файлы; повторяющиеся паттерны в классы; внепалитровые семейства — сначала решение о токенах, потом разметка. После каждого шага: пересборка бандла, гейты, скрины контрольных страниц.
