import { RAW_PRODUCTS } from "@/data/products";
import type { RawProduct } from "@/data/types";

export type Product = RawProduct & {
  /** Integer percent computed from price and oldPrice, null without an old price */
  discount: number | null;
  priceCents: number;
  image: string;
};

/** Category order as in the spec; slugs are used in URLs. */
export const CATEGORY_LIST = [
  { name: "Üz makiyajı", slug: "uz-makiyaji" },
  { name: "Gözlər", slug: "gozler" },
  { name: "Dodaqlar", slug: "dodaqlar" },
  { name: "Dəri qulluğu", slug: "deri-qullugu" },
  { name: "Bədən və saç", slug: "beden-ve-sac" },
  { name: "Hədiyyə dəstləri", slug: "hediyye-destleri" },
] as const;

export const GIFT_CATEGORY = "Hədiyyə dəstləri";

export function toCents(price: string): number {
  const [int, frac = ""] = price.split(".");
  return Number(int) * 100 + Number((frac + "00").slice(0, 2));
}

/** Formats cents as "12.50" — used only for computed sums; product prices are shown as given. */
export function centsToString(cents: number): string {
  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

export function brandSlug(brand: string): string {
  return brand
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function enrich(p: RawProduct): Product {
  const priceCents = toCents(p.price);
  const discount = p.oldPrice ? Math.round((1 - priceCents / toCents(p.oldPrice)) * 100) : null;
  return { ...p, priceCents, discount, image: `/products/${p.slug}.webp` };
}

/** Only products with a real photo are shown anywhere on the site. */
export const PRODUCTS: Product[] = RAW_PRODUCTS.filter((p) => !p.noImage).map(enrich);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function byDiscount(a: Product, b: Product): number {
  return (b.discount ?? -1) - (a.discount ?? -1) || a.priceCents - b.priceCents;
}

/** Non-empty categories only. */
export const CATEGORIES = CATEGORY_LIST.filter((c) => PRODUCTS.some((p) => p.category === c.name));

export function categoryBySlug(slug: string | null | undefined) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categorySlug(name: string): string {
  return CATEGORY_LIST.find((c) => c.name === name)?.slug ?? "";
}

/** Brands that have at least one shown product, alphabetical. */
export const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand)))
  .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
  .map((name) => ({ name, slug: brandSlug(name) }));

/**
 * Three price buckets. The cut points are the terciles of the real prices of shown products,
 * rounded up to whole manats so the labels read like a shop filter ("15 ₼-dək", "15 – 18 ₼", ...).
 * Buckets are half-open [min, max) and together cover every price, so no product falls between them.
 */
export const PRICE_BUCKETS = (() => {
  const prices = PRODUCTS.map((p) => p.priceCents).sort((a, b) => a - b);
  if (prices.length === 0) return [];
  const toManat = (cents: number) => Math.ceil(cents / 100) * 100;
  const cut1 = toManat(prices[Math.floor(prices.length / 3)]);
  let cut2 = toManat(prices[Math.floor((prices.length * 2) / 3)]);
  if (cut2 <= cut1) cut2 = cut1 + 100;
  const buckets = [
    { id: "1", min: 0, max: cut1, label: `${cut1 / 100} ₼-dək` },
    { id: "2", min: cut1, max: cut2, label: `${cut1 / 100} – ${cut2 / 100} ₼` },
    { id: "3", min: cut2, max: Infinity, label: `${cut2 / 100} ₼-dən yuxarı` },
  ];
  return buckets.filter((b) => prices.some((c) => c >= b.min && c < b.max));
})();

export function inPriceBucket(priceCents: number, bucket: { min: number; max: number }): boolean {
  return priceCents >= bucket.min && priceCents < bucket.max;
}

/** Lowercase, accent-free form for search: "Gözlər" and "gozler" match. */
export function searchKey(s: string): string {
  return s
    .toLocaleLowerCase("az")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/ə/g, "e");
}

/** Products whose brand + name contain the query. */
export function searchProducts(query: string): Product[] {
  const needle = searchKey(query.trim());
  if (!needle) return [];
  return PRODUCTS.filter((p) => searchKey(`${p.brand} ${p.name}`).includes(needle));
}

const MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avqust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

/** "2026-09-25" → "25 sentyabr 2026", "2026-10" → "oktyabr 2026" */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const month = MONTHS[Number(m) - 1];
  return d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`;
}

/** Note shown to shoppers — internal "adı yoxla" markers are removed. */
export function publicNote(note: string | null): string | null {
  if (!note) return null;
  const cleaned = note
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && s !== "adı yoxla")
    .join(", ");
  return cleaned || null;
}
