"use client";
import { useEffect, useRef } from "react";
import { g, reducedMotion } from "./gsap";

/** Counts from 0 to `value` when scrolled into view. */
export function Counter({ value, decimals = 0, className = "", duration = 1.6 }: {
  value: number; decimals?: number; className?: string; duration?: number;
}) {
  const format = (v: number) => (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US"));
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reducedMotion()) { el.textContent = format(value); return; }
    const { gsap } = g();
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: value, duration, ease: "power3.out", paused: true,
      onUpdate: () => { el.textContent = format(obj.v); },
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, duration]);
  return <span ref={ref} className={`t-num ${className}`}>{format(0)}</span>;
}
