// ========== ПОЛНАЯ БАЗА ПРЕДМЕТОВ (ВСЕ ЛАВКИ, БЕЗ ДУБЛИКАТОВ) ==========
const itemsDB = {
  // ---------- ОРУЖЕЙНАЯ ----------
  I004: { id: 'I004', name: 'Когти', icon: '🐾', type: 'basic', cost: 400, description: '+9 атаки' },
  I007: { id: 'I007', name: 'Меч', icon: '⚔️', type: 'basic', cost: 450, description: '+12 атаки' },
  I005: { id: 'I005', name: 'Молот', icon: '🔨', type: 'basic', cost: 500, description: '+15 атаки' },
  I006: { id: 'I006', name: 'Топор', icon: '🪓', type: 'basic', cost: 550, description: '+17 атаки' },
  I008: { id: 'I008', name: 'Трезубец', icon: '🔱', type: 'basic', cost: 600, description: '+19 атаки' },
  I009: { id: 'I009', name: 'Копьё', icon: '🏹', type: 'basic', cost: 650, description: '+22 атаки' },
  I00A: { id: 'I00A', name: 'Щит', icon: '🛡️', type: 'basic', cost: 600, description: '+4 защиты' },
  I00D: { id: 'I00D', name: 'Шлем', icon: '⛑️', type: 'basic', cost: 450, description: '+3 защиты' },
  I00C: { id: 'I00C', name: 'Броня', icon: '🥼', type: 'basic', cost: 850, description: '+6 защиты' },
  modt: { id: 'modt', name: 'Маска смерти', icon: '💀', type: 'basic', cost: 1000, description: '10% вампиризм (Орб. эффект)' },
  I03I: { id: 'I03I', name: 'Реликвия', icon: '🏺', type: 'basic', cost: 1800, description: '+60 атаки' },
  I0CQ: { id: 'I0CQ', name: 'Меч доблести', icon: '⚔️✨', type: 'basic', cost: 3300, description: '+110 атаки' },

  // ---------- ЭЛЕМЕНТЫ СТИХИИ ----------
  ofir: { id: 'ofir', name: 'Сфера огня', icon: '🔥', type: 'basic', cost: 400, description: '+5 атаки, атака огнём – 20 маг. урона (пассив)' },
  ofro: { id: 'ofro', name: 'Сфера льда', icon: '❄️', type: 'basic', cost: 800, description: '+8 атаки' },
  oli2: { id: 'oli2', name: 'Сфера молний', icon: '⚡', type: 'basic', cost: 400, description: '+5 атаки, 30% шанс нанести 35-70 урона молнией' },
  ocor: { id: 'ocor', name: 'Сфера проклятья', icon: '🔮', type: 'basic', cost: 600, description: '+5 атаки, снижение защиты на 3 ед. (5 сек)' },
  odef: { id: 'odef', name: 'Сфера тьмы', icon: '🌑', type: 'basic', cost: 580, description: '+18 атаки' },
  oslo: { id: 'oslo', name: 'Сфера замедления', icon: '🐢', type: 'basic', cost: 550, description: '+5 атаки, 15% шанс замедлить на 20%' },
  oven: { id: 'oven', name: 'Сфера яда', icon: '🧪', type: 'basic', cost: 400, description: '+5 атаки, ядовитая атака: 15 урона/сек (6 сек)' },
  I0FC: { id: 'I0FC', name: 'Сфера света', icon: '✨', type: 'basic', cost: 1100, description: '+10% сопротивление к оглушению' },
  I0FB: { id: 'I0FB', name: 'Сфера отрицания', icon: '🚫', type: 'basic', cost: 800, description: '+5% магический блок (на урон >10)' },
  I0FA: { id: 'I0FA', name: 'Сфера плоти', icon: '🧬', type: 'basic', cost: 850, description: '+5% магический вампиризм (на урон >10)' },
  I0FE: { id: 'I0FE', name: 'Сфера меткости', icon: '🎯', type: 'basic', cost: 900, description: '+10% урона в дальнем бою (только герою)' },
  I0FD: { id: 'I0FD', name: 'Сфера мощи', icon: '💪', type: 'basic', cost: 900, description: '+10% урона в ближнем бою (только герою)' },

  // ---------- ЭКИПИРОВКА И ЦЕННОСТИ ----------
  rlif: { id: 'rlif', name: 'Кольцо регенерации', icon: '💍', type: 'basic', cost: 350, description: '+5 регенерации здоровья' },
  rde2: { id: 'rde2', name: 'Кольцо защиты', icon: '🛡️', type: 'basic', cost: 450, description: '+2 защиты' },
  rnsp: { id: 'rnsp', name: 'Кольцо превосходства', icon: '✨', type: 'basic', cost: 90, description: '+1 ко всем атрибутам' },
  bspd: { id: 'bspd', name: 'Сапог', icon: '👢', type: 'basic', cost: 500, description: '+40 скорости бега' },
  gcel: { id: 'gcel', name: 'Перчатка скорости', icon: '🧤', type: 'basic', cost: 500, description: '+10% скорости боя' },
  rwiz: { id: 'rwiz', name: 'Маска соби', icon: '🎭', type: 'basic', cost: 325, description: '+50% восстановления маны' },
  lhst: { id: 'lhst', name: 'Рог ветров', icon: '📯', type: 'basic', cost: 550, description: 'Аура защиты 2 ед. (пассив)' },
  rhth: { id: 'rhth', name: 'Камень жизни', icon: '❤️', type: 'basic', cost: 500, description: '+300 здоровья' },
  pmna: { id: 'pmna', name: 'Амулет маны', icon: '💙', type: 'basic', cost: 525, description: '+300 маны' },
  clfm: { id: 'clfm', name: 'Огненный плащ', icon: '🔥🧥', type: 'basic', cost: 800, description: 'Жар преисподней [40 дпс]' },
  desc: { id: 'desc', name: 'Кинжал мага', icon: '🗡️🔮', type: 'basic', cost: 2100, description: 'Скачок (актив) (700)' },
  ajen: { id: 'ajen', name: 'Чаша выносливости', icon: '🏆', type: 'basic', cost: 700, description: 'Аура скорости (5% AS, 10% MS)' },
  evtl: { id: 'evtl', name: 'Талисман защиты', icon: '🛡️📿', type: 'basic', cost: 2000, description: '+10% уклонение' },
  I010: { id: 'I010', name: 'Перчатка ловкости', icon: '🧤🏃', type: 'basic', cost: 975, description: '+15 ловкости' },
  I015: { id: 'I015', name: 'Перчатка зверя', icon: '🧤🐾', type: 'basic', cost: 975, description: '+15 силы' },
  cnob: { id: 'cnob', name: 'Венец благородства', icon: '👑', type: 'basic', cost: 75, description: '+2 ко всем атрибутам' },
  rag1: { id: 'rag1', name: 'Туфли ловкости', icon: '👟', type: 'basic', cost: 50, description: '+3 ловкости' },
  rst1: { id: 'rst1', name: 'Рукавица огра', icon: '🧤', type: 'basic', cost: 50, description: '+3 силы' },
  rin1: { id: 'rin1', name: 'Мантия учёного', icon: '🥼', type: 'basic', cost: 50, description: '+3 разума' },
  mnsf: { id: 'mnsf', name: 'Посох мудрости', icon: '📜', type: 'basic', cost: 975, description: '+15 разума' },
  I001: { id: 'I001', name: 'Флейта', icon: '🎵', type: 'basic', cost: 950, description: '+10% скорости боя, +10 атаки' },
  I01G: { id: 'I01G', name: 'Плащ', icon: '🧥', type: 'basic', cost: 850, description: '+5% маг. защита' },
  I000: { id: 'I000', name: 'Золотой ключ', icon: '🔑', type: 'basic', cost: 3500, description: '+30 ко всем атрибутам' },
  I01O: { id: 'I01O', name: 'Медаль храбрости', icon: '🎖️', type: 'basic', cost: 1200, description: '+10 ко всем атрибутам' },

  // ---------- ОБУВЬ ----------
  I00N: { id: 'I00N', name: 'Сапоги воина', icon: '🩼', type: 'basic', cost: 1100,
    description: '+6 ко всем атрибутам, +20 скорости боя, +50 скорости бега',
    components: [ {itemId: 'gcel', quantity: 1}, {itemId: 'bspd', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 100} ]
  },
  I00Q: { id: 'I00Q', name: 'Сапоги телепортации', icon: '🩼🌀', type: 'basic', cost: 3400,
    description: '+6 ко всем атрибутам, +20 скорости боя, +60 скорости бега, Скачок (актив) (700)',
    components: [ {itemId: 'I00N', quantity: 1}, {itemId: 'desc', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 200} ]
  },
  I01C: { id: 'I01C', name: 'Божественные сапоги', icon: '👢✨', type: 'basic', cost: 6600,
    description: '+15 ко всем атрибутам, +20% скорости боя, +90 скорости бега, Аура скорости (5% AS, 10% MS), Скачок (актив) (1000)',
    components: [ {itemId: 'I00Q', quantity: 1}, {itemId: 'ajen', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2500} ]
  },
  I030: { id: 'I030', name: 'Сапоги божественной ловкости', icon: '🏃💨', type: 'agility', cost: 14300,
    description: '+20 ко всем атрибутам, +25% скорости атаки, +120 скорости бега, Аура скорости (15% AS, 15% MS), Скачок (актив) (1300)',
    components: [ {itemId: 'I01C', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 7700} ]
  },
  I0GL: { id: 'I0GL', name: 'Сапоги громовой поступи', icon: '⚡👢', type: 'agility', cost: 4000,
    description: '+12 ко всем атрибутам, +20 скорости боя, +60 скорости бега, Громовая поступь (актив): беспрепятственный бег и макс. скорость на 4.5 сек (кд 20)',
    components: [ {itemId: 'I00N', quantity: 1}, {itemId: 'oli2', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2500} ],
    activeAbility: { name: 'Громовая поступь', description: 'Беспрепятственный бег и максимальная скорость на 4.5 сек', cooldown: 20, manacost: 75, note: null }
  },

  // ---------- ДРАГОЦЕННОСТИ ----------
  I00H: { id: 'I00H', name: 'Ключ силы', icon: '🔑💪', type: 'basic', cost: 250,
    description: '+6 силы, +3 ловкости и разума',
    components: [ {itemId: 'cnob', quantity: 1}, {itemId: 'rst1', quantity: 1} ]
  },
  I00I: { id: 'I00I', name: 'Ключ ловкости', icon: '🔑🏃', type: 'basic', cost: 250,
    description: '+6 ловкости, +3 силы и разума',
    components: [ {itemId: 'cnob', quantity: 1}, {itemId: 'rag1', quantity: 1} ]
  },
  I00E: { id: 'I00E', name: 'Ключ разума', icon: '🔑🧠', type: 'basic', cost: 250,
    description: '+6 разума, +3 силы и ловкости',
    components: [ {itemId: 'cnob', quantity: 1}, {itemId: 'rin1', quantity: 1} ]
  },
  I00K: { id: 'I00K', name: 'Волшебные ключи', icon: '🔑✨', type: 'basic', cost: 750,
    description: '+12 ко всем атрибутам',
    components: [ {itemId: 'I00H', quantity: 1}, {itemId: 'I00I', quantity: 1}, {itemId: 'I00E', quantity: 1} ]
  },
  I0AL: { id: 'I0AL', name: 'Волшебное кольцо', icon: '💍✨', type: 'basic', cost: 1400,
    description: '+15 регенерации здоровья',
    components: [ {itemId: 'rlif', quantity: 2}, {itemId: 'recipe', quantity: 1, costOverride: 700} ]
  },
  I0C8: { id: 'I0C8', name: 'Лунный камень', icon: '🌙', type: 'basic', cost: 1450,
    description: '+600 маны',
    components: [ {itemId: 'pmna', quantity: 2}, {itemId: 'recipe', quantity: 1, costOverride: 400} ]
  },
  I0C9: { id: 'I0C9', name: 'Солнечный камень', icon: '☀️', type: 'basic', cost: 1400,
    description: '+600 здоровья',
    components: [ {itemId: 'rhth', quantity: 2}, {itemId: 'recipe', quantity: 1, costOverride: 400} ]
  },
  I0CP: { id: 'I0CP', name: 'Посох колдуна', icon: '🧙🔮', type: 'basic', cost: 4275,
    description: '+20 разума, +10 ко всем атрибутам, +450 здоровья',
    components: [ {itemId: 'I01O', quantity: 1}, {itemId: 'rhth', quantity: 1}, {itemId: 'mnsf', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1600} ]
  },

  // ---------- БРОНЯ И ДОСПЕХИ ----------
  I002: { id: 'I002', name: 'Щит древних', icon: '📜🛡️', type: 'basic_shield', cost: 2900,
    description: '+500 здоровья, +8 защиты, Аура защиты 3 ед. (пассив)',
    tags: ['shield'],
    components: [ {itemId: 'rhth', quantity: 1}, {itemId: 'I00A', quantity: 1}, {itemId: 'lhst', quantity: 1}, {itemId: 'rde2', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 800} ]
  },
  I00S: { id: 'I00S', name: 'Щит смерти', icon: '💀🛡️', type: 'basic_shield', cost: 10550,
    description: '+1000 здоровья, +15 защиты, Аура защиты 5 ед., Жар преисподней [200 дпс]',
    tags: ['shield'],
    components: [ {itemId: 'I00C', quantity: 1}, {itemId: 'clfm', quantity: 1}, {itemId: 'I002', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 6000} ]
  },
  I03G: { id: 'I03G', name: 'Огненный щит', icon: '🔥🛡️', type: 'basic_shield', cost: 29450,
    description: '+2000 здоровья, +15 защиты, +15% маг. защита, +20 ко всем атрибутам, Аура защиты 15 ед., Жар преисподней [300 дпс], Отмщение (актив) (500 + 20% от зд, шанс 20%, урон x2)',
    tags: ['basic', 'shield'],
    components: [ {itemId: 'I036', quantity: 1}, {itemId: 'I00S', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 11000} ],
    activeAbility: { name: 'Отмщение', description: '500 + 20% от здоровья, шанс 20%, урон x2', cooldown: 40, manacost: 150, note: null }
  },
  I0BJ: { id: 'I0BJ', name: 'Кристальный щит', icon: '💎🛡️', type: 'basic_shield', cost: 11775,
    description: '+800 здоровья, +1200 маны, +180% регенерации маны, +12 защиты, Кристальная пыль (актив): блокирует 80% урона, возвращает 80% врагу, пока есть мана',
    tags: ['basic', 'shield'],
    components: [ {itemId: 'I0C8', quantity: 1}, {itemId: 'I0C9', quantity: 1}, {itemId: 'rwiz', quantity: 1}, {itemId: 'I00A', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 8000} ],
    activeAbility: { name: 'Кристальная пыль', description: 'Блокирует 80% входящего урона, возвращает 80% врагу', cooldown: 30, manacost: 100, note: null }
  },
  I09T: { id: 'I09T', name: 'Рыцарский щит', icon: '🛡️⚔️', type: 'basic_shield', cost: 15750,
    description: '+1800 здоровья, +10 защиты, +10% маг. защита, +30% сопротивление к оглушению, +10% сопротивление к сожжению маны, Божественная защита (актив): +30 защиты, +70% маг. защиты, +70 лечения на 6 сек',
    tags: ['basic', 'shield'],
    components: [ {itemId: 'I0C9', quantity: 2}, {itemId: 'I01G', quantity: 1}, {itemId: 'I00A', quantity: 1}, {itemId: 'I0FC', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10400} ],
    activeAbility: { name: 'Божественная защита', description: '+30 защиты, +70% маг. защиты, +70 лечения на 6 сек', cooldown: 25, manacost: 100, note: null }
  },
  I0GM: { id: 'I0GM', name: 'Грозовой щит', icon: '⚡🛡️', type: 'basic_shield', cost: 13775,
    description: '+1500 здоровья, +15 защиты, +100 атаки, +100% регенерации маны, Грозовая преграда (пассив): 15% шанс отразить 25% урона +500 урона молнией (кд 3 сек)',
    tags: ['basic', 'shield'],
    components: [ {itemId: 'I002', quantity: 1}, {itemId: 'I01Q', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 8000} ]
  },
  I0D0: { id: 'I0D0', name: 'Рыцарский шлем', icon: '⚔️⛑️', type: 'basic', cost: 2550,
    description: '+6 защиты, +12 ко всем атрибутам, +550 здоровья',
    components: [ {itemId: 'rhth', quantity: 1}, {itemId: 'I01O', quantity: 1}, {itemId: 'I00D', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 400} ]
  },
  I036: { id: 'I036', name: 'Шлем из кожи дракона', icon: '🐉⛑️', type: 'basic', cost: 7900,
    description: '+10% маг. защита, +15 ко всем атрибутам, +850 здоровья, Аура защиты героев 10 ед.',
    components: [ {itemId: 'I01G', quantity: 1}, {itemId: 'I0D0', quantity: 1}, {itemId: 'I002', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1600} ]
  },
  I02Y: { id: 'I02Y', name: 'Кираса из кожи дракона', icon: '🐉🛡️', type: 'basic', cost: 13125,
    description: '+15% уклонение, +35 силы, +1200 здоровья, +10 защиты, +3% регенерации здоровья/сек вне боя, Живучесть драконов: 15% шанс исцелиться на 150 при атаке',
    components: [ {itemId: 'I0C9', quantity: 1}, {itemId: 'I00C', quantity: 1}, {itemId: 'I015', quantity: 1}, {itemId: 'evtl', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 8100} ]
  },
  I045: { id: 'I045', name: 'Доспехи дракона', icon: '🐉🛡️✨', type: 'strength', cost: 46025,
    description: '+70 силы, +3000 здоровья, +25% маг. защита, +20% уклонение, +25 ловкости/разума, +15 защиты, +6% регенерации здоровья/сек вне боя, Мощность драконов 15 ед., Живучесть драконов: 20% шанс исцелиться на 300 при атаке',
    components: [ {itemId: 'I02Y', quantity: 1}, {itemId: 'I036', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 25000} ]
  },
  I02B: { id: 'I02B', name: 'Доспехи полководца', icon: '🛡️👑', type: 'strength', cost: 16500,
    description: '+2000 здоровья, +20 защиты (аура), +30 регенерации здоровья, +20% маг. защита, Стойкость Полководца: возвращает 250 урона',
    components: [ {itemId: 'I002', quantity: 1}, {itemId: 'I0AL', quantity: 1}, {itemId: 'I01G', quantity: 1}, {itemId: 'I00C', quantity: 1}, {itemId: 'rhth', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10000} ]
  },
  I0AF: { id: 'I0AF', name: 'Антимагические доспехи', icon: '🛡️🚫', type: 'magic_immune', cost: 47975,
    description: '+2500 здоровья, +20 защиты (аура), +60 регенерации здоровья, +45 силы, +85 атаки, +30% маг. защита, +15% сопротивление к сожжению маны, Стойкость Полководца (250 урона), Невосприимчивость к магии (актив, 8 сек)',
    components: [ {itemId: 'I0AG', quantity: 1}, {itemId: 'I02B', quantity: 1}, {itemId: 'I08U', quantity: 1} ],
    activeAbility: { name: 'Невосприимчивость к магии', description: 'Иммунитет к магии на 8 сек', cooldown: 70, manacost: 300, note: null }
  },
  I0GN: { id: 'I0GN', name: 'Шлем штормового рыцаря', icon: '🌩️⛑️', type: 'strength', cost: 8450,
    description: '+900 здоровья, +8 защиты, +35 атаки, +20 ко всем атрибутам, +25% сопротивление к оглушению',
    components: [ {itemId: 'I0D0', quantity: 1}, {itemId: 'oli2', quantity: 1}, {itemId: 'I0FC', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4400} ]
  },
  I0DU: { id: 'I0DU', name: 'Кираса шторма', icon: '🌩️🛡️', type: 'strength', cost: 16300,
    description: '+750 здоровья, +20 защиты, +50 силы, +15 ловкости/разума, Баш: 16% шанс стан 1 сек и 150 урона, Всплеск Молний (актив): 800 + 1.5x STR, 15% шанс при атаке разряд молнии (200 + 2x Уровень героя)',
    components: [ {itemId: 'I00M', quantity: 1}, {itemId: 'I0D0', quantity: 1}, {itemId: 'I00C', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 9000} ],
    activeAbility: { name: 'Всплеск Молний', description: '800 + 1.5x силы урона', cooldown: 25, manacost: 100, note: null }
  },
  I0GO: { id: 'I0GO', name: 'Доспехи штормового стража', icon: '🌩️🛡️✨', type: 'strength', cost: 87525,
    description: '+7000 здоровья, +50 защиты, +300 атаки, +100 силы, +50 ловкости/разума, +70 скорости бега, +100% регенерации маны, +45% сопротивление к оглушению, Баш (20%, 1.2 сек, 500 урона), Разряд (15% отразить 50% урона +700 +7x lvl), Шторм (актив): 1500 +3x Сила + доп. удары',
    components: [ {itemId: 'I0DU', quantity: 1}, {itemId: 'I0GM', quantity: 1}, {itemId: 'I0GN', quantity: 1}, {itemId: 'I0GL', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 45000} ],
    activeAbility: { name: 'Шторм', description: '1500 +3x Сила + до 5 дополнительных ударов (300 +2x Сила), стан 1.5 сек', cooldown: 70, manacost: 300, note: null }
  },
  I0AG: { id: 'I0AG', name: 'Антимагические доспехи (свиток)', icon: '📜', type: 'recipe', cost: 16450, description: 'Свиток для Антимагических доспехов' },

  // ---------- ВООРУЖЕНИЕ ----------
  I034: { id: 'I034', name: 'Призрачный клинок I', icon: '👻⚔️', type: 'weapon', cost: 8800,
    description: '+85 атаки, +25 ко всем атрибутам, Снижение защиты: ближний бой 12 (10 сек), дальний бой 9 (7 сек)',
    components: [ {itemId: 'ocor', quantity: 1}, {itemId: 'I01O', quantity: 2}, {itemId: 'I03I', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4000} ],
    upgradesTo: ['I035']
  },
  I035: { id: 'I035', name: 'Призрачный клинок II', icon: '👻⚔️✨', type: 'weapon', cost: 12800,
    description: '+115 атаки, +35 ко всем атрибутам, Снижение защиты: ближний бой 18 (10 сек), дальний бой 13 (7 сек)',
    components: [ {itemId: 'I034', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4000} ]
  },
  I01P: { id: 'I01P', name: 'Проклятые когти', icon: '🦴💀', type: 'weapon', cost: 36600, tags: ['boss'],
    description: '+500 атаки, +45 ко всем атрибутам, Критический удар (20% x2.5), Снижение защиты: ближний бой 30 (10 сек), дальний бой 22 (7 сек), Безмолвие (актив): 400 АоЕ, 2 сек',
    components: [ {itemId: 'I035', quantity: 1}, {itemId: 'I00Y', quantity: 1}, {itemId: 'I01N', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10400} ],
    activeAbility: { name: 'Безмолвие', description: 'В области 400, 2 сек', cooldown: 40, manacost: 150, note: null }
  },
  I03J: { id: 'I03J', name: 'Меч чёрной магии', icon: '⚫⚔️', type: 'weapon', cost: 59400, tags: ['boss'],
    description: '+750 атаки, +80 ко всем атрибутам, Критический удар (30% x3), Снижение защиты: ближний бой 50 (10 сек), дальний бой 37 (7 сек), Безмолвие (актив): 600 АоЕ, 3 сек',
    components: [ {itemId: 'I035', quantity: 1}, {itemId: 'I01P', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10000} ],
    activeAbility: { name: 'Безмолвие', description: 'В области 600, 3 сек', cooldown: 50, manacost: 175, note: null }
  },
  I0GJ: { id: 'I0GJ', name: 'Клеймор', icon: '⚔️💥', type: 'weapon', cost: 45775,
    description: '+230 атаки, +60 силы, +90 ловкости, +40 разума, Аура скорости (35% AS, 20% MS), Снижение защиты: ближний бой 36 (10 сек), дальний бой 27 (7 сек), Невидимость (актив): 2000 подлый удар, снижает атаку на 30%, 5 сек, Замедление (25% шанс)',
    components: [ {itemId: 'I035', quantity: 1}, {itemId: 'I03T', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 18000} ],
    activeAbility: { name: 'Невидимость', description: 'Подлый удар 2000, снижает атаку на 30%, 5 сек', cooldown: 25, manacost: 100, note: null }
  },
  I00Y: { id: 'I00Y', name: 'Огненный меч', icon: '🔥⚔️', type: 'weapon', cost: 3400,
    description: '+55 атаки, Критический удар (13% x1.5)',
    components: [ {itemId: 'ofir', quantity: 1}, {itemId: 'I009', quantity: 1}, {itemId: 'I007', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1900} ]
  },
  I033: { id: 'I033', name: 'Меч ярости', icon: '😡⚔️', type: 'weapon', cost: 9200,
    description: '+130 атаки, Критический удар (13% x1.5), Активация: 100% критический удар x2.2 (5 сек)',
    components: [ {itemId: 'I00Y', quantity: 2}, {itemId: 'recipe', quantity: 1, costOverride: 3000} ],
    activeAbility: { name: 'Ярость', description: '100% критический удар x2.2 на 5 сек', cooldown: 20, manacost: 75, note: null }
  },
  I0AO: { id: 'I0AO', name: 'Светлый меч', icon: '✨⚔️', type: 'weapon', cost: 8100,
    description: '+125 атаки, +30% скорости боя, Очищение: 20% шанс x2 урона, после герой получает 25% блок урона на 1 сек',
    components: [ {itemId: 'I03I', quantity: 1}, {itemId: 'I007', quantity: 1}, {itemId: 'I001', quantity: 1}, {itemId: 'I004', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ]
  },
  I0E5: { id: 'I0E5', name: 'Меч очищения', icon: '🌟⚔️', type: 'weapon', cost: 29050,
    description: '+270 атаки, +30 силы/ловкости, +50% скорости боя, Очищение: 20% шанс x2.5 урона, замедление скорости боя на 40% (3 сек), после блок 50% урона (2 сек), Развеивание (актив)',
    components: [ {itemId: 'I0AO', quantity: 1}, {itemId: 'I03N', quantity: 1}, {itemId: 'I0CQ', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 13000} ],
    activeAbility: { name: 'Развеивание', description: 'Снимает положительные эффекты', cooldown: 50, manacost: 175, note: null }
  },

  // ---------- ВООРУЖЕНИЕ 2 ----------
  I0C4: { id: 'I0C4', name: 'Жнец душ', icon: '💀🌾', type: 'weapon', cost: 16780,
    description: '+150 атаки, +20% урона в ближнем бою, 35% шанс микростан (300 урона, 0.1 сек), Увечье: 15% шанс снизить атаку врага на 30% (3 сек), Точность (переключаемое): атаки не промахиваются',
    components: [ {itemId: 'I0CQ', quantity: 1}, {itemId: 'I0FD', quantity: 1}, {itemId: 'odef', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 12000} ]
  },
  I0CM: { id: 'I0CM', name: 'Проклятый череп', icon: '💀🔮', type: 'weapon', cost: 21700,
    description: '+200 атаки, +5% множитель маг. вампиризма, +5% множитель маг. блока, +10% Удача, Размен Душ (актив): обмен процентным запасом здоровья с целью',
    components: [ {itemId: 'I0CQ', quantity: 1}, {itemId: 'I03I', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 16600} ],
    activeAbility: { name: 'Размен Душ', description: 'Обмен процентным запасом здоровья с целью', cooldown: 80, manacost: 350, note: null }
  },
  I02N: { id: 'I02N', name: 'Рука тьмы', icon: '🖤🤚', type: 'weapon', cost: 21885,
    description: '+140 атаки, +40 силы, Баш (15% 1.3 сек 400 урона), Критический удар (20% x1.8), Темный заряд (актив): 900 + 2x наибольший атрибут, стан 1.5 сек',
    components: [ {itemId: 'odef', quantity: 1}, {itemId: 'I00Y', quantity: 1}, {itemId: 'I015', quantity: 1}, {itemId: 'I00M', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 13000} ],
    activeAbility: { name: 'Темный заряд', description: '900 + 2x наибольший атрибут урона, стан 1.5 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0EP: { id: 'I0EP', name: 'Лук тьмы', icon: '🏹🌑', type: 'weapon', cost: 40380,
    description: '+280 атаки, +50 силы/ловкости, +60% скорости боя, Баш (17% 1.4 сек 450 урона), Критический удар (22% x2.0), Темный заряд (актив), Темный снаряд (пассив)',
    components: [ {itemId: 'I02N', quantity: 1}, {itemId: 'I013', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10000} ],
    activeAbility: { name: 'Темный заряд', description: '900 + 2x наибольший атрибут урона, стан 1.5 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0FO: { id: 'I0FO', name: 'Клинок солнца', icon: '☀️🗡️', type: 'weapon', cost: 3850,
    description: '+40 атаки, +15% скорости боя, +600 здоровья, Дар солнца (пассив): +90 физ. урона днем',
    components: [ {itemId: 'gcel', quantity: 1}, {itemId: 'I0C9', quantity: 1}, {itemId: 'I007', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1500} ]
  },
  I0FP: { id: 'I0FP', name: 'Клинок луны', icon: '🌙🗡️', type: 'weapon', cost: 3900,
    description: '+40 атаки, +15% скорости боя, +600 маны, Дар луны (пассив): +90 маг. урона ночью',
    components: [ {itemId: 'gcel', quantity: 1}, {itemId: 'I0C8', quantity: 1}, {itemId: 'I007', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1500} ]
  },
  I0FQ: { id: 'I0FQ', name: 'Скрещенные клинки', icon: '⚔️⚔️', type: 'weapon', cost: 18400,
    description: '+120 атаки, +30% скорости боя, +600 здоровья и маны, Божественный дар (пассив): +180 +AGIx0.25 физ. и маг. урона при каждой атаке',
    components: [ {itemId: 'I0FO', quantity: 1}, {itemId: 'I0FP', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10650} ]
  },

  // ---------- МАГИЧЕСКИЕ АРТЕФАКТЫ ----------
  I01Q: { id: 'I01Q', name: 'Копьё молний I', icon: '⚡🏹', type: 'intelligence', cost: 2875,
    description: '+40 атаки, +100% восстановления маны, Цепь молнии (к заклинаниям): 100% шанс, 200 + 0.4x INT урона, 3 цели, -10% за цель',
    components: [ {itemId: 'oli2', quantity: 1}, {itemId: 'I009', quantity: 1}, {itemId: 'rwiz', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1500} ],
    upgradesTo: ['I01W']
  },
  I01W: { id: 'I01W', name: 'Копьё молний II', icon: '⚡🏹✨', type: 'intelligence', cost: 6900,
    description: '+60 атаки, +140% восстановления маны, +25 разума, +800 маны, Цепь молнии (к заклинаниям/атаке): 100% / 20% шанс, 200 + 0.4x INT урона, 3 цели',
    components: [ {itemId: 'mnsf', quantity: 1}, {itemId: 'I009', quantity: 1}, {itemId: 'oli2', quantity: 1}, {itemId: 'I01Q', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2000} ],
    upgradesTo: ['I03R']
  },
  I03R: { id: 'I03R', name: 'Посох молний', icon: '⚡🔮', type: 'intelligence', cost: 15900,
    description: '+120 атаки, +200% восстановления маны, +55 разума, +1300 маны, Цепь молнии (к заклинаниям/атаке): 100% / 25% шанс, 350 + 0.8x INT урона, 5 целей, Щит молний (актив): 500 урона/сек',
    components: [ {itemId: 'mnsf', quantity: 2}, {itemId: 'I01W', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 7050} ],
    upgradesTo: ['I08Y'],
    activeAbility: { name: 'Щит молний', description: '500 урона в секунду вокруг героя', cooldown: 30, manacost: 100, note: null }
  },
  I08Y: { id: 'I08Y', name: 'Посох грома', icon: '🌩️🔮', type: 'intelligence', cost: 30900,
    description: '+280 атаки, +300% восстановления маны, +80 разума, +2200 маны, Цепь молнии (35% шанс, 500 + 1.2x INT, 7 целей), Щит молний (800 урона/сек), Гром (актив): 500 + 1x INT',
    components: [ {itemId: 'I03R', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 15000} ],
    activeAbility: { name: 'Гром', description: '500 + 1x INT урона', cooldown: 50, manacost: 175, note: null }
  },
  I02T: { id: 'I02T', name: 'Ледяной меч I', icon: '❄️⚔️', type: 'intelligence', cost: 4325,
    description: '+60 атаки, +600 маны, Ледяная звезда: 10% шанс, 50 + 0.5x осн. атрибут урона',
    components: [ {itemId: 'pmna', quantity: 1}, {itemId: 'ofro', quantity: 1}, {itemId: 'I007', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2200} ],
    upgradesTo: ['I00U']
  },
  I00U: { id: 'I00U', name: 'Ледяной меч II', icon: '❄️⚔️✨', type: 'intelligence', cost: 6525,
    description: '+80 атаки, +800 маны, Ледяная звезда: 15% шанс, 100 + 0.6x осн. атрибут урона',
    components: [ {itemId: 'I02T', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2200} ],
    upgradesTo: ['I02U']
  },
  I02U: { id: 'I02U', name: 'Ледяной меч III', icon: '❄️⚔️💫', type: 'intelligence', cost: 8725,
    description: '+100 атаки, +1000 маны, Ледяная звезда: 20% шанс, 150 + 0.7x осн. атрибут урона',
    components: [ {itemId: 'I00U', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2200} ],
    upgradesTo: ['I03E']
  },
  I03E: { id: 'I03E', name: 'Ледяной меч IV', icon: '❄️⚔️🌟', type: 'intelligence', cost: 10925,
    description: '+120 атаки, +1200 маны, Ледяная звезда: 25% шанс, 200 + 0.8x осн. атрибут урона',
    components: [ {itemId: 'I02U', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2200} ],
    upgradesTo: ['I03F']
  },
  I03F: { id: 'I03F', name: 'Ледяной меч V', icon: '❄️⚔️👑', type: 'intelligence', cost: 13125,
    description: '+140 атаки, +1400 маны, Ледяная звезда: 30% шанс, 250 + 0.9x осн. атрибут урона',
    components: [ {itemId: 'I03E', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2200} ]
  },
  I02Z: { id: 'I02Z', name: 'Ледяное око', icon: '❄️👁️', type: 'intelligence', cost: 6400,
    description: '+35 разума, +1000 маны, +8 защиты, Оледенение (актив): 500 + INTx0.5, стан 1 сек',
    components: [ {itemId: 'I00A', quantity: 1}, {itemId: 'ofro', quantity: 1}, {itemId: 'mnsf', quantity: 1}, {itemId: 'pmna', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 3500} ],
    activeAbility: { name: 'Оледенение', description: '500 + 0.5x INT урона, стан 1 сек', cooldown: 25, manacost: 100, note: null }
  },
  I01I: { id: 'I01I', name: 'Ледяные доспехи', icon: '❄️🛡️', type: 'intelligence', cost: 10225,
    description: '+15 защиты, +35 разума, Замораживающая аура: 20% AS, 10% MS (пассив), Арктический всплеск (актив): 400 + 4x INT',
    components: [ {itemId: 'ofro', quantity: 1}, {itemId: 'mnsf', quantity: 1}, {itemId: 'I00A', quantity: 1}, {itemId: 'I00C', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 7000} ],
    activeAbility: { name: 'Арктический всплеск', description: '400 + 4x INT урона', cooldown: 50, manacost: 175, note: null }
  },
  I09R: { id: 'I09R', name: 'Ледяной дух', icon: '❄️👻', type: 'intelligence', cost: 43750,
    description: '+200 атаки, +30 защиты, +2500 маны, +75 разума, Замораживающая аура (30% AS, 15% MS), Ледяная звезда (35% шанс, 400 + 1.5x осн. атрибут), Арктический всплеск (актив): 1000 + 6x INT',
    components: [ {itemId: 'I03F', quantity: 1}, {itemId: 'I01I', quantity: 1}, {itemId: 'I02Z', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 14000} ],
    activeAbility: { name: 'Арктический всплеск', description: '1000 + 6x INT урона', cooldown: 60, manacost: 225, note: null }
  },

  // ---------- МАГИЧЕСКАЯ ЭКИПИРОВКА ----------
  I00P: { id: 'I00P', name: 'Шлем ярости', icon: '😡⛑️', type: 'vampirism', cost: 4050,
    description: '+15 ко всем атрибутам, +15 регенерации здоровья, Вампиризм 20% (Орб. эффект)',
    components: [ {itemId: 'I01O', quantity: 1}, {itemId: 'rlif', quantity: 1}, {itemId: 'modt', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1500} ]
  },
  I014: { id: 'I014', name: 'Шлем демона', icon: '👹⛑️', type: 'vampirism', cost: 10725,
    description: '+35 силы, +30 ловкости, +25 разума, +30 регенерации здоровья, Вампиризм 30% (Орб. эффект)',
    components: [ {itemId: 'I01O', quantity: 1}, {itemId: 'I00P', quantity: 1}, {itemId: 'I015', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    upgradesTo: ['I04H']
  },
  I04H: { id: 'I04H', name: 'Маска демона', icon: '👹🎭', type: 'vampirism', cost: 22125,
    description: '+65 силы, +60 ловкости, +55 разума, +40 регенерации здоровья, Вампиризм 45% (пассив), Вампиризм (актив, 4 сек): 150%',
    components: [ {itemId: 'I000', quantity: 1}, {itemId: 'I0AL', quantity: 1}, {itemId: 'I014', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 6500} ],
    upgradesTo: ['I0GI'],
    activeAbility: { name: 'Вампиризм', description: '150% вампиризма на 4 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0GI: { id: 'I0GI', name: 'Адская маска', icon: '🔥👹', type: 'vampirism', cost: 41325,
    description: '+180 атаки, +90 ко всем атрибутам, +80 регенерации здоровья, Вампиризм 50% (Орб. эффект), Вампиризм (актив, 6 сек): 150% +300 атаки, иммунитет к оглушению, немота',
    components: [ {itemId: 'I04H', quantity: 1}, {itemId: 'I0CQ', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 15900} ],
    activeAbility: { name: 'Бешенство', description: '150% вампиризма, +300 атаки, иммунитет к оглушению, немота на 6 сек', cooldown: 40, manacost: 150, note: null }
  },
  I01X: { id: 'I01X', name: 'Амулет отрицания', icon: '🚫📿', type: 'magic_block', cost: 11200,
    description: '+20 ко всем атрибутам, Магический блок 10%',
    components: [ {itemId: 'I01O', quantity: 2}, {itemId: 'I0FB', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 8000} ]
  },
  I01Y: { id: 'I01Y', name: 'Амулет плоти', icon: '🧬📿', type: 'magic_vampirism', cost: 10250,
    description: '+20 ко всем атрибутам, Магический вампиризм: 10% по героям, 5% по крипам',
    components: [ {itemId: 'I01O', quantity: 2}, {itemId: 'I0FA', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 7000} ]
  },
  I026: { id: 'I026', name: 'Сердце демона', icon: '❤️👹', type: 'magic_vampirism_block', cost: 29450,
    description: '+40 ко всем атрибутам, Магический блок 15%, Магический вампиризм: 15% по героям, 8% по крипам',
    components: [ {itemId: 'I01X', quantity: 1}, {itemId: 'I01Y', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 8000} ],
    upgradesTo: ['I043']
  },
  I043: { id: 'I043', name: 'Сердце демона II', icon: '❤️👹✨', type: 'magic_vampirism_block', cost: 42950,
    description: '+70 ко всем атрибутам, Магический блок 20%, Магический вампиризм: 20% по героям, 10% по крипам',
    components: [ {itemId: 'I026', quantity: 1}, {itemId: 'I000', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10000} ],
    upgradesTo: ['I0BV']
  },
  I0BV: { id: 'I0BV', name: 'Демоническая сущность', icon: '👹🔮', type: 'magic_vampirism_block', cost: 56450, tags: ['boss'],
    description: '+120 ко всем атрибутам, Магический блок 30% (15% пассив), Магический вампиризм: 30% по героям, 15% по крипам, Поглотить (актив)',
    components: [ {itemId: 'I043', quantity: 1}, {itemId: 'I0B5', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 13500} ],
    activeAbility: { name: 'Поглотить', description: 'союзник получает 30% маг. вампиризма и блока на 10 сек', cooldown: 60, manacost: 250, note: null }
  },
  I03C: { id: 'I03C', name: 'Золотая медаль', icon: '🏅', type: 'neutral', cost: 9200,
    description: '+10 ко всем атрибутам, Охота (пассив): золото за убийство крипов (уровень x3)',
    components: [ {itemId: 'I01O', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 8000} ]
  },

  // ---------- СИТУАТИВНЫЕ ПРЕДМЕТЫ ----------
  I0DT: { id: 'I0DT', name: 'Крест', icon: '✝️', type: 'neutral', cost: 4550,
    description: '+700 здоровья, +18 ко всем атрибутам, +70 скорости бега, Бегство (пассив): при падении здоровья ниже 20% – неуязвимость на 3 сек, потеря атаки',
    components: [ {itemId: 'I00N', quantity: 1}, {itemId: 'I00K', quantity: 1}, {itemId: 'I0C9', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1200} ]
  },
  I0DQ: { id: 'I0DQ', name: 'Печать помощи I', icon: '🆘', type: 'neutral', cost: 2300,
    description: '+20 атаки, +6 регенерации здоровья, 20% шанс восстановить 150 здоровья при атаке, Спасение (актив): исцеление в области 400 (400 +10x уровень союзника)',
    components: [ {itemId: 'rlif', quantity: 1}, {itemId: 'I007', quantity: 1}, {itemId: 'I004', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1100} ],
    upgradesTo: ['I0DR'],
    activeAbility: { name: 'Спасение', description: 'Исцеление в области 400 (400 +10x уровень союзника)', cooldown: 25, manacost: 100, note: null }
  },
  I0DR: { id: 'I0DR', name: 'Печать помощи II', icon: '🆘✨', type: 'neutral', cost: 3400,
    description: '+40 атаки, +12 регенерации здоровья, 20% шанс восстановить 200 здоровья при атаке, Спасение (актив): 600 +10x уровень союзника в области 500',
    components: [ {itemId: 'I0DQ', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1100} ],
    upgradesTo: ['I0DS'],
    activeAbility: { name: 'Спасение', description: 'Исцеление в области 500 (600 +10x уровень союзника)', cooldown: 25, manacost: 100, note: null }
  },
  I0DS: { id: 'I0DS', name: 'Печать помощи III', icon: '🆘🌟', type: 'neutral', cost: 4500,
    description: '+60 атаки, +30 регенерации здоровья, 20% шанс восстановить 250 здоровья при атаке, Спасение (актив): 800 +10x уровень союзника в области 600',
    components: [ {itemId: 'I0DR', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1100} ],
    activeAbility: { name: 'Спасение', description: 'Исцеление в области 600 (800 +10x уровень союзника)', cooldown: 25, manacost: 100, note: null }
  },
  I04B: { id: 'I04B', name: 'Посох ветров', icon: '💨🔮', type: 'intelligence', cost: 2765,
    description: '+15 разума, +13 ко всем атрибутам, +10 регенерации здоровья, Толчок (актив): 1000 дальность',
    components: [ {itemId: 'I00K', quantity: 1}, {itemId: 'rlif', quantity: 1}, {itemId: 'rnsp', quantity: 1}, {itemId: 'mnsf', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 900} ],
    activeAbility: { name: 'Толчок', description: 'Отталкивает врагов на 1000 дальности', cooldown: 20, manacost: 75, note: null }
  },
  I0EB: { id: 'I0EB', name: 'Кулон приспешника', icon: '🧑‍🎤', type: 'control', cost: 10250,
    description: '+1200 здоровья, +600 маны, Мрак (актив): снижает маг. защиту цели на 50%, останавливает регенерацию здоровья, снижает лечение на 50% (6 сек)',
    components: [ {itemId: 'I0C9', quantity: 2}, {itemId: 'I0C8', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 6000} ],
    activeAbility: { name: 'Мрак', description: 'Снижает маг. защиту на 50%, останавливает регенерацию и лечение на 6 сек', cooldown: 32, manacost: 125, note: null }
  },
  I04L: { id: 'I04L', name: 'Жезл боли I', icon: '💔🔮', type: 'intelligence_control', cost: 9925,
    description: '+65 разума, +45 силы/ловкости, Заклятье боли (актив): 500 + 150% осн. атрибута чистого урона, стан 1 сек',
    components: [ {itemId: 'I000', quantity: 1}, {itemId: 'I00K', quantity: 1}, {itemId: 'mnsf', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    upgradesTo: ['I0BG'],
    activeAbility: { name: 'Заклятье боли', description: '500 + 150% осн. атрибута чистого урона, стан 1 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0BG: { id: 'I0BG', name: 'Жезл боли II', icon: '💔🔮✨', type: 'intelligence_control', cost: 14425,
    description: '+85 разума, +60 силы/ловкости, Заклятье боли: 1000 + 200% осн. атрибута чистого урона, стан 1 сек',
    components: [ {itemId: 'I04L', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    upgradesTo: ['I0BH'],
    activeAbility: { name: 'Заклятье боли', description: '1000 + 200% осн. атрибута чистого урона, стан 1 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0BH: { id: 'I0BH', name: 'Жезл боли III', icon: '💔🔮🌟', type: 'intelligence_control', cost: 18925,
    description: '+105 разума, +75 силы/ловкости, Заклятье боли: 1500 + 250% осн. атрибута чистого урона, стан 1 сек',
    components: [ {itemId: 'I0BG', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    activeAbility: { name: 'Заклятье боли', description: '1500 + 250% осн. атрибута чистого урона, стан 1 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0CN: { id: 'I0CN', name: 'Сфера магии', icon: '✨🔮', type: 'rare', cost: 17850, tags: ['boss'],
    description: '+80 ко всем атрибутам, +1000 здоровья и маны, +10% доп. урон заклинаний, +10% Удача, +30 маны/сек, Благословение (актив): +30% бонус статов на 6 сек',
    components: [ {itemId: 'I0C9', quantity: 1}, {itemId: 'I0C8', quantity: 1}, {itemId: 'I0B5', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10000} ],
    activeAbility: { name: 'Благословение', description: '+30% бонус статов на 6 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0D1: { id: 'I0D1', name: 'Посох подавления', icon: '🚷🔮', type: 'intelligence_control', cost: 12200,
    description: '+60 разума, +20 силы/ловкости, +900 здоровья, Безмолвие (актив): запрещает использовать способности на 5 сек, после наносит 30% полученного маг. урона',
    components: [ {itemId: 'I0CP', quantity: 2}, {itemId: 'recipe', quantity: 1, costOverride: 3650} ],
    activeAbility: { name: 'Безмолвие', description: 'Запрещает способности на 5 сек, наносит 30% полученного маг. урона', cooldown: 25, manacost: 100, note: null }
  },
  I054: { id: 'I054', name: 'Огненная перчатка I', icon: '🔥🧤', type: 'weapon', cost: 7200,
    description: '+80 атаки, +20% скорости боя, Атака огнём – 20 маг. урона, Магия огня (актив): 350 чистого урона/сек (5 сек), область 300',
    components: [ {itemId: 'gcel', quantity: 1}, {itemId: 'I03I', quantity: 1}, {itemId: 'ofir', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    upgradesTo: ['I0BE'],
    activeAbility: { name: 'Магия огня', description: '350 чистого урона/сек (5 сек), область 300', cooldown: 90, manacost: 350, note: null }
  },
  I0BE: { id: 'I0BE', name: 'Огненная перчатка II', icon: '🔥🧤✨', type: 'weapon', cost: 11700,
    description: '+100 атаки, +30% скорости боя, Атака огнём – 40 маг. урона, Магия огня (актив): 500 чистого урона/сек (5 сек), область 475',
    components: [ {itemId: 'I054', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    upgradesTo: ['I0BF'],
    activeAbility: { name: 'Магия огня', description: '500 чистого урона/сек (5 сек), область 475', cooldown: 90, manacost: 350, note: null }
  },
  I0BF: { id: 'I0BF', name: 'Огненная перчатка III', icon: '🔥🧤👑', type: 'weapon', cost: 16200,
    description: '+120 атаки, +40% скорости боя, Атака огнём – 60 маг. урона, Магия огня (актив): 650 чистого урона/сек (5 сек), область 725',
    components: [ {itemId: 'I0BE', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    activeAbility: { name: 'Магия огня', description: '650 чистого урона/сек (5 сек), область 725', cooldown: 90, manacost: 350, note: null }
  },

  // ---------- ЭЛЕМЕНТ СИЛЫ ----------
  I011: { id: 'I011', name: 'Огромный топор', icon: '🪓💪', type: 'weapon_strength', cost: 3850,
    description: '+25 силы, +60 атаки, +15% скорости боя, Сплеш атака: 20%, 150 АоЕ (10%, 150 для дальнего боя)',
    components: [ {itemId: 'gcel', quantity: 1}, {itemId: 'I006', quantity: 1}, {itemId: 'I004', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2400} ]
  },
  I00M: { id: 'I00M', name: 'Громовой молот', icon: '⚡🔨', type: 'weapon_strength', cost: 3900,
    description: '+20 атаки, +20 силы, Баш: 15% шанс стан 1 сек и 50 урона',
    components: [ {itemId: 'oli2', quantity: 1}, {itemId: 'I015', quantity: 1}, {itemId: 'I005', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 2025} ]
  },
  I03X: { id: 'I03X', name: 'Кровавая луна I', icon: '🌑🩸', type: 'weapon_strength', cost: 11750,
    description: '+50 силы, +150 атаки, +40% скорости боя, Баш: 15% шанс стан 1.1 сек и 100 урона, Сплеш атака: 40%, 250 АоЕ (20%, 250 для дальнего боя)',
    components: [ {itemId: 'I00M', quantity: 1}, {itemId: 'I011', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4000} ],
    upgradesTo: ['I01A']
  },
  I01A: { id: 'I01A', name: 'Кровавая луна II', icon: '🌑🩸✨', type: 'weapon_strength', cost: 23100,
    description: '+100 силы, +250 атаки, +60% скорости боя, Баш: 15% шанс стан 1.2 сек и 200 урона, Сплеш: 60%, 300 АоЕ (30%, 300 для дальнего боя), При атаке 15% шанс повысить силу на 12% (6 сек, кд 10)',
    components: [ {itemId: 'I03X', quantity: 1}, {itemId: 'I011', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 7500} ]
  },
  I028: { id: 'I028', name: 'Посох разложения I', icon: '☣️🔮', type: 'magic_immune', cost: 8525,
    description: '+20 силы, +45 атаки, +5% сопротивление к сожжению маны, Невосприимчивость к магии (актив): 3 сек',
    components: [ {itemId: 'I006', quantity: 1}, {itemId: 'I005', quantity: 1}, {itemId: 'I015', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 6500} ],
    upgradesTo: ['I08U'],
    activeAbility: { name: 'Невосприимчивость к магии', description: 'Иммунитет к магии на 3 сек', cooldown: 60, manacost: 225, note: null }
  },
  I08U: { id: 'I08U', name: 'Посох разложения II', icon: '☣️🔮✨', type: 'magic_immune', cost: 15025,
    description: '+30 силы, +65 атаки, +10% сопротивление к сожжению маны, Невосприимчивость к магии (актив): 5 сек',
    components: [ {itemId: 'I028', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 6500} ],
    activeAbility: { name: 'Невосприимчивость к магии', description: 'Иммунитет к магии на 5 сек', cooldown: 60, manacost: 225, note: null }
  },
  I04O: { id: 'I04O', name: 'Кровопускатель', icon: '🩸⚔️', type: 'weapon_strength', cost: 7475,
    description: '+100 атаки, +25 силы, Кровоточащий удар (пассив): 50 + STRx0.5 (3 сек), 25% урона в дальнем бою, Замедление бега: 30%, 3 сек',
    components: [ {itemId: 'oslo', quantity: 1}, {itemId: 'oven', quantity: 1}, {itemId: 'I015', quantity: 1}, {itemId: 'I006', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 5000} ]
  },
  I0AC: { id: 'I0AC', name: 'Коса смерти', icon: '💀🌾', type: 'weapon_strength', cost: 32125,
    description: '+200 атаки, +60 силы, +30 ловкости, +30% скорости боя, Жатва: +3 ко всем атрибутам за убийство героя, Кровоточащий удар: 100 + STRx1 (4 сек), Замедление бега: 50%, 4 сек',
    components: [ {itemId: 'I04O', quantity: 1}, {itemId: 'I03N', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 20000} ]
  },
  I0DA: { id: 'I0DA', name: 'Алебарда', icon: '⚔️🪓', type: 'strength_control', cost: 13250,
    description: '+150 атаки, +40 силы, +20% уклонение, +10% множитель маг. вампиризма/блока, Обезоруживание (актив): 4/5 сек',
    components: [ {itemId: 'I0CQ', quantity: 1}, {itemId: 'I015', quantity: 1}, {itemId: 'evtl', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 6000} ],
    activeAbility: { name: 'Обезоруживание', description: 'Противник не может атаковать 4/5 сек', cooldown: 25, manacost: 100, note: null }
  },

  // ---------- ЭЛЕМЕНТ РАЗУМНЫЙ ----------
  I08V: { id: 'I08V', name: 'Клинок ведьмака I', icon: '🧙⚔️', type: 'intelligence', cost: 5425,
    description: '+35 ловкости, +20 разума, Сожжение маны: 60 ед. (50% у иллюзий)',
    components: [ {itemId: 'mnsf', quantity: 1}, {itemId: 'I010', quantity: 2}, {itemId: 'recipe', quantity: 1, costOverride: 2500} ],
    upgradesTo: ['I08W']
  },
  I08W: { id: 'I08W', name: 'Клинок ведьмака II', icon: '🧙⚔️✨', type: 'intelligence', cost: 12725,
    description: '+65 атаки, +40 ловкости, +25 разума, Сожжение маны: 100 ед., Магический огонь (актив): 600 + 20% от тек. маны жертвы',
    components: [ {itemId: 'I08V', quantity: 1}, {itemId: 'I03I', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 5500} ],
    upgradesTo: ['I08X'],
    activeAbility: { name: 'Магический огонь', description: '600 + 20% от текущей маны цели', cooldown: 40, manacost: 150, note: null }
  },
  I08X: { id: 'I08X', name: 'Клинок ведьмака III', icon: '🧙⚔️🌟', type: 'intelligence', cost: 23975,
    description: '+170 атаки, +50 ловкости, +35 разума, Сожжение маны: 160 ед., Магическое опустошение (актив): 900 + 40% от тек. маны жертвы',
    components: [ {itemId: 'I08W', quantity: 1}, {itemId: 'I03I', quantity: 1}, {itemId: 'mnsf', quantity: 1}, {itemId: 'I010', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 7500} ],
    activeAbility: { name: 'Магическое опустошение', description: '900 + 40% от текущей маны цели', cooldown: 60, manacost: 225, note: null }
  },
  I0AI: { id: 'I0AI', name: 'Посох разрушения', icon: '💥🔮', type: 'intelligence', cost: 55500,
    description: '+190 атаки, +90 разума, +75 ловкости, +25 силы, +950 здоровья и маны, +15% доп. урон заклинаний, Сожжение маны 300, Магическое разрушение (актив): 1500 + 50% маны жертвы, Массовая немота 6 сек',
    components: [ {itemId: 'I04K', quantity: 1}, {itemId: 'I08X', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 8800} ],
    activeAbility: { name: 'Магическое разрушение', description: '1500 + 50% маны жертвы + немота 6 сек', cooldown: 80, manacost: 350, note: null }
  },
  I00R: { id: 'I00R', name: 'Жезл исцеления', icon: '💚🔮', type: 'intelligence', cost: 5725,
    description: '+40 разума, +500 здоровья, Регенерация: 1% от недостающего здоровья/сек, Целительная волна (актив): 1000 +10% здоровья, 2 цели',
    components: [ {itemId: 'rhth', quantity: 1}, {itemId: 'I00K', quantity: 1}, {itemId: 'mnsf', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 3500} ],
    activeAbility: { name: 'Целительная волна', description: '1000 +10% здоровья, 2 цели', cooldown: 30, manacost: 100, note: null }
  },
  I00W: { id: 'I00W', name: 'Посох восстановления', icon: '💚🔮✨', type: 'intelligence', cost: 15425,
    description: '+80 разума, +50 силы/ловкости, +850 здоровья, Регенерация: 2% от недостающего здоровья/сек, Целительная волна: 1500 +15% здоровья, 4 цели',
    components: [ {itemId: 'I000', quantity: 1}, {itemId: 'I01O', quantity: 1}, {itemId: 'I00R', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 5000} ],
    activeAbility: { name: 'Целительная волна', description: '1500 +15% здоровья, 4 цели', cooldown: 40, manacost: 150, note: null }
  },
  I03V: { id: 'I03V', name: 'Посох света', icon: '✨🔮', type: 'intelligence', cost: 27100,
    description: '+110 разума, +60 силы/ловкости, +1200 здоровья, +20% усиление лечения, +5% Удача, Регенерация: 3% от недостающего/сек, Ритуал жизни (актив): 2000 +20% макс. здоровья, 6 целей',
    components: [ {itemId: 'I0CP', quantity: 1}, {itemId: 'I00W', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 7400} ],
    activeAbility: { name: 'Ритуал жизни', description: '2000 +20% макс. здоровья, 6 целей', cooldown: 40, manacost: 150, note: null }
  },
  I0DB: { id: 'I0DB', name: 'Скипетр Владыки I', icon: '👑🔮', type: 'intelligence', cost: 19225,
    description: '+1000 маны, +80 разума, +50 силы/ловкости, +600 здоровья, +5% Удача, Пассив: после способностей восстанавливает 3% макс. здоровья раз в 2 сек, шанс мгновенного сброса ульты',
    components: [ {itemId: 'I0C8', quantity: 1}, {itemId: 'I0CP', quantity: 1}, {itemId: 'I000', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 10000} ],
    upgradesTo: ['I0EY']
  },
  I0EY: { id: 'I0EY', name: 'Скипетр Владыки II', icon: '👑🔮✨', type: 'intelligence', cost: 69325,
    description: '+1800 здоровья, +1200 маны, +200 разума, +120 силы/ловкости, +25% лечение, +15% Удача, Регенерация 4%/сек, Ритуал жизни (2500 +25% макс. здоровья, 8 целей), Пассив: 5% здоровья раз в 2 сек, шанс сброса ульты',
    components: [ {itemId: 'I0DB', quantity: 1}, {itemId: 'I03V', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 23000} ],
    activeAbility: { name: 'Ритуал жизни', description: '2500 +25% макс. здоровья, 8 целей', cooldown: 50, manacost: 175, note: null }
  },
  I04E: { id: 'I04E', name: 'Древний посох', icon: '📜🔮', type: 'intelligence', cost: 9250,
    description: '+500 здоровья и маны, +40 разума, +10 силы/ловкости, Немота (актив): 4 сек',
    components: [ {itemId: 'mnsf', quantity: 1}, {itemId: 'I0CP', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4000} ],
    activeAbility: { name: 'Немота', description: 'Цель не может использовать способности 4 сек', cooldown: 30, manacost: 100, note: null }
  },
  I04K: { id: 'I04K', name: 'Древний мистический', icon: '📜🔮✨', type: 'intelligence', cost: 22725,
    description: '+800 здоровья и маны, +55 разума, +25 силы/ловкости, Массовая немота (актив): 700 область, герои, 5 сек',
    components: [ {itemId: 'I04E', quantity: 1}, {itemId: 'I0C8', quantity: 1}, {itemId: 'I0CP', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 9200} ],
    activeAbility: { name: 'Массовая немота', description: 'В области 700 враги не могут использовать способности 5 сек', cooldown: 70, manacost: 300, note: null }
  },

  // ---------- ЭЛЕМЕНТ ЛОВКОСТИ ----------
  I03N: { id: 'I03N', name: 'Когти шамана', icon: '🦴🔮', type: 'agility', cost: 4650,
    description: '+20 ловкости, +20 силы, +20 атаки, +20% скорости боя, Замедление: 20% шанс снизить скорость атаки врага на 30% на 2 сек',
    components: [ {itemId: 'I004', quantity: 1}, {itemId: 'gcel', quantity: 1}, {itemId: 'I015', quantity: 1}, {itemId: 'I010', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 1800} ]
  },
  I023: { id: 'I023', name: 'Жезл стремительности', icon: '💨🔮', type: 'agility', cost: 5325,
    description: '+30 ловкости, +75 атаки, Аура скорости: 12% AS, 12% MS, Невидимость (актив): 300 ед. подлый удар, 10 сек',
    components: [ {itemId: 'I010', quantity: 1}, {itemId: 'ajen', quantity: 1}, {itemId: 'I009', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 3000} ],
    activeAbility: { name: 'Невидимость', description: '300 ед. подлый удар, 10 сек', cooldown: 45, manacost: 125, note: null }
  },
  I03T: { id: 'I03T', name: 'Кинжал призрака', icon: '👻🗡️', type: 'agility', cost: 14975,
    description: '+50 ловкости, +95 атаки, +25 силы, Аура скорости: 25% AS, 16% MS, Невидимость (актив): 600 ед. подлый удар, 15 сек, Замедление: 25% шанс замедлить скорость атаки на 30% и бега на 8 сек',
    components: [ {itemId: 'I03N', quantity: 1}, {itemId: 'I023', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 5000} ],
    activeAbility: { name: 'Невидимость', description: '600 ед. подлый удар, 15 сек', cooldown: 45, manacost: 125, note: null }
  },
  I02X: { id: 'I02X', name: 'Золотой меч', icon: '🥇⚔️', type: 'agility', cost: 7775,
    description: '+155 атаки, +35 ловкости, Сияние: 150 чистого урона/сек врагам в области 400',
    components: [ {itemId: 'I010', quantity: 1}, {itemId: 'I008', quantity: 1}, {itemId: 'I007', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 5750} ]
  },
  I01B: { id: 'I01B', name: 'Клинок убийцы', icon: '🗡️💀', type: 'agility', cost: 28575,
    description: '+70 ловкости, +20 силы, +300 атаки, +100% скорости боя, Критический удар: 25% шанс x2.5 урона, Скорость молнии (актив): 500 + AGIx1.5, стан 1 сек',
    components: [ {itemId: 'I015', quantity: 1}, {itemId: 'I010', quantity: 1}, {itemId: 'I00Y', quantity: 1}, {itemId: 'I013', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 15000} ],
    activeAbility: { name: 'Скорость молнии', description: '500 + AGIx1.5 урона, стан 1 сек', cooldown: 60, manacost: 225, note: null }
  },
  I03Z: { id: 'I03Z', name: 'Кровавый клинок', icon: '🩸🗡️', type: 'agility', cost: 53300,
    description: '+510 атаки, +130% скорости боя, +120 ловкости, +35 силы, Критический удар: 30% шанс x3 урона, Скорость молнии: 1000 + AGIx3, Сияние крови: 400 чистого урона/сек героям',
    components: [ {itemId: 'I02X', quantity: 1}, {itemId: 'I01B', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 16975} ],
    activeAbility: { name: 'Скорость молнии', description: '1000 + AGIx3 урона, стан 1 сек', cooldown: 70, manacost: 300, note: null }
  },
  I0EL: { id: 'I0EL', name: 'Нефритовый клинок', icon: '💚🗡️', type: 'agility', cost: 10775,
    description: '+120 атаки, +30 ловкости, Нефритовый удар: каждая 4-я атака призывает иллюзию (50% урона, 2 сек)',
    components: [ {itemId: 'I03I', quantity: 1}, {itemId: 'I010', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 8000} ]
  },
  I0EO: { id: 'I0EO', name: 'Нефритовые клинки', icon: '💚⚔️💚', type: 'agility', cost: 38600,
    description: '+350 атаки, +75 ловкости, +60% скорости боя, Нефритовый удар: каждая 3-я атака призывает иллюзию (60% урона, 2 сек)',
    components: [ {itemId: 'I0EL', quantity: 1}, {itemId: 'I013', quantity: 1}, {itemId: 'I0CQ', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 16000} ]
  },

  // ---------- ЭЛЕМЕНТ ЛОВКОСТИ 2 ----------
  I013: { id: 'I013', name: 'Лук', icon: '🏹', type: 'agility', cost: 8525,
    description: '+30 ловкости, +100 атаки, +50% скорости боя',
    components: [ {itemId: 'gcel', quantity: 1}, {itemId: 'I010', quantity: 1}, {itemId: 'I008', quantity: 1}, {itemId: 'I001', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 5500} ]
  },
  I01V: { id: 'I01V', name: 'Чёрная стрела I', icon: '🏹🖤', type: 'agility', cost: 8355,
    description: '+20 ловкости, +90 атаки, +20% скорости боя, Мультиатака: +3 цели, 2x осн. атрибут (только дальний бой)',
    components: [ {itemId: 'odef', quantity: 1}, {itemId: 'gcel', quantity: 1}, {itemId: 'I010', quantity: 1}, {itemId: 'I03I', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    upgradesTo: ['I03P']
  },
  I03P: { id: 'I03P', name: 'Чёрная стрела II', icon: '🏹🖤✨', type: 'agility', cost: 12855,
    description: '+35 ловкости, +120 атаки, +25% скорости боя, Мультиатака: +4 цели, 2x осн. атрибут',
    components: [ {itemId: 'I01V', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ],
    upgradesTo: ['I03Q']
  },
  I03Q: { id: 'I03Q', name: 'Чёрная стрела III', icon: '🏹🖤🌟', type: 'agility', cost: 17355,
    description: '+50 ловкости, +150 атаки, +30% скорости боя, Мультиатака: +5 целей, 2x осн. атрибут',
    components: [ {itemId: 'I03P', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 4500} ]
  },
  I0B1: { id: 'I0B1', name: 'Звёздный лук', icon: '🌟🏹', type: 'agility', cost: 45880,
    description: '+150 ловкости, +230 атаки, +120% скорости боя, Мультиатака: +6 целей, 2x осн. атрибут, Ярость света (пассив): 20% шанс +5% осн. атрибута (6 стаков), Ярость звезд: 25% шанс AGIx0.5 урона',
    components: [ {itemId: 'I03Q', quantity: 1}, {itemId: 'I013', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 20000} ]
  },
  I0FH: { id: 'I0FH', name: 'Лук вихрей', icon: '💨🏹', type: 'agility', cost: 25550,
    description: '+200 атаки, +100 ловкости, +100% скорости боя, Атакуя ускоряет скорость боя на 125% (4 сек), Кольца ветра (вкл/откл): 25% шанс оттолкнуть на 300, Воздушный поток: 5% шанс оттолкнуть атакующего',
    components: [ {itemId: 'I013', quantity: 2}, {itemId: 'recipe', quantity: 1, costOverride: 8500} ]
  },

  // ---------- ТЕМНЫЙ ДЕЛЕЦ ----------
  I0BA: { id: 'I0BA', name: 'Меч падшего', icon: '😈⚔️', type: 'weapon', cost: 189400, tags: ['boss'],
    description: '+2400 атаки, +100 ко всем атрибутам, Критический удар: 30% x4, Снижение защиты: ближний бой 150 (10 сек), дальний 112 (7 сек), Безмолвие (актив): 800 АоЕ, 3 сек, +Безмолвие 5% шанс при атаке 1 сек',
    components: [ {itemId: 'I047', quantity: 1}, {itemId: 'I03J', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 80000} ],
    activeAbility: { name: 'Безмолвие', description: 'В области 800, 3 сек', cooldown: 50, manacost: 175, note: null }
  },
  I04G: { id: 'I04G', name: 'Меч тьмы', icon: '🌑⚔️', type: 'weapon_strength', cost: 103855, tags: ['boss'],
    description: '+2000 атаки, +200 силы, +100% скорости боя, Баш: 20% шанс стан 1.5 сек и 1000 урона, Критический удар: 30% x2, Темная вспышка (актив): 2000 + 10x STR, стан 3 сек',
    components: [ {itemId: 'I01N', quantity: 1}, {itemId: 'I047', quantity: 1}, {itemId: 'I02N', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 22000} ],
    activeAbility: { name: 'Темная вспышка', description: '2000 + 10x силы урона, стан 3 сек', cooldown: 80, manacost: 350, note: null }
  },
  I01J: { id: 'I01J', name: 'Ледяной элемент', icon: '❄️🧊', type: 'rare', cost: 60000, tags: ['boss'],
    description: '+500 ко всем атрибутам',
    components: [ {itemId: 'I02E', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 20000} ]
  },
  I03L: { id: 'I03L', name: 'Меч вечной стужи', icon: '❄️💀⚔️', type: 'weapon_intelligence', cost: 203750, tags: ['boss'],
    description: '+5000 атаки, +3000 маны, +100 разума, +50 защиты, +500 ко всем атрибутам, Ледяная звезда: 50% шанс, 800 + 2.5x осн. атрибут, Замораживающая аура 50%, Фростшторм (актив): 5000 + 20x осн. атрибут',
    components: [ {itemId: 'I01J', quantity: 1}, {itemId: 'I09R', quantity: 1}, {itemId: 'I047', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 50000} ],
    activeAbility: { name: 'Фростшторм', description: '5000 + 20x осн. атрибут урона', cooldown: 150, manacost: 400, note: null }
  },
  I02D: { id: 'I02D', name: 'Щит джаггернаута', icon: '🛡️💪', type: 'armor', cost: 87050, tags: ['boss'],
    description: '+80 защиты, +4000 здоровья, Жар преисподней 600 дпс, +150 регенерации здоровья, +30% маг. защита, Возврат урона 25%, +20 аура защиты, Стойкость Полководца 250',
    components: [ {itemId: 'I01L', quantity: 1}, {itemId: 'I02B', quantity: 1}, {itemId: 'I00S', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 30000} ]
  },
  I0A5: { id: 'I0A5', name: 'Нерубский доспех', icon: '🕷️🛡️', type: 'armor', cost: 80000, tags: ['boss'],
    description: '+400 атаки, +60 защиты, +5000 здоровья, Пассивный возврат урона 30%, Активный возврат 100% урона (10 сек)',
    components: [ {itemId: 'I01L', quantity: 1}, {itemId: 'I01N', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 40000} ],
    activeAbility: { name: 'Возврат урона', description: 'Возвращает 100% получаемого урона 10 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0BD: { id: 'I0BD', name: 'Сфера мистицизма', icon: '🔮✨', type: 'rare', cost: 107000, tags: ['boss'],
    description: '+600 ко всем атрибутам, +3000 здоровья и маны, +100% усиление лечения, +30% доп. урон заклинаний, Обновление (актив): сбрасывает перезарядки предметов и способностей (кд 180)',
    components: [ {itemId: 'I02E', quantity: 2}, {itemId: 'recipe', quantity: 1, costOverride: 27000} ],
    activeAbility: { name: 'Обновление', description: 'Сбрасывает перезарядки всех предметов и способностей', cooldown: 180, manacost: 400, note: null }
  },
  I0B6: { id: 'I0B6', name: 'Щит джаггернаута II', icon: '🛡️💪✨', type: 'armor', cost: 267050, tags: ['boss'],
    description: '+150 защиты, +20 аура защиты, +10000 здоровья, +450 атаки, +200 регенерации здоровья, +40% маг. защита, Стойкость Полководца 250, Жар преисподней 800 дпс, Возврат урона 60% пасс, Активно 120% (12 сек)',
    components: [ {itemId: 'I02D', quantity: 1}, {itemId: 'I0A5', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 100000} ],
    activeAbility: { name: 'Возврат урона', description: 'Возвращает 120% получаемого урона 12 сек', cooldown: 40, manacost: 150, note: null }
  },
  I0B4: { id: 'I0B4', name: 'Защита ада', icon: '🔥🛡️', type: 'strength_armor', cost: 106025, tags: ['boss'],
    description: '+8000 здоровья, +30 защиты, +30% уклонение, +35% маг. защита, +150 силы, +100 ловкости/разума, Мощность драконов 25, Живучесть драконов 25%/450, Жар преисподней 450 дпс, +9% регенерации/сек вне боя, Воля Ада (актив)',
    components: [ {itemId: 'I045', quantity: 1}, {itemId: 'I03G', quantity: 1}, {itemId: 'I0CK', quantity: 1}, {itemId: 'recipe', quantity: 1, costOverride: 40000} ],
    activeAbility: { name: 'Воля Ада', description: 'Мощное усиление', cooldown: 90, manacost: 350, note: null }
  },

  // ---------- НЕЙТРАЛЬНЫЕ ПРЕДМЕТЫ (ВЫПАДАЮТ С БОССОВ) ----------
  I02E: { id: 'I02E', name: 'Волшебный алмаз', icon: '💎', type: 'boss_drop', cost: 40000, description: '+300 ко всем атрибутам. Падает при смерти!' },
  I01L: { id: 'I01L', name: 'Доспехи великана', icon: '🛡️👹', type: 'boss_drop', cost: 30000, description: '+50 защиты, возврат урона 20% (пассив). Падает при смерти!' },
  I0B5: { id: 'I0B5', name: 'Душа призрака', icon: '👻💨', type: 'boss_drop', cost: 5000, description: '+50 ко всем атрибутам. Падает при смерти!' },
  I047: { id: 'I047', name: 'Рапира', icon: '⚔️✨', type: 'boss_drop', cost: 50000, description: '+1500 атаки. Падает при смерти!' },
  I01N: { id: 'I01N', name: 'Когти вурдалака', icon: '🦴', type: 'boss_drop', cost: 10000, description: '+300 атаки. Падает при смерти!' },
  I0CK: { id: 'I0CK', name: 'Панцирь рака', icon: '🦞', type: 'boss_drop', cost: 20000, description: '+5000 здоровья. Падает при смерти!' },
  I0G4: { id: 'I0G4', name: 'Голова синего танатоса', icon: '💀🔵', type: 'boss_drop', cost: 10000, description: 'Без бонусов. Падает при смерти!' },
  I0G3: { id: 'I0G3', name: 'Голова зелёного танатоса', icon: '💀🟢', type: 'boss_drop', cost: 10000, description: 'Без бонусов. Падает при смерти!' },

  // ---------- УСИЛЕНИЯ (КНИГИ / РУНЫ) ----------
  I04P: { id: 'I04P', name: 'Книга Знаний', icon: '📕', type: 'boost', cost: 0, costCrystals: 6, description: '+1 ко всем атрибутам' },
  I04Q: { id: 'I04Q', name: 'Книга Силы', icon: '📕💪', type: 'boost', cost: 0, costCrystals: 2, description: '+1 к силе' },
  I04R: { id: 'I04R', name: 'Книга Ловкости', icon: '📕🏃', type: 'boost', cost: 0, costCrystals: 2, description: '+1 к ловкости' },
  I04U: { id: 'I04U', name: 'Книга Мудрости', icon: '📕🧠', type: 'boost', cost: 0, costCrystals: 2, description: '+1 к разуму' },
  I04S: { id: 'I04S', name: 'Книга характеристик +5', icon: '📘', type: 'boost', cost: 0, costCrystals: 30, description: '+5 ко всем атрибутам' },
  I04T: { id: 'I04T', name: 'Книга характеристик +10', icon: '📙', type: 'boost', cost: 0, costCrystals: 60, description: '+10 ко всем атрибутам' },
  I056: { id: 'I056', name: 'Книга характеристик +25', icon: '📚', type: 'boost', cost: 0, costCrystals: 150, description: '+25 ко всем атрибутам' },
  I04W: { id: 'I04W', name: 'Книга Познания', icon: '📖⬆️', type: 'boost', cost: 0, costCrystals: 12, description: '+1 уровень' },
  I057: { id: 'I057', name: 'Книга Могущества', icon: '📖⬆️✨', type: 'boost', cost: 0, costCrystals: 60, description: '+5 уровней' },
  I02V: { id: 'I02V', name: 'Книга Опыта', icon: '📔', type: 'boost', cost: 0, costCrystals: 5, description: '+500 опыта' },
  I04Y: { id: 'I04Y', name: 'Медицинский трактат', icon: '📔❤️', type: 'boost', cost: 0, costCrystals: 4, description: '+100 здоровья' },
  I04V: { id: 'I04V', name: 'Магические кристаллы (10)', icon: '💎', type: 'boost', cost: 4000, description: 'Получите 10 шт. магических кристаллов' },
  I050: { id: 'I050', name: 'Магические кристаллы (40)', icon: '💎💎', type: 'boost', cost: 16000, description: 'Купите целый сундук с сокровищами, который содержит 40 шт. магических кристаллов' },
  I0BP: { id: 'I0BP', name: 'Магические кристаллы (120)', icon: '💎💎💎', type: 'boost', cost: 48000, description: 'Купите целый сундук с сокровищами, который содержит 120 шт. магических кристаллов' },
  I04X: { id: 'I04X', name: 'Золото (2000)', icon: '💰', type: 'boost', cost: 0, costCrystals: 10, description: 'Приносит своему владельцу 2000 золота' },
  I053: { id: 'I053', name: 'Золото (8000)', icon: '💰💰', type: 'boost', cost: 0, costCrystals: 40, description: 'Приносит своему владельцу 8000 золота' },
  I0BO: { id: 'I0BO', name: 'Золото (24000)', icon: '💰💰💰', type: 'boost', cost: 0, costCrystals: 120, description: 'Приносит своему владельцу 24000 золота' },
  I02W: { id: 'I02W', name: 'Золото (2000)', icon: '💰', type: 'boost', cost: 0, costCrystals: 0, description: '2000 золота.Падает с боссов' },

  // Свитки (рецепты) – если нужны отдельно
  I0AM: { id: 'I0AM', name: 'Волшебное кольцо (свиток)', icon: '📜', type: 'recipe', cost: 700 },
  I0CC: { id: 'I0CC', name: 'Лунный камень (свиток)', icon: '📜', type: 'recipe', cost: 400 },
  I0CD: { id: 'I0CD', name: 'Солнечный камень (свиток)', icon: '📜', type: 'recipe', cost: 400 },
  I0CS: { id: 'I0CS', name: 'Посох колдуна (свиток)', icon: '📜', type: 'recipe', cost: 1600 },
  I021: { id: 'I021', name: 'Сапоги воина (свиток)', icon: '📜', type: 'recipe', cost: 100 },
 I024: { id: 'I024', name: 'Сапоги телепортации (свиток)', icon: '📜', type: 'recipe', cost: 200 },
  I01D: { id: 'I01D', name: 'Божественные сапоги (свиток)', icon: '📜', type: 'recipe', cost: 2500 },
  I031: { id: 'I031', name: 'Сапоги божественной ловкости (свиток)', icon: '📜', type: 'recipe', cost: 7700 },
 I0GS: { id: 'I0GS', name: 'Сапоги громовой поступи (свиток)', icon: '📜', type: 'recipe', cost: 2500 },
  I003: { id: 'I003', name: 'Щит древних (свиток)', icon: '📜', type: 'recipe', cost: 800 },
  I00X: { id: 'I00X', name: 'Щит смерти (свиток)', icon: '📜', type: 'recipe', cost: 6000 },
 I09P: { id: 'I09P', name: 'Огненный щит (свиток)', icon: '📜', type: 'recipe', cost: 11000 },
  I0CJ: { id: 'I0CJ', name: 'Кристальный щит (свиток)', icon: '📜', type: 'recipe', cost: 8000 },
 I0F7: { id: 'I0F7', name: 'Рыцарский щит (свиток)', icon: '📜', type: 'recipe', cost: 10400 },
  I0GV: { id: 'I0GV', name: 'Грозовой щит (свиток)', icon: '📜', type: 'recipe', cost: 8000 },
  I0D6: { id: 'I0D6', name: 'Рыцарский шлем (свиток)', icon: '📜', type: 'recipe', cost: 400 },
  I037: { id: 'I037', name: 'Шлем дракона (свиток)', icon: '📜', type: 'recipe', cost: 1600 },
  I03B: { id: 'I03B', name: 'Кираса дракона (свиток)', icon: '📜', type: 'recipe', cost: 8100 },
  I046: { id: 'I046', name: 'Доспехи дракона (свиток)', icon: '📜', type: 'recipe', cost: 25000 },
  I02A: { id: 'I02A', name: 'Доспехи полководца (свиток)', icon: '📜', type: 'recipe', cost: 10000 },
  I0GQ: { id: 'I0GQ', name: 'Шлем штормового рыцаря (свиток)', icon: '📜', type: 'recipe', cost: 4400 },
  I0DW: { id: 'I0DW', name: 'Доспех Шторма (свиток)', icon: '📜', type: 'recipe', cost: 9000 },
  I0GY: { id: 'I0GY', name: 'Доспехи штормового стража (свиток)', icon: '📜', type: 'recipe', cost: 45000 },


  // ---------- РУНЫ (скрыты из каталога) ----------
  I0DN: { id: 'I0DN', name: 'Сапоги воина (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сапоги воина', hidden: true, baseItem: 'I00N' },
  I0DO: { id: 'I0DO', name: 'Сапоги телепортации (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сапоги телепортации', hidden: true, baseItem: 'I00Q' },
  I05J: { id: 'I05J', name: 'Божественные сапоги (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Божественные сапоги', hidden: true, baseItem: 'I01C' },
  I07H: { id: 'I07H', name: 'Сапоги божественной ловкости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сапоги божественной ловкости', hidden: true, baseItem: 'I030' },
  I0GR: { id: 'I0GR', name: 'Сапоги громовой поступи (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сапоги громовой поступи', hidden: true, baseItem: 'I0GL' },
  I05C: { id: 'I05C', name: 'Ключ силы (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Ключ силы', hidden: true, baseItem: 'I00H' },
  I05A: { id: 'I05A', name: 'Ключ ловкости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Ключ ловкости', hidden: true, baseItem: 'I00I' },
  I05E: { id: 'I05E', name: 'Ключ разума (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Ключ разума', hidden: true, baseItem: 'I00E' },
  I085: { id: 'I085', name: 'Волшебные ключи (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Волшебные ключи', hidden: true, baseItem: 'I00K' },
  I0AN: { id: 'I0AN', name: 'Волшебное кольцо (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Волшебное кольцо', hidden: true, baseItem: 'I0AL' },
  I0CA: { id: 'I0CA', name: 'Лунный камень (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Лунный камень', hidden: true, baseItem: 'I0C8' },
  I0CB: { id: 'I0CB', name: 'Солнечный камень (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Солнечный камень', hidden: true, baseItem: 'I0C9' },
  I0CT: { id: 'I0CT', name: 'Посох колдуна (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох колдуна', hidden: true, baseItem: 'I0CP' },
  I083: { id: 'I083', name: 'Щит древних (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Щит древних', hidden: true, baseItem: 'I002' },
  I082: { id: 'I082', name: 'Щит смерти (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Щит смерти', hidden: true, baseItem: 'I00S' },
  I09Q: { id: 'I09Q', name: 'Огненный щит (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Огненный щит', hidden: true, baseItem: 'I03G' },
  I0CI: { id: 'I0CI', name: 'Кристальный щит (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кристальный щит', hidden: true, baseItem: 'I0BJ' },
  I0F5: { id: 'I0F5', name: 'Рыцарский щит (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Рыцарский щит', hidden: true, baseItem: 'I09T' },
  I0GU: { id: 'I0GU', name: 'Грозовой щит (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Грозовой щит', hidden: true, baseItem: 'I0GM' },
  I0CZ: { id: 'I0CZ', name: 'Рыцарский шлем (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Рыцарский шлем', hidden: true, baseItem: 'I0D0' },
  I081: { id: 'I081', name: 'Шлем из кожи дракона (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Шлем из кожи дракона', hidden: true, baseItem: 'I036' },
  I075: { id: 'I075', name: 'Кираса из кожи дракона (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кираса из кожи дракона', hidden: true, baseItem: 'I02Y' },
  I06T: { id: 'I06T', name: 'Доспехи дракона (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Доспехи дракона', hidden: true, baseItem: 'I045' },
  I06S: { id: 'I06S', name: 'Доспехи полководца (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Доспехи полководца', hidden: true, baseItem: 'I02B' },
  I0AH: { id: 'I0AH', name: 'Антимагические доспехи (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Антимагические доспехи', hidden: true, baseItem: 'I0AF' },
  I0GP: { id: 'I0GP', name: 'Шлем штормового рыцаря (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Шлем штормового рыцаря', hidden: true, baseItem: 'I0GN' },
  I0DV: { id: 'I0DV', name: 'Кираса шторма (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кираса шторма', hidden: true, baseItem: 'I0DU' },
  I0GX: { id: 'I0GX', name: 'Доспехи штормового стража (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Доспехи штормового стража', hidden: true, baseItem: 'I0GO' },
  I07U: { id: 'I07U', name: 'Призрачный клинок I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Призрачный клинок I', hidden: true, baseItem: 'I034' },
  I07V: { id: 'I07V', name: 'Проклятые когти (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Проклятые когти', hidden: true, baseItem: 'I01P' },
  I07N: { id: 'I07N', name: 'Меч чёрной магии (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Меч чёрной магии', hidden: true, baseItem: 'I03J' },
  I076: { id: 'I076', name: 'Клеймор (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Клеймор', hidden: true, baseItem: 'I0GJ' },
  I07P: { id: 'I07P', name: 'Огненный меч (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Огненный меч', hidden: true, baseItem: 'I00Y' },
  I07L: { id: 'I07L', name: 'Меч ярости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Меч ярости', hidden: true, baseItem: 'I033' },
  I0C7: { id: 'I0C7', name: 'Светлый меч (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Светлый меч', hidden: true, baseItem: 'I0AO' },
  I0E6: { id: 'I0E6', name: 'Меч очищения (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Меч очищения', hidden: true, baseItem: 'I0E5' },
  I0CG: { id: 'I0CG', name: 'Жнец душ (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Жнец душ', hidden: true, baseItem: 'I0C4' },
  I0E8: { id: 'I0E8', name: 'Жнец душ (выкл) (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Жнеца душ (выключенное состояние)', hidden: true, baseItem: 'I0C4' },
  I0CV: { id: 'I0CV', name: 'Проклятый череп (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Проклятый череп', hidden: true, baseItem: 'I0CM' },
  I07W: { id: 'I07W', name: 'Рука тьмы (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Рука тьмы', hidden: true, baseItem: 'I02N' },
  I0ER: { id: 'I0ER', name: 'Лук тьмы (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Лук тьмы', hidden: true, baseItem: 'I0EP' },
  I0FU: { id: 'I0FU', name: 'Клинок солнца (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Клинок солнца', hidden: true, baseItem: 'I0FO' },
  I0FV: { id: 'I0FV', name: 'Клинок луны (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Клинок луны', hidden: true, baseItem: 'I0FP' },
  I0FW: { id: 'I0FW', name: 'Скрещенные клинки (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Скрещенные клинки', hidden: true, baseItem: 'I0FQ' },
  I079: { id: 'I079', name: 'Копьё молний I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Копьё молний I', hidden: true, baseItem: 'I01Q' },
  I0A3: { id: 'I0A3', name: 'Копьё молний II (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Копьё молний II', hidden: true, baseItem: 'I01W' },
  I07S: { id: 'I07S', name: 'Посох молний (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох молний', hidden: true, baseItem: 'I03R' },
  I0AB: { id: 'I0AB', name: 'Посох грома (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох грома', hidden: true, baseItem: 'I08Y' },
  I07F: { id: 'I07F', name: 'Ледяной меч I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Ледяной меч I', hidden: true, baseItem: 'I02T' },
  I07E: { id: 'I07E', name: 'Ледяное око (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Ледяное око', hidden: true, baseItem: 'I02Z' },
  I07G: { id: 'I07G', name: 'Ледяные доспехи (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Ледяные доспехи', hidden: true, baseItem: 'I01I' },
  I09W: { id: 'I09W', name: 'Ледяной дух (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Ледяной дух', hidden: true, baseItem: 'I09R' },
  I07Z: { id: 'I07Z', name: 'Шлем ярости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Шлем ярости', hidden: true, baseItem: 'I00P' },
  I080: { id: 'I080', name: 'Шлем демона (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Шлем демона', hidden: true, baseItem: 'I014' },
  I07J: { id: 'I07J', name: 'Маска демона (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Маска демона', hidden: true, baseItem: 'I04H' },
  I0BM: { id: 'I0BM', name: 'Адская маска (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Адская маска', hidden: true, baseItem: 'I0GI' },
  I06Y: { id: 'I06Y', name: 'Амулет отрицания (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Амулет отрицания', hidden: true, baseItem: 'I01X' },
  I06Q: { id: 'I06Q', name: 'Амулет плоти (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Амулет плоти', hidden: true, baseItem: 'I01Y' },
  I06W: { id: 'I06W', name: 'Сердце демона (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сердце демона', hidden: true, baseItem: 'I026' },
  I06X: { id: 'I06X', name: 'Сердце демона II (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сердце демона II', hidden: true, baseItem: 'I043' },
  I0BW: { id: 'I0BW', name: 'Демоническая сущность (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Демоническая сущность', hidden: true, baseItem: 'I0BV' },
  I072: { id: 'I072', name: 'Золотая медаль (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Золотая медаль', hidden: true, baseItem: 'I03C' },
  I0DX: { id: 'I0DX', name: 'Крест (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Крест', hidden: true, baseItem: 'I0DT' },
  I0E1: { id: 'I0E1', name: 'Печать помощи I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Печать помощи I', hidden: true, baseItem: 'I0DQ' },
  I07R: { id: 'I07R', name: 'Посох ветров (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох ветров', hidden: true, baseItem: 'I04B' },
  I0EE: { id: 'I0EE', name: 'Кулон приспешника (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кулон приспешника', hidden: true, baseItem: 'I0EB' },
  I070: { id: 'I070', name: 'Жезл боли I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Жезл боли I', hidden: true, baseItem: 'I04L' },
  I07O: { id: 'I07O', name: 'Огненная перчатка I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Огненная перчатка I', hidden: true, baseItem: 'I054' },
  I0CW: { id: 'I0CW', name: 'Сфера магии (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера магии', hidden: true, baseItem: 'I0CN' },
  I0D9: { id: 'I0D9', name: 'Посох подавления (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох подавления', hidden: true, baseItem: 'I0D1' },
  I07M: { id: 'I07M', name: 'Огромный топор (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Огромный топор', hidden: true, baseItem: 'I011' },
  I06R: { id: 'I06R', name: 'Громовой молот (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Громовой молот', hidden: true, baseItem: 'I00M' },
  I07A: { id: 'I07A', name: 'Кровавая луна I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кровавая луна I', hidden: true, baseItem: 'I03X' },
  I07B: { id: 'I07B', name: 'Кровавая луна II (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кровавая луна II', hidden: true, baseItem: 'I01A' },
  I07T: { id: 'I07T', name: 'Посох разложения I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох разложения I', hidden: true, baseItem: 'I028' },
  I07D: { id: 'I07D', name: 'Кровопускатель (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кровопускатель', hidden: true, baseItem: 'I04O' },
  I0AD: { id: 'I0AD', name: 'Коса смерти (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Коса смерти', hidden: true, baseItem: 'I0AC' },
  I0DC: { id: 'I0DC', name: 'Алебарда (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Алебарда', hidden: true, baseItem: 'I0DA' },
  I0A0: { id: 'I0A0', name: 'Клинок ведьмака I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Клинок ведьмака I', hidden: true, baseItem: 'I08V' },
  I0A1: { id: 'I0A1', name: 'Клинок ведьмака II (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Клинок ведьмака II', hidden: true, baseItem: 'I08W' },
  I0A2: { id: 'I0A2', name: 'Клинок ведьмака III (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Клинок ведьмака III', hidden: true, baseItem: 'I08X' },
  I0AK: { id: 'I0AK', name: 'Посох разрушения (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох разрушения', hidden: true, baseItem: 'I0AI' },
  I06Z: { id: 'I06Z', name: 'Жезл исцеления (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Жезл исцеления', hidden: true, baseItem: 'I00R' },
  I0B9: { id: 'I0B9', name: 'Посох восстановления (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох восстановления', hidden: true, baseItem: 'I00W' },
  I07Q: { id: 'I07Q', name: 'Посох света (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох света', hidden: true, baseItem: 'I03V' },
  I0DZ: { id: 'I0DZ', name: 'Скипетр Владыки I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Скипетр Владыки I', hidden: true, baseItem: 'I0DB' },
  I0EV: { id: 'I0EV', name: 'Скипетр Владыки II (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Скипетр Владыки II', hidden: true, baseItem: 'I0EY' },
  I06V: { id: 'I06V', name: 'Древний посох (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Древний посох', hidden: true, baseItem: 'I04E' },
  I06U: { id: 'I06U', name: 'Древний мистический (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Древний мистический', hidden: true, baseItem: 'I04K' },
  I078: { id: 'I078', name: 'Когти шамана (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Когти шамана', hidden: true, baseItem: 'I03N' },
  I071: { id: 'I071', name: 'Жезл стремительности (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Жезл стремительности', hidden: true, baseItem: 'I023' },
  I074: { id: 'I074', name: 'Кинжал призрака (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кинжал призрака', hidden: true, baseItem: 'I03T' },
  I073: { id: 'I073', name: 'Золотой меч (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Золотой меч', hidden: true, baseItem: 'I02X' },
  I077: { id: 'I077', name: 'Клинок убийцы (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Клинок убийцы', hidden: true, baseItem: 'I01B' },
  I07C: { id: 'I07C', name: 'Кровавый клинок (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кровавый клинок', hidden: true, baseItem: 'I03Z' },
  I0EK: { id: 'I0EK', name: 'Нефритовый клинок (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Нефритовый клинок', hidden: true, baseItem: 'I0EL' },
  I0EQ: { id: 'I0EQ', name: 'Нефритовые клинки (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Нефритовые клинки', hidden: true, baseItem: 'I0EO' },
  I07I: { id: 'I07I', name: 'Лук (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Лук', hidden: true, baseItem: 'I013' },
  I07Y: { id: 'I07Y', name: 'Чёрная стрела I (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Чёрная стрела I', hidden: true, baseItem: 'I01V' },
  I0B2: { id: 'I0B2', name: 'Звёздный лук (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Звёздный лук', hidden: true, baseItem: 'I0B1' },
  I0EC: { id: 'I0EC', name: 'Лук вихрей (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Лук вихрей', hidden: true, baseItem: 'I0FH' },
  I0BC: { id: 'I0BC', name: 'Меч падшего (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Меч падшего', hidden: true, baseItem: 'I0BA' },
  I07K: { id: 'I07K', name: 'Меч тьмы (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Меч тьмы', hidden: true, baseItem: 'I04G' },
  I06O: { id: 'I06O', name: 'Ледяной элемент (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Ледяной элемент', hidden: true, baseItem: 'I01J' },
  I07X: { id: 'I07X', name: 'Меч вечной стужи (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Меч вечной стужи', hidden: true, baseItem: 'I03L' },
  I06P: { id: 'I06P', name: 'Щит джаггернаута (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Щит джаггернаута', hidden: true, baseItem: 'I02D' },
  I0A7: { id: 'I0A7', name: 'Нерубский доспех (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Нерубский доспех', hidden: true, baseItem: 'I0A5' },
  I0C0: { id: 'I0C0', name: 'Сфера мистицизма (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера мистицизма', hidden: true, baseItem: 'I0BD' },
  I0C1: { id: 'I0C1', name: 'Щит джаггернаута II (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Щит джаггернаута II', hidden: true, baseItem: 'I0B6' },
  I0C2: { id: 'I0C2', name: 'Защита ада (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Защита ада', hidden: true, baseItem: 'I0B4' },
  I069: { id: 'I069', name: 'Медаль храбрости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Медаль храбрости', hidden: true, baseItem: 'I01O' },
  I065: { id: 'I065', name: 'Золотой ключ (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Золотой ключ', hidden: true, baseItem: 'I000' },
  I05L: { id: 'I05L', name: 'Посох мудрости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Посох мудрости', hidden: true, baseItem: 'mnsf' },
  I06E: { id: 'I06E', name: 'Плащ (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Плащ', hidden: true, baseItem: 'I01G' },
  I05X: { id: 'I05X', name: 'Флейта (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Флейта', hidden: true, baseItem: 'I001' },
  I05N: { id: 'I05N', name: 'Амулет маны (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Амулет маны', hidden: true, baseItem: 'pmna' },
  I05S: { id: 'I05S', name: 'Огненный плащ (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Огненный плащ', hidden: true, baseItem: 'clfm' },
  I05H: { id: 'I05H', name: 'Кинжал мага (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кинжал мага', hidden: true, baseItem: 'desc' },
  I05I: { id: 'I05I', name: 'Чаша выносливости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Чаша выносливости', hidden: true, baseItem: 'ajen' },
  I05V: { id: 'I05V', name: 'Талисман защиты (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Талисман защиты', hidden: true, baseItem: 'evtl' },
  I06D: { id: 'I06D', name: 'Перчатка ловкости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Перчатка ловкости', hidden: true, baseItem: 'I010' },
  I06C: { id: 'I06C', name: 'Перчатка зверя (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Перчатка зверя', hidden: true, baseItem: 'I015' },
  I05F: { id: 'I05F', name: 'Сапог (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сапог', hidden: true, baseItem: 'bspd' },
  I05G: { id: 'I05G', name: 'Перчатка скорости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Перчатка скорости', hidden: true, baseItem: 'gcel' },
  I05R: { id: 'I05R', name: 'Маска соби (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Маска соби', hidden: true, baseItem: 'rwiz' },
  I05T: { id: 'I05T', name: 'Рог ветров (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Рог ветров', hidden: true, baseItem: 'lhst' },
  I05B: { id: 'I05B', name: 'Рукавица огра (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Рукавица огра', hidden: true, baseItem: 'rst1' },
  I05D: { id: 'I05D', name: 'Мантия учёного (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Мантия учёного', hidden: true, baseItem: 'rin1' },
  I059: { id: 'I059', name: 'Туфли ловкости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Туфли ловкости', hidden: true, baseItem: 'rag1' },
  I058: { id: 'I058', name: 'Венец благородства (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Венец благородства', hidden: true, baseItem: 'cnob' },
  I05O: { id: 'I05O', name: 'Камень жизни (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Камень жизни', hidden: true, baseItem: 'rhth' },
  I05P: { id: 'I05P', name: 'Кольцо защиты (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кольцо защиты', hidden: true, baseItem: 'rde2' },
  I05Q: { id: 'I05Q', name: 'Кольцо регенерации (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кольцо регенерации', hidden: true, baseItem: 'rlif' },
  I05Y: { id: 'I05Y', name: 'Кольцо превосходства (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Кольцо превосходства', hidden: true, baseItem: 'rnsp' },
  I061: { id: 'I061', name: 'Сфера огня (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера огня', hidden: true, baseItem: 'ofir' },
  I05M: { id: 'I05M', name: 'Сфера льда (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера льда', hidden: true, baseItem: 'ofro' },
  I060: { id: 'I060', name: 'Сфера молний (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера молний', hidden: true, baseItem: 'oli2' },
  I062: { id: 'I062', name: 'Сфера проклятья (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера проклятья', hidden: true, baseItem: 'ocor' },
  I05U: { id: 'I05U', name: 'Сфера тьмы (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера тьмы', hidden: true, baseItem: 'odef' },
  I05Z: { id: 'I05Z', name: 'Сфера замедления (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера замедления', hidden: true, baseItem: 'oslo' },
  I063: { id: 'I063', name: 'Сфера яда (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера яда', hidden: true, baseItem: 'oven' },
  I0F4: { id: 'I0F4', name: 'Сфера света (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера света', hidden: true, baseItem: 'I0FC' },
  I0F2: { id: 'I0F2', name: 'Сфера отрицания (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера отрицания', hidden: true, baseItem: 'I0FB' },
  I0F1: { id: 'I0F1', name: 'Сфера плоти (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера плоти', hidden: true, baseItem: 'I0FA' },
  I0F8: { id: 'I0F8', name: 'Сфера меткости (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера меткости', hidden: true, baseItem: 'I0FE' },
  I0F9: { id: 'I0F9', name: 'Сфера мощи (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Сфера мощи', hidden: true, baseItem: 'I0FD' },
  I066: { id: 'I066', name: 'Когти (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Когти', hidden: true, baseItem: 'I004' },
  I06A: { id: 'I06A', name: 'Меч (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Меч', hidden: true, baseItem: 'I007' },
  I06B: { id: 'I06B', name: 'Молот (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Молот', hidden: true, baseItem: 'I005' },
  I06G: { id: 'I06G', name: 'Топор (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Топор', hidden: true, baseItem: 'I006' },
  I06H: { id: 'I06H', name: 'Трезубец (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Трезубец', hidden: true, baseItem: 'I008' },
  I067: { id: 'I067', name: 'Копьё (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Копьё', hidden: true, baseItem: 'I009' },
  I06J: { id: 'I06J', name: 'Щит (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Щит', hidden: true, baseItem: 'I00A' },
  I06I: { id: 'I06I', name: 'Шлем (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Шлем', hidden: true, baseItem: 'I00D' },
  I064: { id: 'I064', name: 'Броня (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Броня', hidden: true, baseItem: 'I00C' },
  I05K: { id: 'I05K', name: 'Маска смерти (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Маска смерти', hidden: true, baseItem: 'modt' },
  I06F: { id: 'I06F', name: 'Реликвия (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Реликвия', hidden: true, baseItem: 'I03I' },
  I0CR: { id: 'I0CR', name: 'Меч доблести (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Меч доблести', hidden: true, baseItem: 'I0CQ' },
  I06K: { id: 'I06K', name: 'Волшебный алмаз (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Волшебный алмаз', hidden: true, baseItem: 'I02E' },
  I06L: { id: 'I06L', name: 'Доспехи великана (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Доспехи великана', hidden: true, baseItem: 'I01L' },
  I0CY: { id: 'I0CY', name: 'Душа призрака (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Душа призрака', hidden: true, baseItem: 'I0B5' },
  I06N: { id: 'I06N', name: 'Рапира (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Рапира', hidden: true, baseItem: 'I047' },
  I06M: { id: 'I06M', name: 'Когти вурдалака (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Когти вурдалака', hidden: true, baseItem: 'I01N' },
  I0DM: { id: 'I0DM', name: 'Панцирь рака (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Панцирь рака', hidden: true, baseItem: 'I0CK' },
  I0G5: { id: 'I0G5', name: 'Голова синего танатоса (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Голова синего танатоса', hidden: true, baseItem: 'I0G4' },
  I0G6: { id: 'I0G6', name: 'Голова зелёного танатоса (руна)', icon: '📜', type: 'rune', cost: 0, description: 'Руна для Голова зелёного танатоса', hidden: true, baseItem: 'I0G3' },

  // Универсальный рецепт
  recipe: { id: 'recipe', name: 'Свиток рецепта', icon: '📜', type: 'recipe', cost: 0, description: 'Используется для сборки.' },
};

// ========== БОСС-ДРОПЫ: какой босс какой предмет роняет ==========
const BOSS_DROPS = {
  I01N: { code: 'u008', name: 'Вурдалак' },
  I01L: { code: 'e00B', name: 'Великан' },
  I0CK: { code: 'u00Z', name: 'Рак' },
  I02E: { code: 'n012', name: 'Пустынник высший' },
  I0B5: { code: 'n00L', name: 'Низший пустынник' },
  I047: { code: 'u00J', name: 'Ледяной голем' },
  I0G4: { code: 'n01M', name: 'Синий Танатос' },
  I0G3: { code: 'n01N', name: 'Зелёный Танатос' },
};

// ========== РАСПРЕДЕЛЕНИЕ ПО ЛАВКАМ ==========
const grids = {
  'grid-armory': ['I004','I007','I005','I006','I008','I009','I00A','I00D','I00C','modt','I03I','I0CQ'],
  'grid-elements': ['ofir','ofro','oli2','ocor','odef','oslo','oven','I0FC','I0FB','I0FA','I0FE','I0FD'],
  'grid-equip': ['bspd','gcel','rwiz','lhst','rst1','rag1','rin1','cnob','rhth','rde2','rlif','rnsp'],
  'grid-boots': ['I00N','I00Q','I01C','I030','I0GL'],
  'grid-jewels': ['I00H','I00I','I00E','I00K','I0AL','I0C8','I0C9','I0CP'],
  'grid-armor': ['I0D0','I036','I02Y','I045','I02B','I0AF','I0GN','I0DU','I0GO'],
  'grid-shields': ['I002','I00S','I03G','I0BJ','I09T','I0GM'],
  'grid-weapon': ['I034','I035','I01P','I03J','I0GJ','I00Y','I033','I0AO','I0E5'],
  'grid-weapon2': ['I0C4','I0CM','I02N','I0EP','I0FO','I0FP','I0FQ'],
  'grid-magic_art': ['I01Q','I01W','I03R','I08Y','I02T','I00U','I02U','I03E','I03F','I02Z','I01I','I09R'],
  'grid-magic_equip': ['I00P','I014','I04H','I0GI','I01X','I01Y','I026','I043','I0BV','I03C'],
  'grid-situational': ['I0DT','I0DQ','I0DR','I0DS','I04B','I0EB','I04L','I0BG','I0BH','I0CN','I0D1','I054','I0BE','I0BF'],
  'grid-str_element': ['I011','I00M','I03X','I01A','I028','I08U','I04O','I0AC','I0DA'],
  'grid-int_element': ['I08V','I08W','I08X','I0AI','I00R','I00W','I03V','I0DB','I0EY','I04E','I04K'],
  'grid-agi_element': ['I03N','I023','I03T','I02X','I01B','I03Z','I0EL','I0EO'],
  'grid-agi_element2': ['I013','I01V','I03P','I03Q','I0B1','I0FH'],
  'grid-dark_telec': ['I0BA','I04G','I01J','I03L','I02D','I0A5','I0BD','I0B6','I0B4'],
  'grid-overseas': ['I01O','I000','mnsf','I01G','I001','pmna','clfm','desc','ajen','evtl','I010','I015'],
  'grid-boss': ['I02E','I01L','I0B5','I047','I01N','I0CK','I0G4','I0G3'],
  'grid-boost': ['I04P','I04Q','I04R','I04U','I04S','I04T','I056','I04W','I057','I02V','I04Y','I04V','I050','I0BP','I04X','I02W','I053','I0BO']
};

// ========== ИКОНКИ ПРЕДМЕТОВ (img с фоллбэком PNG→JPG→SVG) ==========
const ITEM_ICONS_DIR = 'images/items/';

function itemIcon(id, emoji, size, type) {
  size = size || 64;
  // Специальный случай для рецепта в сборках
  if (id === 'recipe') {
    return '<img src="' + ITEM_ICONS_DIR + 'UniveralRecipe.png" alt="" aria-hidden="true" width="' + size + '" height="' + size + '" style="image-rendering:pixelated;object-fit:contain;">';
  }
  // Свитки-рецепты показываем отдельной базовой иконкой recipe.png
  if (type === 'recipe') {
    return '<img src="' + ITEM_ICONS_DIR + 'recipe.png" alt="" aria-hidden="true" width="' + size + '" height="' + size + '" style="image-rendering:pixelated;object-fit:contain;">';
  }
  const pngSrc = ITEM_ICONS_DIR + id + '.png';
  const jpgSrc = ITEM_ICONS_DIR + id + '.jpg';
  const fallbackSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 64 64"><g fill="none" stroke="#8ab4f0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 22h24l6 10-18 20-18-20 6-10z"/><path d="M26 22l6 10 6-10"/></g></svg>';
  const fallbackDataUri = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(fallbackSvg);
  return '<img src="' + pngSrc + '" alt="" aria-hidden="true" width="' + size + '" height="' + size + '" style="image-rendering:pixelated;object-fit:contain;" onerror="if(this.src.endsWith(\'.png\')){this.src=\'' + jpgSrc + '\';}else{this.src=\'' + fallbackDataUri + '\';}">';
}

const ITEM_FAVORITES_KEY = 'itemFavorites';
let itemFavorites = JSON.parse(localStorage.getItem(ITEM_FAVORITES_KEY) || '[]');
let activeItemView = 'all';
let itemSearchQuery = '';
let itemFavoritesTab = null;

function saveItemFavorites() {
  localStorage.setItem(ITEM_FAVORITES_KEY, JSON.stringify(itemFavorites));
}

function isItemFavorite(itemId) {
  return itemFavorites.includes(itemId);
}

function toggleItemFavorite(itemId) {
  if (itemFavorites.includes(itemId)) {
    itemFavorites = itemFavorites.filter(id => id !== itemId);
  } else {
    itemFavorites.push(itemId);
  }
  saveItemFavorites();
  applyItemView();
  updateItemFavoritesTab();
}

function updateFavoriteButtonElement(button, itemId) {
  const favorite = isItemFavorite(itemId);
  button.innerHTML = '<i class="' + (favorite ? 'fas' : 'far') + ' fa-heart"></i>';
  button.title = favorite ? 'Убрать из избранного' : 'В избранное';
  button.setAttribute('aria-label', button.title);
  button.setAttribute('aria-pressed', favorite ? 'true' : 'false');
  button.classList.toggle('is-favorite', favorite);
}

function buildDetailFavoriteButton(itemId) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'item-fav-btn item-detail-fav-btn';
  updateFavoriteButtonElement(button, itemId);
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleItemFavorite(itemId);
  });
  return button;
}

function getItemSearchText(item) {
  return [item.name, item.description, item.type, item.icon, item.activeAbility?.name, item.activeAbility?.description]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function injectItemFavoritesStyles() {
  if (document.getElementById('item-favorites-style')) return;
  const style = document.createElement('style');
  style.id = 'item-favorites-style';
  style.textContent = `
    .item-card { position: relative; }
    .item-fav-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #2a4060;
      background: #0f172acc;
      color: #6b7c99;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      transition: 0.15s ease;
      z-index: 2;
    }
    .item-fav-btn .fas { color: #ff5555; }
    .item-fav-btn:hover {
      background: #ff555533;
      border-color: #ff5555;
    }
    .item-card.is-favorite {
      box-shadow: 0 0 20px #ff555533, 0 0 0 1px #ff555533 inset;
    }
    .item-card.is-favorite .item-name {
      text-shadow: 0 0 8px #ff5555aa;
    }
    .item-detail-title {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .item-detail-title-main {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .item-detail-fav-btn {
      position: static;
      width: 36px;
      height: 36px;
      flex: 0 0 auto;
      margin-left: auto;
    }
    .item-tab-count {
      margin-left: 6px;
      color: #ff9fb0;
      font-size: 0.9em;
    }
  `;
  document.head.appendChild(style);
}

function updateItemFavoritesTab() {
  if (!itemFavoritesTab) return;
  const count = itemFavorites.length;
  itemFavoritesTab.innerHTML = count
    ? '<i class="fas fa-heart"></i> Избранное <span class="item-tab-count">' + count + '</span>'
    : '<i class="fas fa-heart"></i> Избранное';
}

function buildItemFavoriteButton(itemId) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'item-fav-btn';
  updateFavoriteButtonElement(button, itemId);
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleItemFavorite(itemId);
  });
  return button;
}

function ensureItemFavoritesTab() {
  const tabsWrap = document.querySelector('.category-tabs');
  if (!tabsWrap || tabsWrap.querySelector('[data-cat="favorites"]')) return;
  const button = document.createElement('button');
  button.className = 'tab-btn';
  button.dataset.cat = 'favorites';
  button.innerHTML = '<i class="fas fa-heart"></i> Избранное';
  tabsWrap.insertBefore(button, tabsWrap.children[1] || null);
  itemFavoritesTab = button;
}

function applyItemView() {
  const query = itemSearchQuery;
  const favoritesMode = activeItemView === 'favorites';

  document.querySelectorAll('.category-section').forEach(function(section) {
    const sectionKey = section.id.replace('cat-', '');
    const sectionMatchesView = activeItemView === 'all' || activeItemView === 'favorites' || sectionKey === activeItemView;
    let sectionHasVisible = false;

    section.querySelectorAll('.item-card').forEach(function(card) {
      const itemId = card.dataset.itemId;
      const item = itemsDB[itemId];
      if (!item) return;

      const matchesSearch = !query || getItemSearchText(item).includes(query);
      const matchesFavorite = !favoritesMode || isItemFavorite(itemId);
      const notHidden = !item.hidden && item.type !== 'rune';
      const visible = sectionMatchesView && matchesSearch && matchesFavorite && notHidden;

      card.style.display = visible ? '' : 'none';
      card.classList.toggle('is-favorite', isItemFavorite(itemId));

      const favBtn = card.querySelector('.item-fav-btn');
      if (favBtn) {
        const favorite = isItemFavorite(itemId);
        favBtn.innerHTML = '<i class="' + (favorite ? 'fas' : 'far') + ' fa-heart"></i>';
        favBtn.title = favorite ? 'Убрать из избранного' : 'В избранное';
        favBtn.setAttribute('aria-label', favBtn.title);
        favBtn.setAttribute('aria-pressed', favorite ? 'true' : 'false');
      }

      if (visible) {
        sectionHasVisible = true;
      }
    });

    if (activeItemView === 'all') {
      section.style.display = sectionHasVisible || !query ? '' : 'none';
    } else if (favoritesMode) {
      section.style.display = sectionHasVisible ? '' : 'none';
    } else {
      section.style.display = sectionMatchesView && sectionHasVisible ? '' : 'none';
    }
  });

  updateItemFavoritesTab();
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (без изменений) ==========
function findUsedIn(itemId) {
  const used = [];
  for (const id in itemsDB) {
    const item = itemsDB[id];
    if (item.components?.some(c => c.itemId === itemId)) used.push(id);
  }
  return used;
}

// Совместимый доступ к сборке героя: переживает и старый массив, и новый объект
function getHeroBuildItems(heroId) {
  if (typeof heroBuilds === 'undefined' || !heroBuilds) return [];
  const hero = heroBuilds[heroId];
  if (!hero) return [];
  if (Array.isArray(hero)) return hero;
  if (Array.isArray(hero.items)) return hero.items;
  console.warn('[items-db] Unexpected hero build shape for', heroId, hero);
  return [];
}

// Какие герои рекомендуют этот предмет
function findHeroesWithItem(itemId) {
  if (typeof heroBuilds === 'undefined') return [];
  const result = [];
  const HERO_NAMES = {
    paladin: 'Паладин',
    admiral: 'Адмирал',
    druid: 'Друид',
  };
  for (const heroId in heroBuilds) {
    const hero = heroBuilds[heroId];
    const items = getHeroBuildItems(heroId);
    if (items.some(b => b.id === itemId)) {
      result.push({ id: heroId, name: HERO_NAMES[heroId] || hero?.name || heroId });
    }
  }
  return result;
}

// Рендер: выпадает из босса
function renderBossDrop(itemId) {
  const boss = BOSS_DROPS[itemId];
  if (!boss) return '';
  return `<a href="monsters.html?boss=${boss.code}" class="boss-drop-link"><i class="fas fa-skull"></i> ${boss.name}</a>`;
}

// Рендер: рекомендуется героям (принимает готовый список)
function renderHeroRecommendationsFromList(heroes) {
  if (!heroes.length) return '';
  return `<div class="hero-reco-list">${heroes.map(h =>
    `<a href="heroes/${h.id}.html" class="hero-reco-chip"><img src="images/heroes/${h.id}.png" alt="" width="20" height="20" style="image-rendering:pixelated;border-radius:4px;object-fit:contain;"> ${h.name}</a>`
  ).join('')}</div>`;
}

function calculateItemCost(itemId, visited = new Set()) {
  if (visited.has(itemId)) return 0;
  visited.add(itemId);
  const item = itemsDB[itemId];
  if (!item) return 0;
  if (item.cost !== undefined && (!item.components || item.components.length === 0)) return item.cost;
  if (!item.components) return 0;
  return item.components.reduce((sum, comp) => {
    if (comp.costOverride !== undefined) return sum + comp.costOverride;
    const compItem = itemsDB[comp.itemId];
    if (!compItem) return sum;
    return sum + calculateItemCost(comp.itemId, new Set(visited)) * (comp.quantity || 1);
  }, 0);
}

function getRecipeCost(item) {
  if (!item.components) return 0;
  return item.components.reduce((sum, comp) => {
    const c = itemsDB[comp.itemId];
    if (c?.type === 'recipe') return sum + (comp.costOverride ?? c.cost);
    return sum;
  }, 0);
}

function renderComponentTree(components, visited = new Set()) {
  if (!components?.length) return '<p style="color:#8e97aa;">Базовый предмет</p>';
  let html = '<div class="component-tree">';
  components.forEach(comp => {
    const item = itemsDB[comp.itemId];
    if (!item || visited.has(item.id)) return;
    const newVisited = new Set(visited); newVisited.add(item.id);
    const cost = calculateItemCost(item.id);
    const hasChildren = item.components?.length > 0;
    const qty = comp.quantity > 1 ? ` (x${comp.quantity})` : '';
    html += `<div class="tree-node">
      <div class="component-row">
        ${hasChildren ? `<button class="tree-toggle" data-collapsed="false" title="Свернуть/развернуть"><i class="fas fa-chevron-down"></i></button>` : '<span class="tree-toggle-spacer"></span>'}
        <div class="component-item" data-item-id="${item.id}">
          <div class="component-icon">${itemIcon(item.id, item.icon, 36, item.type)}</div>
          <span class="component-name">${item.name}${qty}</span>
          <span class="component-cost">${cost} 🪙</span>
        </div>
      </div>`;
    if (hasChildren) html += `<div class="children-tree">${renderComponentTree(item.components, newVisited)}</div>`;
    html += `</div>`;
  });
  html += '</div>';
  return html;
}

function renderUpgradeChain(item) {
  if (!item.upgradesTo?.length) return '';
  return `<div class="upgrade-chain">${item.upgradesTo.map(upId => {
    const up = itemsDB[upId];
    return up ? `<button class="upgrade-btn" data-upgrade-id="${upId}">⬆️ ${up.name}</button>` : '';
  }).join('')}</div>`;
}

function renderActiveAbility(ability) {
  if (!ability) return '';
  return `<div class="ability-box"><div class="ability-name">✨ ${ability.name}</div><div>${ability.description}</div>
    <div class="ability-params"><div class="param-row"><span class="param-label">Перезарядка</span><span class="param-values">${ability.cooldown} сек</span></div>${ability.manacost ? `<div class="param-row"><span class="param-label">Мана</span><span class="param-values">${ability.manacost}</span></div>` : ''}</div>
    ${ability.note ? `<div class="ability-note">⚠️ ${ability.note}</div>` : ''}</div>`;
}

function formatParsedBonusValue(value) {
  if (!value) return '';
  const normalized = Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '');
  return value > 0 ? `+${normalized}` : normalized;
}

function renderParsedBonuses(item) {
  if (!item || typeof ItemBonusParser === 'undefined') return '';
  const bonus = ItemBonusParser.parseDescription(item.description || '');
  const chips = [];
  const addChip = (label, value, suffix = '') => {
    if (!value) return;
    chips.push(`<span class="cost-badge">${label}: ${formatParsedBonusValue(value)}${suffix}</span>`);
  };

  addChip('Все атрибуты', bonus.allStats);
  addChip('Сила', bonus.strength);
  addChip('Ловкость', bonus.agility);
  addChip('Разум', bonus.intelligence);
  addChip('Жизни', bonus.hp);
  addChip('Мана', bonus.mana);
  addChip('Атака', bonus.attack);
  addChip('Броня', bonus.armor);
  addChip('Маг. защита', bonus.magicDefenseFlat);
  addChip('Маг. защита', bonus.magicDefensePct, '%');
  addChip('Реген HP', bonus.hpRegenFlat);
  addChip('Реген HP', bonus.hpRegenPct, '%');
  addChip('Реген маны', bonus.manaRegenFlat);
  addChip('Реген маны', bonus.manaRegenPct, '%');
  addChip('Мана при атаке', bonus.manaOnAttack);
  addChip('Уклонение', bonus.evasionPct, '%');
  addChip('Крит. шанс', bonus.critChancePct, '%');
  addChip('Крит. урон', bonus.critDamagePct, '%');
  addChip('Урон заклинаний', bonus.spellDamagePct, '%');
  addChip('Вампиризм', bonus.vampirismPct, '%');
  addChip('Маг. вампиризм', bonus.magicVampirismPct, '%');
  addChip('Маг. блок', bonus.magicBlockPct, '%');
  addChip('Стан-резист', bonus.stunResistPct, '%');
  addChip('Мана-бёрн резист', bonus.manaBurnResistPct, '%');
  addChip('Аура брони', bonus.auraArmor);
  addChip('Аура AS', bonus.auraAttackSpeedPct, '%');
  addChip('Аура MS', bonus.auraMoveSpeedPct, '%');
  addChip('Скорость атаки', bonus.attackSpeedPct, '%');
  addChip('Скорость бега', bonus.movementSpeedFlat);
  addChip('Скорость бега', bonus.movementSpeedPct, '%');

  if (!chips.length) return '';
  return `<div class="recipe-title">📈 Распознано из описания</div><div class="cost-badges">${chips.join('')}</div>`;
}

function renderUsedIn(itemId) {
  const ids = findUsedIn(itemId);
  if (!ids.length) return '<p style="color:#8e97aa;">Не используется</p>';
  return `<div class="used-in-list">${ids.map(id => {
    const it = itemsDB[id];
    return `<span class="used-in-chip" data-item-id="${id}">${itemIcon(it.id, it.icon, 20, it.type)} ${it.name}</span>`;
  }).join('')}</div>`;
}

const ITEM_TYPE_TAGS = {
  basic: ['🔹 Базовый'],
  strength: ['💪 Сила'],
  agility: ['🏃 Ловкость'],
  intelligence: ['🧠 Разум'],
  neutral: ['🌀 Нейтральный'],
  boost: ['📈 Усиление'],
  weapon: ['⚔️ Оружие'],
  recipe: ['📄 Рецепт'],
  vampirism: ['🧛 Физ. вампиризм'],
  magic_vampirism: ['🔮 Маг. вампиризм'],
  magic_block: ['🛡️ Маг. блок'],
  magic_vampirism_block: ['🔮 Маг. вампиризм', '🛡️ Маг. блок'],
  magic_immune: ['🛡️🚫 Иммунитет к магии'],
  boss_drop: ['💀 Выпадает при смерти'],
  control: ['🎯 Контроль'],
  intelligence_control: ['🧠 Разум', '🎯 Контроль'],
  strength_control: ['💪 Сила', '🎯 Контроль'],
  weapon_strength: ['⚔️ Оружие', '💪 Сила'],
  weapon_intelligence: ['⚔️ Оружие', '🧠 Разум'],
  armor: ['🛡️ Доспех'],
  strength_armor: ['💪 Сила', '🛡️ Доспех'],
  basic_shield: ['🔹 Базовый', '🛡️ Щит'],
  shield: ['🛡️ Щит'],
  rare: ['💎 Редкий'],
  boss: ['💀 Босс']
};

function renderItemTypeBadges(item) {
  const labels = [ ...(ITEM_TYPE_TAGS[item.type] || []), ...((item.tags || []).flatMap(tag => ITEM_TYPE_TAGS[tag] || [])) ];
  const uniqueLabels = [...new Set(labels)];
  if (!uniqueLabels.length) return '';
  return '<div class="detail-badges">' + uniqueLabels.map(label => '<span class="detail-badge' + (item.type === 'boss_drop' ? ' badge-danger' : '') + '">' + label + '</span>').join('') + '</div>';
}

function isItemMobileSurface() {
  return window.matchMedia && window.matchMedia('(max-width: 800px)').matches;
}

function closeItemSheet() {
  const overlay = document.getElementById('itemSheetOverlay');
  const sheet = document.getElementById('itemBottomSheet');
  if (overlay) overlay.classList.remove('visible');
  if (sheet) {
    sheet.classList.remove('visible');
    sheet.setAttribute('aria-hidden', 'true');
  }
  document.body.classList.remove('item-sheet-open');
}

function buildItemDetailHtml(itemId, item, total, recipe, base, includeBackButton) {
  return `
    <div class="panel-header"><div class="detail-icon">${itemIcon(item.id, item.icon, 96, item.type)}</div><div class="detail-title item-detail-title"><div class="item-detail-title-main"><span class="item-detail-name">${item.name}</span>${renderItemTypeBadges(item)}</div></div></div>
    <div class="detail-description">${item.description||''}<br>
      <div class="cost-badges">
        ${item.cost > 0 ? `<span class="cost-badge">💰 Золото: ${item.cost}</span>` : ''}
        ${item.costCrystals ? `<span class="cost-badge cost-crystals">💎 Кристаллы: ${item.costCrystals}</span>` : ''}
        ${item.costWood ? `<span class="cost-badge cost-wood">🪵 Дерево: ${item.costWood}</span>` : ''}
        ${!item.costCrystals && !item.costWood && item.cost === 0 && item.type === 'boost' ? `<span class="cost-badge cost-free">💰 Бесплатно</span>` : ''}
        ${item.cost > 0 || item.components ? `<span class="cost-badge cost-total">💰 Общая: ${total}</span>` : ''}
        ${base > 0 && item.cost > 0 ? `<span class="cost-badge cost-base">📦 Базовая: ${base}</span>` : ''}
        ${recipe>0?`<span class="cost-badge cost-recipe">📜 Рецепт: ${recipe}</span>`:''}
      </div>
    </div>
    ${renderParsedBonuses(item)}
    ${item.activeAbility ? renderActiveAbility(item.activeAbility) : ''}
    ${/* renderUpgradeChain(item) — отключено: дублирует «Входит в сборку», которое надёжнее */ ''}
    ${/* renderUpgradeChain(item) */ ''}
    <div class="recipe-title">📦 Компоненты</div>
    ${item.components ? renderComponentTree(item.components) : '<p>Нет компонентов</p>'}
    <div class="recipe-title">🔗 Входит в сборку</div>
    ${renderUsedIn(itemId)}
    ${BOSS_DROPS[itemId] ? `<div class="recipe-title">💀 Выпадает из</div>${renderBossDrop(itemId)}` : ''}
    ${(() => { const h = findHeroesWithItem(itemId); return h.length ? `<div class="recipe-title">🛡️ Рекомендуется героям</div>${renderHeroRecommendationsFromList(h)}` : ''; })()}
    ${includeBackButton ? '<div class="back-button" onclick="document.querySelector(\'#itemDetailPanel\').scrollIntoView({behavior:\'smooth\'});">↩️ Прокрутить</div>' : ''}
  `;
}

function bindItemDetailInteractions(root) {
  if (!root) return;
  root.querySelectorAll('.upgrade-btn').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); openItemDetail(b.dataset.upgradeId); }));
  root.querySelectorAll('.component-item').forEach(el => el.addEventListener('click', e => { e.stopPropagation(); const id = el.dataset.itemId; if (id) openItemDetail(id); }));
  root.querySelectorAll('.used-in-chip').forEach(c => c.addEventListener('click', e => { e.stopPropagation(); openItemDetail(c.dataset.itemId); }));
  root.querySelectorAll('.tree-toggle').forEach(btn => btn.addEventListener('click', e => {
    e.stopPropagation();
    const node = btn.closest('.tree-node');
    const children = node?.querySelector(':scope > .children-tree');
    if (!children) return;
    const collapsed = btn.dataset.collapsed === 'true';
    btn.dataset.collapsed = collapsed ? 'false' : 'true';
    children.style.display = collapsed ? 'block' : 'none';
    btn.querySelector('i').className = collapsed ? 'fas fa-chevron-down' : 'fas fa-chevron-right';
  }));
}

function showItemDetail(itemId) {
  const item = itemsDB[itemId];
  if (!item) return;
  closeItemSheet();
  const total = calculateItemCost(itemId);
  const recipe = getRecipeCost(item);
  const base = total - recipe;
  const panel = document.getElementById('detailContent');
  if (!panel) return;
  panel.innerHTML = buildItemDetailHtml(itemId, item, total, recipe, base, true);
  const detailTitle = panel.querySelector('.item-detail-title');
  if (detailTitle) {
    detailTitle.appendChild(buildDetailFavoriteButton(itemId));
  }
  bindItemDetailInteractions(panel);
}

function showItemSheet(itemId) {
  const item = itemsDB[itemId];
  if (!item) return;
  const overlay = document.getElementById('itemSheetOverlay');
  const sheet = document.getElementById('itemBottomSheet');
  const content = document.getElementById('itemSheetContent');
  if (!overlay || !sheet || !content) {
    showItemDetail(itemId);
    return;
  }
  const total = calculateItemCost(itemId);
  const recipe = getRecipeCost(item);
  const base = total - recipe;
  content.innerHTML = buildItemDetailHtml(itemId, item, total, recipe, base, false);
  const detailTitle = content.querySelector('.item-detail-title');
  if (detailTitle) {
    detailTitle.appendChild(buildDetailFavoriteButton(itemId));
  }
  bindItemDetailInteractions(content);
  document.body.classList.add('item-sheet-open');
  overlay.classList.add('visible');
  sheet.classList.add('visible');
  sheet.setAttribute('aria-hidden', 'false');
  sheet.scrollTop = 0;
}

function openItemDetail(itemId) {
  if (isItemMobileSurface()) {
    showItemSheet(itemId);
  } else {
    showItemDetail(itemId);
  }
}

const itemSheetOverlay = document.getElementById('itemSheetOverlay');
if (itemSheetOverlay) {
  itemSheetOverlay.addEventListener('click', closeItemSheet);
}
const itemSheetClose = document.getElementById('itemSheetClose');
if (itemSheetClose) {
  itemSheetClose.addEventListener('click', closeItemSheet);
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeItemSheet();
  }
});

function renderAllGrids() {
  for (const [gridId, ids] of Object.entries(grids)) {
    const grid = document.getElementById(gridId);
    if (!grid) continue;
    grid.innerHTML = '';
    ids.forEach(id => {
      const item = itemsDB[id];
      if (!item) return;
      const cost = item.cost || 0;
      const rarity = cost >= 30000 ? 'rarity-expensive' : cost < 3000 ? 'rarity-cheap' : 'rarity-mid';
      const card = document.createElement('div');
      card.className = `item-card ${item.type || ''} ${rarity}`;
      card.dataset.itemId = id;
      card.innerHTML = `<div class="item-icon">${itemIcon(item.id, item.icon, undefined, item.type)}</div><div class="item-name">${item.name}</div>`;
      card.appendChild(buildItemFavoriteButton(id));
      card.classList.toggle('is-favorite', isItemFavorite(id));
      card.addEventListener('click', e => { e.stopPropagation(); openItemDetail(id); });
      grid.appendChild(card);
    });
  }
}

injectItemFavoritesStyles();
ensureItemFavoritesTab();

// Инициализация вкладок
const tabs = document.querySelectorAll('.tab-btn');
tabs.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const cat = btn.dataset.cat;
    activeItemView = cat;
    tabs.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    applyItemView();
  });
});

// Поиск предметов
const searchInput = document.getElementById('itemSearch');
searchInput.addEventListener('input', function() {
  itemSearchQuery = this.value.toLowerCase().trim();
  applyItemView();
});
searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    this.value = '';
    this.dispatchEvent(new Event('input'));
  }
});

// Запуск
renderAllGrids();
applyItemView();
updateItemFavoritesTab();

// Обработка URL-параметра ?item=ID или #ID — открывает предмет из внешней ссылки
function getItemIdFromUrl() {
  // Способ 1: query string (?item=ID) — работает на HTTP-сервере
  var id = new URLSearchParams(window.location.search).get('item');
  if (id) return id;
  // Запасной: парсим href вручную (при file:// location.search может быть пустым)
  var href = window.location.href;
  var idx = href.indexOf('?');
  if (idx !== -1) {
    var match = href.substring(idx).match(/[?&]item=([^&]+)/);
    if (match) return match[1];
  }
  // Способ 2: hash (#ID) — надёжно при file:// протоколе
  var hash = window.location.hash;
  if (hash) {
    var hashId = hash.replace(/^#/, '');
    if (hashId && itemsDB[hashId]) return hashId;
  }
  return null;
}

function openItemFromUrl() {
  var id = getItemIdFromUrl();
  if (!id) return;
  if (!itemsDB[id]) {
    console.warn('[items-db] openItemFromUrl: item not found in DB:', id);
    return;
  }
  openItemDetail(id);
  if (!isItemMobileSurface()) {
    var panel = document.getElementById('itemDetailPanel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth' });
  }
}
openItemFromUrl();

// bfcache — страница восстановлена из кэша назад/вперёд
window.addEventListener('pageshow', function(e) {
  if (e.persisted) openItemFromUrl();
});

// hashchange — переход между предметами без перезагрузки страницы
window.addEventListener('hashchange', function() {
  var id = getItemIdFromUrl();
  if (id && itemsDB[id]) {
    openItemDetail(id);
  }
});