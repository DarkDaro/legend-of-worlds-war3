#!/usr/bin/env python3
# f2-longhand.py — F2, этап 2: шорткаты animation:/transition: сохраняют
# литеральные времена (calc в шорткате Chromium отбрасывает — проверено пробой),
# но сразу после них добавляются longhand animation-duration/-delay или
# transition-duration/-delay со множителем calc(var(--anim-speed, 1) * X).
# Longhand стоит позже в каскаде и перекрывает шорткат. Первый раз в сегменте —
# duration, второй — delay; сегменты без времени дают 0s для выравнивания списка.
# Идемпотентен: за обработанным шорткатом уже стоит его longhand — пропуск по
# просмотру вперёд; комментарии не трогаются (2.13).
import re
from pathlib import Path

CSS = Path(__file__).resolve().parents[2] / "css"
SHORTHAND = re.compile(r"((?:animation|transition)\s*:\s*)([^;{}]+?)(;)")
TIME = re.compile(r"(?<![\w.])(\d*\.?\d+)(m?s)(?![\w%.])")

def flush(s: str):
    out, pos, count = [], 0, 0
    for m in SHORTHAND.finditer(s):
        value = m.group(2)
        prop = m.group(1).split(":")[0].strip()
        # идемпотентность: longhand уже добавлен после этого шортката
        if re.match(r"\s*" + re.escape(prop) + r"-(?:duration|delay)\s*:", s[m.end():m.end() + 120]):
            continue
        segs = value.split(",")
        durs, dels, need_delay = [], [], False
        for seg in segs:
            tlist = [a + b for a, b in TIME.findall(seg)]
            durs.append(tlist[0] if tlist else "0s")
            if len(tlist) > 1:
                dels.append(tlist[1])
                need_delay = True
            else:
                dels.append("0s")
        if all(d == "0s" for d in durs):
            continue  # времени в шорткате нет (transition: none и т.п.)
        imp_s = " !important" if "!important" in value else ""
        ind_m = re.search(r"(?:^|\n)([ \t]*)[^\s]", s[max(0, m.start() - 300):m.start() + 1])
        ind = ind_m.group(1) if ind_m else ""
        add = ind + f"{prop}-duration: " + ", ".join(f"calc(var(--anim-speed, 1) * {d})" for d in durs) + imp_s + ";"
        if need_delay:
            add += "\n" + ind + f"{prop}-delay: " + ", ".join(f"calc(var(--anim-speed, 1) * {d})" for d in dels) + imp_s + ";"
        out.append(s[pos:m.end()])
        out.append("\n" + add)
        pos = m.end()
        count += 1
    out.append(s[pos:])
    return "".join(out), count

total = 0
for f in sorted(CSS.glob("*.css")):
    if f.name == "all.css":
        continue
    src = f.read_text(encoding="utf-8")
    dst, c = flush(src)
    if dst != src:
        f.write_text(dst, encoding="utf-8")
        total += c
        print(f"{f.name}: шорткатов {c}")
print(f"итого шорткатов с longhand-добавкой: {total}")
