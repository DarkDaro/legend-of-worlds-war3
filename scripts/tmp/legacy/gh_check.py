"""Быстрая проверка состояния GitHub-репо без токена (репо публичный)."""
import json
import urllib.request

BASE = "https://api.github.com/repos/DarkDaro/legend-of-worlds-war3"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "loww-check"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


print("== последние коммиты main:")
for c in get(BASE + "/commits?per_page=6"):
    login = (c.get("author") or {}).get("login")
    print(c["sha"][:10], login, c["commit"]["author"]["date"], "|", c["commit"]["message"].splitlines()[0][:70])

print("\n== ветки:")
for b in get(BASE + "/branches?per_page=10"):
    print(b["name"], b["commit"]["sha"][:10])

print("\n== корень main:")
tree = get(BASE + "/git/trees/main?recursive=1")
print("truncated:", tree.get("truncated", False))
for t in tree["tree"]:
    if "/" not in t["path"]:
        print(("dir  " if t["type"] == "tree" else "file "), t["path"])

print("\n== HeroData в дереве main:")
hits = [t for t in tree["tree"] if "herodata" in t["path"].lower()]
print("найдено:", len(hits))
for t in hits[:20]:
    print(" ", t["path"], t.get("size", ""))
