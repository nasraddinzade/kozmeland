import type { Metadata } from "next";
import { az } from "@/i18n/az";
import { Container } from "@/components/Container";
import { StoreInfo } from "@/components/StoreInfo";

export const metadata: Metadata = { title: az.store.title };

export default function StorePage() {
  return (
    <Container className="pt-6 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl">{az.store.title}</h1>
      <p className="mt-1 text-muted font-semibold">{az.location}</p>
      <section className="mt-6 rounded-[28px] bg-powder p-5 md:p-8">
        <StoreInfo />
      </section>
    </Container>
  );
}
