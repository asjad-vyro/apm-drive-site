"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { reducedMotion } from "./gsap";

/** Each `[data-stamp]` child slides in once as it enters the viewport. No pinning. */
export function Stamp({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-stamp]"));
    if (reducedMotion()) return;
    items.forEach((i) => i.classList.add("reveal"));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("reveal-visible"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -12% 0px" });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className} data-stamp-root="">{children}</div>;
}
