/* ===== Конструктор сборок (многостадийный) ===== */

const BC_STORAGE_KEY = 'buildConstructor';

// Данные: массив стадий
let buildStages = [
    { level: 1, items: [null, null, null, null, null, null] }
];

// Активный слот: [stageIndex, slotIndex]
let activeSlot = [0, 0];
let bcActiveTab = 'all';
let bcSearchQuery = '';
let jassCollapsed = true;
let bcCollapsedStages = new Set(); // свёрнутые стадии
let bcPreviewCollapsed = false; // свёрнутое превью
let bcClipboard = null; // скопированная стадия { level, items }

// === localStorage ===

function bcSave() {
    localStorage.setItem(BC_STORAGE_KEY, JSON.stringify(buildStages));
}

function bcLoad() {
    try {
        const saved = JSON.parse(localStorage.getItem(BC_STORAGE_KEY));
        if (Array.isArray(saved) && saved.length > 0) {
            buildStages = saved.map(st => ({
                level: st.level || 1,
                items: Array.isArray(st.items) ? st.items.map(id => (id && itemsDB[id]) ? id : null) : [null, null, null, null, null, null]
            }));
        }
    } catch (e) { /* игнорируем */ }
}

// === Всплывающее уведомление ===

function bcToast(message) {
    let toast = document.getElementById('bcToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'bcToast';
        toast.className = 'calc-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.classList.remove('visible'); }, 2000);
}

// === Определение босс-предмета ===

function bcIsBossItem(item) {
    if (!item) return false;
    return item.type === 'boss_drop' || (item.tags && item.tags.includes('boss'));
}

function bcIsBossDrop(item) {
    return item && item.type === 'boss_drop';
}

// === Действия со стадиями ===

function addStage() {
    const lastLevel = buildStages.length > 0 ? buildStages[buildStages.length - 1].level : 1;
    buildStages.push({ level: Math.max(lastLevel + 1, 2), items: [null, null, null, null, null, null] });
    bcSave();
    bcRender();
}

function bcClearAll() {
    if (!confirm('Очистить все стадии?')) return;
    buildStages = [{ level: 1, items: [null, null, null, null, null, null] }];
    bcClipboard = null;
    bcCollapsedStages.clear();
    activeSlot = [0, 0];
    bcSave();
    bcRender();
    bcToast('Конструктор очищен');
}

function removeStage(index) {
    if (buildStages.length <= 1) return;
    buildStages.splice(index, 1);
    // Корректируем activeSlot
    if (activeSlot[0] >= buildStages.length) {
        activeSlot[0] = buildStages.length - 1;
    }
    bcSave();
    bcRender();
}

function setStageLevel(index, level) {
    if (buildStages[index]) {
        buildStages[index].level = Math.max(1, parseInt(level) || 1);
        bcSave();
        bcRender();
    }
}

// === Копирование / вставка стадий ===

function bcCopyStage(index) {
    const stage = buildStages[index];
    if (!stage) return;
    bcClipboard = { level: stage.level, items: [...stage.items] };
    bcToast('Стадия ' + (index + 1) + ' скопирована');
    bcRender(); // обновить кнопки
}

function bcPasteStage(afterIndex) {
    if (!bcClipboard) {
        bcToast('Сначала скопируйте стадию');
        return;
    }
    const newStage = { level: bcClipboard.level, items: [...bcClipboard.items] };
    buildStages.splice(afterIndex + 1, 0, newStage);
    // Корректируем activeSlot
    if (activeSlot[0] > afterIndex) {
        activeSlot[0]++;
    }
    bcSave();
    bcRender();
    bcToast('Стадия вставлена после ' + (afterIndex + 1));
}

// === Действия со слотами ===

function bcAddToSlot(itemId) {
    const [si, sl] = activeSlot;
    if (si >= buildStages.length) return;
    const stage = buildStages[si];
    if (!stage) return;
    // Если слот занят — ищем пустой в этой стадии
    if (stage.items[sl] !== null) {
        const emptyIdx = stage.items.indexOf(null);
        if (emptyIdx === -1) {
            bcToast('Все 6 слотов в стадии заняты');
            return;
        }
        stage.items[emptyIdx] = itemId;
        activeSlot = [si, emptyIdx];
    } else {
        stage.items[sl] = itemId;
        // Сдвигаем на следующий пустой слот
        const nextEmpty = stage.items.indexOf(null);
        if (nextEmpty !== -1) {
            activeSlot = [si, nextEmpty];
        }
    }
    bcSave();
    bcRender();
}

function bcRemoveFromSlot(si, sl) {
    if (buildStages[si]) {
        buildStages[si].items[sl] = null;
        bcSave();
        bcRender();
    }
}

function bcSetActiveSlot(si, sl) {
    activeSlot = [si, sl];
    bcRenderSlots();
    bcRenderCatalog(); // обновить подсветку активного слота
}

// === Отрисовка стадий и слотов ===

function bcRenderSlots() {
    const container = document.getElementById('bcStages');
    if (!container) return;

    let html = '';
    buildStages.forEach((stage, si) => {
        const stageCost = bcCalcStageCost(si);
        const bossCount = bcCountBossItems(si);
        const collapsed = bcCollapsedStages.has(si);
        html += `<div class="bc-stage" data-stage="${si}">`;
        html += `<div class="bc-stage-header" data-si="${si}">`;
        html += `<span class="bc-stage-num">Стадия ${si + 1}</span>`;
        html += `<i class="fas fa-chevron-${collapsed ? 'right' : 'down'} bc-stage-chevron" data-si="${si}"></i>`;
        html += `<div class="bc-stage-level">`;
        html += `<label for="bcLevel${si}">Уровень:</label>`;
        html += `<input type="number" id="bcLevel${si}" class="bc-level-input" value="${stage.level}" min="1" max="25" data-si="${si}">`;
        html += `</div>`;
        html += `<div class="bc-stage-cost">${stageCost.toLocaleString('ru-RU')} 🪙${bossCount > 0 ? ' · 💀 ' + bossCount : ''}</div>`;
        html += `<button class="bc-stage-copy" data-si="${si}" title="Копировать стадию"><i class="fas fa-copy"></i></button>`;
        if (bcClipboard) {
            html += `<button class="bc-stage-paste" data-si="${si}" title="Вставить стадию после"><i class="fas fa-paste"></i></button>`;
        }
        if (buildStages.length > 1) {
            html += `<button class="bc-stage-remove" data-si="${si}" title="Удалить стадию"><i class="fas fa-times"></i></button>`;
        }
        html += `</div>`;
        html += `<div class="bc-stage-slots"${collapsed ? ' style="display:none"' : ''}>`;
        stage.items.forEach((id, sl) => {
            const isActive = activeSlot[0] === si && activeSlot[1] === sl;
            if (id && itemsDB[id]) {
                const item = itemsDB[id];
                const isBoss = bcIsBossItem(item);
                const isDrop = bcIsBossDrop(item);
                html += `<div class="bc-slot bc-slot-filled ${isActive ? 'bc-slot-active' : ''} ${isDrop ? 'bc-slot-boss-drop' : isBoss ? 'bc-slot-boss-craft' : ''}" data-si="${si}" data-sl="${sl}" title="${item.name} — клик для выбора, ✕ для удаления">`;
                html += `<div class="bc-slot-icon">${itemIcon(item.id, item.icon, 40, item.type)}</div>`;
                html += `<div class="bc-slot-name">${item.name}</div>`;
                html += `<div class="bc-slot-cost">${isBoss ? '💀' : item.cost.toLocaleString('ru-RU') + ' 🪙'}</div>`;
                html += `<button class="bc-slot-remove" data-si="${si}" data-sl="${sl}" title="Убрать"><i class="fas fa-times"></i></button>`;
                html += `</div>`;
            } else {
                html += `<div class="bc-slot bc-slot-empty ${isActive ? 'bc-slot-active' : ''}" data-si="${si}" data-sl="${sl}" title="Выберите предмет из каталога">`;
                html += `<i class="fas fa-plus"></i>`;
                html += `</div>`;
            }
        });
        html += `</div>`;
        html += `</div>`;
    });
    container.innerHTML = html;

    // Обработчики
    // Сворачивание/разворачивание стадии
    container.querySelectorAll('.bc-stage-header').forEach(header => {
        header.addEventListener('click', e => {
            if (e.target.closest('.bc-level-input') || e.target.closest('.bc-stage-remove') || e.target.closest('.bc-stage-copy') || e.target.closest('.bc-stage-paste')) return;
            const si = parseInt(header.dataset.si);
            if (bcCollapsedStages.has(si)) bcCollapsedStages.delete(si);
            else bcCollapsedStages.add(si);
            bcRenderSlots();
        });
    });
    container.querySelectorAll('.bc-level-input').forEach(input => {
        input.addEventListener('change', () => {
            setStageLevel(parseInt(input.dataset.si), input.value);
        });
    });
    container.querySelectorAll('.bc-stage-copy').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            bcCopyStage(parseInt(btn.dataset.si));
        });
    });
    container.querySelectorAll('.bc-stage-paste').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            bcPasteStage(parseInt(btn.dataset.si));
        });
    });
    container.querySelectorAll('.bc-stage-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            removeStage(parseInt(btn.dataset.si));
        });
    });
    container.querySelectorAll('.bc-slot').forEach(slot => {
        slot.addEventListener('click', e => {
            if (e.target.closest('.bc-slot-remove')) return;
            const si = parseInt(slot.dataset.si);
            const sl = parseInt(slot.dataset.sl);
            bcSetActiveSlot(si, sl);
        });
    });
    container.querySelectorAll('.bc-slot-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            bcRemoveFromSlot(parseInt(btn.dataset.si), parseInt(btn.dataset.sl));
        });
    });
}

// === Подсчёт стоимости стадии ===

function bcCalcStageCost(si) {
    const stage = buildStages[si];
    if (!stage) return 0;
    let cost = 0;
    stage.items.forEach(id => {
        if (id && itemsDB[id]) {
            const item = itemsDB[id];
            if (!bcIsBossDrop(item)) {
                cost += calculateItemCost(id);
            }
        }
    });
    return cost;
}

function bcCountBossItems(si) {
    const stage = buildStages[si];
    if (!stage) return 0;
    let count = 0;
    stage.items.forEach(id => {
        if (id && itemsDB[id] && bcIsBossItem(itemsDB[id])) count++;
    });
    return count;
}

// === Превью таблицы ===

function bcRenderPreview() {
    const container = document.getElementById('bcPreview');
    if (!container) return;

    const hasItems = buildStages.some(st => st.items.some(id => id !== null));
    if (!hasItems) {
        container.innerHTML = '<div class="bc-preview-empty"><i class="fas fa-info-circle"></i> Добавьте предметы в стадии, чтобы увидеть превью</div>';
        return;
    }

    let html = '<table class="bc-preview-table">';
    html += '<thead><tr><th>Стадия</th><th class="bc-td-level">Уровень</th><th>Предметы</th><th>Стоимость</th></tr></thead>';
    html += '<tbody>';
    buildStages.forEach((stage, si) => {
        const filledItems = stage.items.filter(id => id !== null);
        if (filledItems.length === 0) return;
        const cost = bcCalcStageCost(si);
        const bossCount = bcCountBossItems(si);
        html += '<tr>';
        html += `<td class="bc-td-stage">${si + 1}</td>`;
        html += `<td class="bc-td-level">${stage.level}</td>`;
        html += '<td class="bc-td-items">';
        stage.items.forEach(id => {
            if (!id || !itemsDB[id]) return;
            const item = itemsDB[id];
            const isBoss = bcIsBossItem(item);
            const isDrop = bcIsBossDrop(item);
            html += `<div class="bc-preview-item ${isDrop ? 'bc-preview-boss-drop' : isBoss ? 'bc-preview-boss-craft' : ''}">`;
            html += `<span class="bc-preview-icon">${itemIcon(item.id, item.icon, 24, item.type)}</span>`;
            html += `<span class="bc-preview-name">${item.name}</span>`;
            if (isDrop) html += '<span class="bc-preview-badge bc-badge-drop">💀 Дроп</span>';
            else if (isBoss) html += '<span class="bc-preview-badge bc-badge-craft">💀 Босс</span>';
            html += '</div>';
        });
        html += '</td>';
        html += `<td class="bc-td-cost">${cost.toLocaleString('ru-RU')} 🪙${bossCount > 0 ? '<br><small>💀 ' + bossCount + ' босс</small>' : ''}</td>`;
        html += '</tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

// === JASS-генератор ===

function bcItemNameToJass(itemId) {
    // Название из jass-data.js (сайт — источник истины)
    if (typeof getJassItemName === 'function') {
        const jassName = getJassItemName(itemId);
        if (jassName) return jassName;
    }
    // Fallback: имя из itemsDB
    const item = itemsDB[itemId];
    if (item && item.name) {
        return item.name;
    }
    return itemId;
}

function bcGenerateJass() {
    const g = parseInt(document.getElementById('bcGroupInput').value) || 1;
    let code = '';
    code += 'function Trig_CustomBuild_Actions takes nothing returns nothing\n';
    code += '    local integer s\n';
    code += `    local integer g = ${g}\n`;

    buildStages.forEach((stage, si) => {
        const filledItems = stage.items.filter(id => id !== null);
        if (filledItems.length === 0) return;

        code += `\n    set s = ${si + 1}\n`;
        // Уровень ставится только на первый предмет стадии (как в оригинале)
        let firstItem = true;
        stage.items.forEach(id => {
            if (!id || !itemsDB[id]) return;
            const item = itemsDB[id];
            const jassName = bcItemNameToJass(id);
            const lvl = firstItem ? stage.level : 0;
            // Босс-дропы: bool=false (не trade-in), остальные: bool=true
            const bool = bcIsBossDrop(item) ? 'false' : 'true';
            code += `    call AddItemToBuild(g, s, ${lvl}, GetItemIdName("${jassName}"), ${bool})\n`;
            firstItem = false;
        });
    });

    code += '\nendfunction\n';
    return code;
}

function bcRenderJass() {
    const codeEl = document.getElementById('bcJassCode');
    if (!codeEl) return;
    codeEl.textContent = bcGenerateJass();
}

// === Каталог предметов ===

const BC_TABS = [
    { key: 'all', label: 'Все' },
    { key: 'armory', label: 'Оружейная' },
    { key: 'elements', label: 'Стихии' },
    { key: 'equip', label: 'Экипировка' },
    { key: 'overseas', label: 'Заморские' },
    { key: 'boots', label: 'Обувь' },
    { key: 'jewels', label: 'Драгоценности' },
    { key: 'armor', label: 'Броня' },
    { key: 'shields', label: 'Щиты' },
    { key: 'weapon', label: 'Вооружение' },
    { key: 'weapon2', label: 'Вооружение 2' },
    { key: 'magic_art', label: 'Маг. артефакты' },
    { key: 'magic_equip', label: 'Маг. экипировка' },
    { key: 'situational', label: 'Ситуативные' },
    { key: 'str_element', label: 'Сила' },
    { key: 'int_element', label: 'Разум' },
    { key: 'agi_element', label: 'Ловкость' },
    { key: 'agi_element2', label: 'Ловкость 2' },
    { key: 'dark_telec', label: 'Тёмный делец' },
    { key: 'boss', label: 'С боссов' },
];

function bcRenderTabs() {
    const container = document.getElementById('bcTabs');
    if (!container) return;
    container.innerHTML = BC_TABS.map(t =>
        `<button class="tab-btn ${t.key === bcActiveTab ? 'active' : ''}" data-cat="${t.key}">${t.label}</button>`
    ).join('');

    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            bcActiveTab = btn.dataset.cat;
            bcRenderTabs();
            bcRenderCatalog();
        });
    });
}

function bcRenderCatalog() {
    const container = document.getElementById('bcCatalog');
    if (!container) return;

    let itemIds = [];
    if (bcActiveTab === 'all') {
        itemIds = Object.keys(itemsDB).filter(id => {
            const item = itemsDB[id];
            if (!item) return false;
            if (id === 'recipe') return false;
            if (item.type === 'recipe') return false;
            if (item.type === 'boost') return false;
            if (item.type === 'rune') return false;
            if (item.hidden) return false;
            return true;
        });
    } else {
        const gridKey = 'grid-' + bcActiveTab;
        if (grids[gridKey]) {
            itemIds = grids[gridKey].filter(id => {
                const item = itemsDB[id];
                if (!item) return false;
                if (item.type === 'recipe') return false;
                if (item.type === 'boost') return false;
                if (item.type === 'rune') return false;
                if (item.hidden) return false;
                return true;
            });
        }
    }

    // Фильтр поиска
    if (bcSearchQuery) {
        const q = bcSearchQuery.toLowerCase();
        itemIds = itemIds.filter(id => {
            const item = itemsDB[id];
            return item && item.name.toLowerCase().includes(q);
        });
    }

    if (itemIds.length === 0) {
        container.innerHTML = '<p style="color:#8e97aa; padding: 16px;">Предметы не найдены</p>';
        return;
    }

    // Собираем все предметы во всех стадиях для подсветки
    const allInBuild = new Set();
    buildStages.forEach(st => st.items.forEach(id => { if (id) allInBuild.add(id); }));

    let html = '<div class="calc-catalog-grid">';
    itemIds.forEach(id => {
        const item = itemsDB[id];
        if (!item) return;
        const cost = calculateItemCost(id);
        const isBoss = bcIsBossItem(item);
        const inBuild = allInBuild.has(id);
        html += `<div class="calc-catalog-item ${inBuild ? 'calc-catalog-in-build' : ''}" data-item-id="${id}" title="${item.name}${inBuild ? ' (уже в сборке)' : ''}">`;
        html += `<div class="calc-catalog-icon">${itemIcon(item.id, item.icon, 40, item.type)}</div>`;
        html += `<div class="calc-catalog-name">${item.name}</div>`;
        html += `<div class="calc-catalog-cost">${isBoss ? '💀 Босс' : cost.toLocaleString('ru-RU') + ' 🪙'}</div>`;
        html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;

    // Клик по предмету → добавление в активный слот
    container.querySelectorAll('.calc-catalog-item').forEach(el => {
        el.addEventListener('click', () => {
            bcAddToSlot(el.dataset.itemId);
        });
    });
}

// === Общая отрисовка ===

function bcRender() {
    bcRenderSlots();
    bcRenderPreview();
    bcRenderJass();
    bcRenderCatalog();
}

// === Инициализация ===

document.addEventListener('DOMContentLoaded', () => {
    bcLoad();
    bcRenderTabs();
    bcRender();

    // Кнопка «Добавить стадию»
    const addBtn = document.getElementById('bcAddStageBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addStage);
    }

    // Кнопка «Очистить»
    const clearBtn = document.getElementById('bcClearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', bcClearAll);
    }

    // Сворачивание превью
    const previewToggle = document.getElementById('bcPreviewToggle');
    if (previewToggle) {
        previewToggle.addEventListener('click', () => {
            bcPreviewCollapsed = !bcPreviewCollapsed;
            const content = document.getElementById('bcPreviewContent');
            const chevron = previewToggle.querySelector('.bc-chevron');
            if (content) content.style.display = bcPreviewCollapsed ? 'none' : 'block';
            if (chevron) {
                chevron.className = bcPreviewCollapsed ? 'fas fa-chevron-down bc-chevron' : 'fas fa-chevron-up bc-chevron';
            }
        });
    }

    // Поиск
    const searchInput = document.getElementById('bcSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            bcSearchQuery = searchInput.value.trim();
            bcRenderCatalog();
        });
    }

    // Группа (перегенерация JASS)
    const groupInput = document.getElementById('bcGroupInput');
    if (groupInput) {
        groupInput.addEventListener('change', bcRenderJass);
    }

    // JASS toggle
    const jassToggle = document.getElementById('bcJassToggle');
    if (jassToggle) {
        jassToggle.addEventListener('click', () => {
            jassCollapsed = !jassCollapsed;
            const content = document.getElementById('bcJassContent');
            const chevron = jassToggle.querySelector('.bc-chevron');
            if (content) content.style.display = jassCollapsed ? 'none' : 'block';
            if (chevron) {
                chevron.className = jassCollapsed ? 'fas fa-chevron-down bc-chevron' : 'fas fa-chevron-up bc-chevron';
            }
        });
    }

    // Копирование JASS
    const copyBtn = document.getElementById('bcCopyJassBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = document.getElementById('bcJassCode');
            if (!code) return;
            navigator.clipboard.writeText(code.textContent).then(() => {
                const orig = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано';
                setTimeout(() => { copyBtn.innerHTML = orig; }, 1500);
            }).catch(() => {
                // Запасной вариант
                const range = document.createRange();
                range.selectNodeContents(code);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                document.execCommand('copy');
                bcToast('Код скопирован');
            });
        });
    }
});
