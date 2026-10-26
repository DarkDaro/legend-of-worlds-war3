// item-slugs.js — маппинг item rawcode → slug для URL (?, #, share-ссылки) и тултипов.
// АВТОГЕНЕРИРОВАНО _gen_item_slugs.js — НЕ редактировать вручную.
// Источники: таблица item-slug-mapping.md (автор: DarkDaro, 29.08) + авто-суффикс "-rune" (24.10).
// Короткие ключи (стандартные предметы редактора WC3) оставлены КАК ЕСТЬ (решение DarkDaro 24.10).
// Регенерация: node C:/AgentLetta/HeroData/tools/_gen_item_slugs.js (скрипт в scripts/transfer/).
// itemsDB ключи НЕ меняются — slug только для отображения/URL. Фолбэк: idFromSlug вернёт вход как есть.

const ITEM_SLUGS = {
  'I004': 'claws',
  'I007': 'sword',
  'I005': 'hammer',
  'I006': 'axe',
  'I008': 'trident',
  'I009': 'spear',
  'I00A': 'shield',
  'I00D': 'helmet',
  'I00C': 'armor',
  'modt': 'modt',
  'I03I': 'relic',
  'I0CQ': 'valor-sword',
  'ofir': 'ofir',
  'ofro': 'ofro',
  'oli2': 'oli2',
  'ocor': 'ocor',
  'odef': 'odef',
  'oslo': 'oslo',
  'oven': 'oven',
  'I0FC': 'light-orb',
  'I0FB': 'negation-orb',
  'I0FA': 'flesh-orb',
  'I0FE': 'precision-orb',
  'I0FD': 'might-orb',
  'rlif': 'rlif',
  'rde2': 'rde2',
  'rnsp': 'rnsp',
  'bspd': 'bspd',
  'gcel': 'gcel',
  'rwiz': 'rwiz',
  'lhst': 'lhst',
  'rhth': 'rhth',
  'pmna': 'pmna',
  'clfm': 'clfm',
  'ajen': 'ajen',
  'evtl': 'evtl',
  'I010': 'agi-glove',
  'I015': 'beast-glove',
  'cnob': 'cnob',
  'rag1': 'rag1',
  'rst1': 'rst1',
  'rin1': 'rin1',
  'mnsf': 'mnsf',
  'I001': 'flute',
  'I01G': 'cloak',
  'I000': 'gold-key',
  'I01O': 'bravery-medal',
  'I00N': 'warrior-boots',
  'I00Q': 'tp-boots',
  'I01C': 'divine-boots',
  'I030': 'divine-agi-boots',
  'I0GL': 'thunder-boots',
  'I00H': 'str-key',
  'I00I': 'agi-key',
  'I00E': 'int-key',
  'I00K': 'magic-keys',
  'I0AL': 'magic-ring',
  'I0C8': 'moon-stone',
  'I0C9': 'sun-stone',
  'I0CP': 'sorcerer-staff',
  'I002': 'ancient-shield',
  'I00S': 'death-shield',
  'I03G': 'fire-shield',
  'I0BJ': 'crystal-shield',
  'I09T': 'knight-shield',
  'I0GM': 'storm-shield',
  'I0D0': 'knight-helmet',
  'I036': 'dragonhide-helm',
  'I02Y': 'dragonhide-cuirass',
  'I045': 'dragon-armor',
  'I02B': 'commander-armor',
  'I0AF': 'antimagic-armor',
  'I0GN': 'storm-helm',
  'I0DU': 'storm-cuirass',
  'I0GO': 'stormguard-armor',
  'I0AG': 'antimagic-armor-scroll',
  'I034': 'ghost-blade-1',
  'I035': 'ghost-blade-2',
  'I01P': 'cursed-claws',
  'I03J': 'dark-magic-sword',
  'I0GJ': 'claymore',
  'I00Y': 'fire-sword',
  'I033': 'fury-sword',
  'I0AO': 'holy-sword',
  'I0E5': 'purge-sword',
  'I0C4': 'soul-reaper',
  'I0CM': 'cursed-skull',
  'I02N': 'hand-of-dark',
  'I0EP': 'dark-bow',
  'I0FO': 'sun-blade',
  'I0FP': 'moon-blade',
  'I0FQ': 'cross-blades',
  'I01Q': 'lightning-spear-1',
  'I01W': 'lightning-spear-2',
  'I03R': 'lightning-staff',
  'I08Y': 'thunder-staff',
  'I02T': 'ice-sword-1',
  'I00U': 'ice-sword-2',
  'I02U': 'ice-sword-3',
  'I03E': 'ice-sword-4',
  'I03F': 'ice-sword-5',
  'I02Z': 'ice-eye',
  'I01I': 'ice-armor',
  'I09R': 'ice-spirit',
  'I00P': 'fury-helm',
  'I014': 'demon-helm',
  'I04H': 'demon-mask',
  'I0GI': 'hell-mask',
  'I01X': 'negation-amulet',
  'I01Y': 'flesh-amulet',
  'I026': 'demon-heart',
  'I043': 'demon-heart-2',
  'I0BV': 'demon-essence',
  'I03C': 'gold-medal',
  'I0DT': 'cross',
  'I0DQ': 'aid-seal-1',
  'I0DR': 'aid-seal-2',
  'I0DS': 'aid-seal-3',
  'I04B': 'wind-staff',
  'I0EB': 'minion-pendant',
  'I04L': 'pain-scepter-1',
  'I0BG': 'pain-scepter-2',
  'I0BH': 'pain-scepter-3',
  'I0CN': 'magic-orb',
  'I0D1': 'suppression-staff',
  'I054': 'fire-glove-1',
  'I0BE': 'fire-glove-2',
  'I0BF': 'fire-glove-3',
  'I011': 'great-axe',
  'I00M': 'thunder-hammer',
  'I03X': 'blood-moon-1',
  'I01A': 'blood-moon-2',
  'I028': 'decay-staff-1',
  'I08U': 'decay-staff-2',
  'I04O': 'bloodletter',
  'I0AC': 'death-scythe',
  'I0DA': 'halberd',
  'I08V': 'witcher-blade-1',
  'I08W': 'witcher-blade-2',
  'I08X': 'witcher-blade-3',
  'I0AI': 'destruction-staff',
  'I00R': 'heal-scepter',
  'I00W': 'restoration-staff',
  'I03V': 'light-staff',
  'I0DB': 'scepter-1',
  'I0EY': 'scepter-2',
  'I04E': 'ancient-staff',
  'I04K': 'ancient-mystic',
  'I03N': 'shaman-claws',
  'I023': 'swiftness-scepter',
  'I03T': 'ghost-dagger',
  'I02X': 'gold-sword',
  'I01B': 'killer-blade',
  'I03Z': 'blood-blade',
  'I0EL': 'jade-blade',
  'I0EO': 'jade-blades',
  'I013': 'bow',
  'I01V': 'dark-arrow-1',
  'I03P': 'dark-arrow-2',
  'I03Q': 'dark-arrow-3',
  'I0B1': 'star-bow',
  'I0FH': 'vortex-bow',
  'I0BA': 'fallen-sword',
  'I04G': 'dark-sword',
  'I01J': 'ice-element',
  'I03L': 'frost-sword',
  'I02D': 'juggernaut-shield',
  'I0A5': 'nerubian-armor',
  'I0BD': 'mysticism-orb',
  'I0B6': 'juggernaut-shield-2',
  'I0B4': 'hell-armor',
  'I02E': 'magic-diamond',
  'I01L': 'giant-armor',
  'I0B5': 'ghost-soul',
  'I047': 'rapier',
  'I01N': 'ghoul-claws',
  'I0CK': 'crab-shell',
  'I0G4': 'blue-thanatos-head',
  'I0G3': 'green-thanatos-head',
  'I04P': 'tome-knowledge',
  'I04Q': 'tome-str',
  'I04R': 'tome-agi',
  'I04U': 'tome-int',
  'I04S': 'tome-stats-5',
  'I04T': 'tome-stats-10',
  'I056': 'tome-stats-25',
  'I04W': 'tome-learning',
  'I057': 'tome-might',
  'I02V': 'tome-exp',
  'I04Y': 'medical-tract',
  'I04V': 'crystals-10',
  'I050': 'crystals-40',
  'I0BP': 'crystals-120',
  'I04X': 'gold-2000',
  'I053': 'gold-8000',
  'I0BO': 'gold-24000',
  'I02W': 'gold-2000-alt',
  'I0AM': 'magic-ring-scroll',
  'I0CC': 'moon-stone-scroll',
  'I0CD': 'sun-stone-scroll',
  'I0CS': 'sorcerer-staff-scroll',
  'I021': 'warrior-boots-scroll',
  'I024': 'tp-boots-scroll',
  'I01D': 'divine-boots-scroll',
  'I031': 'divine-agi-boots-scroll',
  'I0GS': 'thunder-boots-scroll',
  'I003': 'ancient-shield-scroll',
  'I00X': 'death-shield-scroll',
  'I09P': 'fire-shield-scroll',
  'I0CJ': 'crystal-shield-scroll',
  'I0F7': 'knight-shield-scroll',
  'I0GV': 'storm-shield-scroll',
  'I0D6': 'knight-helmet-scroll',
  'I037': 'dragonhide-helm-scroll',
  'I03B': 'dragonhide-cuirass-scroll',
  'I046': 'dragon-armor-scroll',
  'I02A': 'commander-armor-scroll',
  'I0GQ': 'storm-helm-scroll',
  'I0DW': 'storm-cuirass-scroll',
  'I0GY': 'stormguard-armor-scroll',
  'I0DN': 'warrior-boots-rune',
  'I0DO': 'tp-boots-rune',
  'I05J': 'divine-boots-rune',
  'I07H': 'divine-agi-boots-rune',
  'I0GR': 'thunder-boots-rune',
  'I05C': 'str-key-rune',
  'I05A': 'agi-key-rune',
  'I05E': 'int-key-rune',
  'I085': 'magic-keys-rune',
  'I0AN': 'magic-ring-rune',
  'I0CA': 'moon-stone-rune',
  'I0CB': 'sun-stone-rune',
  'I0CT': 'sorcerer-staff-rune',
  'I083': 'ancient-shield-rune',
  'I082': 'death-shield-rune',
  'I09Q': 'fire-shield-rune',
  'I0CI': 'crystal-shield-rune',
  'I0F5': 'knight-shield-rune',
  'I0GU': 'storm-shield-rune',
  'I0CZ': 'knight-helmet-rune',
  'I081': 'dragonhide-helm-rune',
  'I075': 'dragonhide-cuirass-rune',
  'I06T': 'dragon-armor-rune',
  'I06S': 'commander-armor-rune',
  'I0AH': 'antimagic-armor-rune',
  'I0GP': 'storm-helm-rune',
  'I0DV': 'storm-cuirass-rune',
  'I0GX': 'stormguard-armor-rune',
  'I07U': 'ghost-blade-1-rune',
  'I07V': 'cursed-claws-rune',
  'I07N': 'dark-magic-sword-rune',
  'I076': 'claymore-rune',
  'I07P': 'fire-sword-rune',
  'I07L': 'fury-sword-rune',
  'I0C7': 'holy-sword-rune',
  'I0E6': 'purge-sword-rune',
  'I0CG': 'soul-reaper-rune',
  'I0E8': 'soul-reaper-off-rune',
  'I0CV': 'cursed-skull-rune',
  'I07W': 'hand-of-dark-rune',
  'I0ER': 'dark-bow-rune',
  'I0FU': 'sun-blade-rune',
  'I0FV': 'moon-blade-rune',
  'I0FW': 'cross-blades-rune',
  'I079': 'lightning-spear-1-rune',
  'I0A3': 'lightning-spear-2-rune',
  'I07S': 'lightning-staff-rune',
  'I0AB': 'thunder-staff-rune',
  'I07F': 'ice-sword-1-rune',
  'I07E': 'ice-eye-rune',
  'I07G': 'ice-armor-rune',
  'I09W': 'ice-spirit-rune',
  'I07Z': 'fury-helm-rune',
  'I080': 'demon-helm-rune',
  'I07J': 'demon-mask-rune',
  'I0BM': 'hell-mask-rune',
  'I06Y': 'negation-amulet-rune',
  'I06Q': 'flesh-amulet-rune',
  'I06W': 'demon-heart-rune',
  'I06X': 'demon-heart-2-rune',
  'I0BW': 'demon-essence-rune',
  'I072': 'gold-medal-rune',
  'I0DX': 'cross-rune',
  'I0E1': 'aid-seal-1-rune',
  'I07R': 'wind-staff-rune',
  'I0EE': 'minion-pendant-rune',
  'I070': 'pain-scepter-1-rune',
  'I07O': 'fire-glove-1-rune',
  'I0CW': 'magic-orb-rune',
  'I0D9': 'suppression-staff-rune',
  'I07M': 'great-axe-rune',
  'I06R': 'thunder-hammer-rune',
  'I07A': 'blood-moon-1-rune',
  'I07B': 'blood-moon-2-rune',
  'I07T': 'decay-staff-1-rune',
  'I07D': 'bloodletter-rune',
  'I0AD': 'death-scythe-rune',
  'I0DC': 'halberd-rune',
  'I0A0': 'witcher-blade-1-rune',
  'I0A1': 'witcher-blade-2-rune',
  'I0A2': 'witcher-blade-3-rune',
  'I0AK': 'destruction-staff-rune',
  'I06Z': 'heal-scepter-rune',
  'I0B9': 'restoration-staff-rune',
  'I07Q': 'light-staff-rune',
  'I0DZ': 'scepter-1-rune',
  'I0EV': 'scepter-2-rune',
  'I06V': 'ancient-staff-rune',
  'I06U': 'ancient-mystic-rune',
  'I078': 'shaman-claws-rune',
  'I071': 'swiftness-scepter-rune',
  'I074': 'ghost-dagger-rune',
  'I073': 'gold-sword-rune',
  'I077': 'killer-blade-rune',
  'I07C': 'blood-blade-rune',
  'I0EK': 'jade-blade-rune',
  'I0EQ': 'jade-blades-rune',
  'I07I': 'bow-rune',
  'I07Y': 'dark-arrow-1-rune',
  'I0B2': 'star-bow-rune',
  'I0EC': 'vortex-bow-rune',
  'I0BC': 'fallen-sword-rune',
  'I07K': 'dark-sword-rune',
  'I06O': 'ice-element-rune',
  'I07X': 'frost-sword-rune',
  'I06P': 'juggernaut-shield-rune',
  'I0A7': 'nerubian-armor-rune',
  'I0C0': 'mysticism-orb-rune',
  'I0C1': 'juggernaut-shield-2-rune',
  'I0C2': 'hell-armor-rune',
  'I069': 'bravery-medal-rune',
  'I065': 'gold-key-rune',
  'I05L': 'wisdom-staff-rune',
  'I06E': 'cloak-rune',
  'I05X': 'flute-rune',
  'I05N': 'mana-amulet-rune',
  'I05S': 'fire-cloak-rune',
  'I05H': 'mage-dagger-rune',
  'I05I': 'stamina-chalice-rune',
  'I05V': 'ward-talisman-rune',
  'I06D': 'agi-glove-rune',
  'I06C': 'beast-glove-rune',
  'I05F': 'boot-rune',
  'I05G': 'glove-speed-rune',
  'I05R': 'sobi-mask-rune',
  'I05T': 'wind-horn-rune',
  'I05B': 'ogre-gauntlet-rune',
  'I05D': 'scholar-robe-rune',
  'I059': 'agi-slippers-rune',
  'I058': 'crown-nobility-rune',
  'I05O': 'life-stone-rune',
  'I05P': 'def-ring-rune',
  'I05Q': 'regen-ring-rune',
  'I05Y': 'supremacy-ring-rune',
  'I061': 'fire-orb-rune',
  'I05M': 'ice-orb-rune',
  'I060': 'lightning-orb-rune',
  'I062': 'curse-orb-rune',
  'I05U': 'dark-orb-rune',
  'I05Z': 'slow-orb-rune',
  'I063': 'poison-orb-rune',
  'I0F4': 'light-orb-rune',
  'I0F2': 'negation-orb-rune',
  'I0F1': 'flesh-orb-rune',
  'I0F8': 'precision-orb-rune',
  'I0F9': 'might-orb-rune',
  'I066': 'claws-rune',
  'I06A': 'sword-rune',
  'I06B': 'hammer-rune',
  'I06G': 'axe-rune',
  'I06H': 'trident-rune',
  'I067': 'spear-rune',
  'I06J': 'shield-rune',
  'I06I': 'helmet-rune',
  'I064': 'armor-rune',
  'I05K': 'death-mask-rune',
  'I06F': 'relic-rune',
  'I0CR': 'valor-sword-rune',
  'I06K': 'magic-diamond-rune',
  'I06L': 'giant-armor-rune',
  'I0CY': 'ghost-soul-rune',
  'I06N': 'rapier-rune',
  'I06M': 'ghoul-claws-rune',
  'I0DM': 'crab-shell-rune',
  'I0G5': 'blue-thanatos-head-rune',
  'I0G6': 'green-thanatos-head-rune',
};

// Обратный маппинг (автогенерация)
const SLUG_TO_ID = Object.fromEntries(
  Object.entries(ITEM_SLUGS).map(([k, v]) => [v, k])
);

// rawcode → slug. Фолбэк: вернуть как есть.
function slugFromId(rawcode) {
  if (!rawcode) return rawcode;
  return ITEM_SLUGS[rawcode] || rawcode;
}

// slug → rawcode. Фолбэк: вернуть как есть (backward compat со старыми rawcode-URL).
function idFromSlug(slug) {
  if (!slug) return slug;
  return SLUG_TO_ID[slug] || slug;
}

// ======================= ТУЛТИП СЛАГА (24.10) =======================
// Показывает «Название + slug» при удержании (350мс) на иконку предмета.
// 26.10: показ при наведении отключён (юзер) — остался только hold.
// ОТКЛЮЧЕНО (26.10, юзер: показалось лишним): показ при наведении. Вернуть — раскомментировать блок ниже:
// document.addEventListener('mouseover', function(e) {
//   var img = e.target && e.target.tagName === 'IMG' ? e.target : null;
//   if (!img || e.relatedTarget === img) return;
//   var id = itemIdFromImg(img);
//   if (!id || !(typeof itemsDB !== 'undefined' && itemsDB[id])) { hide(); return; }
//   scheduleShow(img, e.clientX, e.clientY, 350);
// });
// Делегирование на document — работает на всех страницах с этим скриптом. itemsDB не изменяется.
(function initItemSlugTooltip() {
  var tip = null;
  var showTimer = null;
  var lastImg = null;

  function itemIdFromImg(img) {
    var src = img && img.getAttribute('src');
    if (!src) return null;
    var m = src.match(/items\/([A-Za-z0-9_]+)\.(?:png|jpg)/i);
    return m ? m[1] : null;
  }

  function ensureTip() {
    if (tip) return tip;
    tip = document.createElement('div');
    tip.className = 'item-slug-tooltip';
    tip.style.display = 'none';
    document.body.appendChild(tip);
    return tip;
  }

  function show(img, x, y) {
    var id = itemIdFromImg(img);
    if (!id || id === 'recipe') { hide(); return; }
    var item = (typeof itemsDB !== 'undefined') ? itemsDB[id] : null;
    if (!item || !item.name) { hide(); return; }
    var t = ensureTip();
    t.innerHTML = '<div class="ist-name"></div><div class="ist-slug"></div>';
    t.querySelector('.ist-name').textContent = item.name;
    t.querySelector('.ist-slug').textContent = slugFromId(id);
    t.style.display = 'block';
    // Позиция у курсора с защитой краёв
    var rect = t.getBoundingClientRect();
    var px = Math.min(x + 14, window.innerWidth - rect.width - 8);
    var py = Math.min(y + 14, window.innerHeight - rect.height - 8);
    t.style.left = Math.max(8, px) + 'px';
    t.style.top = Math.max(8, py) + 'px';
    lastImg = img;
  }

  function hide() {
    if (tip) tip.style.display = 'none';
    lastImg = null;
    if (showTimer) { clearTimeout(showTimer); showTimer = null; }
  }

  function scheduleShow(img, x, y, delay) {
    if (showTimer) clearTimeout(showTimer);
    showTimer = setTimeout(function() { show(img, x, y); }, delay);
  }

  document.addEventListener('mousedown', function(e) {
    var img = e.target && e.target.tagName === 'IMG' ? e.target : null;
    if (!img) return;
    var id = itemIdFromImg(img);
    if (!id || !(typeof itemsDB !== 'undefined' && itemsDB[id])) { hide(); return; }
    scheduleShow(img, e.clientX, e.clientY, 350);
  });

  document.addEventListener('mousemove', function(e) {
    // сопровождение курсора пока показан
    if (tip && tip.style.display !== 'none' && lastImg) {
      var rect = tip.getBoundingClientRect();
      tip.style.left = Math.max(8, Math.min(e.clientX + 14, window.innerWidth - rect.width - 8)) + 'px';
      tip.style.top = Math.max(8, Math.min(e.clientY + 14, window.innerHeight - rect.height - 8)) + 'px';
    }
  });

  document.addEventListener('mouseout', function(e) {
    var img = e.target && e.target.tagName === 'IMG' ? e.target : null;
    if (img) hide();
  });
  document.addEventListener('mouseup', hide);
  document.addEventListener('scroll', hide, true);
  document.addEventListener('click', hide);
})();
