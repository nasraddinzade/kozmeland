import Link from "next/link";
import { az } from "@/i18n/az";
import { CartButton } from "@/components/CartButton";
import { Container } from "@/components/Container";
import { SearchBox } from "@/components/SearchBox";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-milk/95 backdrop-blur border-b border-line">
      <Container className="flex items-center gap-3 h-14 md:h-16">
        <Link href="/" className="font-display text-2xl md:text-[28px] leading-none text-ink shrink-0">
          Kozmeland
        </Link>
        <SearchBox className="hidden md:block flex-1 max-w-md mx-auto" />
        <nav className="ml-auto md:ml-0 flex items-center gap-1 text-sm font-semibold">
          <Link href="/catalog" className="hidden sm:block px-3 py-2 rounded-full hover:bg-powder">
            {az.nav.catalog}
          </Link>
          <Link href="/magaza" className="hidden sm:block px-3 py-2 rounded-full hover:bg-powder">
            {az.nav.store}
          </Link>
          <CartButton />
        </nav>
      </Container>
      <Container className="md:hidden pb-2.5 flex items-center gap-2">
        <SearchBox className="flex-1" />
        <Link href="/catalog" className="sm:hidden h-10 px-3 inline-flex items-center rounded-full bg-powder text-sm font-semibold">
          {az.nav.catalog}
        </Link>
      </Container>
    </header>
  );
}
