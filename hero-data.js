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

    { name: 'Адмирал', title: 'Морской воин', attr: 'strength', roles: ['tank', 'initiator'], roleNames: ['Танк', 'Инициатор'], heroId: 'admiral', image: 'admiral', charName: 'Прохор',
      rawcode: 'H03J',
      strBase: 28, strGain: 5, agiBase: 14, agiGain: 1.5, intBase: 14, intGain: 1.5,
      hp: 650, mp: 150, atk: 25, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Друид', title: 'Хранитель природы', attr: 'strength', roles: ['healer', 'support'], roleNames: ['Целитель', 'Помощник'], heroId: 'druid', image: 'druid', charName: 'Сильвестр',
      rawcode: 'E001',
      strBase: 25, strGain: 2, agiBase: 12, agiGain: 1.5, intBase: 23, intGain: 4.5,
      hp: 660, mp: 150, atk: 20, def: 2, atkSpeed: 2, hpRegen: 4, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Киборг', title: 'Механический воин', attr: 'strength', roles: ['tank', 'bruiser'], roleNames: ['Танк', 'Рубака'], heroId: 'cyborg', image: 'cyborg', charName: 'Алекс',
      rawcode: 'H000',
      strBase: 20, strGain: 5, agiBase: 16, agiGain: 1.5, intBase: 24, intGain: 1.5,
      hp: 650, mp: 200, atk: 25, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Паладин', title: 'Святой рыцарь', attr: 'strength', roles: ['tank', 'healer'], roleNames: ['Танк', 'Целитель'], heroId: 'paladin', image: 'paladin', charName: 'Светозар',
      rawcode: 'H00H',
      strBase: 24, strGain: 5, agiBase: 13, agiGain: 1.5, intBase: 23, intGain: 1.5,
      hp: 800, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Астральный Палач', title: '', attr: 'strength', roles: ['tank', 'initiator'], roleNames: ['Танк', 'Инициатор'], heroId: 'astral-executioner', image: 'astral-executioner', charName: 'Геннадий',
      rawcode: 'E011',
      strBase: 25, strGain: 5, agiBase: 18, agiGain: 1.5, intBase: 17, intGain: 1.5,
      hp: 650, mp: 150, atk: 20, def: 1, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Костолом', title: '', attr: 'strength', roles: ['bruiser', 'tank'], roleNames: ['Рубака', 'Танк'], heroId: 'bonebreaker', image: 'bonebreaker', charName: 'Иннокентий',
      rawcode: 'H01U',
      strBase: 28, strGain: 5, agiBase: 12, agiGain: 1.5, intBase: 20, intGain: 1.5,
      hp: 650, mp: 150, atk: 45, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 295, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Скала', title: '', attr: 'strength', roles: ['support'], roleNames: ['Помощник'], heroId: 'rock', image: 'rock', charName: '',
      wip: true,
      rawcode: 'H020',
      strGain: 3.5, agiGain: 2, intGain: 2.5,
      hp: 300, mp: 150, atk: 40, def: 2, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Огненный Рыцарь', title: '', attr: 'strength', roles: ['bruiser', 'initiator'], roleNames: ['Рубака', 'Инициатор'], heroId: 'fire-knight', image: 'fire-knight', charName: 'Мстислав',
      rawcode: 'H02A',
      strBase: 25, strGain: 4.5, agiBase: 15, agiGain: 2, intBase: 20, intGain: 1.5,
      hp: 800, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Воин Глубин', title: '', attr: 'strength', roles: ['tank', 'initiator'], roleNames: ['Танк', 'Инициатор'], heroId: 'deep-warrior', image: 'deep-warrior', charName: 'Тихон',
      rawcode: 'H07A',
      strBase: 32, strGain: 5, agiBase: 16, agiGain: 1.5, intBase: 12, intGain: 1.5,
      hp: 600, mp: 150, atk: 35, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 305, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Рыцарь Света', title: '', attr: 'strength', roles: ['support'], roleNames: ['Помощник'], heroId: 'knight-of-light', image: 'knight-of-light', charName: '',
      wip: true,
      rawcode: 'H098',
      strGain: 3.5, agiGain: 2, intGain: 2.5,
      hp: 200, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Тирион', title: '', attr: 'strength', roles: ['tank'], roleNames: ['Танк'], heroId: 'tyrion', image: 'tyrion', charName: '',
      wip: true,
      rawcode: 'H0A7',
      strGain: 4, agiGain: 2, intGain: 2,
      hp: 800, mp: 150, atk: 55, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Разрушитель', title: '', attr: 'strength', roles: ['bruiser', 'initiator'], roleNames: ['Рубака', 'Инициатор'], heroId: 'destroyer', image: 'destroyer', charName: 'Кузьма',
      rawcode: 'N00I',
      strBase: 32, strGain: 4.5, agiBase: 14, agiGain: 2, intBase: 14, intGain: 1.5,
      hp: 750, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Всадник', title: '', attr: 'strength', roles: ['bruiser', 'initiator'], roleNames: ['Рубака', 'Инициатор'], heroId: 'rider', image: 'rider', charName: 'Ромео',
      forms: ['rider-mounted'],
      rawcode: 'O003',
      strBase: 25, strGain: 4.5, agiBase: 19, agiGain: 2, intBase: 16, intGain: 1.5,
      hp: 650, mp: 150, atk: 27, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Вождь Минотавров', title: '', attr: 'strength', roles: ['bruiser', 'initiator'], roleNames: ['Рубака', 'Инициатор'], heroId: 'minotaur-chief', image: 'minotaur-chief', charName: 'Марк',
      rawcode: 'O006',
      strBase: 30, strGain: 4.5, agiBase: 16, agiGain: 2, intBase: 14, intGain: 1.5,
      hp: 700, mp: 150, atk: 25, def: 2, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Вождь Орков', title: '', attr: 'strength', roles: ['bruiser', 'initiator'], roleNames: ['Рубака', 'Инициатор'], heroId: 'orc-chieftain', image: 'orc-chieftain', charName: 'Федор',
      rawcode: 'O00A',
      strBase: 25, strGain: 4.5, agiBase: 20, agiGain: 2, intBase: 15, intGain: 1.5,
      hp: 650, mp: 150, atk: 26, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 305, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Титан', title: '', attr: 'strength', roles: ['tank', 'initiator'], roleNames: ['Танк', 'Инициатор'], heroId: 'titan', image: 'titan', charName: 'Андрей',
      forms: ['titan-enraged'],
      rawcode: 'O00B',
      strBase: 27, strGain: 5, agiBase: 18, agiGain: 1.5, intBase: 15, intGain: 1.5,
      hp: 750, mp: 150, atk: 25, def: 1, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Вурдалак', title: '', attr: 'strength', roles: ['assassin', 'bruiser'], roleNames: ['Убийца', 'Рубака'], heroId: 'vurdalak', image: 'vurdalak', charName: 'Вадик',
      rawcode: 'O00D',
      strBase: 30, strGain: 3.5, agiBase: 14, agiGain: 3, intBase: 16, intGain: 1.5,
      hp: 650, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 3, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Ангел Смерти', title: '', attr: 'strength', roles: ['support'], roleNames: ['Помощник'], heroId: 'angel-of-death', image: 'angel-of-death', charName: '',
      wip: true,
      rawcode: 'O00Q',
      strGain: 3.5, agiGain: 2, intGain: 2.5,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Мясник', title: '', attr: 'strength', roles: ['bruiser', 'assassin'], roleNames: ['Рубака', 'Убийца'], heroId: 'butcher', image: 'butcher', charName: 'Энди',
      rawcode: 'U001',
      strBase: 31, strGain: 4, agiBase: 16, agiGain: 2.5, intBase: 13, intGain: 1.5,
      hp: 1000, mp: 150, atk: 20, def: 2, atkSpeed: 2, hpRegen: 5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Огненный Голем', title: '', attr: 'strength', roles: ['tank', 'initiator'], roleNames: ['Танк', 'Инициатор'], heroId: 'fire-golem-hero', image: 'fire-golem-hero', charName: 'Джек',
      rawcode: 'U007',
      strBase: 31, strGain: 5, agiBase: 15, agiGain: 1.5, intBase: 14, intGain: 1.5,
      hp: 700, mp: 150, atk: 20, def: 3, atkSpeed: 2, hpRegen: 5, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Король Проклятых', title: '', attr: 'strength', roles: ['controller', 'tank'], roleNames: ['Контролёр', 'Танк'], heroId: 'king-of-cursed', image: 'king-of-cursed', charName: 'Сергей',
      rawcode: 'U009',
      strBase: 25, strGain: 3, agiBase: 15, agiGain: 1.5, intBase: 20, intGain: 3.5,
      hp: 650, mp: 200, atk: 20, def: 1, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Лорд Хаоса', title: '', attr: 'strength', roles: ['bruiser', 'initiator'], roleNames: ['Рубака', 'Инициатор'], heroId: 'chaos-lord', image: 'chaos-lord', charName: 'Даркдарон',
      forms: ['chaos-lord-alt'],
      rawcode: 'U00A',
      strBase: 22, strGain: 4.5, agiBase: 16, agiGain: 2, intBase: 18, intGain: 1.5,
      hp: 700, mp: 150, atk: 20, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Повелитель Могил', title: '', attr: 'strength', roles: ['controller', 'bruiser'], roleNames: ['Контролёр', 'Рубака'], heroId: 'grave-lord', image: 'grave-lord', charName: 'Рикардо',
      unique: true,
      rawcode: 'U01J',
      strBase: 30, strGain: 3.5, agiBase: 14, agiGain: 1.5, intBase: 16, intGain: 3,
      hp: 600, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Ледяной Рыцарь', title: '', attr: 'strength', roles: ['tank', 'controller'], roleNames: ['Танк', 'Контролёр'], heroId: 'ice-knight', image: 'ice-knight', charName: 'Маркус',
      rawcode: 'U01T',
      strBase: 26, strGain: 4.5, agiBase: 18, agiGain: 1.5, intBase: 18, intGain: 2,
      hp: 650, mp: 200, atk: 20, def: 1, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Хаотическая Форма', title: '', attr: 'strength', roles: ['tank'], roleNames: ['Танк'], heroId: 'chaos-lord-chaos', image: 'chaos-lord-chaos', charName: 'Родион',
      isAltForm: true, formOf: 'hell-gatekeeper',
      rawcode: 'H088',
      strBase: 30, strGain: 5, agiBase: 15, agiGain: 1.5, intBase: 15, intGain: 1.5,
      hp: 1600, mp: 150, atk: 130, def: 12, atkSpeed: 2, hpRegen: 22, mpRegen: 0.01, speed: 390, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Привратник Ада', title: '', attr: 'strength', roles: ['tank'], roleNames: ['Танк'], heroId: 'hell-gatekeeper', image: 'hell-gatekeeper', charName: 'Родион',
      unique: true,
      forms: ['chaos-lord-chaos'],
      rawcode: 'H08A',
      strBase: 30, strGain: 5, agiBase: 15, agiGain: 1.5, intBase: 15, intGain: 1.5,
      hp: 800, mp: 150, atk: 30, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Костолом', title: '', attr: 'strength', roles: ['tank'], roleNames: ['Танк'], heroId: 'bonebreaker-alt', image: 'bonebreaker-alt', charName: 'Иннокентий',
      isAltForm: true,
      rawcode: 'H099',
      strBase: 1, strGain: 5, agiBase: 1, agiGain: 1.5, intBase: 1, intGain: 1.5,
      hp: 600, mp: 150, atk: 30, def: 3, atkSpeed: 2, hpRegen: 5, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Всадник', title: '', attr: 'strength', roles: ['tank'], roleNames: ['Танк'], heroId: 'rider-mounted', image: 'rider-mounted', charName: 'Ромео',
      isAltForm: true, formOf: 'rider',
      rawcode: 'O004',
      strBase: 25, strGain: 4.5, agiBase: 19, agiGain: 2, intBase: 16, intGain: 1.5,
      hp: 1250, mp: 150, atk: 177, def: 1, atkSpeed: 1, hpRegen: 1, mpRegen: 0.01, speed: 522, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Гнев Титана', title: '', attr: 'strength', roles: ['tank'], roleNames: ['Танк'], heroId: 'titan-enraged', image: 'titan-enraged', charName: 'Андрей',
      isAltForm: true, formOf: 'titan',
      rawcode: 'O00C',
      strBase: 27, strGain: 5, agiBase: 18, agiGain: 1.5, intBase: 15, intGain: 1.5,
      hp: 1250, mp: 150, atk: 225, def: 21, atkSpeed: 1.7, hpRegen: 15, mpRegen: 0.01, speed: 350, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Лорд Хаоса', title: '', attr: 'strength', roles: ['tank'], roleNames: ['Танк'], heroId: 'chaos-lord-alt', image: 'chaos-lord-alt', charName: 'Даркдарон',
      isAltForm: true, formOf: 'chaos-lord',
      rawcode: 'U00B',
      strBase: 22, strGain: 4.5, agiBase: 16, agiGain: 2, intBase: 18, intGain: 1.5,
      hp: 1700, mp: 150, atk: 170, def: 2, atkSpeed: 1.7, hpRegen: 52, mpRegen: 0.01, speed: 522, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Пивовар', title: '', attr: 'strength', roles: ['bruiser', 'controller'], roleNames: ['Рубака', 'Контролёр'], heroId: 'brewmaster', image: 'brewmaster', charName: 'Артур',
      rawcode: 'N002',
      strBase: 24, strGain: 4, agiBase: 17, agiGain: 2, intBase: 19, intGain: 2,
      hp: 650, mp: 150, atk: 20, def: 2, atkSpeed: 2, hpRegen: 2, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Чародей', title: '', attr: 'intelligence', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'sorcerer', image: 'sorcerer', charName: 'Кайл',
      rawcode: 'H011',
      strBase: 16, strGain: 1.5, agiBase: 16, agiGain: 2, intBase: 28, intGain: 4.5,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Астральный Маг', title: '', attr: 'intelligence', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'astral-mage', image: 'astral-mage', charName: 'Марина',
      unique: true,
      rawcode: 'H055',
      strBase: 18, strGain: 2.0, agiBase: 14, agiGain: 2.5, intBase: 28, intGain: 3.5,
      hp: 200, mp: 150, atk: 25, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Демон', title: '', attr: 'strength', roles: ['assassin', 'bruiser'], roleNames: ['Убийца', 'Рубака'], heroId: 'demon', image: 'demon', charName: 'Игорь',
      unique: true,
      rawcode: 'O00M',
      strBase: 25, strGain: 3.5, agiBase: 22, agiGain: 3.5, intBase: 13, intGain: 1.0,
      hp: 500, mp: 150, atk: 46, def: 2, atkSpeed: 2, hpRegen: 0.5, mpRegen: 0.01, speed: 305, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Пожиратель Пламени', title: '', attr: 'intelligence', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'flame-eater', image: 'flame-eater', charName: 'Феликс',
      unique: true,
      rawcode: 'H08O',
      strBase: 18, strGain: 2.0, agiBase: 16, agiGain: 2.0, intBase: 26, intGain: 4.0,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Темный Мастер', title: '', attr: 'intelligence', roles: ['controller', 'damager'], roleNames: ['Контролёр', 'Дамагер'], heroId: 'dark-master', image: 'dark-master', charName: 'Леонардо',
      unique: true,
      rawcode: 'H07E',
      strBase: 20, strGain: 2.5, agiBase: 20, agiGain: 2, intBase: 20, intGain: 3.5,
      hp: 200, mp: 500, atk: 50, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 700, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Вершитель', title: '', attr: 'strength', roles: ['support'], roleNames: ['Помощник'], heroId: 'arbiter', image: 'arbiter', charName: '',
      wip: true,
      rawcode: 'H0A6',
      strGain: 3, agiGain: 2, intGain: 3,
      hp: 200, mp: 150, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},


    // === ЛОВКОСТЬ ===

    { name: 'Иллюзионист', title: 'Мастер обмана', attr: 'agility', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'illusionist', image: 'illusionist', charName: 'Алексей',
      forms: ['illusionist-demon'],
      rawcode: 'E000',
      strBase: 17, strGain: 1.5, agiBase: 22, agiGain: 4.5, intBase: 18, intGain: 2,
      hp: 200, mp: 150, atk: 70, def: 4, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Мурлок', title: 'Подводный охотник', attr: 'agility', roles: ['assassin', 'bruiser'], roleNames: ['Убийца', 'Рубака'], heroId: 'murloc', image: 'murloc', charName: 'Пьер',
      rawcode: 'E004',
      strBase: 20, strGain: 1.5, agiBase: 26, agiGain: 5, intBase: 14, intGain: 1.5,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Темная Лучница', title: 'Ледяная охотница', attr: 'agility', roles: ['damager', 'assassin'], roleNames: ['Дамагер', 'Убийца'], heroId: 'dark-archer', image: 'dark-archer', charName: 'Алёна',
      rawcode: 'E00O',
      strBase: 20, strGain: 1.5, agiBase: 25, agiGain: 5, intBase: 15, intGain: 1.5,
      hp: 250, mp: 150, atk: 60, def: 2, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Воительница', title: '', attr: 'agility', roles: ['assassin', 'bruiser'], roleNames: ['Убийца', 'Рубака'], heroId: 'warrioress', image: 'warrioress', charName: 'Лианна',
      rawcode: 'E00H',
      strBase: 21, strGain: 1.5, agiBase: 24, agiGain: 5, intBase: 15, intGain: 1.5,
      hp: 200, mp: 150, atk: 50, def: 2, atkSpeed: 1.7, hpRegen: 0.50, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Жрица Луны', title: '', attr: 'agility', roles: ['damager', 'support'], roleNames: ['Дамагер', 'Помощник'], heroId: 'priestess', image: 'priestess', charName: 'Эльвира',
      rawcode: 'E010',
      strBase: 18, strGain: 1.5, agiBase: 27, agiGain: 4.5, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 60, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 700, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Стражница', title: '', attr: 'agility', roles: ['assassin', 'initiator'], roleNames: ['Убийца', 'Инициатор'], heroId: 'guardian', image: 'guardian', charName: 'Кристина',
      rawcode: 'E020',
      strBase: 21, strGain: 1.5, agiBase: 24, agiGain: 5, intBase: 15, intGain: 1.5,
      hp: 200, mp: 150, atk: 40, def: 2, atkSpeed: 1.7, hpRegen: 0.50, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Зодиак', title: '', attr: 'agility', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'zodiac', image: 'zodiac', charName: 'Глеб',
      unique: true,
      rawcode: 'E02O',
      strBase: 18, strGain: 1.5, agiBase: 24, agiGain: 4.5, intBase: 18, intGain: 2,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 1.7, hpRegen: 0.50, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Ночной Хищник', title: '', attr: 'agility', roles: ['assassin', 'initiator'], roleNames: ['Убийца', 'Инициатор'], heroId: 'night-predator', image: 'night-predator', charName: 'Лапа',
      rawcode: 'E03S',
      strBase: 25, strGain: 1.5, agiBase: 25, agiGain: 5, intBase: 10, intGain: 1.5,
      hp: 200, mp: 150, atk: 60, def: 1, atkSpeed: 1.7, hpRegen: 0.50, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 1800 , attackType: 'melee'},

    { name: 'Егерь', title: '', attr: 'agility', roles: ['damager', 'assassin'], roleNames: ['Дамагер', 'Убийца'], heroId: 'ranger', image: 'ranger', charName: 'Елена',
      rawcode: 'H001',
      strBase: 17, strGain: 1.5, agiBase: 27, agiGain: 5, intBase: 16, intGain: 1.5,
      hp: 200, mp: 150, atk: 70, def: 1, atkSpeed: 1.7, hpRegen: 1.0, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Тень', title: '', attr: 'agility', roles: ['assassin', 'controller'], roleNames: ['Убийца', 'Контролёр'], heroId: 'shadow', image: 'shadow', charName: 'Наполеон',
      rawcode: 'H037',
      strBase: 20, strGain: 1.5, agiBase: 25, agiGain: 5, intBase: 15, intGain: 1.5,
      hp: 200, mp: 150, atk: 55, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 295, range: 700, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Десантник', title: '', attr: 'agility', roles: ['damager', 'assassin'], roleNames: ['Дамагер', 'Убийца'], heroId: 'marine', image: 'marine', charName: 'Константин',
      rawcode: 'H03H',
      strBase: 18, strGain: 1.5, agiBase: 25, agiGain: 5, intBase: 17, intGain: 1.5,
      hp: 250, mp: 150, atk: 40, def: 2, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 700, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Покорительница Молний', title: '', attr: 'agility', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'lightning-subjugator', image: 'lightning-subjugator', charName: 'Екатерина',
      rawcode: 'H046',
      strBase: 16, strGain: 1.5, agiBase: 28, agiGain: 4.5, intBase: 16, intGain: 2,
      hp: 200, mp: 150, atk: 45, def: 1, atkSpeed: 1.7, hpRegen: 1.0, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Отец Тьмы', title: '', attr: 'agility', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'father-of-darkness', image: 'father-of-darkness', charName: 'Злыдень',
      unique: true,
      rawcode: 'H089',
      strBase: 17, strGain: 1.5, agiBase: 25, agiGain: 4.5, intBase: 18, intGain: 2,
      hp: 250, mp: 150, atk: 70, def: 2, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 305, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Темный Рыцарь', title: '', attr: 'agility', roles: ['bruiser', 'initiator'], roleNames: ['Рубака', 'Инициатор'], heroId: 'dark-knight', image: 'dark-knight', charName: 'Максим',
      rawcode: 'H09N',
      strBase: 20, strGain: 2, agiBase: 26, agiGain: 4.5, intBase: 14, intGain: 1.5,
      hp: 200, mp: 150, atk: 70, def: 2, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Астральная Охотница', title: '', attr: 'agility', roles: ['assassin', 'initiator'], roleNames: ['Убийца', 'Инициатор'], heroId: 'astral-huntress', image: 'astral-huntress', charName: 'Мия',
      rawcode: 'H0AG',
      strBase: 17, strGain: 1.5, agiBase: 27, agiGain: 5, intBase: 16, intGain: 1.5,
      hp: 200, mp: 150, atk: 45, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Пламенный Берсеркер', title: '', attr: 'agility', roles: ['bruiser', 'initiator'], roleNames: ['Рубака', 'Инициатор'], heroId: 'flame-berserker', image: 'flame-berserker', charName: 'Даниил',
      forms: ['flame-berserker-alt'],
      rawcode: 'O008',
      strBase: 17, strGain: 2, agiBase: 29, agiGain: 4.5, intBase: 15, intGain: 1.5,
      hp: 300, mp: 150, atk: 65, def: 2, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 290, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Грозовой Рыцарь', title: '', attr: 'agility', roles: ['damager', 'initiator'], roleNames: ['Дамагер', 'Инициатор'], heroId: 'storm-knight', image: 'storm-knight', charName: 'Дарио',
      rawcode: 'O00F',
      strBase: 21, strGain: 2, agiBase: 24, agiGain: 4.5, intBase: 15, intGain: 1.5,
      hp: 250, mp: 150, atk: 40, def: 1, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Водяной', title: '', attr: 'agility', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'water-spirit', image: 'water-spirit', charName: 'Анатолий',
      rawcode: 'O00L',
      strBase: 18, strGain: 1.5, agiBase: 28, agiGain: 4.5, intBase: 15, intGain: 2,
      hp: 450, mp: 150, atk: 40, def: 2, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 300, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Вампир', title: '', attr: 'agility', roles: ['assassin', 'bruiser'], roleNames: ['Убийца', 'Рубака'], heroId: 'vampire', image: 'vampire', charName: 'Влад',
      unique: true,
      rawcode: 'U006',
      strBase: 15, strGain: 1.5, agiBase: 30, agiGain: 5, intBase: 15, intGain: 1.5,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 2, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Демоническая Форма', title: '', attr: 'agility', roles: ['damager'], roleNames: ['Дамагер'], heroId: 'illusionist-demon', image: 'illusionist-demon', charName: 'Алексей',
      isAltForm: true, formOf: 'illusionist',
      rawcode: 'E002',
      strBase: 17, strGain: 1.5, agiBase: 22, agiGain: 4.5, intBase: 18, intGain: 2,
      hp: 1200, mp: 150, atk: 170, def: 4, atkSpeed: 0, hpRegen: 60, mpRegen: 0.01, speed: 320, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Пламенный Берсеркер', title: '', attr: 'agility', roles: ['damager'], roleNames: ['Дамагер'], heroId: 'flame-berserker-alt', image: 'flame-berserker-alt', charName: 'Даниил',
      isAltForm: true, formOf: 'flame-berserker',
      rawcode: 'O009',
      strBase: 17, strGain: 2, agiBase: 29, agiGain: 4.5, intBase: 15, intGain: 1.5,
      hp: 1300, mp: 150, atk: 165, def: 2, atkSpeed: 1.7, hpRegen: 102, mpRegen: 0.01, speed: 290, range: 750, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Самурай', title: '', attr: 'agility', roles: ['assassin', 'bruiser'], roleNames: ['Убийца', 'Рубака'], heroId: 'samurai', image: 'samurai', charName: 'Евгений',
      rawcode: 'O000',
      strBase: 15, strGain: 1.5, agiBase: 30, agiGain: 5, intBase: 15, intGain: 1.5,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Мастер клинка', title: '', attr: 'agility', roles: ['damager'], roleNames: ['Дамагер'], heroId: 'blademaster', image: 'blademaster', charName: '',
      wip: true,
      rawcode: 'O00R',
      strGain: 2, agiGain: 3.5, intGain: 2.5,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Призрак', title: '', attr: 'agility', roles: ['assassin', 'controller'], roleNames: ['Убийца', 'Контролёр'], heroId: 'ghost', image: 'ghost', charName: 'Моморо',
      rawcode: 'O002',
      strBase: 20, strGain: 1.5, agiBase: 30, agiGain: 5, intBase: 10, intGain: 1.5,
      hp: 200, mp: 150, atk: 55, def: 2, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Морской Страж', title: '', attr: 'agility', roles: ['initiator', 'controller'], roleNames: ['Инициатор', 'Контролёр'], heroId: 'sea-guard', image: 'sea-guard', charName: 'Гоша',
      rawcode: 'O005',
      strBase: 20, strGain: 1.5, agiBase: 26, agiGain: 3.5, intBase: 14, intGain: 3,
      hp: 200, mp: 150, atk: 45, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 280, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Звездный Дух', title: '', attr: 'agility', roles: ['damager', 'support'], roleNames: ['Дамагер', 'Помощник'], heroId: 'star-spirit', image: 'star-spirit', charName: 'Ульяна',
      rawcode: 'O00K',
      strBase: 19, strGain: 1.5, agiBase: 25, agiGain: 4.5, intBase: 16, intGain: 2,
      hp: 250, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 700, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Ночная Мстительница', title: '', attr: 'agility', roles: ['assassin', 'initiator'], roleNames: ['Убийца', 'Инициатор'], heroId: 'night-avenger', image: 'night-avenger', charName: 'Славянка',
      rawcode: 'O00O',
      strBase: 15, strGain: 1.5, agiBase: 30, agiGain: 5, intBase: 15, intGain: 1.5,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Скелет', title: '', attr: 'agility', roles: ['damager', 'assassin'], roleNames: ['Дамагер', 'Убийца'], heroId: 'skeleton', image: 'skeleton', charName: 'Андриан',
      unique: true,
      rawcode: 'O00E',
      strBase: 16, strGain: 1.5, agiBase: 28, agiGain: 5, intBase: 16, intGain: 1.5,
      hp: 200, mp: 150, atk: 40, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Мятежник', title: '', attr: 'agility', roles: ['bruiser', 'assassin'], roleNames: ['Рубака', 'Убийца'], heroId: 'rebel', image: 'rebel', charName: 'Цицерон',
      unique: true,
      rawcode: 'O00P',
      strBase: 15, strGain: 1.5, agiBase: 28, agiGain: 4.5, intBase: 17, intGain: 2,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Ассасин', title: '', attr: 'agility', roles: ['assassin', 'initiator'], roleNames: ['Убийца', 'Инициатор'], heroId: 'assassin', image: 'assassin', charName: 'Яна',
      unique: true,
      rawcode: 'O010',
      strBase: 20, strGain: 1.5, agiBase: 25, agiGain: 5, intBase: 15, intGain: 1.5,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 310, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Огненная Панда', title: '', attr: 'agility', roles: ['bruiser', 'controller'], roleNames: ['Рубака', 'Контролёр'], heroId: 'fire-panda', image: 'fire-panda', charName: 'Ксин',
      unique: true,
      rawcode: 'O011',
      strBase: 10, strGain: 1.5, agiBase: 40, agiGain: 4, intBase: 10, intGain: 2.5,
      hp: 200, mp: 150, atk: 50, def: 1, atkSpeed: 1.7, hpRegen: 0.5, mpRegen: 0.01, speed: 320, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

    { name: 'Искатель крови', title: '', attr: 'agility', roles: ['damager'], roleNames: ['Дамагер'], heroId: 'bloodsucker', image: 'bloodsucker', charName: '',
      wip: true,
      rawcode: 'H095',
      strGain: 2, agiGain: 3.5, intGain: 2.5,
      hp: 150, mp: 0, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},


    // === РАЗУМ ===

    { name: 'Громовержец', title: 'Повелитель молний', attr: 'intelligence', roles: ['damager', 'initiator'], roleNames: ['Дамагер', 'Инициатор'], heroId: 'thundergod', image: 'thundergod', charName: 'Василий',
      rawcode: 'O001',
      strBase: 24, strGain: 1.5, agiBase: 12, agiGain: 2.5, intBase: 24, intGain: 4,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Верховный Маг', title: 'Маг воды', attr: 'intelligence', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'archmage', image: 'archmage', charName: 'Павел',
      rawcode: 'H02P',
      strBase: 16, strGain: 1.5, agiBase: 17, agiGain: 2, intBase: 27, intGain: 4.5,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Леший', title: 'Друид', attr: 'intelligence', roles: ['controller', 'support'], roleNames: ['Контролёр', 'Помощник'], heroId: 'leshy', image: 'leshy', charName: 'Адам',
      forms: ['spirit-of-nature'],
      rawcode: 'E006',
      strBase: 20, strGain: 1.5, agiBase: 18, agiGain: 1.5, intBase: 22, intGain: 5,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 550, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Некромонгер', title: 'Повелитель мёртвых', attr: 'intelligence', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'necromonger', image: 'necromonger', charName: 'Дармонт',
      rawcode: 'H06G',
      strBase: 20, strGain: 1.5, agiBase: 15, agiGain: 2, intBase: 25, intGain: 4.5,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 750, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Дух Природы', title: '', attr: 'intelligence', roles: ['support'], roleNames: ['Помощник'], heroId: 'spirit-of-nature', image: 'spirit-of-nature', charName: 'Адам',
      isAltForm: true, formOf: 'leshy',
      rawcode: 'E03H',
      strBase: 20, strGain: 1.5, agiBase: 18, agiGain: 1.5, intBase: 22, intGain: 5,
      hp: 1250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 51, mpRegen: 0.01, speed: 320, range: 750, sightDay: 800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Воин Света', title: '', attr: 'intelligence', roles: ['healer', 'initiator'], roleNames: ['Целитель', 'Инициатор'], heroId: 'warrior-of-light', image: 'warrior-of-light', charName: 'Дмитрий',
      rawcode: 'H00F',
      strBase: 21, strGain: 2, agiBase: 13, agiGain: 2, intBase: 26, intGain: 4,
      hp: 200, mp: 150, atk: 20, def: 2, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0.01, speed: 290, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Повелитель Тьмы', title: '', attr: 'intelligence', roles: ['controller', 'damager'], roleNames: ['Контролёр', 'Дамагер'], heroId: 'dark-lord', image: 'dark-lord', charName: 'Багратион',
      rawcode: 'H00V',
      strBase: 18, strGain: 1.5, agiBase: 13, agiGain: 1.5, intBase: 29, intGain: 5,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Темный Маг', title: '', attr: 'intelligence', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'dark-mage', image: 'dark-mage', charName: 'Августин',
      rawcode: 'H02F',
      strBase: 18, strGain: 1.5, agiBase: 12, agiGain: 2, intBase: 30, intGain: 4.5,
      hp: 200, mp: 150, atk: 30, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Волшебница Ветров', title: '', attr: 'intelligence', roles: ['controller', 'support'], roleNames: ['Контролёр', 'Помощник'], heroId: 'wind-enchantress', image: 'wind-enchantress', charName: 'Виктория',
      rawcode: 'H02G',
      strBase: 15, strGain: 1.5, agiBase: 15, agiGain: 1.5, intBase: 30, intGain: 5,
      hp: 200, mp: 150, atk: 25, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Маг Воздуха', title: '', attr: 'intelligence', roles: ['controller', 'damager'], roleNames: ['Контролёр', 'Дамагер'], heroId: 'air-mage', image: 'air-mage', charName: 'Олег',
      rawcode: 'H04E',
      strBase: 15, strGain: 1.5, agiBase: 18, agiGain: 1.5, intBase: 27, intGain: 5,
      hp: 200, mp: 150, atk: 25, def: 2, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Ведьмак Хаоса', title: '', attr: 'intelligence', roles: ['damager', 'assassin'], roleNames: ['Дамагер', 'Убийца'], heroId: 'chaos-witcher', image: 'chaos-witcher', charName: 'Игнат',
      unique: true,
      rawcode: 'H08T',
      strBase: 18, strGain: 1.5, agiBase: 16, agiGain: 2, intBase: 26, intGain: 4.5,
      hp: 200, mp: 250, atk: 25, def: 2, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Шторм', title: '', attr: 'intelligence', roles: ['damager', 'initiator'], roleNames: ['Дамагер', 'Инициатор'], heroId: 'storm', image: 'storm', charName: 'Николай',
      rawcode: 'N00E',
      strBase: 15, strGain: 1.5, agiBase: 15, agiGain: 2.5, intBase: 30, intGain: 4,
      hp: 200, mp: 150, atk: 30, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 320, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Рыцарь Глубин', title: '', attr: 'intelligence', roles: ['controller', 'damager'], roleNames: ['Контролёр', 'Дамагер'], heroId: 'knight-of-depths', image: 'knight-of-depths', charName: 'Денис',
      rawcode: 'O00G',
      strBase: 20, strGain: 1.5, agiBase: 14, agiGain: 1.5, intBase: 26, intGain: 5,
      hp: 300, mp: 150, atk: 25, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Гидралиск', title: '', attr: 'intelligence', roles: ['damager', 'controller'], roleNames: ['Дамагер', 'Контролёр'], heroId: 'hydralisk', image: 'hydralisk', charName: 'Харитон',
      unique: true,
      rawcode: 'O00N',
      strBase: 16, strGain: 1.5, agiBase: 18, agiGain: 2, intBase: 26, intGain: 4.5,
      hp: 300, mp: 150, atk: 25, def: 1, atkSpeed: 2, hpRegen: 1, mpRegen: 0.01, speed: 300, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},


    { name: 'Повелитель Льдов', title: '', attr: 'intelligence', roles: ['controller', 'damager'], roleNames: ['Контролёр', 'Дамагер'], heroId: 'frost-lord', image: 'frost-lord', charName: 'Борис',
      rawcode: 'U000',
      strBase: 15, strGain: 1.5, agiBase: 13, agiGain: 1.5, intBase: 32, intGain: 5,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 2, mpRegen: 0.01, speed: 280, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Повелитель Огня', title: '', attr: 'intelligence', roles: ['damager', 'initiator'], roleNames: ['Дамагер', 'Инициатор'], heroId: 'fire-lord', image: 'fire-lord', charName: 'Михаил',
      rawcode: 'N005',
      strBase: 16, strGain: 1.5, agiBase: 17, agiGain: 2.5, intBase: 27, intGain: 4,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1.0, mpRegen: 0.01, speed: 305, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Повелитель Вихрей', title: '', attr: 'intelligence', roles: ['controller', 'damager'], roleNames: ['Контролёр', 'Дамагер'], heroId: 'wind-lord', image: 'wind-lord', charName: 'Григорий',
      rawcode: 'O007',
      strBase: 19, strGain: 1.5, agiBase: 14, agiGain: 1.5, intBase: 27, intGain: 5,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 0.5, mpRegen: 0.01, speed: 305, range: 750, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Владыка Молний', title: '', attr: 'intelligence', roles: ['damager', 'initiator'], roleNames: ['Дамагер', 'Инициатор'], heroId: 'lightning-lord', image: 'lightning-lord', charName: 'Альберт',
      rawcode: 'O00H',
      strBase: 16, strGain: 1.5, agiBase: 14, agiGain: 2.5, intBase: 30, intGain: 4,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 310, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Темный Шаман', title: '', attr: 'intelligence', roles: ['controller', 'damager'], roleNames: ['Контролёр', 'Дамагер'], heroId: 'dark-shaman', image: 'dark-shaman', charName: 'Августин',
      rawcode: 'O00I',
      strBase: 15, strGain: 1.5, agiBase: 13, agiGain: 1.5, intBase: 32, intGain: 5,
      hp: 250, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 290, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Снежная Королева', title: '', attr: 'intelligence', roles: ['controller', 'damager'], roleNames: ['Контролёр', 'Дамагер'], heroId: 'snow-queen', image: 'snow-queen', charName: 'Светлана',
      rawcode: 'O00J',
      strBase: 15, strGain: 1.5, agiBase: 15, agiGain: 1.5, intBase: 30, intGain: 5,
      hp: 200, mp: 150, atk: 20, def: 1, atkSpeed: 2.25, hpRegen: 1, mpRegen: 0.01, speed: 305, range: 600, sightDay: 1800, sightNight: 800 , attackType: 'ranged'},

    { name: 'Владыка Грома', title: '', attr: 'intelligence', roles: ['support'], roleNames: ['Помощник'], heroId: 'thunder-lord-2', image: 'thunder-lord-2', charName: '',
      wip: true,
      rawcode: 'O00X',
      strGain: 2, agiGain: 2, intGain: 4,
      hp: 250, mp: 150, atk: 0, def: 0, atkSpeed: 0, hpRegen: 0, mpRegen: 0.01, speed: 300, range: 150, sightDay: 1800, sightNight: 800 , attackType: 'melee'},

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
    bruiser: 'role-bruiser',
    damager: 'role-damager',
    assassin: 'role-assassin',
    initiator: 'role-initiator',
    controller: 'role-controller',
    healer: 'role-healer',
    support: 'role-support'
};

// Форматирование значения стата (null → «—»)
function statVal(v, suffix) {
    if (v === null || v === undefined) return '—';
    return suffix ? v + suffix : String(v);
}

// Сортировка героев по имени (кириллица)
function sortHeroesByName(arr) {
    return arr.slice().sort(function(a, b) { return a.name.localeCompare(b.name, 'ru'); });
}

// Рендер блока статов + таблицы приростов для карточки героя
function renderHeroStats(heroId) {
    var hero = findHero(heroId);
    if (!hero) return '<p style="color:var(--text-muted);">Данные героя недоступны</p>';

    var attr = ATTR_MAP[hero.attr] || ATTR_MAP.strength;
    var rangeLabel = (hero.range >= 400) ? 'Дальний бой' : 'Ближний бой';
    var roleClass = ROLE_CLASS_MAP[hero.roles[0]] || 'role-support';

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
    html += '<div class="stat-item"><i class="fas fa-tag"></i> Роль: <span class="' + roleClass + '">' + hero.roleNames.join(', ') + '</span></div>';
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
