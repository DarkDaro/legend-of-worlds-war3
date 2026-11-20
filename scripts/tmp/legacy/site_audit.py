#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Комплексный технический/SEO-аудит статики legend-of-worlds-war3."""
import os, re, json, sys
from collections import Counter, defaultdict
from html import unescape

ROOT = '/home/z/my-project/_local/loww'
SKIP_DIRS = {'.git', 'repo-archive', 'archive', 'node_modules', 'scripts', 'docs', '.github'}
CANON_HOST = 'darkdaro.github.io'
CANON_BASE = '/legend-of-worlds-war3'
SERVICE_PAGES = {'site-validator.html', 'sitemap-page.html', '404.html'}

def iter_files(ext):
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if fn.endswith(ext):
                yield os.path.join(dirpath, fn)

def rel(p): return os.path.relpath(p, ROOT).replace(os.sep, '/')
def attr(tag, name):
    m = re.search(name + r'\s*=\s*["\']([^"\']*)["\']', tag, re.I)
    return m.group(1).strip() if m else None

P = defaultdict(list)   # проблемы: список файлов
S = {}                  # сводка

pages = {}
titles, descs = Counter(), Counter()
canon_vals, ogimgs, langs = Counter(), Counter(), Counter()

for path in iter_files('.html'):
    r = rel(path)
    src = open(path, encoding='utf-8', errors='replace').read()
    d = {}

    m = re.search(r'<title[^>]*>(.*?)</title>', src, re.S | re.I)
    title = unescape(m.group(1)).strip() if m else None
    d['title'] = title
    if title: titles[title] += 1
    if not title: P['нет <title>'].append(r)
    elif len(title) < 20: P['title короче 20 симв'].append(r)
    elif len(title) > 70: P['title длиннее 70 симв'].append(r)

    desc = None
    for t in re.findall(r'<meta\s+[^>]*>', src, re.I):
        nm = (attr(t, 'name') or '').lower()
        if nm == 'description': desc = attr(t, 'content')
        if nm == 'robots': d['robots'] = attr(t, 'content')
        if nm == 'viewport': d['viewport'] = True
    d['desc'] = desc
    if desc: descs[desc] += 1
    if not desc: P['нет meta description'].append(r)
    elif len(desc) < 50: P['description короче 50 симв'].append(r)
    elif len(desc) > 170: P['description длиннее 170 симв'].append(r)

    m = re.search(r'<html[^>]*>', src, re.I)
    lang = attr(m.group(0), 'lang') if m else None
    d['lang'] = lang
    langs[lang] += 1
    if not lang: P['нет lang у <html>'].append(r)

    if not d.get('viewport'): P['нет meta viewport'].append(r)

    m = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*>', src, re.I)
    if m:
        href = attr(m.group(0), 'href') or ''
        d['canonical'] = href
        canon_vals[href] += 1
        host = re.sub(r'^https?://([^/]+).*$', r'\1', href)
        if host != CANON_HOST: P['canonical: чужой host'].append(f'{r} -> {href}')
        if not href.startswith(f'https://{CANON_HOST}{CANON_BASE}/'):
            P['canonical: не https/без базы'].append(f'{r} -> {href}')
        # ожидаемый путь
        expect = f'https://{CANON_HOST}{CANON_BASE}/' + r
        if href.rstrip('/') != expect.rstrip('/') and not (r == 'index.html' and href.rstrip('/') == f'https://{CANON_HOST}{CANON_BASE}/'):
            P['canonical: путь не совпадает с файлом'].append(f'{r} -> {href}')
    else:
        P['нет canonical'].append(r)

    og = {}
    for t in re.findall(r'<meta\s+[^>]*>', src, re.I):
        pr = (attr(t, 'property') or '').lower()
        if pr.startswith('og:'): og[pr] = attr(t, 'content')
    d['og'] = sorted(og.keys())
    for need in ['og:title', 'og:description', 'og:image', 'og:url']:
        if need not in og: P[f'нет {need}'].append(r)
    if 'og:image' in og:
        ogimgs[og['og:image']] += 1
        if not og['og:image'].startswith('http'):
            P['og:image относительный (нужен абсолютный)'].append(f'{r} -> {og["og:image"]}')
    if 'twitter:card' not in src.lower(): P['нет twitter:card'].append(r)

    h1s = len(re.findall(r'<h1[\s>]', src, re.I))
    d['h1'] = h1s
    if h1s == 0: P['нет h1'].append(r)
    elif h1s > 1: P['несколько h1'].append(f'{r} (x{h1s})')

    imgs = re.findall(r'<img\b[^>]*>', src, re.I)
    d['img'] = len(imgs)
    noalt = [t for t in imgs if attr(t, 'alt') is None]
    emptyalt = [t for t in imgs if attr(t, 'alt') == '']
    lazy = [t for t in imgs if 'loading=' in t.lower()]
    d['img_noalt'] = len(noalt); d['img_lazy'] = len(lazy)
    if noalt: P['img без alt'].append(f'{r} (x{len(noalt)})')
    if emptyalt: P['img с пустым alt'].append(f'{r} (x{len(emptyalt)})')

    scripts = re.findall(r'<script\b[^>]*>', src, re.I)
    d['scripts'] = len(scripts)
    ext = [t for t in scripts if attr(t, 'src')]
    nodefer = [t for t in ext if 'defer' not in t and 'async' not in t]
    d['scripts_no_defer'] = len(nodefer)
    for t in nodefer:
        P['скрипт без defer/async'].append(f'{r} -> {attr(t, "src")}')
    jlds = re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', src, re.S | re.I)
    types = []
    for j in jlds:
        try:
            o = json.loads(j)
            items = o if isinstance(o, list) else [o]
            for it in items:
                if isinstance(it, dict) and '@type' in it:
                    types += it['@type'] if isinstance(it['@type'], list) else [it['@type']]
        except Exception as e:
            P['JSON-LD не парсится'].append(f'{r}: {e}')
    d['jsonld'] = types
    if not jlds: P['нет JSON-LD'].append(r)

    if 'mc.yandex' in src: d['metrika'] = True
    else: P['нет Яндекс.Метрики'].append(r)

    onclick = len(re.findall(r'\sonclick\s*=', src, re.I))
    d['onclick'] = onclick
    inline_style = len(re.findall(r'<style[\s>]', src, re.I))
    d['inline_style'] = inline_style

    if r in SERVICE_PAGES or r == '404.html':
        if 'noindex' not in (d.get('robots') or '').lower():
            P['служебная страница без noindex'].append(r)

    pages[r] = d

# ---- sitemap.xml ----
sm = open(os.path.join(ROOT, 'sitemap.xml'), encoding='utf-8').read()
sm_locs = re.findall(r'<loc>(.*?)</loc>', sm)
sm_set = {u.strip().rstrip('/') for u in sm_locs}
S['sitemap_urls'] = len(sm_locs)
S['sitemap_lastmod'] = sorted(set(re.findall(r'<lastmod>(.*?)</lastmod>', sm)))
file_urls = set()
for r in pages:
    u = f'https://{CANON_HOST}{CANON_BASE}/' + (r if r != 'index.html' else '')
    file_urls.add(u.rstrip('/'))
S['sitemap_missing'] = sorted(file_urls - sm_set)
S['sitemap_stale'] = sorted(u for u in sm_set - file_urls if u.startswith(f'https://{CANON_HOST}'))

# ---- robots.txt ----
S['robots_txt'] = open(os.path.join(ROOT, 'robots.txt'), encoding='utf-8').read().strip()

# ---- дубли title/description ----
S['dup_titles'] = [{'t': t, 'n': n, 'files': [f for f, d in pages.items() if d.get('title') == t]} for t, n in titles.items() if n > 1]
S['dup_desc'] = [{'n': n, 'd': dd[:80], 'files': [f for f, x in pages.items() if x.get('desc') == dd]} for dd, n in descs.items() if n > 1]
S['n_pages'] = len(pages)
S['langs'] = dict(langs)
S['og_images'] = ogimgs.most_common(5)

# ---- размеры файлов ----
sizes = []
tot = Counter(); cnt = Counter()
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
    for fn in filenames:
        fp = os.path.join(dirpath, fn)
        sz = os.path.getsize(fp)
        sizes.append((sz, rel(fp)))
        ext = os.path.splitext(fn)[1].lower() or 'none'
        tot[ext] += sz; cnt[ext] += 1
S['size_by_ext'] = {e: f'{tot[e]/1024:.0f} KB / {cnt[e]}' for e in tot}
S['top20_biggest'] = [(f'{s/1024:.0f} KB', r) for s, r in sorted(sizes, reverse=True)[:20]]

# ---- script src по страницам: кто и что грузит ----
root_js_use = Counter(); all_js_use = Counter()
for r, d in pages.items():
    src = open(os.path.join(ROOT, r), encoding='utf-8', errors='replace').read()
    for t in re.findall(r'<script\b[^>]*>', src, re.I):
        s = attr(t, 'src')
        if s:
            base = os.path.basename(s.split('?')[0])
            all_js_use[base] += 1
            if not base.startswith('-') and '/' not in s.replace('\\', '/').split('..')[-1]:
                if not s.startswith(('http', '/', '../js/')) and not s.startswith('js/'):
                    root_js_use[base] += 1
S['root_js_referenced'] = root_js_use.most_common()
S['js_universal'] = [(j, n) for j, n in all_js_use.most_common() if n >= 50]

# ---- style.css агрегатор ----
style = open(os.path.join(ROOT, 'style.css'), encoding='utf-8').read()
S['style_imports'] = re.findall(r'@import\s+url\(["\']?([^"\')]+)', style)

# ---- счётчики контента ----
S['n_hero_pages'] = len([r for r in pages if r.startswith('heroes/')])
S['n_guides'] = len([r for r in pages if r.startswith('guides/')])
S['n_item_icons'] = len([f for f in os.listdir(os.path.join(ROOT, 'images', 'items')) if f.lower().endswith(('.png', '.jpg', '.webp'))])

# ---- guides.html vs файлы ----
gsrc = open(os.path.join(ROOT, 'guides.html'), encoding='utf-8').read()
S['guides_linked'] = sorted(set(re.findall(r'guides/(guide-[\w-]+\.html)', gsrc)))
S['guides_files'] = sorted(os.listdir(os.path.join(ROOT, 'guides')))

# ---- favicon ----
fav = Counter()
for r, d in pages.items():
    src = open(os.path.join(ROOT, r), encoding='utf-8', errors='replace').read()
    for t in re.findall(r'<link\b[^>]*>', src, re.I):
        rl = (attr(t, 'rel') or '').lower()
        if 'icon' in rl: fav[(rl, attr(t, 'href'))] += 1
S['favicons'] = fav.most_common(10)
S['favicon_ico_exists'] = os.path.exists(os.path.join(ROOT, 'favicon.ico'))

print(json.dumps(S, ensure_ascii=False, indent=1))
print('\n===== ПРОБЛЕМЫ =====')
for k in sorted(P, key=lambda k: -len(P[k])):
    print(f'\n[{len(P[k])}] {k}')
    for x in P[k][:14]:
        print('   ', x)
    if len(P[k]) > 14: print(f'    ... и ещё {len(P[k]) - 14}')
