/* eslint-disable @next/next/no-img-element */
export type StripPhoto = { src: string; alt: string; w: number; h: number };

/**
 * Full-bleed, slowly drifting row of real photos. Pure CSS transform
 * animation (compositor only), so it costs nothing on scroll. Pauses on
 * hover and under reduced motion.
 */
export function PhotoStrip({ photos, caption }: { photos: StripPhoto[]; caption?: string }) {
  if (photos.length === 0) return null;
  const row = [...photos, ...photos];
  return (
    <section aria-label={caption ?? "Photos"} className="relative z-[1] py-10 md:py-14 overflow-hidden">
      <div className="group">
        <div className="flex w-max gap-3 md:gap-4 animate-marquee group-hover:[animation-play-state:paused]" style={{ animationDuration: `${photos.length * 7}s` }}>
          {row.map((p, i) => (
            <img
              key={`${p.src}-${i}`}
              src={p.src}
              alt={i < photos.length ? p.alt : ""}
              aria-hidden={i >= photos.length || undefined}
              loading="lazy"
              decoding="async"
              width={p.w}
              height={p.h}
              className="h-[220px] md:h-[340px] w-auto rounded-[16px] md:rounded-[20px] object-cover bg-paper-2 shrink-0"
            />
          ))}
        </div>
      </div>
      {caption && <p className="container-page mt-4 mb-0 text-[13px] text-ink-3">{caption}</p>}
    </section>
  );
}
