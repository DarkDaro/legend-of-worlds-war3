#!/usr/bin/env python3
# p11-convert.py — P11 (TD-15): нейтральные белый и чёрный живых css на примитивы.
# Что делает: в живом коде (вне /* */) заменяет
#   rgba(255,255,255,a) -> rgba(var(--white-rgb), a)   rgba(0,0,0,a) -> rgba(var(--black-rgb), a)
#   #ffffff44 -> rgba(var(--white-rgb), 0.2667)        #00000055 -> rgba(var(--black-rgb), 0.333)
#   #ffffff / #fff -> var(--white)
# Идемпотентен: var(--white-rgb)/var(--black-rgb)/var(--white) не матчатся.
# Комментарии не трогает (правило 2.13). Файлы: css/*.css, кроме all.css (бандл).
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # .../loww
CSS = ROOT / "css"

SUBS = [
    (re.compile(r"rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*([0-9]*\.?[0-9]+)\s*\)"), r"rgba(var(--white-rgb), \1)"),
    (re.compile(r"rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*([0-9]*\.?[0-9]+)\s*\)"), r"rgba(var(--black-rgb), \1)"),
    (re.compile(r"#ffffff44(?![0-9a-fA-F])"), "rgba(var(--white-rgb), 0.2667)"),
    (re.compile(r"#00000055(?![0-9a-fA-F])"), "rgba(var(--black-rgb), 0.333)"),
    (re.compile(r"#ffffff(?![0-9a-fA-F])"), "var(--white)"),
    (re.compile(r"#fff(?![0-9a-fA-F])"), "var(--white)"),
]

def convert(text: str) -> str:
    out, buf, i, n = [], [], 0, len(text)
    while i < n:
        if text.startswith("/*", i):
            if buf:
                s = "".join(buf)
                for rx, rep in SUBS:
                    s = rx.sub(rep, s)
                out.append(s)
                buf = []
            j = text.find("*/", i + 2)
            j = n if j == -1 else j + 2
            out.append(text[i:j])
            i = j
        else:
            buf.append(text[i])
            i += 1
    if buf:
        s = "".join(buf)
        for rx, rep in SUBS:
            s = rx.sub(rep, s)
        out.append(s)
    return "".join(out)

total_files = 0
total_subs = 0
for f in sorted(CSS.glob("*.css")):
    if f.name == "all.css":
        continue
    src = f.read_text(encoding="utf-8")
    dst = convert(src)
    if dst != src:
        # число фактических замен: длина различий не метрика, считаем по паттернам до/после
        before_cnt = sum(len(rx.findall(src)) for rx, _ in SUBS)
        after_cnt = sum(len(rx.findall(dst)) for rx, _ in SUBS)
        f.write_text(dst, encoding="utf-8")
        total_files += 1
        total_subs += before_cnt - after_cnt
        print(f"{f.name}: замен {before_cnt - after_cnt}")
print(f"итого: файлов {total_files}, замен {total_subs}")
