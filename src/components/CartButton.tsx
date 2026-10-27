"use client";

import Link from "next/link";
import { az } from "@/i18n/az";
import { useCart } from "@/lib/cart";

export function CartButton() {
  const { count, ready } = useCart();
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 h-10 pl-3 pr-3.5 rounded-full bg-ink text-milk"
      aria-label={`${az.nav.cart}${ready && count ? `: ${count}` : ""}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
        <path d="M9 10V6a3 3 0 0 1 6 0v4" />
      </svg>
      <span className="hidden sm:inline text-sm">{az.nav.cart}</span>
      {ready && count > 0 && (
        <span className="font-display min-w-5 h-5 px-1 rounded-full bg-fuchsia text-white text-xs leading-5 text-center">
          {count}
        </span>
      )}
    </Link>
  );
}
