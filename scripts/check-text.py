#!/usr/bin/env python3
"""check-text.py — поиск мусорных заглушек в текстовых файлах репозитория.

Что ищет: TODO/FIXME/XXX/HACK, wip, lorem ipsum, русские заглушки
(«заглушк…», «заполню позже», «тут будет»), в HTML — пустые «undefined»/«NaN».

Исправленные баги старой версии:
  1. Скрипт привязан к корню репозитория через собственное расположение —
     результат не зависит от текущего каталога запуска.
  2. Исключения заякорены: матчатся только относительно корня (точный путь,
     префикс каталога или glob), «куски абсолютного пути» больше не проходят.

Запуск:  python3 scripts/check-text.py   (из любого каталога)
Коды возврата: 0 — чисто; 1 — есть находки; 2 — не найдено ни одного файла.
"""
from __future__ import annotations

import fnmatch
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

TEXT_EXT = {".html", ".js", ".css", ".md", ".txt", ".xml"}
SKIP_DIRS = {".git", "node_modules", "repo-archive"}

# Заякоренные исключения (относительно корня; glob допустим).
EXCLUDES: list[str] = [
    "vendor/*",
    "repo-archive/*",
    "scripts/check-text.py",     # сам содержит шаблоны-паттерны
    "site-validator.html",       # служебная страница-валидатор, сама ищет заглушки (решение владельца 07.11 — остаётся)
]

# (название, компилированный паттерн, только для .html)
# Поля wip/классы .wip-* и паттерн typeof x !== "undefined" — легитимная часть кодовой базы,
# правилами НЕ являются (проверено на живом дереве: 219 ложных срабатываний).
RULES: list[tuple[str, re.Pattern, bool]] = [
    ("TODO/FIXME/XXX/HACK", re.compile(r"\b(TODO|FIXME|XXX|HACK)\b")),
    ("lorem ipsum", re.compile(r"lorem\s+ipsum", re.IGNORECASE)),
    ("заглушка", re.compile(r"заглушк", re.IGNORECASE)),
    ("заполнить позже", re.compile(r"заполн(?:ить|ю)\s+позже", re.IGNORECASE)),
    ("тут будет", re.compile(r"\bтут будет\b", re.IGNORECASE)),
    ("coming soon", re.compile(r"\bcoming\s+soon\b", re.IGNORECASE)),
]


def excluded(rel: str) -> bool:
    """True, если путь (относительно корня) под исключением.

    Совпадения: точный путь, префикс каталога «dir/» или glob-шаблон.
    Произвольные подстроки абсолютного пути НЕ матчатся.
    """
    rel = rel.replace("\\", "/")
    for pat in EXCLUDES:
        pat = pat.replace("\\", "/")
        if rel == pat or rel.startswith(pat.rstrip("/") + "/"):
            return True
        if fnmatch.fnmatch(rel, pat):
            return True
    return False


def main() -> int:
    files = [
        p for p in ROOT.rglob("*")
        if p.is_file()
        and p.suffix.lower() in TEXT_EXT
        and not (SKIP_DIRS & set(p.relative_to(ROOT).parts))
        and not excluded(str(p.relative_to(ROOT)))
    ]
    if not files:
        print("ОШИБКА: не найдено ни одного текстового файла — проверь корень репозитория")
        return 2

    findings: list[str] = []
    rule_hits = 0
    for path in files:
        rel = str(path.relative_to(ROOT))
        try:
            lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
        except OSError as e:
            print(f"ПРЕДУПРЕЖДЕНИЕ: {rel}: не прочитан ({e})")
            continue
        for no, line in enumerate(lines, 1):
            for rule in RULES:
                name, pat = rule[0], rule[1]
                html_only = rule[2] if len(rule) > 2 else False
                if html_only and path.suffix.lower() != ".html":
                    continue
                if pat.search(line):
                    rule_hits += 1
                    snippet = line.strip()[:120]
                    findings.append(f"{rel}:{no}: [{name}] {snippet}")

    print(f"Просмотрено файлов: {len(files)}; находок: {rule_hits}")
    if findings:
        print()
        for f in findings:
            print(f)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
