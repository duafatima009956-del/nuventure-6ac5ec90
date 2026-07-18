import { useEffect, useRef, useState } from "react";
import { X, Phone } from "lucide-react";
const POPUP_IMG = "/nv-offer-popup.webp";

const STORAGE_KEY = "nuventure-welcome-seen-v2";
const WHATSAPP = "tel:+923284734463";

export function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;

    const scrollY = window.scrollY;
    const { overflow, position, top, width } = document.body.style;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      window.scrollTo(0, scrollY);
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [open]);

  const close = () => {
    if (closing) return;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 260);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex h-[100svh] items-center justify-center overflow-hidden bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      style={{
        padding:
          "max(0.75rem, env(safe-area-inset-top)) max(0.75rem, env(safe-area-inset-right)) max(0.75rem, env(safe-area-inset-bottom)) max(0.75rem, env(safe-area-inset-left))",
      }}
      onClick={close}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[min(520px,100%)] max-h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-2xl bg-transparent shadow-[0_30px_120px_-20px_rgba(0,0,0,0.7)] ring-1 ring-accent/40"
        style={{
          boxShadow:
            "0 0 100px -10px hsl(var(--accent) / 0.45), 0 30px 120px -20px rgba(0,0,0,0.7)",
        }}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-black/80"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Poster image */}
        <div className="shrink min-h-0 leading-none">
          <img
            src={POPUP_IMG}
            alt="Nuventure Constructions — Your Dream Home Starts With The Right Foundation. Grey Structure ₨2600/sqft."
            className="block aspect-square h-auto max-h-[calc(100svh-7.25rem)] w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* CTA bar */}
        <div className="flex flex-col gap-2 bg-primary p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/80">
              Contact Now
            </p>
            <p className="mt-0.5 text-sm font-bold text-primary-foreground sm:text-base">
              Call: 0328-4734463
            </p>
          </div>
          <a
            href={WHATSAPP}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground shadow-lg transition-colors hover:bg-accent/90 sm:text-sm"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
