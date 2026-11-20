#!/usr/bin/env python3
"""Дамп коммитов с короткими сообщениями (кандидаты этапа D).

Для каждого: hash, дата, subject, numstat по файлам, а для небольших диффов —
тело патча (до LIMIT строк), чтобы можно было осмысленно переписать сообщение.
Вывод в STDOUT (перенаправить в файл).
"""
import subprocess
import sys

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
PATCH_LIMIT = 160  # максимум строк тела патча на коммит

out = subprocess.run(
    ["git", "-C", REPO, "log", "--format=%h|%ad|%s", "--date=short"],
    capture_output=True, text=True, check=True,
).stdout
rows = [line.split("|", 2) for line in out.splitlines()]

# та же логика «коротких», что в classify_commits.py
TRASH_EXACT = {
    "ф", "фикс", "хрень", "ну посмотрим", ".", "..", "…", "тест", "ы", "в", "а",
    "и", "ок", "окей", "го", "все", "всё", "правки", "правка", "коммит", "апдейт",
    "up", "update", "fix", "fix2", "wip", "tmp", "asd", "qwe", "asdf", "1", "2",
    "3", "4", "5", "6", "7", "8", "9", "0", "-", "—",
}
def is_trash(s):
    t = s.strip().lower()
    return t in TRASH_EXACT or len(t) <= 2 or bool(__import__("re").fullmatch(r"[.\d\s\-—]+", t))

cands = [(h, d, s) for h, d, s in rows if not is_trash(s) and len(s.strip()) <= 10]
print(f"# кандидатов: {len(cands)}\n")

for h, d, s in cands:
    stat = subprocess.run(
        ["git", "-C", REPO, "show", "--numstat", "--format=", h],
        capture_output=True, text=True, check=True,
    ).stdout.splitlines()
    files = []
    added = removed = 0
    for line in stat:
        if not line.strip():
            continue
        parts = line.split("\t")
        if len(parts) == 3:
            a, r, p = parts
            try:
                added += int(a); removed += int(r)
            except ValueError:
                pass
            files.append(f"{p} (+{a} -{r})")
    print(f"=== {h} | {d} | «{s}» | файлов: {len(files)}, +{added}/-{removed}")
    for f in files[:25]:
        print(f"    {f}")
    if len(files) > 25:
        print(f"    … ещё {len(files) - 25} файлов")
    if added + removed <= 400 and len(files) <= 25:
        patch = subprocess.run(
            ["git", "-C", REPO, "show", f"--unified=1", "--format=", h],
            capture_output=True, text=True, check=True,
        ).stdout.splitlines()
        body = [l for l in patch if l.strip() and not l.startswith(("diff --git", "index ", "--- ", "+++ ", "@@"))]
        if body:
            print("    --- тело патча (сжато) ---")
            for l in body[:PATCH_LIMIT]:
                print(f"    {l[:150]}")
            if len(body) > PATCH_LIMIT:
                print(f"    … ещё {len(body) - PATCH_LIMIT} строк")
    print()
