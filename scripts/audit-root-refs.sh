#!/usr/bin/env bash
# Поверхностный аудит корневых js/css в loww: кто на них ссылается.
# Два общих прохода rg вместо скана на файл. Использование: bash audit-root-refs.sh
cd /home/z/my-project/loww || exit 1
OUT=/tmp/audit-refs.txt

# Проход 1: все script src / link href из всех html (корень, heroes/, guides/)
rg -o --no-filename -g '!.git' -g '!repo-archive' -g '*.html' \
  -e '(src|href)="[^"]+\.(js|css)"' . \
  | sed -E 's/^(src|href)="//; s/"$//' | sort > "$OUT"
echo "=== ВСЕ ПОДКЛЮЧЕНИЯ js/css ИЗ HTML (уникальные пути) ==="
uniq -c "$OUT" | sort -rn

echo ""
echo "=== КТО ПОДКЛЮЧАЕТ КОРЕВНЫЕ ФАЙЛЫ (имя файла -> число html) ==="
for f in *.js *.css; do
  cnt=$(rg -c -g '!.git' -g '!repo-archive' -g '*.html' -F "\"$f\"" . 2>/dev/null | awk -F: '{s+=$2} END{print s+0}')
  echo "$f | html: $cnt"
done

echo ""
echo "=== НЕ-HTML ССЫЛКИ (js/py/mjs/xml/json/txt) на корневые файлы ==="
for f in *.js *.css; do
  hits=$(rg -l --no-messages -g '!.git' -g '!repo-archive' -g '!*.html' -g '!*.md' -g '!docs/**' -F "$f" . 2>/dev/null | tr '\n' ' ')
  [ -n "$hits" ] && echo "$f -> $hits"
done
