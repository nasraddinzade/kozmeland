import {
  ADDRESS_2GIS,
  ADDRESS_INSTAGRAM,
  CONTACTS,
  CREDIT_NOTE,
  SHOW_UNCONFIRMED,
  STUDENT_NOTE,
} from "@/config";
import { az } from "@/i18n/az";
import { whatsappUrl } from "@/lib/whatsapp";

/** Confirmed contacts only; single-source facts appear only with SHOW_UNCONFIRMED. */
export function StoreInfo() {
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: az.store.phone,
      value: (
        <a href={whatsappUrl()} target="_blank" rel="noopener" className="hover:text-fuchsia">
          {CONTACTS.phone}
        </a>
      ),
    },
    {
      label: az.store.instagram,
      value: (
        <a
          href={`https://www.instagram.com/${CONTACTS.instagram}/`}
          target="_blank"
          rel="noopener"
          className="hover:text-fuchsia"
        >
          @{CONTACTS.instagram}
        </a>
      ),
    },
    { label: az.store.address, value: SHOW_UNCONFIRMED ? ADDRESS_2GIS : CONTACTS.address },
    { label: az.store.delivery, value: az.store.deliveryValue },
  ];

  return (
    <div>
      <dl className="grid gap-4 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="rounded-xl bg-white/70 px-4 py-3">
            <dt className="text-xs text-muted">{r.label}</dt>
            <dd className="mt-0.5 font-semibold">{r.value}</dd>
          </div>
        ))}
      </dl>
      {SHOW_UNCONFIRMED && (
        <ul className="mt-4 text-sm text-muted space-y-1">
          <li>{ADDRESS_INSTAGRAM}</li>
          <li>{CREDIT_NOTE}</li>
          <li>{STUDENT_NOTE}</li>
        </ul>
      )}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener"
        className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-milk hover:bg-fuchsia"
      >
        <WhatsAppIcon className="size-5" />
        {az.store.writeWhatsapp}
      </a>
    </div>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}
