import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  rating?: number;
};

type TestimonialCarouselProps = {
  items: TestimonialItem[];
  className?: string;
  variant?: "default" | "home";
};

<<<<<<< HEAD
export function TestimonialCarousel({
  items,
  className = "",
  variant = "default",
}: TestimonialCarouselProps) {
=======
export function TestimonialCarousel({ items, className = "", variant = "default" }: TestimonialCarouselProps) {
>>>>>>> 67b47d309ee2b8e73c66f4a43c24c23adbd60c4a
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const container = containerRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>("[data-testimonial-card]");
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 24;

    container.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const scrollToStart = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length < 2) return;

    const intervalId = window.setInterval(() => {
      if (isPaused) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 8) {
        scrollToStart();
      } else {
        scrollByCard(1);
      }
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, items.length]);

  const handleManualScroll = (direction: 1 | -1) => {
    setIsPaused(true);
    scrollByCard(direction);
    window.setTimeout(() => setIsPaused(false), 6000);
  };

  const isHome = variant === "home";

  return (
<<<<<<< HEAD
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
=======
    <div className={`relative ${className}`} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
>>>>>>> 67b47d309ee2b8e73c66f4a43c24c23adbd60c4a
      {/* Navigation Buttons */}
      <div className="mb-6 flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() => handleManualScroll(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => handleManualScroll(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Carousel Track */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const rating = item.rating ?? 5;
          return (
            <article
              key={`${item.name}-${index}`}
              data-testimonial-card
              className={`group relative flex min-w-full flex-col rounded-2xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] ${
                isHome
                  ? "border-accent/20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:border-accent/60 hover:shadow-accent/20"
                  : "border-border bg-card text-foreground hover:border-accent/50 hover:shadow-accent/10"
              }`}
            >
              {/* Top: Quote Icon & Stars */}
              <div className="mb-4 flex items-center justify-between">
<<<<<<< HEAD
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${isHome ? "bg-accent/20 text-accent" : "bg-accent/10 text-accent"}`}
                >
=======
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isHome ? "bg-accent/20 text-accent" : "bg-accent/10 text-accent"}`}>
>>>>>>> 67b47d309ee2b8e73c66f4a43c24c23adbd60c4a
                  <Quote className="h-5 w-5" fill="currentColor" />
                </div>
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4" fill="currentColor" />
                  ))}
                </div>
              </div>

              {/* Quote Text */}
<<<<<<< HEAD
              <p
                className={`flex-1 text-sm leading-relaxed ${isHome ? "text-primary-foreground/90" : "text-foreground/90"}`}
              >
=======
              <p className={`flex-1 text-sm leading-relaxed ${isHome ? "text-primary-foreground/90" : "text-foreground/90"}`}>
>>>>>>> 67b47d309ee2b8e73c66f4a43c24c23adbd60c4a
                "{item.quote}"
              </p>

              {/* Author / Footer */}
<<<<<<< HEAD
              <div
                className={`mt-6 border-t pt-4 ${isHome ? "border-primary-foreground/10" : "border-border/60"}`}
              >
                <div
                  className={`text-base font-bold ${isHome ? "text-accent" : "text-foreground"}`}
                >
                  {item.name}
                </div>
                <div
                  className={`mt-1 text-sm ${isHome ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                >
                  {item.role}
                </div>
=======
              <div className={`mt-6 border-t pt-4 ${isHome ? "border-primary-foreground/10" : "border-border/60"}`}>
                <div className={`text-base font-bold ${isHome ? "text-accent" : "text-foreground"}`}>{item.name}</div>
                <div className={`mt-1 text-sm ${isHome ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{item.role}</div>
>>>>>>> 67b47d309ee2b8e73c66f4a43c24c23adbd60c4a
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
