#!/usr/bin/env python3
"""Для каждого [off]-блока: селекторы, которые реально используются И не имеют
живого (не отключённого) определения в подключённых css. Только такие = поломка.
"""
import re, pathlib

ROOT = pathlib.Path('/home/z/my-project/_local/loww')
CSS = ROOT / 'css'
MARKER = '[off 08.11 css-аудит]'

css_files = {p.name: p.read_text(encoding='utf-8') for p in CSS.glob('*.css')}

# какие css подключены на каких страницах
def css_links(html):
    return set(re.findall(r'css/([\w-]+\.css)', html))

html_texts = {}
for p in ROOT.glob('*.html'):
    html_texts[p.name] = p.read_text(encoding='utf-8', errors='ignore')
js_texts = {}
for p in (ROOT / 'js').glob('*.js'):
    js_texts[p.name] = p.read_text(encoding='utf-8', errors='ignore')
for p in ROOT.glob('js/**/*.js'):
    rel = str(p.relative_to(ROOT / 'js'))
    js_texts.setdefault(rel, p.read_text(encoding='utf-8', errors='ignore'))

def disabled_regions(text):
    out = []
    for m in re.finditer(re.escape(MARKER), text):
        start = text.find('/*', m.end())
        if start == -1: continue
        end = text.find('*/', start + 2)
        if end == -1: continue
        line = text.count('\n', 0, m.start()) + 1
        out.append((line, text[start + 2:end]))
    return out

def sel_names(css_text):
    css_text = re.sub(r'@(media|supports|keyframes)[^{]*\{', ' ', css_text)
    names = []
    for chunk in re.findall(r'([^{}]+)\{', css_text):
        for part in chunk.split(','):
            part = part.strip()
            for m in re.finditer(r'\.([a-zA-Z][a-zA-Z0-9_-]*)', part):
                names.append(('class', m.group(1), part.strip()))
    return names

def active_definitions(kind, name, fname, off_regions):
    """Есть ли определение селектора вне [off]-блоков в том же файле."""
    text = css_files[fname]
    # вырезаем все [off]-обёртки целиком (маркер + /* ... */)
    stripped = re.sub(re.escape(MARKER) + r'[^*]*?\*/\s*/\*.*?\*/', ' ', text, flags=re.S)
    pat = r'\.' + re.escape(name) + r'\s*[,{\s:]' if kind == 'class' else None
    if pat is None:
        return False
    return re.search(pat, stripped) is not None

broken = []
for fname, text in css_files.items():
    if fname == 'all.css':
        continue
    for line, region in disabled_regions(text):
        for kind, name, full_sel in sel_names(region):
            # используется ли где-то
            used_html = [h for h, b in html_texts.items() if re.search(r'["\'\s=]' + re.escape(name) + r'["\'\s]', b)]
            used_js = [h for h, b in js_texts.items() if re.search(r'["\'\s]' + re.escape(name) + r'["\'\s]', b)]
            if not used_html and not used_js:
                continue
            if active_definitions(kind, name, fname, disabled_regions(text)):
                continue
            # какие страницы подключают этот css и используют класс
            pages = [h for h in used_html if f'css/{fname}' in html_texts[h]]
            broken.append((fname, line, kind, name, full_sel[:60], pages[:4], used_html[:2], used_js[:2]))

print(f"Селекторов под реальным подозрением: {len(broken)}\n")
for f, line, kind, name, sel, pages, uh, uj in broken:
    print(f"  {f}:{line}  «{sel}»")
    if pages:
        print(f"      страницы с этим css: {', '.join(pages)}")
    if uh: print(f"      html: {', '.join(uh)}")
    if uj: print(f"      js:   {', '.join(uj)}")
