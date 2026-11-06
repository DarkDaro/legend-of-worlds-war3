// Scroll-reveal для info-section
    (function() {
        const sections = document.querySelectorAll('.info-section, .modes-promo-btn');
        if (!sections.length) return;

        sections.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger для шагов установки
                    const steps = entry.target.querySelectorAll('.info-steps li');
                    if (steps.length) {
                        steps.forEach((li, i) => {
                            li.style.opacity = '0';
                            li.style.transform = 'translateX(-10px)';
                            li.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            setTimeout(() => {
                                li.style.opacity = '1';
                                li.style.transform = 'translateX(0)';
                            }, i * 120);
                        });
                    }
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(el => observer.observe(el));
        // Страховка: если observer не сработал за 3 сек — показать всё
        setTimeout(function() {
            sections.forEach(function(el) {
                if (el.style.opacity === '0') {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        }, 3000);
    })();
