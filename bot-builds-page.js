// bot-builds-page.js — логика страницы bot-builds.html
// Зависимости (defer): bot-builds.js (botBuildGroups), jass-data.js (HERO_BUILD_DATA), items-db.js (findItemByName)

document.addEventListener('DOMContentLoaded', function() {
// === Определение параметров URL ===
const urlParams = new URLSearchParams(window.location.search);
const heroRawcode = urlParams.get('rawcode');
const groupParam = urlParams.get('group');

// === findItemByName загружен из items-db.js ===

// === Проверка босс-предмета ===
function isBossItem(item) {
    if (!item) return false;
    return item.type === 'boss_drop' || (item.tags && item.tags.includes('boss'));
}

// === Проверка босс-стадии ===
function isBossStage(stage) {
    return stage.items.some(slot => {
        const item = findItemByName(slot.name);
        return isBossItem(item);
    });
}

// === Иконка предмета ===
function renderItemIcon(item, isTemp, isBoss) {
    if (!item) return '<div class="bb-slot-img"><span class="bb-slot-empty">?</span></div>';
    const imgSrc = `images/items/${item.id}.png`;
    const fallback = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect fill="none" width="64" height="64"/><path d="M32 8 L56 24 L48 56 L16 56 L8 24Z" fill="none" stroke="rgba(0,255,255,0.2)" stroke-width="1"/></svg>')}`;

    let classes = 'bb-slot-img';
    if (isTemp) classes += ' temp-item';
    if (isBoss) classes += ' boss-item';

    let badges = '';
    if (isTemp) badges += '<span class="bb-slot-temp-badge">⏳</span>';
    if (isBoss) badges += '<span class="bb-slot-boss-badge"><i class="fas fa-skull-crossbones"></i></span>';

    return `<div class="${classes}">
        ${badges}
        <img loading="lazy" src="${imgSrc}" alt="" aria-hidden="true" onerror="this.src='${fallback}'">
    </div>`;
}

// === Рендер стадии ===
// prevItems — Map имя→количество из предыдущей стадии (для расчёта стоимости новых)
function renderStage(stageData, stageIndex, prevItems) {
    const boss = isBossStage(stageData);
    const stageClass = boss ? 'bb-stage boss-stage' : 'bb-stage';
    const collapsed = stageIndex > 2 ? ' collapsed' : '';

    // Стоимость стадии — только новые предметы (с учётом дубликатов)
    let stageCost = 0;
    let bossCost = 0;
    let transitionCost = 0; // стоимость перехода с предыдущей стадии
    const currentItems = new Map();
    const itemsHtml = stageData.items.map(slot => {
        const item = findItemByName(slot.name);
        const bItem = isBossItem(item);

        // Подсчёт дубликатов в текущей стадии
        const prevCount = currentItems.get(slot.name) || 0;
        currentItems.set(slot.name, prevCount + 1);

        if (bItem) {
            bossCost += (item ? item.cost : 0) || 0;
        } else if (item) {
            // Считаем стоимость если этого предмета меньше в предыдущей стадии
            const prevHave = prevItems.get(slot.name) || 0;
            const currentHave = currentItems.get(slot.name) || 0;
            if (currentHave > prevHave) {
                stageCost += item.cost || 0;
            }
        }

        const nameClass = 'bb-slot-name' + (bItem ? ' boss-name' : '') + (!slot.keep ? ' temp-name' : '');

        return `<div class="bb-slot">
            ${renderItemIcon(item, !slot.keep, bItem)}
            <div class="${nameClass}" title="${slot.name}${!slot.keep ? ' (продаётся)' : ''}${bItem ? ' (босс-дроп)' : ''}">${slot.name}</div>
        </div>`;
    }).join('');

    // Стоимость перехода: новые предметы + возврат 50% от проданных
    // Предметы, перенесённые с keep=true из предыдущей стадии — бесплатны
    if (stageIndex === 0) {
        transitionCost = stageCost; // первая стадия — полная стоимость
    } else {
        // Считаем сколько нужно купить нового
        const prevKept = new Map(); // предметы с keep=true из предыдущей
        const prevStage = botBuildGroups[currentGroupId].stages[stageIndex - 1];
        if (prevStage) {
            prevStage.items.forEach(s => {
                if (s && s.keep && s.name) {
                    const c = prevKept.get(s.name) || 0;
                    prevKept.set(s.name, c + 1);
                }
            });
        }

        // Новые предметы в текущей стадии (не перенесённые)
        let buyCost = 0;
        const bought = new Map();
        stageData.items.forEach(slot => {
            if (!slot || !slot.name) return;
            const item = findItemByName(slot.name);
            if (!item || isBossItem(item)) return;
            const keptCount = prevKept.get(slot.name) || 0;
            const boughtCount = bought.get(slot.name) || 0;
            if (boughtCount >= keptCount) {
                // Нужно покупать
                buyCost += item.cost || 0;
            }
            bought.set(slot.name, boughtCount + 1);
        });

        // Возврат от проданных предметов предыдущей стадии
        let refund = 0;
        if (prevStage) {
            prevStage.items.forEach(slot => {
                if (!slot || slot.keep || !slot.name) return;
                const item = findItemByName(slot.name);
                if (!item || isBossItem(item)) return;
                refund += Math.floor((item.cost || 0) * 0.5);
            });
        }

        transitionCost = Math.max(0, buyCost - refund);
    }

    // Уровень стадии
    const level = stageData.bootsLevel;
    const levelHtml = level >= 100
        ? `<span class="bb-level-badge">Ур. ${level}</span>`
        : `<span class="bb-level-badge" style="color:var(--text-secondary);">Ур. ${level}</span>`;

    // Стоимость
    let costHtml = '';
    const bossCostStr = bossCost > 0 ? ` + <span class="boss-cost"><i class="fas fa-skull-crossbones"></i> ${bossCost.toLocaleString('ru-RU')}</span>` : '';
    const deltaStr = `<span class="bb-stage-delta">(+${transitionCost.toLocaleString('ru-RU')})</span>`;
    if (stageCost === 0 && bossCost === 0) {
        costHtml = `<span>—</span> ${deltaStr}`;
    } else if (stageCost === 0) {
        costHtml = `<span class="boss-cost"><i class="fas fa-skull-crossbones"></i> ${bossCost.toLocaleString('ru-RU')}</span> ${deltaStr}`;
    } else if (bossCost > 0) {
        costHtml = `<span><i class="fas fa-coins"></i> ${stageCost.toLocaleString('ru-RU')}${bossCostStr}</span> ${deltaStr}`;
    } else {
        costHtml = `<span><i class="fas fa-coins"></i> ${stageCost.toLocaleString('ru-RU')} золота</span> ${deltaStr}`;
    }

    const bossBadge = boss ? '<span class="bb-stage-boss-badge"><i class="fas fa-skull-crossbones"></i> Босс-стадия</span>' : '';

    return { html: `<div class="${stageClass}${collapsed}" data-stage="${stageData.stage}">
        <div class="bb-stage-header" onclick="this.parentElement.classList.toggle('collapsed')">
            <div class="bb-stage-left">
                <span class="bb-stage-num">Стадия ${stageData.stage}</span>
                ${levelHtml}
                ${bossBadge}
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
                <div class="bb-stage-cost">${costHtml}</div>
                <i class="fas fa-chevron-down bb-chevron"></i>
            </div>
        </div>
        <div class="bb-stage-items">${itemsHtml}</div>
    </div>`, currentItems: currentItems, stageCost, bossCost, transitionCost };
}

// === Рендер группы ===
function renderGroup(groupId) {
    currentGroupId = groupId;
    const group = botBuildGroups[groupId];
    if (!group) {
        document.getElementById('stagesContainer').innerHTML = '<p>Группа не найдена</p>';
        const copyBtn = document.getElementById('bbCopyBtn');
        if (copyBtn) copyBtn.style.display = 'none';
        return;
    }

    // Герои в группе (альт-формы скрыты — у них нет страниц героев)
    const altFormIds = new Set((typeof HEROES_DATA !== 'undefined' ? HEROES_DATA : [])
        .filter(h => h.isAltForm).map(h => h.heroId));
    const heroesInGroup = Object.entries(HERO_BUILD_DATA)
        .filter(([_, data]) => data.group === parseInt(groupId))
        .filter(([_, data]) => !data.heroId || !altFormIds.has(data.heroId))
        .map(([rawcode, data]) => ({
            heroId: data.heroId || null,
            name: data.name,
            rawcode: rawcode
        }));

    const heroesHtml = heroesInGroup.map(h => {
        if (h.heroId) {
            return `<a href="heroes/${h.heroId}.html" class="bb-hero-chip">
                <img loading="lazy" src="images/heroes/${h.heroId}.png" alt="" width="20" height="20" style="image-rendering:pixelated;border-radius:4px;object-fit:contain;">
                ${h.name}
            </a>`;
        }
        return `<span class="bb-hero-chip bb-hero-chip-nolink">${h.name}</span>`;
    }).join('');
    document.getElementById('heroesList').innerHTML = heroesHtml;

    // Стадии — считаем стоимость только новых предметов
    let totalCost = 0;
    let totalBossCost = 0;
    let prevItems = new Map();
    let stagesHtml = '';

    group.stages.forEach((stage, i) => {
        const result = renderStage(stage, i, prevItems);
        stagesHtml += result.html;
        totalCost += result.stageCost;
        totalBossCost += result.bossCost || 0;
        prevItems = result.currentItems;
    });

    document.getElementById('stagesContainer').innerHTML = stagesHtml;

    // Итого: золото + босс-дропы отдельно
    const bossStr = totalBossCost > 0
        ? ` + <span class="boss-cost"><i class="fas fa-skull-crossbones"></i> ${totalBossCost.toLocaleString('ru-RU')}</span>`
        : '';
    document.getElementById('totalBlock').style.display = 'flex';
    document.getElementById('totalBlock').innerHTML = `
        <div class="bb-total-label">Итого затрат (<i class="fas fa-skull-crossbones"></i> — босс-дропы, не покупаются)</div>
        <div class="bb-total-value"><i class="fas fa-coins"></i> ${totalCost.toLocaleString('ru-RU')} золота${bossStr}</div>
    `;

    // Показать кнопку копирования
    const copyBtn = document.getElementById('bbCopyBtn');
    if (copyBtn) copyBtn.style.display = 'inline-flex';
}

// === Копирование в конструктор ===
let currentGroupId = null;

function copyToConstructor() {
    if (!currentGroupId || !botBuildGroups[currentGroupId]) return;
    const group = botBuildGroups[currentGroupId];

    // Конвертируем: { name, keep } → { id, keep }
    const stages = group.stages.map(stage => ({
        level: stage.bootsLevel,
        items: stage.items.map(slot => {
            if (!slot || !slot.name) return null;
            const item = findItemByName(slot.name);
            if (!item) return null;
            return { id: item.id, keep: slot.keep !== false };
        })
    }));

    const data = {
        source: 'bot-builds',
        groupId: currentGroupId,
        stages: stages
    };

    localStorage.setItem('buildConstructorImport', JSON.stringify(data));
    window.location.href = 'build-constructor.html?import=1';
}

// === Инициализация ===
function init() {
    let targetGroup = null;

    // Определяем группу из HERO_BUILD_DATA (jass-data.js)
    if (heroRawcode && typeof HERO_BUILD_DATA !== 'undefined' && HERO_BUILD_DATA[heroRawcode]) {
        targetGroup = HERO_BUILD_DATA[heroRawcode].group;
        const heroName = HERO_BUILD_DATA[heroRawcode].name;
        document.getElementById('pageTitle').innerHTML = `<i class="fas fa-robot"></i> Сборка ИИ: ${heroName}`;
        document.getElementById('pageIntro').textContent = `Автосборка для ${heroName} — какие предметы покупает ИИ на каждом этапе.`;
        document.getElementById('breadcrumbs').innerHTML =
            `<a href="index.html">Главная</a><span class="sep">›</span><a href="heroes.html">Герои</a><span class="sep">›</span><span class="current">Сборка ИИ: ${heroName}</span>`;
    } else if (groupParam) {
        targetGroup = parseInt(groupParam);
        document.getElementById('breadcrumbs').innerHTML =
            `<a href="index.html">Главная</a><span class="sep">›</span><a href="items.html">Предметы</a><span class="sep">›</span><span class="current">Сборка ИИ: Группа ${targetGroup}</span>`;
    } else {
        // Дефолтные breadcrumbs
        document.getElementById('breadcrumbs').innerHTML =
            `<a href="index.html">Главная</a><span class="sep">›</span><a href="items.html">Предметы</a><span class="sep">›</span><span class="current">Сборка ИИ</span>`;
    }

    // Кнопки выбора групп
    const groupIds = Object.keys(botBuildGroups).sort((a, b) => a - b);
    const groupBtns = groupIds.map(gid =>
        `<button class="bb-group-btn${parseInt(gid) === targetGroup ? ' active' : ''}" onclick="selectGroup(${gid})">${gid}</button>`
    ).join('');
    document.getElementById('groupSelect').innerHTML = groupBtns;

    if (targetGroup) {
        renderGroup(targetGroup);
    } else if (groupIds.length > 0) {
        renderGroup(groupIds[0]);
    }
}

function selectGroup(gid) {
    // Обновить URL
    const url = new URL(window.location);
    url.searchParams.set('group', gid);
    url.searchParams.delete('rawcode');
    history.pushState({}, '', url);

    // Обновить кнопки
    document.querySelectorAll('.bb-group-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === String(gid));
    });

    // Обновить заголовок
    document.getElementById('pageTitle').innerHTML = `<i class="fas fa-robot"></i> Сборка ИИ: Группа ${gid}`;
    document.getElementById('breadcrumbs').innerHTML =
        `<a href="index.html">Главная</a><span class="sep">›</span><a href="items.html">Предметы</a><span class="sep">›</span><span class="current">Сборка ИИ: Группа ${gid}</span>`;

    renderGroup(gid);
}

window.selectGroup = selectGroup;
window.copyToConstructor = copyToConstructor;
init();
}); // end DOMContentLoaded
