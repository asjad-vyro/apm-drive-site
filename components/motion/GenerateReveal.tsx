"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "./gsap";

/**
 * An image that resolves from coarse blocks to full detail, the way a
 * generation resolves. Computed from the final image on a canvas; nothing is
 * faked. `trigger` = "now" starts immediately, "view" when scrolled into view.
 */
export function GenerateReveal({
  src, alt, className = "", duration = 1500, trigger = "view", start = true, priority = false, onDone, video, focusX = 0.5,
}: {
  src: string; alt: string; className?: string; duration?: number; trigger?: "now" | "view"; start?: boolean; priority?: boolean; onDone?: () => void; video?: string; focusX?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);   // image decoded
  const [done, setDone] = useState(false);     // animation finished → show <img>
  const [armed, setArmed] = useState(trigger === "now");
  const [vidOn, setVidOn] = useState(false);

  useEffect(() => {
    if (trigger !== "view") return;
    const el = wrapRef.current; if (!el) return;
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setArmed(true); io.disconnect(); } }, { rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  useEffect(() => {
    if (!armed || !start) return;
    if (reducedMotion()) { setDone(true); onDone?.(); return; }
    const canvas = canvasRef.current, wrap = wrapRef.current; if (!canvas || !wrap) return;
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    let raf = 0; let cancelled = false;
    img.onload = () => {
      if (cancelled) return;
      setReady(true);
      const ctx = canvas.getContext("2d", { alpha: false })!;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = wrap.clientWidth, H = wrap.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      const off = document.createElement("canvas");
      const octx = off.getContext("2d")!;
      // cover-fit source rect
      const ir = img.naturalWidth / img.naturalHeight, cr = W / H;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (ir > cr) { sw = img.naturalHeight * cr; sx = (img.naturalWidth - sw) * focusX; } else { sh = img.naturalWidth / cr; sy = (img.naturalHeight - sh) / 2; }
      const t0 = performance.now();
      const ease = (t: number) => 1 - Math.pow(2, -10 * t);
      const frame = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const e = ease(p);
        // block size: 56px → 1px, log-ish so the last 20% is the sharpening.
        const block = Math.max(1, Math.round(56 * Math.pow(1 - e, 1.6)));
        const cw = Math.max(1, Math.round(W / block)), ch = Math.max(1, Math.round(H / block));
        off.width = cw; off.height = ch;
        octx.imageSmoothingEnabled = true;
        octx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
        ctx.imageSmoothingEnabled = block <= 2;
        ctx.drawImage(off, 0, 0, cw, ch, 0, 0, canvas.width, canvas.height);
        // fading veil so early blocks read as "not yet"
        ctx.fillStyle = `rgba(247,246,242,${(1 - e) * 0.55})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (p < 1) raf = requestAnimationFrame(frame);
        else { setDone(true); onDone?.(); }
      };
      raf = requestAnimationFrame(frame);
    };
    return () => { cancelled = true; cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, start, src, duration]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 block" style={{ opacity: done ? 0 : 1, transition: "opacity 320ms ease" }} aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: done ? 1 : 0, transition: "opacity 320ms ease", objectPosition: `${focusX * 100}% 50%` }}
      />
      {video && done && !reducedMotion() && (
        <video src={video} muted loop playsInline autoPlay preload="auto" aria-hidden="true" onPlaying={() => setVidOn(true)}
          className="absolute inset-0 w-full h-full object-cover" style={{ opacity: vidOn ? 1 : 0, transition: "opacity 700ms ease", objectPosition: `${focusX * 100}% 50%` }} />
      )}
      {!ready && !done && <div className="absolute inset-0 bg-paper-2" aria-hidden="true" />}
    </div>
  );
}
