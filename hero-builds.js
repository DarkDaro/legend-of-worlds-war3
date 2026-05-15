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
  'u-priestess': {
    name: "u-priestess",
    items: [
      { id: 'I0GJ', name: 'Клеймор' },
      { id: 'I0B4', name: 'Защита ада' },
      { id: 'I0EO', name: 'Нефритовые клинки' },
      { id: 'I0AI', name: 'Посох разрушения' },
      { id: 'I0GI', name: 'Адская маска' },
      { id: 'I0B1', name: 'Звёздный лук' },
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

// Иконка предмета (PNG), при ошибке — SVG-заглушка с emoji
function getBuildItemIcon(itemId, size) {
  size = size || 48;
  const pngSrc = '../images/items/' + itemId + '.png';
  const emoji = getItemEmoji(itemId);
  const escaped = emoji.replace(/'/g, "\\'");
  return '<img src="' + pngSrc + '" alt="" width="' + size + '" height="' + size + '" style="image-rendering:pixelated;object-fit:contain;" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22' + size + '%22 height=%22' + size + '%22 viewBox=%220 0 48 48%22><text x=%2224%22 y=%2236%22 font-size=%2232%22 text-anchor=%22middle%22>' + encodeURIComponent(emoji) + '</text></svg>\';">';
}

// Отрисовка сетки сборки для карточки героя
function renderHeroBuild(heroId) {
  const hero = heroBuilds[heroId];
  if (!hero || !hero.items) return '<p style="color:#6b7c99;">Сборка в разработке...</p>';

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

// Emoji-заглушки для предметов без иконки
function getItemEmoji(itemId) {
  const icons = {
    I03G: '🔥🛡️',
    I045: '🐉🛡️✨',
    I0AF: '🛡️🚫',
    I04H: '👹🎭',
    I0E5: '⚔️✨',
    I0DB: '👑🔮',
    I09T: '🛡️⚔️',
    I02B: '🛡️👑',
    I033: '⚔️💢',
    I030: '👢✨',
    I09R: '❄️👻',
    I08Y: '🌩️🔮',
    I01A: '🌑🩸✨',
  };
  return icons[itemId] || '📦';
}