// ========== БАЗА ДАННЫХ КРИПОВ ==========
// Данные из Object Editor (unit.ini) + ручные правки
// passives: массив пассивных способностей
// xp: 0 — заполнить из игры (зависит от констант карты)

var CREEPS_DB = [
  { code: 'nban', name: 'Разбойник', level: 2, hp: 300, atk: 12, def: 0, defType: 'medium', regen: 0, cool: 1.0, magicRes: 0, gold: 11, xp: 0, passives: [] },
  { code: 'nanb', name: 'Арахнид', level: 2, hp: 300, atk: 12, def: 0, defType: 'Flesh', regen: 0, cool: 1.5, magicRes: 0, gold: 11, xp: 0, passives: [] },
  { code: 'nfov', name: 'Дреней', level: 15, hp: 1700, atk: 140, def: 15, defType: 'Flesh', regen: 30, cool: 1.2, magicRes: 0, gold: 75, xp: 0, passives: [] },
  { code: 'ncen', name: 'Кентавр', level: 2, hp: 600, atk: 24, def: 0, defType: 'medium', regen: 0, cool: 1.35, magicRes: 0, gold: 20, xp: 0, passives: ['aura-def'] },
  { code: 'ndtr', name: 'Троль', level: 4, hp: 700, atk: 30, def: 0, defType: 'medium', regen: 0, cool: 1.0, magicRes: 0, gold: 25, xp: 0, passives: ['crit'] },
  { code: 'npfm', name: 'Опустошитель', level: 15, hp: 1800, atk: 120, def: 15, defType: 'Flesh', regen: 30, cool: 1.2, magicRes: 0, gold: 60, xp: 0, passives: ['crit'] },
  { code: 'nsog', name: 'Мёртвый капитан', level: 11, hp: 1450, atk: 105, def: 8, defType: 'Flesh', regen: 10, cool: 1.5, spd: 320, magicRes: 0, gold: 55, xp: 0, passives: ['aura-def'] },
  { code: 'nslm', name: 'Болотный гад', level: 5, hp: 700, atk: 33, def: 4, defType: 'Flesh', regen: 0, cool: 1.0, magicRes: 0, gold: 28, xp: 0, passives: ['poison'] },
  { code: 'ndtb', name: 'Драконид', level: 2, hp: 550, atk: 32, def: 2, defType: 'Flesh', regen: 0, cool: 1.5, spd: 290, magicRes: 0, gold: 22, xp: 0, passives: ['evasion-25'] },
  { code: 'nogl', name: 'Командир огров', level: 11, hp: 1450, atk: 100, def: 10, defType: 'Flesh', regen: 15, cool: 1.2, magicRes: 0, gold: 55, xp: 0, passives: ['aura-def', 'roar'] },
  { code: 'n00U', name: 'Гнолл-каратель', level: 30, hp: 18000, atk: 650, def: 30, defType: 'Flesh', regen: 50, cool: 1.5, spd: 320, magicRes: 50, gold: 350, xp: 0, passives: ['death-strike', 'magic-res-50'] },
  { code: 'n00P', name: 'Повелительница боли', level: 30, hp: 16000, atk: 700, def: 26, defType: 'Flesh', regen: 50, cool: 1.5, spd: 300, magicRes: 50, gold: 305, xp: 0, passives: ['magic-res-50'] },
  { code: 'h02W', name: 'Нага-воин', level: 24, hp: 4575, atk: 280, def: 28, defType: 'heavy', regen: 35, cool: 0.85, spd: 340, magicRes: 0, gold: 110, xp: 0, passives: [] },
  { code: 'h031', name: 'Чудовище', level: 24, hp: 4575, atk: 285, def: 24, defType: 'heavy', regen: 35, cool: 0.85, spd: 345, magicRes: 0, gold: 110, xp: 0, passives: ['roar'] },
  { code: 'nfra', name: 'Беорн воитель', level: 50, hp: 30000, atk: 1500, def: 50, defType: 'Flesh', regen: 150, cool: 1.5, spd: 400, magicRes: 50, gold: 1400, xp: 0, passives: ['crit', 'roar', 'magic-res-50'] },
  { code: 'h00R', name: 'Волшебница', level: 5, hp: 650, atk: 35, def: 2, defType: 'small', regen: 0, cool: 1.6, spd: 260, magicRes: 0, gold: 26, xp: 0, passives: [] },
  { code: 'h02M', name: 'Кентавр-лучник', level: 5, hp: 665, atk: 40, def: 0, defType: 'small', regen: 0, cool: 1.6, spd: 280, magicRes: 0, gold: 15, xp: 0, passives: [] },
  { code: 'h02R', name: 'Маргол', level: 3, hp: 445, atk: 25, def: 2, defType: 'heavy', regen: 0, cool: 1.6, spd: 260, magicRes: 0, gold: 15, xp: 0, passives: ['evasion-25'] },
  { code: 'h02V', name: 'Мститель', level: 20, hp: 2250, atk: 166, def: 16, defType: 'heavy', regen: 40, cool: 1.1, spd: 315, magicRes: 0, gold: 80, xp: 0, passives: ['crit'] },
  { code: 'h02Y', name: 'Бугай', level: 5, hp: 675, atk: 45, def: 2, defType: 'heavy', regen: 0, cool: 1.6, spd: 260, magicRes: 0, gold: 26, xp: 0, passives: ['roar'] },
  { code: 'h02Z', name: 'Снежный медведь', level: 10, hp: 1255, atk: 85, def: 4, defType: 'heavy', regen: 2, cool: 1.6, spd: 275, magicRes: 0, gold: 38, xp: 0, passives: ['frost-cry'] },
  { code: 'h02T', name: 'Маргол-охотник', level: 3, hp: 445, atk: 23, def: 0, defType: 'heavy', regen: 0, cool: 1.6, spd: 300, magicRes: 0, gold: 20, xp: 0, passives: ['evasion-30'] },
  { code: 'h02X', name: 'Некромант', level: 10, hp: 1285, atk: 60, def: 3, defType: 'heavy', regen: 2, cool: 1.4, spd: 300, magicRes: 0, gold: 40, xp: 0, passives: [] },
  { code: 'h0AE', name: 'Зомби', level: 20, hp: 2250, atk: 166, def: 16, defType: 'heavy', regen: 40, cool: 1.1, spd: 315, magicRes: 0, gold: 80, xp: 0, passives: ['demon-power'] },
  { code: 'h0AF', name: 'Сатир', level: 4, hp: 520, atk: 25, def: 2, defType: 'heavy', regen: 0, cool: 1.6, spd: 260, magicRes: 0, gold: 15, xp: 0, passives: ['vamp-aura'] }
];

// Маппинг пассивок → отображение
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
