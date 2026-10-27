import type { Metadata } from "next";
import { Suspense } from "react";
import { SHOW_PRICE_DATE } from "@/config";
import { az } from "@/i18n/az";
import { Container } from "@/components/Container";
import { CatalogView } from "@/components/CatalogView";

export const metadata: Metadata = { title: az.catalog.title };

export default function CatalogPage() {
  return (
    <>
      {SHOW_PRICE_DATE && (
        <div className="border-b border-line bg-white">
          <Container className="py-2 text-xs text-muted">{az.catalog.priceSource}</Container>
        </div>
      )}
      <Container className="pt-6">
        <h1 className="font-display text-3xl md:text-4xl mb-4">{az.catalog.title}</h1>
        <Suspense>
          <CatalogView />
        </Suspense>
      </Container>
    </>
  );
}
