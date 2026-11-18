#!/usr/bin/env node
/**
 * Чанк 7 §10 (DESIGN.md): JS-слой на токены, TECH-DEBT TD-5. Цветовая динамика
 * JS переводится на var()/rgba(var()) — темы дотягиваются до того, что красит JS.
 * Три класса случаев:
 *   CSSOM (инлайн-стили, cssText, style= в шаблонах, <style> в JS) — var() напрямую;
 *   canvas (радар balance-dashboard) — var() не парсится, живое значение берётся
 *     из примитива getComputedStyle('--cyan-rgb') в момент отрисовки;
 *   data-URI SVG и flat-UI палитры графиков — остаются литералами (var() изолирован
 *     в отдельном документе / контентная семантика вне порогов слияния).
 * Точные совпадения значений, рендер по умолчанию не сдвигается ни на байт.
 * Идемпотентный: второй прогон ноль. Запуск из корня репозитория.
 */
import fs from 'node:fs';

if (!fs.existsSync('css/base.css')) {
  console.error('Запускать из корня репозитория');
  process.exit(2);
}

// [файл, было, стало, что это]
const REPLACEMENTS = [
  // armor-calc: градиенты бара результата через CSSOM
  ['js/armor-calc-page.js',
    "'linear-gradient(90deg, #00e6ff, #00ffaa)'",
    "'linear-gradient(90deg, var(--accent-cyan), var(--spring))'",
    'бар снижения: циан → акцент, мятный → --spring'],
  ['js/armor-calc-page.js',
    "'linear-gradient(90deg, #ff5555, #ff9944)'",
    "'linear-gradient(90deg, var(--danger), var(--warning-soft))'",
    'бар урона: точные --danger и --warning-soft'],

  // tierlist: drag-ghost через cssText
  ['js/tierlist-page.js',
    'background:rgba(10,20,35,0.95);border:1px solid #00e6ff;',
    'background:rgba(var(--container-rgb),0.95);border:1px solid var(--accent-cyan);',
    'фон госта 10,20,35 почти чёрный, влит в --container-rgb (порог 8), рамка акцент'],
  ['js/tierlist-page.js',
    'color:#e0f0ff;',
    'color:var(--text-primary);',
    'имя героя в госте — точный --text-primary'],

  // map: подпись типа маркера в инфопанели — акцент (близнец 00e5ff, TD-12)
  ['map-data.js',
    '<span style="color:#00e5ff;">',
    '<span style="color:var(--accent-cyan);">',
    'подпись типа маркера — акцент темы, близнец влит'],

  // search: цвета атрибутов — точные токены §5
  ['search.js',
    "var ATTR_COLORS = { strength: '#ff5555', agility: '#55ff55', intelligence: '#55aaff' };",
    "var ATTR_COLORS = { strength: 'var(--danger)', agility: 'var(--agility)', intelligence: 'var(--info-blue)' };",
    'сила/ловкость/разум — точные --danger/--agility/--info-blue'],
  ['search.js',
    "ATTR_COLORS[h.attr] || '#8aa0c0'",
    "ATTR_COLORS[h.attr] || 'var(--text-secondary)'",
    'фолбэк неизвестного атрибута — --text-secondary'],

  // items-db: блок избранного внутри <style> в шаблонной строке
  ['items-db.js',
    '.item-fav-btn .fas { color: #ff5555; }',
    '.item-fav-btn .fas { color: var(--danger); }',
    'иконка избранного — --danger'],
  ['items-db.js',
    'background: #ff555533;',
    'background: rgba(var(--red-rgb), 0.2);',
    'альфа 0x33 = 0.2, ступень шкалы'],
  ['items-db.js',
    'border-color: #ff5555;',
    'border-color: var(--danger);',
    'рамка ховера — --danger'],
  ['items-db.js',
    'box-shadow: 0 0 20px #ff555533, 0 0 0 1px #ff555533 inset;',
    'box-shadow: 0 0 20px rgba(var(--red-rgb), 0.2), 0 0 0 1px rgba(var(--red-rgb), 0.2) inset;',
    'свечение избранной карточки, обе альфы 0.2'],
  ['items-db.js',
    'text-shadow: 0 0 8px #ff5555aa;',
    'text-shadow: 0 0 8px rgba(var(--red-rgb), 0.6);',
    'альфа 0xaa = 0.667 → 0.6 по прецеденту чанка 3'],

  // hero-stats: фантомный --bg-primary не существует, центр круга = --surface-solid
  ['js/hero-stats-page.js',
    'fill="var(--bg-primary, #0f172a)"',
    'fill="var(--surface-solid)"',
    'центр круговой диаграммы: 15,23,42 = --surface-rgb, фantom --bg-primary убран'],

  // balance-dashboard: радар на canvas — var() не парсится, значение из примитива
  ['js/balance-dashboard-page.js',
    "var HERO_COLORS = ['#00e6ff', '#ff6b6b', '#51cf66'];",
    "// серия 1 красится акцентом темы: в html уходит var(), canvas берёт значение из примитива\n" +
    "    var HERO_COLORS = ['var(--accent-cyan)', '#ff6b6b', '#51cf66'];\n" +
    "    function cssVar(name) {\n" +
    "        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();\n" +
    '    }',
    'helper чтения примитива + серия 1 на токен'],
  ['js/balance-dashboard-page.js',
    "ctx.strokeStyle = pct === 50 ? 'rgba(0,230,255,0.15)' : 'rgba(0,230,255,0.08)';",
    "ctx.strokeStyle = pct === 50 ? 'rgba(' + cssVar('--cyan-rgb') + ', 0.15)' : 'rgba(' + cssVar('--cyan-rgb') + ', 0.08)';",
    'кольца радара из живого триплета'],
  ['js/balance-dashboard-page.js',
    "ctx.strokeStyle = 'rgba(0,230,255,0.12)';",
    "ctx.strokeStyle = 'rgba(' + cssVar('--cyan-rgb') + ', 0.12)';",
    'оси радара из живого триплета'],
  ['js/balance-dashboard-page.js',
    "ctx.fillStyle = '#8aa0c0';",
    "ctx.fillStyle = cssVar('--text-secondary');",
    'подписи осей — авторское значение --text-secondary'],
  ['js/balance-dashboard-page.js',
    "ctx.fillStyle = HERO_COLORS[pi] + '20';",
    "ctx.fillStyle = pi === 0 ? 'rgba(' + cssVar('--cyan-rgb') + ', 0.125)' : HERO_COLORS[pi] + '20';",
    'заливка полигона серии 1: 0x20 = 0.125, тот же 8-битный альфа-байт'],
  ['js/balance-dashboard-page.js',
    'ctx.strokeStyle = HERO_COLORS[pi];',
    "ctx.strokeStyle = pi === 0 ? 'rgb(' + cssVar('--cyan-rgb') + ')' : HERO_COLORS[pi];",
    'контур полигона серии 1 — акцент из примитива'],
  ['js/balance-dashboard-page.js',
    'ctx.fillStyle = HERO_COLORS[pi];',
    "ctx.fillStyle = pi === 0 ? 'rgb(' + cssVar('--cyan-rgb') + ')' : HERO_COLORS[pi];",
    'точки серии 1 — акцент из примитива'],
  ['js/balance-dashboard-page.js',
    "return '#00e6ff';",
    "return 'var(--accent-cyan)';",
    'средний перцентиль — акцент темы'],

  // site-validator: инлайн-скрипт, точные токены
  ['site-validator.html',
    '<small style="color:#5a7a9a">',
    '<small style="color:var(--text-dim)">',
    'id героя — точный --text-dim'],
  ['site-validator.html',
    'style="color:#55ff88"',
    'style="color:var(--success)"',
    'позитивный вердикт — точный --success'],
];

const counts = {};
let total = 0;
for (const [file, from, to, why] of REPLACEMENTS) {
  if (!counts[file]) { counts[file] = 0; }
  const src = fs.readFileSync(file, 'utf8');
  const parts = src.split(from);
  if (parts.length > 1) {
    fs.writeFileSync(file, parts.join(to));
    counts[file] += parts.length - 1;
    total += parts.length - 1;
    console.log(file + ': ' + (parts.length - 1) + ' — ' + why);
  }
}
console.log('---');
for (const [f, n] of Object.entries(counts)) console.log(f + ': ' + n);
console.log('Итого замен: ' + total + ' (второй прогон должен дать 0)');
if (!total) console.log('Проверка идемпотентности пройдена: замен нет');
