# Legend of Worlds — Encyclopedia

An encyclopedia website and a set of tools for **Legend of Worlds**, a Hero Arena custom map for Warcraft III. The map, the website and the lore are built by one person, in spare time, with no team, no budget and no publisher.

🔗 [darkdaro.github.io/legend-of-worlds-war3](https://darkdaro.github.io/legend-of-worlds-war3) · [Русская версия](README.md)

## What this repo is

Warcraft III was released in 2002, and its custom maps are still alive. This one has 31 versions of its own balance, its own formulas, scripted bots and written lore — and now it has a wiki. Living games always get fan wikis eventually, written for free, at night. Here the only fan is the map's author himself, so the wiki finally exists.

The site is a fully static encyclopedia: you open a page and get an answer in seconds — about any of the 74 heroes or 222 items. The site also answers at night while the author sleeps. Or doesn't sleep.

The site itself is in Russian. This file exists so that non-Russian speakers know what they are looking at.

## What's on the site

- **Heroes** — 74 heroes (77 cards): full stats (HP, mana, attack, armor, speed, regen, range), attributes with per-level growth, 8 roles, abilities F/Q/W/E/R with parameters, recommended item builds, lore, prev/next navigation. 8 alt-forms and 8 demo/WIP heroes live in the database.
- **Items** — 222 artifacts: 123 crafted items with recursive component trees plus 99 base items, 166 more runes hidden in the database; categories, search, filters, "which heroes build this" cross-links, favorites.
- **Build calculator** — 6 slots, automatic cost breakdown into base purchases and recipes, saved in localStorage.
- **Build constructor** — multi-stage builds that generate JASS code ready for the Warcraft III World Editor.
- **AI builds & bots** — 19 groups and 408 bot purchase stages, generated from the map's own scripts, plus a page on how bot behavior works.
- **Monsters & creeps** — 8 bosses (stats, HP stages, drop tables with chances) and 25 creeps in 8 tiers.
- **Mechanics, modes, runes** — the map's real formulas (luck, crit, lifesteal, armor, magic resist, motivation, evasion), 9 game modes, 16 arena runes.
- **Events & duels** — 1v1 (SuperDuel), Team Duel, 2v2, 3v3, FFA, Boss Event, SoloDuel, SoloFFA.
- **Item storage** — the player's personal chest on the base: slots, actions, spellbooks, donation perks.
- **Interactive arena map** — zones, bosses, shops, duel arenas, teleports; plus a page of map balance changes.
- **Calculators & comparison** — armor, formulas (4 tabs), hero comparison (up to 3), a full balance table, and a balance dashboard with 7-axis radar profiles at any level 1–500.
- **Tier list & gallery** — build your own hero rating and share it as a link; portraits, art and screenshots.
- **Guides** — 6 hero guides plus a general starter guide.
- **Lore** — the world's history in 5 eras, with a timeline.
- **FAQ** — 14 answers backed by the map's facts: installation, "the map doesn't show up in the list", bots, hotkeys, modes, one-click builds, the 0.05 armor constant, bosses, vampirism, where the data comes from, how to report bugs.
- **Manifesto** — the project's public position (in Russian).

## What makes it unusual

- **Recursive recipe trees** of unlimited depth — every item unfolds down to base components
- **Cross-links everywhere** — from an item to its heroes, from a hero to its items, from a mechanic straight to its calculator
- **Dynamic rendering** — stats, builds, descriptions and navigation all come from JS databases, with zero duplication in HTML
- **One source of truth** — `game-constants.js` holds the map's formulas; every calculator imports from it
- **Database validation** — a public page cross-checks consistency between hero data, items, bot builds and hero builds
- **Global Ctrl+K search** across heroes, items, abilities, mechanics, bosses and modes
- **Neon + glassmorphism design**, fully responsive, works on a phone
- **No frameworks, no build, no server** — plain HTML/CSS/JS on GitHub Pages, with CI checks on every push (internal links, text hygiene, identical header across pages)

## Why does this exist

Short answer: someone had to put it all somewhere, and nobody else volunteered. Nobody asks an aquarium for its ROI. No money was taken, nobody's time was eaten. In some months nothing moves and the author asks himself the same question — the answer doesn't change.

## Repository layout

- Root — the site itself: 117 HTML pages
- `css/`, `js/` — styles and data-driven logic; `css/all.css` is generated, rebuild it with `python3 scripts/build-css-bundle.py`
- `docs/` — architecture, the design system (DESIGN.md), CSS inventories and audits, a tech-debt registry, a decisions journal
- `scripts/` — link/text/header checks and one-shot generators
- `vendor/` — locally hosted Font Awesome, no external CDNs

## Author & license

Made by **DarkDaro**. All rights reserved: you are welcome to read and study the code, reusing or redistributing it is not permitted — see [LICENSE.md](LICENSE.md).

The project is alive. Slower than the author would like. But alive.
