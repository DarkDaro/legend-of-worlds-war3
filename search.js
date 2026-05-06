/**
 * search.js — Глобальный поиск по героям и предметам.
 * Строит индекс из HEROES_DATA (hero-data.js) и itemsDB (items-db.js).
 * Внедряется через icon-loader.js.
 */
(function() {
    'use strict';

    var searchOverlay = null;
    var searchInput = null;
    var resultsContainer = null;
    var index = null;

    // ── Построение индекса ──

    function buildIndex() {
        index = { heroes: [], items: [] };

        // Герои
        if (typeof HEROES_DATA !== 'undefined' && Array.isArray(HEROES_DATA)) {
            HEROES_DATA.forEach(function(h) {
                index.heroes.push({
                    name: h.name,
                    title: h.title || '',
                    attr: h.attr || '',
                    roleName: h.roleName || '',
                    heroId: h.heroId,
                    url: 'heroes/' + h.heroId + '.html',
                    searchText: (h.name + ' ' + (h.title || '') + ' ' + (h.roleName || '')).toLowerCase()
                });
            });
        }

        // Предметы
        if (typeof itemsDB !== 'undefined' && typeof itemsDB === 'object') {
            Object.keys(itemsDB).forEach(function(key) {
                var item = itemsDB[key];
                if (!item || !item.name) return;
                index.items.push({
                    name: item.name,
                    type: item.type || '',
                    cost: item.cost || 0,
                    id: item.id,
                    url: 'items.html?item=' + item.id,
                    searchText: (item.name + ' ' + (item.type || '')).toLowerCase()
                });
            });
        }
    }

    // ── Поиск ──

    function search(query) {
        if (!index) buildIndex();
        var q = query.toLowerCase().trim();
        if (!q) return { heroes: [], items: [] };

        var results = { heroes: [], items: [] };

        index.heroes.forEach(function(h) {
            if (h.searchText.indexOf(q) !== -1) {
                results.heroes.push(h);
            }
        });

        index.items.forEach(function(item) {
            if (item.searchText.indexOf(q) !== -1) {
                results.items.push(item);
            }
        });

        // Лимит
        results.heroes = results.heroes.slice(0, 8);
        results.items = results.items.slice(0, 8);

        return results;
    }

    // ── Рендер результатов ──

    var ATTR_LABELS = {
        strength: 'Сила',
        agility: 'Ловкость',
        intelligence: 'Разум'
    };

    var ATTR_COLORS = {
        strength: '#ff5555',
        agility: '#55ff55',
        intelligence: '#55aaff'
    };

    function renderResults(results, query) {
        if (!resultsContainer) return;
        var html = '';

        if (results.heroes.length === 0 && results.items.length === 0) {
            html = '<div class="gs-empty">Ничего не найдено</div>';
            resultsContainer.innerHTML = html;
            return;
        }

        if (results.heroes.length > 0) {
            html += '<div class="gs-group"><div class="gs-group-title"><i class="fas fa-users"></i> Герои</div>';
            results.heroes.forEach(function(h) {
                var attrColor = ATTR_COLORS[h.attr] || '#8aa0c0';
                var attrLabel = ATTR_LABELS[h.attr] || h.attr;
                html += '<a href="' + h.url + '" class="gs-result">'
                    + '<span class="gs-result-name">' + highlightMatch(h.name, query) + '</span>'
                    + '<span class="gs-result-sub" style="color:' + attrColor + '">' + attrLabel + '</span>'
                    + '<span class="gs-result-sub">' + h.roleName + '</span>'
                    + '</a>';
            });
            html += '</div>';
        }

        if (results.items.length > 0) {
            html += '<div class="gs-group"><div class="gs-group-title"><i class="fas fa-flask"></i> Предметы</div>';
            results.items.forEach(function(item) {
                html += '<a href="' + item.url + '" class="gs-result">'
                    + '<span class="gs-result-name">' + highlightMatch(item.name, query) + '</span>'
                    + '<span class="gs-result-sub">' + formatCost(item.cost) + '</span>'
                    + '</a>';
            });
            html += '</div>';
        }

        resultsContainer.innerHTML = html;
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        return text.replace(re, '<mark>$1</mark>');
    }

    function formatCost(cost) {
        if (!cost) return '';
        return cost.toLocaleString('ru-RU') + ' зол.';
    }

    // ── UI ──

    function createOverlay() {
        if (searchOverlay) return;

        searchOverlay = document.createElement('div');
        searchOverlay.className = 'gs-overlay';
        searchOverlay.innerHTML =
            '<div class="gs-modal">'
            + '<div class="gs-input-wrap">'
            + '<i class="fas fa-search gs-search-icon"></i>'
            + '<input type="text" class="gs-input" placeholder="Поиск героев и предметов..." autocomplete="off" />'
            + '<button class="gs-close" title="Закрыть"><i class="fas fa-times"></i></button>'
            + '</div>'
            + '<div class="gs-results"></div>'
            + '</div>';

        document.body.appendChild(searchOverlay);

        searchInput = searchOverlay.querySelector('.gs-input');
        resultsContainer = searchOverlay.querySelector('.gs-results');

        // Ввод
        searchInput.addEventListener('input', function() {
            var q = searchInput.value.trim();
            if (q.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }
            var results = search(q);
            renderResults(results, q);
        });

        // Закрытие
        searchOverlay.querySelector('.gs-close').addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) closeSearch();
        });

        // Клик по результату — если уже на целевой странице, не навигируем, а открываем напрямую
        searchOverlay.addEventListener('click', function(e) {
            var link = e.target.closest('.gs-result');
            if (!link) return;
            var href = link.getAttribute('href');
            if (!href) return;

            // Предметы: если мы на items.html, открываем деталь напрямую
            if (href.indexOf('items.html?item=') === 0 || href.indexOf('/items.html?item=') !== -1) {
                var match = href.match(/item=([^&]+)/);
                if (match && typeof openItemDetail === 'function') {
                    e.preventDefault();
                    closeSearch();
                    openItemDetail(match[1]);
                    if (!isItemMobileSurface()) {
                        var panel = document.getElementById('itemDetailPanel');
                        if (panel) panel.scrollIntoView({ behavior: 'smooth' });
                    }
                    return;
                }
            }

            // Герои: если мы в heroes/ и кликаем на другого героя, навигируем нормально
            // (каждый герой — отдельный HTML, просто переходим)
        });

        // Клавиши
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSearch();
        });
    }

    function openSearch() {
        createOverlay();
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        searchInput.value = '';
        resultsContainer.innerHTML = '';
        setTimeout(function() { searchInput.focus(); }, 50);
    }

    function closeSearch() {
        if (!searchOverlay) return;
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Глобальный хоткей
    document.addEventListener('keydown', function(e) {
        // Ctrl+K или Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    });

    // Публичный API
    window.GlobalSearch = {
        open: openSearch,
        close: closeSearch
    };

})();
