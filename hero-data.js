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

    { name: 'Адмирал', title: 'Морской воин', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'admiral', image: 'admiral', charName: 'Прохор',
      rawcode: 'H03J',
      strBase: 28, strGain: 3, agiBase: 14, agiGain: 2, intBase: 14, intGain: 2,
      hp: 650, mp: 150, atk: 25, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Друид', title: 'Хранитель природы', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'druid', image: 'druid', charName: 'Сильвестр',
      rawcode: 'E001',
      strBase: 25, strGain: 3, agiBase: 12, agiGain: 2, intBase: 23, intGain: 2,
      hp: 660, mp: 150, atk: 20, def: 2, atkSpeed: 2, hpRegen: 4, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Киборг', title: 'Механический воин', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'cyborg', image: 'cyborg', charName: '',
      rawcode: 'H000',
      strBase: 20, strGain: 3, agiBase: 16, agiGain: 2, intBase: 24, intGain: 2,
      hp: 650, mp: 150, atk: 25, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Паладин', title: 'Святой рыцарь', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'paladin', image: 'paladin', charName: 'Светозар',
      rawcode: 'H00H',
      strBase: 24, strGain: 3, agiBase: 13, agiGain: 2, intBase: 23, intGain: 2,
      hp: 800, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Астральный Палач', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'astral-executioner', image: 'astral-executioner', charName: '',
      rawcode: 'E011',
      strBase: 25, strGain: 3, agiBase: 18, agiGain: 2, intBase: 17, intGain: 2,
      hp: 650, mp: 150, atk: 20, def: 1, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Костолом', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'bonebreaker', image: 'bonebreaker', charName: '',
      rawcode: 'H01U',
      strBase: 28, strGain: 3, agiBase: 12, agiGain: 2, intBase: 20, intGain: 2,
      hp: 650, mp: 150, atk: 45, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 295, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Скала', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'rock', image: 'rock', charName: '',
      wip: true,
      rawcode: 'H020',
      strBase: 28, strGain: 3, agiBase: 12, agiGain: 2, intBase: 14, intGain: 2,
      hp: 300, mp: 0, atk: 40, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Огненный Рыцарь', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'fire-knight', image: 'fire-knight', charName: '',
      rawcode: 'H02A',
      strBase: 25, strGain: 3, agiBase: 15, agiGain: 2, intBase: 20, intGain: 2,
      hp: 800, mp: 0, atk: 30, def: 0, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Воин Глубин', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'deep-warrior', image: 'deep-warrior', charName: '',
      rawcode: 'H07A',
      strBase: 32, strGain: 3, agiBase: 16, agiGain: 2, intBase: 12, intGain: 2,
      hp: 600, mp: 150, atk: 35, def: 0, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 305, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Рыцарь Света', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'knight-of-light', image: 'knight-of-light', charName: '',
      wip: true,
      rawcode: 'H098',
      strBase: 0, strGain: 3, agiBase: 15, agiGain: 2, intBase: 12, intGain: 2,
      hp: 200, mp: 150, atk: 30, def: 0, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Тирион', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'tyrion', image: 'tyrion', charName: '',
      wip: true,
      rawcode: 'H0A7',
      strBase: 24, strGain: 3, agiBase: 13, agiGain: 2, intBase: 23, intGain: 2,
      hp: 800, mp: 150, atk: 55, def: 0, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Разрушитель', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'destroyer', image: 'destroyer', charName: '',
      rawcode: 'N00I',
      strBase: 32, strGain: 3, agiBase: 14, agiGain: 2, intBase: 14, intGain: 2,
      hp: 750, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 0, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Всадник', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'rider', image: 'rider', charName: '',
      rawcode: 'O003',
      strBase: 25, strGain: 3, agiBase: 19, agiGain: 2, intBase: 16, intGain: 2,
      hp: 650, mp: 0, atk: 27, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Вождь Минотавров', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'minotaur-chief', image: 'minotaur-chief', charName: '',
      rawcode: 'O006',
      strBase: 30, strGain: 3, agiBase: 16, agiGain: 2, intBase: 14, intGain: 3,
      hp: 700, mp: 150, atk: 25, def: 0, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Вождь Орков', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'orc-chieftain', image: 'orc-chieftain', charName: '',
      rawcode: 'O00A',
      strBase: 25, strGain: 3, agiBase: 20, agiGain: 2, intBase: 15, intGain: 2,
      hp: 650, mp: 150, atk: 26, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 305, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Титан', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'titan', image: 'titan', charName: '',
      rawcode: 'O00B',
      strBase: 27, strGain: 3, agiBase: 18, agiGain: 2, intBase: 15, intGain: 2,
      hp: 750, mp: 150, atk: 25, def: 0, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Вурдалак', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'vurdalak', image: 'vurdalak', charName: '',
      rawcode: 'O00D',
      strBase: 30, strGain: 3, agiBase: 14, agiGain: 2, intBase: 16, intGain: 2,
      hp: 650, mp: 0, atk: 30, def: 2, atkSpeed: 2, hpRegen: 3, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Ангел Смерти', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'angel-of-death', image: 'angel-of-death', charName: '',
      wip: true,
      rawcode: 'O00Q',
      strBase: 25, strGain: 3, agiBase: 25, agiGain: 2, intBase: 10, intGain: 2,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Мясник', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'butcher', image: 'butcher', charName: '',
      rawcode: 'U001',
      strBase: 31, strGain: 3, agiBase: 16, agiGain: 2, intBase: 13, intGain: 2,
      hp: 1000, mp: 0, atk: 20, def: 2, atkSpeed: 2, hpRegen: 5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Огненный Голем', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'fire-golem-hero', image: 'fire-golem-hero', charName: '',
      rawcode: 'U007',
      strBase: 31, strGain: 3, agiBase: 15, agiGain: 3, intBase: 14, intGain: 2,
      hp: 700, mp: 150, atk: 20, def: 3, atkSpeed: 2, hpRegen: 5, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Король Проклятых', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'king-of-cursed', image: 'king-of-cursed', charName: '',
      rawcode: 'U009',
      strBase: 25, strGain: 3, agiBase: 15, agiGain: 2, intBase: 20, intGain: 2,
      hp: 650, mp: 200, atk: 20, def: 0, atkSpeed: 2, hpRegen: 0, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Лорд Хаоса', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'chaos-lord', image: 'chaos-lord', charName: '',
      rawcode: 'U00A',
      strBase: 22, strGain: 3, agiBase: 16, agiGain: 2, intBase: 18, intGain: 2,
      hp: 700, mp: 150, atk: 20, def: 2, atkSpeed: 2, hpRegen: 0, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Повелитель Могил', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'grave-lord', image: 'grave-lord', charName: '',
      unique: true,
      rawcode: 'U01J',
      strBase: 30, strGain: 3, agiBase: 14, agiGain: 2, intBase: 16, intGain: 2,
      hp: 600, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 0, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Ледяной Рыцарь', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'ice-knight', image: 'ice-knight', charName: '',
      rawcode: 'U01T',
      strBase: 26, strGain: 3, agiBase: 18, agiGain: 2, intBase: 18, intGain: 2,
      hp: 650, mp: 200, atk: 20, def: 0, atkSpeed: 2, hpRegen: 0, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Хаотическая Форма', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'chaos-lord-chaos', image: 'chaos-lord-chaos', charName: '',
      isAltForm: true,
      rawcode: 'H088',
      strBase: 30, strGain: 3, agiBase: 15, agiGain: 2, intBase: 15, intGain: 2,
      hp: 1600, mp: 0, atk: 130, def: 12, atkSpeed: 2, hpRegen: 21, mpRegen: 0.01, speed: 390, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Привратник Ада', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'hell-gatekeeper', image: 'hell-gatekeeper', charName: '',
      unique: true,
      isAltForm: true,
      rawcode: 'H08A',
      strBase: 30, strGain: 3, agiBase: 15, agiGain: 2, intBase: 15, intGain: 2,
      hp: 800, mp: 0, atk: 30, def: 0, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Костолом', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'bonebreaker-alt', image: 'bonebreaker-alt', charName: '',
      isAltForm: true,
      rawcode: 'H099',
      strBase: 1, strGain: 3, agiBase: 1, agiGain: 2, intBase: 1, intGain: 2,
      hp: 600, mp: 0, atk: 30, def: 3, atkSpeed: 0, hpRegen: 5, mpRegen: 0.01, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Всадник', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'rider-mounted', image: 'rider-mounted', charName: '',
      isAltForm: true,
      rawcode: 'O004',
      strBase: 25, strGain: 3, agiBase: 19, agiGain: 2, intBase: 0, intGain: 2,
      hp: 1250, mp: 0, atk: 177, def: 1, atkSpeed: 1, hpRegen: 1, mpRegen: 0.01, speed: 522, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Гнев Титана', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'titan-enraged', image: 'titan-enraged', charName: '',
      isAltForm: true,
      rawcode: 'O00C',
      strBase: 27, strGain: 3, agiBase: 18, agiGain: 2, intBase: 0, intGain: 2,
      hp: 1250, mp: 0, atk: 225, def: 21, atkSpeed: 1.7, hpRegen: 15, mpRegen: 0.01, speed: 350, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Лорд Хаоса', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'chaos-lord-alt', image: 'chaos-lord-alt', charName: '',
      isAltForm: true,
      rawcode: 'U00B',
      strBase: 22, strGain: 3, agiBase: 0, agiGain: 2, intBase: 0, intGain: 2,
      hp: 1700, mp: 0, atk: 170, def: 2, atkSpeed: 1.7, hpRegen: 50, mpRegen: 0.01, speed: 522, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Пивовар', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'brewmaster', image: 'brewmaster', charName: '',
      rawcode: 'N002',
      strBase: 24, strGain: 3, agiBase: 17, agiGain: 2, intBase: 19, intGain: 2,
      hp: 650, mp: 0, atk: 20, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Чародей', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'sorcerer', image: 'sorcerer', charName: '',
      rawcode: 'H011',
      strBase: 16, strGain: 2, agiBase: 16, agiGain: 2, intBase: 28, intGain: 3,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Астральный Маг', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'astral-mage', image: 'astral-mage', charName: '',
      unique: true,
      rawcode: 'H055',
      strBase: 18, strGain: 2, agiBase: 14, agiGain: 2, intBase: 28, intGain: 3,
      hp: 200, mp: 150, atk: 25, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Демон', title: '', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'demon', image: 'demon', charName: '',
      unique: true,
      rawcode: 'O00M',
      strBase: 25, strGain: 2, agiBase: 22, agiGain: 3, intBase: 13, intGain: 2,
      hp: 500, mp: 150, atk: 46, def: 2, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 305, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Пожиратель Пламени', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'flame-eater', image: 'flame-eater', charName: '',
      unique: true,
      rawcode: 'H08O',
      strBase: 18, strGain: 2, agiBase: 16, agiGain: 2, intBase: 26, intGain: 2,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Темный Мастер', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'dark-master', image: 'dark-master', charName: '',
      unique: true,
      rawcode: 'H07E',
      strBase: 20, strGain: 2, agiBase: 20, agiGain: 2, intBase: 20, intGain: 2,
      hp: 200, mp: 500, atk: 50, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Вершитель', title: '', attr: 'strength', role: 'support', roleName: 'Помощник', heroId: 'arbiter', image: 'arbiter', charName: '',
      wip: true,
      rawcode: 'H0A6',
      strBase: 0, strGain: 2, agiBase: 16, agiGain: 2, intBase: 28, intGain: 2,
      hp: 200, mp: 0, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0, speed: 0.01, range: 150, sightDay: 1800, sightNight: 800 },


    // === ЛОВКОСТЬ ===

    { name: 'Иллюзионист', title: 'Мастер обмана', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'illusionist', image: 'illusionist', charName: 'Алексей',
      rawcode: 'E000',
      strBase: 17, strGain: 2, agiBase: 22, agiGain: 3, intBase: 18, intGain: 2,
      hp: 200, mp: 150, atk: 70, def: 4, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Мурлок', title: 'Подводный охотник', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'murloc', image: 'murloc', charName: '',
      rawcode: 'E004',
      strBase: 20, strGain: 2, agiBase: 26, agiGain: 3, intBase: 14, intGain: 2,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Темная Лучница', title: 'Ледяная охотница', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'dark-archer', image: 'dark-archer', charName: '',
      rawcode: 'E00O',
      strBase: 20, strGain: 2, agiBase: 25, agiGain: 3, intBase: 15, intGain: 2,
      hp: 250, mp: 150, atk: 60, def: 2, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Воительница', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'warrioress', image: 'warrioress', charName: '',
      rawcode: 'E00H',
      strBase: 21, strGain: 2, agiBase: 24, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 0, atk: 50, def: 2, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Жрица Луны', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'priestess', image: 'priestess', charName: '',
      rawcode: 'E010',
      strBase: 18, strGain: 2, agiBase: 27, agiGain: 3, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 60, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Стражница', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'guardian', image: 'guardian', charName: '',
      rawcode: 'E020',
      strBase: 21, strGain: 2, agiBase: 24, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 0, atk: 40, def: 2, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Зодиак', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'zodiac', image: 'zodiac', charName: '',
      unique: true,
      rawcode: 'E02O',
      strBase: 18, strGain: 2, agiBase: 24, agiGain: 3, intBase: 18, intGain: 2,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 0, hpRegen: 0, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Ночной Хищник', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'night-predator', image: 'night-predator', charName: '',
      rawcode: 'E03S',
      strBase: 25, strGain: 2, agiBase: 25, agiGain: 3, intBase: 10, intGain: 2,
      hp: 200, mp: 150, atk: 60, def: 1, atkSpeed: 0, hpRegen: 0, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 1800 },

    { name: 'Егерь', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'ranger', image: 'ranger', charName: '',
      rawcode: 'H001',
      strBase: 17, strGain: 2, agiBase: 27, agiGain: 3, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 70, def: 1, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Тень', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'shadow', image: 'shadow', charName: '',
      rawcode: 'H037',
      strBase: 20, strGain: 2, agiBase: 25, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 55, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 295, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Десантник', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'marine', image: 'marine', charName: '',
      rawcode: 'H03H',
      strBase: 18, strGain: 2, agiBase: 25, agiGain: 3, intBase: 17, intGain: 2,
      hp: 250, mp: 150, atk: 40, def: 0, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Покорительница Молний', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'lightning-subjugator', image: 'lightning-subjugator', charName: '',
      rawcode: 'H046',
      strBase: 16, strGain: 2, agiBase: 28, agiGain: 3, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 45, def: 1, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Отец Тьмы', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'father-of-darkness', image: 'father-of-darkness', charName: '',
      unique: true,
      rawcode: 'H089',
      strBase: 17, strGain: 2, agiBase: 25, agiGain: 3, intBase: 18, intGain: 2,
      hp: 250, mp: 150, atk: 70, def: 0, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 305, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Темный Рыцарь', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'dark-knight', image: 'dark-knight', charName: '',
      rawcode: 'H09N',
      strBase: 20, strGain: 2, agiBase: 26, agiGain: 3, intBase: 14, intGain: 2,
      hp: 200, mp: 150, atk: 70, def: 0, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Астральная Охотница', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'astral-huntress', image: 'astral-huntress', charName: '',
      rawcode: 'H0AG',
      strBase: 17, strGain: 2, agiBase: 27, agiGain: 3, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 45, def: 0, atkSpeed: 1.7, hpRegen: 0, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Пламенный Берсеркер', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'flame-berserker', image: 'flame-berserker', charName: '',
      rawcode: 'O008',
      strBase: 17, strGain: 2, agiBase: 29, agiGain: 3, intBase: 15, intGain: 2,
      hp: 300, mp: 150, atk: 65, def: 2, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Грозовой Рыцарь', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'storm-knight', image: 'storm-knight', charName: '',
      rawcode: 'O00F',
      strBase: 21, strGain: 2, agiBase: 24, agiGain: 3, intBase: 15, intGain: 2,
      hp: 250, mp: 150, atk: 40, def: 0, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Водяной', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'water-spirit', image: 'water-spirit', charName: '',
      rawcode: 'O00L',
      strBase: 18, strGain: 2, agiBase: 28, agiGain: 3, intBase: 15, intGain: 2,
      hp: 450, mp: 150, atk: 40, def: 2, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Вампир', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'vampire', image: 'vampire', charName: '',
      unique: true,
      rawcode: 'U006',
      strBase: 15, strGain: 2, agiBase: 30, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Демоническая Форма', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'illusionist-demon', image: 'illusionist-demon', charName: '',
      isAltForm: true,
      rawcode: 'E002',
      strBase: 20, strGain: 2, agiBase: 22, agiGain: 3, intBase: 18, intGain: 2,
      hp: 1200, mp: 0, atk: 170, def: 4, atkSpeed: 0, hpRegen: 60, mpRegen: 0.01, speed: 0, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Пламенный Берсеркер', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'flame-berserker-alt', image: 'flame-berserker-alt', charName: '',
      isAltForm: true,
      rawcode: 'O009',
      strBase: 17, strGain: 2, agiBase: 29, agiGain: 3, intBase: 0, intGain: 2,
      hp: 1300, mp: 150, atk: 165, def: 2, atkSpeed: 1.7, hpRegen: 102, mpRegen: 0.01, speed: 290, range: 750, sightDay: 1800, sightNight: 800 },

    { name: 'Самурай', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'samurai', image: 'samurai', charName: '',
      rawcode: 'O000',
      strBase: 15, strGain: 2, agiBase: 30, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Мастер клинка', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'blademaster', image: 'blademaster', charName: '',
      wip: true,
      rawcode: 'O00R',
      strBase: 18, strGain: 2, agiBase: 28, agiGain: 3, intBase: 14, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Призрак', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'ghost', image: 'ghost', charName: '',
      rawcode: 'O002',
      strBase: 20, strGain: 2, agiBase: 30, agiGain: 3, intBase: 10, intGain: 2,
      hp: 200, mp: 150, atk: 55, def: 2, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Морской Страж', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'sea-guard', image: 'sea-guard', charName: '',
      rawcode: 'O005',
      strBase: 20, strGain: 2, agiBase: 26, agiGain: 3, intBase: 14, intGain: 2,
      hp: 200, mp: 150, atk: 45, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Звездный Дух', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'star-spirit', image: 'star-spirit', charName: '',
      rawcode: 'O00K',
      strBase: 19, strGain: 2, agiBase: 25, agiGain: 3, intBase: 0, intGain: 2,
      hp: 250, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 0, range: 700, sightDay: 1800, sightNight: 800 },

    { name: 'Ночная Мстительница', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'night-avenger', image: 'night-avenger', charName: '',
      rawcode: 'O00O',
      strBase: 15, strGain: 2, agiBase: 30, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 0, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0, speed: 0, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Скелет', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'skeleton', image: 'skeleton', charName: '',
      unique: true,
      rawcode: 'O00E',
      strBase: 16, strGain: 2, agiBase: 28, agiGain: 3, intBase: 0, intGain: 2,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Мятежник', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'rebel', image: 'rebel', charName: '',
      unique: true,
      rawcode: 'O00P',
      strBase: 15, strGain: 2, agiBase: 28, agiGain: 3, intBase: 17, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Ассасин', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'assassin', image: 'assassin', charName: '',
      unique: true,
      rawcode: 'O010',
      strBase: 20, strGain: 2, agiBase: 25, agiGain: 3, intBase: 15, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Огненная Панда', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'fire-panda', image: 'fire-panda', charName: '',
      unique: true,
      rawcode: 'O011',
      strBase: 10, strGain: 2, agiBase: 40, agiGain: 3, intBase: 10, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Блудсасир', title: '', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'bloodsucker', image: 'bloodsucker', charName: '',
      wip: true,
      rawcode: 'H095',
      strBase: 23, strGain: 1.8, agiBase: 24, agiGain: 3, intBase: 18, intGain: 1.696875,
      hp: 150, mp: 0, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },


    // === РАЗУМ ===

    { name: 'Громовержец', title: 'Повелитель молний', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'thundergod', image: 'thundergod', charName: 'Василий',
      rawcode: 'O001',
      strBase: 24, strGain: 2, agiBase: 12, agiGain: 2, intBase: 24, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 0, atkSpeed: 2.25, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Верховный Маг', title: 'Маг воды', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'archmage', image: 'Archmage', charName: '',
      rawcode: 'H02P',
      strBase: 16, strGain: 2, agiBase: 17, agiGain: 2, intBase: 27, intGain: 3,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Леший', title: 'Друид', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'leshy', image: 'leshy', charName: '',
      rawcode: 'E006',
      strBase: 20, strGain: 2, agiBase: 18, agiGain: 2, intBase: 22, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.03, speed: 320, range: 550, sightDay: 1800, sightNight: 800 },

    { name: 'Некромонгер', title: 'Повелитель мёртвых', attr: 'intelligence', role: 'support', roleName: 'Поддержка', heroId: 'necromonger', image: 'necromonger', charName: '',
      rawcode: 'H06G',
      strBase: 20, strGain: 2, agiBase: 15, agiGain: 2, intBase: 25, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.04, speed: 310, range: 750, sightDay: 1800, sightNight: 800 },

    { name: 'Дух Природы', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'spirit-of-nature', image: 'spirit-of-nature', charName: '',
      isAltForm: true,
      rawcode: 'E03H',
      strBase: 20, strGain: 2, agiBase: 18, agiGain: 2, intBase: 22, intGain: 3,
      hp: 1250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 51, mpRegen: 0, speed: 0, range: 750, sightDay: 800, sightNight: 800 },

    { name: 'Воин Света', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'warrior-of-light', image: 'warrior-of-light', charName: '',
      rawcode: 'H00F',
      strBase: 21, strGain: 2, agiBase: 13, agiGain: 2, intBase: 26, intGain: 3,
      hp: 200, mp: 150, atk: 20, def: 0, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Повелитель Тьмы', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'dark-lord', image: 'dark-lord', charName: '',
      rawcode: 'H00V',
      strBase: 18, strGain: 2, agiBase: 13, agiGain: 2, intBase: 29, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 310, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Темный Маг', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'dark-mage', image: 'dark-mage', charName: '',
      rawcode: 'H02F',
      strBase: 18, strGain: 2, agiBase: 12, agiGain: 2, intBase: 30, intGain: 3,
      hp: 200, mp: 150, atk: 30, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Волшебница Ветров', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'wind-enchantress', image: 'wind-enchantress', charName: '',
      rawcode: 'H02G',
      strBase: 15, strGain: 2, agiBase: 15, agiGain: 2, intBase: 30, intGain: 3,
      hp: 200, mp: 150, atk: 25, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Маг Воздуха', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'air-mage', image: 'air-mage', charName: '',
      rawcode: 'H04E',
      strBase: 15, strGain: 2, agiBase: 18, agiGain: 2, intBase: 27, intGain: 3,
      hp: 200, mp: 150, atk: 25, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Ведьмак Хаоса', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'chaos-witcher', image: 'chaos-witcher', charName: '',
      unique: true,
      rawcode: 'H08T',
      strBase: 18, strGain: 2, agiBase: 16, agiGain: 2, intBase: 26, intGain: 3,
      hp: 200, mp: 250, atk: 25, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Шторм', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'storm', image: 'storm', charName: '',
      rawcode: 'N00E',
      strBase: 15, strGain: 2, agiBase: 15, agiGain: 2, intBase: 30, intGain: 3,
      hp: 200, mp: 150, atk: 30, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 320, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Рыцарь Глубин', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'knight-of-depths', image: 'knight-of-depths', charName: '',
      rawcode: 'O00G',
      strBase: 20, strGain: 2, agiBase: 14, agiGain: 2, intBase: 26, intGain: 3,
      hp: 300, mp: 150, atk: 25, def: 0, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Гидралиск', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'hydralisk', image: 'hydralisk', charName: '',
      unique: true,
      rawcode: 'O00N',
      strBase: 16, strGain: 2, agiBase: 18, agiGain: 2, intBase: 26, intGain: 3,
      hp: 300, mp: 150, atk: 25, def: 0, atkSpeed: 2, hpRegen: 1, mpRegen: 0, speed: 300, range: 600, sightDay: 1800, sightNight: 800 },


    { name: 'Повелитель Льдов', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'frost-lord', image: 'frost-lord', charName: '',
      rawcode: 'U000',
      strBase: 0, strGain: 2, agiBase: 13, agiGain: 2, intBase: 32, intGain: 3,
      hp: 200, mp: 0, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0, mpRegen: 0, speed: 280, range: 150, sightDay: 1800, sightNight: 800 },

    { name: 'Повелитель Огня', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'fire-lord', image: 'fire-lord', charName: '',
      rawcode: 'N005',
      strBase: 16, strGain: 2, agiBase: 17, agiGain: 2, intBase: 27, intGain: 3,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0, mpRegen: 0, speed: 305, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Повелитель Вихрей', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'wind-lord', image: 'wind-lord', charName: '',
      rawcode: 'O007',
      strBase: 19, strGain: 2, agiBase: 14, agiGain: 2, intBase: 27, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0, speed: 305, range: 750, sightDay: 1800, sightNight: 800 },

    { name: 'Владыка Молний', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'lightning-lord', image: 'lightning-lord', charName: '',
      rawcode: 'O00H',
      strBase: 16, strGain: 2, agiBase: 14, agiGain: 2, intBase: 30, intGain: 3,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 310, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Темный Шаман', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'dark-shaman', image: 'dark-shaman', charName: '',
      rawcode: 'O00I',
      strBase: 15, strGain: 2, agiBase: 13, agiGain: 2, intBase: 32, intGain: 3,
      hp: 250, mp: 0, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 290, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Снежная Королева', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'snow-queen', image: 'snow-queen', charName: '',
      rawcode: 'O00J',
      strBase: 15, strGain: 2, agiBase: 15, agiGain: 2, intBase: 30, intGain: 3,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0, speed: 305, range: 600, sightDay: 1800, sightNight: 800 },

    { name: 'Владыка Грома', title: '', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'thunder-lord-2', image: 'thunder-lord-2', charName: '',
      wip: true,
      rawcode: 'O00X',
      strBase: 13, strGain: 2, agiBase: 14, agiGain: 2, intBase: 28, intGain: 3,
      hp: 250, mp: 0, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0, speed: 0, range: 150, sightDay: 1800, sightNight: 800 },

];

function findHero(heroId) {
    return HEROES_DATA.find(function(h) { return h.heroId === heroId; }) || null;
}

// Маппинг атрибутов для отображения
var ATTR_MAP = {
    strength: { label: 'Сила', icon: 'fas fa-fist-raised', color: '#e74c3c' },
    agility: { label: 'Ловкость', icon: 'fas fa-feather-alt', color: '#2ecc71' },
    intelligence: { label: 'Разум', icon: 'fas fa-hat-wizard', color: '#3498db' }
};

// Маппинг ролей → CSS-класс для бейджа
var ROLE_CLASS_MAP = {
    tank: 'role-tank',
    carry: 'role-carry',
    support: 'role-support',
    nuker: 'role-nuker',
    pusher: 'role-pusher',
    initiator: 'role-initiator',
    disabler: 'role-disabler'
};

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
    // Все герои с HTML-страницами (не альт-формы и не WIP)
    var pageHeroIds = HEROES_DATA
        .filter(function(h) { return !h.isAltForm && !h.wip; })
        .map(function(h) { return h.heroId; });
    var idx = pageHeroIds.indexOf(heroId);
    if (idx === -1) return '';

    var prevId = pageHeroIds[(idx - 1 + pageHeroIds.length) % pageHeroIds.length];
    var nextId = pageHeroIds[(idx + 1) % pageHeroIds.length];
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
