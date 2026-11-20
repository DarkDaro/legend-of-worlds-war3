#!/usr/bin/env python3
"""Одноразовый сканер стиля видимого текста html-страниц сайта.
Ищет: длинные/средние тире, стрелки, слоуп-слова и глянец в видимой прозе.
Не коммитится в репозиторий, живёт только в песочнице."""
import re
import html as htmllib
from pathlib import Path

ROOT = Path("/home/z/my-project/_local/loww")

# что считаем слоуп-маркерами в видимой прозе
SLOP_WORDS = [
    r"не просто", r"погруж[ао]", r"путешеств", r"уникальн", r"залог успеха",
    r"широкий выбор", r"наслажд", r"идеальн", r"ваш[ао]й? (путь|выбор|стиль)",
    r"мире (игр|warcraft|wc3)", r"окун[уи]ться", r"атмосфер[уы]н",
    r"философия", r"миссия проекта", r"мы верим", r"добро пожаловать",
    r"эпич", r"легендарн", r"магия", r"дух (игры|карты)", r"комьюнити",
    r"экосистем", r"функционал", r"интуитивн", r"бесшовн", r"глубок[ао]",
    r"погружение", r"погружаться",
]

def visible_text(path: Path) -> str:
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"<script[\s\S]*?</script>", " ", raw, flags=re.I)
    raw = re.sub(r"<style[\s\S]*?</style>", " ", raw, flags=re.I)
    raw = re.sub(r"<!--[\s\S]*?-->", " ", raw)
    raw = re.sub(r"<[^>]+>", " ", raw)
    raw = htmllib.unescape(raw)
    raw = re.sub(r"\s+", " ", raw)
    return raw

def main():
    pages = sorted(ROOT.glob("*.html"))
    report = []
    for page in pages:
        if page.name in ("site-validator.html", "sitemap-page.html"):
            continue
        text = visible_text(page)
        hits = []
        # тире и стрелки
        em = text.count("—")
        en = text.count("–")
        arrows = len(re.findall(r"[→←⇒⇐]", text))
        if em:
            frag = [m for m in re.findall(r"[^ ]{0,25}—[^ ]{0,25}", text)][:3]
            hits.append(f"длинное тире x{em} ({'; '.join(frag)})" if False else f"длинное тире x{em}")
        if en:
            hits.append(f"среднее тире x{en}")
        if arrows:
            hits.append(f"стрелки x{arrows}")
        for w in SLOP_WORDS:
            found = re.findall(w, text, flags=re.I)
            if found:
                hits.append(f"слоуп-слово «{found[0]}» x{len(found)}")
        # афоризмы: короткие пафосные двустишия не ловим автоматом, только вручную
        if hits:
            report.append((page.name, hits))
    if not report:
        print("ЧИСТО: тире, стрелок и слоуп-слов в видимых текстах нет")
    for name, hits in report:
        print(f"{name}:")
        for h in hits:
            print(f"   {h}")

if __name__ == "__main__":
    main()
