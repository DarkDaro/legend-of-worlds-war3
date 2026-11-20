#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Проверка defer-последовательности скриптов на страницах.

Правило (документировано в docs/JS-MAP.md и docs/ARCHITECTURE.md):
базы js/data/* должны идти раньше парсера js/item-bonus-parser.js,
парсер — раньше контроллеров страницы (js/*-page.js, js/calculator.js,
js/build-constructor.js). Контроллер ожидается последним script-тегом.

Запуск: python3 scripts/tmp/defer-order-check.py
Только отчёт, ничего не меняет.
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
errors, pages = [], 0

def kind(src):
    if src.startswith("js/data/"):
        return "data"
    if src == "js/item-bonus-parser.js":
        return "parser"
    if re.fullmatch(r"js/[\w-]+-page\.js", src) or src in ("js/calculator.js", "js/build-constructor.js"):
        return "controller"
    return "service"  # search, icon-loader, analytics, ui-effects, site-settings, tilt-cards

for html in sorted(REPO.rglob("*.html")):
    rel = html.relative_to(REPO).as_posix()
    if rel.startswith("repo-archive") or rel == "site-validator.html":
        continue
    text = html.read_text(encoding="utf-8")
    srcs = re.findall(r'<script[^>]+src="([^"]+\.js)"', text)
    if not srcs:
        continue
    pages += 1
    seq = [kind(s) for s in srcs]
    first_ctrl = seq.index("controller") if "controller" in seq else -1
    last_data = max((i for i, k in enumerate(seq) if k == "data"), default=-1)
    last_parser = max((i for i, k in enumerate(seq) if k == "parser"), default=-1)
    if first_ctrl == -1:
        continue  # страницы без контроллера (index, lore…) — порядок не критичен
    if first_ctrl < last_data:
        errors.append(f"{rel}: контроллер на позиции {first_ctrl + 1} раньше базы на {last_data + 1}")
    if first_ctrl < last_parser:
        errors.append(f"{rel}: контроллер раньше парсера бонусов")

print(f"страниц с script-тегами: {pages}; нарушений порядка: {len(errors)}")
for e in errors:
    print("  " + e)
sys.exit(1 if errors else 0)
