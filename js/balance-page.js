document.addEventListener('DOMContentLoaded', function() {
(function() {
    'use strict';

    // Столбцы, где меньше = лучше (инвертируем worst-val)
    const LOWER_IS_BETTER = new Set(['atkSpeed']);

    let currentAttr = 'all';
    let searchQuery = '';
    let sortCol = 'name';
    let sortDir = 1;

    const ATTR_LABELS = { strength: 'Сила', agility: 'Ловкость', intelligence: 'Разум' };
    const TYPE_LABELS = { melee: '<i class="fas fa-fist-raised"></i> Ближний', ranged: '<i class="fas fa-bullseye"></i> Дальний' };

    // Группы колонок: col → group
    const COL_GROUPS = {
        strBase: 'stats', strGain: 'stats', agiBase: 'stats', agiGain: 'stats', intBase: 'stats', intGain: 'stats',
        hp: 'combat', mp: 'combat', atk: 'combat', def: 'combat', atkSpeed: 'combat',
        hpRegen: 'regen', mpRegen: 'regen',
        speed: 'move', range: 'move', attackType: 'move'
    };
    const activeGroups = new Set(['stats', 'combat', 'regen', 'move']);

    function getHeroes() {
        if (typeof HEROES_DATA === 'undefined') return [];
        return HEROES_DATA.filter(h => {
            if (h.isAltForm || h.wip) return false;
            if (currentAttr !== 'all' && h.attr !== currentAttr) return false;
            if (searchQuery && !h.name.toLowerCase().includes(searchQuery)) return false;
            return true;
        });
    }

    function sortHeroes(heroes) {
        return heroes.slice().sort((a, b) => {
            let va = a[sortCol], vb = b[sortCol];
            if (sortCol === 'name') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
            if (sortCol === 'attr') { va = va || ''; vb = vb || ''; }
            if (typeof va === 'string') return va.localeCompare(vb) * sortDir;
            return ((va || 0) - (vb || 0)) * sortDir;
        });
    }

    // Найти лучшие/худшие значения для подсветки
    function findExtremes(heroes) {
        const numCols = ['strBase','strGain','agiBase','agiGain','intBase','intGain','hp','mp','atk','def','atkSpeed','hpRegen','mpRegen','speed','range'];
        const extremes = {};
        numCols.forEach(col => {
            const vals = heroes.map(h => h[col] || 0);
            extremes[col] = { max: Math.max(...vals), min: Math.min(...vals) };
        });
        return extremes;
    }

    function renderTable() {
        const heroes = getHeroes();
        const sorted = sortHeroes(heroes);
        const extremes = findExtremes(heroes);
        const tbody = document.getElementById('balanceBody');
        const countEl = document.getElementById('balanceCount');

        countEl.textContent = 'Героев: ' + sorted.length;

        // Обновить стрелки в заголовках
        document.querySelectorAll('.balance-table th').forEach(th => {
            const col = th.dataset.col;
            if (!col) return;
            th.classList.toggle('sorted', col === sortCol);
            const arrow = th.querySelector('.sort-arrow');
            if (arrow) arrow.textContent = col === sortCol ? (sortDir === 1 ? '▲' : '▼') : '▲';
        });

        if (!sorted.length) {
            tbody.innerHTML = '<tr><td colspan="17" style="text-align:center;color:var(--text-muted);padding:24px;">Нет героев</td></tr>';
            return;
        }

        tbody.innerHTML = sorted.map(h => {
            const heroPage = h.heroId ? 'heroes/' + h.heroId + '.html' : '#';
            const iconSrc = h.image ? 'images/heroes/' + h.image + '.png' : '';
            const iconHtml = iconSrc
                ? '<img loading="lazy" src="' + iconSrc + '" alt="" onerror="this.style.display=\'none\'">'
                : '';
            const attrClass = 'attr-' + (h.attr || '');
            const attrLabel = ATTR_LABELS[h.attr] || h.attr || '—';
            const typeClass = 'type-' + (h.attackType || 'melee');
            const typeLabel = TYPE_LABELS[h.attackType] || h.attackType || '—';

            function cell(col, hideClass) {
                const v = h[col] || 0;
                let cls = hideClass || '';
                if (v === 0) cls += ' zero-val';
                else if (extremes[col]?.max && extremes[col]?.max !== extremes[col]?.min && v === extremes[col].max) cls += ' best-val';
                else if (extremes[col]?.min && extremes[col]?.max !== extremes[col]?.min && v === extremes[col].min && !LOWER_IS_BETTER.has(col)) cls += ' worst-val';
                const group = COL_GROUPS[col] || '';
                if (group && !activeGroups.has(group)) return '';
                return '<td class="' + cls.trim() + '">' + v + '</td>';
            }

            // Атрибут — всегда видимый
            // Тип атаки — группа move
            var typeHtml = activeGroups.has('move')
                ? '<td class="' + typeClass + '">' + typeLabel + '</td>'
                : '';

            return '<tr>' +
                '<td><div class="hero-name-cell">' + iconHtml + '<a href="' + heroPage + '">' + h.name + '</a></div></td>' +
                '<td class="' + attrClass + '">' + attrLabel + '</td>' +
                typeHtml +
                cell('strBase') + cell('strGain', 'col-hide-mobile') +
                cell('agiBase') + cell('agiGain', 'col-hide-mobile') +
                cell('intBase') + cell('intGain', 'col-hide-mobile') +
                cell('hp') + cell('mp', 'col-hide-mobile') +
                cell('atk') + cell('def', 'col-hide-small') + cell('atkSpeed', 'col-hide-small') +
                cell('hpRegen', 'col-hide-mobile') + cell('mpRegen', 'col-hide-mobile') +
                cell('speed') + cell('range', 'col-hide-small') +
                '</tr>';
        }).join('');
    }

    // === Обработчики ===

    // Сортировка по клику на заголовок
    document.querySelectorAll('.balance-table th').forEach(th => {
        th.addEventListener('click', () => {
            const col = th.dataset.col;
            if (!col) return;
            if (sortCol === col) sortDir *= -1;
            else { sortCol = col; sortDir = 1; }
            renderTable();
        });
    });

    // Фильтр по атрибуту
    document.querySelectorAll('.attr-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.attr-btn').forEach(b => b.classList.remove('active', 'active-strength', 'active-agility', 'active-intelligence'));
            const attr = btn.dataset.attr;
            currentAttr = attr;
            btn.classList.add('active');
            if (attr !== 'all') btn.classList.add('active-' + attr);
            renderTable();
        });
    });

    // Поиск
    document.getElementById('balanceSearch').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderTable();
    });

    // Переключатели групп колонок
    document.querySelectorAll('.col-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.dataset.group;
            if (activeGroups.has(group)) {
                activeGroups.delete(group);
                btn.classList.remove('active');
            } else {
                activeGroups.add(group);
                btn.classList.add('active');
            }
            // Обновить thead
            document.querySelectorAll('.balance-table th[data-group]').forEach(th => {
                th.style.display = activeGroups.has(th.dataset.group) ? '' : 'none';
            });
            // Перерисовать tbody с учётом групп
            renderTable();
        });
    });

    // Первый рендер
    renderTable();
})();
}); // end DOMContentLoaded
