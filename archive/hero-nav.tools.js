/**
 * Навигация "Предыдущий/Следующий герой" для страниц героев
 * Автоматически определяет текущего героя из URL и добавляет кнопки навигации
 */

(function() {
    // Определяем текущего героя из URL
    // URL вида: /heroes/paladin.html или heroes\paladin.html
    var path = window.location.pathname;
    var match = path.match(/heroes[/\\]([^/\\]+)\.html$/);
    
    if (!match) return; // Не страница героя
    
    var currentHeroId = match[1];
    
    // Проверяем наличие данных героев
    if (typeof HEROES_DATA === 'undefined' || !Array.isArray(HEROES_DATA)) {
        console.warn('hero-nav.js: HEROES_DATA не найден');
        return;
    }
    
    // Находим индекс текущего героя
    var currentIndex = HEROES_DATA.findIndex(function(h) {
        return h.heroId === currentHeroId;
    });
    
    if (currentIndex === -1) {
        console.warn('hero-nav.js: герой ' + currentHeroId + ' не найден в HEROES_DATA');
        return;
    }
    
    // Определяем предыдущего и следующего героя (с зацикливанием)
    var prevIndex = (currentIndex - 1 + HEROES_DATA.length) % HEROES_DATA.length;
    var nextIndex = (currentIndex + 1) % HEROES_DATA.length;
    
    var prevHero = HEROES_DATA[prevIndex];
    var nextHero = HEROES_DATA[nextIndex];
    
    // Создаём HTML навигации
    function createNavHTML() {
        var nav = document.createElement('div');
        nav.className = 'hero-nav';
        nav.innerHTML = 
            '<a href="' + prevHero.heroId + '.html" class="hero-nav-prev" title="Предыдущий герой">' +
                '<i class="fas fa-chevron-left"></i>' +
                '<span class="hero-nav-name">' + prevHero.name + '</span>' +
            '</a>' +
            '<span class="hero-nav-current">' + HEROES_DATA[currentIndex].name + '</span>' +
            '<a href="' + nextHero.heroId + '.html" class="hero-nav-next" title="Следующий герой">' +
                '<span class="hero-nav-name">' + nextHero.name + '</span>' +
                '<i class="fas fa-chevron-right"></i>' +
            '</a>';
        return nav;
    }
    
    // Добавляем стили
    function addStyles() {
        if (document.getElementById('hero-nav-styles')) return;
        
        var styles = document.createElement('style');
        styles.id = 'hero-nav-styles';
        styles.textContent = 
            '.hero-nav {\n' +
            '    display: flex;\n' +
            '    align-items: center;\n' +
            '    justify-content: space-between;\n' +
            '    gap: 16px;\n' +
            '    margin: 20px 0 24px;\n' +
            '    padding: 12px 16px;\n' +
            '    background: #0a1628;\n' +
            '    border: 1px solid #1a3a5c;\n' +
            '    border-radius: 10px;\n' +
            '}\n' +
            '.hero-nav-prev, .hero-nav-next {\n' +
            '    display: flex;\n' +
            '    align-items: center;\n' +
            '    gap: 8px;\n' +
            '    padding: 8px 14px;\n' +
            '    background: #0d1b2a;\n' +
            '    border: 1px solid #2a5070;\n' +
            '    border-radius: 8px;\n' +
            '    color: #c0d0e0;\n' +
            '    text-decoration: none;\n' +
            '    font-size: 0.9rem;\n' +
            '    transition: all 0.2s;\n' +
            '}\n' +
            '.hero-nav-prev:hover, .hero-nav-next:hover {\n' +
            '    background: #1a3a5c;\n' +
            '    border-color: #00e5ff;\n' +
            '    color: #00e5ff;\n' +
            '}\n' +
            '.hero-nav-name {\n' +
            '    max-width: 120px;\n' +
            '    overflow: hidden;\n' +
            '    text-overflow: ellipsis;\n' +
            '    white-space: nowrap;\n' +
            '}\n' +
            '.hero-nav-current {\n' +
            '    font-size: 1rem;\n' +
            '    font-weight: 600;\n' +
            '    color: #e0e8f0;\n' +
            '    text-align: center;\n' +
            '}\n' +
            '@media (max-width: 600px) {\n' +
            '    .hero-nav { padding: 10px 12px; gap: 8px; }\n' +
            '    .hero-nav-name { display: none; }\n' +
            '    .hero-nav-prev, .hero-nav-next { padding: 10px; }\n' +
            '    .hero-nav-current { font-size: 0.9rem; }\n' +
            '}\n';
        document.head.appendChild(styles);
    }
    
    // Вставляем навигацию в страницу
    function insertNavigation() {
        var container = document.querySelector('.hero-page-container');
        if (!container) {
            console.warn('hero-nav.js: .hero-page-container не найден');
            return;
        }
        
        // Добавляем стили
        addStyles();
        
        // Создаём и вставляем навигацию в начало контейнера
        var nav = createNavHTML();
        container.insertBefore(nav, container.firstChild);
    }
    
    // Запускаем
    insertNavigation();
})();
