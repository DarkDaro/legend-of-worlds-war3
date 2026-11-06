document.addEventListener('DOMContentLoaded', function() {
        // ========== БАЗА ГЕРОЕВ ==========
        // Данные загружены из hero-data.js (глобальная переменная HEROES_DATA)
            if (typeof HEROES_DATA === 'undefined') {
                console.error('hero-data.js not loaded — HEROES_DATA undefined');
                return;
            }
            const heroesData = HEROES_DATA;

            const heroGrid = document.getElementById('heroGrid');
            const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
            let currentFilter = 'all';
            let sortAlphabet = false;

            // Избранное
            let favorites = JSON.parse(localStorage.getItem('heroFavorites') || '[]');

            function saveFavorites() {
                localStorage.setItem('heroFavorites', JSON.stringify(favorites));
                updateClearBtn();
            }

            function updateClearBtn() {
                var btn = document.getElementById('clearFavBtn');
                if (btn) btn.style.display = favorites.length > 0 ? '' : 'none';
            }

            window.clearHeroFavorites = function() {
                if (!confirm('Очистить список избранного?')) return;
                favorites = [];
                saveFavorites();
                document.querySelectorAll('.hero-fav-btn i').forEach(function(icon) {
                    icon.className = 'far fa-heart';
                });
                if (currentFilter === 'favorites') {
                    currentFilter = 'all';
                    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
                    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
                }
                applyFilters();
            };

            function toggleFavorite(heroId) {
                if (favorites.includes(heroId)) {
                    favorites = favorites.filter(id => id !== heroId);
                } else {
                    favorites.push(heroId);
                }
                saveFavorites();
                // Обновляем иконку сердца без пересоздания DOM
                const card = document.querySelector(`.hero-card[data-hero="${heroId}"]`);
                if (card) {
                    const icon = card.querySelector('.hero-fav-btn i');
                    if (icon) {
                        icon.className = favorites.includes(heroId) ? 'fas fa-heart' : 'far fa-heart';
                    }
                }
                // Перефильтровываем с учётом текущей вкладки
                applyFilters();
            }

            // Роли и их иконки
            const roleIcons = {
                tank: '<i class="fas fa-shield-alt"></i>',
                bruiser: '<i class="fas fa-fist-raised"></i>',
                damager: '<i class="fas fa-crosshairs"></i>',
                assassin: '<i class="fas fa-user-ninja"></i>',
                initiator: '<i class="fas fa-bolt"></i>',
                controller: '<i class="fas fa-snowflake"></i>',
                healer: '<i class="fas fa-heart"></i>',
                support: '<i class="fas fa-hands-helping"></i>'
            };

            // Функция создания карточки героя
            function createHeroCard(hero) {
                const card = document.createElement('div');
                card.className = `hero-card ${hero.attr}`;
                card.dataset.hero = hero.heroId;
                card.dataset.attr = hero.attr;

                const pngSrc = `images/heroes/${hero.image}.png`;
                const jpgSrc = `images/heroes/${hero.image}.jpg`;
                const iconHtml = `<img loading="lazy" src="${pngSrc}" alt="${hero.name}" style="max-width:100%;max-height:100%;object-fit:contain;image-rendering:pixelated;" onerror="if(this.src.endsWith('.png')){this.src='${jpgSrc}';}else{this.style.display='none';this.parentElement.classList.add('no-icon');}">`;

                card.innerHTML = `
                    <div class="hero-fav-btn" title="В избранное">
                        <i class="${favorites.includes(hero.heroId) ? 'fas' : 'far'} fa-heart"></i>
                    </div>
                    <div class="hero-image">${iconHtml}</div>
                    ${hero.unique ? '<span class="unique-badge"><i class="fas fa-star"></i></span>' : ''}
                    ${hero.wip ? '<span class="wip-badge"><i class="fas fa-hammer"></i> В разработке</span>' : ''}
                    <div class="hero-name">${hero.name}</div>
                    <div class="hero-title">${hero.title}</div>
                    <div class="hero-role role-${hero.roles[0]}">${roleIcons[hero.roles[0]] || ''} ${hero.roleNames.join(', ')}</div>
                    <span class="hero-attr-badge">${getAttrName(hero.attr)}</span>
                `;

                card.querySelector('.hero-fav-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(hero.heroId);
                });

                card.addEventListener('click', () => {
                    if (hero.wip) return;
                    window.location.href = 'heroes/' + hero.heroId + '.html';
                });

                return card;
            }

            function getAttrName(attr) {
                const names = { strength: 'Сила', agility: 'Ловкость', intelligence: 'Разум' };
                return names[attr] || attr;
            }

            // Рендер всех героев
            function renderHeroes() {
                heroGrid.innerHTML = '';
                var list = sortAlphabet ? sortHeroesByName(heroesData) : heroesData;
                list.forEach(hero => {
                    const card = createHeroCard(hero);
                    heroGrid.appendChild(card);
                });
                applyFilters();
            }

            // Сортировка по алфавиту
            var sortBtn = document.getElementById('sortAlphaBtn');
            sortBtn.addEventListener('click', function() {
                sortAlphabet = !sortAlphabet;
                sortBtn.classList.toggle('active', sortAlphabet);
                sortBtn.innerHTML = sortAlphabet
                    ? '<i class="fas fa-sort-alpha-up"></i> А-Я'
                    : '<i class="fas fa-sort-alpha-down"></i> А-Я';
                renderHeroes();
            });

            // Единая функция фильтрации (фильтр + поиск)
            function applyFilters() {
                const query = searchInput.value.toLowerCase().trim();
                const cards = document.querySelectorAll('.hero-card');
                cards.forEach((card) => {
                    const heroId = card.dataset.hero;
                    const hero = heroesData.find(h => h.heroId === heroId);
                    let filterOk = (currentFilter === 'all' && !hero.unique && !hero.isAltForm && !hero.wip)
                        || (currentFilter === 'unique' && hero.unique)
                        || (currentFilter === 'wip' && hero.wip)
                        || (hero.attr === currentFilter && !hero.unique && !hero.isAltForm && !hero.wip);
                    if (currentFilter === 'favorites') {
                        filterOk = favorites.includes(hero.heroId) && !hero.wip;
                    }
                    const name = hero.name.toLowerCase();
                    const title = hero.title.toLowerCase();
                    const searchOk = !query || name.includes(query) || title.includes(query);
                    card.style.display = (filterOk && searchOk) ? '' : 'none';
                });
                updateCount();
            }

            // Фильтрация по кнопке
            function filterHeroes(filterValue) {
                currentFilter = filterValue;
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.filter === filterValue) {
                        btn.classList.add('active');
                    }
                });
                applyFilters();
            }

            // Обработчики фильтров
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => filterHeroes(btn.dataset.filter));
            });

            // Счётчик героев
            function updateCount() {
                const visible = [...document.querySelectorAll('.hero-card')].filter(c => c.style.display !== 'none').length;
                const total = heroesData.filter(h => !h.wip && !h.isAltForm).length;
                document.getElementById('heroCount').innerHTML =
                    '<i class="fas fa-filter"></i> Показано: ' + visible + ' из ' + total;
            }

            // Поиск (комбинируется с текущим фильтром)
            const searchInput = document.getElementById('heroSearch');
            searchInput.addEventListener('input', function() {
                applyFilters();
            });

            // Escape = очистка
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    this.value = '';
                    applyFilters();
                }
            });

            // Первоначальный рендер
            renderHeroes();
            updateClearBtn();

            // Функция для добавления нового героя (можно вызывать из консоли)
            window.addHero = function(heroData) {
                heroesData.push(heroData);
                renderHeroes();
                console.log(`Герой ${heroData.name} добавлен!`);
            };
        });

// Scroll-reveal — карточки героев
    document.addEventListener('DOMContentLoaded', function() { if (typeof revealElements === 'function') revealElements('.hero-card'); });
