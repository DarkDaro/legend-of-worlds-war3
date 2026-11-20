#!/usr/bin/env python3
# msg-filter для filter-branch: подмена сообщения по полному хэшу из таблицы.
import os
import sys

MAP = {}
with open('/home/z/my-project/scripts/msgmap_final.tsv') as f:
    for line in f:
        parts = line.rstrip('\n').split('\t')
        if len(parts) >= 2:
            MAP[parts[0]] = parts[1]

commit = os.environ.get('GIT_COMMIT', '')
data = sys.stdin.read()
new = MAP.get(commit)
if new is None:
    sys.stdout.write(data)
else:
    sys.stdout.write(new + '\n')
