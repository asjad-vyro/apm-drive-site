"use client";
import { useEffect, useRef } from "react";
import { g, reducedMotion } from "./gsap";

/**
 * One continuous line through the whole page.
 *
 * Every element carrying `data-line="<name>"` is an anchor. In DOM order the
 * line visits each anchor's point (chosen with data-line-x / data-line-y:
 * left|center|right and top|center|bottom, default center), joined by a
 * Catmull-Rom spline. Scroll draws it; a dot rides it; anchors it has passed
 * get `data-lit="true"` so sections can light their own milestones.
 *
 * The path is recomputed on layout change, so section heights can be dynamic.
 */
type Pt = { x: number; y: number; el: HTMLElement };

function anchorPoint(el: HTMLElement, root: DOMRect): Pt {
  const r = el.getBoundingClientRect();
  const ax = el.dataset.lineX ?? "center";
  const ay = el.dataset.lineY ?? "center";
  const x = ax === "left" ? r.left : ax === "right" ? r.right : r.left + r.width / 2;
  const y = ay === "top" ? r.top : ay === "bottom" ? r.bottom : r.top + r.height / 2;
  return { x: x - root.left, y: y - root.top, el };
}

/** Catmull-Rom → cubic Bézier path. Tension 0.5 keeps vertical runs calm. */
function splinePath(p: Pt[]): string {
  if (p.length < 2) return "";
  let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function LineSystem({ rootId = "page-root" }: { rootId?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const root = document.getElementById(rootId);
    const svg = svgRef.current, path = pathRef.current, ghost = ghostRef.current, dot = dotRef.current, halo = haloRef.current;
    if (!root || !svg || !path || !ghost || !dot || !halo) return;
    const { gsap, ScrollTrigger } = g();
    const reduced = reducedMotion();

    let anchors: Pt[] = [];
    let anchorLen: number[] = [];
    let total = 0;
    let progress = 0;
    let trigger: ScrollTrigger | null = null;

    const measure = () => {
      const rr = root.getBoundingClientRect();
      const els = Array.from(root.querySelectorAll<HTMLElement>("[data-line]")).filter((el) => el.getClientRects().length > 0);
      anchors = els.map((el) => anchorPoint(el, rr));
      const W = Math.round(rr.width), H = Math.round(root.scrollHeight);
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(H));
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      const d = splinePath(anchors);
      path.setAttribute("d", d);
      ghost.setAttribute("d", d);
      total = path.getTotalLength();
      // Map each anchor to its length along the path by sampling.
      const N = 600;
      const samples: { x: number; y: number; l: number }[] = [];
      for (let i = 0; i <= N; i++) {
        const l = (total * i) / N;
        const q = path.getPointAtLength(l);
        samples.push({ x: q.x, y: q.y, l });
      }
      anchorLen = anchors.map((a) => {
        let best = 0, bd = Infinity;
        for (const s of samples) {
          const dd = (s.x - a.x) ** 2 + (s.y - a.y) ** 2;
          if (dd < bd) { bd = dd; best = s.l; }
        }
        return best;
      });
      path.style.strokeDasharray = `${total}`;
      render();
    };

    const render = () => {
      const shown = reduced ? total : total * progress;
      path.style.strokeDashoffset = `${total - shown}`;
      const q = path.getPointAtLength(Math.max(0, Math.min(total, shown)));
      dot.setAttribute("cx", q.x.toFixed(1)); dot.setAttribute("cy", q.y.toFixed(1));
      halo.setAttribute("cx", q.x.toFixed(1)); halo.setAttribute("cy", q.y.toFixed(1));
      dot.style.opacity = reduced || progress <= 0.001 ? "0" : "1";
      halo.style.opacity = dot.style.opacity;
      anchors.forEach((a, i) => {
        const lit = shown >= anchorLen[i] - 2;
        if ((a.el.dataset.lit === "true") !== lit) a.el.dataset.lit = lit ? "true" : "false";
      });
    };

    const build = () => {
      measure();
      trigger?.kill();
      trigger = ScrollTrigger.create({
        trigger: root,
        start: "top 55%",
        end: "bottom 70%",
        scrub: 0.7,
        onUpdate: (self) => { progress = self.progress; render(); },
      });
    };

    // Fonts and images change layout after first paint; rebuild on settle.
    build();
    const ro = new ResizeObserver(() => { measure(); ScrollTrigger.refresh(); });
    ro.observe(root);
    const onLoad = () => { measure(); ScrollTrigger.refresh(); };
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(onLoad);
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    // Halo breathing — cheap, decorative, and off under reduced motion.
    const breathe = reduced ? null : gsap.to(halo, { attr: { r: 16 }, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" });

    return () => {
      ro.disconnect();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      trigger?.kill();
      breathe?.kill();
    };
  }, [rootId]);

  return (
    <svg ref={svgRef} className="line-svg" aria-hidden="true">
      <path ref={ghostRef} className="line-ghost" />
      <path ref={pathRef} className="line-path" />
      <circle ref={haloRef} className="line-halo" r="11" style={{ opacity: 0 }} />
      <circle ref={dotRef} className="line-dot" r="5" style={{ opacity: 0 }} />
    </svg>
  );
}
