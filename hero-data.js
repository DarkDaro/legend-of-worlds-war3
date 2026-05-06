/**
 * hero-data.js — Общий список героев для heroes.html и глобального поиска.
 * Просто добавляй новых героев в этот массив!
 */
var HEROES_DATA = [
    // Сила
    { name: 'Адмирал', title: 'Морской воин', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'admiral', image: 'admiral' },
    { name: 'Друид', title: 'Хранитель природы', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'druid', image: 'druid' },
    { name: 'Киборг', title: 'Механический воин', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'cyborg', image: 'cyborg' },
    { name: 'Паладин', title: 'Святой рыцарь', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'paladin', image: 'paladin' },
    { name: 'Король гор', title: 'Тан', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'mountainking', image: 'mountainking', wip: true },
    { name: 'Пожиратель душ', title: 'Голод Пустоты', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'souleater', image: 'souleater', unique: true, wip: true },
    { name: 'Огненный страж', title: 'Элементаль пламени', attr: 'strength', role: 'tank', roleName: 'Танк', heroId: 'flamewarden', image: 'flamewarden', unique: true, wip: true },
    // Ловкость
    { name: 'Жрица Луны', title: 'Лучница ночи', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'priestess', image: 'priestess', wip: true },
    { name: 'Иллюзионист', title: 'Мастер обмана', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'illusionist', image: 'illusionist', wip: true },
    { name: 'Мурлок', title: 'Подводный охотник', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'murloc', image: 'murloc', wip: true },
    { name: 'Самурай', title: 'Мастер меча', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'samurai', image: 'samurai', wip: true },
    { name: 'Мастер клинка', title: 'Элитный мечник', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'blademaster', image: 'blademaster', wip: true },
    { name: 'Охотник на демонов', title: 'Мститель', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'demonhunter', image: 'demonhunter', wip: true },
    { name: 'Лучница', title: 'Ледяная охотница', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'drowranger', image: 'DarkRanger', wip: true },
    { name: 'Теневой клинок', title: 'Убийца из тени', attr: 'agility', role: 'damager', roleName: 'Дамагер', heroId: 'shadowblade', image: 'shadowblade', unique: true, wip: true },
    // Интеллект
    { name: 'Громовержец', title: 'Повелитель молний', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'thunderer', image: 'thunderer', wip: true },
    { name: 'Повелитель Льдов', title: 'Маг холода', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'icelord', image: 'icelord', wip: true },
    { name: 'Архимаг', title: 'Маг воды', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'archmage', image: 'Archmage', wip: true },
    { name: 'Лич', title: 'Маг льда', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'lich', image: 'lich', wip: true },
    { name: 'Провидец', title: 'Шаман', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'farseer', image: 'FarSeer', wip: true },
    { name: 'Хранитель рощи', title: 'Друид', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'keeper', image: 'keeper', wip: true },
    { name: 'Хромомант', title: 'Повелитель времени', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'chronomancer', image: 'chronomancer', unique: true, wip: true },
    { name: 'Шаман крови', title: 'Запретная магия', attr: 'intelligence', role: 'support', roleName: 'Помощник', heroId: 'bloodshaman', image: 'bloodshaman', unique: true, wip: true },
    { name: 'Некромант', title: 'Повелитель мёртвых', attr: 'intelligence', role: 'support', roleName: 'Поддержка', heroId: 'necromancer', image: 'necromancer', wip: true },
];
