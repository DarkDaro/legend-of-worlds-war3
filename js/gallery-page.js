(function() {
    'use strict';

    // ===== СПИСОК ГАЛЕРЕИ — добавляй записи сюда =====
    // type: 'hero' | 'art' | 'screenshot'
    // hero: клик ведёт на страницу героя (link обязателен)
    // art / screenshot: клик открывает полноразмерный просмотр (lightbox)
    var GALLERY = [
        // --- Арты ---
        // { type: 'art', img: 'images/art/example.jpg', title: 'Название арта', desc: 'Описание' },

        // --- Скриншоты ---
        // { type: 'screenshot', img: 'images/shots/example.jpg', title: 'Скриншот', desc: 'Описание' }
    ];

    var SECTION_META = {
        hero: { title: 'Герои', icon: 'fa-users' },
        art: { title: 'Арты', icon: 'fa-palette' },
        screenshot: { title: 'Скриншоты', icon: 'fa-camera' }
    };

    var root = document.getElementById('galleryRoot');
    if (!root) return;

    // Группируем по типу
    var groups = { hero: [], art: [], screenshot: [] };
    GALLERY.forEach(function(item) {
        if (groups[item.type]) groups[item.type].push(item);
    });

    var html = '';
    ['hero', 'art', 'screenshot'].forEach(function(type) {
        var items = groups[type];
        if (!items.length) return;
        var meta = SECTION_META[type];
        html += '<section class="gallery-section">';
        html += '<h2 class="gallery-section-title"><i class="fas ' + meta.icon + '"></i> ' + meta.title + ' <span class="gallery-count">' + items.length + '</span></h2>';
        html += '<div class="gallery-grid">';
        items.forEach(function(item, idx) {
            var desc = item.desc ? '<div class="gallery-desc">' + item.desc + '</div>' : '';
            var label = item.title ? '<div class="gallery-label">' + item.title + '</div>' : '';
            if (type === 'hero' && item.link) {
                html += '<a href="' + item.link + '" class="gallery-card gallery-card-hero" aria-label="' + item.title + '">' +
                    '<div class="gallery-img-wrap"><img loading="lazy" src="' + item.img + '" alt="' + item.title + '" /></div>' +
                    label + '</a>';
            } else {
                html += '<div class="gallery-card" data-index="' + idx + '" data-type="' + type + '" role="button" tabindex="0" aria-label="' + (item.title || 'Изображение') + '">' +
                    '<div class="gallery-img-wrap"><img loading="lazy" src="' + item.img + '" alt="' + (item.title || '') + '" /></div>' +
                    label + desc + '</div>';
            }
        });
        html += '</div></section>';
    });

    if (!html) {
        html = '<div class="gallery-empty"><i class="fas fa-images"></i><p>Галерея пока пуста. Записи добавляются в gallery-page.js, массив GALLERY.</p></div>';
    }
    root.innerHTML = html;

    // ===== Lightbox для артов и скриншотов =====
    var overlay = null;

    function openLightbox(item) {
        if (overlay) { overlay.remove(); overlay = null; }
        overlay = document.createElement('div');
        overlay.className = 'gallery-lightbox';
        overlay.innerHTML =
            '<button class="gallery-lightbox-close" aria-label="Закрыть"><i class="fas fa-times"></i></button>' +
            '<figure class="gallery-lightbox-figure">' +
            '<img src="' + item.img + '" alt="' + (item.title || '') + '" />' +
            (item.title ? '<figcaption>' + item.title + (item.desc ? ' — ' + item.desc : '') + '</figcaption>' : '') +
            '</figure>';
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        function close() {
            overlay.remove();
            overlay = null;
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKey);
        }
        function onKey(e) { if (e.key === 'Escape') close(); }

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target.closest('.gallery-lightbox-close')) close();
        });
        document.addEventListener('keydown', onKey);
    }

    root.addEventListener('click', function(e) {
        var card = e.target.closest('.gallery-card');
        if (!card) return;
        var type = card.dataset.type;
        var item = groups[type] && groups[type][parseInt(card.dataset.index, 10)];
        if (item) openLightbox(item);
    });
})();