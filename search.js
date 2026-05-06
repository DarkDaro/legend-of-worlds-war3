/**
 * search.js — Глобальный поиск по героям и предметам.
 */
(function() {
    'use strict';

    var searchOverlay = null;
    var searchInput = null;
    var resultsContainer = null;
    var indexBuilt = false;
    var index = { heroes: [], items: [] };

    function isOnItemsPage() {
        return location.pathname.indexOf('/items.html') !== -1 || location.pathname.endsWith('/items.html');
    }

    function isOnHeroesDir() {
        return location.pathname.indexOf('/heroes/') !== -1;
    }

    // ── Построение индекса (ленивое) ──

    function buildIndex() {
        index = { heroes: [], items: [] };

        if (typeof HEROES_DATA !== 'undefined' && Array.isArray(HEROES_DATA)) {
            HEROES_DATA.forEach(function(h) {
                index.heroes.push({
                    name: h.name,
                    title: h.title || '',
                    attr: h.attr || '',
                    roleName: h.roleName || '',
                    heroId: h.heroId,
                    searchText: (h.name + ' ' + (h.title || '') + ' ' + (h.roleName || '')).toLowerCase()
                });
            });
        }

        if (typeof itemsDB !== 'undefined' && typeof itemsDB === 'object') {
            Object.keys(itemsDB).forEach(function(key) {
                var item = itemsDB[key];
                if (!item || !item.name) return;
                index.items.push({
                    name: item.name,
                    type: item.type || '',
                    cost: item.cost || 0,
                    id: item.id,
                    searchText: (item.name + ' ' + (item.type || '')).toLowerCase()
                });
            });
        }

        indexBuilt = true;
    }

    // ── Поиск ──

    function search(query) {
        if (!indexBuilt) buildIndex();
        var q = query.toLowerCase().trim();
        if (!q) return { heroes: [], items: [] };

        var results = { heroes: [], items: [] };
        index.heroes.forEach(function(h) {
            if (h.searchText.indexOf(q) !== -1) results.heroes.push(h);
        });
        index.items.forEach(function(item) {
            if (item.searchText.indexOf(q) !== -1) results.items.push(item);
        });
        results.heroes = results.heroes.slice(0, 8);
        results.items = results.items.slice(0, 8);
        return results;
    }

    // ── Рендер результатов ──

    var ATTR_LABELS = { strength: 'Сила', agility: 'Ловкость', intelligence: 'Разум' };
    var ATTR_COLORS = { strength: '#ff5555', agility: '#55ff55', intelligence: '#55aaff' };

    function highlightMatch(text, query) {
        if (!query) return text;
        var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        return text.replace(re, '<mark>$1</mark>');
    }

    function formatCost(cost) {
        if (!cost) return '';
        return cost.toLocaleString('ru-RU') + ' зол.';
    }

    function renderResults(results, query) {
        if (!resultsContainer) return;

        if (results.heroes.length === 0 && results.items.length === 0) {
            resultsContainer.innerHTML = '<div class="gs-empty">Ничего не найдено</div>';
            return;
        }

        resultsContainer.innerHTML = '';

        if (results.heroes.length > 0) {
            var group = document.createElement('div');
            group.className = 'gs-group';
            group.innerHTML = '<div class="gs-group-title"><i class="fas fa-users"></i> Герои</div>';
            results.heroes.forEach(function(h) {
                var row = document.createElement('div');
                row.className = 'gs-result gs-hero-result';
                row.setAttribute('data-hero-id', h.heroId);
                var attrColor = ATTR_COLORS[h.attr] || '#8aa0c0';
                var attrLabel = ATTR_LABELS[h.attr] || h.attr;
                row.innerHTML =
                    '<span class="gs-result-name">' + highlightMatch(h.name, query) + '</span>'
                    + '<span class="gs-result-sub" style="color:' + attrColor + '">' + attrLabel + '</span>'
                    + '<span class="gs-result-sub">' + h.roleName + '</span>';
                row.addEventListener('click', (function(heroId) {
                    return function() {
                        closeSearch();
                        var prefix = isOnHeroesDir() ? '' : 'heroes/';
                        location.href = prefix + heroId + '.html';
                    };
                })(h.heroId));
                group.appendChild(row);
            });
            resultsContainer.appendChild(group);
        }

        if (results.items.length > 0) {
            var group = document.createElement('div');
            group.className = 'gs-group';
            group.innerHTML = '<div class="gs-group-title"><i class="fas fa-flask"></i> Предметы</div>';
            results.items.forEach(function(item) {
                var row = document.createElement('div');
                row.className = 'gs-result gs-item-result';
                row.setAttribute('data-item-id', item.id);
                row.innerHTML =
                    '<span class="gs-result-name">' + highlightMatch(item.name, query) + '</span>'
                    + '<span class="gs-result-sub">' + formatCost(item.cost) + '</span>';
                row.addEventListener('click', (function(itemId) {
                    return function() {
                        closeSearch();
                        if (isOnItemsPage() && typeof openItemDetail === 'function') {
                            // Уже на странице предметов — открываем напрямую
                            openItemDetail(itemId);
                            if (typeof isItemMobileSurface === 'function' && !isItemMobileSurface()) {
                                var panel = document.getElementById('itemDetailPanel');
                                if (panel) panel.scrollIntoView({ behavior: 'smooth' });
                            }
                        } else {
                            // С другой страницы — переходим на items.html
                            var prefix = isOnHeroesDir() ? '../' : '';
                            location.href = prefix + 'items.html?item=' + itemId;
                        }
                    };
                })(item.id));
                group.appendChild(row);
            });
            resultsContainer.appendChild(group);
        }
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

        searchInput.addEventListener('input', function() {
            var q = searchInput.value.trim();
            if (q.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }
            var results = search(q);
            renderResults(results, q);
        });

        searchOverlay.querySelector('.gs-close').addEventListener('click', function(e) {
            e.stopPropagation();
            closeSearch();
        });

        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) closeSearch();
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSearch();
        });
    }

    function openSearch() {
        createOverlay();
        indexBuilt = false;
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

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    });

    window.GlobalSearch = {
        open: openSearch,
        close: closeSearch
    };

})();
