import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { OfferPopup } from "@/components/site/OfferPopup";
import { CostCalculator } from "@/components/site/CostCalculator";
import { SplashIntro } from "@/components/site/SplashIntro";
import { LiveVisitors } from "@/components/site/LiveVisitors";
import { BrandUpPopup } from "@/components/site/BrandUpPopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nuventure Constructions — Modern Homes & 3D Elevations all over Pakistan" },
      {
        name: "description",
        content:
          "Nuventure Constructions — founded by Adnan Javed Paracha. Contemporary design, premium build quality, HD 3D elevations and turnkey delivery all over Pakistan.",
      },
      { name: "author", content: "Nuventure Constructions" },
      {
        property: "og:title",
        content: "Nuventure Constructions — Contemporary Design, Premium Build Quality",
      },
      {
        property: "og:description",
        content:
          "Modern homes, luxury villas & commercial plazas all over Pakistan. Book your free 3D design session with Adnan Javed Paracha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap",
      },
      { rel: "icon", href: "/nuventure-logo-visible.webp", type: "image/webp" },
      { rel: "apple-touch-icon", href: "/nuventure-logo.jpg" },
      { rel: "preload", as: "image", href: "/nv-hero-1.webp", fetchPriority: "high" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
     <meta name="google-site-verification" content="ynOMY18GZx4x1js1MrhexiMIVuN3NUcduzOhhc2sXUI" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    let raf = 0;
    let current: Element | null = null;

    const lightUp = (el: Element | null) => {
      if (el === current) return;
      current?.classList.remove("is-lit");
      el?.classList.add("is-lit");
      current = el;
    };

    const update = () => {
      const center = window.innerHeight / 2;
      let closest: Element | null = null;
      let bestDist = Infinity;
      document.querySelectorAll<HTMLElement>(".shine-box").forEach((el) => {
        if (el.classList.contains("count-shine-box")) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const mid = r.top + r.height / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist && dist < window.innerHeight * 0.55) {
          bestDist = dist;
          closest = el;
        }
      });
      lightUp(closest);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(".shine-box");
      if (target) lightUp(target);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  const pathname = useRouter().state.location.pathname;
  const isGate = pathname === "/unlock";

  const [splashDone, setSplashDone] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <SplashIntro onDone={() => setSplashDone(true)} />
      <div
        className={`flex min-h-screen flex-col transition-opacity duration-500 ${
          splashDone ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!splashDone}
      >
        {!isGate && <Navbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isGate && <Footer />}
        {!isGate && splashDone && <BrandUpPopup />}
        {!isGate && splashDone && <WhatsAppFloat />}
        {!isGate && splashDone && <OfferPopup />}
        {!isGate && splashDone && <CostCalculator />}
        {!isGate && splashDone && <LiveVisitors />}
      </div>
    </QueryClientProvider>
  );
}
