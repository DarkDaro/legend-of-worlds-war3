// hero-slugs.js — маппинг hero rawcode → heroId slug (для URL bot-builds.html?hero=<slug>)
// АВТОГЕНЕРИРОВАНО _gen_hero-slugs.js из jass-data.js (HERO_BUILD_DATA) — НЕ редактировать вручную.
// Регенерация: node C:/AgentLetta/scripts/transfer/_gen_hero_slugs.js. Датировано: 24.10.

const HERO_RAWCODES = {
  'E000': 'illusionist',
  'E001': 'druid',
  'E002': 'illusionist-demon',
  'E004': 'murloc',
  'E006': 'leshy',
  'E00H': 'warrioress',
  'E00O': 'dark-archer',
  'E010': 'priestess',
  'E011': 'astral-executioner',
  'E020': 'guardian',
  'E02O': 'zodiac',
  'E03H': 'spirit-of-nature',
  'E03S': 'night-predator',
  'H000': 'cyborg',
  'H001': 'ranger',
  'H00F': 'warrior-of-light',
  'H00H': 'paladin',
  'H00V': 'dark-lord',
  'H011': 'sorcerer',
  'H01U': 'bonebreaker',
  'H02A': 'fire-knight',
  'H02F': 'dark-mage',
  'H02G': 'wind-enchantress',
  'H02P': 'archmage',
  'H037': 'shadow',
  'H03H': 'marine',
  'H03J': 'admiral',
  'H046': 'lightning-subjugator',
  'H04E': 'air-mage',
  'H055': 'astral-mage',
  'H06G': 'necromonger',
  'H07A': 'deep-warrior',
  'H07E': 'dark-master',
  'H088': 'chaos-lord-chaos',
  'H089': 'father-of-darkness',
  'H08A': 'hell-gatekeeper',
  'H08O': 'flame-eater',
  'H08T': 'chaos-witcher',
  'H09N': 'dark-knight',
  'H0AG': 'astral-huntress',
  'N002': 'brewmaster',
  'N005': 'fire-lord',
  'N00E': 'storm',
  'N00I': 'destroyer',
  'O000': 'samurai',
  'O001': 'thundergod',
  'O002': 'ghost',
  'O003': 'rider',
  'O004': 'rider-mounted',
  'O005': 'sea-guard',
  'O006': 'minotaur-chief',
  'O007': 'wind-lord',
  'O008': 'flame-berserker',
  'O009': 'flame-berserker-alt',
  'O00A': 'orc-chieftain',
  'O00B': 'titan',
  'O00C': 'titan-enraged',
  'O00D': 'vurdalak',
  'O00E': 'skeleton',
  'O00F': 'storm-knight',
  'O00G': 'knight-of-depths',
  'O00H': 'lightning-lord',
  'O00I': 'dark-shaman',
  'O00J': 'snow-queen',
  'O00K': 'star-spirit',
  'O00L': 'water-spirit',
  'O00M': 'demon',
  'O00N': 'hydralisk',
  'O00O': 'night-avenger',
  'O00P': 'rebel',
  'O010': 'assassin',
  'O011': 'fire-panda',
  'U000': 'frost-lord',
  'U001': 'butcher',
  'U006': 'vampire',
  'U007': 'fire-golem-hero',
  'U009': 'king-of-cursed',
  'U00A': 'chaos-lord',
  'U00B': 'chaos-lord-alt',
  'U01J': 'grave-lord',
  'U01T': 'ice-knight',
};

// Обратный маппинг (автогенерация)
const HERO_SLUG_TO_RAWCODE = Object.fromEntries(
  Object.entries(HERO_RAWCODES).map(([k, v]) => [v, k])
);

// slug → rawcode. Фолбэк: вернуть как есть (backward compat со старыми rawcode-URL).
function heroRawcodeFromSlug(slug) {
  if (!slug) return slug;
  return HERO_SLUG_TO_RAWCODE[slug] || slug;
}

// rawcode → slug. Фолбэк: вернуть как есть.
function heroSlugFromRawcode(rawcode) {
  if (!rawcode) return rawcode;
  return HERO_RAWCODES[rawcode] || rawcode;
}
