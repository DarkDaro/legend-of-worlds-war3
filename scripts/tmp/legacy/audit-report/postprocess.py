#!/usr/bin/env python3
"""Постобработка docx (toc.md § Footer Field Instruction):
1) убрать пустой <w:pgNumType/> из document.xml (мусор docx-js);
2) проставить формат-переключатели PAGE в колонтитулах по секциям:
   секция 2 (содержание) -> PAGE \\* ROMAN, секция 3 (тело) -> PAGE \\* arabic.
Определение файлов колонтитулов — через footerReference -> document.xml.rels.
Запуск: python3 postprocess.py <файл.docx>
"""
import re
import shutil
import sys
import zipfile
from pathlib import Path

path = Path(sys.argv[1])
tmp = path.with_suffix(".tmp.docx")

with zipfile.ZipFile(path) as zin:
    items = {n: zin.read(n) for n in zin.namelist()}

doc = items["word/document.xml"].decode("utf-8")

# 1) пустые pgNumType долой
doc = doc.replace("<w:pgNumType/>", "")

# 1a) внутри поля TOC убрать hyperlink-запись без видимого номера страницы
#     (адд-он дублирует первую строку); сам абзац поля (begin+instr+separate) не трогаем
def _fix_toc(m):
    frag = m.group(0)
    if "PAGEREF" not in frag:
        return frag
    texts = re.findall(r"<w:t[^>]*>([^<]*)</w:t>", frag)
    if not any(t.strip().isdigit() for t in texts):
        return ""
    return frag
doc = re.sub(r"<w:hyperlink\b[^>]*>(?:(?!</w:hyperlink>).)*?</w:hyperlink>", _fix_toc, doc, flags=re.S)

# 1b) стили TOC1/TOC2/TOC3: плотнее межабзацный интервал, чтобы содержание
#     и подсказка умещались на одной странице
if "word/styles.xml" in items:
    st = items["word/styles.xml"].decode("utf-8")
    for sid in ("TOC1", "TOC2", "TOC3"):
        pat = re.compile(r'(<w:style [^>]*w:styleId="' + sid + r'"[^>]*>)(.*?)(</w:style>)', re.S)
        m = pat.search(st)
        if not m:
            continue
        inner = m.group(2)
        spacing = '<w:spacing w:after="40" w:line="276" w:lineRule="auto"/>'
        if "<w:pPr>" in inner:
            inner2 = re.sub(r"<w:spacing[^/]*/>", "", inner, count=1)
            inner2 = inner2.replace("<w:pPr>", "<w:pPr>" + spacing, 1)
        else:
            inner2 = "<w:pPr>" + spacing + "</w:pPr>" + inner
        st = st[:m.start()] + m.group(1) + inner2 + m.group(3) + st[m.end():]
    items["word/styles.xml"] = st.encode("utf-8")

# 2) порядок секций: собрать footerReference r:id по секциям в порядке документа
sect_prs = re.findall(r"<w:sectPr[ >].*?</w:sectPr>", doc, flags=re.S)
refs = []  # [(section_index, rid), ...]
for i, sp in enumerate(sect_prs):
    for m in re.finditer(r'<w:footerReference[^>]*w:type="default"[^>]*r:id="(rId\d+)"', sp):
        refs.append((i, m.group(1)))

rels = items["word/_rels/document.xml.rels"].decode("utf-8")
rid2file = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="(footer\d+\.xml)"', rels))

# секция с upperRoman -> ROMAN, остальные с DECIMAL -> arabic
def fmt_of_section(i):
    sp = sect_prs[i]
    if 'w:fmt="upperRoman"' in sp:
        return "ROMAN"
    return "arabic"

patched = []
for i, rid in refs:
    fname = rid2file.get(rid)
    if not fname:
        continue
    key = "word/" + fname
    xml = items[key].decode("utf-8")
    fmt = fmt_of_section(i)
    new = re.sub(
        r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
        r"\1 PAGE \\* " + fmt + r" \\* MERGEFORMAT \2",
        xml,
    )
    if new != xml:
        items[key] = new.encode("utf-8")
        patched.append((fname, fmt))

items["word/document.xml"] = doc.encode("utf-8")

with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
    for name, data in items.items():
        zout.writestr(name, data)
shutil.move(tmp, path)
print("колонтитулы:", patched or "не найдены — проверь разметку")
