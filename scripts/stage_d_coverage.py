#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Обратная проверка покрытия этапа D: каждое односложное сообщение истории
обязано быть в таблице docs/stage-d-table.md («Было»).

Если есть пропуски — печатает их вместе с git show --stat для составления замен.
"""
import re
import subprocess
import sys

REPO = "/home/z/my-project/_local/loww"
TABLE = "/home/z/my-project/_local/loww/docs/stage-d-table.md"


def git(*args):
    return subprocess.run(
        ["git", "-C", REPO, *args], capture_output=True, text=True
    ).stdout


# все subject'ы истории по всем веткам
hist = {}
for ln in git("log", "--all", "--date=short", "--format=%H%x09%h%x09%ad%x09%s").splitlines():
    parts = ln.split("\t", 3)
    if len(parts) == 4:
        h, sh, d, s = parts
        hist.setdefault(s, []).append((sh, d))

# «Было» из таблицы
olds = set()
rows = 0
for ln in open(TABLE, encoding="utf-8"):
    m = re.match(r"^\|\s*\d+\s*\|\s*([0-9a-f]{7,})\s*\|[^|]*\|\s*«([^»]*)»\s*\|", ln)
    if m:
        rows += 1
        olds.add(m.group(2))

one_word = {s for s in hist if len(s.split()) == 1}
missing = {s: hist[s] for s in sorted(one_word - olds)}

print(f"коммитов с уникальными subject'ами: {len(hist)}")
print(f"строк в таблице с SHA+«Было»: {rows}")
print(f"односложных subject'ов в истории: {sum(len(hist[s]) for s in one_word)} (уникальных слов: {len(one_word)})")
print(f"из них покрыто таблицей: {sum(len(hist[s]) for s in one_word & olds)}")
if not missing:
    print("ПОКРЫТИЕ ПОЛНОЕ — пропусков нет")
    sys.exit(0)

print(f"\nПРОПУЩЕНО в таблице: {sum(len(hist[s]) for s in missing)} коммитов ({len(missing)} уникальных слов)")
for s in missing:
    for sh, d in missing[s]:
        print(f"\n=== {sh} {d} «{s}» ===")
        print(git("show", "--stat", "--format=", sh)[:900])
sys.exit(1)
