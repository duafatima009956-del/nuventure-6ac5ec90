import { useEffect, useState } from "react";
import { Type, X } from "lucide-react";

const FONTS = [
  { label: "Inter", value: '"Inter", system-ui, sans-serif' },
  { label: "Space Grotesk", value: '"Space Grotesk", "Inter", sans-serif' },
  { label: "Poppins", value: '"Poppins", system-ui, sans-serif' },
  { label: "Montserrat", value: '"Montserrat", system-ui, sans-serif' },
  { label: "Playfair Display", value: '"Playfair Display", Georgia, serif' },
  { label: "Roboto Slab", value: '"Roboto Slab", Georgia, serif' },
  { label: "JetBrains Mono", value: '"JetBrains Mono", ui-monospace, monospace' },
  { label: "System", value: "system-ui, sans-serif" },
];

const GOOGLE_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Roboto+Slab:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap";

type Settings = { family: string; scale: number; weight: number };
const DEFAULTS: Settings = { family: FONTS[0].value, scale: 1, weight: 700 };
const KEY = "nv-typography";

function apply(s: Settings) {
  const r = document.documentElement.style;
  r.setProperty("--user-font-family", s.family);
  r.setProperty("--user-font-scale", String(s.scale));
  r.setProperty("--user-font-weight", String(s.weight));
}

export function TypographyPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  // Inject Google fonts stylesheet once
  useEffect(() => {
    if (document.getElementById("nv-typo-fonts")) return;
    const link = document.createElement("link");
    link.id = "nv-typo-fonts";
    link.rel = "stylesheet";
    link.href = GOOGLE_HREF;
    document.head.appendChild(link);
  }, []);

  // Load persisted
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) };
        setSettings(parsed);
        apply(parsed);
      } else {
        apply(DEFAULTS);
      }
    } catch (error) {
      console.warn("Typography settings could not be loaded; resetting to defaults.", error);
      apply(DEFAULTS);
    }
  }, []);

  function update(patch: Partial<Settings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    apply(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch (error) {
      console.warn("Typography settings could not be saved.", error);
    }
  }

  function reset() {
    setSettings(DEFAULTS);
    apply(DEFAULTS);
    try {
      localStorage.removeItem(KEY);
    } catch (error) {
      console.warn("Typography settings could not be reset.", error);
    }
  }

  return (
    <>
      <button
        aria-label="Typography settings"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-24 right-5 z-[120] flex h-12 w-12 items-center justify-center rounded-full bg-[#F97316] text-white shadow-[0_10px_30px_-5px_rgba(249,115,22,0.75)] transition-transform hover:scale-105"
      >
        <Type className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed bottom-40 right-5 z-[120] w-[min(340px,calc(100vw-2.5rem))] rounded-2xl border border-black/10 bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-black">Typography</h3>
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-black/60 hover:bg-black/5 hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-black/60">
            Font family
          </label>
          <select
            value={settings.family}
            onChange={(e) => update({ family: e.target.value })}
            className="mb-4 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm text-black focus:border-[#F97316] focus:outline-none"
          >
            {FONTS.map((f) => (
              <option key={f.label} value={f.value} style={{ fontFamily: f.value }}>
                {f.label}
              </option>
            ))}
          </select>

          <label className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black/60">
            <span>Size</span>
            <span className="text-black">{Math.round(settings.scale * 100)}%</span>
          </label>
          <input
            type="range"
            min={0.8}
            max={1.4}
            step={0.05}
            value={settings.scale}
            onChange={(e) => update({ scale: parseFloat(e.target.value) })}
            className="mb-4 w-full accent-[#F97316]"
          />

          <label className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black/60">
            <span>Weight</span>
            <span className="text-black">{settings.weight}</span>
          </label>
          <input
            type="range"
            min={300}
            max={900}
            step={100}
            value={settings.weight}
            onChange={(e) => update({ weight: parseInt(e.target.value, 10) })}
            className="mb-4 w-full accent-[#F97316]"
          />

          <div className="mb-4 rounded-lg border border-black/10 bg-black/[0.02] p-3 text-black">
            <div className="text-xs text-black/50">Preview</div>
            <div className="mt-1 text-lg">The quick brown fox</div>
          </div>

          <button
            onClick={reset}
            className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-semibold text-black hover:bg-black/5"
          >
            Reset to default
          </button>
        </div>
      )}
    </>
  );
}
