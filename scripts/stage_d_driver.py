#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Этап D правки истории: замена коротких сообщений коммитов по SHA.

Источник замен — таблица docs/stage-d-table.md (единственный источник правды,
строки в коде не дублируются). Деревья и файлы не изменяются вообще:
filter-repo трогает только поле message у перечисленных коммитов.

Режимы:
  resolve [репо] [путь-к-таблице] — сверить таблицу с историей:
      * каждая строка: SHA резолвится, «Было» совпадает байт в байт;
      * обратное покрытие: каждый односложный subject истории есть в таблице;
      * карта замен дампится в _local/dumps/stage-d-map.json;
  run [репо] [путь-к-таблице]  — resolve + git filter-repo
      (commit-callback по original_id; обычный replace-message не годится —
       короткие subject'ы повторяются, а замена по подстроке задела бы другие сообщения).

Запускать в СВЕЖЕМ зеркальном клоне; перед прогоном — bundle-бэкап всех веток
(правило docs/history-fix-plan.md).
"""
import json
import os
import re
import subprocess
import sys

MODE = sys.argv[1] if len(sys.argv) > 1 else "resolve"
REPO = sys.argv[2] if len(sys.argv) > 2 else "/home/z/my-project/_local/loww-stageD.git"
TABLE = sys.argv[3] if len(sys.argv) > 3 else "/home/z/my-project/_local/loww/docs/stage-d-table.md"
MAP_JSON = "/home/z/my-project/_local/dumps/stage-d-map.json"

ROW = re.compile(r"^\|\s*\d+\s*\|\s*([0-9a-f]{7,})\s*\|[^|]*\|\s*«([^»]*)»\s*\|\s*(.+?)\s*\|")


def git(*args):
    r = subprocess.run(["git", "-C", REPO, *args], capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"git {' '.join(args[:3])}… упал: {r.stderr.strip()}")
    return r.stdout


def parse_table():
    rows = []
    for ln in open(TABLE, encoding="utf-8"):
        m = ROW.match(ln)
        if m:
            rows.append((m.group(1), m.group(2), m.group(3)))
    if not rows:
        sys.exit(f"в {TABLE} не найдено ни одной строки замен — стоп")
    return rows


def resolve():
    rows = parse_table()
    print(f"строк в таблице: {len(rows)}")
    table, seen = [], {}
    for short, old, new in rows:
        full = git("rev-parse", short + "^{commit}").strip()
        subj = git("log", "-1", "--format=%s", full).strip()
        if subj != old:
            sys.exit(f"РАСХОЖДЕНИЕ {short}: в таблице «{old}», в истории «{subj}» — стоп")
        if full in seen:
            sys.exit(f"дубль SHA: {short} и {seen[full]}")
        seen[full] = short
        table.append((full, new))

    # обратное покрытие: односложных subject'ов вне таблицы быть не должно
    hist_oneword = {}
    for ln in git("log", "--all", "--format=%H%x09%s").splitlines():
        if "\t" not in ln:
            continue
        h, s = ln.split("\t", 1)
        if len(s.split()) == 1:
            hist_oneword.setdefault(s, []).append(h)
    olds = {old for _short, old, _new in rows}
    uncovered = {s: v for s, v in hist_oneword.items() if s not in olds}
    if uncovered:
        for s, v in sorted(uncovered.items()):
            print(f"  не покрыто: {v[0][:12]} «{s}»")
        sys.exit(f"обратное покрытие неполное: {sum(len(v) for v in uncovered.values())} коммитов вне таблицы — стоп")

    os.makedirs(os.path.dirname(MAP_JSON), exist_ok=True)
    with open(MAP_JSON, "w", encoding="utf-8") as f:
        json.dump(table, f, ensure_ascii=False, indent=1)
    print(f"сверено {len(table)} строк: SHA резолвятся и уникальны, «Было» байт в байт, покрытие полное")
    print(f"карта замен: {MAP_JSON}")
    return table


def run(table):
    entries = "\n".join(
        f"    b'{full}': {new!r}.encode('utf-8')," for full, new in table
    )
    callback = (
        "mapping = {\n" + entries + "\n}\n"
        "if commit.original_id is None:\n"
        "    raise RuntimeError('нет original_id — замены по SHA невозможны')\n"
        "newmsg = mapping.get(commit.original_id)\n"
        "if newmsg is not None:\n"
        "    commit.message = newmsg + b'\\n'\n"
    )
    print(f"filter-repo: {len(table)} замен сообщений, деревья не трогаем")
    r = subprocess.run(["git", "-C", REPO, "filter-repo", "--commit-callback", callback])
    if r.returncode != 0:
        sys.exit("filter-repo упал")
    print("filter-repo: готово")


if MODE == "resolve":
    resolve()
elif MODE == "run":
    run(resolve())
else:
    sys.exit("режимы: resolve | run")
