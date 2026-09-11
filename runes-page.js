(function() {
    'use strict';

    // Руны — баффы на карте
    var RUNES = [
        { name: 'Руна антимагии', icon: 'fa-hat-wizard', iconClass: 'rune-icon-defense', cardClass: 'rune-antimagic', desc: 'Даёт защиту от магического урона.', duration: '' },
        { name: 'Руна перемещения', icon: 'fa-bolt', iconClass: 'rune-icon-movement', cardClass: 'rune-movement', desc: 'Увеличивает скорость перемещения героя.', duration: '' },
        { name: 'Руна лечения', icon: 'fa-heart-pulse', iconClass: 'rune-icon-heal', cardClass: 'rune-heal', desc: 'Восстанавливает здоровье героя.', duration: '' },
        { name: 'Руна маны', icon: 'fa-droplet', iconClass: 'rune-icon-mana', cardClass: 'rune-mana', desc: 'Восстанавливает ману героя.', duration: '' },
        { name: 'Руна уровня', icon: 'fa-arrow-up', iconClass: 'rune-icon-level', cardClass: 'rune-level', desc: 'Даёт герою уровень опыта.', duration: '' },
        { name: 'Руна невидимости', icon: 'fa-eye-slash', iconClass: 'rune-icon-stealth', cardClass: 'rune-stealth', desc: 'Делает героя невидимым. Снимается при атаке.', duration: '' },
        { name: 'Руна двойного урона', icon: 'fa-fire', iconClass: 'rune-icon-damage', cardClass: 'rune-damage', desc: 'Удваивает наносимый урон.', duration: '' },
        { name: 'Руна вампиризма', icon: 'fa-skull-crossbones', iconClass: 'rune-icon-vamp', cardClass: 'rune-vamp', desc: 'Часть нанесённого урона возвращается в виде здоровья.', duration: '' },
        { name: 'Руна золота', icon: 'fa-coins', iconClass: 'rune-icon-gold', cardClass: 'rune-gold', desc: 'Даёт 1000 золота.', duration: '' },
        { name: 'Руна характеристик', icon: 'fa-chart-line', iconClass: 'rune-icon-stats', cardClass: 'rune-stats', desc: 'Увеличивает все характеристики на +10.', duration: '' },
        { name: 'Руна иллюзий', icon: 'fa-clone', iconClass: 'rune-icon-illusion', cardClass: 'rune-illusion', desc: 'Создаёт иллюзию героя.', duration: '' },
        { name: 'Руна скорости боя', icon: 'fa-gauge-high', iconClass: 'rune-icon-speed', cardClass: 'rune-speed', desc: 'Увеличивает скорость атаки героя.', duration: '' },
        { name: 'Руна защиты', icon: 'fa-shield', iconClass: 'rune-icon-defense', cardClass: 'rune-armor', desc: 'Увеличивает броню героя.', duration: '' },
        { name: 'Руна кристаллов', icon: 'fa-gem', iconClass: 'rune-icon-crystal', cardClass: 'rune-crystal', desc: 'Даёт 5 кристаллов.', duration: '' },
        { name: 'Руна обновления', icon: 'fa-rotate', iconClass: 'rune-icon-refresh', cardClass: 'rune-refresh', desc: 'Сбрасывает перезарядки всех способностей.', duration: '' },
        { name: 'Руна богатства', icon: 'fa-money-bill-wave', iconClass: 'rune-icon-wealth', cardClass: 'rune-wealth', desc: 'Даёт большое количество золота.', duration: '' }
    ];

    var grid = document.getElementById('runesGrid');
    grid.innerHTML = RUNES.map(function(r) {
        var durationHtml = r.duration ? '<div class="rune-duration">' + r.duration + '</div>' : '';
        return '<div class="rune-card ' + r.cardClass + '">' +
            '<div class="rune-icon ' + r.iconClass + '"><i class="fas ' + r.icon + '"></i></div>' +
            '<div class="rune-info">' +
                '<div class="rune-name">' + r.name + '</div>' +
                '<div class="rune-desc">' + r.desc + '</div>' +
                durationHtml +
            '</div>' +
        '</div>';
    }).join('');
})();
document.addEventListener('DOMContentLoaded', function() { if (typeof revealElements === 'function') revealElements('.rune-card'); });
