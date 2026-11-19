#!/usr/bin/env python3
"""Аудит тем, стилей и анимаций (задача владельца 19.11).
Без зависимостей. Запуск из корня репозитория:
    python3 scripts/tmp/audit_themes_styles.py

Проверки:
  A. Симметрия токенов по темам (base.css): что перекрашено в одной теме, но не в другой.
  B. THEME_COLORS (site-settings.js) против --bg-rgb тем.
  C. Хардкод-цвета в CSS вне :root/тематических блоков (кандидаты в токены).
  D. Остатки TD-2: литералы rgba(0,255,255,...) вне base/glass.
  E. z-index: карта значений и конфликты.
  F. Анимации: keyframes, infinite, transition-свойства (layout-перморманс).
  G. !important: инвентарь.
  H. Дубли селекторов между файлами (каскадные конфликты).
  I. Контраст WCAG текстовой шкалы и статусов на фоне каждой темы.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
CSS_FILES = sorted((ROOT / "css").glob("*.css")) + [
    ROOT / "map.css", ROOT / "aibot.css", ROOT / "info-auto-level.css"]
CSS_FILES = [p for p in CSS_FILES if p.exists()]

def rel(p): return str(p.relative_to(ROOT))

def strip_comments(text):
    return re.sub(r"/\*.*?\*/", "", text, flags=re.S)

# ── разбор base.css ──
base = (ROOT / "css/base.css").read_text(encoding="utf-8")
base_nc = strip_comments(base)

def blocks(text):
    """имя_блока -> тело, для селекторов html[data-theme=...] и :root"""
    out = {}
    for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', text):
        sel, body = m.group(1).strip(), m.group(2)
        out[sel] = out.get(sel, "") + body
    return out

def tokens_of(body):
    d = {}
    for line in body.split(";"):
        line = line.strip()
        if line.startswith("--"):
            name, _, val = line.partition(":")
            d[name.strip()] = val.strip()
    return d

b = blocks(base_nc)
root_tokens = tokens_of(b.get(":root", ""))
themes = {}
for sel, body in b.items():
    m = re.search(r'data-theme="([a-z]+)"', sel)
    if m:
        themes[m.group(1)] = tokens_of(body)

print("== A. Симметрия токенов тем ==")
print("тем в base.css: " + ", ".join(sorted(themes)))
all_over = {}
for t, d in themes.items():
    for k in d:
        all_over.setdefault(k, []).append(t)
for k, ts in sorted(all_over.items()):
    if len(ts) != len(themes):
        print(f"  НЕСИММЕТРИЯ: {k} только в {ts} (не в {sorted(set(themes)-set(ts))})")
else_full = [k for k, ts in all_over.items() if len(ts) == len(themes)]
print(f"  перекрашено во всех {len(themes)} темах: {len(else_full)} -> {else_full}")
# env-токены §6, которые обязаны перекрашиваться везде
env = ["--bg-rgb","--bg-deep-rgb","--bg-glow-rgb","--container-rgb","--panel-rgb",
       "--surface-rgb","--backdrop-rgb","--steel-rgb","--steel-deep-rgb",
       "--steel-blue-rgb","--panel-raised-rgb","--abyss-rgb","--cyan-rgb"]
missing = [t for t in themes for e in env if e not in themes[t]]
print(f"  окружение §6: {'полное покрытие' if not missing else 'ПРОПУСКИ: '+str(missing)}")

print("\n== B. THEME_COLORS против --bg-rgb ==")
ss = (ROOT / "js/site-settings.js").read_text(encoding="utf-8")
mm = re.search(r'THEME_COLORS = \{([^}]*)\}', ss)
tc = dict(re.findall(r"(\w+):\s*'([0-9a-f]{6})'", mm.group(1)))
def hexrgb(h): return tuple(int(h[i:i+2],16) for i in (0,2,4))
for name, hx in sorted(tc.items()):
    if name == "neon":
        bg = hexrgb("0b0e14")
    else:
        v = themes.get(name, {}).get("--bg-rgb", "")
        bg = tuple(int(x.strip()) for x in v.split(",")) if v else None
    okv = bg == hexrgb(hx) if bg else False
    print(f"  {name}: #{hx} vs bg {bg} -> {'ок' if okv else 'РАСХОЖДЕНИЕ'}")

print("\n== C. Хардкод-цвета вне токенов (по файлам) ==")
TOKEN_ZONE = re.compile(r'(:root\s*\{[^{}]*\}|html\[data-theme[^{}]*\{|html\[data-[a-z]+="[^"]*"\]\s*\{[^{}]*\}|html\[data-[a-z]+="[^"]*"\]\s*[^{}]*\{[^{}]*\})')
COLOR_RE = re.compile(r'(#[0-9a-fA-F]{3,8}\b|rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+|hsla?\(\s*[\d.]+)')
total = {}
for p in CSS_FILES:
    txt = strip_comments(p.read_text(encoding="utf-8"))
    # вырезаем тела :root и data-theme/data-anim/data-glass/data-text/data-decor блоков base/glass
    work = txt
    if p.name in ("base.css", "glass.css"):
        work = TOKEN_ZONE.sub("", txt)
        # data-* блоки с наследованием селекторов тоже вырезаем грубо: остальное посчитается
    hits = []
    for m in COLOR_RE.finditer(work):
        line = txt[:m.start()].count("\n") + 1
        val = m.group(0)
        hits.append((line, val))
    if hits:
        total[rel(p)] = hits
        from collections import Counter
        c = Counter(v for _, v in hits)
        top = ", ".join(f"{v}x{k}" for k, v in c.most_common(6))
        print(f"  {rel(p)}: {len(hits)} литералов [{top}]")
print(f"  ИТОГО литералов вне токенов: {sum(len(v) for v in total.values())} в {len(total)} файлах")

print("\n== D. Остатки TD-2: rgba(0,255,255,…) вне base/glass ==")
td2 = 0
for p in CSS_FILES:
    if p.name in ("base.css", "glass.css"):
        continue
    txt = strip_comments(p.read_text(encoding="utf-8"))
    n = len(re.findall(r'rgba?\(\s*0\s*,\s*255\s*,\s*255', txt))
    if n:
        print(f"  {rel(p)}: {n}")
        td2 += n
print(f"  ИТОГО: {td2}")

print("\n== E. Карта z-index ==")
zmap = {}
for p in CSS_FILES:
    txt = strip_comments(p.read_text(encoding="utf-8"))
    for m in re.finditer(r'([^{}]+)\{([^{}]*z-index\s*:\s*(-?\d+)[^{}]*)\}', txt):
        sel = " ".join(m.group(1).split())[:70]
        zmap.setdefault(int(m.group(3)), []).append((rel(p), sel))
for z in sorted(zmap):
    print(f"  {z}: " + " | ".join(f"{f}::{s}" for f, s in zmap[z]))

print("\n== F. Анимации ==")
kf = {}
for p in CSS_FILES:
    txt = strip_comments(p.read_text(encoding="utf-8"))
    for m in re.finditer(r'@keyframes\s+([\w-]+)', txt):
        kf.setdefault(m.group(1), rel(p))
print(f"  @keyframes ({len(kf)}): " + ", ".join(sorted(kf)))
inf = {}
layout_props = re.compile(r'transition[^;}]*\b(width|height|top|left|right|bottom|margin|padding)\b')
for p in CSS_FILES:
    txt = strip_comments(p.read_text(encoding="utf-8"))
    n_inf = len(re.findall(r'animation[^;}]*\binfinite\b', txt))
    if n_inf:
        inf[rel(p)] = n_inf
    for m in re.finditer(r'([^{}]+)\{([^{}]*transition[^{}]*)\}', txt):
        body = m.group(2)
        if layout_props.search(body):
            sel = " ".join(m.group(1).split())[:60]
            print(f"  LAYOUT-TRANSITION {rel(p)}::{sel} -> {' '.join(body.split())[:90]}")
print(f"  бесконечных animation-объявлений: {sum(inf.values())} -> {inf}")
# JS-циклы
js_files = sorted((ROOT / "js").glob("*.js"))
for p in js_files:
    t = p.read_text(encoding="utf-8")
    raf = t.count("requestAnimationFrame")
    seti = t.count("setInterval")
    if raf or seti:
        guard = []
        if "SiteSettings" in t: guard.append("SiteSettings")
        if "prefers-reduced-motion" in t or "reducedMotion" in t: guard.append("reduced-motion")
        if "matchMedia" in t: guard.append("matchMedia")
        print(f"  JS {rel(p)}: rAF={raf} setInterval={seti} охранны: {guard or 'НЕТ'}")

print("\n== G. !important ==")
imp = {}
for p in CSS_FILES:
    t = strip_comments(p.read_text(encoding="utf-8"))
    n = t.count("!important")
    if n: imp[rel(p)] = n
print("  " + ", ".join(f"{k}:{v}" for k, v in sorted(imp.items(), key=lambda x: -x[1])))

print("\n== H. Дубли селекторов между файлами ==")
def selectors(p):
    txt = strip_comments(p.read_text(encoding="utf-8"))
    out = {}
    for m in re.finditer(r'([^{}]+)\{', txt):
        sel = " ".join(m.group(1).split())
        if sel.startswith(("@", "/*")) or not sel: continue
        for s in sel.split(","):
            s = " ".join(s.split())
            if s: out.setdefault(s, 0)
            out[s] = out.get(s, 0) + 1
    return out
owner = {}
dups = {}
for p in CSS_FILES:
    for s, n in selectors(p).items():
        owner.setdefault(s, []).append(rel(p))
for s, fs in owner.items():
    if len(set(fs)) > 1 and not s.startswith((":root", "html", "*", "body")):
        dups.setdefault(tuple(sorted(set(fs))), []).append(s)
for fs, ss in sorted(dups.items(), key=lambda x: -len(x[1])):
    print(f"  {' + '.join(fs)}: {len(ss)} совп. -> {ss[:8]}{'…' if len(ss)>8 else ''}")

print("\n== I. Контраст WCAG по темам ==")
def lum(rgb):
    def f(c):
        c /= 255.0
        return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
    r, g, bl = rgb
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(bl)
def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi+0.05)/(lo+0.05)
def parse_rgb(v):
    return tuple(int(x.strip()) for x in v.split(","))
texts = {k: root_tokens[k] for k in ("--text-primary","--text-strong","--text-soft","--text-secondary","--text-muted","--text-dim")}
state = {"--gold-dim":"170, 170, 68", "--green-muted":"76, 175, 80", "--info-blue":"85, 170, 255"}
cases = [("неон", root_tokens["--bg-rgb"])] + [(t, themes[t]["--bg-rgb"]) for t in sorted(themes)]
print("  текстовая шкала (PRIMARY/STRONG/SOFT/SECONDARY/MUTED/DIM) на фоне темы:")
for name, bgv in cases:
    bg = parse_rgb(bgv)
    rs = [ratio(parse_rgb(re.search(r'#[0-9a-f]{6}', texts[k]).group(0).replace('#','') and texts[k][0:7] if texts[k].startswith('#') else texts[k], ) if False else hexrgb(re.search(r'#[0-9a-fA-F]{6}', texts[k]).group(0)[1:]), bg) for k in texts]
    print(f"    {name:10s} " + " ".join(f"{r:.1f}" for r in rs))
print("  статусные на фоне каждой темы (gold-dim / green-muted / info-blue):")
for name, bgv in cases:
    bg = parse_rgb(bgv)
    rs = [ratio(parse_rgb(v), bg) for v in state.values()]
    print(f"    {name:10s} " + " ".join(f"{r:.1f}" for r in rs))
print("  порог WCAG AA: обычный текст 4.5, крупный/UX 3.0")
