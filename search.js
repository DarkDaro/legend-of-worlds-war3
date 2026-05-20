/**
 * search.js — Глобальный поиск по героям и предметам (Ctrl+K)
 */
(function() {
    'use strict';

    var searchOverlay = null;
    var globalSearchInput = null;
    var resultsContainer = null;
    var indexBuilt = false;
    var index = { heroes: [], items: [], abilities: [], mechanics: [], bosses: [], modes: [] };

    function isOnItemsPage() {
        return location.pathname.indexOf('/items.html') !== -1 || location.pathname.endsWith('/items.html');
    }

    function isOnHeroesDir() {
        return location.pathname.indexOf('/heroes/') !== -1;
    }

    // ── Построение индекса (при первом запросе) ──

    function buildIndex() {
        index = { heroes: [], items: [], abilities: [], mechanics: [], bosses: [], modes: [] };

        if (typeof HEROES_DATA !== 'undefined' && Array.isArray(HEROES_DATA)) {
            HEROES_DATA.forEach(function(h) {
                index.heroes.push({
                    name: h.name,
                    title: h.title || '',
                    attr: h.attr || '',
                    roleName: h.roleName || '',
                    heroId: h.heroId,
                    searchText: (h.heroId + ' ' + h.name + ' ' + (h.title || '') + ' ' + (h.roleName || '')).toLowerCase()
                });
            });
        }

        if (typeof itemsDB !== 'undefined' && typeof itemsDB === 'object') {
            Object.keys(itemsDB).forEach(function(key) {
                var item = itemsDB[key];
                if (!item || !item.name) return;
                if (item.hidden || item.type === 'rune') return;
                index.items.push({
                    name: item.name,
                    type: item.type || '',
                    cost: item.cost || 0,
                    id: item.id,
                    searchText: (
                        item.id + ' ' +
                        item.name + ' ' +
                        (item.type || '') + ' ' +
                        (item.description || '') + ' ' +
                        (item.activeAbility && item.activeAbility.name ? item.activeAbility.name : '') + ' ' +
                        (item.activeAbility && item.activeAbility.description ? item.activeAbility.description : '')
                    ).toLowerCase()
                });
            });
        }

        // Автогенерируемый индекс (search-index.js)
        if (typeof SEARCH_INDEX !== 'undefined') {
            if (SEARCH_INDEX.abilities) {
                SEARCH_INDEX.abilities.forEach(function(a) {
                    index.abilities.push({
                        name: a.name,
                        heroId: a.heroId,
                        heroName: a.heroName,
                        searchText: (a.name + ' ' + a.heroName).toLowerCase()
                    });
                });
            }
            if (SEARCH_INDEX.mechanics) {
                SEARCH_INDEX.mechanics.forEach(function(m) {
                    index.mechanics.push({
                        name: m.name,
                        desc: m.desc || '',
                        page: m.page,
                        searchText: (m.name + ' ' + (m.desc || '')).toLowerCase()
                    });
                });
            }
            if (SEARCH_INDEX.bosses) {
                SEARCH_INDEX.bosses.forEach(function(b) {
                    index.bosses.push({
                        name: b.name,
                        page: b.page,
                        searchText: b.name.toLowerCase()
                    });
                });
            }
            if (SEARCH_INDEX.modes) {
                SEARCH_INDEX.modes.forEach(function(m) {
                    index.modes.push({
                        name: m.name,
                        desc: m.desc || '',
                        page: m.page,
                        searchText: (m.name + ' ' + (m.desc || '')).toLowerCase()
                    });
                });
            }
        }

        indexBuilt = true;
    }

    // ── Поиск ──

    function search(query) {
        if (!indexBuilt) buildIndex();
        var q = query.toLowerCase().trim();
        if (!q) return { heroes: [], items: [], abilities: [], mechanics: [], bosses: [], modes: [] };

        var results = { heroes: [], items: [], abilities: [], mechanics: [], bosses: [], modes: [] };
        index.heroes.forEach(function(h) {
            if (h.searchText.indexOf(q) !== -1) results.heroes.push(h);
        });
        index.items.forEach(function(item) {
            if (item.searchText.indexOf(q) !== -1) results.items.push(item);
        });
        index.abilities.forEach(function(a) {
            if (a.searchText.indexOf(q) !== -1) results.abilities.push(a);
        });
        index.mechanics.forEach(function(m) {
            if (m.searchText.indexOf(q) !== -1) results.mechanics.push(m);
        });
        index.bosses.forEach(function(b) {
            if (b.searchText.indexOf(q) !== -1) results.bosses.push(b);
        });
        index.modes.forEach(function(m) {
            if (m.searchText.indexOf(q) !== -1) results.modes.push(m);
        });
        results.heroes = results.heroes.slice(0, 5);
        results.items = results.items.slice(0, 5);
        results.abilities = results.abilities.slice(0, 5);
        results.mechanics = results.mechanics.slice(0, 5);
        results.bosses = results.bosses.slice(0, 5);
        results.modes = results.modes.slice(0, 5);
        return results;
    }

    // ── Отрисовка результатов ──

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

        var hasResults = results.heroes.length || results.items.length
            || results.abilities.length || results.mechanics.length
            || results.bosses.length || results.modes.length;

        if (!hasResults) {
            resultsContainer.innerHTML = '<div class="gs-empty">Ничего не найдено</div>';
            return;
        }

        resultsContainer.innerHTML = '';
        var prefix = isOnHeroesDir() ? '../' : '';

        // Герои
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
                        var p = isOnHeroesDir() ? '' : 'heroes/';
                        location.href = p + heroId + '.html';
                    };
                })(h.heroId));
                group.appendChild(row);
            });
            resultsContainer.appendChild(group);
        }

        // Способности
        if (results.abilities.length > 0) {
            var group = document.createElement('div');
            group.className = 'gs-group';
            group.innerHTML = '<div class="gs-group-title"><i class="fas fa-magic"></i> Способности</div>';
            results.abilities.forEach(function(a) {
                var row = document.createElement('div');
                row.className = 'gs-result gs-ability-result';
                row.innerHTML =
                    '<span class="gs-result-name">' + highlightMatch(a.name, query) + '</span>'
                    + '<span class="gs-result-sub">' + a.heroName + '</span>';
                row.addEventListener('click', (function(heroId) {
                    return function() {
                        closeSearch();
                        var p = isOnHeroesDir() ? '' : 'heroes/';
                        location.href = p + heroId + '.html';
                    };
                })(a.heroId));
                group.appendChild(row);
            });
            resultsContainer.appendChild(group);
        }

        // Предметы
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
                            openItemDetail(itemId);
                            if (typeof isItemMobileSurface === 'function' && !isItemMobileSurface()) {
                                var panel = document.getElementById('itemDetailPanel');
                                if (panel) panel.scrollIntoView({ behavior: 'smooth' });
                            }
                        } else {
                            location.href = prefix + 'items.html?item=' + itemId;
                        }
                    };
                })(item.id));
                group.appendChild(row);
            });
            resultsContainer.appendChild(group);
        }

        // Механики
        if (results.mechanics.length > 0) {
            var group = document.createElement('div');
            group.className = 'gs-group';
            group.innerHTML = '<div class="gs-group-title"><i class="fas fa-cogs"></i> Механики</div>';
            results.mechanics.forEach(function(m) {
                var row = document.createElement('div');
                row.className = 'gs-result gs-mechanic-result';
                row.innerHTML =
                    '<span class="gs-result-name">' + highlightMatch(m.name, query) + '</span>'
                    + '<span class="gs-result-sub gs-result-desc">' + m.desc + '</span>';
                row.addEventListener('click', (function(page) {
                    return function() {
                        closeSearch();
                        location.href = prefix + page;
                    };
                })(m.page));
                group.appendChild(row);
            });
            resultsContainer.appendChild(group);
        }

        // Боссы
        if (results.bosses.length > 0) {
            var group = document.createElement('div');
            group.className = 'gs-group';
            group.innerHTML = '<div class="gs-group-title"><i class="fas fa-dragon"></i> Боссы</div>';
            results.bosses.forEach(function(b) {
                var row = document.createElement('div');
                row.className = 'gs-result gs-boss-result';
                row.innerHTML =
                    '<span class="gs-result-name">' + highlightMatch(b.name, query) + '</span>';
                row.addEventListener('click', (function(page) {
                    return function() {
                        closeSearch();
                        location.href = prefix + page;
                    };
                })(b.page));
                group.appendChild(row);
            });
            resultsContainer.appendChild(group);
        }

        // Режимы
        if (results.modes.length > 0) {
            var group = document.createElement('div');
            group.className = 'gs-group';
            group.innerHTML = '<div class="gs-group-title"><i class="fas fa-gamepad"></i> Режимы</div>';
            results.modes.forEach(function(m) {
                var row = document.createElement('div');
                row.className = 'gs-result gs-mode-result';
                row.innerHTML =
                    '<span class="gs-result-name">' + highlightMatch(m.name, query) + '</span>'
                    + '<span class="gs-result-sub gs-result-desc">' + m.desc + '</span>';
                row.addEventListener('click', (function(page) {
                    return function() {
                        closeSearch();
                        location.href = prefix + page;
                    };
                })(m.page));
                group.appendChild(row);
            });
            resultsContainer.appendChild(group);
        }
    }

    // ── Интерфейс ──

    function createOverlay() {
        if (searchOverlay) return;

        searchOverlay = document.createElement('div');
        searchOverlay.className = 'gs-overlay';
        searchOverlay.innerHTML =
            '<div class="gs-modal">'
            + '<div class="gs-input-wrap">'
            + '<i class="fas fa-search gs-search-icon"></i>'
            + '<input type="text" class="gs-input" placeholder="Поиск героев, предметов, способностей..." autocomplete="off" />'
            + '<button class="gs-close" title="Закрыть"><i class="fas fa-times"></i></button>'
            + '</div>'
            + '<div class="gs-results"></div>'
            + '</div>';

        document.body.appendChild(searchOverlay);

        globalSearchInput = searchOverlay.querySelector('.gs-input');
        resultsContainer = searchOverlay.querySelector('.gs-results');

        globalSearchInput.addEventListener('input', function() {
            var q = globalSearchInput.value.trim();
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

        globalSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSearch();
        });
    }

    function openSearch() {
        createOverlay();
        indexBuilt = false;
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        globalSearchInput.value = '';
        resultsContainer.innerHTML = '';
        setTimeout(function() { globalSearchInput.focus(); }, 50);
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
