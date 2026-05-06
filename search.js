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
    var indexBuilt = false;
    var index = { heroes: [], items: [] };

    // ── Определяем, на какой странице мы находимся ──

    function isOnItemsPage() {
        var p = location.pathname;
        return p.indexOf('/items.html') !== -1 || p.endsWith('/items.html') || p === '/items.html';
    }

    function isOnHeroesDir() {
        return location.pathname.indexOf('/heroes/') !== -1;
    }

    // ── Построение индекса (ленивое) ──

    function buildIndex() {
        index = { heroes: [], items: [] };

        // Герои
        if (typeof HEROES_DATA !== 'undefined' && Array.isArray(HEROES_DATA)) {
            HEROES_DATA.forEach(function(h) {
                var url = isOnHeroesDir()
                    ? h.heroId + '.html'
                    : 'heroes/' + h.heroId + '.html';
                index.heroes.push({
                    name: h.name,
                    title: h.title || '',
                    attr: h.attr || '',
                    roleName: h.roleName || '',
                    heroId: h.heroId,
                    url: url,
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

        indexBuilt = true;
    }

    // ── Поиск ──

    function search(query) {
        if (!indexBuilt) buildIndex();
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
                html += '<a href="' + h.url + '" class="gs-result gs-hero-link" data-hero-id="' + h.heroId + '">'
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
                html += '<a href="' + item.url + '" class="gs-result gs-item-link" data-item-id="' + item.id + '">'
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

    // ── Обработка клика по результату ──

    function handleResultClick(e) {
        // Предмет
        var itemLink = e.target.closest('.gs-item-link');
        if (itemLink) {
            var itemId = itemLink.getAttribute('data-item-id');
            if (!itemId) return;

            e.preventDefault(); // Всегда предотвращаем стандартную навигацию

            // Если мы на items.html — открываем деталь напрямую
            if (isOnItemsPage() && typeof openItemDetail === 'function') {
                closeSearch();
                openItemDetail(itemId);
                if (typeof isItemMobileSurface === 'function' && !isItemMobileSurface()) {
                    var panel = document.getElementById('itemDetailPanel');
                    if (panel) panel.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }

            // С другой страницы — навигируем программно
            closeSearch();
            var url = itemLink.getAttribute('href') || ('items.html?item=' + itemId);
            window.location.href = url;
            return;
        }

        // Герой — предотвращаем стандартную навигацию и переходим программно
        var heroLink = e.target.closest('.gs-hero-link');
        if (heroLink) {
            e.preventDefault();
            closeSearch();
            var heroUrl = heroLink.getAttribute('href');
            if (heroUrl) window.location.href = heroUrl;
            return;
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

        // Закрытие по кнопке
        searchOverlay.querySelector('.gs-close').addEventListener('click', function(e) {
            e.stopPropagation();
            closeSearch();
        });

        // Закрытие по клику на фон
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) closeSearch();
        });

        // Клик по результату — делегируем на контейнер результатов
        resultsContainer.addEventListener('click', handleResultClick);

        // Клавиши
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSearch();
        });
    }

    function openSearch() {
        createOverlay();
        // Перестраиваем индекс при каждом открытии — данные могли подгрузиться позже
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

    // Глобальный хоткей
    document.addEventListener('keydown', function(e) {
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
