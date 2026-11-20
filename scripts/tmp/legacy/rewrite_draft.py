#!/usr/bin/env python3
# Черновик таблицы замен сообщений коммитов.
# Правила: снять префикс "тема:", обрезать по тире/стрелке/точке с запятой,
# обрезать отчёты проверок, строчная первая буква. Merge и уже человеческие — мимо.
import re
import subprocess

PREFIXES = {
    'метафайл', 'вёрстка', 'скрипт', 'контент', 'инфра', 'данные', 'фикс',
    'код', 'дизайн', 'a11y', 'css', 'html', 'js', 'seo', 'ui', 'ux', 'test',
    'wip', 'docs', 'refactor', 'chore', 'style', 'feat', 'fix',
}
CUT_SEPS = [' — ', ' —', ' – ', ';', ' → ', ' <- ', '->']
REPORT_MARKERS = ['проверено', 'прогон', 'check-links', 'check-slop', 'check-header',
                  'гейты', 'рендер', 'проверка', 'прошло', 'success']
KEEP_IF_HUMAN_MAX = 52

def draft(orig: str) -> str:
    s = orig.strip()
    # merge и служебные не трогаем
    if s.startswith('Merge ') or s.startswith('пустой коммит'):
        return s
    m = re.match(r'^([A-Za-zА-Яа-яЁё0-9_]+)\s*:\s*(.+)$', s)
    if m and m.group(1).lower() in PREFIXES:
        s = m.group(2).strip()
    for sep in CUT_SEPS:
        i = s.find(sep)
        if i > 3:
            s = s[:i]
    low = s.lower()
    for marker in REPORT_MARKERS:
        i = low.find(marker)
        if i > 10:
            s = s[:i]
    s = re.sub(r'\s+', ' ', s).strip()
    s = s.rstrip(' .,;:«»()…-–—')
    # внутренние двоеточия после обрезки префикса
    if ': ' in s:
        s = s.split(': ')[0].rstrip(' ,;')
    s = s.strip()
    if s and s[0].isupper() and re.match(r'^[А-ЯЁ]', s):
        # строчная первая буква, кроме начала с имени собственного из заглавных латинских
        if not re.match(r'^[A-Z]', s):
            s = s[0].lower() + s[1:]
    return s

def main():
    log = subprocess.run(['git', 'log', '--all', '--format=%H%x09%s'],
                         capture_output=True, text=True).stdout
    rows, seen = [], set()
    for line in log.splitlines():
        if '\t' not in line:
            continue
        h, subj = line.split('\t', 1)
        if h in seen:
            continue
        seen.add(h)
        d = draft(subj)
        # человеческие короткие не трогаем, если черновик пуст или совпал
        flag = 'KEEP' if d == subj else 'REWRITE'
        if d != subj and len(d) < 3:
            flag = 'BAD'
        rows.append((h, d if d else subj, subj, flag))
    with open('/home/z/my-project/scripts/msgmap_draft.tsv', 'w') as f:
        for h, d, orig, flag in rows:
            f.write(f'{h}\t{flag}\t{d}\t{orig}\n')
    print(f'всего уникальных: {len(rows)}')
    print(f'REWRITE: {sum(1 for r in rows if r[3] == "REWRITE")}, '
          f'KEEP: {sum(1 for r in rows if r[3] == "KEEP")}, '
          f'BAD: {sum(1 for r in rows if r[3] == "BAD")}')

if __name__ == '__main__':
    main()
