import { useEffect, useState } from "react";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
const BRANDUP_LOGO = "/brandup-logo.jpg";
const STORAGE_KEY = "brandup-credit-popup-seen";

export function BrandUpPopup() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setMounted(true);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!show) return;
    const colors = ["#ff9a3c", "#ff6a00", "#ffb347", "#ffd28a", "#ffffff"];
    const fire = (x: number) => {
      confetti({
        particleCount: 55,
        spread: 70,
        startVelocity: 55,
        origin: { x, y: 0.35 },
        colors,
        scalar: 1,
        ticks: 220,
        zIndex: 200,
      });
      confetti({
        particleCount: 25,
        spread: 120,
        startVelocity: 30,
        origin: { x, y: 0.4 },
        colors,
        shapes: ["circle"],
        scalar: 0.7,
        ticks: 260,
        zIndex: 200,
      });
    };
    const t1 = window.setTimeout(() => fire(0.2), 150);
    const t2 = window.setTimeout(() => fire(0.8), 300);
    const t3 = window.setTimeout(() => fire(0.5), 500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [show]);

  const close = () => {
    setShow(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
    window.setTimeout(() => setMounted(false), 300);
  };

  if (!mounted) return null;

  return <div></div>;
}
