# HeroData — Site Status

## Last updated: 2026-05-02

## Mobile Adaptation Status

### ✅ Done
| Page | Status | Notes |
|------|--------|-------|
| index.html | ✅ | Banner, stats, quick-links, footer responsive |
| heroes.html | ✅ | Grid 6→2 cols, hero cards responsive |
| heroes/*.html | ✅ | Ability cards, params, scepter, back-button |
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

### ⏳ On Hold
- **Items page preview** — 3 variants tested (tooltip, panel, bottom sheet), user deciding. Test page: test-item-preview.html
- **Monsters page** — raw/incomplete, skip for now
- **Emoji fallback in itemIcon()** — long-press shows raw emoji, needs FA icon fallback

### ❌ Known Issues
- Monster page: 2 of 33 icons, 6 of 8 bosses are stubs
- Hero portraits: only 5 of ~20 (admiral, paladin, archmage, farseer, darkranger)
- Ability icons: only 6 (paladin + admiral)
- icon-loader.js hero detail icon path: uses `images/heroes/` (no `../` prefix) — broken for heroes/ subfolder pages. Needs fix.
- Analytics: Yandex Metrika counter ID pending

## File Structure
```
HeroData/
├── index.html          (main landing page)
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
├── style.css           (all styles, ~2600 lines)
├── icon-loader.js      (hamburger menu, scroll-top, param highlight, hero icons)
├── items-db.js         (item database + rendering logic)
├── analytics.js        (template, awaiting counter ID)
├── heroes/             (21 hero card HTML files)
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
- 800px: mechanics 1 col, items column, info stats 2 cols, banners reduced
- 700px: hero grid 3 cols, hero page card compact
- 600px: hamburger menu, body padding reduced
- 500px: hero grid 2 cols, banners small, timeline dot fix
- 480px: hero ability icons 40px, badges tiny
