import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { DiscountBadge } from "@/components/PriceTag";

const TILTS = ["-rotate-3", "rotate-2", "-rotate-1"];
const OFFSETS = ["md:mr-10", "md:ml-10", "md:mr-4"];

/** Stack of three tilted tags with the biggest discounts. */
export function HeroTags({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-col items-center gap-0">
      {products.slice(0, 3).map((p, i) => (
        <Link
          key={p.slug}
          href={`/product/${p.slug}`}
          className={`tag-card ${TILTS[i]} ${OFFSETS[i]} ${i ? "-mt-3" : ""} w-full max-w-[340px] flex items-center gap-3 p-3 pr-9 transition-transform hover:rotate-0 hover:z-10`}
        >
          <div className="relative size-20 sm:size-24 shrink-0 rounded-lg bg-white overflow-hidden">
            <Image src={p.image} alt={`${p.brand} ${p.name}`} fill sizes="96px" className="object-contain" priority />
          </div>
          <div className="min-w-0 flex-1">
            <p lang="en" className="text-[10px] uppercase tracking-[0.08em] font-semibold text-muted truncate">{p.brand}</p>
            <p className="text-sm leading-tight line-clamp-2">{p.name}</p>
            <div className="mt-1 flex items-end gap-2">
              <div className="flex flex-col leading-none">
                {p.oldPrice && <s className="text-xs text-muted font-semibold">{p.oldPrice} ₼</s>}
                <span className="font-display text-[28px] text-fuchsia leading-none">{p.price} ₼</span>
              </div>
              <DiscountBadge discount={p.discount} className="ml-auto size-10! text-xs!" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
