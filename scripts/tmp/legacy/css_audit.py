#!/usr/bin/env python3
"""Аудит CSS сайта loww (DarkDaro/legend-of-worlds-war3).
Только факты: синтаксис, дубли/перекрытия селекторов, url(), var(), !important,
медиа-запросы, классы вне HTML/JS, z-index, шрифты. Никаких выдумок.
Запуск из корня клона репозитория."""
import re, sys, glob, os, collections, json
import tinycss2
from tinycss2 import ast as tast

ROOT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else '.')
BUNDLE_ORDER = []  # заполним из style.css
style_path = os.path.join(ROOT, 'repo-archive/style.css')
if os.path.exists(style_path):
    BUNDLE_ORDER = re.findall(r"@import\s+url\('([^']+)'\);",
                              open(style_path, encoding='utf-8').read())

# порядок каскада: бандл (по BUNDLE_ORDER) потом постраничные css (алфавит как в <link>)
def cascade_rank(path):
    rel = os.path.relpath(path, ROOT).replace(os.sep, '/')
    if rel in BUNDLE_ORDER:
        return (0, BUNDLE_ORDER.index(rel))
    return (1, rel)

CSS_FILES = sorted(glob.glob(os.path.join(ROOT, 'css/*.css'))) + \
            [os.path.join(ROOT, f) for f in ('aibot.css', 'info-auto-level.css', 'map.css')]
CSS_FILES = [f for f in CSS_FILES if os.path.basename(f) != 'all.css']
CSS_FILES.sort(key=cascade_rank)

props = "align-content align-items align-self all animation animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count animation-name animation-play-state animation-timing-function appearance aspect-ratio backface-visibility background background-attachment background-blend-mode background-clip background-color background-image background-origin background-position background-repeat background-size border border-block border-block-color border-block-end border-block-end-color border-block-end-style border-block-end-width border-block-start border-block-start-color border-block-start-style border-block-start-width border-block-style border-block-width border-bottom border-bottom-color border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width border-collapse border-color border-image border-image-outset border-image-repeat border-image-slice border-image-source border-image-width border-inline border-inline-end border-inline-end-color border-inline-end-style border-inline-end-width border-inline-start border-inline-start-color border-inline-start-style border-inline-start-width border-inline-style border-inline-width border-left border-left-color border-left-style border-left-width border-radius border-right border-right-color border-right-style border-right-width border-spacing border-style border-top border-top-color border-top-left-radius border-top-right-radius border-top-style border-top-width border-width bottom box-decoration-break box-shadow box-sizing break-after break-before break-inside caption-side caret-color clear clip color column-count column-fill column-gap column-rule column-rule-color column-rule-style column-rule-width column-span column-width columns content counter-increment counter-reset cursor direction display empty-cells filter flex flex-basis flex-direction flex-flow flex-grow flex-shrink flex-wrap float font font-family font-feature-settings font-kerning font-size font-size-adjust font-stretch font-style font-synthesis font-variant font-variant-caps font-variant-east-asian font-variant-ligatures font-variant-numeric font-variant-position font-weight gap grid grid-area grid-auto-columns grid-auto-flow grid-auto-rows grid-column grid-column-end grid-column-gap grid-column-start grid-gap grid-row grid-row-end grid-row-gap grid-row-start grid-template grid-template-areas grid-template-columns grid-template-rows height hyphens image-rendering inset inset-block inset-block-end inset-block-start inset-inline inset-inline-end inset-inline-start isolation justify-content justify-items justify-self left letter-spacing line-break line-height list-style list-style-image list-style-position list-style-type margin margin-block margin-block-end margin-block-start margin-bottom margin-inline margin-inline-end margin-inline-start margin-left margin-right margin-top mask mask-border mask-border-mode mask-border-outset mask-border-repeat mask-border-slice mask-border-source mask-border-width mask-clip mask-composite mask-image mask-mode mask-origin mask-position mask-repeat mask-size max-height max-width max-block-size max-inline-size min-height min-width min-block-size min-inline-size mix-blend-mode object-fit object-position offset offset-anchor offset-distance offset-path offset-rotate opacity order outline outline-color outline-offset outline-style outline-width overflow overflow-anchor overflow-block overflow-clip-margin overflow-inline overflow-wrap overflow-x overflow-y overscroll-behavior overscroll-behavior-block overscroll-behavior-inline overscroll-behavior-x overscroll-behavior-y padding padding-block padding-block-end padding-block-start padding-bottom padding-inline padding-inline-end padding-inline-start padding-left padding-right padding-top page-break-after page-break-before page-break-inside paint-order perspective perspective-origin place-content place-items place-self pointer-events position quotes resize right rotate row-gap scale scroll-behavior scroll-margin scroll-margin-block scroll-margin-block-end scroll-margin-block-start scroll-margin-bottom scroll-margin-inline scroll-margin-inline-end scroll-margin-inline-start scroll-margin-left scroll-margin-right scroll-margin-top scroll-padding scroll-padding-block scroll-snap-align scroll-snap-stop scroll-snap-type scrollbar-color scrollbar-gutter scrollbar-width shape-image-threshold shape-margin shape-outside stop-color stop-opacity stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-width tab-size table-layout text-align text-align-last text-combine-upright text-decoration text-decoration-color text-decoration-line text-decoration-skip-ink text-decoration-style text-decoration-thickness text-emphasis text-emphasis-color text-emphasis-position text-emphasis-style text-indent text-justify text-orientation text-overflow text-rendering text-shadow text-transform text-underline-offset text-underline-position top touch-action transform transform-box transform-origin transform-style transition transition-delay transition-duration transition-property transition-timing-function translate unicode-bidi user-select vertical-align visibility white-space width will-change word-break word-spacing writing-mode z-index zoom"
KNOWN_PROPS = set(props.split())
VENDOR_OK = re.compile(r"^-(webkit|moz|ms|o)-[a-z-]+$")
CUSTOM = re.compile(r"^--[a-zA-Z0-9-]+$")

report = {'files': [], 'syntax': [], 'unknown_props': [], 'empty_rules': [],
          'important': collections.defaultdict(list), 'urls': [],
          'var_undefined': collections.defaultdict(list), 'var_unused': [],
          'dup_selectors': collections.defaultdict(list), 'zindex': [],
          'media': collections.defaultdict(set), 'hardcoded_colors': collections.Counter(),
          'font_families': collections.Counter(), 'classes': collections.defaultdict(set)}

def norm_sel(sel):
    s = tinycss2.serialize(sel).strip()
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'\s*([>+~,])\s*', r'\1', s)
    return s

def decl_value(v):
    return tinycss2.serialize(v).strip()

for path in CSS_FILES:
    rel = os.path.relpath(path, ROOT).replace(os.sep, '/')
    text = open(path, encoding='utf-8').read()
    rec = {'file': rel, 'bytes': len(text), 'rules': 0}
    rules, errors = tinycss2.parse_stylesheet_bytes(text.encode('utf-8'))
    # подсчёт неструктурных ошибок
    for tok in rules:
        if tok.type == 'error':
            report['syntax'].append(f"{rel}: {tok.message}")
    def walk(nodes, media_ctx=''):
        for node in nodes:
            if node.type == 'qualified-rule':
                sel = norm_sel(node.prelude)
                if not sel:
                    continue
                decls = tinycss2.parse_declaration_list(node.content)
                rec['rules'] += 1
                keep = {}
                for d in decls:
                    if d.type != 'declaration':
                        if d.type == 'error':
                            report['syntax'].append(f"{rel}{media_ctx}: {d.message} (в `{sel[:70]}`)")
                        continue
                    name = d.lower_name
                    val = decl_value(d.value)
                    if name.startswith('--'):
                        m = re.match(r'(--[a-zA-Z0-9-]+)\s*$', name)
                        if media_ctx == '':
                            defs_vars.add(m.group(1))
                        continue
                    if name not in KNOWN_PROPS and not VENDOR_OK.match(name):
                        report['unknown_props'].append(f"{rel}{media_ctx}: `{name}: {val[:40]}` в `{sel[:70]}`")
                    for vt in (d.value if isinstance(d.value, list) else [d.value]):
                        if getattr(vt, 'type', None) == 'error':
                            report['syntax'].append(f"{rel}{media_ctx}: значение `{name}` — {vt.message}")
                    # !important
                    if d.important:
                        report['important'][f"{sel}"].append(f"{rel}{media_ctx} [{name}]")
                    keep[name] = val
                    # url()
                    for u in re.findall(r'url\((["\']?)([^)"\']+)\1\)', val):
                        report['urls'].append((rel, media_ctx, sel, u[1]))
                    # var()
                    for v in re.findall(r'var\(\s*(--[a-zA-Z0-9-]+)', val):
                        if media_ctx == '':
                            uses_vars.setdefault(v, []).append(rel)
                    # z-index
                    if name == 'z-index' and media_ctx == '':
                        m = re.match(r'^(-?\d+)$', val.strip())
                        if m:
                            report['zindex'].append((int(m.group(1)), sel, rel))
                    # цвета
                    if name in ('color','background','background-color','border','border-color','box-shadow','text-shadow','outline','outline-color','border-top','border-bottom','border-left','border-right','background-image','fill','stroke') or 'shadow' in name or 'border' in name:
                        for hx in re.findall(r'#[0-9a-fA-F]{3,8}\b', val):
                            report['hardcoded_colors'][rel] += 1
                    if name == 'font-family':
                        report['font_families'][val] += 1
                if not keep:
                    report['empty_rules'].append(f"{rel}{media_ctx}: `{sel[:80]}`")
                key = (media_ctx, sel)
                report['dup_selectors'][key].append((rel, keep))
                # классы
                for cl in re.findall(r'\.([a-zA-Z_][a-zA-Z0-9_-]*)', sel):
                    report['classes'][cl].add(rel)
            elif node.type == 'at-rule':
                pre = tinycss2.serialize(node.prelude).strip()
                if node.lower_at_keyword == 'media':
                    for cond in re.findall(r'\(([^)]+)\)', pre):
                        m2 = re.match(r'\s*(min|max)-width\s*:\s*([\d.]+)(px|em|rem)', cond)
                        if m2:
                            report['media'][pre].add(rel)
                    walk(node.content, media_ctx=f" [{pre[:60]}]")
                elif node.lower_at_keyword == 'supports':
                    walk(node.content, media_ctx=f" [@supports]")
                elif node.lower_at_keyword in ('keyframes', 'font-face', 'page'):
                    if node.lower_at_keyword == 'font-face':
                        for d in tinycss2.parse_declaration_list(node.content):
                            if d.type == 'declaration' and d.lower_name == 'font-family':
                                report['font_families']['@font-face: ' + decl_value(d.value)] += 1
                    continue
    defs_vars = set()
    uses_vars = {}
    walk(rules)
    # var определённые в HTML (style="") и в JS
    rec['vars_defined'] = len(defs_vars)
    report.setdefault('_var_defs', set()).update(defs_vars)
    report.setdefault('_var_uses', {}).update({k: report.get('_var_uses', {}).get(k, []) + v for k, v in uses_vars.items()})
    report['files'].append(rec)

# ---- var(): определение в HTML/JS inline ----
html_js_text = ''
for f in glob.glob(os.path.join(ROOT, '**/*.html'), recursive=True):
    if os.sep + '.git' in f or 'repo-archive' in f or 'archive' + os.sep in f:
        continue
    html_js_text += open(f, encoding='utf-8', errors='replace').read()
for f in glob.glob(os.path.join(ROOT, '*.js')) + glob.glob(os.path.join(ROOT, 'js/*.js')):
    html_js_text += open(f, encoding='utf-8', errors='replace').read()
inline_defs = set(re.findall(r'(--[a-zA-Z0-9-]+)\s*:', html_js_text))

all_defs = report['_var_defs'] | inline_defs
for v, files in sorted(report['_var_uses'].items()):
    if v not in all_defs:
        report['var_undefined'][v] = sorted(set(files))
for d in sorted(report['_var_defs']):
    if d not in report['_var_uses']:
        report['var_unused'].append(d)

# ---- url(): существование ----
bad_urls = []
for rel, media, sel, u in report['urls']:
    if u.startswith(('data:', 'http://', 'https://', '//')):
        continue
    base = os.path.dirname(os.path.join(ROOT, rel))
    target = os.path.normpath(os.path.join(base, u.split('?')[0].split('#')[0]))
    if not os.path.exists(target):
        bad_urls.append(f"{rel}{media}: {u} (из `{sel[:60]}`)")

# ---- классы против HTML/JS ----
html_text = html_js_text
css_classes = set(report['classes'].keys())
dead = []
for cl in sorted(css_classes):
    if cl not in html_text:
        dead.append(cl)

# ---- дубли селекторов ----
dups_conflict, dups_same, dups_ctx = [], [], []
for (media, sel), entries in report['dup_selectors'].items():
    if len(entries) < 2:
        continue
    files = [e[0] for e in entries]
    if len(set(files)) < len(files) and len(set(files)) == 1:
        continue  # внутри одного файла — отдельно не показываем
    merged = {}
    conflict = False
    for f, keep in entries:
        for k, v in keep.items():
            if k in merged and merged[k][0] != v:
                conflict = True
            merged.setdefault(k, (v, f))
    if media:
        dups_ctx.append((media, sel, files))
    elif conflict:
        dups_conflict.append((sel, files, merged))
    else:
        dups_same.append((sel, files))

def out(*a):
    print(*a)

out("=" * 70)
out("ФАЙЛЫ (порядок каскада)")
for rec in report['files']:
    out(f"  {rec['file']:30s} {rec['bytes']:>7d} Б  правил: {rec['rules']}")
out(f"\nСИНТАКСИС: {len(report['syntax'])} проблем")
for s in report['syntax'][:40]:
    out("  !", s)
out(f"\nНЕИЗВЕСТНЫЕ/ОПЕЧАТКИ свойств: {len(report['unknown_props'])}")
for s in report['unknown_props'][:40]:
    out("  !", s)
out(f"\nПУСТЫЕ ПРАВИЛА: {len(report['empty_rules'])}")
for s in report['empty_rules'][:20]:
    out("  -", s)
out(f"\n!important: {sum(len(v) for v in report['important'].values())} объявлений в {len(report['important'])} селекторах")
for sel, lst in sorted(report['important'].items(), key=lambda x: -len(x[1]))[:15]:
    out(f"  {sel[:60]:60s} x{len(lst)}  {lst[0]}")
out(f"\nБИТЫЕ url(): {len(bad_urls)}")
for s in bad_urls[:20]:
    out("  !", s)
out(f"\nvar() НЕ ОПРЕДЕЛЁН: {len(report['var_undefined'])}")
for v, fs in list(report['var_undefined'].items())[:20]:
    out(f"  ! {v}  <- {', '.join(fs[:3])}")
out(f"\nvar() ОПРЕДЕЛЁН, НО НЕ ИСПОЛЬЗОВАН: {len(report['var_unused'])}")
out("  " + ", ".join(report['var_unused'][:30]))
out(f"\nДУБЛИ СЕЛЕКТОРОВ С КОНФЛИКТОМ ЗНАЧЕНИЙ: {len(dups_conflict)}")
for sel, files, merged in dups_conflict[:25]:
    diffs = [f"{k}: {v[0]} ({v[1]})" for k, v in list(merged.items())[:6]]
    out(f"  {sel[:70]}\n     файлы: {', '.join(dict.fromkeys(files))}\n     {diffs}")
out(f"\nДУБЛИ СЕЛЕКТОРОВ БЕЗ КОНФЛИКТА (чистый повтор): {len(dups_same)}")
for sel, files in dups_same[:15]:
    out(f"  {sel[:60]:60s} <- {', '.join(dict.fromkeys(files))}")
out(f"\nОДИН СЕЛЕКТОР В РАЗНЫХ МЕДИА-ЗАПРОСАХ: {len(dups_ctx)}")
for media, sel, files in dups_ctx[:15]:
    out(f"  {sel[:55]:55s} {media[:50]}")
out("\nМЕДИА-ЗАПРОСЫ (брейкпоинты):")
for pre, files in sorted(report['media'].items()):
    out(f"  {pre[:70]:70s} <- {', '.join(sorted(files))}")
out(f"\nz-index: {sorted(set(z[0] for z in report['zindex']))}")
out(f"\nЦВЕТА HARDCODE (hex, без переменных), по файлам: {dict(report['hardcoded_colors'].most_common(12))}")
out("\nШРИФТЫ (font-family):")
for ff, n in report['font_families'].most_common(10):
    out(f"  {n:3d} x  {ff[:80]}")
out(f"\nКЛАССОВ В CSS: {len(css_classes)}; не встречается ни в HTML, ни в JS: {len(dead)}")
out("  " + ", ".join(dead[:60]))
json.dump({'dead_classes': dead, 'dups_conflict': [[s, f] for s, f, _ in dups_conflict],
           'dups_same': [[s, f] for s, f in dups_same], 'dups_ctx': [[m, s] for m, s, _ in dups_ctx]},
          open('/tmp/css_audit.json', 'w'), ensure_ascii=False, indent=1)
out("\n(детали в /tmp/css_audit.json)")
