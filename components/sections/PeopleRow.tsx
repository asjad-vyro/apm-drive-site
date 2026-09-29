/* eslint-disable @next/next/no-img-element */
import { Reveal } from "@/components/motion/Reveal";

/** Four team photos directly under the hero, so people are seen first. */
export function PeopleRow({ photos, caption }: { photos: { src: string; alt: string }[]; caption: string }) {
  return (
    <section aria-label="The team" className="relative z-[1] pb-6 md:pb-10">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={i * 70}>
              <img src={p.src} alt={p.alt} loading={i < 2 ? "eager" : "lazy"} decoding="async" className="w-full aspect-[4/3] object-cover rounded-[16px] md:rounded-[18px] bg-paper-2" />
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-[13px] text-ink-3 m-0">{caption}</p>
      </div>
    </section>
  );
}
