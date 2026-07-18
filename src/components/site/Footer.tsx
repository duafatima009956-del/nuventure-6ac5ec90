import { Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone, User } from "lucide-react";
import { SocialIcons } from "@/components/site/SocialIcons";

const logo = "/nuventure-logo-visible.webp";
const WHATSAPP = "https://wa.me/923284734463";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[oklch(0.24_0.10_258)] text-white">
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Nuventure Constructions logo"
              loading="lazy"
              decoding="async"
              className="h-11 w-11 object-contain"
            />
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-tight text-white">NUVENTURE</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-white/70">
                Constructions
              </span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/80">
            A full-service construction firm founded by Adnan Javed Paracha — serving Lahore
            &amp; Islamabad with architecture, 3D elevations, grey structure and turnkey delivery.
          </p>
          <div className="mt-6">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Follow us</h4>
            <SocialIcons className="mt-3" />
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Explore</h3>
          <nav className="mt-5 flex flex-col gap-2.5 text-sm">
            <Link to="/" className="text-white/75 transition-colors hover:text-white">Home</Link>
            <Link to="/about" className="text-white/75 transition-colors hover:text-white">About</Link>
            <Link to="/services" className="text-white/75 transition-colors hover:text-white">Services</Link>
            <Link to="/projects" className="text-white/75 transition-colors hover:text-white">Projects</Link>
            <Link to="/contact" className="text-white/75 transition-colors hover:text-white">Contact</Link>
          </nav>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Office 201, 2nd Floor, Salam Tower,<br />Faisal Town Markaz, Islamabad
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a href={WHATSAPP} className="hover:text-white">0328 4734463</a>
            </li>
            <li className="flex items-center gap-2.5">
              <User className="h-4 w-4 shrink-0 text-accent" />
              Adnan Javed Paracha · Founder
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 shrink-0 text-accent" />
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-white">
                WhatsApp us anytime
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/70">
        <div>© {new Date().getFullYear()} Nuventure Constructions · Mon – Sat · 10 AM to 7 PM</div>
        <a
          href="https://brandup-shine.lovable.app"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 text-white/85 transition hover:border-white/50 hover:text-white"
        >
          <img
            src="/brandup-logo.webp"
            alt="Brand Up logo"
            loading="lazy"
            decoding="async"
            className="h-5 w-5 rounded-full bg-white object-contain p-0.5"
          />
          <span className="font-medium tracking-wide">
            Designed &amp; Developed by <span className="text-white font-semibold">Brand Up</span>
          </span>
        </a>
      </div>
    </footer>

  );
}
