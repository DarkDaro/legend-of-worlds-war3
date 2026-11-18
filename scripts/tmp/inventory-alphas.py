#!/usr/bin/env python3
"""Инвентаризация альфа-значений rgba(var(--cyan-rgb), a) в живых css."""
import re, glob, collections

files = [f for f in glob.glob('css/*.css') if not f.endswith('all.css')]
files += [f for f in ('aibot.css', 'map.css', 'info-auto-level.css') if glob.glob(f)]
pat = re.compile(r'rgba\(\s*var\(\s*--cyan-rgb\s*\)\s*,\s*([0-9]*\.?[0-9]+)\s*\)')

dist = collections.Counter()
per_file = {}
total = 0
for f in files:
    src = open(f, encoding='utf-8').read()
    hits = pat.findall(src)
    if hits:
        per_file[f] = len(hits)
        for a in hits:
            dist[a] += 1
            total += 1

print('FILES:', len(per_file), 'TOTAL OCCURRENCES:', total)
print('\n=== ALPHA DISTRIBUTION (value: count) ===')
for a, n in sorted(dist.items(), key=lambda kv: -kv[1]):
    print(f'{a:>6} : {n}')

STEPS = [0.04, 0.08, 0.12, 0.2, 0.35, 0.6, 0.9]
def to_step(v):
    diffs = [(abs(v - s), s) for s in STEPS]
    diffs.sort()
    lo = min(s for s in STEPS if s >= v) if any(s >= v for s in STEPS) else None
    return diffs[0][1]

print('\n=== MAPPING old -> step (nearest, midpoint -> lower) ===')
mapped = collections.Counter()
for a, n in dist.items():
    v = float(a)
    diffs = [(abs(v - s), i, s) for i, s in enumerate(STEPS)]
    diffs.sort()
    best = diffs[0]
    # при равенстве расстояний выбираем меньшую ступень
    if len(diffs) > 1 and diffs[1][0] == best[0]:
        best = min(diffs[:2], key=lambda d: d[2])
    step = best[2]
    mark = '' if abs(v - step) < 1e-9 else ('  <-- CHANGE' if abs(v - step) >= 0.04 else '  <- small shift')
    print(f'{a:>6} ({n:>3}x) -> {step}{mark}')
    mapped[step] += n
print('\n=== STEP COVERAGE after mapping ===')
for s in STEPS:
    print(f'{s}: {mapped.get(s, 0)}')
