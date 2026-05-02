// === Яндекс Метрика — шаблон ===
// Замените YANDEX_COUNTER_ID на реальный номер счётчика из metrika.yandex.ru
// После получения номера раскомментируйте блок ниже и удалите этот комментарий

/*
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];
k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");

ym(YANDEX_COUNTER_ID, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
});
*/

// === Отслеживание кликов по кнопке «Скачать карту» ===
// Работает и без Метрики — просто логирует в консоль
// Когда Метрика будет подключена — отправляет событие туда

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-download').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            // Лог в консоль (всегда)
            console.log('[Download] Клик по кнопке скачивания карты');

            // Отправка цели в Метрику (когда будет подключена)
            if (typeof ym !== 'undefined') {
                ym(YANDEX_COUNTER_ID, 'reachGoal', 'download_map');
            }
        });
    });
});
