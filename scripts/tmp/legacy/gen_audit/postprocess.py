#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Пост-обработка docx: формат-свитчи в футерах (WPS) + удаление пустых pgNumType."""
import zipfile, shutil, re, sys

SRC = "/home/z/my-project/download/Технический_аудит_сайта_Legend_of_Worlds.docx"
TMP = "/tmp/docx_patch"

shutil.rmtree(TMP, ignore_errors=True)
with zipfile.ZipFile(SRC) as z:
    z.extractall(TMP)

# 1. Футеры: маркер цвета 7F7F7F = римская секция, 808080 = арабская.
import glob, os
for fp in glob.glob(os.path.join(TMP, "word", "footer*.xml")):
    xml = open(fp, encoding="utf-8").read()
    if "PAGE" not in xml:
        continue
    if "7F7F7F" in xml:
        xml2 = re.sub(r'(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)', r'\1 PAGE \\* ROMAN \\* MERGEFORMAT \2', xml)
        tag = "ROMAN"
    else:
        xml2 = re.sub(r'(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)', r'\1 PAGE \\* arabic \\* MERGEFORMAT \2', xml)
        tag = "arabic"
    if xml2 != xml:
        open(fp, "w", encoding="utf-8").write(xml2)
        print(f"patched {os.path.basename(fp)} -> {tag}")

# 2. document.xml: убрать пустые <w:pgNumType/> + дедуп первой строки TOC
dp = os.path.join(TMP, "word", "document.xml")
xml = open(dp, encoding="utf-8").read()
n = len(re.findall(r'<w:pgNumType/>', xml))
xml = xml.replace('<w:pgNumType/>', '')
print(f"removed empty pgNumType: {n}")

# 2a. add_toc_placeholders вставляет первую запись внутрь абзаца поля TOC
# (после separate), а её копия идёт отдельным абзацем -> дубль в рендере.
# Оставляем в абзаце поля только begin+instrText+separate.
m = re.search(
    r'(<w:instrText[^>]*>\s*TOC[^<]*</w:instrText>'
    r'(?:(?!<w:fldChar).)*?<w:fldChar w:fldCharType="separate"/>(?:</w:r>)?)'
    r'(.*?)'
    r'(</w:p>)',
    xml, re.S,
)
if m and 'PAGEREF' in m.group(2):
    xml = xml[:m.start(2)] + xml[m.end(2):]
    print("TOC dedup: удалён дубль первой записи из абзаца поля")
else:
    print("TOC dedup: шаблон не найден (пропускаю)")
open(dp, "w", encoding="utf-8").write(xml)

# 3. Пересобрать zip
out = SRC
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(TMP):
        for f in files:
            full = os.path.join(root, f)
            z.write(full, os.path.relpath(full, TMP))
print("repacked:", out, os.path.getsize(out), "bytes")
