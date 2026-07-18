import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
const logo = "/nuventure-logo-visible.webp";
const g1 = "/nv-1.webp";
const g2 = "/nv-2.webp";
const g3 = "/nv-3.webp";
const g4 = "/nv-4.webp";
const g5 = "/nv-5.webp";
const g6 = "/nv-6.webp";
const g7 = "/nv-7.webp";
const g8 = "/nv-8.webp";
const g9 = "/nv-9.webp";

const images = [
  { src: g1, alt: "Modern villa under construction" },
  { src: g2, alt: "Steel rebar foundation grid" },
  { src: g3, alt: "Luxury villa exterior at night" },
  { src: g4, alt: "Concrete pouring in progress" },
  { src: g5, alt: "Luxury marble living room interior" },
  { src: g6, alt: "Architects reviewing blueprints" },
  { src: g7, alt: "Completed gray structure" },
  { src: g8, alt: "Designer kitchen with premium finishes" },
  { src: g9, alt: "Aerial view of construction site" },
];

// Duplicate for seamless infinite scroll
const track = [...images, ...images];
const AUTO_SPEED = 180; // px per second — smooth premium reel

export function MovingGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [dragging, setDragging] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const drag = useRef({ startX: 0, startScroll: 0, moved: 0 });
  const draggingRef = useRef(false);
  const paused = useRef(false);
  const firedRef = useRef(false);

  // Confetti disabled — kept ref stable for future use
  useEffect(() => {
    void confetti;
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const delta = Math.min(now - last, 32);
      last = now;
      if (el && !paused.current) {
        el.scrollLeft += (AUTO_SPEED * delta) / 1000;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    setDragging(true);
    draggingRef.current = true;
    paused.current = true;
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: 0 };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !ref.current) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    const half = ref.current.scrollWidth / 2;
    let next = drag.current.startScroll - dx * 1.8;
    if (half) {
      while (next < 0) next += half;
      while (next >= half) next -= half;
    }
    ref.current.scrollLeft = next;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    draggingRef.current = false;
    paused.current = false;
    ref.current?.releasePointerCapture(e.pointerId);
  };

  const openImage = (i: number) => {
    if (drag.current.moved > 6) return; // ignore clicks that were drags
    setLightbox(i % images.length);
  };

  const nav = (dir: number) => {
    setLightbox((prev) => {
      if (prev === null) return prev;
      return (prev + dir + images.length) % images.length;
    });
  };

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section ref={sectionRef} className="mx-auto mt-24 w-[min(1400px,calc(100%-2rem))]">
      <div className="mb-8 flex items-end justify-between gap-6 px-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Recent Work</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">On-site &amp; delivered</h2>
        </div>
        <p className="hidden max-w-xs text-xs text-muted-foreground sm:block">
          Drag the reel to browse. Tap any image to view in full.
        </p>
      </div>
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => {
          if (!dragging) paused.current = false;
        }}
        className={`flex gap-4 overflow-x-auto py-7 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y", overscrollBehaviorX: "contain" }}
      >
        {track.map((img, i) => (
          <button
            type="button"
            key={i}
            onClick={() => openImage(i)}
            className="gallery-glow-card group relative shrink-0 overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-[1.03] hover:-rotate-[0.6deg] focus:outline-none focus:ring-2 focus:ring-accent"
            style={{ width: "min(70vw, 340px)", aspectRatio: "4 / 3" }}
          >
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Hover shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {/* Corner watermark badge */}
            <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1.5 rounded-md bg-background/85 px-2 py-1 shadow-md backdrop-blur-sm">
              <img src={logo} alt="" aria-hidden="true" loading="lazy" decoding="async" draggable={false} className="h-5 w-5 object-contain" />
              <span className="text-[9px] font-black uppercase tracking-widest text-accent">Nuventure</span>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-magic-aperture"
        >
          <button
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/50 p-2 text-white transition hover:border-accent hover:text-accent"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); nav(-1); }}
            className="absolute left-2 sm:left-6 rounded-full border border-white/30 bg-black/50 p-2 text-white transition hover:border-accent hover:text-accent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); nav(1); }}
            className="absolute right-2 sm:right-6 rounded-full border border-white/30 bg-black/50 p-2 text-white transition hover:border-accent hover:text-accent"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] w-[min(1100px,95vw)]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              decoding="async"
              className="mx-auto max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl animate-magic-pop"
            />
            <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-background/85 px-2 py-1 shadow-md backdrop-blur-sm">
              <img src={logo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-6 w-6 object-contain" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Nuventure</span>
            </div>
            <p className="mt-3 text-center text-sm text-white/80">{images[lightbox].alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
