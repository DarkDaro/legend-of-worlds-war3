#!/usr/bin/env python3
"""Пиксельное сравнение скринов до/после чанка 3. Ожидание: различия только
на местах влитых близнецов и ступеней инфо-синего, дельта каналов маленькая."""
from PIL import Image, ImageChops
import os

B = "/tmp/shots/before"
A = "/tmp/shots/after"
names = sorted(os.listdir(B))
print(f"{'страница':<16}{'различ.':>10}{'%':>8}{'макс.дельта':>13}")
for n in names:
    pb, pa = os.path.join(B, n), os.path.join(A, n)
    if not os.path.exists(pa):
        print(f"{n:<16}НЕТ ПОСЛЕ")
        continue
    ib, ia = Image.open(pb).convert("RGB"), Image.open(pa).convert("RGB")
    if ib.size != ia.size:
        print(f"{n:<16}РАЗМЕР {ib.size} vs {ia.size}")
        continue
    diff = ImageChops.difference(ib, ia)
    px = diff.getdata()
    total = len(px)
    differing = [p for p in px if max(p) > 0]
    if not differing:
        print(f"{n:<16}{0:>10}{0:>8.2f}{'—':>13}")
        continue
    maxd = max(max(p) for p in differing)
    pct = 100.0 * len(differing) / total
    print(f"{n:<16}{len(differing):>10}{pct:>8.3f}{maxd:>13}")
