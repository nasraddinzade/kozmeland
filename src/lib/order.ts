import type { CartItem } from "@/lib/cart";

const STORAGE_KEY = "kozmeland-last-order";

export type Method = "delivery" | "pickup";

/** What was in the cart at checkout, kept so the success page can show it after the cart is cleared. */
export type OrderSnapshot = {
  orderNo: string;
  items: { slug: string; brand: string; name: string; volume: string | null; price: string; priceCents: number; qty: number }[];
  totalCents: number;
  method: Method;
  address: string | null;
};

export function saveOrder(orderNo: string, items: CartItem[], totalCents: number, method: Method, address: string | null) {
  const snapshot: OrderSnapshot = {
    orderNo,
    items: items.map(({ product, qty }) => ({
      slug: product.slug,
      brand: product.brand,
      name: product.name,
      volume: product.volume,
      price: product.price,
      priceCents: product.priceCents,
      qty,
    })),
    totalCents,
    method,
    address,
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // storage may be unavailable; the success page then shows only the order number
  }
}

/** Returns the saved order only if it belongs to this order number. */
export function loadOrder(orderNo: string): OrderSnapshot | null {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as OrderSnapshot | null;
    if (saved && saved.orderNo === orderNo && Array.isArray(saved.items) && saved.items.length > 0) return saved;
  } catch {
    // ignore broken or unavailable storage
  }
  return null;
}
