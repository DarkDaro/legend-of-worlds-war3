#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Инвентаризация JS: какие файлы есть, кто их подключает, сироты."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/_local/loww")

# все js/mjs вне repo-archive
files = sorted([p for p in REPO.rglob("*.js") if "repo-archive" not in p.parts and "node_modules" not in p.parts]
               + [p for p in REPO.rglob("*.mjs") if "repo-archive" not in p.parts])

# скан подключений по всем html
htmls = [p for pat in ("*.html", "*/*.html") for p in REPO.glob(pat)
         if "repo-archive" not in p.parts]
conn = {}
for h in htmls:
    t = h.read_text(encoding="utf-8", errors="replace")
    for m in re.finditer(r'<script[^>]+src="([^"]+\.js)"', t):
        src = m.group(1).split("?")[0]
        # нормализуем к пути от корня
        cand = (h.parent / src).resolve()
        try:
            rel = cand.relative_to(REPO).as_posix()
        except ValueError:
            rel = src
        conn.setdefault(rel, set()).add(h.relative_to(REPO).as_posix())

print(f"JS-файлов: {len(files)}, HTML-страниц: {len(htmls)}")
orphans = []
for f in files:
    rel = f.relative_to(REPO).as_posix()
    size = f.stat().st_size
    pages = sorted(conn.get(rel, []))
    if not pages:
        orphans.append(rel)
    print(f"{rel:38} {size//1024:5d}K  страниц: {len(pages)}")
    if pages and (len(pages) <= 6 or rel.split('/')[0] == 'js'):
        for p in pages[:8]:
            print(f"    {p}")
        if len(pages) > 8:
            print(f"    … ещё {len(pages)-8}")

print("\nСИРОТЫ (нигде не подключены через <script src>):")
for o in orphans:
    print(" -", o)
