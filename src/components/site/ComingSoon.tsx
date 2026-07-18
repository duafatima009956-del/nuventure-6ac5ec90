import { Link } from "@tanstack/react-router";
import { ArrowLeft, Hammer } from "lucide-react";

const WHATSAPP = "https://wa.me/923284734463";

export function ComingSoon({ pageName }: { pageName: string }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-[min(720px,calc(100%-2rem))] flex-col items-center justify-center py-20 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
        <Hammer className="h-10 w-10 text-accent" />
        <span className="absolute inset-0 animate-ping rounded-full border border-accent/30" />
      </div>

      <span className="mt-8 inline-block rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
        Coming Soon
      </span>

      <h1 className="mt-5 text-3xl font-black sm:text-5xl">
        {pageName} page is <span className="text-accent">on the way</span>
      </h1>

      <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
        Our team is polishing this section with premium designs, real project shots
        and detailed information. It will be live very soon — thank you for your patience.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/40 transition-transform hover:scale-[1.02]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-6 py-3 text-sm font-bold text-accent hover:bg-accent/10"
        >
          💬 WhatsApp Us
        </a>
      </div>

      <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
        Nuventure Constructions · Lahore &amp; Islamabad
      </p>
    </div>
  );
}
