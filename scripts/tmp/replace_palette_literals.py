#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Замена литералов палитры :root на var(). Только точные совпадения значений,
нулевое изменение рендера. all.css пропускается (бандл), в base.css
пропускаются строки-определения переменных (--x: ...). Комментарии не трогаем.
"""
import re, os, collections

ROOT = "/home/z/my-project/_local/loww/css"
BUNDLE = "all.css"

REPLACEMENTS = [
    # (regex, замена, человекочитаемое имя)
    (re.compile(r"#00e6ff\b", re.I), "var(--accent-cyan)", "#00e6ff → var(--accent-cyan)"),
    (re.compile(r"#e0f0ff\b", re.I), "var(--text-primary)", "#e0f0ff → var(--text-primary)"),
    (re.compile(r"#8aa0c0\b", re.I), "var(--text-secondary)", "#8aa0c0 → var(--text-secondary)"),
    (re.compile(r"#5a7a9a\b", re.I), "var(--text-dim)", "#5a7a9a → var(--text-dim)"),
    (re.compile(r"#6b7c99\b", re.I), "var(--text-muted)", "#6b7c99 → var(--text-muted)"),
    (re.compile(r"rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.12\s*\)"), "var(--glass-border)", "rgba(0,230,255,.12) → var(--glass-border)"),
    (re.compile(r"rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.35\s*\)"), "var(--glass-border-hover)", "rgba(0,230,255,.35) → var(--glass-border-hover)"),
    (re.compile(r"rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*0\.5\s*\)"), "var(--glass-bg)", "rgba(15,23,42,.5) → var(--glass-bg)"),
    (re.compile(r"rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*0\.65\s*\)"), "var(--glass-bg-hover)", "rgba(15,23,42,.65) → var(--glass-bg-hover)"),
    (re.compile(r"0\s+0\s+20px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.2\s*\)\s*,\s*0\s+0\s+60px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.08\s*\)"),
     "var(--neon-glow)", "полная композиция → var(--neon-glow)"),
    (re.compile(r"0\s+0\s+20px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.4\s*\)\s*,\s*0\s+0\s+60px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.15\s*\)\s*,\s*inset\s+0\s+0\s+15px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.03\s*\)"),
     "var(--neon-glow-strong)", "полная композиция → var(--neon-glow-strong)"),
]

DEF_RE = re.compile(r"^\s*--[a-z0-9-]+\s*:")
total = collections.Counter()
per_file = collections.defaultdict(collections.Counter)

files = sorted(f for f in os.listdir(ROOT) if f.endswith(".css") and f != BUNDLE)
for fn in files:
    path = os.path.join(ROOT, fn)
    lines = open(path, encoding="utf-8").read().splitlines(keepends=True)
    out, in_comment = [], False
    changed = False
    for ln in lines:
        original = ln
        # состояние блочного комментария
        code, comment = "", ""
        if in_comment:
            end = ln.find("*/")
            if end == -1:
                out.append(ln)
                continue
            in_comment = False
            code = ln[end + 2:]
        else:
            c = ln.find("/*")
            if c != -1 and ln.find("*/", c) == -1:
                in_comment = True
            cpos = ln.find("/*")
            if cpos != -1:
                code, comment = ln[:cpos], ln[cpos:]
            else:
                code, comment = ln, ""
        # строки-определения переменных в base.css не трогаем
        if fn == "base.css" and DEF_RE.match(code):
            out.append(original)
            continue
        for rx, repl, name in REPLACEMENTS:
            new_code, n = rx.subn(repl, code)
            if n:
                total[name] += n
                per_file[fn][name] += n
                code = new_code
                changed = True
        if code != original[:len(code)] or (comment and code != original[:len(code)]):
            pass
        if changed and code + comment != original:
            out.append(code + comment)
        else:
            out.append(original)
    if changed:
        open(path, "w", encoding="utf-8").write("".join(out))

print("=== Замены по типам ===")
for k, v in total.most_common():
    print(f"{v:4d}× {k}")
print(f"\nИТОГО: {sum(total.values())} замен в {len(per_file)} файлах\n")
print("=== По файлам ===")
for fn in sorted(per_file, key=lambda x: -sum(per_file[x].values())):
    print(f"{fn}: {sum(per_file[fn].values())}")
