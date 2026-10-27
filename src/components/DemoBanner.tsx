import { SHOW_DEMO_BANNER } from "@/config";
import { az } from "@/i18n/az";

export function DemoBanner() {
  if (!SHOW_DEMO_BANNER) return null;
  return (
    <div className="bg-ink text-milk text-center text-xs font-semibold tracking-wide py-1.5 px-4">
      {az.demoBanner}
    </div>
  );
}
