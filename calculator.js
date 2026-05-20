/* ===== Калькулятор сборок предметов ===== */

const CALC_STORAGE_KEY = 'buildCalc'; // Ключ в localStorage
// 6 слотов: null (пустой) или { id: 'I02D', keep: true/false }
// keep=true — предмет остаётся, keep=false — продаётся (возврат 50%)
let buildSlots = [null, null, null, null, null, null];
let calcActiveTab = 'all';
let calcSearchQuery = '';

// === Вспомогательные функции для слотов ===

function calcSlotId(slot) {
    if (!slot) return null;
    if (typeof slot === 'string') return (itemsDB[slot]) ? slot : null;
    if (typeof slot === 'object' && slot.id) return (itemsDB[slot.id]) ? slot.id : null;
    return null;
}

function calcSlotKeep(slot) {
    if (!slot) return true;
    if (typeof slot === 'object' && slot.keep === false) return false;
    return true;
}

function calcMakeSlot(itemId, keep) {
    return { id: itemId, keep: keep !== false };
}

function calcNormalizeSlot(slot) {
    if (!slot) return null;
    if (typeof slot === 'string') return itemsDB[slot] ? { id: slot, keep: true } : null;
    if (typeof slot === 'object' && slot.id && itemsDB[slot.id]) return { id: slot.id, keep: slot.keep !== false };
    return null;
}

// === Сохранение и загрузка из localStorage ===

function saveBuild() {
    localStorage.setItem(CALC_STORAGE_KEY, JSON.stringify(buildSlots));
}

function loadBuild() {
    try {
        const saved = JSON.parse(localStorage.getItem(CALC_STORAGE_KEY));
        if (Array.isArray(saved) && saved.length === 6) {
            buildSlots = saved.map(s => calcNormalizeSlot(s));
        }
    } catch (e) { /* ошибка чтения — игнорируем */ }
}

// === Всплывающее уведомление ===

function calcToast(message) {
    let toast = document.getElementById('calcToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'calcToast';
        toast.className = 'calc-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.classList.remove('visible'); }, 2000);
}

// === Действия со слотами сборки ===

function addToSlot(itemId) {
    const item = itemsDB[itemId];
    if (!item) return;
    // Если уже есть — не добавляем дубликат
    if (buildSlots.some(s => calcSlotId(s) === itemId)) {
        calcToast(`${item.name} уже в сборке`);
        return;
    }
    const emptyIndex = buildSlots.indexOf(null);
    if (emptyIndex === -1) {
        calcToast('Все 6 слотов заняты');
        return;
    }
    buildSlots[emptyIndex] = calcMakeSlot(itemId);
    saveBuild();
    renderCalc();
}

function removeFromSlot(index) {
    buildSlots[index] = null;
    saveBuild();
    renderCalc();
}

function calcToggleKeep(index) {
    const slot = buildSlots[index];
    if (!slot || typeof slot !== 'object') return;
    slot.keep = !slot.keep;
    saveBuild();
    renderCalc();
}

function clearBuild() {
    buildSlots = [null, null, null, null, null, null];
    saveBuild();
    renderCalc();
    // Сбросить заголовок на дефолтный
    const h1 = document.querySelector('h1');
    if (h1) h1.innerHTML = '<i class="fas fa-calculator"></i> Калькулятор сборок';
}

// === Подсчёт стоимости и статистики ===

function calculateBuildStats() {
    let totalCost = 0;
    let refundCost = 0; // возврат от продающихся
    let bossDropCount = 0;
    let bossDropCost = 0;
    let recipeCost = 0;
    let baseCost = 0;
    const items = [];

    buildSlots.forEach(slot => {
        const id = calcSlotId(slot);
        const keep = calcSlotKeep(slot);
        if (!id) return;
        const item = itemsDB[id];
        if (!item) return;
        const cost = calculateItemCost(id);
        totalCost += cost;

        const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));

        // Босс-дропы бесплатные — возврат не начисляется
        if (!keep && !isBossDrop) {
            refundCost += Math.floor(cost * 0.5);
        }

        if (isBossDrop) {
            bossDropCount++;
            bossDropCost += cost;
        }

        const recipe = getRecipeCost(item);
        recipeCost += recipe;

        items.push({ id, item, cost, isBossDrop, recipe, keep });
    });

    baseCost = Math.max(0, totalCost - bossDropCost - recipeCost);
    const netCost = totalCost - refundCost;

    return { totalCost, refundCost, netCost, bossDropCount, bossDropCost, recipeCost, baseCost, items };
}

// === Убираем дубли базовых компонентов ===

function collectBaseComponents(itemId, quantity, visited) {
    const item = itemsDB[itemId];
    if (!item) return [];
    if (visited.has(itemId)) return [];
    visited.add(itemId);

    // Базовый предмет (нет компонентов) — это лист покупки
    if (!item.components || item.components.length === 0) {
        return [{ itemId, quantity }];
    }

    // Составной предмет — раскрываем компоненты дальше
    let result = [];
    item.components.forEach(comp => {
        const qty = comp.quantity || 1;
        const child = itemsDB[comp.itemId];
        if (!child) return;
        // Босс-дроп внутри дерева — бесплатный, не покупаем
        const isBossDrop = child.type === 'boss_drop' || (child.tags && child.tags.includes('boss_drop'));
        if (isBossDrop) return;
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

    buildSlots.forEach(slot => {
        const id = calcSlotId(slot);
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

    // Сортировка: дешёвые сначала
    return Object.values(componentMap).sort((a, b) => a.cost - b.cost);
}

// === Отрисовка слотов ===

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
    buildSlots.forEach((slot, index) => {
        const id = calcSlotId(slot);
        const keep = calcSlotKeep(slot);
        if (id && itemsDB[id]) {
            const item = itemsDB[id];
            const cost = calculateItemCost(id);
            const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));
            const attrClass = getAttrClass(item);
            const tempClass = !keep ? ' calc-slot-temp' : '';
            html += `
                <div class="calc-slot calc-slot-filled ${attrClass}${tempClass}" data-index="${index}" title="${item.name}${!keep ? ' (продаётся)' : ''} — клик для удаления">
                    <div class="calc-slot-icon">${itemIcon(item.id, item.icon, 48, item.type)}</div>
                    <div class="calc-slot-name${!keep ? ' temp-name' : ''}">${item.name}</div>
                    <div class="calc-slot-cost">${isBossDrop ? '💀 Босс' : cost.toLocaleString('ru-RU') + ' 🪙'}${!keep ? ' <span class="calc-badge-temp">⏳ Продаётся</span>' : ''}</div>
                    <button class="calc-slot-keep-toggle" data-index="${index}" title="${keep ? 'Пометить как продающийся' : 'Пометить как остающийся'}"><i class="fas fa-${keep ? 'coins' : 'check-circle'}"></i></button>
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

    // Обновить счётчик заполненных слотов
    const counter = document.getElementById('calcSlotsCounter');
    if (counter) {
        const filled = buildSlots.filter(s => calcSlotId(s) !== null).length;
        counter.textContent = `${filled}/6`;
    }

    // Обработчики кликов
    container.querySelectorAll('.calc-slot-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            removeFromSlot(parseInt(btn.dataset.index));
        });
    });
    container.querySelectorAll('.calc-slot-keep-toggle').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            calcToggleKeep(parseInt(btn.dataset.index));
        });
    });
    container.querySelectorAll('.calc-slot-filled').forEach(slot => {
        slot.addEventListener('click', e => {
            if (e.target.closest('.calc-slot-remove') || e.target.closest('.calc-slot-keep-toggle')) return;
            removeFromSlot(parseInt(slot.dataset.index));
        });
    });
}

// === Отрисовка результатов (стоимость, разбивка) ===

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
            ${stats.refundCost > 0 ? `
            <div class="calc-results-row calc-results-refund">
                <span class="calc-results-row-label">💰 Возврат от продажи</span>
                <span class="calc-results-row-value">−${stats.refundCost.toLocaleString('ru-RU')} 🪙</span>
            </div>
            <div class="calc-results-row calc-results-net">
                <span class="calc-results-row-label">🏷️ Чистые затраты</span>
                <span class="calc-results-row-value">${stats.netCost.toLocaleString('ru-RU')} 🪙</span>
            </div>` : ''}
        </div>
        <div class="calc-results-summary">
            Покупок: ${stats.items.length - stats.bossDropCount} | Золота: ${stats.baseCost.toLocaleString('ru-RU')}
            ${stats.bossDropCount > 0 ? ' | Босс-дропов: ' + stats.bossDropCount : ''}
            ${stats.refundCost > 0 ? ' | Возврат: ' + stats.refundCost.toLocaleString('ru-RU') : ''}
        </div>
        ${renderBuildBonuses()}
        ${renderShoppingList()}`;
}

// === Лист покупок (без дубликатов) ===

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

// === Отрисовка дерева компонентов ===

function renderBuildTree() {
    const container = document.getElementById('calcTree');
    if (!container) return;

    const stats = calculateBuildStats();
    if (stats.items.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '<div class="calc-tree-title">📦 Дерево компонентов</div>';
    stats.items.forEach(({ id, item, keep }) => {
        const cost = calculateItemCost(id);
        const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));
        const hasComponents = item.components && item.components.length > 0;
        const tempBadge = !keep ? ' <span class="calc-badge-temp">⏳</span>' : '';
        html += `
            <div class="calc-tree-item">
                <div class="calc-tree-header ${hasComponents ? 'calc-tree-expandable' : ''}" data-tree-id="${id}">
                    ${hasComponents ? '<i class="fas fa-chevron-right calc-tree-chevron"></i>' : ''}
                    <div class="calc-tree-icon">${itemIcon(item.id, item.icon, 32, item.type)}</div>
                    <div class="calc-tree-name${!keep ? ' temp-name' : ''}">${item.name}${tempBadge}</div>
                    <div class="calc-tree-cost">${isBossDrop ? '💀 Босс' : cost.toLocaleString('ru-RU') + ' 🪙'}</div>
                </div>
                <div class="calc-tree-components" data-tree-content="${id}" style="display:none;">
                    ${hasComponents ? renderComponentTree(item.components) : '<p style="color:var(--text-muted);">Базовый предмет</p>'}
                </div>
            </div>`;
    });
    container.innerHTML = html;

    // Привязка интерактивных элементов внутри дерева
    bindItemDetailInteractions(container);

    // Клик по заголовку — раскрыть/свернуть
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

// === Каталог предметов для выбора ===

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
    { key: 'dark_telec', label: 'Тёмный делец' },
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
            if (item.type === 'rune') return false;
            if (item.hidden) return false;
            return true;
        });
    } else {
        const gridKey = 'grid-' + calcActiveTab;
        if (gridKey === 'grid-boost') {
            // Вкладка boost не показывается в калькуляторе
            itemIds = [];
        } else if (grids[gridKey]) {
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

    // Фильтр по строке поиска
    if (calcSearchQuery) {
        const q = calcSearchQuery.toLowerCase();
        itemIds = itemIds.filter(id => {
            const item = itemsDB[id];
            return item && item.name.toLowerCase().includes(q);
        });
    }

    if (itemIds.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); padding: 16px;">Предметы не найдены</p>';
        return;
    }

    let html = '<div class="calc-catalog-grid">';
    itemIds.forEach(id => {
        const item = itemsDB[id];
        if (!item) return;
        const cost = calculateItemCost(id);
        const isBossDrop = item.type === 'boss_drop' || (item.tags && item.tags.includes('boss_drop'));
        const inBuild = buildSlots.some(s => calcSlotId(s) === id);
        html += `
            <div class="calc-catalog-item ${inBuild ? 'calc-catalog-in-build' : ''}" data-item-id="${id}" title="${item.name}${inBuild ? ' (уже в сборке)' : ''}">
                <div class="calc-catalog-icon">${itemIcon(item.id, item.icon, 40, item.type)}</div>
                <div class="calc-catalog-name">${item.name}</div>
                <div class="calc-catalog-cost">${isBossDrop ? '💀 Босс' : cost.toLocaleString('ru-RU') + ' 🪙'}</div>
            </div>`;
    });
    html += '</div>';
    container.innerHTML = html;

    // Обработчики клика по предмету каталога
    container.querySelectorAll('.calc-catalog-item').forEach(el => {
        el.addEventListener('click', () => {
            addToSlot(el.dataset.itemId);
        });
    });
}

// === Импорт рекомендуемой сборки героя ===

function populateHeroSelect() {
    const select = document.getElementById('calcHeroSelect');
    if (!select) return;
    // Имена из HEROES_DATA (hero-data.js)
    const heroNames = {};
    if (typeof HEROES_DATA !== 'undefined') {
        HEROES_DATA.forEach(h => { if (h.heroId) heroNames[h.heroId] = h.name; });
    }
    // Сначала герои с ручной сборкой
    Object.keys(heroBuilds).forEach(key => {
        const hero = heroBuilds[key];
        if (hero && hero.items && hero.items.length > 0) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = heroNames[key] || hero.name || key;
            select.appendChild(opt);
        }
    });
    // Затем все остальные герои с ИИ-сборкой
    if (typeof HERO_BUILD_DATA !== 'undefined' && typeof botBuildGroups !== 'undefined') {
        var added = new Set(Object.keys(heroBuilds));
        for (var rc in HERO_BUILD_DATA) {
            var h = HERO_BUILD_DATA[rc];
            if (h.heroId && !added.has(h.heroId)) {
                var group = botBuildGroups[h.group];
                if (group && group.stages && group.stages.length > 0) {
                    var opt = document.createElement('option');
                    opt.value = h.heroId;
                    opt.textContent = heroNames[h.heroId] || h.name;
                    opt.setAttribute('data-rawcode', rc);
                    select.appendChild(opt);
                    added.add(h.heroId);
                }
            }
        }
    }
}

function importHeroBuild(heroId) {
    // Сначала пробуем ручную сборку
    const hero = heroBuilds[heroId];
    if (hero && hero.items) {
        buildSlots = [null, null, null, null, null, null];
        hero.items.forEach((item, i) => {
            if (i < 6 && itemsDB[item.id]) {
                buildSlots[i] = calcMakeSlot(item.id);
            }
        });
        saveBuild();
        renderCalc();
        return;
    }

    // Fallback: ИИ-сборка — последняя стадия
    if (typeof HERO_BUILD_DATA !== 'undefined' && typeof botBuildGroups !== 'undefined') {
        var rawcode = null;
        for (var rc in HERO_BUILD_DATA) {
            if (HERO_BUILD_DATA[rc].heroId === heroId) { rawcode = rc; break; }
        }
        if (rawcode) {
            var group = HERO_BUILD_DATA[rawcode].group;
            var stages = botBuildGroups[group] && botBuildGroups[group].stages;
            if (stages && stages.length > 0) {
                var lastStage = stages[stages.length - 1];
                buildSlots = [null, null, null, null, null, null];
                lastStage.items.forEach(function(slot, i) {
                    if (i < 6) {
                        var item = typeof findItemByName === 'function' ? findItemByName(slot.name) : null;
                        if (item) {
                            buildSlots[i] = calcMakeSlot(item.id);
                        }
                    }
                });
                saveBuild();
                renderCalc();
                return;
            }
        }
    }
}

// === Поделиться сборкой (ссылка) ===

function getShareUrl() {
    const filled = buildSlots.filter(s => calcSlotId(s) !== null);
    if (filled.length === 0) return '';
    const base = window.location.href.split('?')[0];
    // Формат: items=I02D,I03G!  (! после id = продаётся)
    const itemsStr = filled.map(s => {
        const id = calcSlotId(s);
        return calcSlotKeep(s) ? id : id + '!';
    }).join(',');
    return base + '?items=' + itemsStr;
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
        // Запасной вариант — показать URL в диалоге
        prompt('Скопируйте ссылку:', url);
    });
}

function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const heroParam = params.get('hero');
    const itemsParam = params.get('items');

    // Показать имя героя, если передано в URL
    if (heroParam && typeof heroBuilds !== 'undefined' && heroBuilds[heroParam]) {
        const heroName = heroBuilds[heroParam].name || heroParam;
        const h1 = document.querySelector('h1');
        if (h1) h1.innerHTML = '<i class="fas fa-calculator"></i> Сборка: ' + heroName;
        const heroSelect = document.getElementById('calcHeroSelect');
        if (heroSelect) heroSelect.value = heroParam;
    } else if (heroParam) {
        // Герой не найден в heroBuilds — сбросить на дефолт
        const h1 = document.querySelector('h1');
        if (h1) h1.innerHTML = '<i class="fas fa-calculator"></i> Калькулятор сборок';
    }

    // Если items не передан, но есть hero — загрузить из heroBuilds
    if (!itemsParam && heroParam && typeof heroBuilds !== 'undefined' && heroBuilds[heroParam]) {
        const heroItems = heroBuilds[heroParam].items;
        if (Array.isArray(heroItems) && heroItems.length > 0) {
            buildSlots = [null, null, null, null, null, null];
            heroItems.forEach((item, i) => {
                if (i < 6 && item && item.id) {
                    buildSlots[i] = calcMakeSlot(item.id, item.keep !== false);
                }
            });
            saveBuild();
            if (window.history.replaceState) {
                window.history.replaceState({}, '', window.location.pathname);
            }
            return true;
        }
    }

    if (!itemsParam) return false;
    // Парсим: I02D,I03G!  (! = продаётся)
    const parts = itemsParam.split(',');
    const slots = parts.map(p => {
        const sold = p.endsWith('!');
        const id = sold ? p.slice(0, -1) : p;
        if (!itemsDB[id]) return null;
        return calcMakeSlot(id, !sold);
    }).filter(Boolean);
    if (slots.length === 0) return false;
    buildSlots = [null, null, null, null, null, null];
    slots.forEach((slot, i) => {
        if (i < 6) buildSlots[i] = slot;
    });
    saveBuild();
    // Очистить URL-параметры, чтобы при обновлении страницы не перезагружать старую сборку
    if (window.history.replaceState) {
        window.history.replaceState({}, '', window.location.pathname);
    }
    return true;
}

// === Общая отрисовка всех секций ===

function renderCalc() {
    renderSlots();
    renderResults();
    renderBuildTree();
    renderCalcCatalog();
}

// === Запуск при загрузке страницы ===

document.addEventListener('DOMContentLoaded', () => {
    // Загрузка из URL или localStorage
    const loadedFromUrl = loadFromUrl();
    if (!loadedFromUrl) loadBuild();

    renderCalcTabs();
    populateHeroSelect();
    renderCalc();

    // Кнопка «Очистить сборку»
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
            } else {
                const h1 = document.querySelector('h1');
                if (h1) h1.innerHTML = '<i class="fas fa-calculator"></i> Калькулятор сборок';
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

// === Суммарные бонусы всех предметов сборки ===

function renderBuildBonuses() {
    if (typeof ItemBonusParser === 'undefined') return '';

    const bonuses = buildSlots.filter(Boolean).map(slot => {
        const id = calcSlotId(slot);
        if (!id) return null;
        const item = itemsDB[id];
        return item ? ItemBonusParser.parseDescription(item.description || '') : null;
    }).filter(Boolean);

    if (!bonuses.length) return '';

    const total = ItemBonusParser.sumBonuses(bonuses);
    const chips = [];

    const add = (label, value, suffix = '') => {
        if (!value) return;
        const normalized = Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '');
        chips.push(`<span class="cost-badge">${label}: +${normalized}${suffix}</span>`);
    };

    // Бонус атаки от основного атрибута героя
    // В LoW: +1 атака за каждое очко основного атрибута
    const heroId = getCurrentHeroId();
    if (heroId && typeof HEROES_DATA !== 'undefined') {
        const hero = HEROES_DATA.find(h => h.heroId === heroId);
        if (hero && hero.attr) {
            // Суммарный бонус атрибута от предметов
            let attrBonus = 0;
            if (hero.attr === 'strength') attrBonus = total.strength + total.allStats;
            else if (hero.attr === 'agility') attrBonus = total.agility + total.allStats;
            else if (hero.attr === 'intelligence') attrBonus = total.intelligence + total.allStats;

            if (attrBonus > 0) {
                add('Атака от ' + (hero.attr === 'strength' ? 'Силы' : hero.attr === 'agility' ? 'Ловкости' : 'Разума'), attrBonus);
            }
        }
    }

    add('Все атрибуты', total.allStats);
    add('Сила', total.strength);
    add('Ловкость', total.agility);
    add('Разум', total.intelligence);
    add('Жизни', total.hp);
    add('Мана', total.mana);
    add('Атака', total.attack);
    add('Броня', total.armor);
    add('Маг. защита', total.magicDefenseFlat);
    add('Маг. защита', total.magicDefensePct, '%');
    add('Реген HP', total.hpRegenFlat);
    add('Реген HP', total.hpRegenPct, '%');
    add('Реген маны', total.manaRegenFlat);
    add('Реген маны', total.manaRegenPct, '%');
    add('Мана при атаке', total.manaOnAttack);
    add('Уклонение', total.evasionPct, '%');
    add('Крит. шанс', total.critChancePct, '%');
    add('Крит. урон', total.critDamagePct, '%');
    add('Урон заклинаний', total.spellDamagePct, '%');
    add('Вампиризм', total.vampirismPct, '%');
    add('Маг. вампиризм', total.magicVampirismPct, '%');
    add('Маг. блок', total.magicBlockPct, '%');
    add('Стан-резист', total.stunResistPct, '%');
    add('Мана-бёрн резист', total.manaBurnResistPct, '%');
    add('Аура брони', total.auraArmor);
    add('Аура AS', total.auraAttackSpeedPct, '%');
    add('Аура MS', total.auraMoveSpeedPct, '%');
    add('Скорость атаки', total.attackSpeedPct, '%');
    add('Скорость бега', total.movementSpeedFlat);
    add('Скорость бега', total.movementSpeedPct, '%');

    if (!chips.length) return '';

    return `<div class="calc-bonuses-title">📈 Суммарные бонусы</div><div class="cost-badges">${chips.join('')}</div>`;
}

// Получить текущий heroId из селектора или URL
function getCurrentHeroId() {
    const heroSelect = document.getElementById('calcHeroSelect');
    if (heroSelect && heroSelect.value) return heroSelect.value;
    const params = new URLSearchParams(window.location.search);
    return params.get('hero') || null;
}
