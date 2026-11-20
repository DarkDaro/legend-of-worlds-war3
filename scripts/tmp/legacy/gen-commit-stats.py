#!/usr/bin/env python3
# gen-commit-stats.py — диффстат по коммитам для подготовки таблицы
# правки сообщений. Выход: TSV hash|date|subject|nfiles|ins|del|paths
import subprocess, sys

REPO = "/home/z/my-project/_local/loww"
OUT = "/home/z/my-project/_local/rewrite-input.tsv"

def git(*args):
    return subprocess.run(["git", "-C", REPO, *args], capture_output=True, text=True, check=True).stdout

log = git("log", "--reverse", "--format=%h|%ad|%s", "--date=short")
rows = []
for line in log.splitlines():
    h, d, s = line.split("|", 2)
    stat = git("show", "--numstat", "--format=", h)
    ins = dele = 0
    nfiles = 0
    paths = []
    for nl in stat.splitlines():
        parts = nl.split("\t")
        if len(parts) < 3:
            continue
        a, b, p = parts
        nfiles += 1
        try:
            ins += int(a)
        except ValueError:
            pass
        try:
            dele += int(b)
        except ValueError:
            pass
        if len(paths) < 8:
            name = p.split("/")[-1]
            if name not in paths:
                paths.append(name)
    rows.append((h, d, s, nfiles, ins, dele, ",".join(paths[:6])))

with open(OUT, "w", encoding="utf-8") as f:
    f.write("hash\tdate\tsubject\tnfiles\tins\tdel\tpaths\n")
    for r in rows:
        f.write("\t".join(map(str, r)) + "\n")
print(f"OK: {len(rows)} строк -> {OUT}")
