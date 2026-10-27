import Image from "next/image";
import Link from "next/link";
import { az } from "@/i18n/az";
import { Container } from "@/components/Container";
import { HeroTags } from "@/components/HeroTags";
import { ProductGrid } from "@/components/ProductCard";
import { StoreInfo, WhatsAppIcon } from "@/components/StoreInfo";
import { BRANDS, CATEGORIES, GIFT_CATEGORY, PRODUCTS, byDiscount } from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";

function SectionTitle({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-semibold text-fuchsia hover:underline shrink-0">
          {az.home.seeAll} →
        </Link>
      )}
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`text-gold ${className}`} fill="currentColor">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" />
    </svg>
  );
}

export default function HomePage() {
  // No product appears on the home page twice: hero tags → top discounts (no gift sets) → gift sets → category tiles.
  const sorted = [...PRODUCTS].sort(byDiscount);
  const heroProducts = sorted.slice(0, 3);
  const used = new Set(heroProducts.map((p) => p.slug));
  const topDiscounts = sorted.filter((p) => !used.has(p.slug) && p.category !== GIFT_CATEGORY).slice(0, 8);
  topDiscounts.forEach((p) => used.add(p.slug));
  const allGifts = sorted.filter((p) => p.category === GIFT_CATEGORY && !used.has(p.slug));
  const gifts = allGifts.length >= 4 ? allGifts.slice(0, 4) : [];
  gifts.forEach((p) => used.add(p.slug));
  const categoryTiles = CATEGORIES.map((c) => {
    const inCategory = sorted.filter((p) => p.category === c.name);
    const product = inCategory.find((p) => !used.has(p.slug));
    if (product) used.add(product.slug);
    return { ...c, product };
  });

  return (
    <>
      {/* First screen: wordmark on the left, stack of real price tags on the right */}
      <Container className="pt-8 pb-10 md:pt-14 md:pb-16 grid gap-10 md:grid-cols-2 md:items-center">
        <div className="relative">
          <Sparkle className="absolute -top-3 left-[62%] size-4 md:size-5" />
          <h1 className="font-display text-[clamp(3.2rem,15vw,7.5rem)] md:text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.85]">Kozmeland</h1>
          <p className="mt-4 text-lg font-semibold text-muted flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-gold" />
            {az.location}
          </p>
          <div className="hidden md:flex mt-8 gap-3 flex-wrap">
            <HeroButtons />
          </div>
        </div>
        <div>
          <HeroTags products={heroProducts} />
          <div className="md:hidden mt-8 flex gap-3 flex-wrap justify-center">
            <HeroButtons />
          </div>
        </div>
      </Container>

      {/* Brand wall */}
      <Container>
        <h2 className="sr-only">{az.home.brands}</h2>
        <ul className="flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/catalog?brand=${b.slug}`}
                className="inline-flex h-9 items-center rounded-full border border-ink/15 bg-white px-4 text-sm font-semibold hover:border-fuchsia hover:text-fuchsia"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-12">
        <SectionTitle title={az.home.topDiscounts} href="/catalog?sort=discount" />
        <ProductGrid products={topDiscounts} />
      </Container>

      {gifts.length > 0 && (
        <Container className="mt-14">
          <section className="relative rounded-[28px] bg-powder p-4 md:p-8">
            <Sparkle className="absolute top-5 right-6 size-4" />
            <SectionTitle title={az.home.giftSets} href="/catalog?cat=hediyye-destleri" />
            <ProductGrid products={gifts} />
          </section>
        </Container>
      )}

      <Container className="mt-14">
        <SectionTitle title={az.home.categories} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoryTiles.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog?cat=${c.slug}`}
              className="group relative flex items-end overflow-hidden rounded-[22px] bg-powder p-4 min-h-40 md:min-h-52"
            >
              {c.product && (
                <div className="absolute right-2 top-2 size-24 md:size-36 rounded-2xl bg-white overflow-hidden">
                  <Image
                    src={c.product.image}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-contain p-2 transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <span className="relative font-display text-xl md:text-2xl leading-tight max-w-[60%] group-hover:text-fuchsia">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-14">
        <section className="rounded-[28px] bg-powder p-5 md:p-8">
          <SectionTitle title={az.home.store} />
          <StoreInfo />
        </section>
      </Container>
    </>
  );
}

function HeroButtons() {
  return (
    <>
      <Link
        href="/catalog"
        className="inline-flex h-12 items-center rounded-full bg-fuchsia px-6 font-semibold text-white hover:bg-fuchsia-dark"
      >
        {az.hero.allProducts}
      </Link>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener"
        className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink px-5 font-semibold hover:bg-ink hover:text-milk"
      >
        <WhatsAppIcon className="size-5" />
        {az.hero.whatsapp}
      </a>
    </>
  );
}
