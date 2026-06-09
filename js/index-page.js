// Counter-анимация чисел при появлении stat-box
    // Анимация счётчиков на главной
    (function() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        if (!counters.length) return;

        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    counters.forEach(el => {
                        const target = parseInt(el.dataset.target);
                        const suffix = target >= 10 ? '+' : '';
                        const duration = 1200;
                        const start = performance.now();
                        function update(now) {
                            const progress = Math.min((now - start) / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            el.textContent = Math.floor(target * eased) + (progress >= 1 ? suffix : '');
                            if (progress < 1) requestAnimationFrame(update);
                        }
                        requestAnimationFrame(update);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) observer.observe(statsSection);
    })();

    // Scroll-reveal — карточки и CTA
    document.addEventListener('DOMContentLoaded', function() { if (typeof revealElements === 'function') revealElements('.quick-link-card, .version-card-mini, .cta-section'); });
