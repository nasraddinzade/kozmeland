type Props = {
  price: string;
  oldPrice: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: { old: "text-[11px]", now: "text-xl" },
  md: { old: "text-xs", now: "text-2xl" },
  lg: { old: "text-sm", now: "text-4xl" },
};

/** Tag-shaped price label: crossed-out old price in grey on top, new price large in fuchsia below. */
export function PriceTag({ price, oldPrice, size = "sm", className = "" }: Props) {
  const s = SIZES[size];
  return (
    <div className={`price-tag ${className}`}>
      {oldPrice && (
        <s className={`${s.old} text-muted font-semibold decoration-muted/80`}>
          {oldPrice} ₼<span className="sr-only"> əvəzinə</span>
        </s>
      )}
      <span className={`font-display ${s.now} text-fuchsia whitespace-nowrap`}>{price} ₼</span>
    </div>
  );
}

export function DiscountBadge({ discount, className = "" }: { discount: number | null; className?: string }) {
  if (!discount) return null;
  return (
    <span
      className={`font-display inline-flex items-center justify-center size-11 rounded-full bg-fuchsia text-white text-sm leading-none ${className}`}
    >
      −{discount}%
    </span>
  );
}
