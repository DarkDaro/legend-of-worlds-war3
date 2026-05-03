#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const heroes = require('./hero-card-data');
const DEFAULT_OUTPUT_DIR = 'generated-heroes';
/*
  paladin: {
    id: 'paladin',
    title: 'Паладин — Светозар',
    pageTitle: 'Паладин · Герои · Legend of Worlds',
    ogTitle: 'Паладин — Светозар — Legend of Worlds',
    ogDescription: 'Паладин — герой Арены Миров. Способности, статы, тактика.',
    bodyClass: 'strength',
    currentCrumb: 'Паладин — Светозар',
    attribute: 'Сила',
    attributeColor: '#ff5555',
    range: 'Ближний бой (150)',
    speed: 280,
    roleLabel: 'Танк',
    roleClass: 'role-tank',
    description: 'Светозар — паладин, чья вера выдержала испытание тьмой. Когда миры рушились, а боги молчали, он один продолжал нести свет. Его щит не просто защищает — он возвращает удар.',
    statsRows: [
      { label: 'Сила', className: 'stat-strength', value: '24', growth: '+3' },
      { label: 'Разум', className: 'stat-intelligence', value: '23', growth: '+2' },
      { label: 'Ловкость', className: 'stat-agility', value: '13', growth: '+2' },
    ],
    buildHeroId: 'paladin',
    abilitiesTitleIcon: 'fas fa-magic',
    buildTitleIcon: 'fas fa-shield-alt',
    tacticsTitleIcon: 'fas fa-chess',
    tipsTitleIcon: 'fas fa-lightbulb',
    tactics: [
      'Паладин — основной танк команды. Врывайтесь первым, включайте W для регена и принимайте урон на щит',
      'Q исцеляет союзников и бьёт врагов — кидайте в центр драки, чтобы максимизировать отдачу',
      'E требует 3 сек подготовки — используйте R (щит) перед кастом, чтобы вас не сбили',
      'R — ваш ключевой отыгл. Включайте в критический момент: щит поглощает весь урон, а после рассеивания бьёт по врагам',
      'Скипетр даёт 10% шанс мгновенной перезарядки R — это может переломить драку',
    ],
    tips: [
      'W и E развеиваются — не тратьте ману, если враг может диспелить',
      'F (аура) даёт броню союзникам — стойте рядом с командой, не убегайте вперёд один',
      'В лейте ваш урон через R-возврат может достигать 5000+ — не бойтесь принимать урон',
      'Худшие враги: герои с сильным диспелом (развеивают W и E)',
    ],
    abilities: [
      {
        hotkey: 'Q',
        name: 'Исцеляющая Сфера',
        type: 'Активная',
        icon: 'holy_light',
        fallback: 'sun',
        description: 'Посылает исцеляющую сферу в указанную точку. При попадании восстанавливает здоровье союзникам, а также наносит урон противникам.',
        params: [
          { label: 'Исцеление', value: '12%/14%/16%/18%/20%' },
          { label: 'Урон', value: 'STR×3 + 250/400/550/700/850' },
          { label: 'Радиус', value: '325' },
          { label: 'Дальность', value: '1300' },
          { label: 'Мана', value: '75/80/85/90/95' },
          { label: 'Перезарядка', value: '15 сек' },
        ],
      },
      {
        hotkey: 'W',
        name: 'Дары света',
        type: 'Активная',
        icon: 'shield',
        fallback: 'hand-holding-heart',
        description: 'Получив множество ранений в бою, Светозар научился использовать магию света для регенерации здоровья в секунду. Восстанавливает на 25% больше здоровья. Может быть развеян полностью!',
        badgesHtml: '<span class="ability-tag dispellable">⚠ Развеивается</span>',
        params: [
          { label: 'Исцеление', value: '2% + 45/70/95/120/145 ед/сек' },
          { label: 'Радиус', value: '600' },
          { label: 'Длительность', value: '10 сек' },
          { label: 'Мана', value: '90/95/100/105/110' },
          { label: 'Перезарядка', value: '26/25/24/23/22 сек' },
        ],
      },
      {
        hotkey: 'E',
        name: 'Молитва свету',
        type: 'Активная',
        icon: 'prayer',
        fallback: 'pray',
        description: 'Паладин произносит священную молитву 3 сек, после чего на расстоянии 450 от героя появляются вспышки света. Может быть развеян полностью!',
        badgesHtml: '<span class="ability-tag dispellable">⚠ Развеивается</span>',
        params: [
          { label: 'Урон', value: '200/300/400/500/600 + STR×1.25/1.5/1.75/2/2.25' },
          { label: 'Количество', value: '11/14/17/20/23 вспышек' },
          { label: 'Радиус', value: '200' },
          { label: 'Задержка', value: '3 сек' },
          { label: 'Мана', value: '100/110/120/130/140' },
          { label: 'Перезарядка', value: '25 сек' },
        ],
      },
      {
        hotkey: 'R',
        name: 'Святой Щит',
        type: 'Ультимейт',
        icon: 'resurrect',
        fallback: 'shield-alt',
        cardClass: 'ultimate',
        description: 'Паладин накладывает на себя магический щит, который поглощает весь урон. Щит рассеивается, когда теряет всю прочность. После рассеивания всем врагам вокруг героя наносится урон, равный потерянной прочности щита.',
        badgesHtml: '<span class="ability-tag scepter"><i class="fas fa-gem"></i> Скипетр</span>',
        params: [
          { label: 'Прочность', value: '1000/2000/3000/4000/5000 + STR×5/10/15/20/25' },
          { label: 'Радиус урона', value: '375/450/525/600/675' },
          { label: 'Длительность', value: '4/5/6/7/8 сек' },
          { label: 'Мана', value: '150/175/200/225/250' },
          { label: 'Перезарядка', value: '120 сек' },
          { label: 'Скипетр Владыки', value: '10% шанс мгновенной перезарядки', isSpecial: true },
        ],
      },
      {
        hotkey: 'F',
        name: 'Аура защиты',
        type: 'Пассивная',
        icon: 'defense',
        fallback: 'heart',
        cardClass: 'passive',
        description: 'Повышает защиту дружественных войск поблизости. Возвращает небольшой физический урон обидчику при каждой атаке по Паладину.',
        params: [
          { label: 'Доп. броня', value: '10' },
          { label: 'Урон', value: '25 + Уровень × 2' },
          { label: 'Радиус', value: '800' },
        ],
      },
    ],
    extraSectionsHtml: '',
  },
};
*/

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderParamRow(param) {
  const classes = ['param-row'];
  if (param.isSpecial) classes.push('scepter-row');
  return `
    <div class="${classes.join(' ')}">
      <span class="param-label">${escapeHtml(param.label)}</span>
      <span class="param-values">${escapeHtml(param.value)}</span>
    </div>`;
}

function renderAbility(ability) {
  const cardClasses = ['ability-card'];
  if (ability.cardClass) cardClasses.push(ability.cardClass);
  if (ability.type === 'Ультимейт' && !ability.cardClass) cardClasses.push('ultimate');
  if (ability.type === 'Пассивная' && !ability.cardClass) cardClasses.push('passive');

  const badgesHtml = ability.badgesHtml ? `\n                            ${ability.badgesHtml}` : '';
  const descriptionHtml = ability.descriptionHtml || escapeHtml(ability.description);
  const paramsHtml = (ability.params || []).map(renderParamRow).join('');

  return `
                <div class="${cardClasses.join(' ')}">
                    <div class="ability-header">
                        <div class="ability-icon" data-ability="${escapeHtml(ability.icon)}" data-fallback="${escapeHtml(ability.fallback || 'image')}"></div>
                        <div class="ability-info">
                            <span class="ability-hotkey">${escapeHtml(ability.hotkey)}</span>
                            <div class="ability-name">${escapeHtml(ability.name)}</div>
                            <div class="ability-type-badge">${escapeHtml(ability.type)}</div>${badgesHtml}
                        </div>
                    </div>
                    <div class="ability-desc">${descriptionHtml}</div>
                    <div class="ability-params">${paramsHtml}
                    </div>
                </div>`;
}

function renderAbilityGroup(abilities) {
  return `
            <div class="abilities-grid">
${abilities.map(renderAbility).join('\n')}
            </div>`;
}

function renderSection(title, iconClass, items) {
  if (!items || !items.length) return '';
  return `
            <div class="hero-tips">
                <h4><i class="${escapeHtml(iconClass)}"></i> ${escapeHtml(title)}</h4>
                <ul>
${items.map(item => `                    <li>${escapeHtml(item)}</li>`).join('\n')}
                </ul>
            </div>`;
}

function renderForms(hero) {
  if (!hero.forms || !hero.forms.length) {
    return renderAbilityGroup(hero.abilities);
  }

  const tabs = hero.forms.map((form, index) => {
    const tabClasses = ['form-tab'];
    if (index === 0) tabClasses.push('active');
    if (form.tabClass) tabClasses.push(form.tabClass);
    return `<button class="${tabClasses.join(' ')}" onclick="switchForm(this, '${escapeHtml(form.id)}')">${escapeHtml(form.label)}</button>`;
  }).join('\n');

  const blocks = hero.forms.map((form, index) => {
    const blockClasses = ['form-abilities'];
    if (index === 0) blockClasses.push('active');
    return `
            <div class="${blockClasses.join(' ')}" id="form-${escapeHtml(form.id)}">
${form.beforeAbilitiesHtml || ''}
${renderAbilityGroup(form.abilities)}
            </div>`;
  }).join('\n');

  return `
            <div class="form-tabs">
${tabs}
            </div>
${blocks}
            <script>
            function switchForm(btn, formId) {
                const container = btn.closest('.hero-page-container');
                container.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.form-abilities').forEach(f => f.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('form-' + formId).classList.add('active');
            }
            </script>`;
}

function renderStatsTable(rows) {
  return `
            <table class="hero-stats-table">
                <tr><th>Характеристика</th><th>Значение</th><th>Прирост</th></tr>
${rows.map(row => `                <tr><td><span class="${escapeHtml(row.className)}">${escapeHtml(row.label)}</span></td><td>${escapeHtml(row.value)}</td><td>${escapeHtml(row.growth)}</td></tr>`).join('\n')}
            </table>`;
}

function renderHeroPage(hero) {
  const buildContainerScript = `
    <script>
        var container = document.getElementById('hero-build');
        if (container && typeof renderHeroBuild === 'function') {
            container.innerHTML = renderHeroBuild('${hero.id}');
        } else if (container) {
            container.innerHTML = '<p style="color:#6b7c99;">Сборка загружается...</p>';
        }
    </script>`;

  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="../images/logo.png" type="image/png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(hero.pageTitle)}</title>
    <meta property="og:title" content="${escapeHtml(hero.ogTitle)}">
    <meta property="og:description" content="${escapeHtml(hero.ogDescription)}">
    <meta property="og:image" content="../images/preview.png">
    <meta property="og:type" content="website">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../style.css">
    <script src="../icon-loader.js" defer></script>
    <script src="../hero-builds.js"></script>
    <script src="../analytics.js" defer></script>
</head>
<body class="${escapeHtml(hero.bodyClass)}">
    <header class="site-header">
        <a href="../index.html" class="logo">
            <img src="../images/logo.png" alt="Legend of Worlds" class="logo-img" />
            <span class="logo-text">Legend of Worlds <small>Warcraft III</small></span>
        </a>
        <nav class="header-nav">
            <a href="../index.html" class="nav-link"><i class="fas fa-home"></i> Главная</a>
            <a href="../heroes.html" class="nav-link active"><i class="fas fa-users"></i> Герои</a>
            <a href="../items.html" class="nav-link"><i class="fas fa-flask"></i> Предметы</a>
            <a href="../mechanics.html" class="nav-link"><i class="fas fa-cogs"></i> Механики</a>
            <a href="../monsters.html" class="nav-link"><i class="fas fa-dragon"></i> Монстры</a>
            <a href="../info.html" class="nav-link"><i class="fas fa-info-circle"></i> Информация</a>
            <a href="../guides.html" class="nav-link"><i class="fas fa-book-open"></i> Гайды</a>
            <a href="../lore.html" class="nav-link"><i class="fas fa-scroll"></i> Лор</a>
            <a href="../support.html" class="nav-link"><i class="fas fa-heart"></i> Поддержать</a>
            <a href="../updates.html" class="nav-link"><i class="fas fa-history"></i> Обновления</a>

        </nav>
    </header>
    <div class="wiki-container">
        <div class="breadcrumbs"><a href="../index.html">Главная</a><span class="sep">›</span><a href="../heroes.html">Герои</a><span class="sep">›</span><span class="current">${escapeHtml(hero.currentCrumb)}</span></div>
        <div class="hero-page-container">
            <div class="panel-header">
                <div class="detail-icon"></div>
                <div class="detail-title">${escapeHtml(hero.title)} <span class="detail-badge">${escapeHtml(hero.attribute)}</span></div>
            </div>
            <div class="hero-stats">
                <div class="stat-item"><i class="fas fa-crosshairs"></i> ${escapeHtml(hero.range)}</div>
                <div class="stat-item"><i class="fas fa-star"></i> Осн. атрибут: <span style="color:${escapeHtml(hero.attributeColor)};">${escapeHtml(hero.attribute)}</span></div>
                <div class="stat-item"><i class="fas fa-shoe-prints"></i> Скорость: ${escapeHtml(hero.speed)}</div>
                <div class="stat-item"><i class="fas fa-tag"></i> Роль: <span class="${escapeHtml(hero.roleClass)}">${escapeHtml(hero.roleLabel)}</span></div>
            </div>
${renderStatsTable(hero.statsRows)}
            <div class="detail-description">
                <p>${escapeHtml(hero.description)}</p>
            </div>

            <div class="recipe-title"><i class="${escapeHtml(hero.buildTitleIcon)}"></i> Рекомендуемая сборка</div>
            <div id="hero-build"></div>

${renderSection('Тактика', hero.tacticsTitleIcon, hero.tactics)}
${renderSection('Советы', hero.tipsTitleIcon, hero.tips)}

            <div class="recipe-title"><i class="${escapeHtml(hero.abilitiesTitleIcon)}"></i> Способности</div>
${renderForms(hero)}
${hero.extraSectionsHtml || ''}
            <div class="back-button" onclick="window.location.href='../heroes.html'"><i class="fas fa-arrow-left"></i> Вернуться к героям</div>
        </div>
    </div>${buildContainerScript}
</body>
</html>`;
}

function getSelectedHeroes() {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  if (!args.length || args[0] === 'all') {
    return Object.values(heroes);
  }

  const selected = args.map(id => heroes[id]).filter(Boolean);
  if (!selected.length) {
    const available = Object.keys(heroes).join(', ');
    throw new Error(`Unknown hero id(s). Available: ${available}`);
  }
  return selected;
}

function parseOutputDir(args) {
  const explicit = args.find(arg => arg.startsWith('--outdir=') || arg.startsWith('--output-dir='));
  if (!explicit) return DEFAULT_OUTPUT_DIR;
  const outputDir = explicit.split('=')[1];
  return outputDir || DEFAULT_OUTPUT_DIR;
}

function writeHeroFiles(selectedHeroes, outputDir = DEFAULT_OUTPUT_DIR) {
  selectedHeroes.forEach(hero => {
    const outputPath = path.join(__dirname, outputDir, `${hero.id}.html`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, renderHeroPage(hero), 'utf8');
    console.log(`Generated ${path.relative(__dirname, outputPath)}`);
  });
}

if (require.main === module) {
  try {
    const outputDir = parseOutputDir(process.argv.slice(2));
    writeHeroFiles(getSelectedHeroes(), outputDir);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  heroes,
  renderHeroPage,
  renderForms,
  renderAbility,
  writeHeroFiles,
  parseOutputDir,
};
