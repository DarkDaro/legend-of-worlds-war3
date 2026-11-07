#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Сверка витринных чисел с фактикой.

site-counters.js — единственный источник чисел для мета-описаний и
текстов. Этот скрипт считает фактические значения из баз данных и
сравнивает их с константами, а также проверяет, что на витринных
страницах (index, heroes, info) стоят согласованные числа.

Запуск: python scripts/check-counters.py
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
errors = []


def fail(msg):
    errors.append(msg)


# --- константы из site-counters.js ---
sc = (REPO / "site-counters.js").read_text(encoding="utf-8")
C = {k: int(v) for k, v in re.findall(r"(\w+):\s*(\d+)", sc.split("var SITE_COUNTERS")[1])}

# --- фактика ---
hd = (REPO / "hero-data.js").read_text(encoding="utf-8")
wip = len(re.findall(r"\bwip:\s*true\b", hd))
alt = len(re.findall(r"\bisAltForm:\s*true\b", hd))
total_heroes = len(re.findall(r"heroId:\s*'", hd))
fact_heroes = total_heroes - wip - alt

hero_pages = len(list((REPO / "heroes").glob("*.html")))
lore_keys = len(re.findall(r"^\s{2}'[a-z0-9-]+':\s*\{", (REPO / "hero-lore.js").read_text(encoding="utf-8"), re.M))

items = (REPO / "items-db.js").read_text(encoding="utf-8")
fact_items_total = len(re.findall(r"\bid:\s*'", items))
fact_items_runes = len(re.findall(r"type:\s*'rune'", items))

creeps = (REPO / "creeps-db.js").read_text(encoding="utf-8")
m = re.search(r"(?:var|const)\s+CREEPS\w*\s*=\s*\[(.*?)\n\];", creeps, re.S)
fact_creeps = len(re.findall(r"\btier:\s*\d", m.group(1))) if m else -1

# --- витринные тексты ---
idx = (REPO / "index.html").read_text(encoding="utf-8")
her = (REPO / "heroes.html").read_text(encoding="utf-8")
info = (REPO / "info.html").read_text(encoding="utf-8")


def count_claim(text, n, unit):
    return len(re.findall(rf"\b{n}\s+{unit}", text))


# --- сравнение ---
def eq(name, key, fact):
    if C.get(key) != fact:
        fail(f"{name}: site-counters.js {key}={C.get(key)}, фактика={fact}")


eq("Каталог героев", "heroes", fact_heroes)
eq("Страницы героев", "heroPages", hero_pages)
eq("Лоры", "lores", lore_keys)
eq("Предметы всего", "itemsTotal", fact_items_total)
eq("Руны-предметы", "itemsRunes", fact_items_runes)
eq("Артефакты", "artifacts", fact_items_total - fact_items_runes)
eq("Крипы", "creeps", fact_creeps)
if C["artifacts"] != C["itemsTotal"] - C["itemsRunes"]:
    fail(f"artifacts={C['artifacts']} ≠ itemsTotal−itemsRunes={C['itemsTotal']-C['itemsRunes']}")
if C["lores"] != C["heroPages"]:
    fail(f"lores={C['lores']} ≠ heroPages={C['heroPages']}")

# витринные упоминания: мета-описания и стат-блоки
meta_re = re.compile(r'<meta (?:name|property)="(?:description|og:description|twitter:description)" content="([^"]+)"')
metas_idx = meta_re.findall(idx)
metas_her = meta_re.findall(her)

for src, metas in (("index.html", metas_idx), ("heroes.html", metas_her)):
    for text in metas:
        nums = {int(n) for n, u in re.findall(r"\b(\d+)\s+(геро[йяе]\w*)", text)}
        if nums != {C["heroes"]}:
            fail(f"{src}: в мете числа героев {sorted(nums)} вместо {C['heroes']}: {text[:70]}")

jsonld = re.search(r'"description":\s*"([^"]+)"', idx)
if jsonld and f"{C['heroes']} героя" not in jsonld.group(1):
    fail(f"index.html: JSON-LD description без «{C['heroes']} героя»")

if f'data-target="{C["heroes"]}"' not in idx:
    fail(f"index.html: стат-блок не {C['heroes']}")
if f"{C['artifacts']} артефакта" not in idx:
    fail(f"index.html: нет «{C['artifacts']} артефакта» в мете/тексте")
if f"В карте {C['heroes']} героя" not in info:
    fail(f"info.html: нет фразы «В карте {C['heroes']} героя»")

print(f"каталог героев {fact_heroes} | страниц {hero_pages} | лоров {lore_keys}")
print(f"предметов {fact_items_total} (рун {fact_items_runes}) | артефактов {fact_items_total - fact_items_runes} | крипов {fact_creeps}")

if errors:
    print("\nРАСХОЖДЕНИЯ:")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("\nВсе числа сходятся с site-counters.js")
