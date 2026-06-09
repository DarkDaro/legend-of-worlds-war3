// Раскрыть карточку босса при переходе по ссылке из предмета
        document.addEventListener('DOMContentLoaded', function() {
            const params = new URLSearchParams(window.location.search);
            const bossCode = params.get('boss');
            if (bossCode) {
                const card = document.querySelector('.monster-card[data-code="' + bossCode + '"]');
                if (card) {
                    card.classList.add('open');
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
