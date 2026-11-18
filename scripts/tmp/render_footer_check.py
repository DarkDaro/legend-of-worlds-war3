#!/usr/bin/env python3
"""Рендер футера: скриншоты .site-footer + проверка overflow на 1280/360."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path("/home/z/my-project/_local/loww")
OUT = Path("/tmp/render")
OUT.mkdir(exist_ok=True)

jobs = [
    (ROOT / "index.html", 1280, "index-1280.png"),
    (ROOT / "index.html", 360, "index-360.png"),
    (ROOT / "heroes" / "admiral.html", 360, "admiral-360.png"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for path, width, name in jobs:
        page = browser.new_page(viewport={"width": width, "height": 900})
        page.goto(path.as_uri())
        page.wait_for_timeout(500)
        page.locator(".site-footer").screenshot(path=str(OUT / name))
        sw = page.evaluate("document.documentElement.scrollWidth")
        cw = page.evaluate("document.documentElement.clientWidth")
        icon_ok = page.evaluate(
            "(() => { const i = document.querySelector('.footer-logo-img');"
            " return i ? i.complete && i.naturalWidth > 0 : false; })()"
        )
        print(f"{name}: scrollWidth={sw} clientWidth={cw} "
              f"{'OVERFLOW!' if sw > cw else 'ok'}; иконка футера загрузилась: {icon_ok}")
        page.close()
    browser.close()
