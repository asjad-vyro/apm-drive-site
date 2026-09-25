"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { g, reducedMotion } from "./gsap";

/** Weighted scroll on pointer devices only; touch keeps native momentum. */
export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const { gsap, ScrollTrigger } = g();
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // Anchor links must go through Lenis or the smooth scroll fights the jump.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -88, duration: 1.1 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
