#!/bin/bash
# Проверка вычисленных стилей сигнатурных элементов на страницах
check() {
  url=$1; sel=$2; prop=$3
  agent-browser open "http://localhost:8765/$url" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1
  v=$(agent-browser eval "(() => { const e = document.querySelector('$sel'); if (!e) return 'ЭЛЕМЕНТ НЕ НАЙДЕН'; const s = getComputedStyle(e); return s.$prop; })()" 2>/dev/null | tr -d '"')
  echo "$url | $sel | $prop = $v"
}
check "monsters.html" ".monster-card" "border-radius"
check "monsters.html" ".monster-toggle" "cursor"
check "calculator.html" ".calc-container" "display"
check "calculator.html" ".calc-left" "width"
check "heroes.html" ".hero-search" "border-radius"
check "heroes.html" ".hero-count" "color"
check "info.html" ".mc-card" "background-color"
check "map-changes.html" ".mc-table" "border-collapse"
check "compare.html" ".compare-level-total" "font-weight"
check "mechanics.html" ".ability-tag.scepter" "background-color"
check "balance.html" ".hero-page-container" "max-width"
check "build-constructor.html" ".bc-clear-btn" "cursor"
check "bot-builds.html" ".boss-stage" "display"
check "formulas-calc.html" ".formula-bar-container" "display"
check "items.html" ".category-tabs" "display"
check "items.html" ".tab-btn.active" "background-color"
check "index.html" ".footer-bottom" "text-align"
check "index.html" ".nav-link" "border-radius"
