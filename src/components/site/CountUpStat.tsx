import { useEffect, useMemo, useRef, useState } from "react";

function parseCountValue(value: string) {
  const match = value.match(/(\d+)/);

  if (!match) {
    return { target: 0, template: value, hasNumber: false };
  }

  return {
    target: Number.parseInt(match[1], 10),
    template:
      value.slice(0, match.index) +
      "__N__" +
      value.slice((match.index ?? 0) + match[1].length),
    hasNumber: true,
  };
}

function useInViewOnce<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || inView) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}

export function CountUpText({
  value,
  run,
  duration = 1300,
}: {
  value: string;
  run: boolean;
  duration?: number;
}) {
  const { target, template, hasNumber } = useMemo(() => parseCountValue(value), [value]);
  const [display, setDisplay] = useState(0);
  const completed = useRef(false);

  useEffect(() => {
    if (!hasNumber || !run || completed.current) return;

    let animationFrame = 0;
    const startedAt = performance.now();
    completed.current = true;
    setDisplay(0);

    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, hasNumber, run, target]);

  if (!hasNumber) return <>{value}</>;

  return <>{template.replace("__N__", String(display))}</>;
}

export function CountOnView({
  value,
  className,
  threshold,
  lightParent = false,
}: {
  value: string;
  className?: string;
  threshold?: number;
  lightParent?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>(threshold);

  useEffect(() => {
    if (!inView || !lightParent) return;

    const parentBox = ref.current?.closest(".shine-box");
    parentBox?.classList.add("is-lit");
  }, [inView, lightParent, ref]);

  return (
    <span ref={ref} className={className}>
      <CountUpText value={value} run={inView} />
    </span>
  );
}