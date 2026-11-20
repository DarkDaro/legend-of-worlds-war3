/**
 * tilt-cards.js — 3D tilt + glare на hero-card при наведении
 */
(function() {
    'use strict';
    var MAX_TILT = 8;
    var MOBILE_BREAKPOINT = 768;

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT || !window.matchMedia('(hover: hover)').matches;
    }

    function initTilt() {
        if (isMobile()) return;
        var cards = document.querySelectorAll('.hero-card');
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if (card.querySelector('.tilt-glare')) continue;
            var glare = document.createElement('div');
            glare.className = 'tilt-glare';
            card.appendChild(glare);
            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
        }
    }

    function onMove(e) {
        var card = e.currentTarget;
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var tiltX = (0.5 - y) * MAX_TILT;
        var tiltY = (x - 0.5) * MAX_TILT;
        card.style.setProperty('--tilt-x', tiltX.toFixed(1) + 'deg');
        card.style.setProperty('--tilt-y', tiltY.toFixed(1) + 'deg');
        card.style.setProperty('--glare-x', (x * 100).toFixed(0) + '%');
        card.style.setProperty('--glare-y', (y * 100).toFixed(0) + '%');
        card.classList.add('tilt-active');
    }

    function onLeave(e) {
        var card = e.currentTarget;
        card.classList.remove('tilt-active');
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTilt);
    } else {
        initTilt();
    }
})();
