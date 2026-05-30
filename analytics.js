// === Яндекс Метрика — счётчик 109531576 ===
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window,document,"script","https://mc.yandex.ru/metrika/tag.js?id=109531576","ym");

ym(109531576, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true
});

// === Отслеживание кликов по кнопке «Скачать карту» ===
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-download').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            console.log('[Download] Клик по кнопке скачивания карты');
            if (typeof ym !== 'undefined') {
                ym(109531576, 'reachGoal', 'download_map');
            }
        });
    });
});
