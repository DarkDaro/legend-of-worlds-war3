/* ===== Калькулятор сборок ===== */

const CALC_STORAGE_KEY = 'buildCalc';
let buildSlots = [null, null, null, null, null, null];
let calcActiveTab = 'all';
let calcSearchQuery = '';

// === Сохранение / загрузка ===

function saveBuild() {
    localStorage.setItem(CALC_STORAGE_KEY, JSON.stringify(buildSlots));
}

function loadBuild() {
    try {
        const saved = JSON.parse(localStorage.getItem(CALC_STORAGE_KEY));
        if (Array.isArray(saved) && saved.length === 6) {
            buildSlots = saved.map(id => (id && itemsDB[id]) ? id : null);
        }
    } catch (e) { /* ignore */ }
}

// === Действия со слотами ===

function addToSlot(itemId) {
    const item = itemsDB[itemId];
    if (!item) return;
    // Если уже есть — не добавляем дубликат
    if (buildSlots.includes(itemId)) return;
    const emptyIndex = buildSlots.indexOf(null);
    if (emptyIndex === -1) return;
    buildSlots[emptyIndex] = itemId;
    saveBuild();
    renderCalc();
}

function removeFromSlot(index) {
    buildSlots[index] = null;
    saveBuild();
    renderCalc();
}

function clearBuild() {
    buildSlots = [null, null, null, null, null, null];
    saveBuild();
    renderCalc();
}

// === Подсчёт ===

function calculateBuildStats() {
    let totalCost = 0;
    let bossDropCount = 0;
    let bossDropCost = 0;
    let recipeCost = 0;
    let baseCost = 0;
    const items = [];

    buildSlots.forEach(id => {
        if (!id) return;
        const item = itemsDB[id];
        if (!item) return;
        const cost = calculateItemCost(id);
        totalCost += cost;

        const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));
        if (isBossDrop) {
            bossDropCount++;
            bossDropCost += cost;
        }

        const recipe = getRecipeCost(item);
        recipeCost += recipe;

        items.push({ id, item, cost, isBossDrop, recipe });
    });

    baseCost = Math.max(0, totalCost - bossDropCost - recipeCost);

    return { totalCost, bossDropCount, bossDropCost, recipeCost, baseCost, items };
}

// === Дедупликация базовых компонентов ===

function collectBaseComponents(itemId, quantity, visited) {
    const item = itemsDB[itemId];
    if (!item) return [];
    if (visited.has(itemId)) return [];
    visited.add(itemId);

    // Базовый предмет (нет компонентов) — это лист покупки
    if (!item.components || item.components.length === 0) {
        return [{ itemId, quantity }];
    }

    // Составной — раскрываем дальше
    let result = [];
    item.components.forEach(comp => {
        const qty = comp.quantity || 1;
        const child = itemsDB[comp.itemId];
        if (!child) return;
        // Рецепт — тоже базовая покупка
        if (child.type === 'recipe') {
            result.push({ itemId: comp.itemId, quantity: qty * quantity });
            return;
        }
        const sub = collectBaseComponents(comp.itemId, qty * quantity, new Set(visited));
        result = result.concat(sub);
    });
    return result;
}

function getDeduplicatedComponents() {
    const componentMap = {};

    buildSlots.forEach(id => {
        if (!id) return;
        const item = itemsDB[id];
        if (!item) return;
        // Босс-дропы — не покупаем
        const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));
        if (isBossDrop) return;

        const bases = collectBaseComponents(id, 1, new Set());
        bases.forEach(({ itemId, quantity }) => {
            if (componentMap[itemId]) {
                componentMap[itemId].quantity += quantity;
            } else {
                const compItem = itemsDB[itemId];
                componentMap[itemId] = {
                    itemId,
                    quantity,
                    name: compItem ? compItem.name : itemId,
                    cost: compItem ? (compItem.cost || 0) : 0,
                    icon: compItem ? compItem.icon : '',
                    type: compItem ? compItem.type : ''
                };
            }
        });
    });

    // Сортировка по стоимости (дешёвые сначала)
    return Object.values(componentMap).sort((a, b) => a.cost - b.cost);
}

// === Рендер слотов ===

function getAttrClass(item) {
    const type = item.type || '';
    if (type.includes('strength')) return 'calc-attr-strength';
    if (type.includes('agility')) return 'calc-attr-agility';
    if (type.includes('intelligence')) return 'calc-attr-intelligence';
    if (type === 'weapon') return 'calc-attr-weapon';
    if (type === 'armor') return 'calc-attr-armor';
    if (type === 'boss_drop') return 'calc-attr-boss';
    if (type === 'neutral') return 'calc-attr-neutral';
    return '';
}

function renderSlots() {
    const container = document.getElementById('calcSlots');
    if (!container) return;

    let html = '';
    buildSlots.forEach((id, index) => {
        if (id && itemsDB[id]) {
            const item = itemsDB[id];
            const cost = calculateItemCost(id);
            const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));
            const attrClass = getAttrClass(item);
            html += `
                <div class="calc-slot calc-slot-filled ${attrClass}" data-index="${index}" title="Убрать ${item.name}">
                    <div class="calc-slot-icon">${itemIcon(item.id, item.icon, 48, item.type)}</div>
                    <div class="calc-slot-name">${item.name}</div>
                    <div class="calc-slot-cost">${isBossDrop ? '💀 Босс' : cost.toLocaleString('ru-RU') + ' 🪙'}</div>
                    <button class="calc-slot-remove" data-index="${index}" title="Убрать"><i class="fas fa-times"></i></button>
                </div>`;
        } else {
            html += `
                <div class="calc-slot calc-slot-empty" data-index="${index}">
                    <i class="fas fa-plus"></i>
                </div>`;
        }
    });
    container.innerHTML = html;

    // Обновить счётчик слотов
    const counter = document.getElementById('calcSlotsCounter');
    if (counter) {
        const filled = buildSlots.filter(id => id !== null).length;
        counter.textContent = `${filled}/6`;
    }

    // Обработчики
    container.querySelectorAll('.calc-slot-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            removeFromSlot(parseInt(btn.dataset.index));
        });
    });
    container.querySelectorAll('.calc-slot-filled').forEach(slot => {
        slot.addEventListener('click', () => {
            removeFromSlot(parseInt(slot.dataset.index));
        });
    });
}

// === Рендер результатов ===

function renderResults() {
    const container = document.getElementById('calcResults');
    if (!container) return;

    const stats = calculateBuildStats();
    const hasItems = stats.items.length > 0;

    if (!hasItems) {
        container.innerHTML = '<div class="calc-results-empty"><i class="fas fa-info-circle"></i> Добавьте предметы в слоты, чтобы увидеть стоимость</div>';
        return;
    }

    container.innerHTML = `
        <div class="calc-results-total">
            <div class="calc-results-label">Итого</div>
            <div class="calc-results-value">${stats.totalCost.toLocaleString('ru-RU')} 🪙</div>
        </div>
        <div class="calc-results-breakdown">
            <div class="calc-results-row">
                <span class="calc-results-row-label">📦 Базовые покупки</span>
                <span class="calc-results-row-value">${stats.baseCost.toLocaleString('ru-RU')} 🪙</span>
            </div>
            <div class="calc-results-row">
                <span class="calc-results-row-label">📜 Рецепты</span>
                <span class="calc-results-row-value">${stats.recipeCost.toLocaleString('ru-RU')} 🪙</span>
            </div>
            ${stats.bossDropCount > 0 ? `
            <div class="calc-results-row calc-results-boss">
                <span class="calc-results-row-label">💀 Босс-дропы (${stats.bossDropCount})</span>
                <span class="calc-results-row-value">бесплатно</span>
            </div>` : ''}
        </div>
        <div class="calc-results-summary">
            Покупок: ${stats.items.length - stats.bossDropCount} | Золота: ${stats.baseCost.toLocaleString('ru-RU')}
            ${stats.bossDropCount > 0 ? ' | Босс-дропов: ' + stats.bossDropCount : ''}
        </div>
        ${renderShoppingList()}`;
}

// === Лист покупок (дедуплицированный) ===

function renderShoppingList() {
    const components = getDeduplicatedComponents();
    if (components.length === 0) return '';

    let html = '<div class="calc-shopping-title">🛒 Лист покупок</div>';
    html += '<div class="calc-shopping-list">';
    components.forEach(comp => {
        const totalCost = comp.cost * comp.quantity;
        const qtyStr = comp.quantity > 1 ? ` ×${comp.quantity}` : '';
        html += `
            <div class="calc-shopping-row">
                <div class="calc-shopping-icon">${itemIcon(comp.itemId, comp.icon, 24, comp.type)}</div>
                <div class="calc-shopping-name">${comp.name}${qtyStr}</div>
                <div class="calc-shopping-cost">${totalCost.toLocaleString('ru-RU')} 🪙</div>
            </div>`;
    });
    html += '</div>';
    return html;
}

// === Рендер дерева компонентов ===

function renderBuildTree() {
    const container = document.getElementById('calcTree');
    if (!container) return;

    const stats = calculateBuildStats();
    if (stats.items.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '<div class="calc-tree-title">📦 Дерево компонентов</div>';
    stats.items.forEach(({ id, item }) => {
        const cost = calculateItemCost(id);
        const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));
        const hasComponents = item.components && item.components.length > 0;
        html += `
            <div class="calc-tree-item">
                <div class="calc-tree-header ${hasComponents ? 'calc-tree-expandable' : ''}" data-tree-id="${id}">
                    ${hasComponents ? '<i class="fas fa-chevron-right calc-tree-chevron"></i>' : ''}
                    <div class="calc-tree-icon">${itemIcon(item.id, item.icon, 32, item.type)}</div>
                    <div class="calc-tree-name">${item.name}</div>
                    <div class="calc-tree-cost">${isBossDrop ? '💀 Босс' : cost.toLocaleString('ru-RU') + ' 🪙'}</div>
                </div>
                <div class="calc-tree-components" data-tree-content="${id}" style="display:none;">
                    ${hasComponents ? renderComponentTree(item.components) : '<p style="color:#8e97aa;">Базовый предмет</p>'}
                </div>
            </div>`;
    });
    container.innerHTML = html;

    // Привязка toggle-кнопок дерева компонентов (внутри раскрывшегося)
    bindItemDetailInteractions(container);

    // Клик по заголовку — раскрыть/свернуть дерево
    container.querySelectorAll('.calc-tree-expandable').forEach(header => {
        header.addEventListener('click', () => {
            const treeId = header.dataset.treeId;
            const content = container.querySelector(`[data-tree-content="${treeId}"]`);
            const chevron = header.querySelector('.calc-tree-chevron');
            if (!content) return;
            const isOpen = content.style.display !== 'none';
            content.style.display = isOpen ? 'none' : 'block';
            if (chevron) {
                chevron.className = isOpen ? 'fas fa-chevron-right calc-tree-chevron' : 'fas fa-chevron-down calc-tree-chevron';
            }
        });
    });
}

// === Каталог выбора ===

const CALC_TABS = [
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
    { key: 'dark_telec', label: 'Тёмный телец' },
    { key: 'boss', label: 'С боссов' },
];

function renderCalcTabs() {
    const container = document.getElementById('calcTabs');
    if (!container) return;
    container.innerHTML = CALC_TABS.map(t =>
        `<button class="tab-btn ${t.key === calcActiveTab ? 'active' : ''}" data-cat="${t.key}">${t.label}</button>`
    ).join('');

    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            calcActiveTab = btn.dataset.cat;
            renderCalcTabs();
            renderCalcCatalog();
        });
    });
}

function renderCalcCatalog() {
    const container = document.getElementById('calcCatalog');
    if (!container) return;

    let itemIds = [];
    if (calcActiveTab === 'all') {
        itemIds = Object.keys(itemsDB).filter(id => {
            const item = itemsDB[id];
            if (!item) return false;
            if (id === 'recipe') return false;
            if (item.type === 'recipe') return false;
            if (item.type === 'boost') return false;
            return true;
        });
    } else {
        const gridKey = 'grid-' + calcActiveTab;
        if (gridKey === 'grid-boost') {
            // Не показываем вкладку boost в калькуляторе
            itemIds = [];
        } else if (grids[gridKey]) {
            itemIds = grids[gridKey].filter(id => {
                const item = itemsDB[id];
                if (!item) return false;
                if (item.type === 'recipe') return false;
                if (item.type === 'boost') return false;
                return true;
            });
        }
    }

    // Фильтр по поиску
    if (calcSearchQuery) {
        const q = calcSearchQuery.toLowerCase();
        itemIds = itemIds.filter(id => {
            const item = itemsDB[id];
            return item && item.name.toLowerCase().includes(q);
        });
    }

    if (itemIds.length === 0) {
        container.innerHTML = '<p style="color:#8e97aa; padding: 16px;">Предметы не найдены</p>';
        return;
    }

    let html = '<div class="calc-catalog-grid">';
    itemIds.forEach(id => {
        const item = itemsDB[id];
        if (!item) return;
        const cost = calculateItemCost(id);
        const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));
        const inBuild = buildSlots.includes(id);
        html += `
            <div class="calc-catalog-item ${inBuild ? 'calc-catalog-in-build' : ''}" data-item-id="${id}" title="${item.name}${inBuild ? ' (уже в сборке)' : ''}">
                <div class="calc-catalog-icon">${itemIcon(item.id, item.icon, 40, item.type)}</div>
                <div class="calc-catalog-name">${item.name}</div>
                <div class="calc-catalog-cost">${isBossDrop ? '💀 Босс' : cost.toLocaleString('ru-RU') + ' 🪙'}</div>
            </div>`;
    });
    html += '</div>';
    container.innerHTML = html;

    // Обработчики клика
    container.querySelectorAll('.calc-catalog-item').forEach(el => {
        el.addEventListener('click', () => {
            addToSlot(el.dataset.itemId);
        });
    });
}

// === Импорт сборки героя ===

const HERO_NAMES = {
    paladin: 'Паладин',
    admiral: 'Адмирал',
    druid: 'Друид',
};

function populateHeroSelect() {
    const select = document.getElementById('calcHeroSelect');
    if (!select) return;
    Object.keys(HERO_NAMES).forEach(key => {
        if (heroBuilds[key]) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = HERO_NAMES[key];
            select.appendChild(opt);
        }
    });
}

function importHeroBuild(heroId) {
    const build = heroBuilds[heroId];
    if (!build) return;
    buildSlots = [null, null, null, null, null, null];
    build.forEach((item, i) => {
        if (i < 6 && itemsDB[item.id]) {
            buildSlots[i] = item.id;
        }
    });
    saveBuild();
    renderCalc();
    // Сбросить селектор, чтобы можно было выбрать того же героя снова
    const heroSelect = document.getElementById('calcHeroSelect');
    if (heroSelect) heroSelect.value = '';
}

// === Поделиться сборкой (URL) ===

function getShareUrl() {
    const filled = buildSlots.filter(id => id !== null);
    if (filled.length === 0) return '';
    const base = window.location.href.split('?')[0];
    return base + '?items=' + filled.join(',');
}

function copyShareUrl() {
    const url = getShareUrl();
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('calcShareBtn');
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Скопировано';
            setTimeout(() => { btn.innerHTML = orig; }, 1500);
        }
    }).catch(() => {
        // Fallback — выделить URL
        prompt('Скопируйте ссылку:', url);
    });
}

function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const itemsParam = params.get('items');
    if (!itemsParam) return false;
    const ids = itemsParam.split(',').filter(id => itemsDB[id]);
    if (ids.length === 0) return false;
    buildSlots = [null, null, null, null, null, null];
    ids.forEach((id, i) => {
        if (i < 6) buildSlots[i] = id;
    });
    saveBuild();
    return true;
}

// === Общий рендер ===

function renderCalc() {
    renderSlots();
    renderResults();
    renderBuildTree();
    renderCalcCatalog();
}

// === Инициализация ===

document.addEventListener('DOMContentLoaded', () => {
    // Загрузка из URL или localStorage
    const loadedFromUrl = loadFromUrl();
    if (!loadedFromUrl) loadBuild();

    renderCalcTabs();
    populateHeroSelect();
    renderCalc();

    // Кнопка очистки
    const clearBtn = document.getElementById('calcClearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearBuild);
    }

    // Выбор героя
    const heroSelect = document.getElementById('calcHeroSelect');
    if (heroSelect) {
        heroSelect.addEventListener('change', () => {
            if (heroSelect.value) {
                importHeroBuild(heroSelect.value);
            }
        });
    }

    // Кнопка «Поделиться»
    const shareBtn = document.getElementById('calcShareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', copyShareUrl);
    }

    // Поиск
    const searchInput = document.getElementById('calcSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            calcSearchQuery = searchInput.value.trim();
            renderCalcCatalog();
        });
    }
});
