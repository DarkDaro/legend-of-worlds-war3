// ========== ДАННЫЕ КАРТЫ АРЕНЫ ==========
// Маркеры: координаты в % от размера изображения
// Редактирование: map.html → кнопка «Редактирование» → перетащить → «Копировать»

var MAP_MARKERS = [
    // Центральная арена
    { id: 'center', type: 'duel', x: 50, y: 65, label: '1', title: 'Центральная арена', desc: 'Основное поле боя. Здесь проходят массовые драки, фарм крипов и командные столкновения.' },

    // Базы (углы)
    { id: 'base1', type: 'spawn', x: 8, y: 8, label: 'B', title: 'База (левый верх)', desc: 'Точка возрождения одной из команд. Рядом фонтан для восстановления здоровья и маны.' },
    { id: 'base2', type: 'spawn', x: 92, y: 8, label: 'B', title: 'База (правый верх)', desc: 'Точка возрождения другой команды. Фонтан и магазин рядом.' },
    { id: 'base3', type: 'spawn', x: 8, y: 92, label: 'B', title: 'База (левый низ)', desc: 'Дополнительная точка возрождения для FFA режима или дополнительных команд.' },
    { id: 'base4', type: 'spawn', x: 92, y: 92, label: 'B', title: 'База (правый низ)', desc: 'Дополнительная точка возрождения. Рядом фонтан и выход в центр.' },

    // Дуэльные арены
    { id: 'duel1', type: 'duel', x: 25, y: 25, label: 'D', title: 'Дуэльная арена 1', desc: 'Арена для одиночных дуэлей 1v1.' },
    { id: 'duel2', type: 'duel', x: 75, y: 25, label: 'D', title: 'Дуэльная арена 2', desc: 'Вторая дуэльная арена.' },
    { id: 'duel3', type: 'duel', x: 25, y: 75, label: 'D', title: 'Дуэльная арена 3', desc: 'Дополнительная дуэльная зона.' },
    { id: 'duel4', type: 'duel', x: 75, y: 75, label: 'D', title: 'Дуэльная арена 4', desc: 'Последняя дуэльная арена.' },

    // Боссы
    { id: 'boss1', type: 'boss', x: 50, y: 15, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс-арена (верх)', desc: 'Арена с мощным боссом. Убийство даёт командную награду и редкий дроп.' },
    { id: 'boss2', type: 'boss', x: 15, y: 50, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс-арена (лево)', desc: 'Левый босс. Требует координации команды.' },
    { id: 'boss3', type: 'boss', x: 85, y: 50, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс-арена (право)', desc: 'Правый босс. Дропит ценные предметы.' },
    { id: 'boss4', type: 'boss', x: 50, y: 85, label: '<i class="fas fa-skull-crossbones"></i>', title: 'Босс-арена (низ)', desc: 'Нижний босс. Стратегическая точка.' },

    // Магазины
    { id: 'shop1', type: 'shop', x: 50, y: 35, label: '$', title: 'Магазин (центр)', desc: 'Основной магазин предметов.' },
    { id: 'shop2', type: 'shop', x: 35, y: 50, label: '$', title: 'Магазин (лево)', desc: 'Дополнительная торговая точка.' },
    { id: 'shop3', type: 'shop', x: 65, y: 50, label: '$', title: 'Магазин (право)', desc: 'Ещё одна торговая точка.' },

    // Фонтаны
    { id: 'fountain1', type: 'fountain', x: 8, y: 12, label: '<i class="fas fa-tint"></i>', title: 'Фонтан (левый верх)', desc: 'Восстанавливает здоровье и ману рядом с базой.' },
    { id: 'fountain2', type: 'fountain', x: 92, y: 12, label: '<i class="fas fa-tint"></i>', title: 'Фонтан (правый верх)', desc: 'Восстановление ресурсов рядом с базой.' },
    { id: 'fountain3', type: 'fountain', x: 8, y: 88, label: '<i class="fas fa-tint"></i>', title: 'Фонтан (левый низ)', desc: 'Точка восстановления для FFA режима.' },
    { id: 'fountain4', type: 'fountain', x: 92, y: 88, label: '<i class="fas fa-tint"></i>', title: 'Фонтан (правый низ)', desc: 'Восстановление здоровья и маны.' }
];

// ========== ЛОГИКА КАРТЫ ==========

(function() {
    var editMode = false;
    var markerElements = {};

    function initMapMarkers() {
        var wrapper = document.getElementById('mapWrapper');
        if (!wrapper) return;

        MAP_MARKERS.forEach(function(marker) {
            var el = document.createElement('div');
            el.className = 'map-marker ' + marker.type;
            el.innerHTML = marker.label;
            el.style.left = marker.x + '%';
            el.style.top = marker.y + '%';
            el.style.transform = 'translate(-50%, -50%)';
            el.title = marker.title;
            el.dataset.id = marker.id;

            el.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!editMode) showMarkerInfo(marker);
            });

            el.addEventListener('mousedown', function(e) {
                if (!editMode) return;
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

            wrapper.appendChild(el);
            markerElements[marker.id] = el;
        });

        wrapper.addEventListener('click', function() {
            if (!editMode) {
                document.getElementById('mapInfoPanel').className = 'map-info-panel empty';
                document.getElementById('mapInfoPanel').innerHTML = 'Кликните на маркер, чтобы узнать о зоне';
            }
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
        var typeLabels = { boss: 'Босс', shop: 'Магазин', duel: 'Арена', spawn: 'База', fountain: 'Фонтан' };
        panel.innerHTML =
            '<h3>' + marker.title + '</h3>' +
            '<p><span style="color:#00e5ff;">' + (typeLabels[marker.type] || marker.type) + '</span> — ' + marker.desc + '</p>';
    }

    function updateCoordsOutput() {
        var out = document.getElementById('coordsOutput');
        var lines = MAP_MARKERS.map(function(m) {
            return m.id + ': x=' + m.x + ', y=' + m.y;
        });
        out.textContent = lines.join('\n');
        out.classList.add('visible');
    }

    // Режим редактирования
    var editBtn = document.getElementById('editModeBtn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            editMode = !editMode;
            this.classList.toggle('active', editMode);
            document.getElementById('copyCoordsBtn').style.display = editMode ? '' : 'none';
            document.getElementById('mapInfoPanel').className = 'map-info-panel empty';
            document.getElementById('mapInfoPanel').innerHTML = editMode
                ? 'Перетаскивайте маркеры мышью. Координаты обновляются ниже.'
                : 'Кликните на маркер, чтобы узнать о зоне';
            if (editMode) updateCoordsOutput();
            else document.getElementById('coordsOutput').classList.remove('visible');
        });
    }

    // Копирование координат
    var copyBtn = document.getElementById('copyCoordsBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            var lines = MAP_MARKERS.map(function(m) {
                return "{ id: '" + m.id + "', type: '" + m.type + "', x: " + m.x + ", y: " + m.y + ", label: '" + m.label.replace(/<[^>]*>/g, '') + "', title: '" + m.title + "', desc: '" + m.desc + "' }";
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
