"""Аудит целостности: синтаксис всех JS (node --check) и закрытие всех HTML (</html>).

Запуск: python3 scripts/audit_integrity.py [путь-к-репо] [ref]
По умолчанию — текущий репозиторий, HEAD.
"""
import os
import subprocess
import sys
import tempfile

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
REF = sys.argv[2] if len(sys.argv) > 2 else "HEAD"

files = subprocess.run(
    ["git", "-C", REPO, "ls-tree", "-r", "--name-only", REF],
    capture_output=True, text=True, check=True,
).stdout.splitlines()

js = [f for f in files if f.endswith(".js")]
html = [f for f in files if f.endswith(".html")]
tmp = tempfile.mkdtemp(prefix="audit_")
probe = os.path.join(tmp, "probe.js")

bad_js = []
for f in js:
    content = subprocess.run(
        ["git", "-C", REPO, "show", f"{REF}:{f}"],
        capture_output=True, text=True,
    ).stdout
    with open(probe, "w", encoding="utf-8") as fh:
        fh.write(content)
    r = subprocess.run(["node", "--check", probe], capture_output=True, text=True)
    if r.returncode != 0:
        first = next((ln for ln in r.stderr.splitlines() if ln.strip()), "")
        bad_js.append((f, first[:110]))

bad_html = []
for f in html:
    content = subprocess.run(
        ["git", "-C", REPO, "show", f"{REF}:{f}"],
        capture_output=True, text=True,
    ).stdout
    if "</html>" not in content.rstrip()[-12:].lower():
        bad_html.append((f, len(content)))

print(f"JS-файлов: {len(js)}, со сломанным синтаксисом: {len(bad_js)}")
for f, e in bad_js:
    print(f"  {f}")
    print(f"      {e}")
print(f"HTML-страниц: {len(html)}, без закрывающего </html>: {len(bad_html)}")
for f, n in bad_html:
    print(f"  {f} ({n} байт)")
