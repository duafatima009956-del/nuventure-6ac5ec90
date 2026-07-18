import { useMemo, useState } from "react";
import { Calculator, X, Phone, MessageCircle, Home, Hammer, Building2, FileText, ZoomIn } from "lucide-react";
import materialsSpec from "@/assets/nv-materials-spec.jpg.asset.json";

const PHONE_TEL = "tel:+923284734463";
const WHATSAPP_NUM = "923284734463";

type PackageKey = "grey" | "finishing" | "turnkey";

const PACKAGES: Record<
  PackageKey,
  { label: string; rate: number; blurb: string; icon: React.ComponentType<{ className?: string }> }
> = {
  grey: {
    label: "Grey Structure A++",
    rate: 2600,
    blurb: "60-grade steel, RCC structure, foundation, brickwork & plaster.",
    icon: Building2,
  },
  finishing: {
    label: "Finishing A++",
    rate: 2400,
    blurb: "Tiles, paint, woodwork, electrical & plumbing fixtures.",
    icon: Hammer,
  },
  turnkey: {
    label: "Turnkey A++ (Grey + Finishing)",
    rate: 5000,
    blurb: "Complete ready-to-move-in home, premium materials, on-time delivery.",
    icon: Home,
  },
};

function formatPkr(n: number) {
  return "₨ " + Math.round(n).toLocaleString("en-PK");
}

export function CostCalculator() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showSpec, setShowSpec] = useState(false);
  const [pkg, setPkg] = useState<PackageKey>("grey");
  const [area, setArea] = useState<number>(1500);

  const total = useMemo(() => PACKAGES[pkg].rate * (Number.isFinite(area) ? area : 0), [pkg, area]);
  const advance = total * 0.2;

  const close = () => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  const waMessage = encodeURIComponent(
    `Hi Nuventure Constructions,\n\nI used your cost calculator:\n• Package: ${PACKAGES[pkg].label}\n• Covered Area: ${area} sqft\n• Rate: ₨${PACKAGES[pkg].rate}/sqft\n• Estimated Total: ${formatPkr(total)}\n\nPlease share a detailed quote.`,
  );
  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${waMessage}`;

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open cost calculator"
        className="group fixed bottom-5 left-5 z-[120] flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-accent to-amber-500 pl-2 pr-4 shadow-[0_12px_36px_-8px_hsl(var(--accent)/0.75)] ring-2 ring-white/80 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:left-6"
      >
        <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-accent/40" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-inner ring-2 ring-white/90">
          <Calculator className="h-5 w-5" strokeWidth={2.6} />
        </span>
        <span className="relative text-left text-[10px] font-black uppercase leading-[1.05] tracking-[0.14em] text-primary">
          Cost<br />Calculator
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Construction cost calculator"
          onClick={close}
          className={`fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/80 px-3 py-6 backdrop-blur-md sm:px-4 sm:py-8 ${
            closing ? "animate-fade-out" : "animate-fade-in"
          }`}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />

          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative my-auto w-[min(560px,100%)] overflow-hidden rounded-3xl bg-background shadow-[0_30px_120px_-20px_rgba(0,0,0,0.7)] ring-1 ring-accent/40 ${
              closing ? "animate-scale-out" : "animate-scale-in"
            }`}
            style={{
              boxShadow:
                "0 0 100px -10px hsl(var(--accent) / 0.45), 0 30px 120px -20px rgba(0,0,0,0.7)",
            }}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-md transition hover:scale-110 hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="relative overflow-hidden bg-primary px-5 pb-6 pt-7 text-primary-foreground sm:px-7 sm:pb-7 sm:pt-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-2 ring-accent/60 shadow-lg sm:h-16 sm:w-16">
                  <img
                    src="/nuventure-logo.jpg"
                    alt="Nuventure Constructions logo"
                    className="h-full w-full object-contain"
                    loading="eager"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                    Nuventure Constructions
                  </p>
                  <h2 className="mt-1 text-2xl font-black leading-tight sm:text-3xl">
                    Construction Cost <span className="text-accent">Calculator</span>
                  </h2>
                </div>
              </div>
              <p className="mt-3 max-w-md text-xs text-primary-foreground/75 sm:text-sm">
                Get an instant estimate for your dream home. Choose a package and enter covered area.
              </p>
            </div>

            {/* Body */}
            <div className="space-y-5 p-5 sm:space-y-6 sm:p-7">
              {/* Package tiles */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  Select Package
                </label>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {(Object.keys(PACKAGES) as PackageKey[]).map((key) => {
                    const p = PACKAGES[key];
                    const Icon = p.icon;
                    const active = pkg === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPkg(key)}
                        className={`group relative flex flex-col items-start rounded-2xl border p-3 text-left transition-all ${
                          active
                            ? "border-accent bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                            : "border-border bg-white text-foreground hover:border-accent hover:shadow-md"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            active ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className={`mt-2 text-[11px] font-bold uppercase tracking-wider ${active ? "text-primary-foreground" : "text-foreground"}`}>
                          {p.label}
                        </span>
                        <span
                          className={`mt-1 text-[11px] font-semibold ${
                            active ? "text-accent" : "text-primary"
                          }`}
                        >
                          ₨{p.rate.toLocaleString()}/sqft
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs font-medium text-foreground/80">{PACKAGES[pkg].blurb}</p>
                <button
                  type="button"
                  onClick={() => setShowSpec(true)}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-accent/60 bg-accent/10 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary transition-all hover:bg-accent/20 hover:border-accent hover:shadow-md"
                >
                  <FileText className="h-4 w-4 text-accent" />
                  View Silver / Gold / Platinum Materials
                  <ZoomIn className="h-3.5 w-3.5 opacity-60" />
                </button>
              </div>

              {/* Area input */}
              <div>
                <label
                  htmlFor="area-input"
                  className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground"
                >
                  Covered Area (sqft)
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    id="area-input"
                    type="number"
                    min={100}
                    max={20000}
                    step={50}
                    value={Number.isFinite(area) ? area : ""}
                    onChange={(e) => setArea(parseInt(e.target.value || "0", 10))}
                    className="w-28 shrink-0 rounded-xl border-2 border-primary/30 bg-white px-3 py-2.5 text-lg font-black text-primary outline-none ring-accent/40 focus:border-accent focus:ring-2 sm:w-32"
                  />
                  <input
                    type="range"
                    min={200}
                    max={10000}
                    step={50}
                    value={Number.isFinite(area) ? area : 0}
                    onChange={(e) => setArea(parseInt(e.target.value, 10))}
                    className="h-2 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-primary/15 accent-[hsl(var(--accent))]"
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] font-medium text-foreground/70">
                  <span>1 Marla ≈ 225 sqft</span>
                  <span>1 Kanal ≈ 4500 sqft</span>
                </div>
              </div>

              {/* Result */}
              <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground shadow-xl ring-1 ring-accent/30">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/25 blur-3xl" />
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                      Estimated Total
                    </p>
                    <p className="mt-1 text-3xl font-black leading-none sm:text-4xl">
                      {formatPkr(total)}
                    </p>
                    <p className="mt-1 text-[11px] text-primary-foreground/70">
                      {area || 0} sqft × ₨{PACKAGES[pkg].rate}/sqft
                    </p>
                  </div>
                  <div className="hidden shrink-0 rounded-xl bg-accent/10 p-3 ring-1 ring-accent/30 sm:block">
                    <Calculator className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-primary-foreground/15 pt-3 text-xs">
                  <span className="text-primary-foreground/70">Booking Advance (20%)</span>
                  <span className="font-bold text-accent">{formatPkr(advance)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground shadow-lg transition-transform hover:scale-[1.02] sm:text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  Get Detailed Quote
                </a>
                <a
                  href={PHONE_TEL}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-lg ring-1 ring-accent/40 transition-transform hover:scale-[1.02] sm:text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>

              <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
                * Estimates are indicative. Final cost depends on design, site conditions & material
                selection.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
