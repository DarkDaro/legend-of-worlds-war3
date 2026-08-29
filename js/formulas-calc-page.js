document.addEventListener('DOMContentLoaded', function() {
        // === Вкладки ===
        document.querySelectorAll('.formula-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.formula-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.formula-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
            });
        });

        // === Утилита: ограничение значения input === (защита от 99999999 и отрицательных чисел)
        function clampInput(el, min, max) {
            const v = parseFloat(el.value);
            if (isNaN(v) || v < min) el.value = min;
            else if (v > max) el.value = max;
        }

        // === Удача (простая) ===
        function calcLuck() {
            const base = parseFloat(document.getElementById('luckBase').value) || 0;
            const luck = parseFloat(document.getElementById('luckValue').value) || 0;
            const result = base + luck * (1 - base / 100);
            const gain = result - base;
            document.getElementById('luckResult').textContent = result.toFixed(1) + '%';
            document.getElementById('luckGain').textContent = '+' + gain.toFixed(1) + '%';
            document.getElementById('luckBar').style.width = result + '%';
            document.getElementById('luckBarLabel').textContent = result.toFixed(1) + '%';
        }
        document.getElementById('luckBase').addEventListener('input', calcLuck);
        document.getElementById('luckValue').addEventListener('input', calcLuck);
        document.getElementById('luckBase').addEventListener('blur', function() { clampInput(this, 0, 100); });
        document.getElementById('luckValue').addEventListener('blur', function() { clampInput(this, 0, 500); });
        calcLuck();

        // === Удача + предметы ===
        var LUCK_ITEMS = (typeof MECHANICS_DB !== 'undefined' && MECHANICS_DB.luck && MECHANICS_DB.luck.items)
            ? MECHANICS_DB.luck.items.map(function(it) { return { id: it.id, name: it.name, luck: it.value }; })
            : [
                { id: 'I0CM', name: 'Проклятый череп', luck: 10 },
                { id: 'I0CN', name: 'Сфера магии', luck: 10 },
                { id: 'I0EY', name: 'Скипетр Владыки II', luck: 15 },
                { id: 'I03V', name: 'Посох света', luck: 5 },
                { id: 'I0DB', name: 'Скипетр Владыки I', luck: 5 }
            ];
        var LUCK_ITEMS_MAX_TOTAL = 6;
        var selectedLuckItems = {}; // { id: count }

        function getTotalItemCount() {
            var total = 0;
            for (var id in selectedLuckItems) {
                total += selectedLuckItems[id];
            }
            return total;
        }

        function renderLuckItems() {
            var grid = document.getElementById('luckItemsGrid');
            var totalItems = getTotalItemCount();
            grid.innerHTML = LUCK_ITEMS.map(function(item) {
                var count = selectedLuckItems[item.id] || 0;
                var isDisabled = count <= 0;
                var isMaxed = totalItems >= LUCK_ITEMS_MAX_TOTAL;
                return '<div class="luck-item-card' + (count > 0 ? ' selected' : '') + '" data-luck-id="' + item.id + '">'
                    + '<div class="luck-item-row">'
                    + '<img loading="lazy" src="images/items/' + item.id + '.png" alt="" class="luck-item-icon" onerror="this.style.display=\'none\'">'
                    + '<span class="luck-item-name">' + item.name + '</span>'
                    + '<span class="luck-item-value">' + (count > 0 ? '+' + (item.luck * count) + '%' : '+' + item.luck + '%') + '</span>'
                    + '</div>'
                    + '<div class="luck-item-controls">'
                    + '<button class="luck-item-btn luck-item-minus" data-luck-id="' + item.id + '"' + (isDisabled ? ' disabled' : '') + '>&minus;</button>'
                    + '<span class="luck-item-count">' + count + '</span>'
                    + '<button class="luck-item-btn luck-item-plus" data-luck-id="' + item.id + '"' + (isMaxed ? ' disabled' : '') + '>+</button>'
                    + '</div>'
                    + '</div>';
            }).join('');

            // Total items row
            var totalRow = grid.parentElement.querySelector('.luck-items-total-row');
            if (!totalRow) {
                totalRow = document.createElement('div');
                totalRow.className = 'luck-items-total-row';
                grid.parentElement.appendChild(totalRow);
            }
            var totalItemsNow = getTotalItemCount();
            totalRow.innerHTML = '<span class="total-label">Предметов выбрано</span>'
                + '<span class="total-value' + (totalItemsNow > LUCK_ITEMS_MAX_TOTAL ? ' over-limit' : '') + '">' + totalItemsNow + ' / ' + LUCK_ITEMS_MAX_TOTAL + '</span>';

            grid.querySelectorAll('.luck-item-minus').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var id = btn.dataset.luckId;
                    if (selectedLuckItems[id] && selectedLuckItems[id] > 0) {
                        selectedLuckItems[id]--;
                        if (selectedLuckItems[id] === 0) delete selectedLuckItems[id];
                    }
                    renderLuckItems();
                    calcLuckItems();
                });
            });
            grid.querySelectorAll('.luck-item-plus').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var id = btn.dataset.luckId;
                    if (getTotalItemCount() < LUCK_ITEMS_MAX_TOTAL) {
                        selectedLuckItems[id] = (selectedLuckItems[id] || 0) + 1;
                    }
                    renderLuckItems();
                    calcLuckItems();
                });
            });
        }

        function calcLuckItems() {
            var base = parseFloat(document.getElementById('luckBase2').value) || 0;
            var heroLuck = parseFloat(document.getElementById('luckHeroValue').value) || 0;
            var itemLuck = 0;
            for (var id in selectedLuckItems) {
                var item = LUCK_ITEMS.find(function(i) { return i.id === id; });
                if (item) itemLuck += item.luck * selectedLuckItems[id];
            }
            var totalLuck = heroLuck + itemLuck;
            var result = base + totalLuck * (1 - base / 100);
            var gain = result - base;
            document.getElementById('luckItemsTotal').textContent = totalLuck;
            document.getElementById('luckItemsResult').textContent = result.toFixed(1) + '%';
            document.getElementById('luckItemsGain').textContent = '+' + gain.toFixed(1) + '%';
            document.getElementById('luckItemsBar').style.width = result + '%';
            document.getElementById('luckItemsBarLabel').textContent = result.toFixed(1) + '%';
        }
        document.getElementById('luckBase2').addEventListener('input', calcLuckItems);
        document.getElementById('luckHeroValue').addEventListener('input', calcLuckItems);
        document.getElementById('luckBase2').addEventListener('blur', function() { clampInput(this, 0, 100); });
        document.getElementById('luckHeroValue').addEventListener('blur', function() { clampInput(this, 0, 500); });
        renderLuckItems();
        calcLuckItems();

        // === Убывающая полезность (мультипликативная) ===
        var dimSources = [{ value: 30 }, { value: 20 }];

        function renderDimSources() {
            var container = document.getElementById('dimSources');
            container.innerHTML = dimSources.map(function(s, i) {
                return '<div class="formula-source-item">'
                    + '<input type="number" value="' + s.value + '" min="0" max="100" step="1" data-dim-idx="' + i + '" class="formula-source-input">'
                    + '<span class="source-name">Источник ' + (i + 1) + '</span>'
                    + '<span class="source-value">' + s.value + '%</span>'
                    + '<button class="source-remove" data-dim-rm="' + i + '"><i class="fas fa-times"></i></button>'
                    + '</div>';
            }).join('');
            container.querySelectorAll('input[data-dim-idx]').forEach(function(inp) {
                inp.addEventListener('input', function() {
                    dimSources[parseInt(inp.dataset.dimIdx)].value = parseFloat(inp.value) || 0;
                    calcDim();
                });
            });
            container.querySelectorAll('[data-dim-rm]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    dimSources.splice(parseInt(btn.dataset.dimRm), 1);
                    renderDimSources();
                    calcDim();
                });
            });
            calcDim();
        }

        function calcDim() {
            var product = 1;
            var sum = 0;
            var contributions = [];
            dimSources.forEach(function(s, i) {
                var prevResult = (1 - product) * 100;
                product *= (1 - s.value / 100);
                var newResult = (1 - product) * 100;
                contributions.push(newResult - prevResult);
                sum += s.value;
            });
            var result = (1 - product) * 100;
            var loss = sum - result;
            document.getElementById('dimResult').textContent = result.toFixed(1) + '%';
            document.getElementById('dimLoss').textContent = '−' + loss.toFixed(1) + '%';
            document.getElementById('dimBar').style.width = result + '%';
            document.getElementById('dimBarLabel').textContent = result.toFixed(1) + '%';

            // Обновить реальные вклады в списке
            var items = document.querySelectorAll('#dimSources .formula-source-item');
            items.forEach(function(item, i) {
                var valSpan = item.querySelector('.source-value');
                if (valSpan && contributions[i] !== undefined) {
                    valSpan.textContent = contributions[i].toFixed(1) + '%';
                }
            });
        }

        document.getElementById('dimAddBtn').addEventListener('click', function() {
            dimSources.push({ value: 0 });
            renderDimSources();
        });
        renderDimSources();

        // === Аддитивная ===
        var addSources = [{ value: 20 }, { value: 15 }];

        function renderAddSources() {
            var container = document.getElementById('addSources');
            container.innerHTML = addSources.map(function(s, i) {
                return '<div class="formula-source-item">'
                    + '<input type="number" value="' + s.value + '" min="0" max="500" step="1" data-add-idx="' + i + '" class="formula-source-input">'
                    + '<span class="source-name">Источник ' + (i + 1) + '</span>'
                    + '<span class="source-value">' + s.value + '%</span>'
                    + '<button class="source-remove" data-add-rm="' + i + '"><i class="fas fa-times"></i></button>'
                    + '</div>';
            }).join('');
            container.querySelectorAll('input[data-add-idx]').forEach(function(inp) {
                inp.addEventListener('input', function() {
                    addSources[parseInt(inp.dataset.addIdx)].value = parseFloat(inp.value) || 0;
                    calcAdd();
                });
            });
            container.querySelectorAll('[data-add-rm]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    addSources.splice(parseInt(btn.dataset.addRm), 1);
                    renderAddSources();
                    calcAdd();
                });
            });
            calcAdd();
        }

        function calcAdd() {
            var total = addSources.reduce(function(s, src) { return s + src.value; }, 0);
            var multiplier = 1 + total / 100;
            document.getElementById('addResult').textContent = total + '%';
            document.getElementById('addMultiplier').textContent = '×' + multiplier.toFixed(2);
        }

        document.getElementById('addAddBtn').addEventListener('click', function() {
            addSources.push({ value: 0 });
            renderAddSources();
        });
        renderAddSources();
    }); // end DOMContentLoaded
