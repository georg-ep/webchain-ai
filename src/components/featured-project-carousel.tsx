"use client";

import { selectedWorks } from "@/data/projects";
import Link from "next/link";
import { useEffect, useState } from "react";

export function FeaturedProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const INTERVAL = 8000; // 8 seconds
  const PROGRESS_INTERVAL = 50; // Update progress every 50ms

  const changeProject = (newIndex: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setProgress(0);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + selectedWorks.length) % selectedWorks.length;
    changeProject(newIndex);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % selectedWorks.length;
    changeProject(newIndex);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  useEffect(() => {
    if (isPaused) return;

    // Reset progress when index changes
    setProgress(0);

    // Progress bar animation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const increment = (PROGRESS_INTERVAL / INTERVAL) * 100;
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, PROGRESS_INTERVAL);

    // Auto-advance to next project
    const slideTimer = setTimeout(() => {
      changeProject((currentIndex + 1) % selectedWorks.length);
    }, INTERVAL);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [currentIndex, isPaused]);

  const currentProject = selectedWorks[currentIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left: Image */}
      <div className="lg:col-span-6">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a] rounded-lg border">
          <img
            className={`w-full h-full object-cover transition-all duration-700 ease-out opacity-70 hover:opacity-100 ${
              isAnimating ? "opacity-0 scale-105" : "opacity-70"
            }`}
            alt={currentProject.title}
            src={currentProject.image}
          />
        </div>
      </div>

      {/* Right: Content + Controls */}
      <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
        {/* Content */}
        <div className="space-y-6">
          {/* Progress Bar with Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevious}
              className="group flex items-center justify-center w-8 h-8 border border-white/5 hover:border-white/20 transition-all duration-300"
              aria-label="Previous project"
            >
              <svg
                className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </button>

            <div className="flex-1 h-0.5 bg-white/10 relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-white/40 transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={goToNext}
              className="group flex items-center justify-center w-8 h-8 border border-white/5 hover:border-white/20 transition-all duration-300"
              aria-label="Next project"
            >
              <svg
                className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>

          <div
            className={`space-y-5 transition-all duration-600 ease-out ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
              {currentProject.category}
            </span>
            <h3 className="text-4xl lg:text-5xl font-serif font-light dark:text-white leading-tight">
              {currentProject.title}
            </h3>
            <p className="text-slate-500 text-base font-light leading-relaxed max-w-xl">
              {currentProject.description}
            </p>

            {/* Tags and Achievements */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              {/* Tags */}
              <div className="flex items-center gap-2">
                {currentProject.tags.map((tag, index) => (
                  <div key={tag} className="flex items-center gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                      {tag}
                    </span>
                    {index < currentProject.tags.length - 1 && (
                      <span className="text-slate-700">/</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-3 w-px bg-white/10" />

              {/* Achievements */}
              <div className="flex flex-wrap items-center gap-4">
                {currentProject.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400"
                  >
                    <svg
                      className="w-2.5 h-2.5 opacity-40"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 2V10M2 6H10"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="square"
                      />
                    </svg>
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {currentProject.url !== "#" && (
              <Link
                href={currentProject.url}
                target="_blank"
                className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-colors pt-2 group/link"
              >
                View Site
                <span className="group-hover/link:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
