(function() {
    'use strict';

    var CREEPS = [];
    var searchQuery = '';
    var passiveFilter = 'all';
    var tierFilter = 'all';
    var sortCol = 'tier';
    var sortDir = 1;

    // Группы колонок
    var COL_GROUPS = { def: 'defense', defType: 'defense', regen: 'defense', magicRes: 'defense', cool: 'combat', spd: 'combat', gold: 'reward', xp: 'reward', passives: 'passives' };
    var activeGroups = { defense: true, combat: true, reward: true, passives: true };

    // Маппинг типов брони → CSS-класс
    var DEF_TYPE_CLASS = { small: 'def-type-small', medium: 'def-type-medium', heavy: 'def-type-heavy', Flesh: 'def-type-flesh' };
    var DEF_TYPE_LABEL = { small: 'Лёгкая', medium: 'Средняя', heavy: 'Тяжёлая', Flesh: 'Плоть' };

    function getCreeps() {
        if (!CREEPS.length && typeof CREEPS_DB !== 'undefined') CREEPS = CREEPS_DB;
        return CREEPS.filter(function(c) {
            if (searchQuery && !c.name.toLowerCase().includes(searchQuery) && !c.code.toLowerCase().includes(searchQuery)) return false;
            if (passiveFilter === 'has' && (!c.passives || !c.passives.length)) return false;
            if (passiveFilter === 'none' && c.passives && c.passives.length) return false;
            if (tierFilter !== 'all' && c.tier !== parseInt(tierFilter)) return false;
            return true;
        });
    }

    function sortCreeps(creeps) {
        return creeps.slice().sort(function(a, b) {
            var va = a[sortCol], vb = b[sortCol];
            if (sortCol === 'name' || sortCol === 'code' || sortCol === 'defType') {
                va = (va || '').toString().toLowerCase();
                vb = (vb || '').toString().toLowerCase();
                return va.localeCompare(vb) * sortDir;
            }
            if (sortCol === 'passives') {
                va = (a.passives || []).length;
                vb = (b.passives || []).length;
                return (va - vb) * sortDir;
            }
            return ((va || 0) - (vb || 0)) * sortDir;
        });
    }

    function findExtremes(creeps) {
        var numCols = ['level', 'tier', 'hp', 'atk', 'def', 'regen', 'magicRes', 'cool', 'spd', 'gold', 'xp'];
        var extremes = {};
        numCols.forEach(function(col) {
            var vals = creeps.map(function(c) { return c[col] || 0; });
            extremes[col] = { max: Math.max.apply(null, vals), min: Math.min.apply(null, vals) };
        });
        return extremes;
    }

    function renderTable() {
        var creeps = getCreeps();
        var sorted = sortCreeps(creeps);
        var extremes = findExtremes(creeps);
        var tbody = document.getElementById('creepBody');
        var countEl = document.getElementById('creepCount');

        countEl.textContent = 'Крипов: ' + sorted.length;

        // Обновить стрелки сортировки
        document.querySelectorAll('.creep-table th').forEach(function(th) {
            var col = th.dataset.col;
            if (!col) return;
            th.classList.toggle('sorted', col === sortCol);
            var arrow = th.querySelector('.sort-arrow');
            if (arrow) arrow.textContent = col === sortCol ? (sortDir === 1 ? '▲' : '▼') : '▲';
        });

        if (!sorted.length) {
            tbody.innerHTML = '<tr><td colspan="14" style="text-align:center;color:var(--text-muted);padding:24px;">Нет крипов</td></tr>';
            return;
        }

        tbody.innerHTML = sorted.map(function(c) {
            var initial = c.name.charAt(0);

            function cell(col) {
                var v = c[col] || 0;
                var group = COL_GROUPS[col] || '';
                if (group && !activeGroups[group]) return '';

                var cls = '';
                if (v === 0 && col !== 'level') cls += ' zero-val';
                else if (extremes[col] && extremes[col].max !== extremes[col].min && v === extremes[col].max) cls += ' best-val';
                else if (extremes[col] && extremes[col].max !== extremes[col].min && v === extremes[col].min) cls += ' worst-val';

                // Форматирование
                var display = v;
                if (col === 'cool' && v > 0) display = v.toFixed(1) + 'с';
                if (col === 'cool' && v === 0) { display = '—'; cls = cls.replace(' zero-val', ''); }
                if (col === 'spd' && v === 0) { display = '—'; cls = cls.replace(' zero-val', ''); }
                if (col === 'magicRes' && v > 0) display = v + '%';
                if (col === 'magicRes' && v === 0) { display = '0%'; cls = cls.replace(' zero-val', ''); }

                return '<td class="' + cls.trim() + '">' + display + '</td>';
            }

            // Тип брони (через cell для toggle)
            var defTypeHtml = '';
            if (activeGroups.defense) {
                var dt = c.defType || '';
                var dtClass = DEF_TYPE_CLASS[dt] || '';
                var dtLabel = DEF_TYPE_LABEL[dt] || dt || '—';
                defTypeHtml = '<td><span class="def-type-tag ' + dtClass + '">' + dtLabel + '</span></td>';
            } else {
                defTypeHtml = '';
            }

            // Тир
            var tierHtml = '';
            var tier = c.tier || 0;
            if (tier > 0 && typeof CREEP_TIERS !== 'undefined' && CREEP_TIERS[tier]) {
                var tb = CREEP_TIERS[tier];
                var armTip = tb.armInterval === 1 ? 'каждый ур.' : 'каждые ' + tb.armInterval + ' ур.';
                var tierTitle = '+' + tb.atk + ' атк, +' + tb.hp + ' HP, +' + tb.as + ' AS, +1 бр ' + armTip + ' за ур.';
                tierHtml = '<td><span class="tier-badge tier-' + tier + '" title="' + tierTitle + '">' + tier + '</span></td>';
            } else if (tier > 0) {
                tierHtml = '<td><span class="tier-badge tier-' + tier + '">' + tier + '</span></td>';
            } else {
                tierHtml = '<td>—</td>';
            }

            // Способности
            var passiveHtml = '—';
            if (Array.isArray(c.passives) && c.passives.length) {
                passiveHtml = c.passives.map(function(p) {
                    return '<span class="passive-tag">' + (CREEP_PASSIVE_LABELS[p] || p) + '</span>';
                }).join('');
            }
            var passiveTd = activeGroups.passives
                ? '<td><div class="passive-list">' + passiveHtml + '</div></td>'
                : '';

            return '<tr>' +
                '<td><div class="creep-name-cell"><div class="creep-icon-placeholder">' + initial + '</div><span>' + c.name + '</span></div></td>' +
                cell('level') + tierHtml + cell('hp') + cell('atk') +
                cell('def') + defTypeHtml + cell('regen') + cell('magicRes') +
                cell('cool') + cell('spd') +
                cell('gold') + cell('xp') +
                passiveTd +
                '</tr>';
        }).join('');
    }

    // Сортировка
    document.querySelectorAll('.creep-table th').forEach(function(th) {
        th.addEventListener('click', function() {
            var col = th.dataset.col;
            if (!col) return;
            if (sortCol === col) sortDir *= -1;
            else { sortCol = col; sortDir = 1; }
            renderTable();
        });
    });

    // Фильтр по пассивкам
    document.querySelectorAll('.passive-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.passive-btn').forEach(function(b) { b.classList.remove('active'); });
            passiveFilter = btn.dataset.passive;
            btn.classList.add('active');
            renderTable();
        });
    });

    // Переключатели групп колонок
    document.querySelectorAll('.col-toggle').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var group = btn.dataset.group;
            activeGroups[group] = !activeGroups[group];
            btn.classList.toggle('active', activeGroups[group]);
            // Скрыть/показать thead
            document.querySelectorAll('.creep-table th[data-group]').forEach(function(th) {
                th.style.display = activeGroups[th.dataset.group] ? '' : 'none';
            });
            renderTable();
        });
    });

    // Поиск
    document.getElementById('creepSearch').addEventListener('input', function(e) {
        searchQuery = e.target.value.toLowerCase().trim();
        renderTable();
    });

    // Фильтр по тирам
    document.getElementById('creepTierFilter').addEventListener('change', function(e) {
        tierFilter = e.target.value;
        renderTable();
    });

    // Справочник бонусов
    function renderBonusTable() {
        if (typeof CREEP_TIERS === 'undefined') return;
        var tbody = document.getElementById('bonusBody');
        if (!tbody) return;
        var rows = '';
        for (var i = 1; i < CREEP_TIERS.length; i++) {
            var t = CREEP_TIERS[i];
            var armText = t.armInterval === 1 ? 'каждый ур.' : 'каждые ' + t.armInterval + ' ур.';
            rows += '<tr>' +
                '<td><div class="bonus-tier-cell"><span class="tier-badge tier-' + i + '">' + i + '</span></div></td>' +
                '<td>+' + t.atk + '</td>' +
                '<td>+' + t.hp + '</td>' +
                '<td>+' + t.as + '</td>' +
                '<td>+1 ' + armText + '</td>' +
                '</tr>';
        }
        tbody.innerHTML = rows;
    }

    // Переключатель бонусов
    var bonusToggle = document.getElementById('bonusToggle');
    var bonusWrap = document.getElementById('bonusTableWrap');
    if (bonusToggle && bonusWrap) {
        bonusToggle.addEventListener('click', function() {
            bonusToggle.classList.toggle('open');
            bonusWrap.classList.toggle('open');
        });
    }

    // Ждём загрузки defer-скриптов
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof CREEPS_DB !== 'undefined') CREEPS = CREEPS_DB;
            renderTable();
            renderBonusTable();
        });
    } else {
        if (typeof CREEPS_DB !== 'undefined') CREEPS = CREEPS_DB;
        renderTable();
        renderBonusTable();
    }
})();
document.addEventListener('DOMContentLoaded', function() { if (typeof revealElements === 'function') revealElements('.creep-table-wrap'); });
