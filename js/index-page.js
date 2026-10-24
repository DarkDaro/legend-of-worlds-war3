// Counter-анимация чисел при появлении stat-box
    // Анимация счётчиков на главной
    // 24.10: в HTML уже стоит конечное число — если JS не загрузится, видно правду, а не 0.
    // Анимация стартует ТОЛЬКО когда блок реально в кадре (threshold 0.6),
    // до этого числа не трогаются — иначе при частичном появлении видно "73" вместо "74".
    (function() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        if (!counters.length) return;

        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        // не запускать анимацию, если блок уже полностью в кадре при загрузке
        let animated = false;
        const start = () => {
            if (animated) return;
            animated = true;
            counters.forEach(el => {
                const target = parseInt(el.dataset.target);
                if (!Number.isFinite(target)) return;
                const suffix = target >= 10 ? '+' : '';
                const duration = 1000;
                const t0 = performance.now();
                function update(now) {
                    const progress = Math.min((now - t0) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(target * eased) + (progress >= 1 ? suffix : '');
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            });
        };

        // если блок уже виден целиком — числа остаются как есть (без мигания нулями)
        const rect = statsSection.getBoundingClientRect();
        const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (fullyVisible) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio >= 0.6) {
                    start();
                    observer.disconnect();
                }
            });
        }, { threshold: [0.6] });

        observer.observe(statsSection);
    })();

    // Scroll-reveal — карточки и CTA
    document.addEventListener('DOMContentLoaded', function() { if (typeof revealElements === 'function') revealElements('.quick-link-card, .version-card-mini, .cta-section'); });
