// ========== БАЗА ДАННЫХ КРИПОВ ==========
// Данные из Object Editor (unit.ini) + ручные правки
// passives: массив пассивных способностей
// xp: 0 — заполнить из игры (зависит от констант карты)
// tier: тир усиления (CreepBonusSystem, 1-8)

// Тиры крипов — бонус за каждый уровень (каждые 3 мин)
var CREEP_TIERS = [
  null, // 0 — нет тира
  { atk: 1, hp: 10, as: 1, armInterval: 10, label: 'Тир 1' },
  { atk: 2, hp: 15, as: 1, armInterval: 5, label: 'Тир 2' },
  { atk: 2, hp: 20, as: 1, armInterval: 5, label: 'Тир 3' },
  { atk: 3, hp: 25, as: 1, armInterval: 5, label: 'Тир 4' },
  { atk: 4, hp: 40, as: 2, armInterval: 3, label: 'Тир 5' },
  { atk: 5, hp: 60, as: 2, armInterval: 3, label: 'Тир 6' },
  { atk: 7, hp: 80, as: 2, armInterval: 2, label: 'Тир 7' },
  { atk: 10, hp: 150, as: 3, armInterval: 1, label: 'Тир 8' }
];

var CREEP_LEVEL_INTERVAL = 180; // секунды между уровнями крипов (3 мин)

var CREEPS_DB = [
  // Тир 1
  { code: 'nban', name: 'Разбойник', level: 2, hp: 300, atk: 12, def: 1, defType: 'medium', regen: 1, cool: 1.0, spd: 275, magicRes: 0, gold: 11, xp: 0, tier: 1, passives: [] },
  { code: 'nanb', name: 'Арахнид', level: 2, hp: 300, atk: 12, def: 1, defType: 'Flesh', regen: 1, cool: 1.5, spd: 295, magicRes: 0, gold: 11, xp: 0, tier: 1, passives: [] },
  // Тир 2
  { code: 'h02R', name: 'Марлог', level: 3, hp: 445, atk: 25, def: 2, defType: 'heavy', regen: 2, cool: 1.6, spd: 260, magicRes: 0, gold: 15, xp: 0, tier: 2, passives: ['evasion-25'] },
  { code: 'h02T', name: 'Марлог-охотник', level: 3, hp: 445, atk: 23, def: 2, defType: 'heavy', regen: 3, cool: 1.6, spd: 300, magicRes: 0, gold: 20, xp: 0, tier: 2, passives: ['evasion-30'] },
  { code: 'h0AF', name: 'Сатир', level: 4, hp: 520, atk: 25, def: 2, defType: 'heavy', regen: 3, cool: 1.6, spd: 260, magicRes: 0, gold: 15, xp: 0, tier: 2, passives: ['vamp-aura'] },
  // Тир 3
  { code: 'ncen', name: 'Кентавр', level: 2, hp: 600, atk: 24, def: 3, defType: 'medium', regen: 2, cool: 1.35, spd: 320, magicRes: 0, gold: 20, xp: 0, tier: 3, passives: ['aura-def'] },
  { code: 'ndtr', name: 'Троль', level: 4, hp: 700, atk: 30, def: 2, defType: 'medium', regen: 2, cool: 1.0, spd: 280, magicRes: 0, gold: 25, xp: 0, tier: 3, passives: ['crit'] },
  // Тир 4
  { code: 'nslm', name: 'Болотный гад', level: 5, hp: 700, atk: 33, def: 4, defType: 'Flesh', regen: 4, cool: 1.0, spd: 290, magicRes: 0, gold: 28, xp: 0, tier: 4, passives: ['poison'] },
  { code: 'ndtb', name: 'Мрачный Драконид', level: 2, hp: 550, atk: 32, def: 2, defType: 'Flesh', regen: 3, cool: 1.5, spd: 290, magicRes: 0, gold: 22, xp: 0, tier: 4, passives: ['evasion-25'] },
  { code: 'h00R', name: 'Волшебница', level: 5, hp: 650, atk: 35, def: 2, defType: 'small', regen: 5, cool: 1.6, spd: 260, magicRes: 0, gold: 26, xp: 0, tier: 4, passives: [] },
  { code: 'h02M', name: 'Кентавр-лучник', level: 5, hp: 665, atk: 40, def: 2, defType: 'small', regen: 5, cool: 1.6, spd: 280, magicRes: 0, gold: 15, xp: 0, tier: 4, passives: [] },
  { code: 'h02Y', name: 'Бугай', level: 5, hp: 675, atk: 45, def: 2, defType: 'heavy', regen: 3, cool: 1.6, spd: 260, magicRes: 0, gold: 26, xp: 0, tier: 4, passives: ['roar'] },
  // Тир 5
  { code: 'h02Z', name: 'Снежный медведь', level: 10, hp: 1255, atk: 85, def: 4, defType: 'heavy', regen: 2, cool: 1.6, spd: 275, magicRes: 0, gold: 38, xp: 0, tier: 5, passives: ['frost-cry'] },
  { code: 'h02X', name: 'Некромант', level: 10, hp: 1285, atk: 60, def: 3, defType: 'heavy', regen: 2, cool: 1.4, spd: 300, magicRes: 0, gold: 40, xp: 0, tier: 5, passives: [] },
  { code: 'nsog', name: 'Мертвый капитан', level: 11, hp: 1450, atk: 105, def: 8, defType: 'Flesh', regen: 10, cool: 1.5, spd: 320, magicRes: 0, gold: 55, xp: 0, tier: 5, passives: ['aura-def'] },
  { code: 'nogl', name: 'Командир огров', level: 11, hp: 1450, atk: 100, def: 10, defType: 'Flesh', regen: 15, cool: 1.2, spd: 310, magicRes: 0, gold: 55, xp: 0, tier: 5, passives: ['aura-def', 'roar'] },
  // Тир 6
  { code: 'nfov', name: 'Дреней', level: 15, hp: 1700, atk: 140, def: 15, defType: 'Flesh', regen: 30, cool: 1.2, spd: 295, magicRes: 0, gold: 75, xp: 0, tier: 6, passives: [] },
  { code: 'npfm', name: 'Опустошитель', level: 15, hp: 1800, atk: 120, def: 15, defType: 'Flesh', regen: 30, cool: 1.2, spd: 320, magicRes: 0, gold: 60, xp: 0, tier: 6, passives: ['crit'] },
  // Тир 7
  { code: 'h02V', name: 'Мститель', level: 20, hp: 2250, atk: 166, def: 16, defType: 'heavy', regen: 40, cool: 1.1, spd: 315, magicRes: 0, gold: 80, xp: 0, tier: 7, passives: ['crit'] },
  { code: 'h0AE', name: 'Зомби', level: 20, hp: 2250, atk: 166, def: 16, defType: 'heavy', regen: 40, cool: 1.1, spd: 315, magicRes: 0, gold: 80, xp: 0, tier: 7, passives: ['demon-power'] },
  { code: 'h02W', name: 'Нага-воин', level: 24, hp: 4575, atk: 280, def: 28, defType: 'heavy', regen: 35, cool: 0.85, spd: 340, magicRes: 0, gold: 110, xp: 0, tier: 7, passives: [] },
  { code: 'h031', name: 'Чудовище', level: 24, hp: 4575, atk: 285, def: 24, defType: 'heavy', regen: 35, cool: 0.85, spd: 345, magicRes: 0, gold: 110, xp: 0, tier: 7, passives: ['roar'] },
  // Тир 8
  { code: 'n00U', name: 'Гнолл-каратель', level: 30, hp: 18000, atk: 650, def: 30, defType: 'Flesh', regen: 50, cool: 1.5, spd: 320, magicRes: 50, gold: 350, xp: 0, tier: 8, passives: ['death-strike', 'magic-res-50'] },
  { code: 'n00P', name: 'Повелительница Боли', level: 30, hp: 16000, atk: 700, def: 26, defType: 'Flesh', regen: 50, cool: 1.5, spd: 300, magicRes: 50, gold: 305, xp: 0, tier: 8, passives: ['magic-res-50'] },
  { code: 'nfra', name: 'Беорн воитель', level: 50, hp: 30000, atk: 1500, def: 50, defType: 'Flesh', regen: 150, cool: 1.5, spd: 400, magicRes: 50, gold: 1400, xp: 0, tier: 8, passives: ['crit', 'roar', 'magic-res-50'] }
];

// Маппинг способностей → отображение
var CREEP_PASSIVE_LABELS = {
  'crit': 'Крит',
  'evasion-25': 'Уклонение 25%',
  'evasion-30': 'Уклонение 30%',
  'aura-def': 'Аура защиты',
  'roar': 'Рев',
  'death-strike': 'Смертельный удар',
  'strong-strike': 'Сильный удар',
  'magic-res-30': 'Маг. защита 30%',
  'magic-res-50': 'Маг. защита 50%',
  'poison': 'Яд',
  'vamp-aura': 'Аура вампиризма',
  'frost-cry': 'Леденящий крик',
  'demon-power': 'Демоническая сила',
  'faith-armor': 'Доспехи веры',
  'burn-mana-25': 'Сожжение маны 25',
  'burn-mana-100': 'Сожжение маны 100'
};