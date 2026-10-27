import type { Metadata } from "next";
import { az } from "@/i18n/az";

export const metadata: Metadata = { title: az.checkout.title };

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
