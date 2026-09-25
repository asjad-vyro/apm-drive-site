import { Reveal } from "@/components/motion/Reveal";
import { InViewVideo } from "@/components/motion/InViewVideo";
import { SHIP } from "@/lib/data/copy";

export type Surface = { name: string; blurb: string; image: string; video?: string; alt: string; href: string };

export function Ship({ surfaces }: { surfaces: Surface[] }) {
  return (
    <section id="ship" className="relative z-[1] py-16 md:py-24">
      <div className="container-page">
        <span data-line="ship-in" data-line-x="left" data-line-y="top" className="absolute left-[8px] md:left-[10px] top-0 w-1 h-1" aria-hidden="true" />
        <Reveal>
          <div className="t-mono text-ink-3">{SHIP.eyebrow}</div>
          <h2 className="t-h2 mt-4 max-w-[26ch] text-ink">{SHIP.title}</h2>
          <p className="t-lead mt-5 max-w-[60ch] text-ink-2">{SHIP.body}</p>
        </Reveal>
        <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {surfaces.map((s, i) => (
            <Reveal key={s.name} delay={i * 50}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group block rounded-[18px] bg-white border border-line overflow-hidden transition-transform duration-300 hover:-translate-y-0.5">
                <InViewVideo poster={s.image} src={s.video} alt={s.alt} className="aspect-[16/10] bg-paper-2 transition-transform duration-700 ease-out" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="t-h3 text-ink">{s.name}</h3>
                    <span className="text-ink-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span>
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.5] text-ink-2 m-0">{s.blurb}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <span data-line="ship-out" data-line-x="left" data-line-y="bottom" className="absolute left-[8px] md:left-[10px] bottom-0 w-1 h-1" aria-hidden="true" />
      </div>
    </section>
  );
}
