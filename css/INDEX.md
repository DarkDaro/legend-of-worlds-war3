# CSS Index — HeroData

## Файлы и их назначение

| Файл | Размер | Страница | Зона ответственности |
|------|--------|----------|----------------------|
| `base.css` | 2.4 KB | Все | `.wiki-container`, ресеты, переменные, body |
| `hero-grid.css` | 6.2 KB | heroes.html | Фильтры, сетка героев, карточки героев, бейджи атрибутов |
| `hero-page.css` | 15.4 KB | heroes.html (детали) | Страница героя: навигация, иконка, статы, способности, билды, советы |
| `hero-mobile.css` | 3.5 KB | heroes.html | Мобайл-оверрайды для страницы героя |
| `items.css` | 22.5 KB | items.html | Страница предметов: сетка, карточки, детали, дерево компонентов, **бейджи**, bottom sheet |
| `calc.css` | 22.5 KB | calculator/armor/balance/formulas | Калькуляторы: слоты, результаты, дерево рецептов, каталог |
| `effects.css` | 8.3 KB | Все | Общие эффекты: роли, статы, карточки (hero-card, item-card, stat-box), футер |
| `home.css` | 14.4 KB | index.html | Главная: баннер, кнопки, статистика, ссылки, футер |
| `info.css` | 11.5 KB | info/support | Инфо-страницы: гайды, автор, ссылки, таймлайн |
| `balance-dashboard.css` | 6.6 KB | balance-dashboard | Профили баланса: радар, контролы, таблица перцентилей, мобильный адаптив |
| `lore.css` | 8.0 KB | lore/modes | Лор, режимы, навигация, шапка |
| `mechanics.css` | 28.6 KB | mechanics/updates | Механики, чейнджлог, карты механик |
| `monsters.css` | 12.3 KB | monsters | Монстры, боссы, дропы, способности |
| `search.css` | 21.7 KB | Все (глобальный поиск) | Поиск, build-constructor, ripple, progress-bar |
| `header-mobile.css` | 2.3 KB | Все | Мобайл-шапка, гамбургер |

## Ключевые селекторы — где искать

### Бейджи предметов (detail-badge)
**ВСЕ в `items.css` (~строки 406-441)**
- `.detail-badges` — контейнер
- `.detail-badge` — базовый стиль (pill, glass bg)
- `.badge-danger` — красный (boss_drop)
- `.badge-unique` — оранжевый (1 на героя, тултип)
- `.badge-class` — фиолетовый (класс предмета, тултип)

**Мобайл-оверрайды**: `hero-mobile.css:26` (для героев), `items.css` @media (для предметов)

### Карточки предметов
- `.item-card` — `items.css` + `effects.css`
- `.item-icon`, `.item-name` — `items.css`
- Редкость: `.rarity-cheap`, `.rarity-mid`, `.rarity-expensive` — `items.css`

### Детальная панель предмета
- `.item-detail-panel` — `items.css:25`
- `.detail-icon`, `.detail-title` — `hero-page.css` (базовые), `items.css` @media (оверрайды)
- `.detail-description` — `hero-page.css:112`
- `.recipe-title` — `hero-page.css:184`
- `.cost-badges`, `.cost-badge` — `items.css:383-402`
- Bottom sheet: `.item-bottom-sheet`, `.item-sheet-overlay` — `items.css:55-122`

### Дерево компонентов
- `.component-tree`, `.component-item`, `.tree-toggle` — `items.css:122-202`

### Карточки героев
- `.hero-card` — `effects.css:70` + `hero-grid.css:69`
- `.hero-attr-badge`, `.unique-badge`, `.wip-badge` — `hero-grid.css`

### Общие (effects.css)
- `.hero-card`, `.item-card`, `.stat-box`, `.quick-link-card` — hover/glow эффекты
- `.role-*` — бейджи ролей
- `.stat-*` — цвета статов
- `.version-card`, `.site-footer` — футер и версии

### Шапка и навигация
- `.site-header`, `.nav-link`, `.logo` — `lore.css:229-326`
- Мобайл-оверрайды — `header-mobile.css`

## Порядок загрузки (style.css)
```
1. base.css
2. hero-grid.css
3. hero-page.css
4. hero-mobile.css
5. lore.css
6. mechanics.css
7. monsters.css
8. home.css
9. info.css
10. header-mobile.css
11. items.css        ← бейджи здесь
12. effects.css
13. calc.css
14. search.css
```
Позже = выше приоритет при одинаковой специфичности.

## Правила
- Бейджи (`detail-badge`, `badge-*`) — **только в items.css**, не дублировать
- Общие эффекты (hover, glow) — `effects.css`
- Страница-специфичные стили — в своём файле
- Мобайл-оверрайды — в том же файле через `@media`