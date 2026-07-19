import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
const projectVideoAsset = { url: "/nv-project-video.mp4" };
const projectVideo2Asset = { url: "/nv-project-video-2.mp4" };
import { OngoingProjects } from "@/components/site/OngoingProjects";

const logo = "/nuventure-logo-visible.webp";

const gallery = [
  { src: "/nv-1.webp", alt: "Modern 3D front elevation render · Lahore" },
  { src: "/nv-9.webp", alt: "Double-story bungalow 3D visualization · Islamabad" },
  { src: "/nv-2.webp", alt: "Contemporary luxury villa exterior · Faisal Town" },
  { src: "/nv-3.webp", alt: "Luxury villa at night with landscape lighting · DHA" },
  { src: "/nv-4.webp", alt: "Modern commercial plaza · Ferozepur Road, Lahore" },
  { src: "/nv-7.webp", alt: "Aerial view of modern housing development" },
  { src: "/nv-5.webp", alt: "Luxury marble living room interior" },
  { src: "/nv-8.webp", alt: "Designer kitchen with marble & wood finishes" },
  { src: "/nv-6.webp", alt: "Active construction site — grey structure" },
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Signature Projects & 3D Elevations — Nuventure Constructions" },
      {
        name: "description",
        content:
          "Explore Nuventure's signature projects — luxury homes, commercial plazas and HD 3D elevations all over Pakistan.",
      },
      { property: "og:title", content: "Our Signature Work — Nuventure Constructions" },
      { property: "og:description", content: "Modern homes & photo-realistic 3D elevations all over Pakistan." },
    ],
  }),
  component: ProjectsPage,
});

const highlights = [
  { badge: "🎨 3D Elevation", title: "Modern Villa Render", desc: "Photo-real HD 3D front elevation · Lahore" },
  { badge: "🏗️ Live Build", title: "Faisal Town Residence", desc: "Grey structure in progress · Islamabad" },
  { badge: "✨ Turnkey", title: "DHA Family Home", desc: "Design to handover · Lahore" },
  { badge: "🏢 Commercial", title: "Ferozepur Road Plaza", desc: "Glass-front commercial plaza · Lahore" },
  { badge: "🔑 Handover", title: "Faisal Town Villa", desc: "Complete key-in-hand delivery · Islamabad" },
  { badge: "🚧 Renovation", title: "Pak-Arab Housing Upgrade", desc: "Full modern transformation · Lahore" },
];

function ShowcaseVideo({ src }: { src: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only one video plays audio at a time — mute others when this one unmutes/plays with sound
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => {
      document.querySelectorAll<HTMLVideoElement>("video[data-nv-showcase]").forEach((other) => {
        if (other !== v && !other.paused) {
          other.pause();
        }
        if (other !== v) other.muted = true;
      });
    };
    const onVolume = () => {
      if (!v.muted) {
        document.querySelectorAll<HTMLVideoElement>("video[data-nv-showcase]").forEach((other) => {
          if (other !== v) other.muted = true;
        });
      }
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("volumechange", onVolume);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("volumechange", onVolume);
    };
  }, []);

  // Mute when scrolled out of view; restore prior mute state when back in view
  useEffect(() => {
    const wrap = wrapRef.current;
    const v = videoRef.current;
    if (!wrap || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          v.muted = true;
        }
      },
      { threshold: 0.35 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-accent/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
      <div className="group relative overflow-hidden rounded-3xl border border-accent/30 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.55),0_0_40px_-10px_hsl(var(--accent)/0.35)]">
        <video
          ref={videoRef}
          data-nv-showcase
          src={src}
          autoPlay
          loop
          muted
          playsInline
          controls
          preload="metadata"
          className="block h-auto w-full"
        />
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-md bg-background/85 px-2 py-1 shadow-md backdrop-blur-sm">
          <img src={logo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-6 w-6 object-contain" />
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Nuventure</span>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
      </div>
    </div>
  );
}

function ProjectsPage() {
  const previewProjects = gallery.slice(0, 3);
  const restProjects = gallery.slice(3);

  return (
    <div className="mx-auto w-[min(1200px,calc(100%-2rem))] pt-16">
      <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
        Signature Work
      </span>
      <h1 className="mt-5 text-3xl font-black sm:text-5xl lg:text-6xl">
        Modern Homes &amp; <span className="font-black text-accent">3D Elevations</span> 🖼️
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        Explore Nuventure's premium projects all over Pakistan. Every design begins with 3D
        visualization and turns into a real masterpiece.
      </p>

      <div className="mt-12">
        <ShowcaseVideo src={projectVideo2Asset.url} />
      </div>

      <OngoingProjects />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {previewProjects.map((img) => (
          <div key={img.alt} className="shine-box group relative overflow-hidden rounded-2xl border border-accent/25">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
                decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1.5 rounded-md bg-background/85 px-2 py-1 shadow-md backdrop-blur-sm">
              <img src={logo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-6 w-6 object-contain" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Nuventure</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4 pt-10 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-xs font-semibold">{img.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <ShowcaseVideo src={projectVideoAsset.url} />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {restProjects.map((img) => (
          <div key={img.alt} className="shine-box group relative overflow-hidden rounded-2xl border border-accent/25">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
                decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1.5 rounded-md bg-background/85 px-2 py-1 shadow-md backdrop-blur-sm">
              <img src={logo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-6 w-6 object-contain" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Nuventure</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4 pt-10 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-xs font-semibold">{img.alt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <p className="text-xl font-black text-accent">Highlights</p>
        <h2 className="mt-1 text-3xl font-black sm:text-4xl">Portfolio Showcase</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="shine-box rounded-2xl border border-accent/25 bg-card/50 p-6 transition-colors hover:border-accent/60">
              <span className="text-xs font-bold text-accent">{h.badge}</span>
              <h3 className="mt-2 font-extrabold">{h.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
