import { useMemo, useState } from "react";
import { Calculator, X, Phone, MessageCircle, Hammer, Building2, FileText, ZoomIn } from "lucide-react";

const materialsSpec = "/nv-materials-spec.webp";
const greyServices = "/nv-grey-services.webp";

const PHONE_TEL = "tel:+923284734463";
const WHATSAPP_NUM = "923284734463";

type PackageKey = "grey" | "finishing";
type FinishTier = "silver" | "gold" | "platinum";

const PACKAGES: Record<
  PackageKey,
  { label: string; rate: number; blurb: string; icon: React.ComponentType<{ className?: string }> }
> = {
  grey: {
    label: "Grey Structure (A++ Material)",
    rate: 2600,
    blurb: "60-grade steel, RCC structure, foundation, brickwork & plaster.",
    icon: Building2,
  },
  finishing: {
    label: "Grey Structure + Finishing (A++ Material)",
    rate: 3700,
    blurb: "Complete turnkey: grey structure with tiles, paint, woodwork, electrical & plumbing.",
    icon: Hammer,
  },
};

const FINISH_TIERS: Record<FinishTier, { label: string; rate: number }> = {
  silver: { label: "Silver", rate: 3700 },
  gold: { label: "Gold", rate: 4800 },
  platinum: { label: "Platinum", rate: 6200 },
};

function formatPkr(n: number) {
  return "₨ " + Math.round(n).toLocaleString("en-PK");
}

export function CostCalculator() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showSpec, setShowSpec] = useState<null | "grey" | "turnkey">(null);
  const [pkg, setPkg] = useState<PackageKey>("grey");
  const [finishTier, setFinishTier] = useState<FinishTier>("silver");
  const [area, setArea] = useState<number>(1500);

  const currentRate = pkg === "finishing" ? FINISH_TIERS[finishTier].rate : PACKAGES.grey.rate;
  const currentLabel =
    pkg === "finishing"
      ? `${PACKAGES.finishing.label} — ${FINISH_TIERS[finishTier].label}`
      : PACKAGES.grey.label;
  const total = useMemo(() => currentRate * (Number.isFinite(area) ? area : 0), [currentRate, area]);
  const advance = total * 0.2;

  const close = () => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  const waMessage = encodeURIComponent(
    `Hi Nuventure Constructions,\n\nI used your cost calculator:\n• Package: ${currentLabel}\n• Covered Area: ${area} sqft\n• Rate: ₨${currentRate}/sqft\n• Estimated Total: ${formatPkr(total)}\n\nPlease share a detailed quote.`,
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
                    src="/nuventure-logo-visible.webp"
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
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs font-medium text-foreground/80">{PACKAGES[pkg].blurb}</p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setShowSpec("grey")}
                    className="animate-attention-shake group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-primary to-primary/90 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-primary-foreground shadow-lg ring-2 ring-accent/60 transition-all hover:scale-[1.02] hover:shadow-xl"
                  >
                    <span className="pointer-events-none absolute inset-0 animate-pulse rounded-xl ring-2 ring-accent/70" />
                    <span className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-full" />
                    <FileText className="relative h-4 w-4 text-accent" />
                    <span className="relative">Grey A++ Material</span>
                    <ZoomIn className="relative h-3.5 w-3.5 text-accent" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSpec("turnkey")}
                    className="animate-attention-shake group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent via-amber-400 to-accent px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-primary shadow-lg ring-2 ring-primary/40 transition-all hover:scale-[1.02] hover:shadow-xl"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <span className="pointer-events-none absolute inset-0 animate-pulse rounded-xl ring-2 ring-primary/50" />
                    <span className="pointer-events-none absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-full" />
                    <FileText className="relative h-4 w-4 text-primary" />
                    <span className="relative">Grey + Finishing A++</span>
                    <ZoomIn className="relative h-3.5 w-3.5 text-primary" />
                  </button>
                </div>

                {pkg === "finishing" && (
                  <div className="mt-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                      Finishing Tier
                    </label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {(Object.keys(FINISH_TIERS) as FinishTier[]).map((key) => {
                        const t = FINISH_TIERS[key];
                        const active = finishTier === key;
                        const tone =
                          key === "silver"
                            ? "from-slate-200 to-slate-400 text-slate-900"
                            : key === "gold"
                              ? "from-amber-300 to-amber-500 text-amber-950"
                              : "from-zinc-300 via-slate-100 to-zinc-400 text-zinc-900";
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setFinishTier(key)}
                            className={`relative flex flex-col items-center rounded-xl border-2 p-2.5 text-center transition-all ${
                              active
                                ? "border-accent bg-primary text-primary-foreground shadow-lg scale-[1.03]"
                                : "border-border bg-white text-foreground hover:border-accent"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-full rounded-md bg-gradient-to-r ${tone} shadow-inner`}
                            />
                            <span className="mt-1.5 text-[11px] font-black uppercase tracking-wider">
                              {t.label}
                            </span>
                            <span className={`text-[10px] font-bold ${active ? "text-accent" : "text-primary"}`}>
                              ₨{t.rate.toLocaleString()}/sqft
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
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

      {showSpec && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Materials specification"
          onClick={() => setShowSpec(null)}
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-y-auto bg-black/90 px-3 py-6 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-[min(900px,100%)] overflow-hidden rounded-2xl bg-background shadow-2xl ring-1 ring-accent/40 animate-scale-in"
          >
            <button
              onClick={() => setShowSpec(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-md transition hover:scale-110 hover:bg-black/90"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="bg-primary px-5 py-3 text-primary-foreground">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                Nuventure Constructions
              </p>
              <h3 className="text-base font-black sm:text-lg">
                {showSpec === "grey"
                  ? "Grey Structure A++ — Detailed Scope"
                  : "Grey + Finishing A++ — Silver · Gold · Platinum"}
              </h3>
            </div>
            <div className="max-h-[75vh] overflow-y-auto bg-white">
              <img
                 src={showSpec === "grey" ? greyServices : materialsSpec}
                alt={
                  showSpec === "grey"
                    ? "Nuventure Constructions grey structure services specification"
                    : "Nuventure Constructions materials specification: Silver, Gold and Platinum packages"
                }
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
