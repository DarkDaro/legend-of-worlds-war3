// icon-loader.js — Загрузчик иконок, навигация, подсветка параметров
// Порядок загрузки иконок: PNG → JPG → иконка Font Awesome
// Подсвечивает ключевые параметры способностей (мана, перезарядка, урон, радиус)

(function() {
    // ========== ЗАГРУЗЧИК ИКОНОК ==========

    // Маппинг heroId → базовое имя файла (если отличается от id)
    const heroImageMap = {
        'drowranger': 'DarkRanger',
        'archmage': 'Archmage',
        'farseer': 'FarSeer'
    };

    // ========== ИКОНКА ГЕРОЯ В ДЕТАЛЬНОЙ КАРТОЧКЕ ==========

    function initHeroDetailIcon() {
        const heroId = location.pathname.split('/').pop().replace('.html', '');
        const detailIcon = document.querySelector('.detail-icon');
        if (!detailIcon || !heroId) return;

        // Если уже есть <img> внутри (например, из HTML), не заменяем
        if (detailIcon.querySelector('img')) return;

        const baseName = heroImageMap[heroId] || heroId;
        const fallback = detailIcon.innerHTML;

        // Определяем префикс пути: если страница в heroes/, нужен ../
        const prefix = location.pathname.includes('/heroes/') ? '../' : '';

        const img = document.createElement('img');
        img.alt = heroId;
        img.src = prefix + 'images/heroes/' + baseName + '.png';
        img.onerror = function() {
            if (this.src.endsWith('.png')) {
                this.src = prefix + 'images/heroes/' + baseName + '.jpg';
            } else {
                detailIcon.innerHTML = fallback;
            }
        };
        img.onload = function() {
            detailIcon.innerHTML = '';
            detailIcon.appendChild(img);
        };
    }

    // ========== ИКОНКИ СПОСОБНОСТЕЙ ==========

    function initAbilityIcons() {
        const heroId = location.pathname.split('/').pop().replace('.html', '');
        const abilityIcons = document.querySelectorAll('.ability-icon[data-ability]');
        if (!abilityIcons.length || !heroId) return;

        const prefix = location.pathname.includes('/heroes/') ? '../' : '';

        abilityIcons.forEach(function(icon) {
            if (icon.querySelector('img')) return;

            const abilityId = icon.getAttribute('data-ability');
            const fallbackName = icon.getAttribute('data-fallback') || 'image';
            const abilityCard = icon.closest('.ability-card');
            const abilityName = abilityCard ? abilityCard.querySelector('.ability-name') : null;
            const altText = abilityName ? abilityName.textContent.trim() : abilityId;
            const pngSrc = prefix + 'images/abilities/' + heroId + '_' + abilityId + '.png';
            const jpgSrc = prefix + 'images/abilities/' + heroId + '_' + abilityId + '.jpg';

            const img = document.createElement('img');
            img.alt = altText;
            img.src = pngSrc;
            img.onerror = function() {
                if (!this.dataset.jpgTried) {
                    this.dataset.jpgTried = '1';
                    this.src = jpgSrc;
                } else {
                    icon.innerHTML = '<i class="fas fa-' + fallbackName + '"></i>';
                }
            };

            icon.innerHTML = '';
            icon.appendChild(img);
        });
    }

    // ========== ПОДСВЕТКА КЛЮЧЕВЫХ ПАРАМЕТРОВ ==========

    const paramClasses = {
        'Мана':       'mana',
        'Перезарядка': 'cooldown',
        'Урон':       'damage',
        'Радиус':     'radius'
    };

    function initParamHighlight() {
        document.querySelectorAll('.param-label').forEach(function(label) {
            const text = label.textContent.trim();
            for (const [key, cls] of Object.entries(paramClasses)) {
                if (text === key || text.startsWith(key + ' ')) {
                    label.classList.add(cls);
                    break;
                }
            }
        });
    }

    // ========== ГАМБУРГЕР-МЕНЮ ==========

    function initHamburger() {
        var nav = document.querySelector('.header-nav');
        if (!nav) return;

        // Создаём кнопку-гамбургер
        var btn = document.createElement('button');
        btn.className = 'hamburger-btn';
        btn.setAttribute('aria-label', 'Меню');
        btn.innerHTML = '<span></span><span></span><span></span>';
        nav.parentNode.insertBefore(btn, nav);

        // Клик по гамбургеру
        btn.addEventListener('click', function() {
            btn.classList.toggle('open');
            nav.classList.toggle('hamburger-open');
        });

        // Клик по ссылке — закрываем меню
        nav.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                btn.classList.remove('open');
                nav.classList.remove('hamburger-open');
            });
        });

        // Клик вне меню — закрываем
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.hamburger-btn') && !e.target.closest('.header-nav')) {
                btn.classList.remove('open');
                nav.classList.remove('hamburger-open');
            }
        });
    }

    // ========== КНОПКА «НАВЕРХ» ==========

    function initScrollToTop() {
        const btn = document.createElement('button');
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        btn.title = 'Наверх';
        document.body.appendChild(btn);

        window.addEventListener('scroll', function() {
            btn.classList.toggle('visible', window.scrollY > 400);
        });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== КНОПКА ГЛОБАЛЬНОГО ПОИСКА ==========

    function initSearchTrigger() {
        var nav = document.querySelector('.header-nav');
        if (!nav) return;

        var trigger = document.createElement('button');
        trigger.className = 'gs-trigger';
        trigger.innerHTML = '<i class="fas fa-search"></i> Поиск <kbd>Ctrl+K</kbd>';
        trigger.addEventListener('click', function() {
            if (typeof GlobalSearch !== 'undefined') {
                GlobalSearch.open();
            }
        });

        // Вставляем первым элементом навигации
        nav.insertBefore(trigger, nav.firstChild);
    }

    // ========== INIT ==========

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initHeroDetailIcon();
            initAbilityIcons();
            initParamHighlight();
            initHamburger();
            initScrollToTop();
            initSearchTrigger();
        });
    } else {
        initHeroDetailIcon();
        initAbilityIcons();
        initParamHighlight();
        initHamburger();
        initScrollToTop();
        initSearchTrigger();
    }
})();
