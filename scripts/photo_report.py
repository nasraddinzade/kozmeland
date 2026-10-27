"""Verify every product photo and print the photo report (counts by source, category, brand, price bucket).

    python -I scripts/photo_report.py
"""
import json
import re
from collections import Counter
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "public" / "products"
import sys
sys.path.insert(0, str(ROOT / "scripts"))
from gen_products import parse_rows  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8")
rows = parse_rows()
for r in rows:
    r["noImage"] = not (IMG / f"{r['slug']}.webp").exists()
sources = {}
for f in (ROOT / "scripts" / "image-sources").glob("*.json"):
    for e in json.loads(f.read_text(encoding="utf-8")):
        sources[e["slug"]] = e

bad = []
for r in rows:
    p = IMG / f"{r['slug']}.webp"
    if r["noImage"]:
        if p.exists():
            bad.append(f"{r['slug']}: file exists but noImage")
        continue
    if p.stat().st_size <= 5 * 1024:
        bad.append(f"{r['slug']}: <=5KB")
    with Image.open(p) as im:
        if im.size != (800, 800) or im.format != "WEBP":
            bad.append(f"{r['slug']}: {im.format} {im.size}")
extra = {p.stem for p in IMG.glob("*.webp")} - {r["slug"] for r in rows}
print("verification problems:", bad or "none", "| stray files:", sorted(extra) or "none")

shown = [r for r in rows if not r["noImage"]]
print(f"\nphotos: {len(shown)} of {len(rows)}")
print("by source type:", dict(Counter(sources[r['slug']]['sourceType'] for r in shown)))
print("by source:", dict(Counter(sources[r['slug']]['sourceName'] for r in shown).most_common()))
cats = ["Üz makiyajı", "Gözlər", "Dodaqlar", "Dəri qulluğu", "Bədən və saç", "Hədiyyə dəstləri"]
print("\nby category (shown / total):")
for c in cats:
    print(f"  {c}: {sum(r['category']==c for r in shown)} / {sum(r['category']==c for r in rows)}")
print("\nby brand (shown / total):")
for b in sorted({r['brand'] for r in rows}, key=str.lower):
    print(f"  {b}: {sum(r['brand']==b for r in shown)} / {sum(r['brand']==b for r in rows)}")
cents = sorted(round(float(r["price"]) * 100) for r in shown)
n = len(cents); c1, c2 = cents[n // 3], cents[2 * n // 3]
buckets = [[c for c in cents if c < c1], [c for c in cents if c1 <= c < c2], [c for c in cents if c >= c2]]
print("\nprice buckets (shown):")
for b in buckets:
    print(f"  {b[0]/100:.2f} – {b[-1]/100:.2f} AZN: {len(b)}")
print("\nnoImage:")
for r in rows:
    if r["noImage"]:
        print(f"  {r['slug']} — {sources.get(r['slug'], {}).get('note', 'no record')[:140]}")
