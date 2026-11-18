#!/usr/bin/env python3
"""Снятие всех [off 08.11 css-аудит] обёрток: удалить строку-маркер,
открывающий /* обёртки и его закрывающий */.
Вложенные комментарии внутри возвращаются к жизни как обычные — CSS остаётся валидным.
all.css не трогаем (пересобирается генератором).
"""
import re, pathlib

ROOT = pathlib.Path('/home/z/my-project/_local/loww')
CSS = ROOT / 'css'
MARKER = '[off 08.11 css-аудит]'

total = 0
for f in sorted(CSS.glob('*.css')):
    if f.name == 'all.css':
        continue
    text = f.read_text(encoding='utf-8')
    n = text.count(MARKER)
    if not n:
        continue
    out = text
    removed = 0
    while MARKER in out:
        i = out.find(MARKER)
        # начало строки маркера
        ls = out.rfind('\n', 0, i) + 1
        # конец строки маркера
        le = out.find('\n', i)
        le = len(out) if le == -1 else le
        # открывающая /* обёртки — на следующей непустой позиции
        rest = out[le:].lstrip('\n')
        if not rest.startswith('/*'):
            print(f'!! {f.name}: после маркера нет /* — пропуск')
            break
        open_off = len(out) - len(rest) + len(out[le:].lstrip('\n')) - len(out[le:].lstrip('\n'))
        # точная позиция "/*"
        pos_open = out.find('/*', le)
        # закрывающий */ обёртки — первый после pos_open
        pos_close = out.find('*/', pos_open + 2)
        if pos_close == -1:
            print(f'!! {f.name}: нет закрывающего */ — стоп')
            break
        # вырезаем: строку маркера (с переводом строки), "/*" и первый "*/" после него
        out = out[:ls] + out[le + 1:pos_open] + out[pos_open + 2:pos_close] + out[pos_close + 2:]
        removed += 1
    f.write_text(out, encoding='utf-8')
    total += removed
    print(f'{f.name}: снято обёрток: {removed} (было {n})')
print(f'\nВсего снято: {total}')
