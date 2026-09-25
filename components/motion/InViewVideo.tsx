"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "./gsap";

/**
 * Poster first. On pointer devices the clip plays only while hovered; on
 * touch it plays while mostly on screen. Only one clip decodes at a time in
 * practice, which keeps scrolling smooth.
 */
export function InViewVideo({ poster, src, alt, className = "" }: { poster: string; src?: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src || reducedMotion()) return;
    const el = ref.current; if (!el) return;
    const card = el.closest("a") ?? el;
    if (window.matchMedia("(pointer: fine)").matches) {
      const on = () => { setArmed(true); requestAnimationFrame(() => vid.current?.play().catch(() => {})); };
      const off = () => { vid.current?.pause(); setPlaying(false); };
      card.addEventListener("mouseenter", on); card.addEventListener("mouseleave", off);
      return () => { card.removeEventListener("mouseenter", on); card.removeEventListener("mouseleave", off); };
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setArmed(true); vid.current?.play().catch(() => {}); }
      else { vid.current?.pause(); setPlaying(false); }
    }, { threshold: 0.75 });
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img src={poster} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
      {src && armed && (
        <video
          ref={vid} src={src} muted loop playsInline autoPlay preload="metadata" aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: playing ? 1 : 0 }}
        />
      )}
    </div>
  );
}
