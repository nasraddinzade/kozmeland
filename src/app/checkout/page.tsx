"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { az } from "@/i18n/az";
import { Container } from "@/components/Container";
import { WhatsAppIcon } from "@/components/StoreInfo";
import { useCart } from "@/lib/cart";
import { saveOrder, type Method } from "@/lib/order";
import { centsToString } from "@/lib/products";
import { cartWhatsappText, whatsappUrl } from "@/lib/whatsapp";

const inputCls =
  "mt-1 w-full h-11 rounded-xl border border-line bg-white px-3 outline-none focus:border-fuchsia aria-[invalid=true]:border-fuchsia";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalCents, ready, clear } = useCart();
  const [method, setMethod] = useState<Method>("delivery");
  const [paying, setPaying] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (ready && items.length === 0 && !paying) router.replace("/cart");
  }, [ready, items.length, paying, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nextErrors: Record<string, boolean> = {
      name: !String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").replace(/\D/g, "").length < 9,
      address: method === "delivery" && !String(data.get("address") ?? "").trim(),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setPaying(true);
    // Demo payment: no money is charged. The real payment gateway will be epoint (epoint.az).
    await new Promise((r) => setTimeout(r, 1500));
    const orderNo = `KZ-${Date.now().toString().slice(-6)}`;
    const address = method === "delivery" ? String(data.get("address") ?? "").trim() : null;
    saveOrder(orderNo, items, totalCents, method, address);
    clear();
    router.push(`/checkout/success?order=${orderNo}`);
  }

  if (!ready || items.length === 0) return <Container className="pt-6 min-h-[50vh]">{null}</Container>;

  return (
    <Container className="pt-6 max-w-4xl">
      <h1 className="font-display text-3xl md:text-4xl mb-5">{az.checkout.title}</h1>
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="font-display text-xl mb-2">{az.checkout.contacts}</legend>
            <label className="block text-sm font-semibold">
              {az.checkout.name}
              <input name="name" autoComplete="name" className={inputCls} aria-invalid={errors.name} />
              {errors.name && <span className="text-xs text-fuchsia">{az.checkout.required}</span>}
            </label>
            <label className="block text-sm font-semibold">
              {az.checkout.phone}
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={az.checkout.phonePlaceholder}
                className={inputCls}
                aria-invalid={errors.phone}
              />
              {errors.phone && <span className="text-xs text-fuchsia">{az.checkout.required}</span>}
            </label>
          </fieldset>

          <fieldset>
            <legend className="font-display text-xl mb-2">{az.checkout.method}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {(["delivery", "pickup"] as const).map((m) => (
                <label
                  key={m}
                  className={`flex items-center gap-3 rounded-xl border px-4 h-12 cursor-pointer font-semibold text-sm ${
                    method === m ? "border-fuchsia bg-powder" : "border-line bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={m}
                    checked={method === m}
                    onChange={() => setMethod(m)}
                    className="accent-fuchsia"
                  />
                  {m === "delivery" ? az.checkout.delivery : az.checkout.pickup}
                </label>
              ))}
            </div>
            {method === "delivery" && (
              <label className="mt-3 block text-sm font-semibold">
                {az.checkout.address}
                <input name="address" autoComplete="street-address" className={inputCls} aria-invalid={errors.address} />
                {errors.address && <span className="text-xs text-fuchsia">{az.checkout.required}</span>}
              </label>
            )}
            <label className="mt-3 block text-sm font-semibold">
              {az.checkout.comment}
              <textarea name="comment" rows={2} className={`${inputCls} h-auto py-2`} />
            </label>
          </fieldset>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="submit"
              disabled={paying}
              className="h-12 rounded-full bg-fuchsia font-semibold text-white hover:bg-fuchsia-dark disabled:opacity-70"
            >
              {paying ? az.checkout.paying : `${az.checkout.pay} ${centsToString(totalCents)} ₼`}
            </button>
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
          <p className="text-xs text-muted">{az.checkout.demoNote}</p>
        </form>

        <aside className="rounded-[24px] bg-powder p-5 h-fit">
          <h2 className="font-display text-xl mb-3">{az.checkout.summary}</h2>
          <ul className="space-y-2 text-sm">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="flex justify-between gap-3">
                <span className="min-w-0">
                  <Link href={`/product/${product.slug}`} className="hover:text-fuchsia">
                    {product.brand} {product.name}
                  </Link>
                  <span className="text-muted"> × {qty}</span>
                </span>
                <span className="font-semibold whitespace-nowrap">{centsToString(product.priceCents * qty)} ₼</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-ink/10 flex items-baseline justify-between">
            <span className="font-semibold">{az.cart.total}</span>
            <span className="font-display text-2xl">{centsToString(totalCents)} ₼</span>
          </div>
        </aside>
      </div>
    </Container>
  );
}
