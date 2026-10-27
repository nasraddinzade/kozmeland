import Link from "next/link";
import { CONTACTS } from "@/config";
import { az } from "@/i18n/az";
import { Container } from "@/components/Container";
import { whatsappUrl } from "@/lib/whatsapp";
import { CATEGORIES } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <Container className="py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-2xl">Kozmeland</p>
          <p className="mt-1 text-muted">{az.location}</p>
        </div>
        <ul className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/catalog?cat=${c.slug}`} className="hover:text-fuchsia">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <dl className="space-y-2">
          <div>
            <dt className="text-muted text-xs">{az.store.phone}</dt>
            <dd>
              <a href={whatsappUrl()} className="font-semibold hover:text-fuchsia" target="_blank" rel="noopener">
                {CONTACTS.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted text-xs">{az.store.instagram}</dt>
            <dd>
              <a
                href={`https://www.instagram.com/${CONTACTS.instagram}/`}
                className="font-semibold hover:text-fuchsia"
                target="_blank"
                rel="noopener"
              >
                @{CONTACTS.instagram}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted text-xs">{az.store.address}</dt>
            <dd>{CONTACTS.address}</dd>
          </div>
          <div>
            <dt className="text-muted text-xs">{az.store.delivery}</dt>
            <dd>{az.store.deliveryValue}</dd>
          </div>
        </dl>
      </Container>
      <div className="border-t border-line py-4 text-center text-xs text-muted px-4">{az.demoBanner}</div>
    </footer>
  );
}
