import { WHATSAPP_PHONE } from "@/config";
import { az } from "@/i18n/az";
import { centsToString } from "@/lib/products";
import type { CartItem } from "@/lib/cart";

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function cartWhatsappText(items: CartItem[], totalCents: number): string {
  const lines = items.map(
    ({ product, qty }) => `• ${product.brand} ${product.name}${product.volume ? `, ${product.volume}` : ""} — ${qty} əd. × ${product.price} ₼`,
  );
  return [az.cart.whatsappHeader, ...lines, `${az.cart.whatsappTotal}: ${centsToString(totalCents)} ₼`].join("\n");
}
