// ========== Профили баланса героев ==========

(function() {
    'use strict';

    var AXES = ['dps', 'burst', 'surv', 'cc', 'mob', 'farm', 'scaling'];
    var AXIS_LABELS = {
        dps: 'Урон', burst: 'Бёрст', surv: 'Живучесть',
        cc: 'Контроль', mob: 'Мобильность', farm: 'Фарм', scaling: 'Скалинг'
    };
    var AXIS_DESC = {
        dps: 'Суммарный урон/кулдаун всех способностей',
        burst: 'Суммарный урон одного каста всех способностей',
        surv: 'Эффективное здоровье (HP × броня × уклонение)',
        cc: 'Суммарная длительность контроля × вес типа',
        mob: 'Скорость + бонус от дэш/блинк способностей',
        farm: 'AoE-урон + количество AoE + бёрст',
        scaling: 'Во сколько раз растёт DPS от 30 к 200 уровню'
    };
    var HERO_COLORS = ['#00e6ff', '#ff6b6b', '#51cf66'];

    // === Расчёт способностей ===
    // Автопрокачка: floor((heroLevel - reqLevel) / skipLevel) + 1
    // F: reqLevel=1, skip=25, maxLevels=0 → 3 уровня (1/25/50)
    // Q: reqLevel=1, skip=8, maxLevels=5
    // W: reqLevel=3, skip=8, maxLevels=5
    // E: reqLevel=6, skip=8, maxLevels=5
    // R: reqLevel=30, skip=15, maxLevels=5
    function abilityLevel(heroLevel, reqLevel, maxLevels) {
        if (heroLevel < reqLevel) return 0;
        if (maxLevels <= 0) return Math.min(Math.floor((heroLevel - reqLevel) / 25) + 1, 3);
        var skip = (reqLevel >= 30) ? 15 : 8;
        var lvl = Math.floor((heroLevel - reqLevel) / skip) + 1;
        return Math.min(lvl, maxLevels);
    }

    // Константы из game-constants.js
    var GC = window.GAME_CONSTANTS || {};
    var ARMOR_C = GC.ARMOR_C || 0.05;
    var AGI_ARMOR = GC.AGI_ARMOR_FACTOR || 0.05;
    var STR_HP = GC.STR_HP_FACTOR || 20;

    function heroStatsAtLevel(h, level) {
        var l = level - 1;
        var totalAgi = h.agiBase + h.agiGain * l;
        return {
            str: h.strBase + h.strGain * l,
            agi: totalAgi,
            int: h.intBase + h.intGain * l,
            hp: h.hp + h.strGain * l * STR_HP,
            def: h.def + totalAgi * AGI_ARMOR,
            speed: h.speed,
            range: h.range
        };
    }

    function calcAbilityDamage(abS, heroStats, heroLevel) {
        if (!abS.damage || !abS.damage.length) return 0;
        var total = 0;
        abS.damage.forEach(function(d) {
            var abD = ABILITIES_DB[abS.rawcode];
            if (!abD) return;
            var abLvl = abilityLevel(heroLevel, abD.reqLevel || 1, abD.levels || 3);
            if (abLvl <= 0) return;
            var idx = Math.min(abLvl, d.base.length) - 1;
            var base = d.base[idx] || 0;
            var scaleVal = 0;
            if (d.statScale && d.statScale.stat) {
                var mult = d.statScale.mult;
                var multVal = Array.isArray(mult) ? (mult[Math.min(idx, mult.length - 1)] || 0) : mult;
                if (d.statScale.stat === 'STR') scaleVal = heroStats.str * multVal;
                else if (d.statScale.stat === 'AGI') scaleVal = heroStats.agi * multVal;
                else if (d.statScale.stat === 'INT') scaleVal = heroStats.int * multVal;
            }
            var dmg = base + scaleVal;
            if (d.isDOT && d.dotDuration) dmg *= (d.dotDuration[Math.min(idx, d.dotDuration.length - 1)] || 1);
            if (d.hitCount) dmg *= (d.hitCount[Math.min(idx, d.hitCount.length - 1)] || 1);
            total += dmg;
        });
        return total;
    }

    // === Сырой профиль (абсолютные значения) ===
    function calcRawProfile(hero, level) {
        var stats = heroStatsAtLevel(hero, level);
        var abilCodes = HERO_ABILITIES[hero.rawcode] || [];
        var totalDPS = 0, totalBurst = 0, totalCC = 0, totalMob = 0;
        var buffHP = 0, buffArmor = 0, evasion = 0, spellDmgPct = 0;
        var aoeDmg = 0, aoeCount = 0, sustainVal = 0;

        abilCodes.forEach(function(rc) {
            var abS = ABILITY_STATS[rc];
            if (!abS) return;
            var abD = ABILITIES_DB[rc];
            if (!abD) return;
            var abLvl = abilityLevel(level, abD.reqLevel || 1, abD.levels || 3);
            if (abLvl <= 0) return;

            var dmg = calcAbilityDamage(abS, stats, level);
            var cool = abS.cool ? (Array.isArray(abS.cool) ? abS.cool[Math.min(abLvl, abS.cool.length) - 1] : abS.cool) : 1;
            if (cool < 1) cool = 1;

            var isPassive = abS.type === 'passive' || abD.type === 'passive';
            if (isPassive) dmg *= 0.2;

            totalDPS += dmg / cool;
            totalBurst += dmg;

            // CC
            if (abS.cc && abS.cc.length) {
                abS.cc.forEach(function(c) {
                    var idx = Math.min(abLvl, c.duration.length) - 1;
                    var dur = c.duration[idx] || 0;
                    if (dur === 0 && c.type === 'slow') dur = 1;
                    totalCC += dur * (c.weight || 1);
                });
            }

            // Мобильность
            if (abS.dash) {
                var dashCool = abS.cool ? (Array.isArray(abS.cool) ? abS.cool[Math.min(abLvl, abS.cool.length) - 1] : abS.cool) : 20;
                var dashRange = abS.dash.dashRange ? abS.dash.dashRange[Math.min(abLvl, abS.dash.dashRange.length) - 1] : 500;
                totalMob += dashRange / dashCool;
            }

            // Баффы
            if (abS.buffs) {
                if (abS.buffs.hp) buffHP += abS.buffs.hp[Math.min(abLvl, abS.buffs.hp.length) - 1] || 0;
                if (abS.buffs.armor) buffArmor += abS.buffs.armor[Math.min(abLvl, abS.buffs.armor.length) - 1] || 0;
                if (abS.buffs.evasion) evasion += abS.buffs.evasion[Math.min(abLvl, abS.buffs.evasion.length) - 1] || 0;
                if (abS.buffs.spellDmgPct) spellDmgPct += abS.buffs.spellDmgPct[Math.min(abLvl, abS.buffs.spellDmgPct.length) - 1] || 0;
            }

            // AoE
            var isAoE = abS.area > 0 || (abD.area && abD.area > 0);
            if (isAoE) { aoeDmg += dmg; aoeCount++; }

            // Хил
            if (abS.heal && abS.heal.length) {
                abS.heal.forEach(function(he) {
                    var hIdx = Math.min(abLvl, (he.base || [0]).length) - 1;
                    var healVal = (he.base || [0])[hIdx] || 0;
                    if (he.isPct) healVal = healVal * (stats.hp + buffHP) / 100;
                    sustainVal += healVal;
                });
            }
        });

        totalDPS *= (1 + spellDmgPct / 100);
        totalBurst *= (1 + spellDmgPct / 100);

        // Живучесть: EHP = HP / (1 - DR), DR = armor*C / (1+armor*C)
        var totalArmor = stats.def + buffArmor;
        var dr = (totalArmor * ARMOR_C) / (1 + totalArmor * ARMOR_C);
        var ehp = (stats.hp + buffHP) / (1 - dr) * (1 + evasion / 100);

        // Мобильность
        var mob = stats.speed + totalMob * 10;

        // Фарм
        var farm = aoeDmg + aoeCount * 150;

        // Скалинг: DPS200/DPS30
        var dps30 = 0, dps200 = 0;
        [30, 200].forEach(function(lvl) {
            var sLvl = heroStatsAtLevel(hero, lvl);
            var dpsLvl = 0;
            var spellDmgPctLvl = 0;
            abilCodes.forEach(function(rc) {
                var abS2 = ABILITY_STATS[rc]; if (!abS2) return;
                var abD2 = ABILITIES_DB[rc]; if (!abD2) return;
                var abL2 = abilityLevel(lvl, abD2.reqLevel || 1, abD2.levels || 3);
                if (abL2 <= 0) return;
                var d2 = calcAbilityDamage(abS2, sLvl, lvl);
                var c2 = abS2.cool ? (Array.isArray(abS2.cool) ? abS2.cool[Math.min(abL2, abS2.cool.length) - 1] : abS2.cool) : 1;
                if (c2 < 1) c2 = 1;
                if (abS2.type === 'passive' || abD2.type === 'passive') d2 *= 0.2;
                dpsLvl += d2 / c2;
                // SpellDmgPct на этом уровне
                if (abS2.buffs && abS2.buffs.spellDmgPct) spellDmgPctLvl += abS2.buffs.spellDmgPct[Math.min(abL2, abS2.buffs.spellDmgPct.length) - 1] || 0;
            });
            dpsLvl *= (1 + spellDmgPctLvl / 100);
            if (lvl === 30) dps30 = dpsLvl; else dps200 = dpsLvl;
        });
        var scaling = dps30 > 0 ? dps200 / dps30 : 1;

        return {
            dps: Math.round(totalDPS),
            burst: Math.round(totalBurst),
            surv: Math.round(ehp),
            cc: Math.round(totalCC * 10) / 10,
            mob: Math.round(mob),
            farm: Math.round(farm),
            scaling: Math.round(scaling * 10) / 10
        };
    }

    // === Перцентиль: позиция героя среди всех (0–100) ===
    function calcPercentiles(allProfiles, axis) {
        var vals = allProfiles.map(function(p) { return p.raw[axis]; }).sort(function(a, b) { return a - b; });
        var n = vals.length;
        return function(val) {
            var below = 0, equal = 0;
            for (var i = 0; i < n; i++) {
                if (vals[i] < val) below++;
                else if (vals[i] === val) equal++;
                else break;
            }
            return Math.round((below + equal / 2) / n * 100);
        };
    }

    // === UI State ===
    var heroes = HEROES_DATA.filter(function(h) { return !h.wip && !h.isAltForm; });
    var currentLevel = 30;
    var profileCache = {};
    var allProfiles = [];
    var percentileFns = {};
    var tableSortCol = null;
    var tableSortAsc = true;

    function getRawProfile(hero, level) {
        var key = hero.heroId + '_' + level;
        if (!profileCache[key]) profileCache[key] = calcRawProfile(hero, level);
        return profileCache[key];
    }

    function rebuildPercentiles() {
        allProfiles = heroes.map(function(h) { return { hero: h, raw: getRawProfile(h, currentLevel) }; });
        percentileFns = {};
        AXES.forEach(function(axis) {
            percentileFns[axis] = calcPercentiles(allProfiles, axis);
        });
    }

    function pctClass(pct) {
        if (pct >= 90) return 'best';
        if (pct >= 70) return 'high';
        if (pct <= 20) return 'low';
        return 'mid';
    }

    function pctColor(pct) {
        if (pct >= 90) return '#ffd43b';
        if (pct >= 70) return '#ffa500';
        if (pct <= 20) return '#ff6b6b';
        return '#00e6ff';
    }

    function formatRaw(axis, val) {
        if (axis === 'scaling') return val.toFixed(1) + 'x';
        if (val >= 10000) return (val / 1000).toFixed(1) + 'k';
        return val.toLocaleString();
    }

    // === Селекты ===
    function populateSelects() {
        var s1 = document.getElementById('hero1');
        var s2 = document.getElementById('hero2');
        var s3 = document.getElementById('hero3');
        var opts = '<option value="">— не выбран —</option>';
        heroes.forEach(function(h) { opts += '<option value="' + h.heroId + '">' + h.name + '</option>'; });
        s2.innerHTML = opts;
        s3.innerHTML = opts;
        var opts1 = '';
        heroes.forEach(function(h) { opts1 += '<option value="' + h.heroId + '">' + h.name + '</option>'; });
        s1.innerHTML = opts1;
        s1.value = 'paladin';
        updateSelectOptions();
    }

    function updateSelectOptions() {
        var ids = [
            document.getElementById('hero1').value,
            document.getElementById('hero2').value,
            document.getElementById('hero3').value
        ];
        ['hero1', 'hero2', 'hero3'].forEach(function(id, i) {
            var sel = document.getElementById(id);
            var current = sel.value;
            for (var j = 0; j < sel.options.length; j++) {
                var opt = sel.options[j];
                opt.disabled = opt.value && opt.value !== current && ids.indexOf(opt.value) !== -1;
            }
        });
    }

    // === Радар (перцентильная шкала 0–100) ===
    function drawRadar(selectedHeroes) {
        var canvas = document.getElementById('radarCanvas');
        var ctx = canvas.getContext('2d');
        var W = parseInt(canvas.style.width) || 420;
        var H = W;
        var cx = W / 2, cy = H / 2;
        var R = Math.min(W, H) / 2 - 50;
        var n = AXES.length;

        ctx.clearRect(0, 0, W, H);

        // Кольца
        var rings = [25, 50, 75, 100];
        rings.forEach(function(pct) {
            var r = R * pct / 100;
            ctx.beginPath();
            for (var i = 0; i <= n; i++) {
                var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
                var x = cx + r * Math.cos(angle);
                var y = cy + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = pct === 50 ? 'rgba(0,230,255,0.15)' : 'rgba(0,230,255,0.08)';
            ctx.lineWidth = pct === 50 ? 1.5 : 1;
            ctx.stroke();
        });

        // Оси + подписи
        AXES.forEach(function(axis, i) {
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
            ctx.strokeStyle = 'rgba(0,230,255,0.12)';
            ctx.stroke();
            var lx = cx + (R + 32) * Math.cos(angle);
            var ly = cy + (R + 32) * Math.sin(angle);
            ctx.fillStyle = '#8aa0c0';
            ctx.font = '11px Segoe UI, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(AXIS_LABELS[axis], lx, ly);
        });

        // Профили героев
        selectedHeroes.forEach(function(item, pi) {
            ctx.beginPath();
            AXES.forEach(function(axis, i) {
                var pct = percentileFns[axis](item.raw[axis]);
                var r = R * pct / 100;
                var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
                var x = cx + r * Math.cos(angle);
                var y = cy + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.fillStyle = HERO_COLORS[pi] + '20';
            ctx.fill();
            ctx.strokeStyle = HERO_COLORS[pi];
            ctx.lineWidth = 2;
            ctx.stroke();

            // Точки
            AXES.forEach(function(axis, i) {
                var pct = percentileFns[axis](item.raw[axis]);
                var r = R * pct / 100;
                var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
                ctx.beginPath();
                ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 3, 0, Math.PI * 2);
                ctx.fillStyle = HERO_COLORS[pi];
                ctx.fill();
            });
        });
    }

    // === Карточки значений ===
    function renderValues(selectedHeroes) {
        var container = document.getElementById('radarValues');
        container.innerHTML = '';
        selectedHeroes.forEach(function(item, pi) {
            var div = document.createElement('div');
            div.className = 'hero-values';
            var html = '<h3><span class="color-dot" style="background:' + HERO_COLORS[pi] + '"></span>' + item.hero.name + '</h3>';
            AXES.forEach(function(axis) {
                var raw = item.raw[axis];
                var pct = percentileFns[axis](raw);
                var cls = pctClass(pct);
                var color = pctColor(pct);
                html += '<div class="stat-row">'
                    + '<span class="stat-label">' + AXIS_LABELS[axis] + '</span>'
                    + '<span class="stat-right">'
                    + '<span class="stat-pct-bar"><span class="stat-pct-fill" style="width:' + pct + '%;background:' + color + '"></span></span>'
                    + '<span class="stat-pct-num ' + cls + '">' + pct + '</span>'
                    + '<span class="stat-raw">' + formatRaw(axis, raw) + '</span>'
                    + '</span></div>';
            });
            div.innerHTML = html;
            container.appendChild(div);
        });
    }

    // === Таблица (перцентили) ===
    function renderTable() {
        var data = allProfiles.slice();

        if (tableSortCol) {
            data.sort(function(a, b) {
                if (tableSortCol === 'name') {
                    return tableSortAsc ? a.hero.name.localeCompare(b.hero.name) : b.hero.name.localeCompare(a.hero.name);
                }
                var va = percentileFns[tableSortCol](a.raw[tableSortCol]);
                var vb = percentileFns[tableSortCol](b.raw[tableSortCol]);
                return tableSortAsc ? va - vb : vb - va;
            });
        }

        var tbody = document.getElementById('percentileBody');
        tbody.innerHTML = data.map(function(d) {
            var cells = AXES.map(function(axis) {
                var raw = d.raw[axis];
                var pct = percentileFns[axis](raw);
                var cls = pctClass(pct);
                return '<td class="pct-cell ' + cls + '" title="' + AXIS_LABELS[axis] + ': ' + formatRaw(axis, raw) + '">' + pct + '</td>';
            }).join('');
            return '<tr><td style="color:var(--text-primary);font-weight:500;">' + d.hero.name + '</td>' + cells + '</tr>';
        }).join('');

        // Стрелки сортировки
        document.querySelectorAll('.percentile-table th').forEach(function(th) {
            var col = th.dataset.col;
            var arrow = '';
            if (col === tableSortCol) arrow = tableSortAsc ? ' ▲' : ' ▼';
            th.textContent = (col === 'name' ? 'Герой' : AXIS_LABELS[col]) + arrow;
        });
    }

    // === Обновить всё ===
    function update() {
        var h1Id = document.getElementById('hero1').value;
        var h2Id = document.getElementById('hero2').value;
        var h3Id = document.getElementById('hero3').value;

        rebuildPercentiles();

        var selected = [];
        [h1Id, h2Id, h3Id].forEach(function(id, i) {
            if (!id) return;
            var h = heroes.find(function(h) { return h.heroId === id; });
            if (h) selected.push({ hero: h, raw: getRawProfile(h, currentLevel) });
        });

        if (selected.length > 0) {
            drawRadar(selected);
            renderValues(selected);
        } else {
            var canvas = document.getElementById('radarCanvas');
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('radarValues').innerHTML = '';
        }

        renderTable();
    }

    // === Инициализация ===
    function init() {
        populateSelects();

        document.getElementById('hero1').addEventListener('change', function() { updateSelectOptions(); update(); });
        document.getElementById('hero2').addEventListener('change', function() { updateSelectOptions(); update(); });
        document.getElementById('hero3').addEventListener('change', function() { updateSelectOptions(); update(); });

        var slider = document.getElementById('levelSlider');
        var levelDisp = document.getElementById('levelDisplay');
        slider.addEventListener('input', function() {
            currentLevel = parseInt(this.value);
            levelDisp.textContent = currentLevel;
            profileCache = {};
            update();
        });

        // Сортировка таблицы
        document.querySelectorAll('.percentile-table th').forEach(function(th) {
            th.addEventListener('click', function() {
                var col = this.dataset.col;
                if (tableSortCol === col) {
                    tableSortAsc = !tableSortAsc;
                } else {
                    tableSortCol = col;
                    tableSortAsc = (col === 'name');
                }
                renderTable();
            });
        });

        // Адаптив canvas
        function resizeCanvas() {
            var canvas = document.getElementById('radarCanvas');
            var wrap = canvas.parentElement;
            var maxW = Math.min(wrap.clientWidth - 16, 420);
            if (maxW < 100) maxW = 100;
            var size = maxW < 420 ? maxW : 420;
            var dpr = window.devicePixelRatio || 1;
            canvas.width = Math.round(size * dpr);
            canvas.height = Math.round(size * dpr);
            canvas.style.width = size + 'px';
            canvas.style.height = size + 'px';
            var ctx = canvas.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() { resizeCanvas(); update(); }, 100);
        });

        resizeCanvas();
        update();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
