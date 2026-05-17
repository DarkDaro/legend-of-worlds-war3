/**
 * hero-data.js — Список всех героев с базовыми характеристиками.
 * Используется на страницах: heroes.html, compare.html, глобальный поиск.
 * Данные из Object Editor карты + .ini экспорт.
 * Поля с 0 — ждут заполнения.
 *
 * renderHeroStats(heroId) — рендерит блок статов + таблицу приростов
 * для карточки героя. Вызывается из HTML: renderHeroStats('paladin').
 */
var HEROES_DATA = [

    // === СИЛА ===

    { name: 'Адмирал', title: 'Морской воин', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'admiral', image: 'admiral',
      rawcode: 'H03J',
      strBase: 28, strGain: 3, agiBase: 14, agiGain: 2, intBase: 18, intGain: 2,
      hp: 650, mp: 150, atk: 25, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Друид', title: 'Хранитель природы', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'druid', image: 'druid',
      rawcode: 'E001',
      strBase: 25, strGain: 3, agiBase: 12, agiGain: 2, intBase: 23, intGain: 2,
      hp: 660, mp: 150, atk: 20, def: 2, atkSpeed: 2, hpRegen: 4, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Киборг', title: 'Механический воин', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'cyborg', image: 'cyborg',
      rawcode: 'H000',
      strBase: 20, strGain: 3, agiBase: 16, agiGain: 2, intBase: 24, intGain: 2,
      hp: 650, mp: 150, atk: 25, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Паладин', title: 'Святой рыцарь', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'paladin', image: 'paladin',
      rawcode: 'H00H',
      strBase: 24, strGain: 3, agiBase: 13, agiGain: 2, intBase: 23, intGain: 2,
      hp: 800, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Астральный Палач', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'astral-executioner', image: 'astral-executioner',
      noPage: true,
      rawcode: 'E011',
      strBase: 25, strGain: 3, agiBase: 18, agiGain: 2, intBase: 17, intGain: 2,
      hp: 650, mp: 150, atk: 20, def: 1, atkSpeed: 2, hpRegen: 1, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Костолом', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'bonebreaker', image: 'bonebreaker',
      noPage: true,
      rawcode: 'H01U',
      strBase: 28, strGain: 3, agiBase: 12, agiGain: 2, intBase: 20, intGain: 2,
      hp: 650, mp: 150, atk: 45, def: 0, atkSpeed: 2, hpRegen: 1, mpRegen: 0, speed: 295, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Скала', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'rock', image: 'rock',
      wip: true,
      rawcode: 'H020',
      strBase: 28, strGain: 3, agiBase: 12, agiGain: 2, intBase: 14, intGain: 2,
      hp: 300, mp: 0, atk: 40, def: 0, atkSpeed: 2, hpRegen: 1, mpRegen: 0, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Огненный Рыцарь', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'fire-knight', image: 'fire-knight',
      noPage: true,
      rawcode: 'H02A',
      strBase: 25, strGain: 3, agiBase: 15, agiGain: 2, intBase: 20, intGain: 2,
      hp: 800, mp: 0, atk: 30, def: 0, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Воин глубин', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'deep-warrior', image: 'deep-warrior',
      noPage: true,
      rawcode: 'H07A',
      strBase: 32, strGain: 3, agiBase: 16, agiGain: 2, intBase: 12, intGain: 2,
      hp: 600, mp: 150, atk: 35, def: 0, atkSpeed: 2, hpRegen: 2, mpRegen: 0, speed: 305, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Рыцарь Света', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'knight-of-light', image: 'knight-of-light',
      wip: true,
      rawcode: 'H098',
      strBase: 0, strGain: 3, agiBase: 15, agiGain: 2, intBase: 12, intGain: 2,
      hp: 200, mp: 150, atk: 30, def: 0, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Тирион', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'tyrion', image: 'tyrion',
      wip: true,
      rawcode: 'H0A7',
      strBase: 24, strGain: 3, agiBase: 0, agiGain: 2, intBase: 23, intGain: 2,
      hp: 800, mp: 150, atk: 55, def: 0, atkSpeed: 2, hpRegen: 2, mpRegen: 0, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Разрушитель', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'destroyer', image: 'destroyer',
      noPage: true,
      rawcode: 'N00I',
      strBase: 32, strGain: 3, agiBase: 0, agiGain: 2, intBase: 0, intGain: 2,
      hp: 750, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Всадник', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'rider', image: 'rider',
      noPage: true,
      rawcode: 'O003',
      strBase: 25, strGain: 3, agiBase: 19, agiGain: 2, intBase: 0, intGain: 2,
      hp: 650, mp: 0, atk: 27, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Вождь Минотавров', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'minotaur-chief', image: 'minotaur-chief',
      noPage: true,
      rawcode: 'O006',
      strBase: 30, strGain: 3, agiBase: 16, agiGain: 2, intBase: 0, intGain: 3,
      hp: 700, mp: 150, atk: 25, def: 0, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Вождь Орков', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'orc-chieftain', image: 'orc-chieftain',
      noPage: true,
      rawcode: 'O00A',
      strBase: 25, strGain: 3, agiBase: 20, agiGain: 2, intBase: 15, intGain: 2,
      hp: 650, mp: 150, atk: 26, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0, speed: 305, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Титан', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'titan', image: 'titan',
      noPage: true,
      rawcode: 'O00B',
      strBase: 27, strGain: 3, agiBase: 18, agiGain: 2, intBase: 0, intGain: 2,
      hp: 750, mp: 150, atk: 25, def: 0, atkSpeed: 2, hpRegen: 1, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Вурдалак', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'vurdalak', image: 'vurdalak',
      noPage: true,
      rawcode: 'O00D',
      strBase: 30, strGain: 3, agiBase: 14, agiGain: 2, intBase: 0, intGain: 2,
      hp: 650, mp: 0, atk: 30, def: 2, atkSpeed: 2, hpRegen: 3, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Ангел Смерти', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'angel-of-death', image: 'angel-of-death',
      wip: true,
      rawcode: 'O00Q',
      strBase: 25, strGain: 3, agiBase: 25, agiGain: 2, intBase: 10, intGain: 2,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Мясник', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'butcher', image: 'butcher',
      noPage: true,
      rawcode: 'U001',
      strBase: 31, strGain: 3, agiBase: 0, agiGain: 2, intBase: 13, intGain: 2,
      hp: 1000, mp: 0, atk: 20, def: 2, atkSpeed: 2, hpRegen: 5, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Огненный Голем', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'fire-golem-hero', image: 'fire-golem-hero',
      noPage: true,
      rawcode: 'U007',
      strBase: 31, strGain: 3, agiBase: 15, agiGain: 2, intBase: 14, intGain: 2,
      hp: 700, mp: 150, atk: 20, def: 3, atkSpeed: 2, hpRegen: 5, mpRegen: 0, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Король Проклятых', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'king-of-cursed', image: 'king-of-cursed',
      noPage: true,
      rawcode: 'U009',
      strBase: 25, strGain: 3, agiBase: 15, agiGain: 2, intBase: 20, intGain: 2,
      hp: 650, mp: 200, atk: 20, def: 0, atkSpeed: 2, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Лорд Хаоса', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'chaos-lord', image: 'chaos-lord',
      noPage: true,
      rawcode: 'U00A',
      strBase: 22, strGain: 3, agiBase: 0, agiGain: 2, intBase: 0, intGain: 2,
      hp: 700, mp: 150, atk: 20, def: 2, atkSpeed: 2, hpRegen: 0, mpRegen: 0, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Повелитель Могил', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'grave-lord', image: 'grave-lord',
      noPage: true,
      rawcode: 'U01J',
      strBase: 30, strGain: 3, agiBase: 0, agiGain: 2, intBase: 16, intGain: 2,
      hp: 600, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 0, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Ледяной рыцарь', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'ice-knight', image: 'ice-knight',
      noPage: true,
      rawcode: 'U01T',
      strBase: 26, strGain: 3, agiBase: 18, agiGain: 2, intBase: 18, intGain: 2,
      hp: 650, mp: 200, atk: 20, def: 0, atkSpeed: 2, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Хаотическая Форма', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'chaos-lord-chaos', image: 'chaos-lord-chaos',
      isAltForm: true,
      rawcode: 'H088',
      strBase: 30, strGain: 3, agiBase: 15, agiGain: 2, intBase: 15, intGain: 2,
      hp: 1600, mp: 0, atk: 130, def: 12, atkSpeed: 2, hpRegen: 21, mpRegen: 0, speed: 390, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Привратник Ада', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'hell-gatekeeper', image: 'hell-gatekeeper',
      isAltForm: true,
      rawcode: 'H08A',
      strBase: 30, strGain: 3, agiBase: 15, agiGain: 2, intBase: 15, intGain: 2,
      hp: 800, mp: 0, atk: 30, def: 0, atkSpeed: 2, hpRegen: 1, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Костолом', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'bonebreaker-alt', image: 'bonebreaker-alt',
      isAltForm: true,
      rawcode: 'H099',
      strBase: 1, strGain: 3, agiBase: 1, agiGain: 2, intBase: 1, intGain: 2,
      hp: 600, mp: 0, atk: 30, def: 3, atkSpeed: 0, hpRegen: 5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Всадник', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'rider-mounted', image: 'rider-mounted',
      isAltForm: true,
      rawcode: 'O004',
      strBase: 25, strGain: 3, agiBase: 19, agiGain: 2, intBase: 0, intGain: 2,
      hp: 1250, mp: 0, atk: 177, def: 1, atkSpeed: 1, hpRegen: 1, mpRegen: 0, speed: 522, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Гнев Титана', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'titan-enraged', image: 'titan-enraged',
      isAltForm: true,
      rawcode: 'O00C',
      strBase: 27, strGain: 3, agiBase: 18, agiGain: 2, intBase: 0, intGain: 2,
      hp: 1250, mp: 0, atk: 225, def: 21, atkSpeed: 1.7, hpRegen: 15, mpRegen: 0, speed: 350, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Лорд Хаоса', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'chaos-lord-alt', image: 'chaos-lord-alt',
      isAltForm: true,
      rawcode: 'U00B',
      strBase: 22, strGain: 3, agiBase: 0, agiGain: 2, intBase: 0, intGain: 2,
      hp: 1700, mp: 0, atk: 170, def: 2, atkSpeed: 1.7, hpRegen: 50, mpRegen: 0.5, speed: 522, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Пивовар', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'brewmaster', image: 'brewmaster',
      noPage: true,
      rawcode: 'N002',
      strBase: 24, strGain: 3, agiBase: 17, agiGain: 2, intBase: 19, intGain: 2,
      hp: 650, mp: 0, atk: 20, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Чародей', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'sorcerer', image: 'sorcerer',
      noPage: true,
      rawcode: 'H011',
      strBase: 0, strGain: 2, agiBase: 16, agiGain: 2, intBase: 28, intGain: 2,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Астральный маг', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'astral-mage', image: 'astral-mage',
      noPage: true,
      rawcode: 'H055',
      strBase: 0, strGain: 2, agiBase: 0, agiGain: 2, intBase: 28, intGain: 2,
      hp: 200, mp: 150, atk: 25, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Демон', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'demon', image: 'demon',
      noPage: true,
      rawcode: 'O00M',
      strBase: 25, strGain: 3, agiBase: 22, agiGain: 3, intBase: 13, intGain: 2,
      hp: 500, mp: 150, atk: 46, def: 2, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0, speed: 305, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Пожиратель пламени', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'flame-eater', image: 'flame-eater',
      noPage: true,
      rawcode: 'H08O',
      strBase: 18, strGain: 2, agiBase: 16, agiGain: 2, intBase: 26, intGain: 2,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Темный мастер', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'dark-master', image: 'dark-master',
      noPage: true,
      rawcode: 'H07E',
      strBase: 20, strGain: 2, agiBase: 20, agiGain: 2, intBase: 20, intGain: 2,
      hp: 200, mp: 500, atk: 50, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0, speed: 320, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Вершитель', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'arbiter', image: 'arbiter',
      noPage: true,
      rawcode: 'H0A6',
      strBase: 0, strGain: 2, agiBase: 16, agiGain: 2, intBase: 28, intGain: 2,
      hp: 200, mp: 0, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },


    // === ЛОВКОСТЬ ===

    { name: 'Иллюзионист', title: 'Мастер обмана', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'illusionist', image: 'illusionist',
      rawcode: 'E000',
      strBase: 20, strGain: 2, agiBase: 22, agiGain: 3, intBase: 18, intGain: 2,
      hp: 200, mp: 150, atk: 70, def: 4, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Мурлок', title: 'Подводный охотник', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'murloc', image: 'murloc',
      rawcode: 'E004',
      strBase: 16, strGain: 1.8, agiBase: 25, agiGain: 3.1, intBase: 14, intGain: 1.4,
      hp: 500, mp: 400, atk: 60, def: 3, atkSpeed: 2, hpRegen: 1, mpRegen: 0.02, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Темная Лучница', title: 'Ледяная охотница', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'dark-archer', image: 'dark-archer',
      rawcode: 'E00O',
      strBase: 20, strGain: 2.5, agiBase: 31, agiGain: 4, intBase: 18, intGain: 1.7,
      hp: 450, mp: 420, atk: 75, def: 2, atkSpeed: 2.2, hpRegen: 0.5, mpRegen: 0.02, speed: 300, range: 625, sightDay: 1800, sightNight: 800 },

    { name: 'Воительница', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'warrioress', image: 'warrioress',
      noPage: true,
      rawcode: 'E00H',
      strBase: 21, strGain: 2, agiBase: 24, agiGain: 3, intBase: 0, intGain: 0,
      hp: 200, mp: 0, atk: 50, def: 2, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Жрица Луны', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'priestess', image: 'priestess',
      noPage: true,
      rawcode: 'E010',
      strBase: 0, strGain: 2, agiBase: 27, agiGain: 3, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 60, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 0, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Стражница', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'guardian', image: 'guardian',
      noPage: true,
      rawcode: 'E020',
      strBase: 21, strGain: 2, agiBase: 24, agiGain: 3, intBase: 0, intGain: 0,
      hp: 200, mp: 0, atk: 40, def: 2, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Зодиак', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'zodiac', image: 'zodiac',
      noPage: true,
      rawcode: 'E02O',
      strBase: 18, strGain: 2, agiBase: 24, agiGain: 3, intBase: 18, intGain: 2,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 0, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Ночной Хищник', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'night-predator', image: 'night-predator',
      noPage: true,
      rawcode: 'E03S',
      strBase: 25, strGain: 2, agiBase: 25, agiGain: 3, intBase: 10, intGain: 2,
      hp: 200, mp: 150, atk: 60, def: 1, atkSpeed: 0, hpRegen: 0, mpRegen: 0, speed: 280, range: 150, sightDay: 1800, sightNight: 1800 },

    { name: 'Егерь', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'ranger', image: 'ranger',
      noPage: true,
      rawcode: 'H001',
      strBase: 17, strGain: 2, agiBase: 27, agiGain: 3, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 70, def: 1, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Тень', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'shadow', image: 'shadow',
      noPage: true,
      rawcode: 'H037',
      strBase: 20, strGain: 2, agiBase: 25, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 55, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 295, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Десантник', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'marine', image: 'marine',
      noPage: true,
      rawcode: 'H03H',
      strBase: 18, strGain: 2, agiBase: 25, agiGain: 3, intBase: 0, intGain: 2,
      hp: 250, mp: 150, atk: 40, def: 0, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 300, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Покорительница молний', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'lightning-subjugator', image: 'lightning-subjugator',
      noPage: true,
      rawcode: 'H046',
      strBase: 16, strGain: 2, agiBase: 28, agiGain: 3, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 45, def: 1, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Отец Тьмы', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'father-of-darkness', image: 'father-of-darkness',
      noPage: true,
      rawcode: 'H089',
      strBase: 17, strGain: 2, agiBase: 25, agiGain: 3, intBase: 18, intGain: 2,
      hp: 250, mp: 150, atk: 70, def: 0, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0, speed: 305, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Темный Рыцарь', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'dark-knight', image: 'dark-knight',
      noPage: true,
      rawcode: 'H09N',
      strBase: 20, strGain: 2, agiBase: 26, agiGain: 3, intBase: 14, intGain: 2,
      hp: 200, mp: 150, atk: 70, def: 0, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Астральная Охотница', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'astral-huntress', image: 'astral-huntress',
      noPage: true,
      rawcode: 'H0AG',
      strBase: 17, strGain: 2, agiBase: 27, agiGain: 3, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 45, def: 0, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Пламенный Берсеркер', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'flame-berserker', image: 'flame-berserker',
      noPage: true,
      rawcode: 'O008',
      strBase: 17, strGain: 2, agiBase: 29, agiGain: 3, intBase: 0, intGain: 2,
      hp: 300, mp: 150, atk: 65, def: 2, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Грозовой Рыцарь', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'storm-knight', image: 'storm-knight',
      noPage: true,
      rawcode: 'O00F',
      strBase: 21, strGain: 2, agiBase: 24, agiGain: 3, intBase: 0, intGain: 2,
      hp: 250, mp: 150, atk: 40, def: 0, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Водяной', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'water-spirit', image: 'water-spirit',
      noPage: true,
      rawcode: 'O00L',
      strBase: 18, strGain: 2, agiBase: 28, agiGain: 3, intBase: 0, intGain: 2,
      hp: 450, mp: 150, atk: 40, def: 2, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Вампир', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'vampire', image: 'vampire',
      noPage: true,
      rawcode: 'U006',
      strBase: 15, strGain: 2, agiBase: 30, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Демоническая Форма', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'illusionist-demon', image: 'illusionist-demon',
      isAltForm: true,
      rawcode: 'E002',
      strBase: 20, strGain: 2, agiBase: 22, agiGain: 3, intBase: 18, intGain: 2,
      hp: 1200, mp: 0, atk: 170, def: 4, atkSpeed: 0, hpRegen: 60, mpRegen: 0, speed: 0, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Пламенный Берсеркер', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'flame-berserker-alt', image: 'flame-berserker-alt',
      isAltForm: true,
      rawcode: 'O009',
      strBase: 17, strGain: 2, agiBase: 29, agiGain: 3, intBase: 0, intGain: 2,
      hp: 1300, mp: 150, atk: 165, def: 2, atkSpeed: 1.7, hpRegen: 102, mpRegen: 0, speed: 290, range: 750, sightDay: 1800, sightNight: 800 },

    { name: 'Самурай', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'samurai', image: 'samurai',
      rawcode: 'O000',
      strBase: 15, strGain: 2, agiBase: 30, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Призрак', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'ghost', image: 'ghost',
      noPage: true,
      rawcode: 'O002',
      strBase: 20, strGain: 2, agiBase: 30, agiGain: 3, intBase: 10, intGain: 2,
      hp: 200, mp: 150, atk: 55, def: 2, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Морской Страж', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'sea-guard', image: 'sea-guard',
      noPage: true,
      rawcode: 'O005',
      strBase: 20, strGain: 2, agiBase: 26, agiGain: 3, intBase: 14, intGain: 2,
      hp: 200, mp: 150, atk: 45, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Звездный Дух', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'star-spirit', image: 'star-spirit',
      noPage: true,
      rawcode: 'O00K',
      strBase: 19, strGain: 2, agiBase: 25, agiGain: 3, intBase: 0, intGain: 2,
      hp: 250, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 0, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Ночная Мстительница', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'night-avenger', image: 'night-avenger',
      noPage: true,
      rawcode: 'O00O',
      strBase: 15, strGain: 2, agiBase: 30, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 0, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 0, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Скелет', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'skeleton', image: 'skeleton',
      noPage: true,
      rawcode: 'O00E',
      strBase: 16, strGain: 2, agiBase: 28, agiGain: 3, intBase: 0, intGain: 2,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Мятежник', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'rebel', image: 'rebel',
      noPage: true,
      rawcode: 'O00P',
      strBase: 15, strGain: 2, agiBase: 28, agiGain: 3, intBase: 17, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Ассасин', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'assassin', image: 'assassin',
      noPage: true,
      rawcode: 'O010',
      strBase: 20, strGain: 2, agiBase: 25, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Огненная Панда', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'fire-panda', image: 'fire-panda',
      noPage: true,
      rawcode: 'O011',
      strBase: 10, strGain: 2, agiBase: 40, agiGain: 3, intBase: 10, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Блудсасир', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'bloodsucker', image: 'bloodsucker',
      wip: true,
      rawcode: 'H095',
      strBase: 23, strGain: 1.8, agiBase: 24, agiGain: 3, intBase: 18, intGain: 1.696875,
      hp: 150, mp: 0, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },


    // === РАЗУМ ===

    { name: 'Громовержец', title: 'Повелитель молний', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'thundergod', image: 'thundergod',
      rawcode: 'O001',
      strBase: 24, strGain: 2, agiBase: 12, agiGain: 2, intBase: 24, intGain: 2,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Верховный Маг', title: 'Маг воды', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'archmage', image: 'archmage',
      rawcode: 'H02P',
      strBase: 14, strGain: 1.5, agiBase: 17, agiGain: 1.6, intBase: 25, intGain: 3.5,
      hp: 280, mp: 520, atk: 45, def: 2, atkSpeed: 2.3, hpRegen: 0.4, mpRegen: 0.04, speed: 280, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Леший', title: 'Друид', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'leshy', image: 'leshy',
      rawcode: 'E006',
      strBase: 17, strGain: 1.8, agiBase: 14, agiGain: 1.5, intBase: 22, intGain: 3.2,
      hp: 350, mp: 480, atk: 40, def: 2, atkSpeed: 2.2, hpRegen: 1.5, mpRegen: 0.03, speed: 280, range: 550, sightDay: 1800, sightNight: 800 },

    { name: 'Некромонгер', title: 'Повелитель мёртвых', attr: 'intelligence', role: 'support', roleName: 'Поддержка', heroId: 'necromonger', image: 'necromonger',
      rawcode: 'H06G',
      strBase: 16, strGain: 1.8, agiBase: 14, agiGain: 1.5, intBase: 21, intGain: 3,
      hp: 350, mp: 500, atk: 40, def: 2, atkSpeed: 2.3, hpRegen: 0.8, mpRegen: 0.04, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Дух природы', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'spirit-of-nature', image: 'spirit-of-nature',
      isAltForm: true,
      rawcode: 'E03H',
      strBase: 20, strGain: 2, agiBase: 18, agiGain: 2, intBase: 22, intGain: 3,
      hp: 1250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 51, mpRegen: 0, speed: 0, range: 750, sightDay: 800, sightNight: 800 },

    { name: 'Воин Света', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'warrior-of-light', image: 'warrior-of-light',
      noPage: true,
      rawcode: 'H00F',
      strBase: 21, strGain: 2, agiBase: 0, agiGain: 2, intBase: 26, intGain: 3,
      hp: 200, mp: 150, atk: 20, def: 0, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Повелитель Тьмы', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'dark-lord', image: 'dark-lord',
      noPage: true,
      rawcode: 'H00V',
      strBase: 18, strGain: 2, agiBase: 13, agiGain: 2, intBase: 29, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Темный Маг', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'dark-mage', image: 'dark-mage',
      noPage: true,
      rawcode: 'H02F',
      strBase: 18, strGain: 2, agiBase: 12, agiGain: 2, intBase: 30, intGain: 3,
      hp: 200, mp: 150, atk: 30, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Волшебница Ветров', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'wind-enchantress', image: 'wind-enchantress',
      noPage: true,
      rawcode: 'H02G',
      strBase: 15, strGain: 2, agiBase: 15, agiGain: 2, intBase: 30, intGain: 3,
      hp: 200, mp: 150, atk: 25, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Маг Воздуха', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'air-mage', image: 'air-mage',
      noPage: true,
      rawcode: 'H04E',
      strBase: 15, strGain: 2, agiBase: 18, agiGain: 2, intBase: 27, intGain: 3,
      hp: 200, mp: 150, atk: 25, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Ведьмак Хаоса', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'chaos-witcher', image: 'chaos-witcher',
      noPage: true,
      rawcode: 'H08T',
      strBase: 18, strGain: 2, agiBase: 16, agiGain: 2, intBase: 26, intGain: 3,
      hp: 200, mp: 250, atk: 25, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Шторм', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'storm', image: 'storm',
      noPage: true,
      rawcode: 'N00E',
      strBase: 15, strGain: 2, agiBase: 15, agiGain: 2, intBase: 30, intGain: 3,
      hp: 200, mp: 150, atk: 30, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 320, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Рыцарь глубин', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'knight-of-depths', image: 'knight-of-depths',
      noPage: true,
      rawcode: 'O00G',
      strBase: 20, strGain: 2, agiBase: 14, agiGain: 2, intBase: 26, intGain: 3,
      hp: 300, mp: 150, atk: 25, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Гидралиск', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'hydralisk', image: 'hydralisk',
      noPage: true,
      rawcode: 'O00N',
      strBase: 16, strGain: 2, agiBase: 18, agiGain: 2, intBase: 26, intGain: 3,
      hp: 300, mp: 150, atk: 25, def: 0, atkSpeed: 2, hpRegen: 1, mpRegen: 0, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },


    { name: 'Повелитель Льдов', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'ice-lord', image: 'ice-lord',
      noPage: true,
      rawcode: 'U000',
      strBase: 0, strGain: 2, agiBase: 13, agiGain: 2, intBase: 32, intGain: 3,
      hp: 200, mp: 0, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0, mpRegen: 0, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Повелитель Огня ', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'fire-lord', image: 'fire-lord',
      noPage: true,
      rawcode: 'N005',
      strBase: 16, strGain: 2, agiBase: 17, agiGain: 2, intBase: 27, intGain: 3,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0, mpRegen: 0, speed: 305, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Повелитель Вихрей', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'wind-lord', image: 'wind-lord',
      noPage: true,
      rawcode: 'O007',
      strBase: 19, strGain: 2, agiBase: 14, agiGain: 2, intBase: 27, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0, speed: 305, range: 750, sightDay: 1800, sightNight: 800 },

    { name: 'Владыка Молний', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'lightning-lord', image: 'lightning-lord',
      noPage: true,
      rawcode: 'O00H',
      strBase: 16, strGain: 2, agiBase: 14, agiGain: 2, intBase: 30, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Темный Шаман', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'dark-shaman', image: 'dark-shaman',
      noPage: true,
      rawcode: 'O00I',
      strBase: 15, strGain: 2, agiBase: 13, agiGain: 2, intBase: 32, intGain: 3,
      hp: 250, mp: 0, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Снежная Королева', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'snow-queen', image: 'snow-queen',
      noPage: true,
      rawcode: 'O00J',
      strBase: 15, strGain: 2, agiBase: 15, agiGain: 2, intBase: 30, intGain: 3,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 305, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Владыка Грома', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'thunder-lord-2', image: 'thunder-lord-2',
      noPage: true,
      rawcode: 'O00X',
      strBase: 13, strGain: 2, agiBase: 14, agiGain: 2, intBase: 28, intGain: 3,
      hp: 250, mp: 0, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

];

function findHero(heroId) {
    return HEROES_DATA.find(function(h) { return h.heroId === heroId; }) || null;
}

// Форматирование значения стата (null → «—»)
function statVal(v, suffix) {
    if (v === null || v === undefined) return '—';
    return suffix ? v + suffix : String(v);
}

// Рендер блока статов + таблицы приростов для карточки героя
function renderHeroStats(heroId) {
    var hero = findHero(heroId);
    if (!hero) return '<p style="color:var(--text-muted);">Данные героя недоступны</p>';

    var attr = ATTR_MAP[hero.attr] || ATTR_MAP.strength;
    var rangeLabel = (hero.range >= 400) ? 'Дальний бой' : 'Ближний бой';
    var roleClass = ROLE_CLASS_MAP[hero.role] || 'role-support';

    // Блок hero-stats
    var html = '<div class="hero-stats">';
    html += '<div class="stat-item"><i class="fas fa-crosshairs"></i> ' + rangeLabel + ' (' + statVal(hero.range) + ')</div>';
    html += '<div class="stat-item"><i class="fas fa-star"></i> Осн. атрибут: <span style="color:' + attr.color + ';">' + attr.label + '</span></div>';
    html += '<div class="stat-item"><i class="fas fa-heart"></i> Жизни: ' + statVal(hero.hp) + '</div>';
    html += '<div class="stat-item"><i class="fas fa-tint"></i> Мана: ' + statVal(hero.mp) + '</div>';
    html += '<div class="stat-item"><i class="fas fa-tint-slash"></i> Реген. маны: ' + statVal(hero.mpRegen, '/сек') + '</div>';
    html += '<div class="stat-item"><i class="fas fa-fist-raised"></i> Атака: ' + statVal(hero.atk) + '</div>';
    html += '<div class="stat-item"><i class="fas fa-shield-alt"></i> Защита: ' + statVal(hero.def) + '</div>';
    html += '<div class="stat-item"><i class="fas fa-clock"></i> Скорость атаки: ' + statVal(hero.atkSpeed, ' сек') + '</div>';
    html += '<div class="stat-item"><i class="fas fa-heartbeat"></i> Реген. здоровья: ' + statVal(hero.hpRegen, '/сек') + '</div>';
    html += '<div class="stat-item"><i class="fas fa-shoe-prints"></i> Скорость: ' + statVal(hero.speed) + '</div>';
    html += '<div class="stat-item"><i class="fas fa-eye"></i> Обзор: ' + statVal(hero.sightDay) + ' / ' + statVal(hero.sightNight) + '</div>';
    html += '<div class="stat-item"><i class="fas fa-tag"></i> Роль: <span class="' + roleClass + '">' + hero.roleName + '</span></div>';
    html += '</div>';

    // Таблица приростов
    html += '<table class="hero-stats-table">';
    html += '<tr><th>Характеристика</th><th>Значение</th><th>Прирост</th></tr>';
    html += '<tr><td><span class="stat-strength">Сила</span></td><td>' + statVal(hero.strBase) + '</td><td>+' + statVal(hero.strGain) + '</td></tr>';
    html += '<tr><td><span class="stat-intelligence">Разум</span></td><td>' + statVal(hero.intBase) + '</td><td>+' + statVal(hero.intGain) + '</td></tr>';
    html += '<tr><td><span class="stat-agility">Ловкость</span></td><td>' + statVal(hero.agiBase) + '</td><td>+' + statVal(hero.agiGain) + '</td></tr>';
    html += '</table>';

    return html;
}

// Навигация между героями: prev/next по порядку в HEROES_DATA
function renderHeroNav(heroId) {
    // Герои, у которых есть своя HTML-страница
    var pageHeroIds = [
        'paladin', 'admiral', 'druid', 'cyborg', 'thundergod',
        'illusionist', 'archmage', 'dark-archer', 'leshy',
        'necromonger', 'samurai', 'murloc'
    ];
    var idx = pageHeroIds.indexOf(heroId);
    if (idx === -1) return '';

    var prevId = idx > 0 ? pageHeroIds[idx - 1] : null;
    var nextId = idx < pageHeroIds.length - 1 ? pageHeroIds[idx + 1] : null;
    var prevHero = prevId ? findHero(prevId) : null;
    var nextHero = nextId ? findHero(nextId) : null;

    var html = '<div class="hero-nav">';
    if (prevHero) {
        html += '<a href="' + prevHero.heroId + '.html" class="hero-nav-btn hero-nav-prev" aria-label="' + prevHero.name + '"><i class="fas fa-chevron-left"></i></a>';
    } else {
        html += '<span class="hero-nav-btn hero-nav-prev hero-nav-disabled"><i class="fas fa-chevron-left"></i></span>';
    }
    if (nextHero) {
        html += '<a href="' + nextHero.heroId + '.html" class="hero-nav-btn hero-nav-next" aria-label="' + nextHero.name + '"><i class="fas fa-chevron-right"></i></a>';
    } else {
        html += '<span class="hero-nav-btn hero-nav-next hero-nav-disabled"><i class="fas fa-chevron-right"></i></span>';
    }
    html += '</div>';

    return html;
}
