#!/usr/bin/env python3
"""TD-16: обёртка мёртвых правил в комментарии по RULES 2.13 (что отключено /
чем доказано / как откатить). Понимает однострочные правила, @media-вложение
и не видит правила внутри комментариев (идемпотентен: повторный прогон — ноль).
Запуск из корня loww: python3 scripts/tmp/td16-dead-wrap.py"""
import re
from pathlib import Path

DEAD = {
    'ability-cycle-group','cycle-hint','cycle-key','cycle-label','innate','luck-chance','hero-tips',
    'ability-cell','ability-passive','compare-card-build',
    'boss-stages','boss-stage-desc','boss-stage-threshold','drop-bonus','monster-code','monsters-intro','support-hero',
    'chip-value','formula-source-chip','formula-sources','luck-item-total',
    'consumable','hero-reco-list','footer-links','footer-social','stat-primary',
    'logo-icon','mc-tag-fix','balance-page-icon','compare-back-link','bc-paste-stage-btn',
    'pct-best','pct-high','pct-low','pct-mid',
}
FILES = ['css/home.css','css/search.css','css/info.css','css/calc.css','css/balance-dashboard.css',
         'css/compare.css','css/monsters.css','css/lore.css','css/effects.css','css/hero-page.css',
         'css/balance.css','css/items.css','css/formulas-calc.css']
MARK = '[off 20.11 TD-16]'

def is_dead_selector(sel):
    toks = set(re.findall(r'[a-zA-Z][\w-]*', sel))
    return bool(toks & DEAD)

def wrap_file(path):
    lines = path.read_text(encoding='utf-8').split('\n')
    n = len(lines)
    in_comment = False
    ranges = []
    i = 0
    while i < n:
        ln = lines[i]
        # трекинг блочных комментариев
        if in_comment:
            if '*/' in ln:
                in_comment = False
            i += 1
            continue
        stripped = ln.strip()
        if stripped.startswith('/*'):
            if '*/' not in ln[2:]:
                in_comment = True
            i += 1
            continue
        if stripped.startswith('//'):
            i += 1
            continue
        # однострочное правило: селектор { ... } целиком на строке
        if re.match(r'^\s*[A-Za-z.#\[]', ln) and '{' in ln and ln.rstrip().endswith('}'):
            sel = ln[:ln.index('{')].strip()
            if is_dead_selector(sel):
                ranges.append((i, i, sel))
            i += 1
            continue
        # многострочное правило: строка селектора, заканчивается '{'
        if re.match(r'^\s*[A-Za-z.#\[]', ln) and ln.rstrip().endswith('{'):
            sel = ln[:ln.rindex('{')].strip()
            depth = ln.count('{') - ln.count('}')
            start = i
            j = i
            while depth > 0 and j + 1 < n:
                j += 1
                depth += lines[j].count('{') - lines[j].count('}')
                if '/*' in lines[j] and '*/' not in lines[j]:
                    in_comment = True  # не бывает, но перестраховка
            if is_dead_selector(sel):
                ranges.append((start, j, sel))
            i = j + 1
            continue
        i += 1
    if not ranges:
        return 0, []
    # слить соседние диапазоны, разделённые пустыми строками
    merged = []
    for r in ranges:
        if merged and all(not lines[k].strip() for k in range(merged[-1][1] + 1, r[0])):
            merged[-1] = (merged[-1][0], r[1], merged[-1][2] + [r[2]])
        else:
            merged.append((r[0], r[1], [r[2]]))
    out = lines[:]
    for start, end, sels in reversed(merged):
        indent = re.match(r'^\s*', lines[start]).group(0)
        head = (f"{indent}/* {MARK} отключены мёртвые правила ({len(sels)} шт.): "
                f"{'; '.join(s[:80] for s in sels)} — класс(ы) не встречаются ни в HTML, ни в JS "
                f"(включая корневые скрипты); чем доказано: scripts/tmp/td16-verify-dead.mjs, 0 попаданий; "
                f"как откатить: убрать эту строку, служебную строку-открыватель ниже и служебную "
                f"строку-закрыватель после правил */")
        body = [out[k] for k in range(start, end + 1)]
        out[start:end + 1] = [head, indent + "/*"] + body + [indent + "*/"]
    path.write_text('\n'.join(out), encoding='utf-8')
    return len(merged), [s for _, _, ss in merged for s in ss]

total = 0
for f in FILES:
    p = Path(f)
    cnt, sels = wrap_file(p)
    if cnt:
        print(f"{f}: обёрток {cnt}, правил {len(sels)}")
        total += len(sels)
print(f"\nитого правил обёрнуто: {total}")
