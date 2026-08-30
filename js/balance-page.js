document.addEventListener('DOMContentLoaded', function() {
(function() {
    'use strict';

    var LOWER_IS_BETTER = ['atkSpeed'];

    var ROLE_META = {
        tank:       { label: 'Танк',        icon: 'fa-shield-alt',     cls: 'role-tank' },
        bruiser:    { label: 'Рубака',       icon: 'fa-fist-raised',    cls: 'role-bruiser' },
        initiator:  { label: 'Инициатор',    icon: 'fa-bolt',           cls: 'role-initiator' },
        assassin:   { label: 'Убийца',       icon: 'fa-crosshairs',     cls: 'role-assassin' },
        damager:    { label: 'Дамагер',      icon: 'fa-fire',           cls: 'role-damager' },
        controller: { label: 'Контролёр',    icon: 'fa-project-diagram',cls: 'role-controller' },
        healer:     { label: 'Целитель',     icon: 'fa-heart',          cls: 'role-healer' },
        support:    { label: 'Помощник',     icon: 'fa-hands-helping',  cls: 'role-support' }
    };

    var currentAttr = 'all';
    var currentRole = 'all';
    var searchQuery = '';
    var sortCol = 'name';
    var sortDir = 1;

    var ATTR_LABELS = { strength: 'Сила', agility: 'Ловкость', intelligence: 'Разум' };
    var TYPE_LABELS = { melee: '<i class="fas fa-fist-raised"></i> Ближний', ranged: '<i class="fas fa-bullseye"></i> Дальний' };

    var COL_GROUPS = {
        strBase: 'stats', strGain: 'stats', agiBase: 'stats', agiGain: 'stats', intBase: 'stats', intGain: 'stats',
        hp: 'combat', mp: 'combat', atk: 'combat', def: 'combat', atkSpeed: 'combat',
        hpRegen: 'regen', mpRegen: 'regen',
        speed: 'move', range: 'move', attackType: 'move'
    };
    var activeGroups = ['stats', 'combat', 'regen', 'move'];

    function getHeroes() {
        if (typeof HEROES_DATA === 'undefined') return [];
        return HEROES_DATA.filter(function(h) {
            if (h.isAltForm || h.wip) return false;
            if (currentAttr !== 'all' && h.attr !== currentAttr) return false;
            if (currentRole !== 'all' && (!h.roles || h.roles.indexOf(currentRole) === -1)) return false;
            if (searchQuery && h.name.toLowerCase().indexOf(searchQuery) === -1) return false;
            return true;
        });
    }

    function sortHeroes(heroes) {
        return heroes.slice().sort(function(a, b) {
            var va = a[sortCol], vb = b[sortCol];
            if (sortCol === 'name') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
            if (sortCol === 'attr') { va = va || ''; vb = vb || ''; }
            if (sortCol === 'roles') { va = (a.roles || []).join(','); vb = (b.roles || []).join(','); return va.localeCompare(vb) * sortDir; }
            if (typeof va === 'string') return va.localeCompare(vb) * sortDir;
            return ((va || 0) - (vb || 0)) * sortDir;
        });
    }

    function findExtremes(heroes) {
        var numCols = ['strBase','strGain','agiBase','agiGain','intBase','intGain','hp','mp','atk','def','atkSpeed','hpRegen','mpRegen','speed','range'];
        var extremes = {};
        for (var i = 0; i < numCols.length; i++) {
            var col = numCols[i];
            var vals = [];
            for (var j = 0; j < heroes.length; j++) {
                vals.push(heroes[j][col] || 0);
            }
            extremes[col] = { max: Math.max.apply(null, vals), min: Math.min.apply(null, vals) };
        }
        return extremes;
    }

    function groupActive(group) {
        return activeGroups.indexOf(group) !== -1;
    }

    function makeCell(h, extremes, col, hideClass) {
        var v = h[col];
        if (v === undefined || v === null) v = 0;
        var cls = hideClass || '';
        if (v === 0) {
            cls += ' zero-val';
        } else {
            var ext = extremes[col];
            if (ext && ext.max !== ext.min) {
                if (v === ext.max) cls += ' best-val';
                else if (v === ext.min && LOWER_IS_BETTER.indexOf(col) === -1) cls += ' worst-val';
            }
        }
        var group = COL_GROUPS[col] || '';
        if (group && !groupActive(group)) return '';
        return '<td class="' + cls.trim() + '">' + v + '</td>';
    }

    function renderTable() {
        var heroes = getHeroes();
        var sorted = sortHeroes(heroes);
        var extremes = findExtremes(heroes);
        var tbody = document.getElementById('balanceBody');
        var countEl = document.getElementById('balanceCount');

        countEl.textContent = 'Героев: ' + sorted.length;

        document.querySelectorAll('.balance-table th').forEach(function(th) {
            var col = th.dataset.col;
            if (!col) return;
            th.classList.toggle('sorted', col === sortCol);
            var arrow = th.querySelector('.sort-arrow');
            if (arrow) arrow.textContent = col === sortCol ? (sortDir === 1 ? '\u25B2' : '\u25BC') : '\u25B2';
        });

        if (!sorted.length) {
            tbody.innerHTML = '<tr><td colspan="19" style="text-align:center;color:var(--text-muted);padding:24px;">Нет героев</td></tr>';
            return;
        }

        var html = '';
        for (var i = 0; i < sorted.length; i++) {
            var h = sorted[i];
            var heroPage = h.heroId ? 'heroes/' + h.heroId + '.html' : '#';
            var iconSrc = h.image ? 'images/heroes/' + h.image + '.png' : '';
            var iconHtml = iconSrc
                ? '<img loading="lazy" src="' + iconSrc + '" alt="" onerror="this.style.display=\'none\'">'
                : '';
            var attrClass = 'attr-' + (h.attr || '');
            var attrLabel = ATTR_LABELS[h.attr] || h.attr || '\u2014';
            var typeClass = 'type-' + (h.attackType || 'melee');
            var typeLabel = TYPE_LABELS[h.attackType] || h.attackType || '\u2014';

            var rolesHtml = '\u2014';
            if (h.roleNames && h.roleNames.length) {
                var parts = [];
                for (var ri = 0; ri < h.roleNames.length; ri++) {
                    var rk = h.roles[ri] || '';
                    var meta = ROLE_META[rk] || {};
                    var cls = meta.cls || 'role-other';
                    var icon = meta.icon ? '<i class="fas ' + meta.icon + '"></i> ' : '';
                    parts.push('<span class="role-tag ' + cls + '">' + icon + h.roleNames[ri] + '</span>');
                }
                rolesHtml = parts.join(' ');
            }

            var typeHtml = groupActive('move')
                ? '<td class="' + typeClass + '">' + typeLabel + '</td>'
                : '';

            html += '<tr>' +
                '<td><div class="hero-name-cell">' + iconHtml + '<a href="' + heroPage + '">' + h.name + '</a></div></td>' +
                '<td class="' + attrClass + '">' + attrLabel + '</td>' +
                '<td><div class="role-cell">' + rolesHtml + '</div></td>' +
                typeHtml +
                makeCell(h, extremes, 'strBase', '') + makeCell(h, extremes, 'strGain', 'col-hide-mobile') +
                makeCell(h, extremes, 'agiBase', '') + makeCell(h, extremes, 'agiGain', 'col-hide-mobile') +
                makeCell(h, extremes, 'intBase', '') + makeCell(h, extremes, 'intGain', 'col-hide-mobile') +
                makeCell(h, extremes, 'hp', '') + makeCell(h, extremes, 'mp', 'col-hide-mobile') +
                makeCell(h, extremes, 'atk', '') + makeCell(h, extremes, 'def', 'col-hide-small') + makeCell(h, extremes, 'atkSpeed', 'col-hide-small') +
                makeCell(h, extremes, 'hpRegen', 'col-hide-mobile') + makeCell(h, extremes, 'mpRegen', 'col-hide-mobile') +
                makeCell(h, extremes, 'speed', '') + makeCell(h, extremes, 'range', 'col-hide-small') +
                '</tr>';
        }
        tbody.innerHTML = html;
    }

    // === Обработчики ===

    document.querySelectorAll('.balance-table th').forEach(function(th) {
        th.addEventListener('click', function() {
            var col = th.dataset.col;
            if (!col) return;
            if (sortCol === col) sortDir *= -1;
            else { sortCol = col; sortDir = 1; }
            renderTable();
        });
    });

    document.querySelectorAll('.attr-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.attr-btn').forEach(function(b) { b.classList.remove('active', 'active-strength', 'active-agility', 'active-intelligence'); });
            var attr = btn.dataset.attr;
            currentAttr = attr;
            btn.classList.add('active');
            if (attr !== 'all') btn.classList.add('active-' + attr);
            renderTable();
        });
    });

    document.querySelectorAll('.role-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.role-btn').forEach(function(b) { b.classList.remove('active'); });
            currentRole = btn.dataset.role;
            btn.classList.add('active');
            renderTable();
        });
    });

    document.getElementById('balanceSearch').addEventListener('input', function(e) {
        searchQuery = e.target.value.toLowerCase().trim();
        renderTable();
    });

    document.querySelectorAll('.col-toggle').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var group = btn.dataset.group;
            var idx = activeGroups.indexOf(group);
            if (idx !== -1) {
                activeGroups.splice(idx, 1);
                btn.classList.remove('active');
            } else {
                activeGroups.push(group);
                btn.classList.add('active');
            }
            document.querySelectorAll('.balance-table th[data-group]').forEach(function(th) {
                th.style.display = groupActive(th.dataset.group) ? '' : 'none';
            });
            renderTable();
        });
    });

    try { renderTable(); } catch(e) { console.error('[balance] renderTable error:', e); }
})();
});