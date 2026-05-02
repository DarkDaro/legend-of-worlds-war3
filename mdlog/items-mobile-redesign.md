# Items Page Mobile Redesign

## Status: ON HOLD — user needs to think about best approach

## Test Page
`test-item-preview.html` in HeroData root — 6 sample items, 3 switchable modes

## Three Variants Tested

### A: Tooltip
- Desktop: hover shows tooltip card next to item
- Mobile: tap → tooltip, second tap → full panel below
- Pros: quick preview, no scroll needed
- Cons: tooltip positioning can be tricky on small screens, two-tap mechanic may confuse

### B: Panel Below (current approach, improved)
- Click → detail panel appears below the grid with auto-scroll
- Pros: familiar, simple, already partially implemented
- Cons: requires scrolling, user loses context of the grid

### C: Bottom Sheet
- Click → sheet slides up from bottom, overlay dims background
- Close: swipe down or ✕ button
- Pros: mobile-native feel, doesn't break page flow, always accessible
- Cons: more complex implementation, overlay may feel heavy

## Emoji Fallback Issue
- Long-press on item icon shows raw emoji (from onerror in itemIcon())
- Fix: replace emoji fallback with FA icon, remove image-rendering: pixelated

## Decision Pending
User said "я пока не знаю как лучше" — will return to this later
