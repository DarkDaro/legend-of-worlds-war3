#!/usr/bin/env python3
"""Единый футер на всех страницах сайта.

Без зависимостей. Запуск из корня репозитория:
    python3 scripts/place-footer.py

Заменяет блок <footer class="site-footer">…</footer> на канонический
шаблон. Пути внутри шаблона получают префикс «../» для страниц в
подкаталогах (heroes/, guides/). Служебные каталоги (.git, archive,
repo-archive) и site-validator.html не обрабатываются.

Канонический футер: бренд, ссылки на разделы (Герои, Предметы, Гайды,
Калькулятор, Обновления, Информация, Поддержать), GitHub репозитория,
копирайт. Мёртвые соцсети (href="#") убраны: реальных ссылок на
сообщества у проекта нет, выдумывать запрещено правилом anti-slop.
"""
import re
import sys
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent
EXCLUDE_DIRS = {".git", "archive", "repo-archive", "docs", "scripts", "vendor"}
EXCLUDE_FILES = {"site-validator.html"}

GITHUB = "https://github.com/DarkDaro/legend-of-worlds-war3"
LINKS = [
    ("heroes.html", "Герои"),
    ("items.html", "Предметы"),
    ("guides.html", "Гайды"),
    ("calculator.html", "Калькулятор"),
    ("updates.html", "Обновления"),
    ("info.html", "Информация"),
    ("support.html", "Поддержать"),
]

TEMPLATE = """    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <span class="footer-logo"><img loading="lazy" src="{p}images/preview.png" alt="" width="28" height="28" class="footer-logo-img" decoding="async"> Legend of Worlds</span>
            </div>
            <div class="footer-links">
{links}
            </div>
            <div class="footer-social">
                <a href="{github}" title="GitHub репозиторий" aria-label="GitHub репозиторий карты" rel="noopener"><i class="fab fa-github"></i></a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025&ndash;2026 Legend of Worlds. Все права защищены.</p>
        </div>
    </footer>"""

FOOTER_RE = re.compile(r'<footer class="site-footer">.*?</footer>', re.DOTALL)


def render(prefix: str) -> str:
    links = "\n".join(
        f'                <a href="{prefix}{href}">{name}</a>'
        for href, name in LINKS
    )
    return TEMPLATE.format(p=prefix, links=links, github=GITHUB)


def main() -> int:
    replaced = skipped = multi = 0
    for path in sorted(SITE_ROOT.rglob("*.html")):
        rel = path.relative_to(SITE_ROOT)
        if rel.parts[0] in EXCLUDE_DIRS or path.name in EXCLUDE_FILES:
            continue
        html = path.read_text(encoding="utf-8")
        found = FOOTER_RE.findall(html)
        if not found:
            print(f"нет футера: {rel.as_posix()}")
            skipped += 1
            continue
        if len(found) > 1:
            print(f"ВНИМАНИЕ, футеров {len(found)}: {rel.as_posix()}")
            multi += 1
        prefix = "../" if len(rel.parts) > 1 else ""
        html = FOOTER_RE.sub(lambda _m: render(prefix), html, count=1)
        path.write_text(html, encoding="utf-8")
        replaced += 1
    print(f"заменено: {replaced}; без футера: {skipped}; с дубликатами: {multi}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
