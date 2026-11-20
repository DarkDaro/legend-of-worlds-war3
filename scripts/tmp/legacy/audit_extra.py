#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Уточняющие проверки аудита."""
import os, re, json
from collections import Counter, defaultdict

ROOT = '/home/z/my-project/_local/loww'
SKIP = {'.git', 'repo-archive', 'archive', 'node_modules', 'scripts', 'docs', '.github'}

def it(ext):
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in SKIP]
        for f in fn:
            if f.endswith(ext):
                yield os.path.join(dp, f)

def rd(p): return open(p, encoding='utf-8', errors='replace').read()

# 1. Типы JSON-LD по сайту
tc = Counter()
for p in it('.html'):
    for j in re.findall(r'application/ld\+json[^>]*>(.*?)</script>', rd(p), re.S | re.I):
        try:
            o = json.loads(j); items = o if isinstance(o, list) else [o]
            for x in items:
                t = x.get('@type') if isinstance(x, dict) else None
                if t: tc[t if isinstance(t, str) else ','.join(t)] += 1
        except Exception: pass
print('1. JSON-LD типы:', dict(tc))

# 2. Пустые alt — что за картинки
samples = defaultdict(list)
for p in it('.html'):
    for t in re.findall(r'<img\b[^>]*>', rd(p), re.I):
        if re.search(r'alt=["\']["\']', t):
            sm = re.search(r'src=["\']([^"\']+)["\']', t)
            samples[sm.group(1) if sm else '?'].append(os.path.relpath(p, ROOT))
for k, v in sorted(samples.items(), key=lambda x: -len(x[1])):
    print(f'2. EMPTY ALT: {k} x{len(v)} напр. {v[:2]}')

# 3. Короткие description с их текстом
def metas(src):
    for t in re.findall(r'<meta\s+[^>]*>', src, re.I):
        nm = re.search(r'name\s*=\s*["\']([^"\']*)["\']', t, re.I)
        ct = re.search(r'content\s*=\s*["\']([^"\']*)["\']', t, re.I)
        yield (nm.group(1).lower() if nm else None), (ct.group(1) if ct else None)

print('3. Короткие description:')
for p in it('.html'):
    for nm, ct in metas(rd(p)):
        if nm == 'description' and ct and len(ct) < 50:
            print(f'   {os.path.relpath(p, ROOT)} ({len(ct)}): {ct}')

# 4. jpg vs webp использование
for name in ['lore-bag', 'maplows', 'fullscreen']:
    jpg = webp = 0
    for p in list(it('.html')) + list(it('.css')) + list(it('.js')):
        s = rd(p)
        jpg += len(re.findall(name + r'\.jpg', s)); webp += len(re.findall(name + r'\.webp', s))
    print(f'4. {name}: .jpg ссылок={jpg}, .webp ссылок={webp}')

# 5. Гайды: кто на кого ссылается
g = rd(os.path.join(ROOT, 'guides.html'))
print('5. guides.html ссылается на:', sorted(set(re.findall(r'guides/(guide-[\w-]+\.html)', g))))
orph = []
for p in it('.html'):
    if 'guide-admiral' in rd(p) and not p.endswith('guide-admiral.html'):
        orph.append(os.path.relpath(p, ROOT))
print('   guide-admiral.html упомянут в:', orph)

# 6. Метрика в analytics.js
a = rd(os.path.join(ROOT, 'analytics.js'))
print('6. analytics.js: mc.yandex =', 'mc.yandex' in a, '| размер', len(a), 'байт')

# 7. Импорты style.css
print('7. style.css @imports:', re.findall(r'@import\s+url\(["\']?([^"\')]+)', rd(os.path.join(ROOT, 'style.css'))))

# 8. Счётчики
print('8. hero-страниц:', len([p for p in it('.html') if '/heroes/' in p.replace(os.sep, '/')]),
      '| гайдов:', len(os.listdir(os.path.join(ROOT, 'guides'))),
      '| иконок предметов:', len([f for f in os.listdir(os.path.join(ROOT, 'images', 'items')) if f.lower().endswith(('.png', '.jpg', '.webp'))]))

# 9. A19B — abilities-db.js:438
lines = rd(os.path.join(ROOT, 'abilities-db.js')).splitlines()
print('9. abilities-db.js строки 435-441:')
for i in range(434, 441): print(f'   {i+1}: {lines[i]}')

# 10. Классификация корневых JS (первая строка = назначение)
for f in ['calculator.js', 'build-constructor.js', 'bot-builds.js', 'ability-stats.js',
          'tilt-cards.js', 'item-bonus-parser.js', 'hero-lore.js', 'search.js']:
    s = rd(os.path.join(ROOT, f))
    first = next((l for l in s.splitlines() if l.strip()), '')
    print(f'10. {f} ({len(s)//1024} KB): {first[:110]}')

# 11. fa-brands / fa-regular использование (можно ли выкинуть брендовые шрифты)
cnt = Counter()
for p in it('.html'):
    s = rd(p)
    for cls in ['fa-brands', 'fa-regular', 'fa-solid']:
        cnt[cls] += s.count(cls)
for f in it('.js'):
    s = rd(f)
    for cls in ['fa-brands', 'fa-regular', 'fa-solid']:
        cnt[cls] += s.count(cls)
print('11. классы FA в html+js:', dict(cnt))

# 12. lazy loading статистика
lazy = 0; total = 0
for p in it('.html'):
    for t in re.findall(r'<img\b[^>]*>', rd(p), re.I):
        total += 1; lazy += 1 if 'loading=' in t.lower() else 0
print(f'12. img всего={total}, с loading=lazy={lazy}')
