/**
 * Hero Navigation — Previous/Next hero buttons
 * Автоматически добавляет кнопки навигации на страницы героев
 * 
 * Использование: подключить на странице героя:
 * <script src="../hero-nav.js" defer></script>
 */

(function() {
    'use strict';

    var STYLE_ID = 'hero-nav-styles';
    var NAV_CLASS = 'hero-nav';

    function getCurrentHeroId() {
        var currentPath = window.location.pathname.replace(/\\/g, '/');
        var match = currentPath.match(/\/heroes\/([^\/]+)\.html$/);
        return match ? match[1] : null;
    }

    function buildMarkup(prevHero, currentHero, nextHero) {
        return (
            '<a href="' + prevHero.heroId + '.html" class="hero-nav-prev" title="Предыдущий герой">' +
                '<i class="fas fa-chevron-left"></i>' +
                '<img src="../images/heroes/' + prevHero.image + '.png" alt="' + prevHero.name + '" />' +
                '<span>' + prevHero.name + '</span>' +
            '</a>' +
            '<span class="hero-nav-current">' + currentHero.name + '</span>' +
            '<a href="' + nextHero.heroId + '.html" class="hero-nav-next" title="Следующий герой">' +
                '<span>' + nextHero.name + '</span>' +
                '<img src="../images/heroes/' + nextHero.image + '.png" alt="' + nextHero.name + '" />' +
                '<i class="fas fa-chevron-right"></i>' +
            '</a>'
        );
    }

    function ensureStyles() {
        if (document.getElementById(STYLE_ID)) return;

        var styles = document.createElement('style');
        styles.id = STYLE_ID;
        styles.textContent =
            '.' + NAV_CLASS + ' {' +
            'display:flex; align-items:center; justify-content:space-between; gap:16px;' +
            'margin:20px 0 24px; padding:12px 16px; background:#0a1628; border:1px solid #1a3a5c; border-radius:10px;' +
            '}' +
            '.' + NAV_CLASS + ' .hero-nav-prev, .' + NAV_CLASS + ' .hero-nav-next {' +
            'display:flex; align-items:center; gap:8px; padding:8px 14px; background:#0d1b2a; border:1px solid #2a5070;' +
            'border-radius:8px; color:#c0d0e0; text-decoration:none; font-size:0.9rem; transition:all .2s;' +
            '}' +
            '.' + NAV_CLASS + ' .hero-nav-prev:hover, .' + NAV_CLASS + ' .hero-nav-next:hover {' +
            'background:#1a3a5c; border-color:#00e5ff; color:#00e5ff;' +
            '}' +
            '.' + NAV_CLASS + ' .hero-nav-prev img, .' + NAV_CLASS + ' .hero-nav-next img {' +
            'width:40px; height:40px; border-radius:6px; object-fit:cover; border:1px solid #1a3a5c;' +
            '}' +
            '.' + NAV_CLASS + ' .hero-nav-current {' +
            'font-size:1rem; font-weight:600; color:#e0e8f0; text-align:center;' +
            '}' +
            '@media (max-width:600px) {' +
            '.' + NAV_CLASS + ' {padding:10px 12px; gap:8px;}' +
            '.' + NAV_CLASS + ' .hero-nav-prev img, .' + NAV_CLASS + ' .hero-nav-next img {width:32px; height:32px;}' +
            '.' + NAV_CLASS + ' .hero-nav-prev span, .' + NAV_CLASS + ' .hero-nav-next span {display:none;}' +
            '.' + NAV_CLASS + ' .hero-nav-current {font-size:0.9rem;}' +
            '}';
        document.head.appendChild(styles);
    }

    function insertNavigation() {
        var container = document.querySelector('.hero-page-container');
        if (!container) return;
        if (container.querySelector('.' + NAV_CLASS)) return;
        if (typeof HEROES_DATA === 'undefined' || !Array.isArray(HEROES_DATA) || HEROES_DATA.length < 2) return;

        var currentHeroId = getCurrentHeroId();
        if (!currentHeroId) return;

        var heroIds = HEROES_DATA.map(function(h) { return h.heroId; });
        var currentIndex = heroIds.indexOf(currentHeroId);
        if (currentIndex === -1) return;

        var prevHero = HEROES_DATA[(currentIndex - 1 + HEROES_DATA.length) % HEROES_DATA.length];
        var currentHero = HEROES_DATA[currentIndex];
        var nextHero = HEROES_DATA[(currentIndex + 1) % HEROES_DATA.length];

        ensureStyles();

        var nav = document.createElement('div');
        nav.className = NAV_CLASS;
        nav.innerHTML = buildMarkup(prevHero, currentHero, nextHero);
        container.insertBefore(nav, container.firstChild);
    }

    function init() {
        if (typeof HEROES_DATA === 'undefined') {
            setTimeout(init, 100);
            return;
        }
        insertNavigation();
    }

    init();
})();