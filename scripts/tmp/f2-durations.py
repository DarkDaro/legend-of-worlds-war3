#!/usr/bin/env python3
# f2-durations.py — F2, этап 1: standalone animation-duration/-delay и
# transition-duration/-delay получают множитель calc(var(--anim-speed, 1) * X).
# Однопроходный re.sub с колбэком — без сдвига офсетов (первая версия мутировала
# s внутри finditer и портила соседние декларации — ловушка зафиксирована).
# Шорткаты animation:/transition: не трогаются здесь — их ведёт f2-longhand.py
# (calc в шорткатах Chromium отбрасывает). Комментарии не трогаются (2.13),
# 0.01ms-ловушки reduced-motion не масштабируются. Идемпотентен по var(--anim-speed.
import re
from pathlib import Path

CSS = Path(__file__).resolve().parents[2] / "css"

PROP = re.compile(r"((?:animation|transition)-(?:duration|delay)\s*:\s*)([^;{}]+?)(\s*;)")
TIME = re.compile(r"(?<![\w.])(\d*\.?\d+)(m?s)(?![\w%.])")
SKIP = ("0.01ms",)

def repl(m):
    value = m.group(2)
    if any(sk in value for sk in SKIP) or "var(--anim-speed" in value:
        return m.group(0)
    nv = TIME.sub(lambda t: "calc(var(--anim-speed, 1) * " + t.group(0) + ")", value)
    return m.group(1) + nv + m.group(3)

def convert(text: str) -> str:
    out, buf, i, n = [], [], 0, len(text)
    while i < n:
        if text.startswith("/*", i):
            if buf:
                out.append(PROP.sub(repl, "".join(buf)))
                buf = []
            j = text.find("*/", i + 2)
            j = n if j == -1 else j + 2
            out.append(text[i:j])
            i = j
        else:
            buf.append(text[i])
            i += 1
    if buf:
        out.append(PROP.sub(repl, "".join(buf)))
    return "".join(out)

total = 0
for f in sorted(CSS.glob("*.css")):
    if f.name == "all.css":
        continue
    src = f.read_text(encoding="utf-8")
    dst = convert(src)
    if dst != src:
        c = dst.count("calc(var(--anim-speed, 1) *") - src.count("calc(var(--anim-speed, 1) *")
        f.write_text(dst, encoding="utf-8")
        total += c
        print(f"{f.name}: longhand {c}")
print(f"итого longhand-обёрнутых: {total}")
