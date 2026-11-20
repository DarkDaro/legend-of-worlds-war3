#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Аудит хардкода в CSS: цвета/тени/шрифты, вписанные литералами вместо переменных.

all.css исключаем — это бандл (копия остальных файлов), не источник правды.
"""
import re, sys, os, collections

ROOT = "/home/z/my-project/_local/loww/css"
BUNDLE = "all.css"

# Палитра :root (из base.css) — нормализованные значения -> имя переменной
PALETTE = {
    "#00e6ff": "--accent-cyan",
    "#e0f0ff": "--text-primary",
    "#8aa0c0": "--text-secondary",
    "#6b7c99": "--text-muted",
    "#5a7a9a": "--text-dim",
    "rgba(15,23,42,0.5)": "--glass-bg",
    "rgba(15,23,42,0.65)": "--glass-bg-hover",
    "rgba(0,230,255,0.12)": "--glass-border",
    "rgba(0,230,255,0.35)": "--glass-border-hover",
    "rgba(0,255,255,0.04)": "--glass-subtle",
    "rgba(0,255,255,0.08)": "--glass-subtle-hover",
    "rgba(0,255,255,0.06)": "--glass-tag-bg",
    "rgba(0,255,255,0.15)": "--glass-tag-border / --glass-tag-active",
    "rgba(0,230,255,0.2)": "--neon-glow (часть)",
    "rgba(0,230,255,0.4)": "--neon-glow-strong (часть)",
    "rgba(0,230,255,0.08)": "--neon-glow (часть)",
    "rgba(0,230,255,0.15)": "--neon-glow-strong (часть)",
    "rgba(0,230,255,0.03)": "--neon-glow-strong (часть)",
}

def norm_color(v: str) -> str:
    """rgba(0, 230, 255, 0.12) -> rgba(0,230,255,0.12); hex -> lower."""
    v = v.strip().lower()
    v = re.sub(r"\s*,\s*", ",", v)
    return v

def short(v: str) -> str:
    # rgba(0,230,255,0.12) -> rgba(0,230,255,.12) не делаем; просто сжимаем пробелы
    return v

files = sorted(f for f in os.listdir(ROOT) if f.endswith(".css") and f != BUNDLE)

color_re = re.compile(r"(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\))")

exact_dup = collections.defaultdict(list)      # точное совпадение с палитрой
family = collections.defaultdict(lambda: collections.defaultdict(list))  # по базовому цвету
shadows = collections.defaultdict(list)        # box-shadow повторы
fonts = collections.defaultdict(list)          # font-family стеки
radius = collections.defaultdict(list)         # border-radius
trans = collections.defaultdict(list)          # transition
zindex = collections.defaultdict(list)         # z-index

var_usage = collections.Counter()              # var(--x) по файлам

for f in files:
    path = os.path.join(ROOT, f)
    lines = open(path, encoding="utf-8").read().splitlines()
    for i, line in enumerate(lines, 1):
        s = line.strip()
        if s.startswith("/*") or s.startswith("*"):
            continue
        # var usage
        for m in re.finditer(r"var\((--[a-z0-9-]+)", line, re.I):
            var_usage[(f, m.group(1))] += 1
        # colors
        for m in color_re.finditer(line):
            raw = m.group(1)
            n = norm_color(raw)
            # полупрозрачные базовые семейства
            fam = None
            hm = re.match(r"#([0-9a-f]{6})", n)
            if hm:
                fam = "#" + hm.group(1)
            rm = re.match(r"rgba?\((\d+),(\d+),(\d+)", n)
            if rm:
                fam = "rgb(%s,%s,%s)" % rm.groups()
            if fam:
                family[fam][n].append(f"{f}:{i}")
            if n in PALETTE:
                exact_dup[n].append(f"{f}:{i}")
        if "box-shadow" in line and "--neon" not in line:
            val = line.split(":", 1)[-1].strip().rstrip(";")
            if len(val) > 10:
                shadows[norm_color(val)].append(f"{f}:{i}")
        if "font-family" in line:
            val = line.split(":", 1)[-1].strip().rstrip(";")
            fonts[val].append(f"{f}:{i}")
        rm = re.search(r"border(?:-radius)?\s*:\s*[^;]*?\b(\d+)px", line)
        if "border-radius" in line:
            val = line.split(":", 1)[-1].strip().rstrip(";")
            radius[val].append(f"{f}:{i}")
        if "z-index" in line:
            val = line.split(":", 1)[-1].strip().rstrip(";")
            zindex[val].append(f"{f}:{i}")

out = []
P = out.append
P("# Хардкод-аудит CSS: литералы вместо переменных\n")
P("all.css исключён (бандл-копия). Правило: значение есть в :root → обязан быть var().\n")

P("## 1. Точные копии палитры :root, вписанные литералом\n")
if not exact_dup:
    P("Не найдено.\n")
for n in sorted(exact_dup, key=lambda x: -len(exact_dup[x])):
    spots = exact_dup[n]
    var = PALETTE[n]
    byfile = collections.Counter(s.rsplit(":", 1)[0] for s in spots)
    P(f"- `{n}` → должен быть `var({var})` — **{len(spots)}×**: " +
      ", ".join(f"{k} ({v})" for k, v in byfile.most_common()))

P("\n## 2. Все цветовые литералы по базовому цвету (топ-30 семейств)\n")
rows = sorted(family.items(), key=lambda kv: -sum(len(v) for v in kv[1].values()))
for fam, variants in rows[:30]:
    total = sum(len(v) for v in variants.values())
    var = ", ".join(v for v in set(variants))
    files_hit = sorted({s.rsplit(":", 1)[0] for s in sum(variants.values(), [])})
    P(f"- `{fam}` — {total}× — варианты: {var or '—'}")
    P(f"  - файлы: {', '.join(files_hit[:12])}")

P("\n## 3. box-shadow: повторы (кроме var(--neon-*))\n")
dup_shadows = {k: v for k, v in shadows.items() if len(v) >= 4}
if not dup_shadows:
    P("Значимых повторов нет.\n")
for k, v in sorted(dup_shadows.items(), key=lambda kv: -len(kv[1]))[:15]:
    P(f"- `{k[:90]}` — {len(v)}×: {', '.join(sorted(set(x.rsplit(':',1)[0] for x in v)))}")

P("\n## 4. font-family: уникальные стеки\n")
for k, v in sorted(fonts.items(), key=lambda kv: -len(kv[1])):
    P(f"- `{k}` — {len(v)}×: {', '.join(sorted(set(x.rsplit(':',1)[0] for x in v))[:10])}")

P("\n## 5. border-radius: топ повторов\n")
dup_r = {k: v for k, v in radius.items() if len(v) >= 15}
for k, v in sorted(dup_r.items(), key=lambda kv: -len(kv[1]))[:12]:
    P(f"- `{k}` — {len(v)}× — файлы: {', '.join(sorted(set(x.rsplit(':',1)[0] for x in v))[:8])}")

P("\n## 6. z-index шкала\n")
for k, v in sorted(zindex.items(), key=lambda kv: -len(kv[1])):
    P(f"- `{k}` — {len(v)}× — файлы: {', '.join(sorted(set(x.rsplit(':',1)[0] for x in v))[:8])}")

print("\n".join(out))
