(function() {
    'use strict';

    // ===== Данные кнопок ящика (демо — заполняется по коду карты) =====
    var BTN_INFO = {
        slot: {
            icon: 'fa-boxes-stacked',
            title: 'Слот хранилища (1–6)',
            text: 'Нажми кнопку слота, когда у героя есть предмет в инвентаре — предмет уйдёт в этот слот ящика. Нажми на заполненный слот — предмет вернётся к герою. Работает только на базе.',
            hint: '6 слотов — расширенный инвентарь героя'
        },
        takeall: {
            icon: 'fa-arrow-down',
            title: 'Забрать всё',
            text: 'Переносит все предметы из ящика в инвентарь героя. Если в инвентаре нет свободных мест — часть предметов останется в ящике.',
            hint: 'Герой должен находиться на базе'
        },
        giveall: {
            icon: 'fa-arrow-up',
            title: 'Сдать всё',
            text: 'Переносит весь инвентарь героя в ящик одним нажатием. Удобно перед покупкой новой сборки или перед сдачей на переработку.',
            hint: 'Герой должен находиться на базе'
        },
        drop: {
            icon: 'fa-trash-can',
            title: 'Выбросить',
            text: 'Выбрасывает содержимое слота на землю рядом с ящиком. Выброшенные предметы может подобрать любой игрок.',
            hint: 'Осторожно: предметы станут общими'
        },
        autobuild_on: {
            icon: 'fa-play',
            title: 'Автосборка ВКЛ',
            text: 'Включает авторазбор предметов: купленные компоненты автоматически собираются в целевые предметы по рецепту, а лишние (не входящие в текущую стадию сборки) продаются. При включении ящик сообщает текущую стадию сборки.',
            hint: 'Стадии сборки задаются билдом героя'
        },
        autobuild_off: {
            icon: 'fa-stop',
            title: 'Автосборка ВЫКЛ',
            text: 'Выключает авторазбор. Все покупки и сборки — полностью ручные.',
            hint: 'Ручное управление инвентарём'
        },
        book1: {
            icon: 'fa-book-bookmark',
            title: 'Спеллбук 1',
            text: 'Книга способностей №1. Открой — внутри набор способностей для изучения или настройки. Содержимое зависит от героя и режима игры.',
            hint: 'Содержимое уточняется'
        },
        book2: {
            icon: 'fa-book-bookmark',
            title: 'Спеллбук 2',
            text: 'Книга способностей №2. Аналогично первой — набор способностей внутри.',
            hint: 'Содержимое уточняется'
        },
        book3: {
            icon: 'fa-book-bookmark',
            title: 'Спеллбук 3',
            text: 'Книга способностей №3. Аналогично первой — набор способностей внутри.',
            hint: 'Содержимое уточняется'
        },
        set1: {
            icon: 'fa-toggle-on',
            title: 'Настройка 1',
            text: 'Личная опция игрока. Переключается кнопкой, сохраняется на всю игру.',
            hint: 'Список настроек уточняется'
        },
        set2: {
            icon: 'fa-toggle-on',
            title: 'Настройка 2',
            text: 'Личная опция игрока. Переключается кнопкой, сохраняется на всю игру.',
            hint: 'Список настроек уточняется'
        },
        set3: {
            icon: 'fa-toggle-on',
            title: 'Настройка 3',
            text: 'Личная опция игрока. Переключается кнопкой, сохраняется на всю игру.',
            hint: 'Список настроек уточняется'
        }
    };

    var panel = document.getElementById('storageInfoPanel');
    if (!panel) return;

    var iconEl = panel.querySelector('.storage-info-icon');
    var titleEl = panel.querySelector('.storage-info-title');
    var textEl = panel.querySelector('.storage-info-text');
    var hintEl = panel.querySelector('.storage-info-hint');

    var DEFAULT_HTML = {
        icon: '<i class="fas fa-hand-pointer"></i>',
        title: 'Хранилище',
        text: 'Наведи курсор или нажми на кнопку ящика, чтобы увидеть описание.',
        hint: 'Кнопки слотов кладут и забирают предметы. Кнопки действий управляют сборкой и настройками.'
    };

    function show(key, btn) {
        var info = BTN_INFO[key];
        if (!info) return;
        iconEl.innerHTML = '<i class="fas ' + info.icon + '"></i>';
        titleEl.textContent = info.title;
        textEl.textContent = info.text;
        hintEl.textContent = info.hint;
        panel.classList.add('active');
        document.querySelectorAll('.storage-btn').forEach(function(b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
    }

    function reset() {
        iconEl.innerHTML = DEFAULT_HTML.icon;
        titleEl.textContent = DEFAULT_HTML.title;
        textEl.textContent = DEFAULT_HTML.text;
        hintEl.textContent = DEFAULT_HTML.hint;
        panel.classList.remove('active');
        document.querySelectorAll('.storage-btn').forEach(function(b) { b.classList.remove('selected'); });
    }

    document.querySelectorAll('.storage-btn').forEach(function(btn) {
        var key = btn.dataset.key;
        btn.addEventListener('mouseenter', function() { show(key, btn); });
        btn.addEventListener('focus', function() { show(key, btn); });
        btn.addEventListener('click', function() { show(key, btn); });
    });

    // Увод мыши с ящика — возврат к описанию по умолчанию
    var box = document.querySelector('.storage-box');
    if (box) {
        box.addEventListener('mouseleave', reset);
    }
})();