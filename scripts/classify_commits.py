"""Классификация сообщений коммитов: мусор / короткие / нормальные + статистика по мусорным."""
import re
import subprocess
import sys

REPO = sys.argv[1] if len(sys.argv) > 1 else "."

out = subprocess.run(
    ["git", "-C", REPO, "log", "--format=%h|%an|%ad|%s", "--date=short"],
    capture_output=True, text=True, check=True,
).stdout
rows = [line.split("|", 3) for line in out.splitlines()]

TRASH_EXACT = {
    "ф", "фикс", "хрень", "ну посмотрим", ".", "..", "…", "тест", "ы", "в", "а",
    "и", "ок", "окей", "го", "все", "всё", "правки", "правка", "коммит", "апдейт",
    "up", "update", "fix", "fix2", "wip", "tmp", "asd", "qwe", "asdf", "1", "2",
    "3", "4", "5", "6", "7", "8", "9", "0", "-", "—",
}

def is_trash(subject):
    t = subject.strip().lower()
    if t in TRASH_EXACT:
        return True
    if len(t) <= 2:
        return True
    if re.fullmatch(r"[.\d\s\-—]+", t):
        return True
    return False

trash = [r for r in rows if is_trash(r[3])]
border = [r for r in rows if not is_trash(r[3]) and len(r[3].strip()) <= 10]
normal = [r for r in rows if not is_trash(r[3]) and len(r[3].strip()) > 10]

print(f"Всего: {len(rows)} | мусорные: {len(trash)} | короткие (на грани): {len(border)} | нормальные: {len(normal)}")
print()
print("=== МУСОРНЫЕ (с чем работал коммит) ===")
for h, an, d, s in trash:
    stat = subprocess.run(
        ["git", "-C", REPO, "show", "--name-status", "--format=", h],
        capture_output=True, text=True,
    ).stdout.splitlines()
    adds = sum(1 for l in stat if l.startswith("A"))
    mods = sum(1 for l in stat if l.startswith("M"))
    dels = sum(1 for l in stat if l.startswith("D"))
    paths = [l.split("\t")[-1] for l in stat][:3]
    print(f"{h} {d} +{adds}/~{mods}/-{dels and ''}{dels}  «{s}»  {', '.join(p for p in paths)}")
print()
print("=== КОРОТКИЕ, НА ГРАНИ ===")
for h, an, d, s in border:
    print(f"{h} {d} [{an}] {s}")
print()
print("=== АВТОРЫ С ОТКЛОНЕНИЯМИ ===")
authors = subprocess.run(
    ["git", "-C", REPO, "log", "--format=%an <%ae>"],
    capture_output=True, text=True,
).stdout.splitlines()
from collections import Counter
for a, n in Counter(authors).most_common():
    if a.split(" <")[0] != "DarkDaro":
        print(f"  {n} шт: {a}")
