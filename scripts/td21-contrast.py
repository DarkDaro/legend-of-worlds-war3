#!/usr/bin/env python3
"""TD-21: контраст текстовой шкалы по WCAG 2.x на фонах всех шести тем."""
import json

themes = {
    # name: (bg, container, panel, surface, panel-raised)
    "neon":     [(11,20,38),(15,27,48),(20,32,56),(18,28,48),(26,39,68)],
    "ashenvale":[(10,18,15),(11,24,19),(17,29,23),(15,27,21),(27,44,34)],
    "dark":     [(13,13,15),(16,16,20),(22,22,27),(18,18,23),(30,30,37)],
    "contrast": [(4,4,6),(8,8,11),(12,12,16),(10,10,13),(20,20,26)],
    "astral":   [(13,10,20),(16,12,30),(22,16,40),(18,13,34),(28,20,48)],
    "winter":   [(14,18,24),(17,23,32),(23,30,42),(19,26,36),(30,38,52)],
}

def srgb(c):
    c /= 255.0
    return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4

def lum(rgb):
    r,g,b = (srgb(c) for c in rgb)
    return 0.2126*r + 0.7152*g + 0.0722*b

def ratio(fg, bg):
    l1, l2 = sorted((lum(fg), lum(bg)), reverse=True)
    return (l1+0.05)/(l2+0.05)

def hx(s):
    s = s.lstrip('#')
    return tuple(int(s[i:i+2],16) for i in (0,2,4))

cands_dim  = {"текущий #5a7a9a": hx("5a7a9a"), "кандидат #6480a0": hx("6480a0"),
              "#687fa6": hx("687fa6"), "#6c82a8": hx("6c82a8")}
cands_mute = {"текущий #6b7c99": hx("6b7c99"), "#7688a5": hx("7688a5"),
              "#7a8ca8": hx("7a8ca8"), "#7e90ac": hx("7e90ac")}

for label, cands in (("DIM", cands_dim), ("MUTED (зимняя и общий минимум)", cands_mute)):
    print(f"== {label} ==")
    for name, rgb in cands.items():
        worst = min((ratio(rgb, bg), t, i) for t, bgs in themes.items() for i, bg in enumerate(bgs))
        print(f"  {name}: худший {worst[0]:.2f}:1 на {worst[1]}/{['bg','container','panel','surface','raised'][worst[2]]}"
              f" {'PASS' if worst[0] >= 4.5 else 'FAIL'}")

# текст-primary и body-кандидат на всех фонах
for name, rgb in (("primary #e0f0ff", hx("e0f0ff")),):
    worst = min((ratio(rgb, bg), t) for t, bgs in themes.items() for bg in bgs)
    print(f"  {name}: худший {worst[0]:.2f}:1 на {worst[1]}")
