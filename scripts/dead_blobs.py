"""Мёртвые блобы: есть в истории, но отсутствуют в деревьях кончиков веток.

Запуск: python3 scripts/dead_blobs.py [путь-к-репо] [порог-в-МБ]
Именно их можно вычистить из истории, не задев живые файлы веток.
"""
import subprocess
import sys

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
MIN_MB = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
REFS = ["main", "archive/template-table", "archive/mini-site"]

# Живые блобы = содержимое деревьев кончиков веток
live = set()
for ref in REFS:
    out = subprocess.run(
        ["git", "-C", REPO, "ls-tree", "-r", ref],
        capture_output=True, text=True, check=True,
    ).stdout.splitlines()
    for row in out:
        parts = row.split("\t", 1)[0].split()
        if len(parts) >= 3 and parts[1] == "blob":
            live.add(parts[2])

# Все блобы, когда-либо попадавшие в объектную базу по рефам
all_objs = subprocess.run(
    ["git", "-C", REPO, "rev-list", "--objects", "--all"],
    capture_output=True, text=True, check=True,
).stdout.splitlines()
candidates = {line.partition(" ")[0] for line in all_objs if line}

batch = subprocess.run(
    ["git", "-C", REPO, "cat-file", "--batch-check"],
    input="\n".join(sorted(candidates)), capture_output=True, text=True, check=True,
).stdout

dead_blobs = []
for row in batch.splitlines():
    parts = row.split()
    if len(parts) != 3 or parts[1] != "blob":
        continue
    sha, size = parts[0], int(parts[2])
    if sha not in live:
        dead_blobs.append((sha, size))

# Пути для отчёта
dead_set = {s for s, _ in dead_blobs}
paths = {}
for line in all_objs:
    sha, _, path = line.partition(" ")
    if sha in dead_set and path:
        paths.setdefault(sha, path)

big = [(size, sha, paths.get(sha, "(без пути)")) for sha, size in dead_blobs if size >= MIN_MB * 1048576]
big.sort(reverse=True)
total = sum(s for s, _, _ in big)

print(f"Кончики веток: {', '.join(REFS)}")
print(f"Живых блобов (в деревьях кончиков): {len(live)}")
print(f"Мёртвых блобов всего: {len(dead_blobs)}; больше {MIN_MB} МБ: {len(big)}")
for size, sha, path in big[:30]:
    print(f"  {size / 1048576:7.2f} МБ  {sha}  {path}")
print(f"Суммарный выигрыш от чистки: {total / 1048576:.1f} МБ")
