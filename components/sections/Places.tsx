import { Reveal } from "@/components/motion/Reveal";
import { PLACES } from "@/lib/data/copy";
import type { Event } from "@/lib/data/facts";
import { SF_PHOTOS } from "@/lib/data/assets";

/**
 * Islamabad → San Francisco. Two markers on an abstract route board; the
 * page's line lifts off one and lands on the other via a raised mid anchor.
 * No geography is drawn, so nothing can be geographically wrong.
 */
export function Places({ events, sfAddress }: { events: Event[]; sfAddress: string | null }) {
  return (
    <section id="places" className="relative z-[1] py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <div className="t-mono text-ink-3">{PLACES.eyebrow}</div>
          <h2 className="t-h2 mt-4 max-w-[22ch] text-ink">{PLACES.title}</h2>
          <p className="t-lead mt-5 max-w-[60ch] text-ink-2">{PLACES.body}</p>
        </Reveal>

        <span data-line="places-in" className="relative block left-[-24px] top-[28px] w-1 h-1" aria-hidden="true" />
        <div className="mt-10 md:mt-14 relative h-[300px] md:h-[360px] rounded-[24px] border border-line bg-white/50 overflow-hidden">
          <div className="absolute inset-0" aria-hidden="true">
            {[25, 50, 75].map((p) => (<div key={p} className="absolute left-0 right-0 border-t border-dashed border-line" style={{ top: `${p}%` }} />))}
            {[20, 40, 60, 80].map((p) => (<div key={p} className="absolute top-0 bottom-0 border-l border-dashed border-line" style={{ left: `${p}%` }} />))}
          </div>
          <div className="absolute left-[10%] md:left-[12%] top-[62%]" style={{ transform: "translate(-50%,-50%)" }}>
            <div data-line="isb" className="relative w-3 h-3"><span className="anchor-dot absolute inset-0 !w-3 !h-3" aria-hidden="true" /></div>
            <div className="absolute left-0 top-6 w-[180px] md:w-[240px]">
              <div className="font-medium text-[18px] md:text-[22px] leading-[1.1] text-ink">{PLACES.islamabad.name}</div>
              <div className="mt-1 text-[13px] text-ink-3">{PLACES.islamabad.sub}</div>
            </div>
          </div>
          <span data-line="lift" className="absolute left-1/2 top-[12%] w-1 h-1" aria-hidden="true" />
          <div className="absolute left-[90%] md:left-[88%] top-[46%]" style={{ transform: "translate(-50%,-50%)" }}>
            <div data-line="sf" className="relative w-3 h-3"><span className="anchor-dot absolute inset-0 !w-3 !h-3" aria-hidden="true" /></div>
            <div className="absolute right-0 top-6 w-[180px] md:w-[260px] text-right">
              <div className="font-medium text-[18px] md:text-[22px] leading-[1.1] text-ink">{PLACES.sf.name}</div>
              <div className="mt-1 text-[13px] text-ink-3">{PLACES.sf.sub}{sfAddress ? ` · ${sfAddress}` : ""}</div>
            </div>
          </div>
        </div>

        <div className="relative h-0" aria-hidden="true">
          <span data-line="sf-exit" className="absolute right-[8%] top-[22px] w-1 h-1" />
          <span data-line="places-return" className="absolute left-[-24px] top-[22px] w-1 h-1" />
        </div>

        <figure className="m-0 mt-12 md:mt-16">
          <div className="grid md:grid-cols-[2fr_1fr] gap-3 md:gap-4">
            <Reveal className="h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SF_PHOTOS.main.src} alt={SF_PHOTOS.main.alt} loading="lazy" decoding="async" className="w-full h-full aspect-[16/10] md:aspect-auto object-cover rounded-[18px] bg-paper-2" />
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
              {SF_PHOTOS.side.map((p, i) => (
                <Reveal key={p.src} delay={80 + i * 60}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover rounded-[18px] bg-paper-2" />
                </Reveal>
              ))}
            </div>
          </div>
          <figcaption className="mt-3 text-[13px] text-ink-3">The San Francisco office, and the team around the city.</figcaption>
        </figure>

        {events.length > 0 && (
          <ul className="list-none m-0 p-0 mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((e) => (
              <li key={e.url}>
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="block rounded-[16px] border border-line bg-white p-4 hover:border-line-2 transition-colors">
                  <div className="t-mono text-ink-3">{e.when}</div>
                  <div className="mt-1 font-medium text-[15px] leading-[1.3] text-ink">{e.name}</div>
                  <div className="mt-0.5 text-[13px] text-ink-3">{e.where}</div>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PLACES.perks.map((p, i) => (
            <Reveal key={p.t} delay={i * 50}>
              <div className="rounded-[18px] bg-white border border-line p-5 md:p-6 h-full">
                <h3 className="t-h3 text-ink">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-ink-2 m-0">{p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <span data-line="places-out" data-line-x="left" data-line-y="bottom" className="absolute left-[8px] md:left-[10px] bottom-0 w-1 h-1" aria-hidden="true" />
      </div>
    </section>
  );
}
