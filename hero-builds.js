const heroBuilds = {
  illusionist: {
    name: "illusionist",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I0EO', name: 'Нефритовые клинки' },
      { id: 'I0AI', name: 'Посох разрушения' },
      { id: 'I0GI', name: 'Адская маска' },
      { id: 'I0B1', name: 'Звёздный лук' },
    ],
  },
  druid: {
    name: "druid",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I0AF', name: 'Антимагические доспехи' },
      { id: 'I01A', name: 'Кровавая луна II' },
      { id: 'I0A5', name: 'Нерубский доспех' },
      { id: 'I02D', name: 'Щит джаггернаута' },
    ],
  },
  murloc: {
    name: "murloc",
    items: [
      { id: 'I0AC', name: 'Коса смерти' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I01A', name: 'Кровавая луна II' },
      { id: 'I03Z', name: 'Кровавый клинок' },
      { id: 'I03J', name: 'Меч чёрной магии' },
      { id: 'I0BV', name: 'Демоническая сущность' },
    ],
  },
  leshy: {
    name: "leshy",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I0BD', name: 'Сфера мистицизма' },
      { id: 'I0EY', name: 'Скипетр Владыки II' },
      { id: 'I0CN', name: 'Сфера магии' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I0BV', name: 'Демоническая сущность' },
    ],
  },
  'dark-archer': {
    name: "dark-archer",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I0AF', name: 'Антимагические доспехи' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I0B1', name: 'Звёздный лук' },
      { id: 'I03Z', name: 'Кровавый клинок' },
      { id: 'I04G', name: 'Меч тьмы' },
    ],
  },
  cyborg: {
    name: "cyborg",
    items: [
      { id: 'I0AC', name: 'Коса смерти' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I01A', name: 'Кровавая луна II' },
      { id: 'I03Z', name: 'Кровавый клинок' },
      { id: 'I03J', name: 'Меч чёрной магии' },
      { id: 'I0BV', name: 'Демоническая сущность' },
    ],
  },
  paladin: {
    name: "paladin",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I0EY', name: 'Скипетр Владыки II' },
      { id: 'I01A', name: 'Кровавая луна II' },
      { id: 'I0B6', name: 'Щит джаггернаута II' },
      { id: 'I03L', name: 'Меч вечной стужи' },
    ],
  },
  archmage: {
    name: "archmage",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I08Y', name: 'Посох грома' },
      { id: 'I0EY', name: 'Скипетр Владыки II' },
      { id: 'I02D', name: 'Щит джаггернаута' },
      { id: 'I03Z', name: 'Кровавый клинок' },
      { id: 'I0CN', name: 'Сфера магии' },
    ],
  },
  admiral: {
    name: "admiral",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I0AF', name: 'Антимагические доспехи' },
      { id: 'I01A', name: 'Кровавая луна II' },
      { id: 'I0A5', name: 'Нерубский доспех' },
      { id: 'I02D', name: 'Щит джаггернаута' },
    ],
  },
  necromonger: {
    name: "necromonger",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I08Y', name: 'Посох грома' },
      { id: 'I0EY', name: 'Скипетр Владыки II' },
      { id: 'I02D', name: 'Щит джаггернаута' },
      { id: 'I03Z', name: 'Кровавый клинок' },
      { id: 'I0CN', name: 'Сфера магии' },
    ],
  },
  samurai: {
    name: "samurai",
    items: [
      { id: 'I0AC', name: 'Коса смерти' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I01A', name: 'Кровавая луна II' },
      { id: 'I03Z', name: 'Кровавый клинок' },
      { id: 'I03J', name: 'Меч чёрной магии' },
      { id: 'I0BV', name: 'Демоническая сущность' },
    ],
  },
  thundergod: {
    name: "thundergod",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I08Y', name: 'Посох грома' },
      { id: 'I0EY', name: 'Скипетр Владыки II' },
      { id: 'I02D', name: 'Щит джаггернаута' },
      { id: 'I03Z', name: 'Кровавый клинок' },
      { id: 'I0CN', name: 'Сфера магии' },
    ],
  },
  'frost-lord': {
    name: "frost-lord",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I0AI', name: 'Посох разрушения' },
      { id: 'I0BJ', name: 'Кристальный щит' },
      { id: 'I09R', name: 'Ледяной дух' },
      { id: 'I0EY', name: 'Скипетр Владыки II' },
      { id: 'I0BD', name: 'Сфера мистицизма' },
    ],
  },
};

// Иконка предмета (PNG), при ошибке — SVG-силуэт без эмодзи
function getBuildItemIcon(itemId, size) {
  size = size || 48;
  const pngSrc = '../images/items/' + itemId + '.png';
  const svgFallback = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 48 48"><path d="M24 8 L36 20 L36 36 L12 36 L12 20 Z" fill="none" stroke="#4a9eff" stroke-width="1.5" opacity="0.4"/></svg>');
  return '<img src="' + pngSrc + '" alt="" width="' + size + '" height="' + size + '" style="image-rendering:pixelated;object-fit:contain;" onerror="this.src=\'' + svgFallback + '\';">';
}

// Отрисовка сетки сборки для карточки героя
function renderHeroBuild(heroId) {
  // Сначала проверяем ручную сборку
  const hero = heroBuilds[heroId];
  if (hero && hero.items) {
    let html = '<div class="hero-build-grid">';
    hero.items.forEach(item => {
      html += `
      <a href="../items.html?item=${item.id}" class="build-slot">
        <div class="build-icon">${getBuildItemIcon(item.id)}</div>
        <div class="build-name">${item.name}</div>
      </a>`;
    });
    html += '</div>';
    return html;
  }

  // Fallback: берём последнюю стадию из botBuilds
  if (typeof HERO_BUILD_DATA !== 'undefined' && typeof botBuildGroups !== 'undefined') {
    // Находим rawcode героя
    var rawcode = null;
    for (var rc in HERO_BUILD_DATA) {
      if (HERO_BUILD_DATA[rc].heroId === heroId) {
        rawcode = rc;
        break;
      }
    }
    if (rawcode) {
      var group = HERO_BUILD_DATA[rawcode].group;
      var stages = botBuildGroups[group] && botBuildGroups[group].stages;
      if (stages && stages.length > 0) {
        var lastStage = stages[stages.length - 1];
        var html = '<div class="hero-build-grid">';
        lastStage.items.forEach(function(slot) {
          // Ищем предмет по имени в itemsDB
          var item = null;
          if (typeof findItemByName === 'function') {
            item = findItemByName(slot.name);
          }
          if (item) {
            html += '<a href="../items.html?item=' + item.id + '" class="build-slot">' +
              '<div class="build-icon">' + getBuildItemIcon(item.id) + '</div>' +
              '<div class="build-name">' + item.name + '</div></a>';
          } else {
            html += '<div class="build-slot">' +
              '<div class="build-icon"><span style="color:#666;font-size:0.7rem;">?</span></div>' +
              '<div class="build-name">' + slot.name + '</div></div>';
          }
        });
        html += '</div>';
        html += '<p style="color:var(--text-muted);font-size:0.75rem;margin-top:6px;">Финальная стадия ИИ-сборки · <a href="../bot-builds.html?rawcode=' + rawcode + '" style="color:var(--accent-cyan);">Все стадии →</a></p>';
        return html;
      }
    }
  }

  return '<p style="color:var(--text-muted);">Сборка в разработке...</p>';
}

