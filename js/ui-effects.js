/**
 * ui-effects.js — ripple, page transition, cursor glow, scroll progress
 *
 * === ОТКЛЮЧЕНО 20.11 (чанк «оживление эффектов», TD-16) — вытесненная
 * реализация, НЕ УДАЛЯТЬ (правило 2.13) ===
 * Что отключено: всё тело скрипта. Четыре эффекта переезжали одной секцией
 * в js/site-settings.js — глобальный скрипт на всех 117 страницах, без
 * подключения файла на каждой.
 * Чем доказан переезд: до отключения на 114 страницах с этим файлом эффекты
 * работали ДВАЖДЫ (двойные волны .ripple, два .cursor-glow, гонка двух
 * переходов) — поймано пробой scripts/tmp/effects-probe.mjs (spawned=2,
 * glow ×2 после fx off). Старая версия беднее: полоса через width —
 * перерасчёт раскладки каждый кадр (антипаттерн TD-19), переход вешается
 * на ссылки один раз при загрузке и не ловит динамику, glow без живого
 * выключения тумблером, тумблера «Полоса прогресса» нет.
 * Как откатить: вернуть тело из блочного комментария ниже и убрать секцию
 * «эффекты интерфейса» из js/site-settings.js; строку «Полоса прогресса»
 * в панели при откате убрать — носителя у data-progress не останется.
 */
(function() {
    'use strict';

    /* ОТКЛЮЧЕНО 20.11 — тело целиком, см. шапку (правило 2.13):

    // ── Ripple при клике ──
    // при data-anim="off" ripple не создаётся: анимация его схлопывания убита,
    // и без гварда спан оставался бы в кнопке навсегда (animationend не придёт)
    document.addEventListener('pointerdown', function(e) {
        if (e.pointerType === 'touch') return;
        if (window.SiteSettings && !SiteSettings.get('anim')) return;
        var target = e.target.closest('.hero-card, .nav-link, .filter-btn, .btn-primary, .btn-secondary, .calc-link-btn, .ability-card, .item-card, .quick-link-card, .stat-box, .guide-card, .monster-card, .mechanic-card, .mode-card');
        if (!target) return;
        var rect = target.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        if (!target.classList.contains('ripple-container')) target.classList.add('ripple-container');
        target.appendChild(ripple);
        ripple.addEventListener('animationend', function() { ripple.remove(); });
    });

    // ── Page transition ──
    var transitionLinks = document.querySelectorAll('a[href]');
    for (var i = 0; i < transitionLinks.length; i++) {
        var link = transitionLinks[i];
        var href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript') || href.startsWith('mailto') || link.target === '_blank') continue;
        link.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;
            var url = this.href;
            e.preventDefault();
            document.body.classList.add('page-leaving');
            setTimeout(function() { location.href = url; }, 150);
        });
    }

    // ── Cursor glow ──
    // тяжёлый декоративный эффект: живёт только при data-fx="on"
    if (window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && (!window.SiteSettings || SiteSettings.get('fx'))) {
        var glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);
        var glowX = 0, glowY = 0, glowRaf = null;
        document.addEventListener('mousemove', function(e) {
            glowX = e.clientX;
            glowY = e.clientY;
            if (!glowRaf) {
                glowRaf = requestAnimationFrame(function() {
                    glow.style.transform = 'translate(' + (glowX - 90) + 'px, ' + (glowY - 90) + 'px)';
                    glowRaf = null;
                });
            }
        });
    }

    // ── Scroll progress bar ──
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.style.width = '0%';
    document.body.appendChild(bar);
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct.toFixed(1) + '%';
    });

    конец отключённого тела */
})();
