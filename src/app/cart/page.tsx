"use client";

import Image from "next/image";
import Link from "next/link";
import { az } from "@/i18n/az";
import { Container } from "@/components/Container";
import { QtyStepper } from "@/components/QtyStepper";
import { WhatsAppIcon } from "@/components/StoreInfo";
import { MAX_QTY, useCart } from "@/lib/cart";
import { centsToString } from "@/lib/products";
import { cartWhatsappText, whatsappUrl } from "@/lib/whatsapp";

export default function CartPage() {
  const { items, totalCents, ready, setQty, remove } = useCart();

  return (
    <Container className="pt-6 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl mb-5">{az.cart.title}</h1>

      {!ready ? null : items.length === 0 ? (
        <div className="rounded-[24px] bg-powder p-8 text-center">
          <p className="font-semibold">{az.cart.empty}</p>
          <Link
            href="/catalog"
            className="mt-4 inline-flex h-12 items-center rounded-full bg-fuchsia px-6 font-semibold text-white"
          >
            {az.cart.goShopping}
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-line border-y border-line">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-3 py-4">
                <Link
                  href={`/product/${product.slug}`}
                  className="relative size-20 sm:size-24 shrink-0 rounded-xl bg-white border border-line overflow-hidden"
                >
                  <Image src={product.image} alt="" fill sizes="96px" className="object-contain p-1.5" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p lang="en" className="text-[10px] uppercase tracking-[0.08em] font-semibold text-muted truncate">
                    {product.brand}
                  </p>
                  <Link href={`/product/${product.slug}`} className="text-sm leading-snug line-clamp-2 hover:text-fuchsia">
                    {product.name}
                    {product.volume ? `, ${product.volume}` : ""}
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <QtyStepper
                      size="sm"
                      value={qty}
                      min={1}
                      onChange={(v) => setQty(product.slug, Math.min(MAX_QTY, Math.max(1, v)))}
                    />
                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="text-xs font-semibold text-muted underline hover:text-fuchsia"
                    >
                      {az.cart.remove}
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-lg text-fuchsia whitespace-nowrap">
                    {centsToString(product.priceCents * qty)} ₼
                  </p>
                  {qty > 1 && <p className="text-xs text-muted whitespace-nowrap">{qty} × {product.price} ₼</p>}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-baseline justify-between">
            <span className="font-semibold">{az.cart.total}</span>
            <span className="font-display text-3xl">{centsToString(totalCents)} ₼</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/checkout"
              className="flex h-12 items-center justify-center rounded-full bg-fuchsia font-semibold text-white hover:bg-fuchsia-dark"
            >
              {az.cart.checkout}
            </Link>
            <a
              href={whatsappUrl(cartWhatsappText(items, totalCents))}
              target="_blank"
              rel="noopener"
              className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink font-semibold hover:bg-ink hover:text-milk"
            >
              <WhatsAppIcon className="size-5" />
              {az.cart.whatsappOrder}
            </a>
          </div>
        </>
      )}
    </Container>
  );
}
