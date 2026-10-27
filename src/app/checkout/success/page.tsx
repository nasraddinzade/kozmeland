import type { Metadata } from "next";
import Link from "next/link";
import { az } from "@/i18n/az";
import { Container } from "@/components/Container";
import { OrderDetails } from "@/components/OrderDetails";

export const metadata: Metadata = { title: az.success.title };

type Props = { searchParams: Promise<{ order?: string }> };

export default async function SuccessPage({ searchParams }: Props) {
  const { order } = await searchParams;
  const orderNo = order && /^KZ-\d{6}$/.test(order) ? order : null;

  return (
    <Container className="pt-10 max-w-xl text-center">
      <div className="mx-auto size-16 rounded-full bg-fuchsia text-white grid place-items-center text-3xl">✓</div>
      <h1 className="font-display text-3xl md:text-4xl mt-5">{az.success.title}</h1>
      {orderNo && (
        <div className="price-tag mt-6 items-center! px-6! py-3!">
          <span className="text-xs text-muted font-semibold">{az.success.orderNumber}</span>
          <span className="font-display text-3xl tracking-wide">{orderNo}</span>
        </div>
      )}
      {orderNo && <OrderDetails orderNo={orderNo} />}
      <p className="mt-6 text-sm text-muted">{az.success.demoNote}</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-milk hover:bg-fuchsia"
      >
        {az.success.back}
      </Link>
    </Container>
  );
}
