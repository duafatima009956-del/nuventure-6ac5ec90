import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "923284734463";
const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE_DISPLAY = "+92 328 4734463";
const EMAIL = "info@nuventureconstructions.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nuventure Constructions — Free Quote all over Pakistan" },
      {
        name: "description",
        content:
          "Get a free consultation and cost estimate from Nuventure Constructions. WhatsApp +92 328 4734463 or visit our All Over Pakistan offices.",
      },
      { property: "og:title", content: "Contact Nuventure Constructions" },
      {
        property: "og:description",
        content:
          "Free consultation · Instant estimate · HD 3D previews. Reach us all over Pakistan.",
      },
    ],
  }),
  component: ContactPage,
});

const offices = [
  {
    city: "Lahore Head Office",
    address: "DHA Phase 5, Lahore, Punjab, Pakistan",
    hours: "Mon – Sat · 10:00 AM – 8:00 PM",
  },
  {
    city: "Islamabad Regional Office",
    address: "Bahria Town, Islamabad, Pakistan",
    hours: "Mon – Sat · 10:00 AM – 8:00 PM",
  },
];

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "Lahore",
    service: "Grey Structure A++",
    message: "",
  });

  const openWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Nuventure Team,\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nInterested in: ${form.service}\n\n${form.message}`,
    );
    window.open(`${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
        <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))] text-center">
          <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Get in Touch
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-[1.05] sm:text-6xl">
            Let's build <span className="text-accent">something remarkable.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
<<<<<<< HEAD
            Free consultation · Instant cost estimate · HD 3D preview before construction. Reach us
            any way you prefer — our CEO personally reads every enquiry.
=======
            Free consultation · Instant cost estimate · HD 3D preview before construction.
            Reach us any way you prefer — our CEO personally reads every enquiry.
>>>>>>> 67b47d309ee2b8e73c66f4a43c24c23adbd60c4a
          </p>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="shine-box group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                WhatsApp
              </div>
              <div className="mt-1 text-lg font-bold text-foreground">{PHONE_DISPLAY}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Fastest reply · usually within 5 minutes
              </div>
            </div>
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="shine-box group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Call Us
              </div>
              <div className="mt-1 text-lg font-bold text-foreground">{PHONE_DISPLAY}</div>
              <div className="mt-1 text-xs text-muted-foreground">Mon – Sat · 10 AM – 8 PM</div>
            </div>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="shine-box group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Email
              </div>
              <div className="mt-1 break-all text-sm font-bold text-foreground">{EMAIL}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                For proposals &amp; documents
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Form + offices */}
      <section className="mx-auto w-[min(1200px,calc(100%-2rem))] pb-16 sm:pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <form
            onSubmit={openWhatsApp}
            className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8"
          >
            <h2 className="text-2xl font-black">Request a Free Quote</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill this and hit send — your request opens directly in WhatsApp for the fastest
              reply.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Full Name
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Phone
                </span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
                  placeholder="03XX XXXXXXX"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  City
                </span>
                <select
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
                >
                  <option>Lahore</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Interested In
                </span>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
                >
                  <option>Grey Structure A++</option>
                  <option>Grey + Finishing A++</option>
                  <option>3D Front Elevation</option>
                  <option>Architecture &amp; Design</option>
                  <option>Renovation</option>
                  <option>Commercial Plaza</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Project Details
              </span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none"
                placeholder="Plot size, location, timeline, budget range…"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/40 transition-transform hover:scale-[1.01]"
            >
              <Send className="h-4 w-4" /> Send via WhatsApp
            </button>
          </form>

          {/* Offices */}
          <div className="space-y-4">
            {offices.map((o) => (
              <div key={o.city} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{o.city}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{o.address}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{o.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Nuventure Constructions Location"
                src="https://www.google.com/maps?q=DHA+Phase+5+Lahore&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
