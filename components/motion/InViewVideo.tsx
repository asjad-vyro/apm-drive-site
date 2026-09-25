"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "./gsap";

/**
 * Poster first; the muted loop loads and plays only while the card is on
 * screen (and never under reduced motion). Keeps the page light on phones.
 */
export function InViewVideo({ poster, src, alt, className = "" }: { poster: string; src?: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src || reducedMotion()) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setArmed(true); vid.current?.play().catch(() => {}); }
      else vid.current?.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img src={poster} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      {src && armed && (
        <video
          ref={vid} src={src} muted loop playsInline autoPlay preload="metadata" aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: playing ? 1 : 0 }}
        />
      )}
    </div>
  );
}
