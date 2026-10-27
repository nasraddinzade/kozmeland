import type { Metadata } from "next";
import { az } from "@/i18n/az";

export const metadata: Metadata = { title: { default: az.checkout.title, template: "%s · Kozmeland" } };

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
