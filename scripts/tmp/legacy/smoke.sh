#!/bin/bash
# Смоук-тест сайта в headless-браузере: сервер живёт в рамках одного вызова.
SITE=/home/z/my-project/_local/loww
pkill -f "http.server 8766" 2>/dev/null
setsid python3 -m http.server 8766 --directory "$SITE" >/tmp/srv2.log 2>&1 &
sleep 1.5
BASE=http://localhost:8766
curl -s -o /dev/null -w "server start: %{http_code}\n" "$BASE/index.html"

check() {
  p="$1"
  out=$(timeout 60 agent-browser open "$BASE/$p" --timeout 20000 2>&1)
  if echo "$out" | grep -q "✗"; then echo "NAV FAIL: $p"; return 1; fi
  timeout 25 agent-browser wait --load networkidle --timeout 10000 >/dev/null 2>&1
  url=$(timeout 20 agent-browser get url 2>/dev/null)
  errs=$(timeout 20 agent-browser errors 2>/dev/null | grep -v '^\s*$' | head -5)
  cons=$(timeout 20 agent-browser console 2>/dev/null | grep -iE 'uncaught|failed' | head -3)
  if [[ "$url" != *"$p" ]]; then echo "URL MISMATCH: $p -> $url"; return 1; fi
  if [[ -n "$errs" ]]; then echo "PAGE ERRORS $p:"; echo "$errs"; return 1; fi
  echo "OK: $p"
  [[ -n "$cons" ]] && echo "  console: $cons"
  return 0
}

for p in index.html heroes.html items.html heroes/paladin.html heroes/illusionist.html \
         calculator.html bot-builds.html tierlist.html balance-dashboard.html compare.html \
         guides/guide-admiral.html 404.html; do
  check "$p"
done

echo "--- render checks ---"
timeout 60 agent-browser open "$BASE/heroes/paladin.html" --timeout 20000 >/dev/null 2>&1
timeout 25 agent-browser wait --load networkidle --timeout 10000 >/dev/null 2>&1
timeout 20 agent-browser eval "JSON.stringify({page:location.pathname, bodyLen:document.body.innerText.length, abilityCards:document.querySelectorAll('.ability-card').length, abilityImgs:document.querySelectorAll('.ability-icon img').length, brokenImgs:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length})" 2>/dev/null

timeout 60 agent-browser open "$BASE/items.html" --timeout 20000 >/dev/null 2>&1
timeout 25 agent-browser wait --load networkidle --timeout 10000 >/dev/null 2>&1
timeout 20 agent-browser eval "JSON.stringify({page:location.pathname, itemCards:document.querySelectorAll('.item-card').length, bodyLen:document.body.innerText.length, brokenImgs:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length})" 2>/dev/null

timeout 60 agent-browser open "$BASE/" --timeout 20000 >/dev/null 2>&1
timeout 25 agent-browser wait --load networkidle --timeout 10000 >/dev/null 2>&1
timeout 20 agent-browser eval "JSON.stringify({page:location.pathname, heroCards:document.querySelectorAll('.hero-card').length, bodyLen:document.body.innerText.length})" 2>/dev/null

pkill -f "http.server 8766" 2>/dev/null
agent-browser close >/dev/null 2>&1
echo DONE
