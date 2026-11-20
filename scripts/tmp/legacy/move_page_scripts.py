#!/usr/bin/env python3
# move_page_scripts.py — перенос корневых *-page.js в js/ + правка подключений в html
import re, os, subprocess

ROOT = '/home/z/my-project/_local/loww'

# имя в корне → имя после переноса (sitemap-page-page.js заодно переименовываем)
MOVES = {
    'heroes-page.js': 'heroes-page.js',
    'compare-page.js': 'compare-page.js',
    'bot-builds-page.js': 'bot-builds-page.js',
    'balance-dashboard-page.js': 'balance-dashboard-page.js',
    'creeps-page.js': 'creeps-page.js',
    'events-page.js': 'events-page.js',
    'faq-page.js': 'faq-page.js',
    'guides-page.js': 'guides-page.js',
    'gallery-page.js': 'gallery-page.js',
    'info-page.js': 'info-page.js',
    'runes-page.js': 'runes-page.js',
    'storage-page.js': 'storage-page.js',
    'sitemap-page-page.js': 'sitemap-page.js',
}

# 1. git mv
for src, dst in MOVES.items():
    subprocess.run(['git', 'mv', src, f'js/{dst}'], cwd=ROOT, check=True)
    print(f'git mv {src} -> js/{dst}')

# 2. правка подключений во всех html (корень, heroes/, guides/ — где есть)
changed = []
for dirpath, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if d not in ('.git', 'vendor', 'images', 'repo-archive')]
    for fn in files:
        if not fn.endswith('.html'):
            continue
        p = os.path.join(dirpath, fn)
        text = open(p, encoding='utf-8').read()
        orig = text
        for src, dst in MOVES.items():
            text = text.replace(f'src="{src}"', f'src="js/{dst}"')
        if text != orig:
            open(p, 'w', encoding='utf-8').write(text)
            changed.append(os.path.relpath(p, ROOT))

print('\nправлены html:', len(changed))
for c in sorted(changed):
    print(' ', c)

# 3. контроль: не осталось подключений старых имён
left = []
for dirpath, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if d not in ('.git', 'vendor', 'images', 'repo-archive')]
    for fn in files:
        if not fn.endswith('.html'):
            continue
        text = open(os.path.join(dirpath, fn), encoding='utf-8').read()
        for src in MOVES:
            if f'src="{src}"' in text:
                left.append((fn, src))
print('\nосталось старых подключений:', left if left else 'нет')
