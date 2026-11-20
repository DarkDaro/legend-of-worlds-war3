#!/usr/bin/env python3
"""Проверка [off 08.11 css-аудит] блоков: какие отключённые классы на самом деле используются.
Ищем имена классов/id в отключённых правилах и ищем их в HTML и JS. Печатаем подозреваемых.
"""
import re, sys, pathlib

ROOT = pathlib.Path('/home/z/my-project/_local/loww')
CSS = ROOT / 'css'
MARKER = '[off 08.11 css-аудит]'

# Собираем HTML/JS тексты один раз
docs = []
for pat in ('*.html', 'js/**/*.js', 'js/**/*.mjs', '*.js', '*.mjs'):
    docs.extend(ROOT.glob(pat))
blob_by_file = {str(p.relative_to(ROOT)): p.read_text(encoding='utf-8', errors='ignore') for p in docs if p.is_file()}

def disabled_regions(text):
    """[(region_text, line_no)] — содержимое между маркером [off] и концом обёртки */"""
    out = []
    for m in re.finditer(re.escape(MARKER), text):
        start = text.find('/*', m.end())
        if start == -1:
            continue
        end = text.find('*/', start + 2)
        if end == -1:
            continue
        line = text.count('\n', 0, m.start()) + 1
        out.append((text[start + 2:end], line))
    return out

def names_in(css_text):
    """Имена классов и id из CSS-правил (без @-строк)."""
    css_text = re.sub(r'@(media|supports|keyframes)[^{]*\{', ' ', css_text)
    css_text = css_text.replace('{', ' ').replace('}', ' ')
    names = set()
    for m in re.finditer(r'\.([a-zA-Z0-9_-]{2,})', css_text):
        names.add(('class', m.group(1)))
    for m in re.finditer(r'#([a-zA-Z][a-zA-Z0-9_-]{2,})', css_text):
        names.add(('id', m.group(1)))
    return names

problems = []
total_off = 0
for cssf in sorted(CSS.glob('*.css')):
    if cssf.name == 'all.css':
        continue
    text = cssf.read_text(encoding='utf-8')
    regions = disabled_regions(text)
    total_off += len(regions)
    for region, line in regions:
        for kind, name in names_in(region):
            hits = []
            for df, blob in blob_by_file.items():
                if kind == 'class':
                    if re.search(r'["\'\s=]' + re.escape(name) + r'["\'\s]', blob):
                        hits.append(df)
                else:
                    if re.search(r'[\'"]' + re.escape(name) + r'[\'"]', blob):
                        hits.append(df)
            if hits:
                problems.append((cssf.name, line, kind, name, hits[:6], len(hits)))

print(f"[off]-блоков всего: {total_off} (без all.css)")
print(f"Подозрений на живые классы: {len(problems)}\n")
for f, line, kind, name, hits, n in sorted(problems):
    print(f"  {f}:{line}  {kind} .{name}  — упоминаний в файлах: {n}")
    for h in hits:
        print(f"        {h}")
