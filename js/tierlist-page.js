(function() {
        'use strict';

        var TIERS = [
            { key: 'sp', label: 'S+', cssClass: 'tier-sp' },
            { key: 's', label: 'S', cssClass: 'tier-s' },
            { key: 'a', label: 'A', cssClass: 'tier-a' },
            { key: 'b', label: 'B', cssClass: 'tier-b' },
            { key: 'c', label: 'C', cssClass: 'tier-c' },
            { key: 'd', label: 'D', cssClass: 'tier-d' },
            { key: 'e', label: 'E', cssClass: 'tier-e' },
            { key: 'f', label: 'F', cssClass: 'tier-f' }
        ];

        var STORAGE_KEY = 'loW_tierlist';
        var tierData = { sp: [], s: [], a: [], b: [], c: [], d: [], e: [], f: [] };
        var selectedHero = null; // heroId для click-to-place
        var activeFilter = 'all';

        // ── Утилиты ──

        function toast(msg) {
            var el = document.getElementById('tlToast');
            el.textContent = msg;
            el.classList.add('visible');
            clearTimeout(el._t);
            el._t = setTimeout(function() { el.classList.remove('visible'); }, 2000);
        }

        function save() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tierData));
        }

        function load() {
            try {
                var d = JSON.parse(localStorage.getItem(STORAGE_KEY));
                if (!d) return;
                // Миграция: старый формат без sp/f
                if (!Array.isArray(d.sp)) d.sp = [];
                if (!Array.isArray(d.e)) d.e = [];
                if (!Array.isArray(d.f)) d.f = [];
                if (Array.isArray(d.s) && Array.isArray(d.a) && Array.isArray(d.b) && Array.isArray(d.c) && Array.isArray(d.d)) {
                    tierData = d;
                }
            } catch(e) {}
        }

        function isValidHero(id) {
            var hero = HEROES_DATA.find(function(h) { return h.heroId === id; });
            return hero && !hero.isAltForm && !hero.wip && !hero.unique;
        }

        function loadFromURL() {
            var params = new URLSearchParams(window.location.search);
            var loaded = false;
            TIERS.forEach(function(t) {
                var val = params.get(t.key);
                if (val) {
                    tierData[t.key] = val.split(',').filter(isValidHero);
                    loaded = true;
                }
            });
            if (loaded) {
                save();
                // Убрать параметры из URL
                window.history.replaceState({}, '', 'tierlist.html');
            }
        }

        function buildShareURL() {
            var params = [];
            TIERS.forEach(function(t) {
                if (tierData[t.key].length > 0) {
                    params.push(t.key + '=' + tierData[t.key].join(','));
                }
            });
            if (params.length === 0) return null;
            var base = window.location.href.split('?')[0].split('#')[0];
            return base + '?' + params.join('&');
        }

        // ── Рендер ──

        function getAssignedHeroes() {
            var assigned = {};
            TIERS.forEach(function(t) {
                tierData[t.key].forEach(function(id) { assigned[id] = t.key; });
            });
            return assigned;
        }

        function renderHeroCard(hero) {
            var div = document.createElement('div');
            div.className = 'tl-hero';
            div.draggable = true;
            div.dataset.heroId = hero.heroId;

            var attrBar = document.createElement('div');
            attrBar.className = 'tl-hero-attr ' + hero.attr;
            div.appendChild(attrBar);

            var img = document.createElement('img');
            img.src = 'images/heroes/' + hero.image + '.png';
            img.alt = hero.name;
            img.loading = 'lazy';
            div.appendChild(img);

            var name = document.createElement('span');
            name.className = 'tl-hero-name';
            name.textContent = hero.name;
            div.appendChild(name);

            // Drag events
            div.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', hero.heroId);
                div.classList.add('dragging');
            });
            div.addEventListener('dragend', function() {
                div.classList.remove('dragging');
                clearDragOver();
            });

            // Click-to-select
            div.addEventListener('click', function() {
                if (selectedHero === hero.heroId) {
                    selectedHero = null;
                } else {
                    selectedHero = hero.heroId;
                }
                render();
            });

            // Двойной клик — страница героя
            div.addEventListener('dblclick', function() {
                window.open('heroes/' + hero.heroId + '.html', '_blank');
            });

            if (selectedHero === hero.heroId) {
                div.classList.add('selected');
            }

            return div;
        }

        function renderTiers() {
            var container = document.getElementById('tlTiers');
            container.innerHTML = '';

            TIERS.forEach(function(t) {
                var row = document.createElement('div');
                row.className = 'tl-tier';
                row.dataset.tier = t.key;

                var label = document.createElement('div');
                label.className = 'tl-tier-label ' + t.cssClass;
                label.textContent = t.label;
                var count = document.createElement('span');
                count.className = 'tl-tier-count';
                count.textContent = tierData[t.key].length;
                label.appendChild(count);
                row.appendChild(label);

                var slots = document.createElement('div');
                slots.className = 'tl-tier-slots';
                slots.dataset.tier = t.key;

                tierData[t.key].forEach(function(heroId) {
                    var hero = HEROES_DATA.find(function(h) { return h.heroId === heroId; });
                    if (hero && !hero.isAltForm && !hero.wip && !hero.unique) {
                        if (activeFilter !== 'all' && hero.attr !== activeFilter) return;
                        slots.appendChild(renderHeroCard(hero));
                    }
                });

                // Drop events
                slots.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    slots.classList.add('drag-over');
                });
                slots.addEventListener('dragleave', function() {
                    slots.classList.remove('drag-over');
                });
                slots.addEventListener('drop', function(e) {
                    e.preventDefault();
                    slots.classList.remove('drag-over');
                    var heroId = e.dataTransfer.getData('text/plain');
                    moveToTier(heroId, t.key);
                });

                // Click-to-place
                slots.addEventListener('click', function(e) {
                    if (e.target.closest('.tl-hero')) return; // клик по герою — выделение
                    if (selectedHero) {
                        moveToTier(selectedHero, t.key);
                        selectedHero = null;
                    }
                });

                row.appendChild(slots);
                container.appendChild(row);
            });
        }

        function renderPool() {
            var pool = document.getElementById('tlPool');
            pool.innerHTML = '';

            var assigned = getAssignedHeroes();
            var unassigned = HEROES_DATA.filter(function(h) {
                return !assigned[h.heroId] && !h.isAltForm && !h.wip && !h.unique;
            });

            if (activeFilter !== 'all') {
                unassigned = unassigned.filter(function(h) { return h.attr === activeFilter; });
            }

            if (unassigned.length === 0) {
                pool.innerHTML = '<span class="tl-pool-empty">Все герои распределены</span>';
                return;
            }

            unassigned.forEach(function(hero) {
                pool.appendChild(renderHeroCard(hero));
            });
        }

        function clearDragOver() {
            document.querySelectorAll('.drag-over').forEach(function(el) {
                el.classList.remove('drag-over');
            });
        }

        function render() {
            renderTiers();
            renderPool();
        }

        // ── Действия ──

        function moveToTier(heroId, tierKey) {
            // Убрать из текущего тира
            TIERS.forEach(function(t) {
                var idx = tierData[t.key].indexOf(heroId);
                if (idx !== -1) tierData[t.key].splice(idx, 1);
            });
            // Добавить в новый
            tierData[tierKey].push(heroId);
            save();
            render();
        }

        function removeFromTier(heroId) {
            TIERS.forEach(function(t) {
                var idx = tierData[t.key].indexOf(heroId);
                if (idx !== -1) tierData[t.key].splice(idx, 1);
            });
            save();
            render();
        }

        // ── Инициализация ──

        document.addEventListener('DOMContentLoaded', function() {
            if (typeof HEROES_DATA === 'undefined') return;

            load();
            loadFromURL();
            render();

            // Drop events на пул — один раз
            var pool = document.getElementById('tlPool');
            pool.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                pool.classList.add('drag-over');
            });
            pool.addEventListener('dragleave', function() {
                pool.classList.remove('drag-over');
            });
            pool.addEventListener('drop', function(e) {
                e.preventDefault();
                pool.classList.remove('drag-over');
                var heroId = e.dataTransfer.getData('text/plain');
                removeFromTier(heroId);
            });
            // Click-to-place в пул (вернуть героя)
            pool.addEventListener('click', function(e) {
                if (e.target.closest('.tl-hero')) return;
                if (selectedHero) {
                    removeFromTier(selectedHero);
                    selectedHero = null;
                }
            });

            // Поделиться
            document.getElementById('tlShareBtn').addEventListener('click', function() {
                var url = buildShareURL();
                if (!url) {
                    toast('Сначала распределите героев');
                    return;
                }
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(function() {
                        toast('Ссылка скопирована');
                    });
                } else {
                    var ta = document.createElement('textarea');
                    ta.value = url;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    toast('Ссылка скопирована');
                }
            });

            // Очистить
            document.getElementById('tlClearBtn').addEventListener('click', function() {
                if (!confirm('Очистить весь тирлист?')) return;
                tierData = { sp: [], s: [], a: [], b: [], c: [], d: [], e: [], f: [] };
                selectedHero = null;
                save();
                render();
                toast('Тирлист очищен');
            });

            // Фильтр по атрибуту
            document.querySelectorAll('.tl-filter-btns button').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.tl-filter-btns button').forEach(function(b) {
                        b.classList.remove('active');
                    });
                    btn.classList.add('active');
                    activeFilter = btn.dataset.filter;
                    render();
                });
            });
        });

    })();
