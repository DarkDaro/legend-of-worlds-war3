#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Верификация этапа D после filter-repo (гейт перед force-push).

1) деревья всех пар commit-map совпадают байт в байт
   (старое — из рабочего клона, новое — из зеркального);
2) все новые сообщения из таблицы стоят на своих местах;
3) односложных subject'ов не осталось;
4) авторы и коммиттеры — только DarkDaro;
5) число коммитов до и после совпадает.

Код возврата 0 — пуш разрешён; 1 — есть расхождения, пуш запрещён.
"""
import json
import subprocess
import sys

OLD = "/home/z/my-project/_local/loww"
NEW = "/home/z/my-project/_local/loww-stageD.git"
MAP_GIT = NEW + "/filter-repo/commit-map"
MAP_JSON = "/home/z/my-project/_local/dumps/stage-d-map.json"


def git(repo, *args):
    r = subprocess.run(["git", "-C", repo, *args], capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"git -C {repo} {args[0]}… упал: {r.stderr.strip()}")
    return r.stdout


pairs = []
with open(MAP_GIT, encoding="utf-8") as f:
    next(f)  # шапка "old new"
    for ln in f:
        o, n = ln.split()
        pairs.append((o, n))
by_old = dict(pairs)

diff_n = 0
for o, n in pairs:
    to = git(OLD, "rev-parse", o + "^{tree}").strip()
    tn = git(NEW, "rev-parse", n + "^{tree}").strip()
    if to != tn:
        diff_n += 1
        print(f"ДЕРЕВО РАЗОШЛОСЬ: {o[:12]} -> {n[:12]}")

expected = {o: m for o, m in json.load(open(MAP_JSON, encoding="utf-8"))}
msg_n = 0
for o, m in expected.items():
    n = by_old.get(o)
    if n is None:
        msg_n += 1
        print(f"НЕТ ПАРЫ В COMMIT-MAP ДЛЯ {o[:12]}")
        continue
    subj = git(NEW, "log", "-1", "--format=%s", n).strip()
    if subj != m:
        msg_n += 1
        print(f"СООБЩЕНИЕ НЕ СОВПАЛО: {o[:12]} -> {n[:12]}: «{subj}»")

subjects = git(NEW, "log", "--all", "--format=%s").splitlines()
oneword = [s for s in subjects if len(s.split()) == 1]
authors = sorted(set(git(NEW, "log", "--all", "--format=%an|%cn").splitlines()))
c_old = git(OLD, "rev-list", "--all", "--count").strip()
c_new = git(NEW, "rev-list", "--all", "--count").strip()

print(f"пар в commit-map: {len(pairs)}; деревьев с расхождением: {diff_n}")
print(f"замен из таблицы: {len(expected)}; не совпало: {msg_n}")
print(f"односложных subject'ов после: {len(oneword)}{oneword[:5]}")
print(f"авторы|коммиттеры после: {authors}")
print(f"коммитов до/после: {c_old}/{c_new}")
ok = not diff_n and not msg_n and not oneword and authors == ["DarkDaro|DarkDaro"] and c_old == c_new
print("ИТОГ:", "OK — пуш разрешён" if ok else "ЕСТЬ ПРОБЛЕМЫ — пуш запрещён")
sys.exit(0 if ok else 1)
