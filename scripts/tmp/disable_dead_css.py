#!/usr/bin/env python3
"""Отключение мёртвых CSS-классов сайта loww: не удалять, а закомментировать.
Каждое правило, все селекторы которого содержат мёртвый класс, оборачивается
в /* ... */ с маркером. Восстановление = снять обёртку.
Смешанные списки селекторов (живое + мёртвое) этим скриптом не трогаются —
они правятся вручную (ровно один такой: armor-calc.css #constToggle).
Запуск из корня клона. Идемпотентен: уже обёрнутые правила пропускает."""
import tinycss2, re, glob, sys, os

DEAD = set("""ability-cell ability-cycle-group ability-passive armor-toggle balance-page-icon bc-paste-stage-btn
boss-stage-desc boss-stage-threshold boss-stages chip-value compare-back-link compare-card-build consumable
cycle-hint cycle-key cycle-label drop-bonus footer-links footer-social formula-source-chip formula-sources
hero-reco-list hero-tips innate logo-icon luck-chance luck-item-total mc-tag-fix monster-code monsters-intro
pct-best pct-high pct-low pct-mid stat-primary support-hero""".split())
PAT = re.compile(r'\.(' + '|'.join(sorted(DEAD)) + r')\b')
MARK = "[off 08.11 css-аудит] класс не используется нигде (HTML, JS, живой DOM 115 страниц) — отключено и зарезервировано; вернуть = снять обёртку"

def norm(sel): return re.sub(r'\s+', ' ', tinycss2.serialize(sel).strip())

def line_offsets(text):
    offs = [0]
    for i, ch in enumerate(text):
        if ch == '\n':
            offs.append(i + 1)
    return offs

def abs_pos(offs, tok):
    return offs[tok.source_line - 1] + tok.source_column - 1

files = sorted(f for f in glob.glob('css/*.css') if not f.endswith('all.css'))
files += ['aibot.css', 'map.css', 'info-auto-level.css']
grand = 0
for path in files:
    text = open(path, encoding='utf-8').read()
    offs = line_offsets(text)
    rules, _ = tinycss2.parse_stylesheet_bytes(text.encode('utf-8'))
    edits = []  # (start, end, selector_str)
    def walk(nodes):
        for n in nodes:
            if n.type == 'qualified-rule':
                ps = [p.strip() for p in norm(n.prelude).split(',') if p.strip()]
                if not ps: continue
                flags = [bool(PAT.search(p)) for p in ps]
                if any(flags):
                    if all(flags):
                        start = abs_pos(offs, n.prelude[0])
                        edits.append((start, ps[0]))
                    else:
                        print(f"!! СМЕШАННОЕ (вручную): {path} {ps}")
            elif n.type == 'at-rule' and n.lower_at_keyword == 'media' and n.content:
                walk(tinycss2.parse_rule_list(n.content))
    walk(rules)
    if not edits:
        continue
    # вычисляем span каждого правила сопоставлением скобок от начала селектора
    spans = []
    for start, sel in edits:
        b = text.find('{', start)
        assert b != -1, path
        depth = 0; i = b
        while i < len(text):
            if text[i] == '{': depth += 1
            elif text[i] == '}':
                depth -= 1
                if depth == 0: break
            i += 1
        end = i + 1
        got = norm(tinycss2.parse_one_rule(text[start:end].encode('utf-8') if False else None).prelude) if False else None
        spans.append((start, end, sel))
    spans.sort(reverse=True)
    out = text
    for start, end, sel in spans:
        indent = ''
        ls = out.rfind('\n', 0, start) + 1
        indent = out[ls:start] if out[ls:start].strip() == '' else ''
        block = out[start:end]
        repl = (f"{indent}/* {MARK} */\n"
                f"{indent}/*\n"
                f"{block}\n"
                f"{indent}*/")
        out = out[:start] + repl + out[end:]
        grand += 1
        print(f"{path}: выключено «{sel[:60]}»")
    open(path, 'w', encoding='utf-8').write(out)
print(f"\nИТОГО правил отключено: {grand}")
