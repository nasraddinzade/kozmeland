# Photo sourcing brief (for agents)

Project: `D:\MY APPS\kozmeland` — prototype store for Kozmeland, a cosmetics shop in Baku.
Full spec: `D:\MY APPS\kozmeland\kozmeland-claude-code.md` (section 4 = product list, section 5 "Fotoqrafiyalar"/"Фотографии" = photo rules).

## Goal
For each product slug assigned to you, find a REAL packshot photo of exactly that product and save it as
`public/products/<slug>.webp` (800x800, white bg) using the converter script. Or mark it `noImage`.

## Source priority
1. Brand's official site / manufacturer catalog (Shopify stores usually expose `https://<shop>/products/<handle>.json`
   or `/products.json?limit=250` or `/search/suggest.json?q=...&resources[type]=product` — very handy).
2. Other open sources (big international retailers such as Ulta, Boots, Superdrug, Target, Walmart, Amazon,
   Sephora, Trendyol, Watsons, Notino, official brand pages on retailer sites).

NEVER use: photos from other Baku/Azerbaijan shops' sites, and never frames from Kozmeland's Instagram.

## Exactness rule (most important)
If you cannot find EXACTLY this product by its name on the brand site / a trustworthy source, DO NOT substitute a
similar product — mark it `noImage`. Be extra strict for items whose note contains `adı yoxla`
(name read incompletely from the post slide). For multi-shade products, a photo of any shade of exactly that
product line is fine — note which shade. Prefer a clean packshot on white/transparent background
(not a swatch, not a model photo, not a lifestyle/banner image).

## How to download and convert
- Download raw files into your own new directory:
  `C:\Temp\claude\D--MY-APPS-kozmeland\535c5868-159d-4370-b4c5-f02932b54018\scratchpad\raw\<group>\`
  (use `curl -sL -A "Mozilla/5.0" -o <file> <url>`). For Shopify CDN images you can append `&width=1200`.
- Convert + verify: `python -I "D:/MY APPS/kozmeland/scripts/process_image.py" <raw-file> <slug>`
  (it rejects HTML pages, tiny files, banners, blank images; prints OK or FAIL).
- Then LOOK at the result with the Read tool (`D:\MY APPS\kozmeland\public\products\<slug>.webp`) to confirm it
  shows the right product packshot (not a logo, banner, swatch, or a different product). If wrong, delete it.

## Record sources
Write `D:\MY APPS\kozmeland\scripts\image-sources\<group>.json` — a JSON array, one entry per assigned slug:
```json
{ "slug": "...", "status": "ok" | "noImage", "imageUrl": "direct image url or null",
  "pageUrl": "product page url or null", "sourceType": "brand" | "retailer", "sourceName": "e.g. sheglam.com",
  "note": "shade shown / why noImage / name mismatch details" }
```
Only touch files for your own slugs. Do not edit anything else in the project.
In your final reply: counts (ok / noImage), noImage slugs with one-line reasons, and any data discrepancies
(e.g. the real product name differs from ours) — those are questions for the owner, do not "fix" data.
