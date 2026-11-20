#!/usr/bin/env python3
"""Сжатие images/fullscreen.png: квантизация до N цветов + optimize.
Оценка деградации — средняя и максимальная абсолютная разница на уменьшенной копии.
"""
from PIL import Image, ImageChops
import io, sys

SRC = '/home/z/my-project/_local/loww/images/fullscreen.png'

orig = Image.open(SRC).convert('RGB')
buf_o = io.BytesIO(); orig.save(buf_o, format='PNG', optimize=True)
orig_size = buf_o.tell()
print(f'исходник (optimize, без потерь): {orig_size:,} байт')

def try_q(colors, method):
    q = orig.quantize(colors=colors, method=method, dither=Image.Dither.FLOYDSTEINBERG)
    buf = io.BytesIO(); q.save(buf, format='PNG', optimize=True)
    size = buf.tell()
    # деградация: разница против оригинала на уменьшенных копиях (быстро и показательно)
    a = orig.resize((384, 256)); b = q.convert('RGB').resize((384, 256))
    diff = ImageChops.difference(a, b)
    hist = diff.convert('L').histogram()
    total = sum(hist)
    mad = sum(i * c for i, c in enumerate(hist)) / total
    mx = max(i for i, c in enumerate(hist) if c)
    print(f'{colors:>4} цветов (method={method}): {size:,} байт '
          f'({orig_size / size:.2f}x меньше) | средняя дельта {mad:.2f}/255, макс {mx}')
    return size, mad, mx, q

cands = []
for colors in (256, 192, 128):
    cands.append((colors, *try_q(colors, Image.Quantize.FASTOCTREE)[:3], None))

# выбор: 256 цветов, если сжатие >=1.5x и деградация умеренная
best = None
for colors, size, mad, mx, _ in cands:
    if size < orig_size * 0.7 and mad <= 3.0:
        best = colors
        break
if best is None:
    best = 256
    print('осторожный режим: беру 256 цветов в любом случае')

q = orig.quantize(colors=best, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG)
out = '/home/z/my-project/_local/loww/images/fullscreen.png'
q.save(out, format='PNG', optimize=True)
import os
print(f'\nсохранено: {out} → {os.path.getsize(out):,} байт ({best} цветов)')
