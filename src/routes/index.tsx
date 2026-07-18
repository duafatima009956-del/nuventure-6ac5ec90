import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Building2, HardHat, Ruler, Hammer, Layers, KeyRound, MapPin, Phone, Target, Eye, Gem, Check, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CountOnView } from "@/components/site/CountUpStat";
import { MovingGallery } from "@/components/site/MovingGallery";
import { WhyChooseCarousel } from "@/components/site/WhyChooseCarousel";
import legacyBanner from "@/assets/nv-legacy-banner.jpg.asset.json";
import greyStructureImg from "@/assets/nv-grey-structure.jpg.asset.json";
const heroVideo = { url: "https://project--c3006114-6dee-491f-bb88-24bea212c6ef.lovable.app/__l5e/assets-v1/9a174b3e-043d-4b59-9439-20fdef19214b/nv-hero-video.mp4" };
const ceoImage = { url: "/ceo-adnan-paracha.jpg" };

const heroSlides = [
  {
    img: "/nv-hero-1.jpg",
    eyebrow: "Welcome to Nuventure Constructions",
    titleLead: "We build the homes",
    titleAccent: "Pakistan trusts.",
    desc: "A full-service construction firm led by Adnan Javed Paracha — architecture, 3D elevations, grey structure and turnkey delivery across Lahore & Islamabad.",
  },
  {
    img: "/nv-hero-2.jpg",
    eyebrow: "Modern Architecture · Lahore & Islamabad",
    titleLead: "Designer villas with",
    titleAccent: "photo-real 3D previews.",
    desc: "Approve every elevation, façade and interior in cinematic 3D before we break ground — no surprises, only precision.",
  },
  {
    img: "/nv-hero-3.jpg",
    eyebrow: "Turnkey Delivery",
    titleLead: "From blueprint",
    titleAccent: "to the keys in your hand.",
    desc: "Architecture, grey structure, finishing and interiors — one accountable team from concept to handover.",
  },
  {
    img: "/nv-hero-4.jpg",
    eyebrow: "Owner-Supervised Projects",
    titleLead: "Every site personally",
    titleAccent: "led by Adnan Javed Paracha.",
    desc: "Direct oversight, transparent timelines and premium materials — the standard behind 120+ delivered projects.",
  },
];
const g1 = "/nv-1.jpg";
const g3 = "/nv-3.jpg";
const g5 = "/nv-5.jpg";
const g7 = "/nv-7.jpg";
const g8 = "/nv-8.jpg";
const g9 = "/nv-9.jpg";

const WHATSAPP = "https://wa.me/923284734463";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { Icon: Ruler, img: "/nv-svc-1.jpg", title: "Architecture & Design", desc: "Creative layouts, approved floor plans and construction drawings — a solid blueprint before ground breaking." },
  { Icon: Building2, img: "/nv-svc-2.jpg", title: "Residential & Commercial", desc: "Luxury homes, villas and commercial plazas built with top-grade materials across Lahore and Islamabad." },
  { Icon: Layers, img: "/nv-svc-3.jpg", title: "3D Front Elevations", desc: "Photo-realistic 3D elevations — see your project before it takes physical shape." },
  { Icon: Hammer, img: "/nv-svc-4.jpg", title: "Renovation & Upgrades", desc: "Give old buildings a modern transformation — inside and out, structural to finishing." },
  { Icon: HardHat, img: "/nv-svc-5.jpg", title: "Project Supervision", desc: "Full oversight from foundation to handover. Timeline control, budget discipline, quality assurance." },
  { Icon: KeyRound, img: "/nv-svc-6.jpg", title: "Turnkey Delivery", desc: "A complete design-to-handover package. You share the vision, we deliver the keys." },
];

const whyUs = [
  { title: "Two Major Cities", desc: "Active presence in both Lahore and Islamabad — one brand, double trust." },
  { title: "3D Before Build", desc: "Approve your project in photo-real 3D before we break ground." },
  { title: "Owner Supervision", desc: "Every site personally monitored by Adnan Javed Paracha." },
  { title: "End-to-End Delivery", desc: "Design, construction and finishing — everything under one roof." },
  { title: "Modern Architecture", desc: "Clean elevations, glass fronts, honest materials, luxury finishes." },
  { title: "Transparent Timeline", desc: "Professional project management. No delays, no hidden charges." },
];

const gallery = [
  { src: g1, alt: "Modern luxury villa exterior at dusk" },
  { src: g9, alt: "Contemporary bungalow front elevation" },
  { src: g3, alt: "Corporate glass-front commercial plaza" },
  { src: g5, alt: "Marble living room in a completed home" },
  { src: g7, alt: "Aerial view of residential development" },
  { src: g8, alt: "Custom designer kitchen with marble finishes" },
];


function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-accent" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
        {children}
      </span>
    </div>
  );
}

function Index() {
  const [slide, setSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let userInteracted = false;
    let inView = false;

    const tryUnmute = () => {
      if (!inView) return;
      v.muted = false;
      v.volume = 1;
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Autoplay-with-sound blocked — stay muted, wait for interaction
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    };

    const onInteract = () => {
      userInteracted = true;
      tryUnmute();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
    };
    window.addEventListener("pointerdown", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);
    window.addEventListener("touchstart", onInteract, { passive: true });
    window.addEventListener("scroll", onInteract, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          inView = e.isIntersecting && e.intersectionRatio >= 0.5;
          if (inView) {
            tryUnmute();
          } else {
            v.muted = true;
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      void userInteracted;
    };
  }, []);

  // Per-card corner light: turn on when card scrolls into view
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-card-shine]");
    if (!cards.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.35) {
            e.target.classList.add("is-glow");
          }
        }
      },
      { threshold: [0, 0.35, 0.6] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="shine-box relative -mt-[88px] flex min-h-[100svh] items-center overflow-hidden bg-primary text-primary-foreground">
        {heroSlides.map((s, i) => (
          <img
            key={s.img}
            src={s.img}
            alt={s.eyebrow}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            {...(i === 0 ? { fetchPriority: "high" as const } : {})}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              i === slide ? "opacity-100 animate-slow-pan" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

        {/* Watermark */}
        <div className="absolute left-4 top-24 z-10 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm ring-1 ring-white/15 sm:left-6 sm:top-28">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">Nuventure</span>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? "w-8 bg-accent" : "w-4 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>


        <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))] pt-32 pb-24 text-center sm:pt-40 sm:pb-32">
          {heroSlides.map((s, i) => (
            <div
              key={s.img}
              aria-hidden={i !== slide}
              className={`transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === slide
                  ? "relative opacity-100 translate-y-0"
                  : "pointer-events-none absolute inset-x-0 opacity-0 translate-y-3"
              }`}
            >
              <div className="flex justify-center">
                <Eyebrow>{s.eyebrow}</Eyebrow>
              </div>

              <h1 className="mx-auto mt-5 max-w-4xl text-[1.75rem] font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {s.titleLead}
                <span className="block text-accent sm:inline"> {s.titleAccent}</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-primary-foreground/80 sm:text-lg">
                {s.desc}
              </p>
            </div>
          ))}


          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 animate-hero-fade-up [animation-delay:460ms] opacity-0 [animation-fill-mode:forwards]">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-primary-foreground/30 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-14 w-[min(1200px,calc(100%-2rem))] sm:-mt-20">
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {[
            ["120+", "Projects Delivered"],
            ["12", "Years Experience"],
            ["2", "Cities Served"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-secondary/60 px-4 py-5 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_20px_45px_-20px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-accent/60 sm:rounded-3xl sm:px-7 sm:py-8"
            >
              <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <div className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
                <CountOnView value={n} threshold={0.25} lightParent />
              </div>
              <div className="relative mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Video */}
      <section className="mx-auto mt-20 w-[min(1200px,calc(100%-2rem))] sm:mt-28">
        <div className="group relative rounded-2xl p-[2px] sm:rounded-3xl">
          {/* Animated gradient border glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-[2px] rounded-2xl bg-[conic-gradient(from_0deg,transparent,hsl(var(--accent))/0.9,transparent_30%,transparent_60%,hsl(var(--accent))/0.9,transparent)] opacity-70 blur-[6px] transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl animate-[spin_9s_linear_infinite]"
          />
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.55),0_0_40px_-10px_hsl(var(--accent)/0.35)] sm:rounded-3xl">
            {/* Corner light accents */}
            <span className="pointer-events-none absolute left-0 top-0 z-10 h-10 w-10 rounded-tl-2xl border-l-2 border-t-2 border-accent/70 shadow-[0_0_22px_hsl(var(--accent)/0.55)] transition-all duration-500 group-hover:border-accent group-hover:shadow-[0_0_32px_hsl(var(--accent)/0.9)] sm:h-14 sm:w-14 sm:rounded-tl-3xl" />
            <span className="pointer-events-none absolute right-0 top-0 z-10 h-10 w-10 rounded-tr-2xl border-r-2 border-t-2 border-accent/70 shadow-[0_0_22px_hsl(var(--accent)/0.55)] transition-all duration-500 group-hover:border-accent group-hover:shadow-[0_0_32px_hsl(var(--accent)/0.9)] sm:h-14 sm:w-14 sm:rounded-tr-3xl" />
            <span className="pointer-events-none absolute bottom-0 left-0 z-10 h-10 w-10 rounded-bl-2xl border-b-2 border-l-2 border-accent/70 shadow-[0_0_22px_hsl(var(--accent)/0.55)] transition-all duration-500 group-hover:border-accent group-hover:shadow-[0_0_32px_hsl(var(--accent)/0.9)] sm:h-14 sm:w-14 sm:rounded-bl-3xl" />
            <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-10 w-10 rounded-br-2xl border-b-2 border-r-2 border-accent/70 shadow-[0_0_22px_hsl(var(--accent)/0.55)] transition-all duration-500 group-hover:border-accent group-hover:shadow-[0_0_32px_hsl(var(--accent)/0.9)] sm:h-14 sm:w-14 sm:rounded-br-3xl" />
            <video
              ref={videoRef}
              src={heroVideo.url}
              autoPlay
              loop
              muted
              playsInline
              controls
              controlsList="nodownload"
              preload="metadata"
              className="relative z-[1] block h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="mx-auto mt-24 w-[min(1200px,calc(100%-2rem))] sm:mt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center"><Eyebrow>From the Desk of the CEO</Eyebrow></div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            A message from
            <span className="text-accent"> our founder.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
          {/* Image with premium glow */}
          <div className="group relative mx-auto w-full max-w-md lg:mx-0">
            {/* Ambient auto-glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.35),transparent_70%)] opacity-60 blur-2xl animate-pulse"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-[2px] rounded-[1.6rem] bg-[conic-gradient(from_0deg,transparent,hsl(var(--accent))/0.9,transparent_35%,transparent_65%,hsl(var(--accent))/0.9,transparent)] opacity-60 blur-[6px] transition-opacity duration-500 group-hover:opacity-100 animate-[spin_10s_linear_infinite]"
            />
            <button
              type="button"
              onClick={(e) => e.currentTarget.classList.toggle("is-lit")}
              className="[&.is-lit_.ceo-lite]:opacity-100 [&.is-lit_.ceo-lite]:scale-110 relative block w-full overflow-hidden rounded-[1.5rem] border border-accent/40 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.55),0_0_40px_-10px_hsl(var(--accent)/0.4)] transition-all duration-500 hover:border-accent hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6),0_0_60px_-10px_hsl(var(--accent)/0.7)]"
              aria-label="Toggle spotlight on CEO photo"
            >
              {/* Hover / click spotlight */}
              <span
                aria-hidden
                className="ceo-lite pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_40%,hsl(var(--accent)/0.35),transparent_60%)] opacity-0 transition-all duration-700 group-hover:opacity-100"
              />
              {/* Corner accents */}
              <span className="pointer-events-none absolute left-0 top-0 z-[3] h-10 w-10 rounded-tl-[1.5rem] border-l-2 border-t-2 border-accent/80 shadow-[0_0_22px_hsl(var(--accent)/0.6)]" />
              <span className="pointer-events-none absolute right-0 top-0 z-[3] h-10 w-10 rounded-tr-[1.5rem] border-r-2 border-t-2 border-accent/80 shadow-[0_0_22px_hsl(var(--accent)/0.6)]" />
              <span className="pointer-events-none absolute bottom-0 left-0 z-[3] h-10 w-10 rounded-bl-[1.5rem] border-b-2 border-l-2 border-accent/80 shadow-[0_0_22px_hsl(var(--accent)/0.6)]" />
              <span className="pointer-events-none absolute bottom-0 right-0 z-[3] h-10 w-10 rounded-br-[1.5rem] border-b-2 border-r-2 border-accent/80 shadow-[0_0_22px_hsl(var(--accent)/0.6)]" />
              <img
                src={ceoImage.url}
                alt="Adnan Javed Paracha — CEO, Nuventure Constructions"
                loading="lazy"
                decoding="async"
                className="relative z-[1] block h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ imageRendering: "auto" }}
              />
            </button>
            {/* Name plate */}
            <div className="relative z-[4] mx-auto mt-6 w-fit rounded-full border border-accent/40 bg-card/70 px-5 py-2 text-center shadow-[0_10px_30px_-15px_hsl(var(--accent)/0.5)] backdrop-blur">
              <p className="text-sm font-semibold tracking-wide text-accent sm:text-base">Adnan Javed Paracha</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Founder & CEO</p>
            </div>
          </div>

          {/* Message */}
          <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-secondary/40 p-7 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_25px_50px_-25px_rgba(0,0,0,0.35)] backdrop-blur-md sm:rounded-3xl sm:p-9 lg:p-10">
            <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <div className="text-6xl font-serif leading-none text-accent/60">“</div>
              <p className="mt-2 text-base leading-relaxed text-foreground/90 sm:text-lg">
                At Nuventure, we don't just construct buildings — we shape the spaces where families grow, businesses rise and legacies are built. For me, every project begins with a single question: <span className="italic text-foreground">would I be proud to hand these keys to my own family?</span> If the answer isn't an unhesitating yes, the work isn't finished.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                Over the years we have grown from a small, determined team into a trusted name across Pakistan — powered by architects, engineers and craftsmen who treat precision as a discipline and integrity as a standard. Timelines are honoured. Budgets are respected. Quality is never negotiated.
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                When you choose Nuventure, you are not hiring a contractor — you are partnering with a team that will stand beside your vision from the first sketch to the final handover. That is my personal promise to every client who walks through our door.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-accent/60" />
                <div>
                  <p className="text-sm font-semibold text-accent">Adnan Javed Paracha</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Founder & CEO · Nuventure Constructions</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>


      <div className="mt-20 sm:mt-28">
        <MovingGallery />
      </div>

      {/* Mission · Vision · Values */}
      <section className="mx-auto mt-24 w-[min(1200px,calc(100%-2rem))] sm:mt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center"><Eyebrow>Our Foundation</Eyebrow></div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The principles that
            <span className="text-accent"> build every project.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            More than concrete and steel — Nuventure is built on a clear promise to our clients across Lahore and Islamabad.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {[
            {
              Icon: Target,
              tag: "01 · Mission",
              title: "Deliver homes that outlast trends.",
              desc: "To engineer contemporary residences and commercial spaces that pair uncompromising build quality with a design language our clients are proud to call their own — on time, on budget, without shortcuts.",
              points: ["Premium-grade materials only", "Transparent milestone-based pricing", "Owner-supervised site quality"],
            },
            {
              Icon: Eye,
              tag: "02 · Vision",
              title: "Set a new standard for Pakistani construction.",
              desc: "To be the most trusted name in modern architecture across Lahore and Islamabad — where clients approve every façade, interior and finish in photo-real 3D long before ground is broken.",
              points: ["3D-first design workflow", "Two-city delivery network", "Turnkey, one-team accountability"],
            },
            {
              Icon: Gem,
              tag: "03 · Values",
              title: "The standards we build into every wall.",
              desc: "Integrity guides our costing. Craftsmanship defines our finish. Respect shapes every conversation with the family whose home we are entrusted with.",
              points: ["Integrity in every estimate", "Craftsmanship over speed", "Client-first communication"],
            },
          ].map(({ Icon, tag, title, desc, points }) => (
            <article
              key={tag}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-secondary/40 p-7 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_25px_50px_-25px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_35px_60px_-25px_rgba(0,0,0,0.45),0_0_40px_-15px_hsl(var(--accent)/0.6)] sm:rounded-3xl sm:p-9"
            >
              {/* Ambient corner glow */}
              <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

              <div className="relative flex items-center justify-between">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/30 transition-all duration-500 group-hover:bg-accent group-hover:ring-accent">
                  <Icon className="h-7 w-7 text-accent transition-colors duration-500 group-hover:text-accent-foreground" strokeWidth={1.75} />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {tag}
                </span>
              </div>

              <h3 className="relative mt-6 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                {title}
              </h3>
              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>

              <ul className="relative mt-6 space-y-2.5 border-t border-border/60 pt-5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-foreground/80">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/40">
                      <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Services */}

      <section className="mx-auto mt-28 w-[min(1200px,calc(100%-2rem))] p-6 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-10">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Everything from concept
              <br className="hidden sm:block" /> <span className="italic font-normal text-accent">to handover.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Six disciplines. One accountable studio. From the first sketch to the final key — every stage engineered with the precision of a boutique atelier.
            </p>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 border-b border-accent/50 pb-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent transition-colors hover:border-accent hover:text-accent/90"
          >
            All Services
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Editorial bento grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">
          {services.map(({ Icon, img, title, desc }, idx) => {
            // Bento layout classes per index
            const layout = [
              "lg:col-span-7 lg:row-span-2", // 01 featured tall
              "lg:col-span-5",                 // 02
              "lg:col-span-5",                 // 03
              "lg:col-span-4",                 // 04
              "lg:col-span-4",                 // 05
              "lg:col-span-4",                 // 06
            ][idx];
            const isFeatured = idx === 0;
            const num = String(idx + 1).padStart(2, "0");

            return (
              <article
                key={title}
                className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-background transition-all duration-700 hover:-translate-y-1 hover:border-accent/50 ${layout}`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${isFeatured ? "aspect-[4/5] lg:aspect-auto lg:flex-1" : "aspect-[16/10]"}`}>
                  <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  {/* Duotone wash */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />




                  {/* Icon chip */}
                  <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-background/90 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] ring-1 ring-accent/25 backdrop-blur-md">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.9} />
                  </div>

                  {/* Watermark */}
                  <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm ring-1 ring-white/15">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90">Nuventure</span>
                  </div>

                  {/* Featured overlay title */}
                  {isFeatured && (
                    <div className="absolute inset-x-0 bottom-0 p-7 text-primary-foreground">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="font-serif text-4xl italic text-accent">{num}</span>
                        <span className="h-px flex-1 bg-accent/40" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent/80">Featured</span>
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/85">{desc}</p>
                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                        <span className="border-b border-accent/60 pb-1 transition-colors group-hover:border-accent">Discover</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Body (non-featured) */}
                {!isFeatured && (
                  <div className="relative flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-2xl italic text-accent">{num}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/70">Service</span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    <div className="mt-auto flex items-center gap-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                      <span className="relative">
                        Learn more
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Why us */}
      <section className="shine-box mx-auto mt-28 w-[min(1200px,calc(100%-2rem))] p-6 sm:p-10">
        <Eyebrow>Why Nuventure</Eyebrow>
        <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Why clients in Lahore &amp; Islamabad choose us.
        </h2>
        <WhyChooseCarousel items={whyUs} />
      </section>

      {/* Gallery */}
      <section className="shine-box mx-auto mt-28 w-[min(1200px,calc(100%-2rem))] p-6 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <Eyebrow>Signature Work</Eyebrow>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Modern homes,<br className="hidden sm:block" /> 3D elevations &amp; more.
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent hover:text-accent/80"
          >
            Full Portfolio <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((img) => (
            <figure key={img.alt} className="group relative overflow-hidden bg-secondary">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm ring-1 ring-white/15">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90">Nuventure</span>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium leading-tight">{img.alt}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="shine-box mx-auto mt-28 w-[min(1200px,calc(100%-2rem))] p-6 sm:p-10">
        <div className="relative overflow-hidden bg-primary px-8 py-16 text-primary-foreground sm:px-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>Start Your Project</Eyebrow>
              <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Ready to build your dream home?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                Book a free consultation and visualise your project in photo-real 3D before we
                break ground. No obligations, no pressure — just clear answers.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-primary-foreground/15">
              <ul className="space-y-4 text-sm text-primary-foreground/80">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  Office 201, 2nd Floor, Salam Tower, Faisal Town Markaz, Islamabad
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  0328 4734463 · Mon – Sat, 10 AM to 7 PM
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  WhatsApp Now
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-primary-foreground/30 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-primary-foreground/10"
                >
                  Contact Adnan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
