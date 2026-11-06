document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
        var item = q.closest('.faq-item');
        item.parentElement.querySelectorAll('.faq-item.open').forEach(function(open) {
            if (open !== item) open.classList.remove('open');
        });
        item.classList.toggle('open');
    });
});

// Scroll-reveal — секции ЧаВо
document.addEventListener('DOMContentLoaded', function() { if (typeof revealElements === 'function') revealElements('.faq-section'); });
