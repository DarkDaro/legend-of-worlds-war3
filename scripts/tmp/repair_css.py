#!/usr/bin/env python3
"""Реконструкция css после двух багов:
  1) 48ffa08 — обёртки [off 08.11 css-аудит] вокруг «мёртвых» правил;
  2) da6e421 — палитровый скрипт затирал пустой строкой строки «...*/» внутри
     открытых комментариев (закрывашки обёрток + хвосты многострочных комментариев),
     из-за чего комментарии глотали живые правила.

Реконструкция: base = git show da6e421^:css/<файл>
  → снять все обёртки (маркер + /* + парная */ по балансу)
  → наложить те же палитровые замены, но с корректным трекингом комментариев
  → записать в рабочее дерево.
all.css не трогаем (пересборка генератором отдельно).
"""
import re, subprocess, pathlib, collections

ROOT = pathlib.Path('/home/z/my-project/_local/loww')
CSS = ROOT / 'css'
MARKER = '[off 08.11 css-аудит]'
BASE_REV = 'da6e421^'

REPLACEMENTS = [
    (re.compile(r"#00e6ff\b", re.I), "var(--accent-cyan)"),
    (re.compile(r"#e0f0ff\b", re.I), "var(--text-primary)"),
    (re.compile(r"#8aa0c0\b", re.I), "var(--text-secondary)"),
    (re.compile(r"#5a7a9a\b", re.I), "var(--text-dim)"),
    (re.compile(r"#6b7c99\b", re.I), "var(--text-muted)"),
    (re.compile(r"rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.12\s*\)"), "var(--glass-border)"),
    (re.compile(r"rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.35\s*\)"), "var(--glass-border-hover)"),
    (re.compile(r"rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*0\.5\s*\)"), "var(--glass-bg)"),
    (re.compile(r"rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*0\.65\s*\)"), "var(--glass-bg-hover)"),
    (re.compile(r"0\s+0\s+20px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.2\s*\)\s*,\s*0\s+0\s+60px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.08\s*\)"), "var(--neon-glow)"),
    (re.compile(r"0\s+0\s+20px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.4\s*\)\s*,\s*0\s+0\s+60px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.15\s*\)\s*,\s*inset\s+0\s+0\s+15px\s+rgba\(\s*0\s*,\s*230\s*,\s*255\s*,\s*0\.03\s*\)"), "var(--neon-glow-strong)"),
]
DEF_RE = re.compile(r"^\s*--[a-z0-9-]+\s*:")

def git_show(rev, path):
    return subprocess.run(['git', 'show', f'{rev}:{path}'], cwd=ROOT,
                          capture_output=True, text=True, check=True).stdout

def unwrap(text, fn):
    """Снять обёртки: строка-маркер, строка /* после неё, парная */ по балансу вложенных комментариев."""
    lines = text.splitlines(keepends=True)
    out, i, removed = [], 0, 0
    while i < len(lines):
        ln = lines[i]
        if MARKER in ln:
            removed += 1
            i += 1
            # пропускаем открывающую /* (первая непустая строка)
            while i < len(lines) and lines[i].strip() == '':
                out.append(lines[i]); i += 1
            if i < len(lines) and lines[i].lstrip().startswith('/*'):
                i += 1
                # ищем парную */ по балансу: внутри исходного CSS комментарии сбалансированы
                depth = 1
                while i < len(lines) and depth > 0:
                    s = lines[i]
                    j = 0
                    while j < len(s):
                        if s.startswith('/*', j):
                            depth += 1; j += 2
                        elif s.startswith('*/', j):
                            depth -= 1
                            if depth == 0:
                                # хвост после закрывающей */ сохраняем (обычно пусто)
                                tail = s[j+2:]
                                if tail.strip():
                                    out.append(tail)
                                break
                            j += 2
                        else:
                            j += 1
                    if depth > 0:
                        out.append(lines[i]); i += 1
                i += 1  # строка с закрывающей */ (или после неё)
            continue
        out.append(ln); i += 1
    return ''.join(out), removed

def palette(text, fn):
    """Те же замены, что в da6e421, но с корректным трекингом комментариев и без затирания строк."""
    lines = text.splitlines(keepends=True)
    out, in_comment, n = [], False, 0
    for ln in lines:
        if in_comment:
            end = ln.find('*/')
            if end == -1:
                out.append(ln); continue
            in_comment = False
            code, comment = ln[end+2:], ''
            head = ''
        else:
            c = ln.find('/*')
            if c != -1 and ln.find('*/', c) == -1:
                in_comment = True
            if c != -1:
                code, comment, head = ln[:c], ln[c:], ''
            else:
                code, comment, head = ln, '', ''
        if fn == 'base.css' and DEF_RE.match(code):
            out.append(ln); continue
        new_code = code
        for rx, repl in REPLACEMENTS:
            new_code, k = rx.subn(repl, new_code)
            n += k
        out.append(new_code + comment if new_code != code else ln)
    return ''.join(out), n

report = []
for p in sorted(CSS.glob('*.css')):
    fn = p.name
    if fn == 'all.css':
        continue
    base = git_show(BASE_REV, f'css/{fn}')
    unwrapped, n_off = unwrap(base, fn)
    final, n_pal = palette(unwrapped, fn)
    cur = p.read_text(encoding='utf-8')
    if final != cur:
        p.write_text(final, encoding='utf-8')
    report.append((fn, n_off, n_pal, final != cur))

print(f"{'файл':28} {'обёрток снято':>14} {'палитр. замен':>14}  изменён")
for fn, n_off, n_pal, ch in report:
    if n_off or n_pal or ch:
        print(f"{fn:28} {n_off:>14} {n_pal:>14}  {'да' if ch else 'нет'}")
print(f"\nВсего обёрток снято: {sum(r[1] for r in report)}")
