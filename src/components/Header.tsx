import Link from "next/link";
import { az } from "@/i18n/az";
import { CartButton } from "@/components/CartButton";
import { Container } from "@/components/Container";

function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/catalog" method="get" role="search" className={className}>
      <label className="relative block">
        <span className="sr-only">{az.nav.search}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          name="q"
          type="search"
          placeholder={az.nav.searchPlaceholder}
          className="w-full h-10 rounded-full bg-white border border-line pl-9 pr-4 text-sm outline-none focus:border-fuchsia"
        />
      </label>
    </form>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-milk/95 backdrop-blur border-b border-line">
      <Container className="flex items-center gap-3 h-14 md:h-16">
        <Link href="/" className="font-display text-2xl md:text-[28px] leading-none text-ink shrink-0">
          Kozmeland
        </Link>
        <SearchForm className="hidden md:block flex-1 max-w-md mx-auto" />
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
        <SearchForm className="flex-1" />
        <Link href="/catalog" className="sm:hidden h-10 px-3 inline-flex items-center rounded-full bg-powder text-sm font-semibold">
          {az.nav.catalog}
        </Link>
      </Container>
    </header>
  );
}
