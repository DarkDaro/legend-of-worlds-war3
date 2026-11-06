#!/usr/bin/env python3
"""Правка истории legend-of-worlds-war3 — этапы A–C из docs/history-fix-plan.md.

Этап A: имена авторов и коммиттеров -> DarkDaro (почты не трогаем).
Этап B: 22 мусорных сообщения -> человеческие (замена по полному SHA).
Этап C: вычистка двух мёртвых блобов (--strip-blobs-with-ids).

Запуск:
  python3 scripts/rewrite_history.py resolve [репо]   — сверить таблицу с историей
  python3 scripts/rewrite_history.py run     [репо]   — прогон git filter-repo

Прогон делать в свежем зеркальном клоне, не в рабочем.
Перед прогоном — bundle-бэкап всех веток (правило из docs/history-fix-plan.md).
"""
import subprocess
import sys

MODE = sys.argv[1] if len(sys.argv) > 1 else "resolve"
REPO = sys.argv[2] if len(sys.argv) > 2 else "."
STRIP_FILE = "/home/z/my-project/_local/strip-ids.txt"

# (короткий SHA, ожидаемое старое сообщение, новое сообщение) — из docs/history-fix-plan.md
REPLACEMENTS = [
    ("9eee93b", "fix", "инфра: старт — .gitignore и удаление копий страниц из archive/"),
    ("35fcd86", "123", "скрипт: большая дописка TailTools (+880 строк)"),
    ("d67e1b3", "fix", "скрипт: доработал TailTools (+124 строки)"),
    ("155ffb7", "а", "скрипт: развил TailTools — новый блок (+75 строк)"),
    ("202b232", "fix", "скрипт: рефактор TailTools — инструмента графики"),
    ("2dc9b7c", "правки", "контент: обновил changelog и updates — новый заголовок блока и пункты"),
    ("7c1517b", "", "контент: переработал сравнение и страницу монстров, обновил поиск"),
    ("b936f2f", "фикс", "дизайн: баннер лора — aspect-ratio 16/7 вместо жёсткой высоты"),
    ("8a77f57", "404", "фикс: перевёл страницу 404 на абсолютные пути"),
    ("6daefe9", "По", "контент: подключил блок сборок героя — ледяной лорд, лич, жрица"),
    ("7e6f31a", "к", "контент: наполнил дашборд баланса — новые секции (+621 строка)"),
    ("08bd196", "фикс", "фикс: убрал пустые соцссылки и сократил описание мини-версии"),
    ("a5c1b4e", "к", "скрипт: сменил счётчик Яндекс.Метрики в мини-версии"),
    ("f50a98c", "f", "инфра: переименовал mini/items.html в mini/index.html — главная мини-версии"),
    ("f0ece8b", "фикс", "скрипт: переработал обработчики поиска предметов"),
    ("849ab9b", "сс", "дизайн: убрал дубль hover-эффекта карточек героев на тач-экранах"),
    ("81bd631", "1", "контент: в сборке ИИ на 14-й стадии светлый меч сохраняется"),
    ("420bf2e", "хрень", "контент: уточнил описание Жатвы — лимит 100 киллов"),
    ("539828c", "фикс", "дизайн: отключил backdrop-filter на мобильных в хранилище — лечит мерцание"),
    ("b1a4d9b", "ну посмотрим", "фикс: удалил черновики из корня — style.css.bak, копия mini-page.js, тестовые страницы"),
    ("6f6d180", "фикс", "пустой коммит без изменений (оставлен намеренно)"),
    ("8dc8490", "ф", "вёрстка: выровнял подключение аналитики на странице ветрочарования"),
]

# Мёртвые блобы больше 1 МБ (images/maplows.png 16,59 МБ, images/map_preview.PNG 2,39 МБ)
STRIP_BLOBS = [
    "587f71dc77beeb38cff9f249c513698ac525ce94",
    "16f518193a6976d423576950fa67862892a9efae",
]


def git(*args, input_text=None):
    r = subprocess.run(
        ["git", "-C", REPO, *args],
        capture_output=True, text=True, check=True, input=input_text,
    )
    return r.stdout


def resolve():
    """Сверить таблицу с историей: старое сообщение обязано совпасть байт в байт."""
    table = []
    for short, old, new in REPLACEMENTS:
        full = git("rev-parse", short + "^{commit}").strip()
        subj = git("log", "-1", "--format=%s", full).strip()
        mark = "OK" if subj == old else f"РАСХОЖДЕНИЕ: в истории «{subj}»"
        print(f"{short} -> {full[:12]}  «{old}»  {mark}")
        if subj != old:
            sys.exit("таблица разошлась с историей, стоп")
        table.append((full, new))
    return table


def run(table):
    entries = "\n".join(
        f"    b'{full}': {new!r}.encode('utf-8')," for full, new in table
    )
    callback = (
        "mapping = {\n" + entries + "\n}\n"
        "if commit.original_id is None:\n"
        "    raise RuntimeError('нет original_id — замены по SHA невозможны')\n"
        "commit.author_name = b'DarkDaro'\n"
        "commit.committer_name = b'DarkDaro'\n"
        "newmsg = mapping.get(commit.original_id)\n"
        "if newmsg is not None:\n"
        "    commit.message = newmsg + b'\\n'\n"
    )
    with open(STRIP_FILE, "w") as f:
        f.write("\n".join(STRIP_BLOBS) + "\n")
    print(f"callback: {len(table)} замен; strip-ids: {len(STRIP_BLOBS)} блобов")
    subprocess.run(
        ["git", "-C", REPO, "filter-repo",
         "--commit-callback", callback,
         "--strip-blobs-with-ids", STRIP_FILE],
        check=True,
    )


if MODE == "resolve":
    resolve()
elif MODE == "run":
    run(resolve())
else:
    sys.exit("режимы: resolve | run")
