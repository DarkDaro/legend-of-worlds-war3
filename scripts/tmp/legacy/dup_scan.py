#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Поиск дублей-объектов и аномалий levels в JS-базах."""
import os, re
from collections import defaultdict

ROOT = '/home/z/my-project/_local/loww'

def scan(fn, idpat):
    src = open(os.path.join(ROOT, fn), encoding='utf-8', errors='replace').read()
    entries = {}
    for m in re.finditer(idpat, src):
        eid, body = m.group(1), m.group(2)
        # нормализуем: убираем переводы строк и кавычки-разделители
        norm = re.sub(r'\s+', ' ', body).strip()
        entries.setdefault(eid, norm)
    # дубли id
    all_ids = re.findall(idpat, src)
    ids = [a for a, b in all_ids]
    dup_ids = {i for i in ids if ids.count(i) > 1}
    # дули содержимого (разные id, одинаковое тело)
    by_body = defaultdict(list)
    for eid, body in all_ids:
        by_body[re.sub(r'\s+', ' ', body).strip()].append(eid)
    dup_bodies = {b: ids2 for b, ids2 in by_body.items() if len(ids2) > 1}
    print(f'=== {fn} ===')
    print(f'записей: {len(ids)}, уникальных id: {len(entries)}, дубликатов id: {len(dup_ids)} {sorted(dup_ids)[:10]}')
    n = 0
    for body, ids2 in dup_bodies.items():
        n += 1
        if n <= 12:
            name = re.search(r"name:\s*'([^']*)'", body)
            print(f'  дубли по содержимому: {ids2} -> {name.group(1) if name else body[:60]}')
    if n > 12: print(f'  ... всего групп дублей: {n}')
    # levels: 0
    zero = [i for i, b in all_ids if re.search(r'levels:\s*0\b', b)]
    print(f'  levels:0 -> {len(zero)}: {zero[:12]}')
    print()

scan('abilities-db.js', r"'([A-Z0-9]{3,5})':\s*(\{[^{}]*\})")
scan('hero-data.js', r"'([a-z0-9-]+)':\s*(\{[^{}]*?heroes:)", )
