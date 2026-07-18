import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "nv-theme";

function applyTheme(mode: "dark" | "light") {
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeToggle() {
  const [mode, setMode] = useState<"dark" | "light">("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as "dark" | "light" | null;
      const initial =
        saved ??
        (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setMode(initial);
      applyTheme(initial);
    } catch {
      applyTheme("light");
    }
  }, []);

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    applyTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  return (
    <button
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="fixed bottom-24 right-5 z-[120] flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_10px_30px_-5px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 sm:bottom-28 sm:right-6"
    >
      {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
