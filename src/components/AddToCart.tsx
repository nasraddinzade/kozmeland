"use client";

import Link from "next/link";
import { useState } from "react";
import { az } from "@/i18n/az";
import { MAX_QTY, useCart } from "@/lib/cart";
import { QtyStepper } from "@/components/QtyStepper";

export function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-6">
      <div className="flex gap-3">
        <QtyStepper value={qty} onChange={(v) => setQty(Math.max(1, Math.min(MAX_QTY, v)))} min={1} />
        <button
          type="button"
          onClick={() => {
            add(slug, qty);
            setAdded(true);
          }}
          className="flex-1 h-12 rounded-full bg-fuchsia text-white font-semibold hover:bg-fuchsia-dark active:scale-[0.99]"
        >
          {az.product.addToCart}
        </button>
      </div>
      <p aria-live="polite" className="min-h-6 mt-2 text-sm">
        {added && (
          <>
            <span className="font-semibold text-fuchsia">✓ {az.product.added}</span>{" "}
            <Link href="/cart" className="underline">
              {az.nav.cart} →
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
