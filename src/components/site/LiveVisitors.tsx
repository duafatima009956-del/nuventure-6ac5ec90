import { useEffect, useState } from "react";

const MIN = 100;
const MAX = 300;

function randomCount() {
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

export function LiveVisitors({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(randomCount());
    const id = setInterval(() => {
      setCount((prev) => {
        const base = prev ?? randomCount();
        // small drift ±7, then clamp; occasionally jump
        const drift =
          Math.random() < 0.15
            ? Math.floor(Math.random() * 40) - 20
            : Math.floor(Math.random() * 15) - 7;
        let next = base + drift;
        if (next < MIN) next = MIN + Math.floor(Math.random() * 10);
        if (next > MAX) next = MAX - Math.floor(Math.random() * 10);
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  if (count === null) return null;

  return (
    <div
      className={`fixed bottom-24 left-5 z-[110] inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/40 bg-background/90 px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-lg backdrop-blur-md sm:bottom-28 sm:left-6 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <span className="tabular-nums">{count}</span>
      <span className="text-muted-foreground">visitors on site</span>
    </div>
  );
}
