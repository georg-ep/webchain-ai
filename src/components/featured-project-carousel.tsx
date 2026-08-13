"use client";

import { selectedWorks } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const INTERVAL = 8000;
const PROGRESS_STEP = 50;

export function FeaturedProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + selectedWorks.length) % selectedWorks.length);
    setProgress(0);
  }, []);

  const goToPrevious = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goToNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // Only run the timer while the carousel is actually on screen.
  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isInView) return;

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + (PROGRESS_STEP / INTERVAL) * 100));
    }, PROGRESS_STEP);

    const slideTimer = setTimeout(() => goTo(currentIndex + 1), INTERVAL);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [currentIndex, isPaused, isInView, goTo]);

  const currentProject = selectedWorks[currentIndex];

  return (
    <div
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goToPrevious();
        if (e.key === "ArrowRight") goToNext();
      }}
      tabIndex={0}
      aria-roledescription="carousel"
      className="outline-none"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Visual */}
        <div className="lg:col-span-7">
          <div className="panel group relative aspect-[4/3] overflow-hidden rounded-2xl p-2">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-0">
              {selectedWorks.map((project, index) => (
                <img
                  key={project.id}
                  src={project.image}
                  alt={`${project.title} — ${project.description}`}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover object-top transition-all duration-1000 [transition-timing-function:var(--ease-out-expo)]",
                    index === currentIndex
                      ? "scale-100 opacity-90 group-hover:scale-[1.03] group-hover:opacity-100"
                      : "scale-105 opacity-0",
                  )}
                />
              ))}

              {/* Legibility scrim + frame */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-0 via-surface-0/10 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />

              {/* Corner index */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line bg-surface-0/70 px-3 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-breathe" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-2 tabular-nums">
                  {String(currentIndex + 1).padStart(2, "0")} / {String(selectedWorks.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className="flex flex-col lg:col-span-5">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevious}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-3 transition-all duration-300 hover:border-line-strong hover:text-ink"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={goToNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-3 transition-all duration-300 hover:border-line-strong hover:text-ink"
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <div className="relative h-px flex-1 overflow-hidden bg-white/10">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-signal/60 to-signal transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div key={currentProject.id} className="reveal mt-8" data-visible="true">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-4">
              {currentProject.category}
            </span>

            <h3 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink lg:text-5xl">
              {currentProject.title}
            </h3>

            <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed text-ink-2">
              {currentProject.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-3"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ul className="mt-7 space-y-3 border-t border-line pt-6">
              {currentProject.achievements.map((achievement) => (
                <li key={achievement} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-signal-soft">
                    <Check className="h-2.5 w-2.5 text-signal" strokeWidth={2.5} />
                  </span>
                  <span className="text-[13px] font-light leading-relaxed text-ink-2">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>

            {currentProject.url !== "#" && (
              <Link
                href={currentProject.url}
                target="_blank"
                className="group/link mt-8 inline-flex items-center gap-2 border-b border-line pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-2 transition-colors hover:border-white/40 hover:text-ink"
              >
                View Site
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Index rail */}
      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-white/[0.06] sm:grid-cols-3 lg:grid-cols-6">
        {selectedWorks.map((project, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={project.id}
              onClick={() => goTo(index)}
              aria-current={isActive}
              className={cn(
                "group relative flex flex-col items-start gap-1.5 px-4 py-4 text-left transition-colors duration-500",
                isActive ? "bg-surface-2" : "bg-surface-0 hover:bg-surface-1",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[9px] tracking-[0.2em] tabular-nums transition-colors",
                  isActive ? "text-signal" : "text-ink-4",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-[13px] font-light transition-colors",
                  isActive ? "text-ink" : "text-ink-3 group-hover:text-ink-2",
                )}
              >
                {project.title}
              </span>
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px origin-left bg-signal transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
