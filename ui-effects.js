/**
 * ui-effects.js — ripple, page transition, cursor glow, scroll progress
 */
(function() {
    'use strict';

    // ── Ripple при клике ──
    document.addEventListener('pointerdown', function(e) {
        if (e.pointerType === 'touch') return;
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
    if (window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

})();
