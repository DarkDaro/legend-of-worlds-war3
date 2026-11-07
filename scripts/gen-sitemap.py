#!/usr/bin/env python3
"""Генератор sitemap.xml: обходит HTML-страницы, lastmod берёт из git.

Без зависимостей (python3 + git). Запуск из корня репозитория:
    python3 scripts/gen-sitemap.py

Исключения зашиты явно:
  - служебные каталоги .git/, archive/, repo-archive/, docs/, scripts/;
  - 404.html (не индексируется по назначению);
  - site-validator.html (noindex, nofollow).
Даты: последний коммит, касающийся файла (git log -1 --format=%as);
для файла без истории — дата запуска. Порядок записей — алфавитный
по пути, детерминированный.
"""
import subprocess
import sys
from datetime import date
from pathlib import Path

BASE = "https://darkdaro.github.io/legend-of-worlds-war3/"
EXCLUDE_DIRS = {".git", "archive", "repo-archive", "docs", "scripts", "vendor"}
EXCLUDE_FILES = {"404.html", "site-validator.html"}
SITE_ROOT = Path(__file__).resolve().parent.parent


def git_lastmod(path: Path) -> str:
    out = subprocess.run(
        ["git", "log", "-1", "--format=%as", "--", path.as_posix()],
        cwd=SITE_ROOT, capture_output=True, text=True,
    )
    stamp = out.stdout.strip()
    return stamp if stamp else date.today().isoformat()


def pages() -> list[Path]:
    found = []
    for p in sorted(SITE_ROOT.rglob("*.html")):
        rel = p.relative_to(SITE_ROOT)
        if rel.parts[0] in EXCLUDE_DIRS:
            continue
        if p.name in EXCLUDE_FILES:
            continue
        found.append(rel)
    return found


def main() -> int:
    rows = []
    for rel in pages():
        rows.append(
            "  <url>\n"
            f"    <loc>{BASE}{rel.as_posix()}</loc>\n"
            f"    <lastmod>{git_lastmod(rel)}</lastmod>\n"
            "  </url>"
        )
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(rows) + "\n</urlset>\n"
    )
    (SITE_ROOT / "sitemap.xml").write_text(xml, encoding="utf-8")
    print(f"sitemap.xml: {len(rows)} URL")
    return 0


if __name__ == "__main__":
    sys.exit(main())
