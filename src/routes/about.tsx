import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Award, Building2, Eye, Gem, HardHat, MapPin, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { CountOnView } from "@/components/site/CountUpStat";

const ceoImage = "/ceo-adnan-paracha.webp";
const heroImg = "/nv-hero-2.webp";
const WHATSAPP = "https://wa.me/923284734463";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nuventure Constructions — Adnan Javed Paracha | Lahore & Islamabad" },
      {
        name: "description",
        content:
          "Nuventure Constructions — a modern design-build firm founded by Adnan Javed Paracha. Premium homes, 3D elevations and turnkey delivery across Lahore & Islamabad.",
      },
      { property: "og:title", content: "About Nuventure Constructions — Modern Design-Build Firm" },
      {
        property: "og:description",
        content:
          "Contemporary architecture, premium build quality and turnkey delivery — led personally by Adnan Javed Paracha.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { Icon: Target, title: "Precision by Design", desc: "Every layout, elevation and detail is engineered before we break ground — no surprises on site." },
  { Icon: ShieldCheck, title: "Uncompromised Quality", desc: "A++ materials, verified suppliers and third-party checks at every structural milestone." },
  { Icon: Eye, title: "Full Transparency", desc: "Clear timelines, itemised costs and weekly site updates — you always know where your money is going." },
  { Icon: Gem, title: "Craftsmanship First", desc: "We deliver homes we would live in ourselves — clean lines, honest materials, luxury finishes." },
];

const milestones = [
  { year: "2015", title: "Founded in Lahore", desc: "Adnan Javed Paracha establishes Nuventure with a single design-build studio." },
  { year: "2018", title: "3D Elevation Studio", desc: "In-house HD 3D visualization team launched — clients approve every façade before construction." },
  { year: "2021", title: "Islamabad Expansion", desc: "Second regional office opens; portfolio grows to include commercial plazas and luxury villas." },
  { year: "2024", title: "120+ Projects Delivered", desc: "Trusted across DHA, Bahria, Faisal Town, Gulberg and the twin cities." },
];

function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Modern villa by Nuventure Constructions" loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))] py-20 sm:py-28">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-accent">
            About Nuventure
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] sm:text-6xl">
            Building modern Pakistan,{" "}
            <span className="text-accent">one landmark home at a time.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Nuventure Constructions is a full-service design-build firm led by{" "}
            <strong className="text-foreground">Adnan Javed Paracha</strong>. From
            contemporary architecture and photo-real 3D elevations to grey structure and
            turnkey handover — we deliver homes across Lahore &amp; Islamabad that are
            built to last and designed to inspire.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/40 transition-transform hover:scale-[1.02]">
              View Our Work <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-6 py-3 text-sm font-bold text-accent hover:bg-accent/10">
              💬 Talk to Founder
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] grid-cols-2 gap-6 py-12 sm:grid-cols-4">
          {[
            { v: "120+", l: "Projects Delivered" },
            { v: "10+", l: "Years of Excellence" },
            { v: "2", l: "Major Cities" },
            { v: "100%", l: "Owner Supervised" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-4xl font-black text-accent sm:text-5xl">
                <CountOnView value={s.v} />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-center">
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-accent/40 to-transparent blur-2xl" />
            <img
              src={ceoImage}
              alt="Adnan Javed Paracha — Founder & CEO, Nuventure Constructions"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Founder &amp; CEO</span>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Adnan Javed Paracha</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              With over a decade in construction and design, Adnan Javed Paracha founded
              Nuventure with a single conviction — that Pakistani families deserve homes
              built with the same craftsmanship, transparency and modern sensibility you
              would expect from the world's finest firms.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every project is personally supervised. Every material is checked. Every
              client meeting begins with the same question: "What kind of legacy do you
              want to leave behind?" That answer becomes the blueprint.
            </p>
            <blockquote className="mt-6 border-l-4 border-accent bg-accent/5 p-5 italic text-foreground">
              "We don't just build houses — we build the memories your family will live
              inside for generations."
              <div className="mt-3 text-xs font-bold not-italic uppercase tracking-widest text-accent">— Adnan Javed Paracha</div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border/60 bg-secondary/30 py-16 sm:py-20">
        <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">What Guides Us</span>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Our Core Values</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="shine-box group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto w-[min(1000px,calc(100%-2rem))] py-16 sm:py-24">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Our Journey</span>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">From a studio to a landmark firm</h2>
        </div>
        <div className="relative mt-12 space-y-8 border-l-2 border-accent/40 pl-8">
          {milestones.map((m) => (
            <div key={m.year} className="relative">
              <span className="absolute -left-[42px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-background">
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              <div className="text-xs font-bold uppercase tracking-widest text-accent">{m.year}</div>
              <h3 className="mt-1 text-xl font-bold">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-gradient-to-br from-accent/10 via-background to-background py-16">
        <div className="mx-auto w-[min(900px,calc(100%-2rem))] text-center">
          <Sparkles className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">Ready to build your legacy?</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
            Book a free consultation with our design team — get your plot analysis, 3D
            concept and transparent pricing in one sitting.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/40 transition-transform hover:scale-[1.02]">
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-7 py-3 text-sm font-bold text-accent hover:bg-accent/10">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
