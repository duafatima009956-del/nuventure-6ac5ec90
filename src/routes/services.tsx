import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  Hammer,
  HardHat,
  KeyRound,
  Layers,
  PaintBucket,
  Ruler,
  Sparkles,
} from "lucide-react";

const WHATSAPP = "https://wa.me/923284734463";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Construction Services — Nuventure Constructions | All Over Pakistan" },
      {
        name: "description",
        content:
          "Architecture, 3D elevations, grey structure, turnkey delivery, renovation and interior design all over Pakistan — by Nuventure Constructions.",
      },
      { property: "og:title", content: "Our Construction Services — Nuventure" },
      {
        property: "og:description",
        content:
          "Design-build, grey structure, turnkey and HD 3D elevations — one accountable team from concept to handover.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    Icon: Ruler,
    img: "/nv-svc-1.webp",
    title: "Architecture & Design",
    desc: "Creative floor plans, working drawings and structural design approved by qualified engineers.",
    points: [
      "Concept & schematic design",
      "Approved municipal drawings",
      "Structural & MEP layouts",
    ],
  },
  {
    Icon: Layers,
    img: "/nv-svc-3.webp",
    title: "HD 3D Front Elevations",
    desc: "Photo-realistic 3D renders — approve every façade, material and light before construction begins.",
    points: ["Exterior & interior 3D", "Material palette preview", "Walkthrough animations"],
  },
  {
    Icon: HardHat,
    img: "/nv-svc-2.webp",
    title: "Grey Structure Construction",
    desc: "Foundation to roof with A++ verified materials — the strong skeleton of every landmark home.",
    points: ["Certified steel & cement", "Waterproofing & DPC", "Third-party quality checks"],
  },
  {
    Icon: PaintBucket,
    img: "/nv-svc-5.webp",
    title: "Finishing & Interiors",
    desc: "Marble, wood, paint, lighting, kitchen and wardrobes — every finish executed to spec.",
    points: ["Imported marble & tiles", "Modular kitchens & wardrobes", "Designer lighting"],
  },
  {
    Icon: KeyRound,
    img: "/nv-svc-6.webp",
    title: "Turnkey Delivery",
    desc: "One contract, one accountable team. You share the vision — we hand you the keys.",
    points: ["Fixed timeline & budget", "End-to-end supervision", "Handover with warranty"],
  },
  {
    Icon: Hammer,
    img: "/nv-svc-4.webp",
    title: "Renovation & Upgrades",
    desc: "Modern transformation for existing homes — structural upgrades, façade lifts and interior redesign.",
    points: ["Structural retrofitting", "Façade modernization", "Interior renovation"],
  },
  {
    Icon: Building2,
    img: "/nv-svc-2.webp",
    title: "Commercial & Plazas",
    desc: "Glass-front commercial plazas, offices and mixed-use developments — built to attract tenants.",
    points: ["Retail & office plazas", "Structural steel work", "Facade & glazing"],
  },
  {
    Icon: Sparkles,
    img: "/nv-svc-1.webp",
    title: "Project Supervision",
    desc: "Managing a build with another contractor? We supervise, audit and safeguard your investment.",
    points: ["Weekly progress reports", "Material & billing audit", "Quality checkpoints"],
  },
];

const packages = [
  {
    name: "Grey Structure A++",
    price: "Rs. 2,600",
    unit: "/ sq.ft",
    color: "from-slate-500/20 to-slate-700/20",
    features: [
      "A++ verified cement, steel & brick",
      "Foundation, columns, slab & roof",
      "Plumbing rough-in & conduits",
      "Waterproofing & DPC",
      "Boundary wall & staircase",
      "Third-party structural checks",
    ],
  },
  {
    name: "Grey + Finishing A++",
    price: "On Request",
    unit: "",
    highlight: true,
    color: "from-accent/30 to-accent/10",
    features: [
      "Everything in Grey Structure",
      "Imported marble & tiles",
      "Modular kitchen & wardrobes",
      "Designer paint, wood & lighting",
      "Electrical, plumbing & sanitary",
      "Silver / Gold / Platinum material tiers",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    desc: "Free site visit, plot analysis and requirement gathering.",
  },
  {
    step: "02",
    title: "Design & 3D",
    desc: "Floor plans and HD 3D elevations approved before construction.",
  },
  {
    step: "03",
    title: "Contract",
    desc: "Transparent BOQ, fixed timeline and milestone payments.",
  },
  {
    step: "04",
    title: "Construction",
    desc: "Owner-supervised build with weekly updates and quality checks.",
  },
  {
    step: "05",
    title: "Handover",
    desc: "Snag-free delivery with post-handover support & warranty.",
  },
];

function ServicesPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
        <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))] text-center">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Our Services
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-[1.05] sm:text-6xl">
            One team. <span className="text-accent">Every stage of your build.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From the first sketch to the final key — Nuventure Constructions handles architecture,
            3D visualization, grey structure, finishing, interiors and handover under one
            accountable roof.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] py-16 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, img, title, desc, points }) => (
            <article
              key={title}
              className="shine-box group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/50 bg-background/80 text-accent backdrop-blur">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="border-y border-border/60 bg-secondary/30 py-16 sm:py-20">
        <div className="mx-auto w-[min(1100px,calc(100%-2rem))]">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
              Construction Packages
            </span>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Choose the right build for you</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Both packages use A++ verified materials — the difference is how far we take it.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`relative overflow-hidden rounded-2xl border p-8 shadow-lg ${
                  p.highlight
                    ? "border-accent bg-gradient-to-br shadow-accent/20"
                    : "border-border bg-card"
                } bg-gradient-to-br ${p.color}`}
              >
                {p.highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-black">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-accent">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.unit}</span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/40 transition-transform hover:scale-[1.02]"
                >
                  Get Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] py-16 sm:py-24">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
            How We Work
          </span>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">A proven 5-step process</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((p) => (
            <div key={p.step} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="text-3xl font-black text-accent/40">{p.step}</div>
              <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-gradient-to-br from-accent/10 via-background to-background py-16">
        <div className="mx-auto w-[min(900px,calc(100%-2rem))] text-center">
          <h2 className="text-3xl font-black sm:text-4xl">Let's design your dream project</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Free consultation · Instant cost estimate · HD 3D preview before we break ground.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/40 transition-transform hover:scale-[1.02]"
            >
              Get Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-7 py-3 text-sm font-bold text-accent hover:bg-accent/10"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
