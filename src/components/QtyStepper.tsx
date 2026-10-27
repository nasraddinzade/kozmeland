"use client";

import { az } from "@/i18n/az";

type Props = { value: number; onChange: (v: number) => void; min?: number; size?: "sm" | "md" };

export function QtyStepper({ value, onChange, min = 0, size = "md" }: Props) {
  const h = size === "sm" ? "h-9" : "h-12";
  const w = size === "sm" ? "w-9" : "w-11";
  return (
    <div className={`inline-flex items-center ${h} rounded-full border border-line bg-white`} aria-label={az.product.quantity}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={az.product.decrease}
        className={`${w} ${h} text-lg font-semibold disabled:text-line`}
      >
        −
      </button>
      <span className="font-display w-7 text-center text-lg tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={az.product.increase}
        className={`${w} ${h} text-lg font-semibold`}
      >
        +
      </button>
    </div>
  );
}
