"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { az } from "@/i18n/az";
import { ProductGrid } from "@/components/ProductCard";
import {
  BRANDS,
  CATEGORIES,
  PRICE_BUCKETS,
  PRODUCTS,
  brandSlug,
  byDiscount,
  inPriceBucket,
  searchKey,
} from "@/lib/products";

const SORTS = [
  { id: "discount", label: az.catalog.sortDiscount },
  { id: "asc", label: az.catalog.sortPriceAsc },
  { id: "desc", label: az.catalog.sortPriceDesc },
] as const;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-9 px-3.5 rounded-full text-sm font-semibold border transition-colors ${
        active ? "bg-ink text-milk border-ink" : "bg-white border-line hover:border-fuchsia"
      }`}
    >
      {children}
    </button>
  );
}

export function CatalogView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const q = params.get("q") ?? "";
  const cat = params.get("cat") ?? "";
  const brand = params.get("brand") ?? "";
  const price = params.get("price") ?? "";
  const sort = params.get("sort") ?? "discount";

  // Local input state so typing is smooth; pushed to the URL after a short pause.
  const [query, setQuery] = useState(q);
  useEffect(() => setQuery(q), [q]);

  function update(next: Record<string, string>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    if (sp.get("sort") === "discount") sp.delete("sort");
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  useEffect(() => {
    if (query === q) return;
    const t = setTimeout(() => update({ q: query.trim() }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const results = useMemo(() => {
    const needle = searchKey(q.trim());
    const bucket = PRICE_BUCKETS.find((b) => b.id === price);
    const list = PRODUCTS.filter((p) => {
      if (cat && CATEGORIES.find((c) => c.slug === cat)?.name !== p.category) return false;
      if (brand && brandSlug(p.brand) !== brand) return false;
      if (bucket && !inPriceBucket(p.priceCents, bucket)) return false;
      if (needle && !searchKey(`${p.brand} ${p.name}`).includes(needle)) return false;
      return true;
    });
    if (sort === "asc") return list.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "desc") return list.sort((a, b) => b.priceCents - a.priceCents);
    return list.sort(byDiscount);
  }, [q, cat, brand, price, sort]);

  const hasFilters = Boolean(q || cat || brand || price);

  return (
    <div>
      <div className="space-y-3">
        <label className="relative block">
          <span className="sr-only">{az.nav.search}</span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={az.catalog.searchPlaceholder}
            className="w-full h-11 rounded-full bg-white border border-line pl-10 pr-4 outline-none focus:border-fuchsia"
          />
        </label>

        <div role="group" aria-label={az.catalog.category} className="flex flex-wrap gap-2">
          <Chip active={!cat} onClick={() => update({ cat: "" })}>
            {az.catalog.all}
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c.slug} active={cat === c.slug} onClick={() => update({ cat: cat === c.slug ? "" : c.slug })}>
              {c.name}
            </Chip>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
          <label className="min-w-0">
            <span className="sr-only">{az.catalog.brand}</span>
            <select
              value={brand}
              onChange={(e) => update({ brand: e.target.value })}
              className="w-full sm:w-auto h-9 rounded-full border border-line bg-white px-3 text-sm font-semibold outline-none focus:border-fuchsia"
            >
              <option value="">{az.catalog.allBrands}</option>
              {BRANDS.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <label className="min-w-0">
            <span className="sr-only">{az.catalog.sort}</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value })}
              className="w-full sm:w-auto h-9 rounded-full border border-line bg-white px-3 text-sm font-semibold outline-none focus:border-fuchsia"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div role="group" aria-label={az.catalog.price} className="col-span-2 flex flex-wrap gap-2 sm:ml-2">
            {PRICE_BUCKETS.map((b) => (
              <Chip key={b.id} active={price === b.id} onClick={() => update({ price: price === b.id ? "" : b.id })}>
                {b.label}
              </Chip>
            ))}
          </div>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                router.replace(pathname, { scroll: false });
              }}
              className="col-span-2 justify-self-start text-sm font-semibold text-fuchsia hover:underline sm:ml-auto"
            >
              {az.catalog.reset}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6">
        {results.length ? (
          <ProductGrid products={results} priorityCount={4} />
        ) : (
          <p className="py-16 text-center text-muted">{az.catalog.empty}</p>
        )}
      </div>
    </div>
  );
}
