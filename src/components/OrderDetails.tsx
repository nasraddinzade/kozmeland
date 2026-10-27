"use client";

import { useEffect, useState } from "react";
import { CONTACTS } from "@/config";
import { az } from "@/i18n/az";
import { loadOrder, type OrderSnapshot } from "@/lib/order";
import { centsToString } from "@/lib/products";

/** Order contents and pickup method saved at checkout; renders nothing when the page is opened directly. */
export function OrderDetails({ orderNo }: { orderNo: string }) {
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  useEffect(() => setOrder(loadOrder(orderNo)), [orderNo]);

  if (!order) return null;

  return (
    <div className="mt-8 text-left">
      <ul className="divide-y divide-line border-y border-line">
        {order.items.map((item) => (
          <li key={item.slug} className="flex gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p lang="en" className="text-[10px] uppercase tracking-[0.08em] font-semibold text-muted truncate">
                {item.brand}
              </p>
              <p className="text-sm leading-snug">
                {item.name}
                {item.volume ? `, ${item.volume}` : ""}
              </p>
              <p className="text-xs text-muted whitespace-nowrap">
                {item.qty} × {item.price} ₼
              </p>
            </div>
            <p className="font-display text-lg text-fuchsia whitespace-nowrap">
              {centsToString(item.priceCents * item.qty)} ₼
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="font-semibold">{az.cart.total}</span>
        <div className="price-tag">
          <span className="font-display text-2xl text-fuchsia whitespace-nowrap">{centsToString(order.totalCents)} ₼</span>
        </div>
      </div>

      <section className="mt-6 rounded-[24px] bg-powder p-5">
        <h2 className="font-display text-xl">{az.success.howYouGet}</h2>
        <p className="mt-2 font-semibold">{order.method === "delivery" ? az.checkout.delivery : az.checkout.pickup}</p>
        <p className="text-sm text-muted">{order.method === "delivery" ? order.address : CONTACTS.address}</p>
      </section>
    </div>
  );
}
