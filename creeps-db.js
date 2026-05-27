// ========== БАЗА ДАННЫХ КРИПОВ ==========
// Демо-цифры — заменить на реальные из карты
// passives: массив пассивных способностей
// Типы пассивок: 'crit' (крит), 'evasion' (уклонение), 'aura-def' (аура защиты), 'roar' (рев)

var CREEPS_DB = [
  { code: 'nban', name: 'Разбойник', hp: 320, atk: 14, def: 1, regen: 0.5, magicRes: 0, gold: 18, xp: 25, passives: ['crit'] },
  { code: 'nanb', name: 'Арахнид', hp: 280, atk: 12, def: 0, regen: 0.5, magicRes: 0, gold: 16, xp: 22, passives: [] },
  { code: 'nfov', name: 'Дреней', hp: 380, atk: 16, def: 2, regen: 0.5, magicRes: 0, gold: 22, xp: 30, passives: [] },
  { code: 'ncen', name: 'Кентавр', hp: 450, atk: 18, def: 2, regen: 1, magicRes: 0, gold: 28, xp: 38, passives: ['aura-def'] },
  { code: 'ndtr', name: 'Троль', hp: 350, atk: 20, def: 1, regen: 0.5, magicRes: 0, gold: 24, xp: 32, passives: ['crit'] },
  { code: 'npfm', name: 'Опустошитель', hp: 550, atk: 24, def: 3, regen: 1, magicRes: 0, gold: 36, xp: 48, passives: ['crit'] },
  { code: 'nsog', name: 'Мёртвый капитан', hp: 500, atk: 22, def: 3, regen: 1, magicRes: 10, gold: 32, xp: 42, passives: ['aura-def'] },
  { code: 'nslm', name: 'Болотный гад', hp: 420, atk: 17, def: 1, regen: 1, magicRes: 0, gold: 26, xp: 35, passives: [] },
  { code: 'ndtb', name: 'Драконид', hp: 600, atk: 26, def: 4, regen: 1, magicRes: 15, gold: 40, xp: 55, passives: ['evasion'] },
  { code: 'nogl', name: 'Командир огров', hp: 700, atk: 28, def: 4, regen: 1.5, magicRes: 0, gold: 45, xp: 60, passives: ['aura-def', 'roar'] },
  { code: 'n00U', name: 'Гнол каратель', hp: 300, atk: 15, def: 1, regen: 0.5, magicRes: 0, gold: 18, xp: 24, passives: [] },
  { code: 'n00P', name: 'Повелительница боли', hp: 480, atk: 21, def: 2, regen: 1, magicRes: 20, gold: 34, xp: 45, passives: ['crit'] },
  { code: 'h02W', name: 'Нага воин', hp: 520, atk: 23, def: 3, regen: 1, magicRes: 0, gold: 30, xp: 40, passives: [] },
  { code: 'h031', name: 'Чудовище', hp: 800, atk: 30, def: 5, regen: 1.5, magicRes: 0, gold: 50, xp: 65, passives: ['roar'] },
  { code: 'nfra', name: 'Беорн воитель', hp: 650, atk: 25, def: 4, regen: 1.5, magicRes: 0, gold: 42, xp: 55, passives: ['crit', 'roar'] },
  { code: 'h00R', name: 'Волшебница', hp: 350, atk: 19, def: 0, regen: 0.5, magicRes: 25, gold: 28, xp: 38, passives: [] },
  { code: 'h02M', name: 'Кентавр лучник', hp: 400, atk: 21, def: 1, regen: 0.5, magicRes: 0, gold: 24, xp: 32, passives: [] },
  { code: 'h02R', name: 'Маргол', hp: 580, atk: 24, def: 3, regen: 1, magicRes: 0, gold: 38, xp: 50, passives: ['evasion'] },
  { code: 'h02V', name: 'Мститель', hp: 620, atk: 27, def: 3, regen: 1, magicRes: 0, gold: 40, xp: 52, passives: ['crit'] },
  { code: 'h02Y', name: 'Бугай', hp: 900, atk: 32, def: 5, regen: 2, magicRes: 0, gold: 55, xp: 70, passives: ['roar'] },
  { code: 'h02Z', name: 'Снежный медведь', hp: 750, atk: 29, def: 4, regen: 1.5, magicRes: 0, gold: 48, xp: 62, passives: ['roar'] },
  { code: 'h02T', name: 'Маргол охотник', hp: 500, atk: 22, def: 2, regen: 1, magicRes: 0, gold: 32, xp: 42, passives: ['evasion'] },
  { code: 'h02X', name: 'Некромант', hp: 380, atk: 18, def: 1, regen: 0.5, magicRes: 30, gold: 30, xp: 40, passives: [] },
  { code: 'h0AE', name: 'Зомби', hp: 440, atk: 16, def: 2, regen: 1, magicRes: 0, gold: 20, xp: 28, passives: [] },
  { code: 'h0AF', name: 'Сатир', hp: 460, atk: 20, def: 2, regen: 1, magicRes: 10, gold: 26, xp: 35, passives: ['evasion'] }
];

// Маппинг пассивок → отображение
var CREEP_PASSIVE_LABELS = {
  'crit': 'Крит',
  'evasion': 'Уклонение',
  'aura-def': 'Аура защиты',
  'roar': 'Рев'
};
