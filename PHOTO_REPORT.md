# Отчёт по фотографиям

Найдено **58 из 70**. Каждый файл проверен скриптом `scripts/photo_report.py`: открывается как WEBP 800×800, больше 5 КБ. Каждый снимок также просмотрен вручную: это упаковка нужного товара, а не логотип или баннер. Источник каждой картинки записан в [`public/products/SOURCES.md`](public/products/SOURCES.md).

Товары без фото в каталог не выводятся. Из данных они не удалены, у них стоит флаг `noImage: true` в `src/data/products.ts`.

## Источники

- Сайты брендов, 43 снимка: creamco.com.tr (17), sheglam.com (15), wetnwildbeauty.com (3), revolutionbeauty.com (3), physiciansformula.com (2), maybelline.com (2), urbancare.com.tr (1).
- Розничные магазины, 15 снимков: vitacost.com (3), notino.co.uk (2), notino.fr (1), mcgrocer.com (2), walmart.com (2), dm.de (1), harmoniq.se (1), amazon.com (1), chemistwarehouse.com.au (1), watsons.com.ph (1).

Снимков с сайтов бакинских магазинов и из Instagram Kozmeland нет.

Особый случай, Real Techniques Mini Miracle Concealer Puff. Сервер Watsons не отдал файл напрямую, поэтому картинка снята скриншотом открытой страницы. Качество чуть ниже оригинала.

## По категориям (с фото / всего)

| Категория | С фото | Всего |
|---|---|---|
| Üz makiyajı | 23 | 25 |
| Gözlər | 5 | 6 |
| Dodaqlar | 6 | 6 |
| Dəri qulluğu | 15 | 15 |
| Bədən və saç | 4 | 4 |
| Hədiyyə dəstləri | **5** | 14 |

**Пустых категорий нет.** В «Hədiyyə dəstləri» осталось 5 товаров, это не меньше четырёх, поэтому блок на главной выводится.

## По брендам (с фото / всего)

Cream Co. 17/17 · Sheglam 16/17 · Physicians Formula 6/7 · Technic 4/5 · wet n wild 4/4 · Revolution 4/4 · Maybelline 2/2 · Coty 1/1 · Dry Idea 1/1 · L'Oréal Paris 1/1 · Real Techniques 1/1 · Urban Care 1/1 · Luxury Bathing Co. 0/5 · Victoria's Secret 0/1 · Body Luxuries 0/1 · IDC Institute 0/1 · Velora Beauty 0/1

## Ценовые корзины

Границы — терцили реальных цен товаров с фото.

| Корзина | Товаров |
|---|---|
| 6.00 – 14.34 ₼ | 19 |
| 14.40 – 17.50 ₼ | 19 |
| 18.00 – 32.50 ₼ | 20 |

## Без фото (12)

| Позиция | Причина |
|---|---|
| sheglam-matte-blush-coral-vibes | У Sheglam нет румян в оттенке «Coral Vibes». В линейке Lightweight Matte Blush есть оттенок «Good Vibes», возможно, это он |
| technic-translucent-powder | У Technic нет продукта с названием просто «Translucent Powder». Под это название подходят четыре разные пудры |
| physicians-formula-butter-believe-it-brow-palette | Палетки для бровей у Physicians Formula не нашлось ни под каким названием |
| victorias-secret-love-spell-set | Наборов Love Spell (спрей и лосьон) много версий, какой именно у магазина, не понять |
| luxury-bathing-co-creme-brulee-gift-set | Набора Crème Brûlée с полотенцем, гелем и сывороткой не нашлось |
| luxury-bathing-co-creme-brulee-trio | Не найден (позиция с пометкой «adı yoxla») |
| luxury-bathing-co-nourishing-delights | Набора с таким названием не нашлось |
| luxury-bathing-co-glow-tin | Наборов-жестянок с названием «Glow» нет (позиция с пометкой «adı yoxla») |
| luxury-bathing-co-cashmere-musk-amber | Аромат существует, но набора 2 × 50 мл (гель и крем) нет |
| body-luxuries-poison-beauty-set | Не найден |
| idc-institute-scented-bath-set | «Scented Bath» — целая линейка, набора ровно из геля, скраба, масла и крема в ней нет |
| velora-beauty-floral-set | Товаров бренда в открытых источниках нет |

## Вопросы владельцу: расхождения в названиях

В данных ничего не исправлено.

**Sheglam**
- В посте «Triple Threat Corrective Primer», официально «Triple Threat Correct**ing** Primer».
- В посте «Brow Faction», официально «Brow-**Fection** Angled Brush & Dip». Это один продукт, а не набор.
- В посте «Locked In Setting Spray», официально «Lock'd In».
- В посте «Go Go Glow Highlighter Body Mist», официально «Go Go Glow Highlight**ing** Body Mist».
- Pore No More Primer нет на глобальном sheglam.com. Снимок взят с dm.de.

**Physicians Formula**
- В посте «Starbell Bling Duo», на коробке «**Slaybell** Bling Duo».
- В посте «Waterproof Ultra-Fine Pencil», на самом деле это «Eye Booster Waterproof Ultra-Fine **Liquid Eyeliner**», то есть подводка, а не карандаш.
- Butter Blush официально называется «Murumuru Butter Blush».

**Technic**
- В посте «Coco», на самом деле «Coco Quench Hydrating Gloss Serum».
- Glazed Kiss: на фото коробка-трио, а цена похожа на цену одного тюбика. Нужно проверить, что продаёт магазин.

**Cream Co.**
- В посте «Hyaluronic Acid Jelly Cleanser», официально «Hyaluronic Acid **Glow** Jelly Cleanser».
- В посте «Niacinamide Toner», официально «BHA/PHA Niacinamide Toner».
- В посте «Vitamin C Daily Toner», официально «AHA/BHA Vitamin C Daily Toner».
- Perfecting AHA Complex Serum и Lip Oil Gloss в оттенках Passionfruit и Raspberry открываются только по прямой ссылке. Возможно, их сняли с производства.

**Revolution**
- В описании All About The Jelly сказано «6 məhsul», по данным бренда это 5 продуктов плюс спонж и кисть.

**Другие бренды**
- Dry Idea: на фото прозрачный гелевый стик Advanced Dry Unscented. Нужно подтвердить, что у магазина стик, а не роллер.
- Maybelline Sky High: на фото версия Washable, Very Black. Существуют водостойкая и лимитированные версии.

## Что ещё нужно уточнить (TODO из спецификации)

Номер дома, файл логотипа, условия кредита и скидки студентам, часы работы, актуальность цен. До подтверждения это выключено константой `SHOW_UNCONFIRMED = false` в `src/config.ts`.
