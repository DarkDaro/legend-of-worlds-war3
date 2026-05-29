// ========== ДАННЫЕ КАРТЫ АРЕНЫ ==========
// Маркеры: координаты в % от размера изображения
// Редактирование: map.html → «Редактирование» → клик на карту = добавить маркер
// Правый клик на маркер = удалить. Перетащить = переместить. «Копировать» = JS-массив.

var MAP_MARKERS = [
    // Боссы (8)
    { id: 'boss1', type: 'boss', x: 9.8, y: 6.2, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс 1', desc: '' },
    { id: 'boss2', type: 'boss', x: 57.4, y: 9.5, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс 2', desc: '' },
    { id: 'boss3', type: 'boss', x: 79.2, y: 9.6, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс 3', desc: '' },
    { id: 'boss4', type: 'boss', x: 95.2, y: 31.3, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс 4', desc: '' },
    { id: 'boss5', type: 'boss', x: 71.4, y: 32.3, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс 5', desc: '' },
    { id: 'boss6', type: 'boss', x: 56.7, y: 32.1, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс 6', desc: '' },
    { id: 'boss7', type: 'boss', x: 15.2, y: 89.3, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс 7', desc: '' },
    { id: 'boss8', type: 'boss', x: 33.2, y: 86.9, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс 8', desc: '' },

    // Базы (3)
    { id: 'base1', type: 'spawn', x: 81.5, y: 89.6, label: 'B', title: 'База 1', desc: '' },
    { id: 'base2', type: 'spawn', x: 8.9, y: 33.7, label: 'B', title: 'База 2', desc: '' },
    { id: 'base3', type: 'spawn', x: 36.4, y: 34.6, label: 'B', title: 'База 3', desc: '' },

    // Дуэльные арены (3)
    { id: 'duel1', type: 'duel', x: 33.3, y: 15.4, label: 'D', title: 'Дуэльная арена 1', desc: '' },
    { id: 'duel2', type: 'duel', x: 63.4, y: 92, label: 'D', title: 'Дуэльная арена 2', desc: '' },
    { id: 'duel3', type: 'duel', x: 47, y: 90.2, label: 'D', title: 'Дуэльная арена 3', desc: '' },

    // Магазины (3)
    { id: 'shop1', type: 'shop', x: 41, y: 35.6, label: '$', title: 'Магазин 1', desc: '' },
    { id: 'shop2', type: 'shop', x: 84.7, y: 89.7, label: '$', title: 'Магазин 2', desc: '' },
    { id: 'shop3', type: 'shop', x: 9.5, y: 30.1, label: '$', title: 'Магазин 3', desc: '' },

    // Фонтаны (2)
    { id: 'fountain1', type: 'fountain', x: 56.1, y: 48.6, label: '<i class="fas fa-tint"></i>', title: 'Фонтан 1', desc: '' },
    { id: 'fountain2', type: 'fountain', x: 58.3, y: 74.4, label: '<i class="fas fa-tint"></i>', title: 'Фонтан 2', desc: '' },

    // Крипы (18)
    { id: 'creep1', type: 'creep', x: 79.1, y: 63.3, label: 'C', title: 'Крипы 1', desc: '' },
    { id: 'creep2', type: 'creep', x: 8, y: 72.9, label: 'C', title: 'Крипы 2', desc: '' },
    { id: 'creep3', type: 'creep', x: 78.9, y: 48.2, label: 'C', title: 'Крипы 3', desc: '' },
    { id: 'creep4', type: 'creep', x: 68.3, y: 49, label: 'C', title: 'Крипы 4', desc: '' },
    { id: 'creep5', type: 'creep', x: 35.9, y: 74.4, label: 'C', title: 'Крипы 5', desc: '' },
    { id: 'creep6', type: 'creep', x: 46.4, y: 75.6, label: 'C', title: 'Крипы 6', desc: '' },
    { id: 'creep7', type: 'creep', x: 91.5, y: 48, label: 'C', title: 'Крипы 7', desc: '' },
    { id: 'creep8', type: 'creep', x: 90.1, y: 69.7, label: 'C', title: 'Крипы 8', desc: '' },
    { id: 'creep9', type: 'creep', x: 75.7, y: 75.7, label: 'C', title: 'Крипы 9', desc: '' },
    { id: 'creep10', type: 'creep', x: 25.7, y: 49.2, label: 'C', title: 'Крипы 10', desc: '' },
    { id: 'creep11', type: 'creep', x: 35.6, y: 50.2, label: 'C', title: 'Крипы 11', desc: '' },
    { id: 'creep12', type: 'creep', x: 42.3, y: 47.9, label: 'C', title: 'Крипы 12', desc: '' },
    { id: 'creep13', type: 'creep', x: 48.4, y: 48.7, label: 'C', title: 'Крипы 13', desc: '' },
    { id: 'creep14', type: 'creep', x: 25.3, y: 74.4, label: 'C', title: 'Крипы 14', desc: '' },
    { id: 'creep15', type: 'creep', x: 23.9, y: 65.9, label: 'C', title: 'Крипы 15', desc: '' },
    { id: 'creep16', type: 'creep', x: 29.5, y: 59.4, label: 'C', title: 'Крипы 16', desc: '' },
    { id: 'creep17', type: 'creep', x: 86.4, y: 58.7, label: 'C', title: 'Крипы 17', desc: '' },
    { id: 'creep18', type: 'creep', x: 71.1, y: 68.3, label: 'C', title: 'Крипы 18', desc: '' },

    // Телепорты (19)
    { id: 'tp1', type: 'teleport', x: 94.9, y: 62.9, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 1', desc: '' },
    { id: 'tp2', type: 'teleport', x: 23.3, y: 62.1, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 2', desc: '' },
    { id: 'tp3', type: 'teleport', x: 65.9, y: 19.1, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 3', desc: '' },
    { id: 'tp4', type: 'teleport', x: 88.3, y: 19.6, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 4', desc: '' },
    { id: 'tp5', type: 'teleport', x: 56.1, y: 27, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 5', desc: '' },
    { id: 'tp6', type: 'teleport', x: 68.5, y: 35.9, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 6', desc: '' },
    { id: 'tp7', type: 'teleport', x: 75.8, y: 28.4, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 7', desc: '' },
    { id: 'tp8', type: 'teleport', x: 62.7, y: 61.8, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 8', desc: '' },
    { id: 'tp9', type: 'teleport', x: 54.1, y: 61.4, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 9', desc: '' },
    { id: 'tp10', type: 'teleport', x: 12.4, y: 67.7, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 10', desc: '' },
    { id: 'tp11', type: 'teleport', x: 4.4, y: 77.7, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 11', desc: '' },
    { id: 'tp12', type: 'teleport', x: 11.4, y: 94.9, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 12', desc: '' },
    { id: 'tp13', type: 'teleport', x: 35.5, y: 93.5, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 13', desc: '' },
    { id: 'tp14', type: 'teleport', x: 30.9, y: 85.2, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 14', desc: '' },
    { id: 'tp15', type: 'teleport', x: 74.6, y: 19.4, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 15', desc: '' },
    { id: 'tp16', type: 'teleport', x: 53.4, y: 19.3, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 16', desc: '' },
    { id: 'tp17', type: 'teleport', x: 2.5, y: 33.2, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 17', desc: '' },
    { id: 'tp18', type: 'teleport', x: 5.7, y: 12.1, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 18', desc: '' },
    { id: 'tp19', type: 'teleport', x: 13.5, y: 2, label: '<i class="fas fa-bolt"></i>', title: 'Телепорт 19', desc: '' }
];

// Типы маркеров
var MAP_TYPES = {
    boss:        { label: 'Босс',          icon: '<i class="fas fa-skull-crossbones"></i>' },
    shop:        { label: 'Магазин',        icon: '$' },
    duel:        { label: 'Арена',         icon: 'D' },
    spawn:       { label: 'База',          icon: 'B' },
    fountain:    { label: 'Фонтан',        icon: '<i class="fas fa-tint"></i>' },
    creep:       { label: 'Крипы',         icon: 'C' },
    teleport:    { label: 'Телепорт (вход)', icon: '<i class="fas fa-bolt"></i>' },
    'teleport-out': { label: 'Телепорт (выход)', icon: '<i class="fas fa-location-arrow"></i>' },
    megacreep:   { label: 'Мегакрип',      icon: 'M' }
};

// ========== ЛОГИКА КАРТЫ ==========

(function() {
    var editMode = false;
    var markerElements = {};
    var markerCounter = 0;
    var selectedType = 'boss';

    function nextId() {
        markerCounter++;
        return 'mk' + markerCounter;
    }

    function createMarkerEl(marker) {
        var el = document.createElement('div');
        el.className = 'map-marker ' + marker.type;
        el.innerHTML = marker.label;
        el.style.left = marker.x + '%';
        el.style.top = marker.y + '%';
        el.style.transform = 'translate(-50%, -50%)';
        el.title = marker.title;
        el.dataset.id = marker.id;

        // Клик — показать инфо (не в режиме редактирования)
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!editMode) showMarkerInfo(marker);
        });

        // Перетаскивание (в режиме редактирования)
        el.addEventListener('mousedown', function(e) {
            if (!editMode) return;
            if (e.button === 2) return; // правый клик — удаление
            e.preventDefault();
            e.stopPropagation();
            startDrag(marker, el, e);
        });
        el.addEventListener('touchstart', function(e) {
            if (!editMode) return;
            e.preventDefault();
            e.stopPropagation();
            startDrag(marker, el, e.touches[0]);
        }, { passive: false });

        // Правый клик — удалить (в режиме редактирования)
        el.addEventListener('contextmenu', function(e) {
            if (!editMode) return;
            e.preventDefault();
            e.stopPropagation();
            removeMarker(marker, el);
        });

        return el;
    }

    function addMarker(x, y) {
        var typeInfo = MAP_TYPES[selectedType] || MAP_TYPES.boss;
        var marker = {
            id: nextId(),
            type: selectedType,
            x: Math.round(x * 10) / 10,
            y: Math.round(y * 10) / 10,
            label: typeInfo.icon,
            title: typeInfo.label + ' (новый)',
            desc: ''
        };
        MAP_MARKERS.push(marker);

        var wrapper = document.getElementById('mapWrapper');
        var el = createMarkerEl(marker);
        wrapper.appendChild(el);
        markerElements[marker.id] = el;

        // Редактирование названия — двойной клик
        el.addEventListener('dblclick', function(e) {
            if (!editMode) return;
            e.stopPropagation();
            var name = prompt('Название маркера:', marker.title);
            if (name && name.trim()) {
                marker.title = name.trim();
                el.title = marker.title;
            }
            var desc = prompt('Описание:', marker.desc);
            if (desc !== null) marker.desc = desc;
            updateCoordsOutput();
        });

        updateCoordsOutput();
        return marker;
    }

    function removeMarker(marker, el) {
        if (!confirm('Удалить «' + marker.title + '»?')) return;
        el.remove();
        delete markerElements[marker.id];
        var idx = MAP_MARKERS.indexOf(marker);
        if (idx > -1) MAP_MARKERS.splice(idx, 1);
        updateCoordsOutput();
    }

    function initMapMarkers() {
        var wrapper = document.getElementById('mapWrapper');
        if (!wrapper) return;

        // Рендер существующих маркеров
        MAP_MARKERS.forEach(function(marker) {
            var el = createMarkerEl(marker);
            wrapper.appendChild(el);
            markerElements[marker.id] = el;
        });

        // Клик по карте — добавить маркер (в режиме редактирования)
        wrapper.addEventListener('click', function(e) {
            if (editMode) {
                var rect = wrapper.getBoundingClientRect();
                var x = ((e.clientX - rect.left) / rect.width) * 100;
                var y = ((e.clientY - rect.top) / rect.height) * 100;
                addMarker(x, y);
            } else {
                document.getElementById('mapInfoPanel').className = 'map-info-panel empty';
                document.getElementById('mapInfoPanel').innerHTML = 'Кликните на маркер, чтобы узнать о зоне';
            }
        });

        // Предотвратить контекстное меню на карте
        wrapper.addEventListener('contextmenu', function(e) {
            if (editMode) e.preventDefault();
        });
    }

    function startDrag(marker, el, startEvent) {
        var wrapper = document.getElementById('mapWrapper');
        var rect = wrapper.getBoundingClientRect();

        el.classList.add('dragging');

        function onMove(e) {
            var clientX = e.touches ? e.touches[0].clientX : e.clientX;
            var clientY = e.touches ? e.touches[0].clientY : e.clientY;
            var newLeft = ((clientX - rect.left) / rect.width) * 100;
            var newTop = ((clientY - rect.top) / rect.height) * 100;
            newLeft = Math.max(0, Math.min(100, newLeft));
            newTop = Math.max(0, Math.min(100, newTop));
            el.style.left = newLeft + '%';
            el.style.top = newTop + '%';
            marker.x = Math.round(newLeft * 10) / 10;
            marker.y = Math.round(newTop * 10) / 10;
        }

        function onEnd() {
            el.classList.remove('dragging');
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
            updateCoordsOutput();
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
    }

    function showMarkerInfo(marker) {
        var panel = document.getElementById('mapInfoPanel');
        panel.className = 'map-info-panel';
        var typeLabels = {};
        for (var k in MAP_TYPES) typeLabels[k] = MAP_TYPES[k].label;
        panel.innerHTML =
            '<h3>' + marker.title + '</h3>' +
            '<p><span style="color:#00e5ff;">' + (typeLabels[marker.type] || marker.type) + '</span>' +
            (marker.desc ? ' — ' + marker.desc : '') + '</p>';
    }

    function updateCoordsOutput() {
        var out = document.getElementById('coordsOutput');
        var lines = MAP_MARKERS.map(function(m) {
            return m.id + ' [' + m.type + '] x=' + m.x + ' y=' + m.y + ' ' + m.title;
        });
        out.textContent = lines.join('\n') || '(нет маркеров)';
        out.classList.add('visible');
    }

    // Режим редактирования
    var editBtn = document.getElementById('editModeBtn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            editMode = !editMode;
            this.classList.toggle('active', editMode);
            document.getElementById('copyCoordsBtn').classList.toggle('visible', editMode);
            document.getElementById('typeSelector').classList.toggle('visible', editMode);
            document.getElementById('mapInfoPanel').className = 'map-info-panel empty';
            document.getElementById('mapInfoPanel').innerHTML = editMode
                ? 'Клик на карту = добавить маркер. Правый клик на маркер = удалить. Двойной клик = переименовать. Перетащить = переместить.'
                : 'Кликните на маркер, чтобы узнать о зоне';
            if (editMode) updateCoordsOutput();
            else document.getElementById('coordsOutput').classList.remove('visible');
        });
    }

    // Выбор типа маркера
    var typeBtns = document.querySelectorAll('.map-type-btn');
    typeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            selectedType = this.dataset.type;
            typeBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
        });
    });

    // Копирование координат
    var copyBtn = document.getElementById('copyCoordsBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            var lines = MAP_MARKERS.map(function(m) {
                return "{ id: '" + m.id + "', type: '" + m.type + "', x: " + m.x + ", y: " + m.y + ", label: '" + m.label + "', title: '" + m.title + "', desc: '" + m.desc + "' }";
            });
            var text = lines.join(',\n        ');
            navigator.clipboard.writeText(text).then(function() {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано';
                setTimeout(function() { copyBtn.innerHTML = '<i class="fas fa-copy"></i> Копировать'; }, 1500);
            });
        });
    }

    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMapMarkers);
    } else {
        initMapMarkers();
    }
})();
