#!/usr/bin/env python3
# Финализатор: черновик + ручные замены -> msgmap_final.tsv (полный хэш TAB сообщение).
# Валидация: без тире, стрелок, параграфов, кавычек-ёлочек, несбалансированных скобок.
import re
import sys

sys.path.insert(0, '/home/z/my-project/scripts')
from msg_overrides import OVERRIDES

BAD_CHARS = re.compile(r'[—–→§«»]')

def paren_balance(s: str) -> bool:
    return s.count('(') == s.count(')')

def main():
    problems, out = [], []
    with open('/home/z/my-project/scripts/msgmap_draft.tsv') as f:
        for line in f:
            full, flag, draft, orig = line.rstrip('\n').split('\t')
            short = full[:7]
            msg = draft
            if short in OVERRIDES:
                v = OVERRIDES[short]
                msg = orig if v == 'ORIG:' else v
            elif flag == 'KEEP':
                msg = orig
            if msg != orig:
                if BAD_CHARS.search(msg):
                    problems.append((short, 'спецсимвол', msg))
                if not paren_balance(msg):
                    problems.append((short, 'скобки', msg))
                if len(msg) > 75:
                    problems.append((short, 'длинно', msg))
                if msg != msg.strip() or '  ' in msg:
                    problems.append((short, 'пробелы', msg))
            out.append((full, msg, orig, msg != orig))

    if problems:
        print('ПРОБЛЕМЫ:')
        for short, kind, msg in problems:
            print(f'  {short} [{kind}] {msg}')
    with open('/home/z/my-project/scripts/msgmap_final.tsv', 'w') as f:
        for full, msg, orig, changed in out:
            f.write(f'{full}\t{msg}\t{orig}\t{"1" if changed else "0"}\n')
    changed = sum(1 for r in out if r[3])
    print(f'итого: {len(out)} коммитов, меняется {changed}, без изменений {len(out) - changed}')

if __name__ == '__main__':
    main()
