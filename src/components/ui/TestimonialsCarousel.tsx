"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { TestimonialItem } from "@/lib/content";

type TestimonialsCarouselProps = {
  testimonials: TestimonialItem[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = useMemo(() => {
    return 340;
  }, []);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    container.scrollTo({ left: clamped * cardWidth, behavior: "smooth" });
    setActiveIndex(clamped);
  };

  const onScroll = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const next = Math.round(container.scrollLeft / cardWidth);
    if (next !== activeIndex) {
      setActiveIndex(next);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Testimonials</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">What Referees Say</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/25 bg-slate-900/70 text-zinc-100 transition hover:border-sky-300/60 hover:bg-sky-300/10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/25 bg-slate-900/70 text-zinc-100 transition hover:border-sky-300/60 hover:bg-sky-300/10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
      >
        {testimonials.map((item, index) => {
          const initials = item.referee
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("");

          return (
            <article
              key={`${item.referee}-${index}`}
              className="surface-card min-h-[340px] w-[340px] shrink-0 snap-start rounded-2xl p-6"
            >
              <div className="mb-4 flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={`${item.referee}-star-${starIndex}`}
                    className={`h-4 w-4 ${starIndex < item.rating ? "fill-amber-300" : "fill-transparent"}`}
                  />
                ))}
              </div>

              <p className="text-zinc-200">&quot;{item.quote}&quot;</p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-300/40 bg-sky-300/15 text-sm font-semibold text-sky-100">
                  {initials || "R"}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.referee}</p>
                  <p className="text-sm text-zinc-300">{item.role}</p>
                  <p className="text-sm text-zinc-400">{item.organization}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === activeIndex ? "bg-sky-200" : "bg-zinc-500"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
