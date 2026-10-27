import type { Metadata } from "next";
import { az } from "@/i18n/az";

export const metadata: Metadata = { title: az.cart.title };

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
