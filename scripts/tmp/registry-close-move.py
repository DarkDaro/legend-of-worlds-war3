"""Что делает и зачем: мет-консолидация TECH-DEBT по указанию владельца
«пиши в метфайл всё» (19.11). Три строки, закрытые чанками P7/P8/P10,
физически остались в таблице «Реестр» с четырьмя ячейками вместо шести
(цена закрытия и статус пустые, колонки рендера ломаются). По конвенции
файла закрытые записи живут в таблице «Закрыто» с форматом
| ID | Что | Когда закрыт | Чем | — переносит их туда, переписывая время
в «Что» на прошедшее и ничего не удаляя. Идемпотентность: если строк уже
нет в «Реестре», скрипт завершается без правок. Запуск из корня:
python3 scripts/tmp/registry-close-move.py"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # скрипт живёт в scripts/tmp/, корень на два уровня выше
FILE = ROOT / "docs" / "TECH-DEBT.md"

MOVE_IDS = {"TD-2", "TD-4", "TD-10"}
TENSE_FIXES = {
    "Алиасы --glass-* в :root держатся ради HTML: 404.html использует var(--glass-*) в инлайне":
        "Алиасы --glass-* в :root держались ради HTML-инлайна 404.html",
    "Оттенок 0,255,255 (тонкие поверхности) живёт отдельным литералом в :root, не привязан к --cyan-rgb":
        "Оттенок 0,255,255 (тонкие поверхности) жил отдельным литералом в :root, не привязан к --cyan-rgb",
    "css/INDEX.md отстал от жизни, после переименования стекла отстал сильнее: карта селекторов не знает --surface-*":
        "css/INDEX.md отстал от жизни, после переименования стекла отстал сильнее: карта селекторов не знал --surface-*",
}

lines = FILE.read_text(encoding="utf-8").splitlines()
closed_idx = next(i for i, ln in enumerate(lines) if ln.startswith("## Закрыто"))

moved: list[str] = []
for i, ln in enumerate(lines):
    if ln.startswith("| TD-") and i < closed_idx:
        tid = ln.split("|")[1].strip()
        if tid in MOVE_IDS:
            cells = [c.strip() for c in ln.split("|")[1:-1]]
            what, when, how = cells[1], cells[2], cells[3]
            what = TENSE_FIXES.get(what, what)
            moved.append(f"| {tid} | {what} | {when} | {how} |")

if not moved:
    print("переносить нечего, строки уже в «Закрыто» — идемпотентный выход")
    sys.exit(0)

out: list[str] = []
inserted = False
for i, ln in enumerate(lines):
    tid = ln.split("|")[1].strip() if ln.startswith("| TD-") else ""
    if tid in MOVE_IDS and i < closed_idx:
        continue  # строка уезжает из «Реестра»
    out.append(ln)
    if not inserted and i > closed_idx and ln.startswith("|---|---|---|---|") and lines[i - 1].startswith("| ID | Что | Когда закрыт | Чем |"):
        out.extend(moved)
        inserted = True

if not inserted:
    sys.exit("шапка таблицы «Закрыто» не найдена, файл не тронут")

FILE.write_text("\n".join(out) + "\n", encoding="utf-8")
print(f"перенесено в «Закрыто»: {[ln.split('|')[1].strip() for ln in moved]}")
