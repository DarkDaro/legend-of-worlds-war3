// 24.10: фильтр предметов по бонусам и золоту, сортировка.
// Работает через хук BonusFilter.matches() внутри applyItemView (items-db.js).
// Группы бонусов собраны из ItemBonusParser (30 полей → 6 смысловых групп).
(function () {
  'use strict';

  // Какие поля парсера входят в каждую группу
  var GROUPS = {
    attack:  ['attack', 'attackSpeedPct', 'critChancePct', 'critDamagePct', 'spellDamagePct', 'vampirismPct', 'magicVampirismPct', 'manaOnAttack'],
    defense: ['armor', 'magicDefenseFlat', 'magicDefensePct', 'evasionPct', 'magicBlockPct', 'stunResistPct', 'manaBurnResistPct', 'auraArmor'],
    hp:      ['hp', 'hpRegenFlat', 'hpRegenPct'],
    mana:    ['mana', 'manaRegenFlat', 'manaRegenPct'],
    stats:   ['allStats', 'strength', 'agility', 'intelligence'],
    speed:   ['movementSpeedFlat', 'movementSpeedPct', 'auraMoveSpeedPct', 'auraAttackSpeedPct']
  };

  var state = {
    bonus: null,      // ключ группы или null
    priceMax: null,   // число или null
    sort: 'default'
  };

  var bonusCache = {};   // itemId -> { attack: bool, defense: bool, ... }

  function parseBonuses(item) {
    if (typeof ItemBonusParser === 'undefined') return null;
    try { return ItemBonusParser.parseDescription(item.description || ''); }
    catch (e) { return null; }
  }

  // Заранее посчитать, к каким группам относится предмет (кэш)
  function groupsOf(item) {
    if (bonusCache[item.id]) return bonusCache[item.id];
    var bonus = parseBonuses(item);
    var result = {};
    if (bonus) {
      for (var g in GROUPS) {
        result[g] = GROUPS[g].some(function (f) { return bonus[f] && bonus[f] !== 0; });
      }
    }
    bonusCache[item.id] = result;
    return result;
  }

  function priceOf(item) {
    if (!item) return Infinity;
    var cost = Number(item.cost);
    if (isFinite(cost) && cost > 0) return cost;
    // предметы с компонентами — посчитать по рецепту, если доступно
    if (typeof calculateItemCost === 'function') {
      try {
        var c = calculateItemCost(item.id);
        if (isFinite(c) && c > 0) return c;
      } catch (e) { /* нет данных — не страшно */ }
    }
    return Infinity;
  }

  var BonusFilter = {
    // Главная проверка: подходит ли предмет под фильтр
    matches: function (item) {
      if (!item) return true;

      // фильтр по группе бонусов
      if (state.bonus) {
        var groups = groupsOf(item);
        if (!groups[state.bonus]) return false;
      }

      // фильтр по золоту
      if (state.priceMax !== null) {
        var p = priceOf(item);
        if (!isFinite(p) || p > state.priceMax) return false;
      }

      return true;
    },

    // Компаратор для сортировки внутри секции
    compare: function (a, b) {
      if (state.sort === 'price-asc' || state.sort === 'price-desc') {
        var pa = priceOf(a), pb = priceOf(b);
        if (pa === pb) return 0;
        // предметы без цены — всегда в конце
        if (!isFinite(pa)) return 1;
        if (!isFinite(pb)) return -1;
        return state.sort === 'price-asc' ? pa - pb : pb - pa;
      }
      if (state.sort === 'name') {
        return String(a.name || '').localeCompare(String(b.name || ''), 'ru');
      }
      return 0;
    },

    get state() { return state; },
    get active() { return state.bonus !== null || state.priceMax !== null; },
    get sorting() { return state.sort !== 'default'; },

    groupCounts: function (items) {
      var counts = {};
      items.forEach(function (item) {
        var g = groupsOf(item);
        for (var k in g) if (g[k]) counts[k] = (counts[k] || 0) + 1;
      });
      return counts;
    }
  };

  window.BonusFilter = BonusFilter;

  // ---------- UI ----------
  function refresh() {
    if (typeof applyItemView === 'function') applyItemView();

    // подсветка активного чипа
    document.querySelectorAll('.bonus-chip').forEach(function (b) {
      b.classList.toggle('active', b.dataset.bonus === state.bonus);
      b.setAttribute('aria-pressed', b.dataset.bonus === state.bonus ? 'true' : 'false');
    });

    // кнопка сброса
    var reset = document.getElementById('bonusReset');
    if (reset) reset.hidden = !(state.bonus !== null || state.priceMax !== null || state.sort !== 'default');

    // пустое состояние
    var empty = document.getElementById('bonusFilterEmpty');
    if (empty) {
      var anyVisible = false;
      document.querySelectorAll('.item-card').forEach(function (c) {
        if (c.style.display !== 'none') anyVisible = true;
      });
      empty.hidden = anyVisible || !(state.bonus !== null || state.priceMax !== null);
    }
  }

  function resetAll() {
    state.bonus = null;
    state.priceMax = null;
    state.sort = 'default';
    var price = document.getElementById('priceMax');
    if (price) price.value = '';
    var sort = document.getElementById('itemSort');
    if (sort) sort.value = 'default';
    refresh();
  }

  function init() {
    // чипы
    document.querySelectorAll('.bonus-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.bonus;
        state.bonus = (state.bonus === key) ? null : key;   // повторный клик снимает
        refresh();
      });
    });

    // цена
    var price = document.getElementById('priceMax');
    if (price) {
      var timer = null;
      price.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          var v = parseInt(price.value, 10);
          state.priceMax = (isFinite(v) && v > 0) ? v : null;
          refresh();
        }, 220);
      });
    }

    // сортировка
    var sort = document.getElementById('itemSort');
    if (sort) {
      sort.addEventListener('change', function () {
        state.sort = sort.value || 'default';
        refresh();
      });
    }

    // сброс
    var reset = document.getElementById('bonusReset');
    if (reset) reset.addEventListener('click', resetAll);
    var emptyReset = document.getElementById('bonusFilterEmptyReset');
    if (emptyReset) emptyReset.addEventListener('click', resetAll);

    // подписать чипы счётчиками
    if (typeof itemsDB !== 'undefined') {
      var all = Object.keys(itemsDB).map(function (k) { return itemsDB[k]; })
        .filter(function (i) { return !i.hidden && i.type !== 'rune'; });
      var counts = BonusFilter.groupCounts(all);
      document.querySelectorAll('.bonus-chip').forEach(function (b) {
        var n = counts[b.dataset.bonus];
        if (n) b.title = 'Предметов с этим бонусом: ' + n;
      });
    }

    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
