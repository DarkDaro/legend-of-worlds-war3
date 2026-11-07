#!/usr/bin/env python3
"""Сборка css/all.css из @import-списка style.css и замена
ссылок на страницах.

Без зависимостей. Запуск из корня репозитория:
    python3 scripts/build-css-bundle.py

Что делает:
  1. читает repo-archive/style.css (перенесён из корня в e4b72f6
     по правилу «файлы не удалять»), извлекает порядок @import url('css/…');
  2. конкатенирует файлы в том же порядке в css/all.css (каскад
     идентичен прежнему: тот же набор, тот же порядок, те же байты);
  3. заменяет в HTML-страницах href="style.css" → href="css/all.css"
     (и ../style.css → ../css/all.css в подкаталогах) — идемпотентно.

Файл style.css скрипт не трогает и не удаляет.
"""
import re
import sys
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent
STYLE = SITE_ROOT / "repo-archive" / "style.css"
BUNDLE = SITE_ROOT / "css" / "all.css"
IMPORT_RE = re.compile(r"@import\s+url\('([^']+)'\);")
EXCLUDE_DIRS = {".git", "archive", "repo-archive", "docs", "scripts", "vendor"}
EXCLUDE_FILES = {"site-validator.html"}

HEADER = (
    "/* Единый сбор стилей сайта: конкатенация 14 файлов по порядку\n"
    "   @import из style.css. Генератор: scripts/build-css-bundle.py.\n"
    "   После правки любого css/*.css — перезапустить генератор. */\n\n"
)


def build() -> list[str]:
    parts = []
    order = IMPORT_RE.findall(STYLE.read_text(encoding="utf-8"))
    if not order:
        sys.exit("style.css: @import не найдены — сборка прервана")
    for rel in order:
        path = SITE_ROOT / rel
        parts.append(f"/* === {rel} === */\n\n" + path.read_text(encoding="utf-8"))
    BUNDLE.write_text(HEADER + "\n".join(parts), encoding="utf-8")
    return order


def switch(order: list[str]) -> int:
    n = 0
    for path in sorted(SITE_ROOT.rglob("*.html")):
        rel = path.relative_to(SITE_ROOT)
        if rel.parts[0] in EXCLUDE_DIRS or path.name in EXCLUDE_FILES:
            continue
        html = path.read_text(encoding="utf-8")
        new = html.replace('href="style.css"', 'href="css/all.css"')
        new = new.replace('href="../style.css"', 'href="../css/all.css"')
        if new != html:
            path.write_text(new, encoding="utf-8")
            n += 1
    return n


def main() -> int:
    order = build()
    print("порядок сборки:")
    for i, rel in enumerate(order, 1):
        print(f"  {i:2}. {rel}")
    print(f"css/all.css: {BUNDLE.stat().st_size} байт")
    print(f"страниц переключено: {switch(order)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
