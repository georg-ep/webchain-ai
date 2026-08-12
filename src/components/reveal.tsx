"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger in milliseconds. */
  delay?: number;
  /** Render as a different element when the parent is a grid/list. */
  as?: "div" | "li" | "section" | "span";
};

/**
 * Fades and lifts its children into place the first time they enter the
 * viewport. Falls back to visible content when IntersectionObserver is
 * unavailable, and is disabled entirely under prefers-reduced-motion (CSS).
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Show everything immediately rather than leaving content hidden.
      queueMicrotask(() => setVisible(true));
      return;
    }

    // threshold 0 rather than a ratio: short elements (a one-line eyebrow,
    // for instance) can measure zero height at observe time, report a ratio
    // of 0, and then never fire again because nothing about them changes.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);

    // Anything already on screen at mount should just be shown, in case the
    // observer's first callback lands before layout settles.
    const raf = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setVisible(true);
        observer.disconnect();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", className)}
      data-visible={visible}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
