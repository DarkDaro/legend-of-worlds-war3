#!/usr/bin/env python3
"""Сводка состояния GitHub-репо: токен, HEAD на remote, CI, Pages.
Токен читается из /home/z/my-project/.gh-token, в вывод не попадает.
"""
import json
import subprocess
import sys
import urllib.request

REPO = "DarkDaro/legend-of-worlds-war3"
TOKEN_PATH = "/home/z/my-project/.gh-token"


def api(path: str):
    token = open(TOKEN_PATH).read().strip()
    req = urllib.request.Request(
        f"https://api.github.com{path}",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "User-Agent": "loww-status",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, json.load(r)
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}")


def main():
    failures = 0

    code, repo = api(f"/repos/{REPO}")
    if code != 200:
        print(f"TOKEN/REPO: HTTP {code} — {repo.get('message', '?')}")
        sys.exit(1)
    print(f"REPO: ok, default_branch={repo['default_branch']}, pushed_at={repo['pushed_at']}")

    code, head = api(f"/repos/{REPO}/commits/main")
    sha = head["sha"][:7]
    author = head["commit"]["author"]
    print(f"REMOTE HEAD: {sha} | {author['name']} <{author['email']}> | {head['commit']['message'].splitlines()[0]}")

    local = subprocess.run(
        ["git", "-C", "/home/z/my-project/_local/loww", "rev-parse", "--short=7", "HEAD"],
        capture_output=True, text=True).stdout.strip()
    mark = "СИНХРОН" if local == sha else "РАСХОЖДЕНИЕ!"
    print(f"LOCAL  HEAD: {local} → {mark}")
    if local != sha:
        failures += 1

    code, runs = api(f"/repos/{REPO}/actions/runs?per_page=3")
    for run in runs.get("workflow_runs", []):
        print(f"CI: {run['name']} | {run['head_sha'][:7]} | {run['status']}/{run['conclusion']} | {run['created_at']}")
        if run["head_sha"][:7] == sha and run["conclusion"] not in ("success", None):
            failures += 1

    code, pages = api(f"/repos/{REPO}/pages")
    if code == 200:
        print(f"PAGES: status={pages.get('status')}, last_build={pages.get('last_deployment', {}).get('created_at', '?')}")
    else:
        print(f"PAGES: HTTP {code} — {pages.get('message', '?')}")

    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
