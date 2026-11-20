#!/usr/bin/env python3
"""Скан года в обслуживаемых страницах: что внутри футеров, что в контенте.

Sandbox-скрипт (в репо не попадает). Запуск:
    python3 /home/z/my-project/scripts/scan_footer_years.py
"""
import re
from pathlib import Path

ROOT = Path("/home/z/my-project/_local/loww")
EXCLUDE_DIRS = {".git", "archive", "repo-archive", "docs", "scripts", "vendor"}
FOOTER_RE = re.compile(r"<footer\b[^>]*>.*?</footer>", re.DOTALL)
YEAR_RE = re.compile(r"\b20\d{2}\b")

footer_hits = []
content_hits = []
copy_hits = []
footer_tags = {}

for path in sorted(ROOT.rglob("*.html")):
    rel = path.relative_to(ROOT)
    if rel.parts[0] in EXCLUDE_DIRS:
        continue
    html = path.read_text(encoding="utf-8")
    blocks = list(FOOTER_RE.finditer(html))
    footer_spans = [(m.start(), m.end()) for m in blocks]
    for m in blocks:
        cls = re.search(r'class="([^"]*)"', m.group(0))
        tag = cls.group(1) if cls else "(без класса)"
        footer_tags.setdefault(tag, 0)
        footer_tags[tag] += 1
        for ym in YEAR_RE.finditer(m.group(0)):
            ctx = re.sub(r"\s+", " ", m.group(0)[max(0, ym.start() - 60):ym.end() + 60])
            footer_hits.append(f"{rel.as_posix()}: {ym.group(0)} | …{ctx}…")
    for ym in YEAR_RE.finditer(html):
        if any(s <= ym.start() < e for s, e in footer_spans):
            continue
        ctx = re.sub(r"\s+", " ", html[max(0, ym.start() - 60):ym.end() + 60])
        if "2025" == ym.group(0):
            content_hits.append(f"{rel.as_posix()}: …{ctx}…")
    for cm in re.finditer(r"(&copy;|©)[^<\n]{0,80}", html):
        frag = re.sub(r"\s+", " ", cm.group(0))
        if "2025" in frag and not any(s <= cm.start() < e for s, e in footer_spans):
            copy_hits.append(f"{rel.as_posix()}: {frag}")

print("=== варианты тега <footer>:", footer_tags)
print(f"\n=== 2025 ВНУТРИ футеров: {len(footer_hits)}")
for line in footer_hits:
    print(" ", line)
print(f"\n=== ©-строки с 2025 ВНЕ футеров: {len(copy_hits)}")
for line in copy_hits:
    print(" ", line)
print(f"\n=== прочие 2025 в контенте (НЕ трогаем): {len(content_hits)}")
for line in content_hits[:40]:
    print(" ", line)
if len(content_hits) > 40:
    print(f"  … и ещё {len(content_hits) - 40}")
