# Kozmeland. Прототип интернет-магазина

Построй рабочий прототип интернет-магазина для Kozmeland. Это демонстрация для показа владельцу, не боевой магазин. Прочитай всё целиком, прежде чем писать код.

---

## 1. Что это за магазин

Kozmeland (Instagram @kozmeland.az, около 111 тысяч подписчиков, около 3400 постов) это магазин косметики в Баку, район Səbail, улица Hacı Zeynalabdin Tağıyev, рядом с пешеходной Tarqovu. Точка одна.

В шапке профиля магазин называет себя так, оригинальные марки из Кореи, Америки и Турции, продажа в кредит, доставка по адресу и в районы.

Что продают. Массовую и среднюю по цене декоративную косметику (Sheglam, Technic, wet n wild, Physicians Formula, Revolution, L'Oréal Paris, Maybelline и другие), уход за лицом (Cream Co.), немного ухода за телом и волосами, подарочные наборы и подарочные корзины (xonça).

Кто покупает. Девушки и студентки, выбирают по скидке и по бренду, не по составу. Магазин сам говорит с ними через «Endirim» и перечёркнутую старую цену.

Как подают цены. Цены у магазина есть, но не в подписях, а напечатаны на картинках постов. Формат всегда один, старая цена перечёркнута, рядом новая с зелёной галочкой или в красной плашке. Это скидочные цены конкретных акций.

Как принимают заказы сейчас. WhatsApp и визит в магазин.

---

## 2. Направление дизайна

Название идеи «Etiket». Весь сайт устроен как полка в магазине, на которой у каждого товара висит ценник. Главное, что видит человек, это цена, как в постах магазина, только аккуратнее.

### Шрифты

Заголовки и цифры цен **Bricolage Grotesque**, вес 800, плотный и слегка сжатый. Основной текст **Manrope**, веса 400 и 600.

Оба подключать через `next/font/google` с подмножествами latin и latin-ext, потому что нужны ə ş ç ğ ı ö ü İ. Проверить на экране, что все буквы рисуются.

### Палитра

| Цвет | Где |
|---|---|
| `#E4166E` фуксия | ценники, главная кнопка, акцент |
| `#FDE9F0` пудрово-розовый | фон блоков |
| `#1A1418` чернильно-чёрный | текст и логотип, у магазина логотип чёрный линейный на белом |
| `#FFFCFA` молочно-белый | основной фон |
| `#C8A04A` золото | только мелкие звёздочки и тонкие линии, как в акционных баннерах магазина, не больше пары процентов площади |
| `#7C7078` серый | вторичный текст |

### Сетка

Плотная. Каталог 2 колонки на телефоне и 4 на десктопе, зазор 12px, карточка это квадрат с фото на белом, под ним бренд маленькими буквами, название в две строки максимум и ценник.

Ценник это отдельный элемент в форме бирки с чуть скошенным уголком, сверху старая цена перечёркнутая серым, под ней новая крупно фуксией. Процент скидки считается из данных и пишется на маленькой круглой метке в углу фото.

Блоки на главной крупные и с закруглёнными углами, цветом пудрово-розового.

### Первый экран

Без большого фото на всю ширину, потому что настоящие фото у нас это упаковки на белом.

Слева слово Kozmeland крупно, пока текстом, не картинкой, и одна строка «Səbail, Tarqovu». Справа стопка из трёх ценников разного наклона (−3°, +2°, −1°), в каждом настоящий товар из данных с самой большой скидкой, его фото, старая и новая цена. Под ними две кнопки, «Bütün məhsullar» и «WhatsApp-da yaz».

Сразу под первым экраном стена брендов из подписей-таблеток, которая переносится на следующую строку, без горизонтальной прокрутки.

### Ощущение

Яркий торговый зал, где у каждой вещи в руке ценник, но всё чисто и выровнено, не как рекламный листок. Не бутик и не люкс.

### Референсы

Взять у **Notino** плотность каталога, вход через бренды и крупную цену со скидкой. Взять у **Soko Glam** цветные скруглённые блоки на главной.

Отказаться от **Glossier**, держится на студийной съёмке на всю ширину, у нас только упаковки. От **Aesop**, тихая роскошь противоречит скидочной подаче. От **Cult Beauty**, редакционная роскошь, акции не в центре. От навигации Soko Glam по проблеме кожи, по этому признаку у нас нет данных.

Stylevana не открылась, показала проверку бота, как референс не используется.

---

## 3. Структура и обоснование

У магазина около семидесяти позиций с ценами, цена и скидка главные, фото у всех упаковки на белом. Поэтому плотный каталог со входом через бренд и через скидку, а не крупные развороты и не навигация по консультации.

### Экраны

1. **Главная.** Шапка (слово Kozmeland, поиск, корзина со счётчиком). Первый экран со стопкой ценников. Стена брендов. Блок «Ən çox endirim», 8 карточек, сортировка по проценту скидки. Блок «Hədiyyə dəstləri» на пудрово-розовом фоне, только если после отбора по фото в категории не меньше четырёх товаров. Плитки категорий с фото одного из товаров. Блок «Mağaza» с подтверждёнными контактами
2. **Каталог** `/catalog`. Поиск по названию и бренду. Фильтры, категория, бренд, диапазон цены (границы посчитать по реальным данным, три корзины), сортировка (по скидке, цена по возрастанию, цена по убыванию). Фильтры хранятся в адресной строке
3. **Карточка товара** `/product/[slug]`. Большое фото, бренд (ссылка в каталог с фильтром), название, объём если известен, цена со старой, пометка о дате цены, тип товара, выбор количества, «Səbətə at», кнопка WhatsApp с названием товара в тексте, до четырёх похожих товаров из той же категории
4. **Корзина, оформление, экран успеха**
5. `/magaza`. Контакты и адрес, только подтверждённое

Категории, проверить после отбора по фото, пустые не выводить. Üz makiyajı, Gözlər, Dodaqlar, Dəri qulluğu, Bədən və saç, Hədiyyə dəstləri.

### Фильтры, которые не делаем, и почему

- Тип кожи, проблема кожи, оттенок. По ним нет данных почти ни у одного товара
- Объём. Известен лишь у части товаров, фильтр был бы почти пустым
- Страна производства. Магазин по товарам её не указывает
- Рейтинг и отзывы. Данных нет
- «Новинки» и «в наличии». В данных нет достоверной даты поступления и остатков, дата в данных это дата поста с ценой
- «Только со скидкой». У всех выводимых товаров есть скидка, фильтр был бы всегда включён

### Правило цен. Важное

Это скидочные цены из постов магазина за период с 3 сентября по 21 октября 2026 года. Они прочитаны с картинок постов, а не взяты из прайса. Часть акций могла закончиться.

У каждого товара есть поле `priceAsOf` с датой поста.

```
SHOW_PRICE_DATE = true
```

При `true` дата показывается в двух местах.

1. На карточке товара мелкой строкой `Qiymət {дата} tarixli paylaşıma əsasdır`
2. В шапке каталога одной строкой на всю ширину, спокойным серым, `Qiymətlər mağazanın 3 sentyabr - 21 oktyabr paylaşımlarından götürülüb`

Второе нужно затем, чтобы человек сразу понимал, откуда цифры, а не думал, что они выдуманы.

Цены нигде не округлять и не пересчитывать.

---

## 4. Данные. Позиции

Формат строки, `slug | бренд | название | объём | цена AZN | старая цена AZN | категория | тип товара | дата поста с ценой | примечание`

Прочерк в поле объёма значит, что объём неизвестен, поле оставить пустым. Старая цена пустая значит, что перечёркнутой цены в посте не было.

Все названия и цены прочитаны со слайдов в постах Instagram магазина. Это не гарантия точного названия на сайте бренда. **Если по названию на сайте бренда нельзя найти ровно этот товар, не подставляй похожий, пометь флагом `noImage`.**

Примечание `adı yoxla` значит, что название на слайде читалось не полностью.

```
sheglam-sun-sculpt-liquid-contour | Sheglam | Sun Sculpt Liquid Contour | - | 15.40 | 22.00 | Üz makiyajı | Maye konturlama vasitəsi | 2026-09-25 |
sheglam-color-bloom-liquid-blush | Sheglam | Color Bloom Liquid Blush | - | 16.10 | 23.00 | Üz makiyajı | Maye ənlik | 2026-09-25 |
sheglam-birthday-skin-primer | Sheglam | Birthday Skin Primer | - | 17.50 | 25.00 | Üz makiyajı | Makiyaj bazası | 2026-09-25 |
sheglam-good-grip-hydrating-primer | Sheglam | Good Grip Hydrating Primer | - | 17.50 | 25.00 | Üz makiyajı | Nəmləndirici makiyaj bazası | 2026-09-25 |
sheglam-pore-no-more-primer | Sheglam | Pore No More Primer | - | 25.20 | 36.00 | Üz makiyajı | Məsamə örtücü makiyaj bazası | 2026-09-25 |
sheglam-triple-threat-corrective-primer | Sheglam | Triple Threat Corrective Primer | 30 ml | 19.60 | 28.00 | Üz makiyajı | Makiyaj bazası | 2026-09-25 | adı yoxla
sheglam-skinfinite-hydrating-foundation | Sheglam | Skinfinite Hydrating Foundation | - | 26.60 | 38.00 | Üz makiyajı | Nəmləndirici tonal krem | 2026-09-03 |
sheglam-complexion-pro-foundation | Sheglam | Complexion Pro Foundation | - | 27.30 | 39.00 | Üz makiyajı | Tonal krem | 2026-09-03 |
sheglam-lunar-glow-highlighter | Sheglam | Lunar Glow Highlighter | - | 21.00 | 30.00 | Üz makiyajı | Haylayter | 2026-09-03 |
sheglam-locked-in-setting-spray | Sheglam | Locked In Setting Spray | - | 16.10 | 23.00 | Üz makiyajı | Makiyaj sabitləyici sprey | 2026-09-03 |
sheglam-matte-fresh-setting-spray | Sheglam | Matte Fresh Setting Spray | - | 16.80 | 24.00 | Üz makiyajı | Makiyaj sabitləyici sprey | 2026-09-03 |
sheglam-press-refresh-setting-spray | Sheglam | Press Refresh Setting Spray | - | 17.50 | 25.00 | Üz makiyajı | Makiyaj sabitləyici sprey | 2026-09-03 |
sheglam-matte-blush-coral-vibes | Sheglam | Matte Blush Coral Vibes | - | 17.50 | 25.00 | Üz makiyajı | Mat ənlik | 2026-09-03 |
sheglam-brow-faction-angled-brush-dip | Sheglam | Brow Faction Angled Brush & Dip | - | 15.40 | 22.00 | Gözlər | Qaş üçün dəst | 2026-09-03 | adı yoxla
sheglam-crystal-jelly-glaze-stick | Sheglam | Crystal Jelly Glaze Stick | - | 21.70 | 31.00 | Dodaqlar | Dodaq parıldadıcısı (stik) | 2026-09-03 |
sheglam-sunkissed-body-highlighter | Sheglam | Sunkissed Body Highlighter | - | 24.50 | 35.00 | Bədən və saç | Bədən üçün haylayter | 2026-09-03 |
sheglam-go-go-glow-highlighter-body-mist | Sheglam | Go Go Glow Highlighter Body Mist | - | 21.00 | 30.00 | Bədən və saç | Bədən üçün parıltılı sprey | 2026-09-03 |
technic-triple-wave-foundation | Technic | Triple Wave Foundation | - | 22.10 | 26.00 | Üz makiyajı | Tonal krem | 2026-10-14 |
technic-mega-blush-matte | Technic | Mega Blush Matte | - | 15.30 | 18.00 | Üz makiyajı | Mat ənlik | 2026-10-14 | 4 çalar
technic-translucent-powder | Technic | Translucent Powder | - | 13.60 | 16.00 | Üz makiyajı | Şəffaf pudra | 2026-10-14 |
technic-glazed-kiss | Technic | Glazed Kiss | - | 14.45 | 17.00 | Dodaqlar | Dodaq parıldadıcısı | 2026-10-14 | 3 çalar
technic-coco | Technic | Coco | - | 16.15 | 19.00 | Dodaqlar | Dodaq parıldadıcısı | 2026-10-14 | 3 çalar, adı yoxla
wet-n-wild-color-icon-palette | wet n wild | Color Icon Eyeshadow Palette | - | 8.50 | 17.00 | Gözlər | Göz kölgəsi paleti | 2026-10-01 | 10 çalar, adı yoxla
wet-n-wild-cloud-pout | wet n wild | Cloud Pout | - | 6.00 | 12.00 | Dodaqlar | Dodaq üçün məhsul | 2026-10-01 | 4 çalar
wet-n-wild-incognito-concealer | wet n wild | Incognito Concealer | - | 6.00 | 12.00 | Üz makiyajı | Konsiler | 2026-10-01 | 2 çalar
physicians-formula-butter-believe-it-brow-palette | Physicians Formula | Butter Believe It! Brow Palette | - | 14.00 | 28.00 | Gözlər | Qaş paleti | 2026-09-28 |
physicians-formula-butter-glow-liquid-bronzer | Physicians Formula | Butter Glow Liquid Bronzer | - | 19.00 | 38.00 | Üz makiyajı | Maye bronzer | 2026-09-28 |
physicians-formula-butter-blush | Physicians Formula | Butter Blush | - | 14.50 | 29.00 | Üz makiyajı | Ənlik | 2026-09-28 | 2 variant
physicians-formula-matte-monoi-butter-bronzer | Physicians Formula | Matte Monoi Butter Bronzer | - | 18.95 | 37.90 | Üz makiyajı | Bronzer | 2026-09-28 |
physicians-formula-butter-believe-it-setting-spray | Physicians Formula | Butter Believe It! Setting Spray | - | 13.00 | 26.00 | Üz makiyajı | Makiyaj sabitləyici sprey | 2026-09-28 |
physicians-formula-waterproof-ultra-fine-pencil | Physicians Formula | Waterproof Ultra-Fine Pencil | - | 12.95 | 25.90 | Gözlər | Su keçirməyən qələm | 2026-09-28 | adı yoxla
physicians-formula-starbell-bling-duo | Physicians Formula | Starbell Bling Duo | - | 12.50 | 25.00 | Hədiyyə dəstləri | İkili dəst | 2026-09-28 | 2 çalar
revolution-all-about-the-jelly-gift-set | Revolution | All About The Jelly Makeup Gift Set | - | 30.00 | 60.00 | Hədiyyə dəstləri | Makiyaj hədiyyə dəsti, 6 məhsul | 2026-10-21 |
revolution-mystic-muse-gift-set | Revolution | Mystic Muse Makeup Gift Set | - | 32.50 | 65.00 | Hədiyyə dəstləri | Makiyaj hədiyyə dəsti, 6 məhsul | 2026-10-07 |
revolution-cherry-icon-palette-brush-set | Revolution | Cherry Icon Palette & Brush Set | - | 21.00 | 35.00 | Gözlər | Göz kölgəsi paleti və fırça dəsti | 2026-09-25 |
revolution-mini-matte-heroes | Revolution | Mini Matte Heroes | - | 14.00 | 20.00 | Hədiyyə dəstləri | Mini makiyaj dəsti | 2026-10-10 |
wet-n-wild-joyful-contour-kit | wet n wild | Joyful Contour Kit | - | 10.95 | 21.90 | Hədiyyə dəstləri | Kontur stiki və süngər dəsti | 2026-10-10 |
victorias-secret-love-spell-set | Victoria's Secret | Love Spell Set | - | 40.00 | 55.00 | Hədiyyə dəstləri | Sprey və losyon dəsti | 2026-10-10 |
luxury-bathing-co-creme-brulee-gift-set | Luxury Bathing Co. | Crème Brûlée Gift Set | - | 40.00 | 50.00 | Hədiyyə dəstləri | Hamam dəsti | 2026-10-10 | dəsmal, duş geli, zərdab
luxury-bathing-co-creme-brulee-trio | Luxury Bathing Co. | Crème Brûlée Trio | - | 24.80 | 31.00 | Hədiyyə dəstləri | 2 flakon və krem dəsti | 2026-10-10 | adı yoxla
luxury-bathing-co-nourishing-delights | Luxury Bathing Co. | Nourishing Delights | - | 30.40 | 38.00 | Hədiyyə dəstləri | Bədən qulluğu dəsti | 2026-10-10 | yuxu maskası, krem, gel, qutu
luxury-bathing-co-glow-tin | Luxury Bathing Co. | Glow Tin | - | 28.00 | 35.00 | Hədiyyə dəstləri | Bədən qulluğu dəsti | 2026-10-10 | adı yoxla
luxury-bathing-co-cashmere-musk-amber | Luxury Bathing Co. | Cashmere Musk & Amber | 2 x 50 ml | 20.80 | 26.00 | Hədiyyə dəstləri | Duş geli və krem dəsti | 2026-10-10 |
body-luxuries-poison-beauty-set | Body Luxuries | Poison Beauty Set | - | 17.00 | 25.00 | Hədiyyə dəstləri | Losyon və sprey dəsti | 2026-10-10 |
idc-institute-scented-bath-set | IDC Institute | Scented Bath Set | - | 36.00 | 45.00 | Hədiyyə dəstləri | Hamam dəsti | 2026-10-10 | gel, skrab, yağ, krem
velora-beauty-floral-set | Velora Beauty | Floral Set | - | 28.00 | 35.00 | Hədiyyə dəstləri | Hamam dəsti | 2026-10-10 | losyon, skrab, lifçə, köpük
cream-co-balm-cleanser | Cream Co. | Balm Cleanser | 100 ml | 18.54 | 30.90 | Dəri qulluğu | Təmizləyici balzam | 2026-09-13 |
cream-co-peptide-glow-eye-cream | Cream Co. | Peptide Glow Eye Cream | 15 ml | 13.74 | 22.90 | Dəri qulluğu | Göz ətrafı krem | 2026-09-13 |
cream-co-hyaluronic-acid-jelly-cleanser | Cream Co. | Hyaluronic Acid Jelly Cleanser | 400 ml | 20.94 | 34.90 | Dəri qulluğu | Üz yuyucu gel | 2026-09-13 |
cream-co-hyaluronic-acid-peptide-serum | Cream Co. | Hyaluronic Acid & Peptide Serum | 30 ml | 13.20 | 22.00 | Dəri qulluğu | Zərdab | 2026-09-13 |
cream-co-cloud-moisturizer | Cream Co. | Cloud Moisturizer | 50 ml | 16.74 | 27.90 | Dəri qulluğu | Nəmləndirici krem | 2026-09-13 |
cream-co-cream-cleanser | Cream Co. | Cream Cleanser | 150 ml | 18.00 | 30.00 | Dəri qulluğu | Üz yuyucu krem | 2026-09-13 |
cream-co-cloud-milk-serum | Cream Co. | Cloud Milk Serum | 30 ml | 11.94 | 19.90 | Dəri qulluğu | Zərdab | 2026-09-13 |
cream-co-tea-tree-balance-jelly-cleanser-400 | Cream Co. | Tea Tree Balance Jelly Cleanser | 400 ml | 21.00 | 35.00 | Dəri qulluğu | Üz yuyucu gel | 2026-09-13 |
cream-co-tea-tree-balance-jelly-cleanser-100 | Cream Co. | Tea Tree Balance Jelly Cleanser | 100 ml | 13.20 | 22.00 | Dəri qulluğu | Üz yuyucu gel | 2026-09-13 |
cream-co-heartleaf-balance-face-mist | Cream Co. | Heartleaf Balance Face Mist | 50 ml | 14.94 | 24.90 | Dəri qulluğu | Üz üçün sprey | 2026-09-13 |
cream-co-peptide-glow-face-mist | Cream Co. | Peptide Glow Face Mist | 50 ml | 14.94 | 24.90 | Dəri qulluğu | Üz üçün sprey | 2026-09-13 |
cream-co-niacinamide-toner | Cream Co. | Niacinamide Toner | 200 ml | 14.94 | 24.90 | Dəri qulluğu | Tonik | 2026-09-13 |
cream-co-vitamin-c-daily-toner | Cream Co. | Vitamin C Daily Toner | 200 ml | 14.40 | 24.00 | Dəri qulluğu | Tonik | 2026-09-13 |
cream-co-perfecting-aha-complex-serum | Cream Co. | Perfecting AHA Complex Serum | 30 ml | 13.20 | 22.00 | Dəri qulluğu | Zərdab | 2026-09-13 |
cream-co-sos-serum | Cream Co. | SOS Serum | 30 ml | 14.34 | 23.90 | Dəri qulluğu | Zərdab | 2026-09-13 |
cream-co-glow-tint | Cream Co. | Glow Tint | - | 11.40 | 19.00 | Dodaqlar | Dodaq tinti | 2026-09-13 | 4 çalar, Deep Red, Radiant Pink, Warm Peach, Rich Berry
cream-co-lip-oil-gloss | Cream Co. | Lip Oil Gloss | - | 10.80 | 18.00 | Dodaqlar | Dodaq yağı-parıldadıcı | 2026-09-13 | 2 çalar, Passionfruit, Raspberry
dry-idea-advanced-dry-unscented | Dry Idea | Advanced Dry Unscented | - | 6.90 | 12.90 | Bədən və saç | Antiperspirant stik | 2026-09-14 |
coty-airspun-loose-face-powder | Coty | Airspun Loose Face Powder | - | 19.90 | 26.00 | Üz makiyajı | Sərbəst üz pudrası | 2026-09-11 |
urban-care-biotin-caffeine-tonic-spray | Urban Care | Biotin & Caffeine Hair + Scalp Tonic Spray | - | 6.90 | 18.00 | Bədən və saç | Saç və baş dərisi toniki | 2026-09-10 |
loreal-paris-infallible-3-second-setting-mist | L'Oréal Paris | Infallible 3-Second Setting Mist | - | 15.90 | - | Üz makiyajı | Makiyaj sabitləyici sprey | 2026-10-19 |
maybelline-super-stay-lumi-matte-30h-foundation | Maybelline New York | Super Stay Lumi-Matte 30H Foundation | - | 19.90 | 29.00 | Üz makiyajı | Tonal krem | 2026-10-03 |
maybelline-sky-high-mascara | Maybelline New York | Sky High Mascara | - | 14.90 | 22.00 | Gözlər | Tuş | 2026-10-03 | adı yoxla
real-techniques-mini-miracle-concealer-puff-6pack | Real Techniques | Mini Miracle Concealer Puff, 6 pack | 6 ədəd | 11.94 | 19.90 | Üz makiyajı | Makiyaj süngəri | 2026-10 | adı yoxla
```

### Описания

Для карточек использовать только поле «тип товара» и примечание. Не писать составы, эффекты и обещания, их в данных нет, а переводить с сайтов брендов нельзя, это были бы выдуманные данные.

---

## 5. Механика

Стек. Next.js App Router, TypeScript, Tailwind. Без бэкенда и без базы. Товары в одном файле данных. Корзина в localStorage. Деплой на Vercel. Репозиторий `[ССЫЛКА]`.

### Язык

Только азербайджанский, переключателя языков нет.

Причина. Данные магазина существуют только на азербайджанском, названия товаров это латинские названия брендов. Вторая версия потребовала бы перевода силами Claude Code, то есть новых данных.

Строки интерфейса в словаре `src/i18n/az.ts`. Полная диакритика ə ş ç ğ ı ö ü.

### Фотографии

Ищи настоящие. Источники в порядке приоритета.

1. Сайт бренда или каталог производителя
2. Другие открытые источники

Под своим именем магазин на Birmarket и Umico не найден, поэтому источника с маркетплейса здесь нет.

НЕ бери фотографии с сайтов других бакинских магазинов и не бери кадры из инстаграма Kozmeland, там их собственная съёмка в магазине, для каталога она не подходит.

Клади в `public/products/`, имя файла по слагу товара, квадрат 800 на 800, webp, белый или прозрачный фон.

Каждый файл проверь скриптом, а не на глаз. Должен открываться как картинка, весить больше 5 килобайт, не быть страницей ошибки, логотипом или баннером. Рядом положи файл с источником каждой картинки.

Если по названию на сайте бренда нельзя найти ровно этот товар, похожий не подставляй, помечай `noImage`. Это особенно важно для позиций с примечанием `adı yoxla`.

### Стоп перед сборкой

Когда закончишь скачивать, не продолжай. Выведи отчёт и жди ответа.

В отчёте, сколько снимков нашлось из 70, из каких источников, разбивка по категориям и по брендам, разбивка по ценовым диапазонам в три корзины по реальным ценам, и список позиций без фото.

Отдельно напиши, не осталось ли категории, в которой после отсева ноль товаров, и сколько товаров осталось в «Hədiyyə dəstləri».

Товары без фото в каталог не выводи, но из данных не удаляй, пометь флагом `noImage`. Смешивать настоящие фотографии и нарисованные заглушки нельзя.

### Покупка

Корзина с изменением количества и суммой. Оформление с контактами и способом получения. Кнопка оплаты, задержка полторы секунды, экран успеха с номером заказа. Деньги не списываются. В коде комментарий, что реальным шлюзом будет epoint.

Рядом с кнопкой оформления кнопка WhatsApp, которая открывает чат и подставляет состав корзины текстом. Магазин сейчас принимает заказы именно так, и этот путь должен остаться.

```
WHATSAPP_PHONE = "994557953787"
```

Подтверждён шапкой и подписями Instagram и ссылкой WhatsApp на карточке 2ГИС.

### Плашка демо

`Demo versiya, sifarişlər qəbul edilmir` вверху КАЖДОЙ страницы, не только в подвале. Убирается одной константой, по умолчанию видна.

### Чего не делать

Регистрации и личных кабинетов. Реальных платежей. Базы и админки. Отзывов и рейтингов. Описаний состава и эффектов, их в данных нет.

### Критерии готовности

1. С телефона можно найти товар, открыть, положить в корзину, изменить количество и дойти до подтверждения
2. Корзина переживает перезагрузку
3. Горизонтальной прокрутки нет ни на одном экране
4. Все выведенные товары имеют картинку
5. Диакритика рисуется везде, включая цены и фильтры
6. Нигде не написано, сколько всего товаров в каталоге
7. Ни одной пустой категории не выводится
8. Пометка про дату цены видна и на карточке товара, и в шапке каталога

---

## 6. Контакты и расхождения

### Подтверждено двумя источниками, можно в подвал

```
Telefon, WhatsApp   +994 55 795 37 87
Instagram           @kozmeland.az
Ünvan               Hacı Zeynalabdin Tağıyev küçəsi, Səbail
Çatdırılma          «Çatdırılma var», подробности не расписывать
```

Номер дома в подвал не ставить.

### Только в константы, SHOW_UNCONFIRMED = false

```
ADDRESS_2GIS      = "H. Z. Tağıyev küçəsi 20-22, 1-ci mərtəbə, Səbail"
ADDRESS_INSTAGRAM = "Hacı Zeynalabdin Tağıyev 20b"
CREDIT_NOTE       = "Kreditlə alış (2 ay sonra ödə, ilkin ödənişsiz)"
STUDENT_NOTE      = "Tələbələrə endirim"
```

Кредит и скидка студентам есть только в Instagram, одним источником.

### TODO уточнить у владельца

1. Номер дома, 20-22 на 2ГИС против 20b в шапке Instagram
2. Файл логотипа, чёрный линейный рисунок цветов и профиля женщины с рукописным «Kozmeland.az». Пока в шапке текстовое слово
3. Условия кредита и скидки студентам
4. Часы работы, нигде не найдены
5. **Актуальность цен.** Все цены в списке это скидочные цены из постов и могли закончиться
6. Категория «Ətirlər» не выведена, цены на парфюм были только в старых постах июля, свежих ценников нет
7. Не выведены товары с ценами старше 1 сентября 2026, Medicube, Eda Taşpınar, солнцезащита (La Roche-Posay, Bioderma), Tresan, L'Oréal Infallible 24H Fresh Wear и консилер, палетки Revolution и wet n wild из августа, Golden Rose и Note из июля
8. Не выведены товары без опубликованной цены, о которой спрашивают в комментариях, набор Inglot Eye Essentials, Physicians Formula Healthy Foundation и Butter Glow Concealer, палетки Revolution, Panorama Professional, Seoul 1988, The Hoppa, Anua, Tenzero, мисты Victoria's Secret
9. Палетка Too Faced с хайлайтером 19.90, название на картинке не читалось. Второй набор Real Techniques 35.90 на 21.54, название не читалось
10. После отбора по фото проверить категории. Если в какой-то остался ноль товаров, вывести в отчёте и не показывать на сайте. Если «Hədiyyə dəstləri» окажется меньше четырёх товаров, блок на главной не выводить

Если по какой-то позиции данные расходятся, не достраивай. Отправь вопрос в отчёт.
