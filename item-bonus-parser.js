(function (global) {
  'use strict';

  function createEmptyBonus() {
    return {
      allStats: 0,
      strength: 0,
      agility: 0,
      intelligence: 0,
      hp: 0,
      mana: 0,
      attack: 0,
      armor: 0,
      attackSpeedPct: 0,
      movementSpeedFlat: 0,
      movementSpeedPct: 0,
      magicDefenseFlat: 0,
      magicDefensePct: 0,
      hpRegenFlat: 0,
      hpRegenPct: 0,
      manaRegenFlat: 0,
      manaRegenPct: 0,
      manaOnAttack: 0,
      evasionPct: 0,
      critChancePct: 0,
      critDamagePct: 0,
      spellDamagePct: 0,
      vampirismPct: 0,
      magicVampirismPct: 0,
      magicBlockPct: 0,
      stunResistPct: 0,
      manaBurnResistPct: 0,
      auraArmor: 0,
      auraAttackSpeedPct: 0,
      auraMoveSpeedPct: 0
    };
  }

  function normalizeNumber(rawValue) {
    return parseFloat(String(rawValue).replace(',', '.')) || 0;
  }

  function addAttributesByToken(target, token, value) {
    const normalized = String(token).toLowerCase();
    if (normalized.includes('сил')) target.strength += value;
    if (normalized.includes('ловк')) target.agility += value;
    if (normalized.includes('разум') || normalized.includes('интел')) target.intelligence += value;
  }

  function mergeBonuses(target, source) {
    Object.keys(target).forEach(function (key) {
      if (typeof source[key] === 'number') {
        target[key] += source[key];
      }
    });
    return target;
  }

  function sumBonuses(list) {
    const total = createEmptyBonus();
    (list || []).forEach(function (bonus) {
      mergeBonuses(total, bonus || createEmptyBonus());
    });
    return total;
  }

  function parseDescription(description) {
    const bonus = createEmptyBonus();
    if (!description) return bonus;

    var text = String(description).toLowerCase();

    // ── Проход 1: комбинированные бонусы (вырезаем из текста, чтобы не задвоить) ──

    // «+N здоровья и маны» / «+N маны и здоровья»
    text = text.replace(/\+(\d+(?:[.,]\d+)?)\s+здоровья\s+и\s+маны/g, function (_match, value) {
      value = normalizeNumber(value);
      bonus.hp += value;
      bonus.mana += value;
      return '';
    });
    text = text.replace(/\+(\d+(?:[.,]\d+)?)\s+маны\s+и\s+здоровья/g, function (_match, value) {
      value = normalizeNumber(value);
      bonus.hp += value;
      bonus.mana += value;
      return '';
    });

    // «+N атрибут1/атрибут2» — комбинированные атрибуты через слэш
    text = text.replace(/\+(\d+(?:[.,]\d+)?)\s+([^,]+?)\/([^,]+?)(?=(?:,|$))/g, function (_match, value, left, right) {
      value = normalizeNumber(value);
      addAttributesByToken(bonus, left, value);
      addAttributesByToken(bonus, right, value);
      return '';
    });

    // ── Проход 2: одиночные бонусы (по очищенному тексту) ──

    // «+N ко всем атрибутам» (но не «за убийство» и прочие условные)
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+ко всем атрибутам(?!\s+за)/g, function (_match, value) {
      bonus.allStats += normalizeNumber(value);
      return _match;
    });

    // Прямые атрибуты
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+сил[а-яё]*/g, function (_match, value) {
      bonus.strength += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+ловк[а-яё]*/g, function (_match, value) {
      bonus.agility += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+разум[а-яё]*/g, function (_match, value) {
      bonus.intelligence += normalizeNumber(value);
      return _match;
    });

    // Базовые статы
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+здоровья/g, function (_match, value) {
      bonus.hp += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+ман[ыа](?!\s+(?:при|за)\s+атак)/g, function (_match, value) {
      bonus.mana += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+атаки(?!\s+врага)/g, function (_match, value) {
      bonus.attack += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+защит[а-яё]*/g, function (_match, value) {
      bonus.armor += normalizeNumber(value);
      return _match;
    });

    // Регенерация
    text.replace(/\+(\d+(?:[.,]\d+)?)%?\s+регенераци[ия]\s+здоровья(?:\/сек)?/g, function (match, value) {
      value = normalizeNumber(value);
      if (match.includes('%')) bonus.hpRegenPct += value;
      else bonus.hpRegenFlat += value;
      return match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)%?\s+регенераци[ия]\s+маны(?:\/сек)?/g, function (match, value) {
      value = normalizeNumber(value);
      if (match.includes('%')) bonus.manaRegenPct += value;
      else bonus.manaRegenFlat += value;
      return match;
    });

    // Скорость боя / атаки
    text.replace(/\+(\d+(?:[.,]\d+)?)%?\s+скорости (?:боя|атаки)/g, function (match, value) {
      value = normalizeNumber(value);
      bonus.attackSpeedPct += value;
      return match;
    });

    // Скорость движения / бега
    text.replace(/\+(\d+(?:[.,]\d+)?)%?\s+скорости (?:бега|передвижения)/g, function (match, value) {
      value = normalizeNumber(value);
      if (match.includes('%')) bonus.movementSpeedPct += value;
      else bonus.movementSpeedFlat += value;
      return match;
    });

    // Прочие прямые числа
    text.replace(/\+(\d+(?:[.,]\d+)?)%\s+маг\.\s*защита/g, function (_match, value) {
      bonus.magicDefensePct += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+маг\.\s*защита/g, function (_match, value) {
      bonus.magicDefenseFlat += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)\s+ман[ыа]?\s+(?:при|за)\s+атак[еу]/g, function (_match, value) {
      bonus.manaOnAttack += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)%\s+уклонение/g, function (_match, value) {
      bonus.evasionPct += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)%\s+критическ[а-яё\s]*удар/g, function (_match, value) {
      bonus.critChancePct += normalizeNumber(value);
      return _match;
    });
    text.replace(/x(\d+(?:[.,]\d+)?)\s*урон/g, function (_match, value) {
      bonus.critDamagePct += normalizeNumber(value) * 100;
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)%\s+доп\.\s+урон заклинаний/g, function (_match, value) {
      bonus.spellDamagePct += normalizeNumber(value);
      return _match;
    });

    // Вампиризм
    text.replace(/(\d+(?:[.,]\d+)?)%\s+вампиризм/g, function (_match, value) {
      bonus.vampirismPct += normalizeNumber(value);
      return _match;
    });
    text.replace(/(\d+(?:[.,]\d+)?)%\s+маг(?:ический)?\s+вампиризм/g, function (_match, value) {
      bonus.magicVampirismPct += normalizeNumber(value);
      return _match;
    });
    text.replace(/(\d+(?:[.,]\d+)?)%\s+маг(?:ический)?\s+блок/g, function (_match, value) {
      bonus.magicBlockPct += normalizeNumber(value);
      return _match;
    });

    // Сопротивления
    text.replace(/\+(\d+(?:[.,]\d+)?)%\s+сопротивление\s+к\s+оглушению/g, function (_match, value) {
      bonus.stunResistPct += normalizeNumber(value);
      return _match;
    });
    text.replace(/\+(\d+(?:[.,]\d+)?)%\s+сопротивление\s+к\s+сожжени[юя]\s+маны/g, function (_match, value) {
      bonus.manaBurnResistPct += normalizeNumber(value);
      return _match;
    });

    // Ауры
    text.replace(/аура\s+защит[а-яё]*\s+(\d+(?:[.,]\d+)?)\s+ед/g, function (_match, value) {
      bonus.auraArmor += normalizeNumber(value);
      return _match;
    });
    text.replace(/аура\s+скорости\s*\((\d+(?:[.,]\d+)?)%\s*as/g, function (_match, value) {
      bonus.auraAttackSpeedPct += normalizeNumber(value);
      return _match;
    });
    text.replace(/аура\s+скорости\s*\(.*?(\d+(?:[.,]\d+)?)%\s*ms/g, function (_match, value) {
      bonus.auraMoveSpeedPct += normalizeNumber(value);
      return _match;
    });

    // Синоним регена маны: «+N% восстановления маны»
    text.replace(/\+(\d+(?:[.,]\d+)?)%\s+восстановления\s+маны/g, function (_match, value) {
      bonus.manaRegenPct += normalizeNumber(value);
      return _match;
    });

    return bonus;
  }

  const ItemBonusParser = {
    createEmptyBonus: createEmptyBonus,
    parseDescription: parseDescription,
    mergeBonuses: mergeBonuses,
    sumBonuses: sumBonuses
  };

  global.ItemBonusParser = ItemBonusParser;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ItemBonusParser;
  }
})(typeof window !== 'undefined' ? window : globalThis);
