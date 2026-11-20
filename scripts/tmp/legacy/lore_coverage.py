#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Покрытие лора: heroId (hero-data.js) vs ключи HERO_LORE (hero-lore.js) vs heroes/*.html."""
import re
from pathlib import Path

REPO = Path("/home/z/my-project/_local/loww")

# heroId из hero-data.js
hd = (REPO / "hero-data.js").read_text(encoding="utf-8")
ids_data = re.findall(r"heroId:\s*'([a-z0-9-]+)'", hd)

# ключи HERO_LORE из hero-lore.js (первые ключи объекта)
hl = (REPO / "hero-lore.js").read_text(encoding="utf-8")
m = re.search(r"const\s+HERO_LORE\s*=\s*\{", hl)
body = hl[m.end():]
keys_lore = re.findall(r"^\s{2}'([a-z0-9-]+)':\s*\{", body, re.M)

# файлы страниц
pages = {p.stem for p in (REPO / "heroes").glob("*.html")}

d, l = set(ids_data), set(keys_lore)
print(f"heroId в hero-data.js : {len(d)}")
print(f"ключей в HERO_LORE    : {len(l)}")
print(f"страниц heroes/*.html : {len(pages)}")

for label, extra in (("в hero-data, нет в лоре", d - l),
                     ("в лоре, нет в hero-data", l - d),
                     ("страница без лора", pages - l),
                     ("лор без страницы", l - pages),
                     ("hero-data без страницы", d - pages),
                     ("страница без hero-data", pages - d)):
    if extra:
        print(f"\n{label} ({len(extra)}): {sorted(extra)}")
    else:
        print(f"\n{label}: —")

# пустые/короткие лоры и нули в hero-data
empty_desc = []
for km in re.finditer(r"^\s{2}'([a-z0-9-]+)':\s*\{(. *?)^\s{2}\},", body, re.M | re.S):
    kid, blk = km.group(1), km.group(2)
    dm = re.search(r"description:\s*'([^']*)'", blk)
    lm = re.search(r"lore:\s*'([^']*)'", blk)
    desc = dm.group(1) if dm else ""
    lore = lm.group(1) if lm else ""
    if len(desc) < 20 or len(lore) < 80:
        empty_desc.append((kid, len(desc), len(lore)))
print(f"\nподозрительно короткие description/lore: {empty_desc if empty_desc else '—'}")

zeros = re.findall(r"\{[^{}]*?heroId:\s*'([a-z0-9-]+)'[^{}]*\}", hd)
zero_fields = []
for block in re.finditer(r"\{[^{}]*heroId[^{}]*\}", hd):
    b = block.group(0)
    hid = re.search(r"heroId:\s*'([a-z0-9-]+)'", b)
    if hid and re.search(r":\s*0[,}]", b):
        zero_fields.append(hid.group(1))
print(f"герои с нулевыми статами: {len(zero_fields)}: {zero_fields[:20]}")
