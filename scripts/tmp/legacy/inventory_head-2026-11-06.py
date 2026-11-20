"""Инвентаризация HEAD репозитория loww: группы файлов, размеры, кандидаты на чистку."""
import os
import subprocess
from collections import defaultdict

REPO = "/home/z/my-project/_local/loww"
IMG = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", ".bmp", ".avif"}
SERVICE = {".gitignore", ".nojekyll", ".gitattributes", ".editorconfig"}

out = subprocess.run(
    ["git", "-C", REPO, "ls-tree", "-r", "-l", "origin/main"],
    capture_output=True, text=True, check=True,
).stdout

def group(path):
    if path.startswith("template table/"):
        return "template table (ini-данные игры)"
    ext = os.path.splitext(path)[1].lower()
    name = os.path.basename(path)
    if ext == ".html":
        return "HTML-страницы"
    if ext == ".js":
        return "JavaScript"
    if ext == ".css":
        return "CSS"
    if ext in IMG:
        return "Картинки"
    if ext in {".md", ".txt"}:
        return "Документы"
    if name.lower() in SERVICE:
        return "Служебные"
    if ext == ".json":
        return "JSON-данные"
    return "Прочее"

files = []
for line in out.splitlines():
    meta, path = line.split("\t", 1)
    _mode, _type, _sha, size = meta.split()
    size = int(size) if size.isdigit() else 0
    files.append((path, size))

groups = defaultdict(lambda: [0, 0])
for path, size in files:
    g = group(path)
    groups[g][0] += 1
    groups[g][1] += size

total = sum(s for _, s in files)
print(f"Всего файлов: {len(files)}   Суммарный размер: {total / 1024 / 1024:.1f} МБ")
print()
print(f"{'Группа':<38}{'файлов':>7}{'размер':>12}")
for g, (n, s) in sorted(groups.items(), key=lambda x: -x[1][1]):
    print(f"{g:<38}{n:>7}{s / 1024 / 1024:>10.2f} МБ")

print()
print("Топ-15 самых больших файлов:")
for path, size in sorted(files, key=lambda x: -x[1])[:15]:
    print(f"  {size / 1024 / 1024:6.2f} МБ  {path}")

big = [(p, s) for p, s in files if s > 1024 * 1024 and not p.startswith("template table/")]
print()
print(f"Файлы больше 1 МБ вне template table: {len(big)}")
for p, s in big:
    print(f"  {s / 1024 / 1024:.2f} МБ  {p}")

tt = [(p, s) for p, s in files if p.startswith("template table/")]
print()
print(f"template table: {len(tt)} файлов, {sum(s for _, s in tt) / 1024 / 1024:.1f} МБ")

html = sorted(p for p, _ in files if p.endswith(".html"))
print()
print(f"HTML-страницы ({len(html)}):")
for p in html:
    print(" ", p)
