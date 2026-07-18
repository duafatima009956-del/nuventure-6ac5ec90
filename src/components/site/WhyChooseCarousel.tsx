import { useEffect, useRef, useState } from "react";

type Item = { title: string; desc: string };

const AUTO_SPEED = 50; // px per second

export function WhyChooseCarousel({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const drag = useRef({ startX: 0, startScroll: 0 });

  const track = [...items, ...items];

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
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !ref.current) return;
    const dx = e.clientX - drag.current.startX;
    ref.current.scrollLeft = drag.current.startScroll - dx * 1.4;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    draggingRef.current = false;
    paused.current = false;
    ref.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="relative mt-10">
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
        className={`flex gap-px overflow-x-auto bg-border py-0 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y", overscrollBehaviorX: "contain" }}
      >
        {track.map((w, i) => (
          <div
            key={i}
            data-card
            className="shrink-0 bg-background p-8"
            style={{ width: "min(85vw, 360px)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center border border-accent text-sm font-bold text-accent">
              {String((i % items.length) + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
