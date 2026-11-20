#!/usr/bin/env python3
"""Сканер остатков текстового прохода: ищет в HTML паттерны, которые
предыдущая сессия правила по уже пройденным страницам.

Паттерны:
  A) "<strong>Термин</strong> — "   (термин с тире-пояснением)
  B) "<strong>Термин:</strong> X — Y" (водяное тире в пояснении)
  C) частотные водяные фразы («это не ..., а», «Ниже — », « — это »)
Только контентный текст: строки с тегами внутри <body>, без URL/классов.
"""
import re
import sys
from pathlib import Path

SITE = Path("/home/z/my-project/_local/loww")

# Страницы, уже пройденные в этом проходе (пропускаем).
DONE = {
    "index.html", "faq.html", "info.html", "mechanics.html", "support.html",
    "updates.html", "changelog.html", "aibot.html", "guides.html",
    "events.html", "modes.html", "storage.html", "monsters.html",
    "map-changes.html", "404.html", "sitemap-page.html",
}

PATTERNS = [
    ("A:strong-тире", re.compile(r"<strong>[^<]+</strong>\s+—\s")),
    ("B:тире-после-двоеточия", re.compile(r"<strong>[^<]+:</strong>[^<]*—")),
    ("C:вода-это-не", re.compile(r"—\s*это\s+не\b[^.]{0,40}а\b")),
    ("C:ниже-тире", re.compile(r"Ниже\s+—")),
    ("C:это-то-что", re.compile(r"—\s*это\s+то,?\s+что")),
    ("C:основа-это", re.compile(r"—\s*основа\b")),
]


def visible_lines(text: str):
    """Строки HTML, содержащие видимый текст (вырезаем теги для проверки)."""
    for i, line in enumerate(text.splitlines(), 1):
        stripped = re.sub(r"<[^>]+>", "", line).strip()
        if len(stripped) >= 15:  # интересует только содержательный текст
            yield i, line, stripped


def main():
    pages = sorted(SITE.rglob("*.html"))
    report = {}
    for page in pages:
        rel = page.relative_to(SITE)
        if rel.parts[0] not in (".",) and rel.parts[0] in ("vendor", "repo-archive"):
            continue
        if page.name in DONE:
            continue
        text = page.read_text(encoding="utf-8")
        hits = []
        for i, line, plain in visible_lines(text):
            for label, pat in PATTERNS:
                if pat.search(line):
                    hits.append((label, i, plain[:110]))
        if hits:
            report[str(rel)] = hits

    total = 0
    for page, hits in sorted(report.items(), key=lambda kv: -len(kv[1])):
        total += len(hits)
        print(f"\n### {page} — {len(hits)} попаданий")
        for label, line_no, snippet in hits[:12]:
            print(f"  [{label}] :{line_no}: {snippet}")
        if len(hits) > 12:
            print(f"  ... ещё {len(hits) - 12}")
    print(f"\nИТОГО: {total} попаданий на {len(report)} страницах")


if __name__ == "__main__":
    main()
