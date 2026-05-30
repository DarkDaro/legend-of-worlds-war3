// compare-page.js — логика страницы compare.html
// Зависимости (defer): hero-data.js, hero-builds.js, jass-data.js, bot-builds.js,
//   item-bonus-parser.js, game-constants.js, items-db.js

// ── Данные героев для сравнения ──
var HERO_COMPARE_DATA = {};
var ATTR_LABELS = { strength: 'Сила', agility: 'Ловкость', intelligence: 'Разум' };
var ATTR_CLASS_MAP = { strength: 'compare-attr-strength', agility: 'compare-attr-agility', intelligence: 'compare-attr-intelligence' };
var ROLE_LABELS = { tank: 'Танк', bruiser: 'Рубака', damager: 'Дамагер', assassin: 'Убийца', initiator: 'Инициатор', controller: 'Контролёр', healer: 'Целитель', support: 'Помощник' };

document.addEventListener('DOMContentLoaded', function() {
    // Заполняем HERO_COMPARE_DATA
    if (typeof HEROES_DATA === 'undefined') { console.error('HEROES_DATA not loaded'); return; }
    HEROES_DATA.forEach(function(hero) {
        if (hero.isAltForm || hero.wip || hero.noPage) return;
        HERO_COMPARE_DATA[hero.heroId] = {
            id: hero.heroId,
            name: hero.name,
            attr: hero.attr,
            attrLabel: ATTR_LABELS[hero.attr] || hero.attr,
            role: hero.roleNames ? hero.roleNames.join(', ') : (hero.roleName || hero.role),
            image: 'images/heroes/' + hero.image + '.png',
            stats: {
                hp: hero.hp != null ? hero.hp : 0,
                mp: hero.mp != null ? hero.mp : 0,
                atk: hero.atk != null ? hero.atk : 0,
                def: hero.def != null ? hero.def : 0,
                hpRegen: hero.hpRegen != null ? hero.hpRegen : 0,
                mpRegen: hero.mpRegen != null ? hero.mpRegen : 0,
                speed: hero.speed != null ? hero.speed : 0,
                range: hero.range != null ? hero.range : 0,
                strBase: hero.strBase,
                strGain: hero.strGain,
                agiBase: hero.agiBase,
                agiGain: hero.agiGain,
                intBase: hero.intBase,
                intGain: hero.intGain
            }
        };
    });

    // Инициализация страницы после заполнения данных
    initComparePage();
});

var SELECT_IDS = ['hero1', 'hero2', 'hero3'];

// ── 1. Запрет дубликатов ──
function updateSelectDisables() {
    var selected = {};
    SELECT_IDS.forEach(function(id) {
        var v = document.getElementById(id).value;
        if (v) selected[v] = id;
    });
    SELECT_IDS.forEach(function(id) {
        var sel = document.getElementById(id);
        var current = sel.value;
        for (var i = 0; i < sel.options.length; i++) {
            var opt = sel.options[i];
            if (!opt.value) continue;
            opt.disabled = !!(selected[opt.value] && selected[opt.value] !== id);
        }
    });
}

// ── 5. URL-параметры ──
function readUrlParams() {
    var params = new URLSearchParams(location.search);
    var h = params.get('h');
    if (h) return h.split(',').filter(Boolean);
    return null;
}

function writeUrlParams() {
    var ids = SELECT_IDS.map(function(id) { return document.getElementById(id).value; }).filter(Boolean);
    if (ids.length < 2) {
        history.replaceState(null, '', location.pathname);
        return;
    }
    history.replaceState(null, '', '?h=' + ids.join(','));
}

function getCompareHeroIds() {
    return Object.keys(HERO_COMPARE_DATA);
}

function getCompareHeroes() {
    return getCompareHeroIds()
        .map(function(id) { return HERO_COMPARE_DATA[id]; })
        .filter(Boolean);
}

function getCompareHeroLabel(hero) {
    return hero.name;
}

function getCompareAttrClass(attr) {
    return ATTR_CLASS_MAP[attr] || '';
}

function applyCompareBarWidths(container) {
    container.querySelectorAll('[data-bar-width]').forEach(function(el) {
        el.style.width = el.dataset.barWidth;
    });
}

// ── Очистка ──
function clearCompare() {
    SELECT_IDS.forEach(function(id) {
        document.getElementById(id).value = '';
    });
    document.getElementById('heroLevel').value = 1;
    updateSelectDisables();
    renderComparison();
    history.replaceState(null, '', 'compare.html');
}

// ── Инициализация ──
function initComparePage() {
    var heroes = sortHeroesByName(getCompareHeroes());

    SELECT_IDS.forEach(function(id) {
        var sel = document.getElementById(id);
        heroes.forEach(function(h) {
            var opt = document.createElement('option');
            opt.value = h.id;
            opt.textContent = getCompareHeroLabel(h) + ' — ' + h.attrLabel;
            sel.appendChild(opt);
        });
        sel.addEventListener('change', function() {
            updateSelectDisables();
            renderComparison();
            writeUrlParams();
        });
    });

    document.getElementById('heroLevel').addEventListener('input', renderComparison);

    // Предвыбор из URL или первые герои из билдов
    var urlHeroes = readUrlParams();
    if (urlHeroes && urlHeroes.length >= 2) {
        urlHeroes.forEach(function(hid, i) {
            if (i < 3 && HERO_COMPARE_DATA[hid]) {
                document.getElementById(SELECT_IDS[i]).value = hid;
            }
        });
    } else {
        var defaultHeroes = heroes.slice(0, 3);
        defaultHeroes.forEach(function(h, i) {
            document.getElementById(SELECT_IDS[i]).value = h.id;
        });
    }

    updateSelectDisables();
    renderComparison();
}

// initComparePage вызывается из DCL выше, после заполнения HERO_COMPARE_DATA

// Перерендер при смене размера экрана (десктоп ↔ мобильный)
var COMPARE_RESIZE_TIMER = null;
window.addEventListener('resize', function() {
    clearTimeout(COMPARE_RESIZE_TIMER);
    COMPARE_RESIZE_TIMER = setTimeout(function() {
        var wasMobile = COMPARE_MOBILE;
        COMPARE_MOBILE = window.innerWidth <= 700;
        if (wasMobile !== COMPARE_MOBILE) renderComparison();
    }, 200);
});

// ── Рендер таблицы ──
var COMPARE_MOBILE = window.innerWidth <= 700;

function renderComparison() {
    var ids = SELECT_IDS.map(function(id) { return document.getElementById(id).value; }).filter(Boolean);
    var container = document.getElementById('compareResult');

    if (ids.length < 2) {
        container.innerHTML = '<div class="compare-empty"><i class="fas fa-balance-scale"></i>Выберите хотя бы двух героев для сравнения</div>';
        return;
    }

    var heroes = ids.map(function(id) { return HERO_COMPARE_DATA[id]; }).filter(Boolean);
    if (heroes.length < 2) {
        container.innerHTML = '<div class="compare-empty"><i class="fas fa-exclamation-triangle"></i>Данные не найдены</div>';
        return;
    }

    var levelInput = document.getElementById('heroLevel');
    var level = parseInt(levelInput.value) || 1;
    level = Math.max(1, Math.min(500, level));
    levelInput.value = level;

    if (COMPARE_MOBILE) {
        renderMobileCards(container, heroes, level);
    } else {
        renderDesktopTable(container, heroes, level);
    }
}

// ── Мобильные карточки ──
function renderMobileCards(container, heroes, level) {

    var rows = buildCompareRows(heroes, level);

    var html = '<div class="compare-cards">';
    heroes.forEach(function(h, hi) {
        var attrClass = getCompareAttrClass(h.attr);
        html += '<div class="compare-card">';
        html += '<div class="compare-card-header">';
        html += '<a href="heroes/' + h.id + '.html" class="compare-card-name">' + getCompareHeroLabel(h) + '</a>';
        html += '<div class="compare-card-attr ' + attrClass + '">' + h.attrLabel + ' · ' + h.role + '</div>';
        html += renderCompareBuildItems(h.id);
        html += '</div>';
        html += '<div class="compare-card-body">';

        rows.forEach(function(row) {
            if (row.section) {
                html += '<div class="compare-card-section">' + row.label + '</div>';
                return;
            }
            var v = row.values[hi];
            var cls = '';
            if (row.isNumeric && !row.allSame && heroes.length > 1) {
                if (v === row.max) cls = 'card-best';
                else if (v === row.min) cls = 'card-worst';
            }
            html += '<div class="compare-card-row ' + cls + '">';
            html += '<span class="compare-card-label">' + row.label + '</span>';
            html += '<span class="compare-card-value">';
            if (row.showBar && row.isNumeric && row.max > 0) {
                var pct = Math.round((v / row.max) * 100);
                html += '<span>' + v + '</span><div class="compare-card-bar"><div class="compare-card-bar-fill" data-bar-width="' + pct + '%"></div></div>';
            } else {
                html += '' + v;
            }
            html += '</span></div>';
        });

        html += '</div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
    applyCompareBarWidths(container);
}

// ── Общие данные строк ──
function buildCompareRows(heroes, level) {
    var rows = [];

    rows.push({ section: true, label: 'Атрибуты с предметами на уровне ' + level });
    pushStatRow(rows, 'Сила', heroes, function(h) { return Math.round(getAttrTotalWithBuild(h, 'strength', level)); }, true);
    pushStatRow(rows, 'Ловкость', heroes, function(h) { return Math.round(getAttrTotalWithBuild(h, 'agility', level)); }, true);
    pushStatRow(rows, 'Разум', heroes, function(h) { return Math.round(getAttrTotalWithBuild(h, 'intelligence', level)); }, true);

    rows.push({ section: true, label: 'Боевые статы с предметами на уровне ' + level });
    pushStatRow(rows, 'Жизни', heroes, function(h) { return calcStat(h, 'hp', 'strength', level, GAME_CONSTANTS.STR_HP_FACTOR); }, true);
    pushStatRow(rows, 'Мана', heroes, function(h) { return calcStat(h, 'mp', 'intelligence', level, GAME_CONSTANTS.INT_MP_FACTOR); }, true);
    pushStatRow(rows, 'Урон', heroes, function(h) { return getAttackTotal(h, level); }, true);
    pushStatRow(rows, 'Броня', heroes, function(h) { return getArmorTotal(h, level); }, true);
    pushStatRow(rows, 'Снижение урона от брони', heroes, function(h) {
        var armor = getArmorTotal(h, level);
        var reduction = (armor * GAME_CONSTANTS.ARMOR_C) / (1 + armor * GAME_CONSTANTS.ARMOR_C);
        return (reduction * 100).toFixed(1) + '%';
    }, false);
    pushStatRow(rows, 'Скорость атаки', heroes, function(h) { return getAttackSpeed(h, level); }, true);
    pushStatRow(rows, 'Скорость передвижения', heroes, function(h) { return getMovementSpeed(h, level); }, false);
    pushStatRow(rows, 'Дальность атаки', heroes, function(h) { return h.stats.range == 128 ? 'Ближний' : h.stats.range; }, false);
    pushStatRow(rows, 'Реген. здоровья', heroes, function(h) {
        var bonus = getCompareHeroBuildBonus(h.id);
        var base = (h.stats.hpRegen || 0) + getAttrTotalWithBuild(h, 'strength', level) * GAME_CONSTANTS.STR_HP_REGEN_FACTOR + bonus.hpRegenFlat;
        return +(base * (1 + bonus.hpRegenPct / 100)).toFixed(2);
    }, true);
    pushStatRow(rows, 'Реген. маны', heroes, function(h) {
        var bonus = getCompareHeroBuildBonus(h.id);
        var base = (h.stats.mpRegen || GAME_CONSTANTS.MP_REGEN_BASE) + getAttrTotalWithBuild(h, 'intelligence', level) * GAME_CONSTANTS.INT_MP_REGEN_FACTOR + bonus.manaRegenFlat;
        return +(base * (1 + bonus.manaRegenPct / 100)).toFixed(2);
    }, true);

    rows.push({ section: true, label: 'Прирост за уровень' });
    pushStatRow(rows, 'Сила', heroes, function(h) {
        var total = Math.round(h.stats.strBase + h.stats.strGain * (level - 1));
        return h.stats.strBase + ' <span class="compare-level-gain">+' + h.stats.strGain + '</span> <span class="compare-level-total">(' + total + ')</span>';
    }, false);
    pushStatRow(rows, 'Ловкость', heroes, function(h) {
        var total = Math.round(h.stats.agiBase + h.stats.agiGain * (level - 1));
        return h.stats.agiBase + ' <span class="compare-level-gain">+' + h.stats.agiGain + '</span> <span class="compare-level-total">(' + total + ')</span>';
    }, false);
    pushStatRow(rows, 'Разум', heroes, function(h) {
        var total = Math.round(h.stats.intBase + h.stats.intGain * (level - 1));
        return h.stats.intBase + ' <span class="compare-level-gain">+' + h.stats.intGain + '</span> <span class="compare-level-total">(' + total + ')</span>';
    }, false);

    return rows;
}

function pushStatRow(rows, label, heroes, valueFn, showBar) {
    var values = heroes.map(function(h) { return typeof valueFn(h) === 'number' ? valueFn(h) : null; });
    var numericValues = values.filter(function(v) { return v !== null; });
    var max = numericValues.length ? Math.max.apply(null, numericValues) : 0;
    var min = numericValues.length ? Math.min.apply(null, numericValues) : 0;
    var allSame = max === min;
    var isNumeric = numericValues.length > 0;

    rows.push({
        section: false,
        label: label,
        values: heroes.map(function(h) { return valueFn(h); }),
        max: max,
        min: min,
        allSame: allSame,
        isNumeric: isNumeric,
        showBar: showBar
    });
}

// ── Десктопная таблица ──
function renderDesktopTable(container, heroes, level) {

    var html = '<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Параметр</th>';
    heroes.forEach(function(h) {
        var attrClass = getCompareAttrClass(h.attr);
        html += '<th class="hero-col">'
            + '<a href="heroes/' + h.id + '.html" class="hero-col-name">' + getCompareHeroLabel(h) + '</a>'
            + '<div class="hero-col-attr ' + attrClass + '">' + h.attrLabel + ' · ' + h.role + '</div>'
            + renderCompareBuildItems(h.id)
            + '</th>';
    });
    html += '</tr></thead><tbody>';

    var rows = buildCompareRows(heroes, level);
    rows.forEach(function(row) {
        if (row.section) {
            html += sectionRow(row.label);
            return;
        }
        html += '<tr><td>' + row.label + '</td>';
        heroes.forEach(function(h, i) {
            var v = row.values[i];
            var cls = '';
            if (row.isNumeric && !row.allSame && heroes.length > 1) {
                if (v === row.max) cls = 'stat-best';
                else if (v === row.min) cls = 'stat-worst';
            }
            if (row.showBar && row.isNumeric && row.max > 0) {
                var pct = Math.round((v / row.max) * 100);
                html += '<td class="' + cls + '"><div class="stat-bar-wrap">'
                    + '<span class="stat-bar-value">' + v + '</span>'
                    + '<div class="stat-bar"><div class="stat-bar-fill" data-bar-width="' + pct + '%"></div></div>'
                    + '</div></td>';
            } else {
                html += '<td class="' + cls + '">' + v + '</td>';
            }
        });
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
    applyCompareBarWidths(container);
}

var ITEM_BONUS_CACHE = {};
var HERO_BUILD_BONUS_CACHE = {};

function getCompareBuildItems(heroId) {
    var build = (typeof heroBuilds !== 'undefined' && heroBuilds) ? heroBuilds[heroId] : null;
    if (build && Array.isArray(build.items) && typeof itemsDB !== 'undefined') {
        return build.items.map(function(entry) {
            return itemsDB[entry.id] || null;
        }).filter(Boolean);
    }
    if (typeof HERO_BUILD_DATA !== 'undefined' && typeof botBuildGroups !== 'undefined' && typeof findItemByName === 'function') {
        for (var rc in HERO_BUILD_DATA) {
            if (HERO_BUILD_DATA[rc].heroId === heroId) {
                var group = botBuildGroups[HERO_BUILD_DATA[rc].group];
                if (group && group.stages && group.stages.length > 0) {
                    var lastStage = group.stages[group.stages.length - 1];
                    return lastStage.items.map(function(slot) {
                        return findItemByName(slot.name) || null;
                    }).filter(Boolean);
                }
                break;
            }
        }
    }
    return [];
}

function renderCompareBuildItems(heroId) {
    var items = getCompareBuildItems(heroId);
    if (!items.length) return '<div class="hero-col-build hero-col-build-empty">—</div>';
    return '<div class="hero-col-build">' + items.map(function(item) {
        var icon = (typeof itemIcon === 'function') ? itemIcon(item.id, item.icon, 26, item.type) : item.name;
        return '<a class="hero-build-item" href="items.html?item=' + item.id + '" title="' + item.name + '">' + icon + '</a>';
    }).join('') + '</div>';
}

function getCompareItemBonuses(item) {
    if (!item || typeof ItemBonusParser === 'undefined') return ItemBonusParser ? ItemBonusParser.createEmptyBonus() : {};
    if (ITEM_BONUS_CACHE[item.id]) return ITEM_BONUS_CACHE[item.id];

    var bonus = ItemBonusParser.parseDescription(item.description || '');
    ITEM_BONUS_CACHE[item.id] = bonus;
    return bonus;
}

function getCompareHeroBuildBonus(heroId) {
    if (HERO_BUILD_BONUS_CACHE[heroId]) return HERO_BUILD_BONUS_CACHE[heroId];

    var total = (typeof ItemBonusParser !== 'undefined') ? ItemBonusParser.createEmptyBonus() : {};
    getCompareBuildItems(heroId).forEach(function(item) {
        ItemBonusParser.mergeBonuses(total, getCompareItemBonuses(item));
    });

    HERO_BUILD_BONUS_CACHE[heroId] = total;
    return total;
}

function getAttrBase(hero, attrKey) {
    if (attrKey === 'strength') return hero.stats.strBase;
    if (attrKey === 'agility') return hero.stats.agiBase;
    if (attrKey === 'intelligence') return hero.stats.intBase;
    return 0;
}

function getAttrGain(hero, attrKey) {
    if (attrKey === 'strength') return hero.stats.strGain;
    if (attrKey === 'agility') return hero.stats.agiGain;
    if (attrKey === 'intelligence') return hero.stats.intGain;
    return 0;
}

function getAttrTotal(hero, attrKey, level) {
    return getAttrBase(hero, attrKey) + getAttrGain(hero, attrKey) * (level - 1);
}

function getAttrTotalWithBuild(hero, attrKey, level) {
    var total = getAttrTotal(hero, attrKey, level);
    var bonus = getCompareHeroBuildBonus(hero.id);
    if (attrKey === 'strength') return total + bonus.allStats + bonus.strength;
    if (attrKey === 'agility') return total + bonus.allStats + bonus.agility;
    if (attrKey === 'intelligence') return total + bonus.allStats + bonus.intelligence;
    return total;
}

function getMainAttrTotal(hero, level) {
    return getAttrTotalWithBuild(hero, hero.attr, level);
}

function calcStat(hero, baseKey, attrKey, level, perPoint) {
    var base = hero.stats[baseKey];
    var totalAttr = getAttrTotalWithBuild(hero, attrKey, level);
    var bonus = getCompareHeroBuildBonus(hero.id);
    var flat = 0;
    if (baseKey === 'hp') flat = bonus.hp;
    if (baseKey === 'mp') flat = bonus.mana;
    return Math.round(base + totalAttr * perPoint + flat);
}

function getAttackTotal(hero, level) {
    var bonus = getCompareHeroBuildBonus(hero.id);
    var mainBase = getAttrBase(hero, hero.attr);
    var mainTotal = getMainAttrTotal(hero, level);
    return Math.round(hero.stats.atk + (mainTotal - mainBase) + bonus.attack);
}

function getArmorTotal(hero, level) {
    var bonus = getCompareHeroBuildBonus(hero.id);
    var baseAgiArmor = Math.floor(getAttrBase(hero, 'agility') * GAME_CONSTANTS.AGI_ARMOR_FACTOR);
    var totalAgiArmor = Math.floor(getAttrTotalWithBuild(hero, 'agility', level) * GAME_CONSTANTS.AGI_ARMOR_FACTOR);
    return +(hero.stats.def + (totalAgiArmor - baseAgiArmor) + bonus.armor + (bonus.auraArmor || 0)).toFixed(1);
}

function getAttackSpeed(hero, level) {
    var bonus = getCompareHeroBuildBonus(hero.id);
    return +(1 + getAttrTotalWithBuild(hero, 'agility', level) * GAME_CONSTANTS.AGI_ATK_SPEED_FACTOR + bonus.attackSpeedPct / 100 + (bonus.auraAttackSpeedPct || 0) / 100).toFixed(3);
}

function getMovementSpeed(hero, level) {
    var bonus = getCompareHeroBuildBonus(hero.id);
    return Math.round((hero.stats.speed + bonus.movementSpeedFlat) * (1 + bonus.movementSpeedPct / 100 + (bonus.auraMoveSpeedPct || 0) / 100));
}

function sectionRow(label) {
    return '<tr class="section-row"><td colspan="10">' + label + '</td></tr>';
}
