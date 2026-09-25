"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { g, reducedMotion } from "./gsap";

/**
 * Pins its section and stamps each `[data-stamp]` child in, one after another,
 * scrubbed by scroll. Used for the for-you / not-for-you block.
 */
export function Stamp({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-stamp]"));
    if (reducedMotion() || items.length === 0) { items.forEach((i) => { i.style.opacity = "1"; i.style.transform = "none"; }); return; }
    const { gsap, ScrollTrigger } = g();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      gsap.set(items, { opacity: 0, y: 28, scale: 1.06, filter: "blur(6px)" });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top+=88", end: `+=${items.length * 260}`, pin: true, scrub: 0.6, anticipatePin: 1 },
      });
      items.forEach((it, i) => tl.to(it, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }, i * 0.9));
      return () => tl.scrollTrigger?.kill();
    });
    mm.add("(max-width: 768px)", () => {
      gsap.set(items, { opacity: 0, y: 18 });
      const ts = items.map((it) => gsap.to(it, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: it, start: "top 92%", once: true } }));
      return () => ts.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
