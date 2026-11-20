#!/usr/bin/env python3
# items_split.py — разбор items-db.js по записям верхнего уровня
import re, collections

SRC = open('/home/z/my-project/_local/loww/items-db.js', encoding='utf-8').read()

# позиции ключей верхнего уровня
keys = [(m.start(), m.group(1)) for m in re.finditer(r'^  ([A-Z][A-Z0-9]{1,4}|[a-z_]+): \{', SRC, re.M)]
items = {}
for i, (pos, key) in enumerate(keys):
    end = keys[i + 1][0] if i + 1 < len(keys) else len(SRC)
    block = SRC[pos:end]
    items[key] = {
        'type': (re.search(r"type:\s*'([^']+)'", block) or [None, ''])[1],
        'components': 'components:' in block,
        'hidden': bool(re.search(r'\bhidden:\s*true', block)),
        'cost': (re.search(r'\bcost:\s*(\d+)', block) or [None, '0'])[1],
    }

print(f'всего записей верхнего уровня: {len(items)}')

RUNE_TYPES = {'rune'}
catalog = {k: v for k, v in items.items() if v['type'] not in RUNE_TYPES and not v['hidden']}
runes = {k: v for k, v in items.items() if v['type'] in RUNE_TYPES}
print(f'рун (type=rune): {len(runes)}, hidden отдельно: {sum(1 for v in items.values() if v["hidden"] and v["type"] not in RUNE_TYPES)}')
print(f'видимых в каталоге (не rune, не hidden): {len(catalog)}')

crafted = {k: v for k, v in catalog.items() if v['components']}
basic = {k: v for k, v in catalog.items() if not v['components']}
print(f'сборных (есть components): {len(crafted)}')
print(f'простых (без components): {len(basic)}')
recipe_scroll = [k for k, v in catalog.items() if v['type'] == 'recipe']
print(f'из них свитков-рецептов (type=recipe): {len(recipe_scroll)}')

print('\nпо типам (каталог):', dict(sorted(collections.Counter(v['type'] for v in catalog.values()).items(), key=lambda x: -x[1])))
print('по типам (руны):', dict(collections.Counter(v['type'] for v in runes.values())))
no_type = [k for k, v in items.items() if not v['type']]
print(f'записей без type: {len(no_type)}', no_type[:10])
zero_cost = [k for k, v in catalog.items() if v['cost'] == '0']
print(f'видимых с cost=0: {len(zero_cost)}', zero_cost[:10])
