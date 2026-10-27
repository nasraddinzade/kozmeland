import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { DemoBanner } from "@/components/DemoBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kozmeland — kosmetika mağazası, Səbail",
    template: "%s · Kozmeland",
  },
  description: "Kozmeland: Bakıda, Səbail rayonunda kosmetika mağazası. Endirimli qiymətlər, ünvana çatdırılma.",
};

export const viewport: Viewport = {
  themeColor: "#E4166E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={`${bricolage.variable} ${manrope.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <CartProvider>
          <DemoBanner />
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
