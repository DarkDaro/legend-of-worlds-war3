#!/usr/bin/env python3
"""Проверка ширины контейнеров после расширения + overflow + 2 скриншота."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path("/home/z/my-project/_local/loww")
OUT = Path("/tmp/render")
OUT.mkdir(exist_ok=True)

# (страница, ширина, селектор контейнера, скриншот)
jobs = [
    ("index.html", 1920, ".wiki-container", "index-1920.png"),
    ("index.html", 1280, ".wiki-container", None),
    ("index.html", 360, ".wiki-container", None),
    ("heroes/admiral.html", 1280, ".hero-page-container", "admiral-1280.png"),
    ("heroes/admiral.html", 360, ".hero-page-container", None),
    ("guides/guide-admiral.html", 1280, ".wiki-container", None),
    ("mechanics.html", 1280, ".wiki-container", None),
    ("items.html", 1920, ".wiki-container", None),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for page_rel, width, sel, shot in jobs:
        page = browser.new_page(viewport={"width": width, "height": 1000})
        page.goto((ROOT / page_rel).as_uri())
        page.wait_for_timeout(500)
        box = page.locator(sel).first.bounding_box()
        sw = page.evaluate("document.documentElement.scrollWidth")
        cw = page.evaluate("document.documentElement.clientWidth")
        status = "OVERFLOW!" if sw > cw else "ok"
        print(f"{page_rel} @{width}: {sel} width={box['width']:.0f}px "
              f"(x={box['x']:.0f}) scroll={sw}/{cw} {status}")
        if shot:
            page.locator(sel).first.screenshot(path=str(OUT / shot))
        page.close()
    browser.close()
