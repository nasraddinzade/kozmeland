"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { az } from "@/i18n/az";
import { byDiscount, searchProducts } from "@/lib/products";

const MAX_SUGGESTIONS = 6;

/** Header search: suggests up to six products while typing; Enter opens the catalog with the query. */
export function SearchBox({ className = "" }: { className?: string }) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const results = useMemo(() => searchProducts(query).sort(byDiscount).slice(0, MAX_SUGGESTIONS), [query]);
  const showList = open && query.trim().length > 0;

  useEffect(() => setActive(-1), [query]);

  // Close the list whenever the page changes.
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (showList && active >= 0 && results[active]) {
      go(`/product/${results[active].slug}`);
      return;
    }
    const q = query.trim();
    go(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  }

  return (
    <form ref={rootRef} action="/catalog" method="get" role="search" onSubmit={onSubmit} className={`relative ${className}`}>
      <label className="relative block">
        <span className="sr-only">{az.nav.search}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          name="q"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={az.nav.searchPlaceholder}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          className="w-full h-10 rounded-full bg-white border border-line pl-9 pr-4 text-sm outline-none focus:border-fuchsia"
        />
      </label>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-40 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_40px_-20px_rgb(26_20_24/0.45)]"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted">{az.nav.notFound}</li>
          ) : (
            results.map((p, i) => (
              <li key={p.slug} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => go(`/product/${p.slug}`)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left ${i === active ? "bg-powder" : ""}`}
                >
                  <span className="relative size-11 shrink-0 rounded-lg border border-line bg-white overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="44px" className="object-contain p-0.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span lang="en" className="block text-[10px] uppercase tracking-[0.08em] font-semibold text-muted truncate">
                      {p.brand}
                    </span>
                    <span className="block text-sm leading-snug truncate">{p.name}</span>
                  </span>
                  <span className="font-display text-base text-fuchsia whitespace-nowrap">{p.price} ₼</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  );
}
