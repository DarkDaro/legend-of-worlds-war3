document.addEventListener('DOMContentLoaded', function() {
        if (typeof HEROES_DATA === 'undefined') return;
        var container = document.getElementById('sitemapHeroes');
        if (!container) return;
        var html = '';
        HEROES_DATA.forEach(function(hero) {
            if (hero.wip || hero.isAltForm) return;
            var attrClass = 'attr-' + hero.attr;
            html += '<a href="heroes/' + hero.heroId + '.html" class="sitemap-hero-link ' + attrClass + '">' + hero.name + '</a>';
        });
        container.innerHTML = html;
    });
