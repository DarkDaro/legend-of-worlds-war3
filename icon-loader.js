// icon-loader.js — Универсальный загрузчик иконок + подсветка параметров
// PNG → JPG → fallback
// Автоматически добавляет классы ключевым параметрам способностей

(function() {
    // ========== ЗАГРУЗЧИК ИКОНОК ==========

    // Маппинг heroId → базовое имя файла (если отличается)
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

        const baseName = heroImageMap[heroId] || heroId;
        const fallback = detailIcon.innerHTML;

        const img = document.createElement('img');
        img.alt = heroId;
        img.src = 'images/heroes/' + baseName + '.png';
        img.onerror = function() {
            if (this.src.endsWith('.png')) {
                this.src = 'images/heroes/' + baseName + '.jpg';
            } else {
                detailIcon.innerHTML = fallback;
            }
        };
        img.onload = function() {
            detailIcon.innerHTML = '';
            detailIcon.appendChild(img);
        };
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

    // ========== INIT ==========

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initHeroDetailIcon();
            initParamHighlight();
            initScrollToTop();
        });
    } else {
        initHeroDetailIcon();
        initParamHighlight();
        initScrollToTop();
    }
})();
