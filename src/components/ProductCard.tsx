import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { DiscountBadge, PriceTag } from "@/components/PriceTag";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col min-w-0">
      <div className="relative aspect-square rounded-xl bg-white border border-line overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 768px) 25vw, 50vw"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
          priority={priority}
        />
        <DiscountBadge discount={product.discount} className="absolute top-2 left-2" />
      </div>
      <p lang="en" className="mt-2 text-[10px] uppercase tracking-[0.08em] font-semibold text-muted truncate">{product.brand}</p>
      <h3 className="text-sm leading-snug line-clamp-2 min-h-[2.6em] group-hover:text-fuchsia">
        {product.name}
        {product.volume ? <span className="text-muted">, {product.volume}</span> : null}
      </h3>
      <PriceTag price={product.price} oldPrice={product.oldPrice} className="mt-2 self-start" />
    </Link>
  );
}

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
