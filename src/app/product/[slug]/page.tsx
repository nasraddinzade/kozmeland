import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SHOW_PRICE_DATE } from "@/config";
import { az } from "@/i18n/az";
import { Container } from "@/components/Container";
import { DiscountBadge, PriceTag } from "@/components/PriceTag";
import { ProductGrid } from "@/components/ProductCard";
import { AddToCart } from "@/components/AddToCart";
import { WhatsAppIcon } from "@/components/StoreInfo";
import {
  PRODUCTS,
  brandSlug,
  byDiscount,
  categorySlug,
  formatPostDate,
  getProduct,
  publicNote,
} from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: `${product.brand} ${product.name}` } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const note = publicNote(product.note);
  const fullName = `${product.brand} ${product.name}${product.volume ? `, ${product.volume}` : ""}`;
  const similar = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug)
    .sort(byDiscount)
    .slice(0, 4);

  return (
    <Container className="pt-5">
      <nav className="text-xs text-muted mb-4 flex flex-wrap gap-1.5" aria-label="breadcrumb">
        <Link href="/catalog" className="hover:text-fuchsia">
          {az.nav.catalog}
        </Link>
        <span>/</span>
        <Link href={`/catalog?cat=${categorySlug(product.category)}`} className="hover:text-fuchsia">
          {product.category}
        </Link>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div className="relative aspect-square rounded-2xl bg-white border border-line overflow-hidden">
          <Image
            src={product.image}
            alt={fullName}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-6"
          />
          <DiscountBadge discount={product.discount} className="absolute top-3 left-3 size-14! text-base!" />
        </div>

        <div className="min-w-0">
          <Link
            href={`/catalog?brand=${brandSlug(product.brand)}`}
            lang="en"
            className="text-xs uppercase tracking-[0.1em] font-semibold text-muted hover:text-fuchsia"
          >
            {product.brand}
          </Link>
          <h1 className="font-display text-3xl md:text-4xl leading-[1.05] mt-1">{product.name}</h1>

          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {product.volume && (
              <>
                <dt className="text-muted">{az.product.volume}</dt>
                <dd>{product.volume}</dd>
              </>
            )}
            <dt className="text-muted">{az.product.type}</dt>
            <dd>
              {product.type}
              {note ? <span className="text-muted"> · {note}</span> : null}
            </dd>
          </dl>

          <PriceTag price={product.price} oldPrice={product.oldPrice} size="lg" className="mt-5" />
          {SHOW_PRICE_DATE && (
            <p className="mt-2 text-xs text-muted">{az.product.priceDate(formatPostDate(product.priceAsOf))}</p>
          )}

          <AddToCart slug={product.slug} />

          <a
            href={whatsappUrl(az.product.whatsappText(fullName))}
            target="_blank"
            rel="noopener"
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-ink font-semibold hover:bg-ink hover:text-milk"
          >
            <WhatsAppIcon className="size-5" />
            {az.product.askWhatsapp}
          </a>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl md:text-3xl mb-4">{az.product.similar}</h2>
          <ProductGrid products={similar} />
        </section>
      )}
    </Container>
  );
}
