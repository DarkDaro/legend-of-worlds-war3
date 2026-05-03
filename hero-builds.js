// hero-builds.js — Рекомендуемые сборки героев
// Каждый герой содержит массив предметов с id и названием

const heroBuilds = {
  paladin: [
    { id: 'I03G', name: 'Огненный щит' },
    { id: 'I045', name: 'Доспехи дракона' },
    { id: 'I0AF', name: 'Антимагические доспехи' },
    { id: 'I04H', name: 'Маска демона' },
    { id: 'I0E5', name: 'Меч очищения' },
    { id: 'I0DB', name: 'Скипетр Владыки I' },
  ],
  admiral: [
    { id: 'I03G', name: 'Огненный щит' },
    { id: 'I09T', name: 'Рыцарский щит' },
    { id: 'I02B', name: 'Доспехи полководца' },
    { id: 'I04H', name: 'Маска демона' },
    { id: 'I033', name: 'Меч ярости' },
    { id: 'I0DB', name: 'Скипетр Владыки I' },
  ],
  druid: [
    { id: 'I030', name: 'Сапоги божественной ловкости' },
    { id: 'I09R', name: 'Ледяной дух' },
    { id: 'I08Y', name: 'Посох грома' },
    { id: 'I045', name: 'Доспехи дракона' },
    { id: 'I0DB', name: 'Скипетр Владыки I' },
    { id: 'I01A', name: 'Кровавая луна II' },
  ],
};

// Получить иконку предмета (PNG)
function getBuildItemIcon(itemId, size) {
  size = size || 48;
  const pngSrc = '../images/items/' + itemId + '.png';
  const emoji = getItemEmoji(itemId);
  const escaped = emoji.replace(/'/g, "\\'");
  return '<img src="' + pngSrc + '" alt="" width="' + size + '" height="' + size + '" style="image-rendering:pixelated;object-fit:contain;" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22' + size + '%22 height=%22' + size + '%22 viewBox=%220 0 48 48%22><text x=%2224%22 y=%2236%22 font-size=%2232%22 text-anchor=%22middle%22>' + encodeURIComponent(emoji) + '</text></svg>\';">';
}

// Рендер сборки для героя
function renderHeroBuild(heroId) {
  const build = heroBuilds[heroId];
  if (!build) return '<p style="color:#6b7c99;">Сборка в разработке...</p>';

  let html = '<div class="hero-build-grid">';
  build.forEach(item => {
    html += `
      <a href="../items.html?item=${item.id}" class="build-slot">
        <div class="build-icon">${getBuildItemIcon(item.id)}</div>
        <div class="build-name">${item.name}</div>
      </a>`;
  });
  html += '</div>';
  return html;
}

// Emoji для fallback
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