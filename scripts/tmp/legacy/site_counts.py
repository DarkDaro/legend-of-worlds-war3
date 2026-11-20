#!/usr/bin/env python3
# site_counts.py — точный подсчёт героев и предметов для витринных чисел
import re, os, json, collections

ROOT = '/home/z/my-project/_local/loww'

# ---------- ГЕРОИ ----------
src = open(os.path.join(ROOT, 'hero-data.js'), encoding='utf-8').read()
# записи: объекты внутри HEROES_DATA; heroId, wip, isAltForm
records = []
for m in re.finditer(r"\{\s*name:\s*'([^']*)'.*?\}(?=,\s*\n|\n\s*\]|$)", src, re.S):
    block = m.group(0)
    hid = re.search(r"heroId:\s*'([^']+)'", block)
    if not hid:
        continue
    records.append({
        'name': m.group(1),
        'heroId': hid.group(1),
        'wip': 'wip: true' in block,
        'alt': 'isAltForm' in block,
    })

total = len(records)
alt = [r for r in records if r['alt'] and not r['wip']]
wip = [r for r in records if r['wip'] and not r['alt']]
alt_wip = [r for r in records if r['alt'] and r['wip']]
combat = [r for r in records if not r['alt'] and not r['wip']]

pages = sorted(f[:-5] for f in os.listdir(os.path.join(ROOT, 'heroes')) if f.endswith('.html'))
combat_ids = {r['heroId'] for r in combat}
page_set = set(pages)

print('=== ГЕРОИ ===')
print(f'всего записей: {total}')
print(f'боевых (не alt, не wip): {len(combat)}')
print(f'альт-форм: {len(alt)}, WIP: {len(wip)}, alt+wip: {len(alt_wip)}')
print(f'файлов в heroes/: {len(pages)}')
print(f'боевые без страницы: {sorted(combat_ids - page_set)}')
print(f'страницы без боевой записи: {sorted(page_set - combat_ids)}')
# у каких альт-форм/WIP есть страница
strays = [r['heroId'] for r in alt + wip if r['heroId'] in page_set]
print(f'alt/wip, у которых есть страница: {strays}')

# ---------- ПРЕДМЕТЫ ----------
isrc = open(os.path.join(ROOT, 'items-db.js'), encoding='utf-8').read()
# ключи верхнего уровня: две строки отступа, rawcode: {
top_keys = re.findall(r'^  ([A-Z][A-Z0-9]{1,4}|[a-z_]+): \{', isrc, re.M)
print(f'\n=== ПРЕДМЕТЫ ===\nключей верхнего уровня: {len(top_keys)}')
# типы: type: '...' в пределах записи — грубо: все type: в файле
types = re.findall(r"type:\s*'([^']+)'", isrc)
print('типы (все вхождения):', dict(collections.Counter(types)))
# категории — комментарии-секции
sections = re.findall(r'//\s*-+\s*([^-\n]+?)\s*-+', isrc)
print('секции:', [s.strip() for s in sections][:30])
# рецепты: найдём поле рецепта на примере записи с cost > 1000
sample = re.search(r"\n  [A-Z0-9]{3,4}: \{[^{}]*?recipe[^{}]*\}", isrc)
print('пример записи с рецептом:', (sample.group(0)[:400] if sample else 'поле recipe не найдено'))
# сколько записей имеют recipe/comp
for field in ('recipe', 'components', 'comp', 'buildsFrom', 'parts'):
    cnt = len(re.findall(rf"\b{field}\s*:", isrc))
    if cnt:
        print(f'поле "{field}": {cnt} вхождений')
