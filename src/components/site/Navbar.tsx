import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";


const logo = "/nuventure-logo.webp";
const WHATSAPP = "https://wa.me/923284734463";



const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] items-center justify-between py-4">

        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Nuventure Constructions logo"
            loading="eager"
            decoding="async"
            className="h-11 w-11 object-contain"
          />
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-foreground">
              NUVENTURE
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Constructions
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "px-4 py-2 text-sm font-semibold text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Phone className="h-4 w-4" /> Free Quote
          </Link>
        </div>

        <button
          className="rounded-sm border border-border p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex w-[min(1200px,calc(100%-2rem))] flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "px-2 py-3 text-sm font-semibold text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-wider text-accent-foreground"
            >
              <Phone className="h-4 w-4" /> Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
