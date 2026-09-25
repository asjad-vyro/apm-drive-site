/* eslint-disable @next/next/no-img-element */
import { Reveal } from "@/components/motion/Reveal";
import type { Mention } from "@/lib/data/facts";

export function Mentions({ mentions }: { mentions: Mention[] }) {
  if (mentions.length === 0) return null;
  const logos = mentions.filter((m) => m.logo);
  return (
    <section id="mentions" className="relative z-[1] py-16 md:py-24 overflow-hidden">
      <div className="container-page">
        <span data-line="mentions-in" data-line-x="left" data-line-y="top" className="absolute left-[8px] md:left-[10px] top-0 w-1 h-1" aria-hidden="true" />
        <Reveal>
          <div className="t-mono text-ink-3">Where ImagineArt shows up</div>
          <h2 className="t-h2 mt-4 max-w-[24ch] text-ink">You will be working on something people write about.</h2>
        </Reveal>
      </div>
      {logos.length > 0 && (
        <div className="mt-10 md:mt-14 relative">
          <div className="flex w-max animate-marquee items-center gap-14 px-7">
            {[...logos, ...logos].map((m, i) => (
              <a key={`${m.domain}-${i}`} href={m.url} target="_blank" rel="noopener noreferrer" title={m.headline} className="shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                <img src={m.logo} alt={m.outlet} loading="lazy" className="h-7 md:h-8 w-auto max-w-[140px] object-contain grayscale" />
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="container-page mt-10 md:mt-14">
        <ul className="list-none m-0 p-0 grid md:grid-cols-2 gap-x-10">
          {mentions.map((m) => (
            <li key={m.url} className="hairline py-4">
              <a href={m.url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[110px_1fr] md:grid-cols-[150px_1fr] gap-4 items-baseline">
                <span className="t-mono text-ink-3 truncate">{m.outlet}</span>
                <span className="text-[15px] leading-[1.45] text-ink group-hover:text-signal transition-colors">{m.headline}{m.date && <span className="text-ink-4 text-[12px] ml-2 whitespace-nowrap">{m.date}</span>}</span>
              </a>
            </li>
          ))}
        </ul>
        <span data-line="mentions-out" data-line-x="left" data-line-y="bottom" className="absolute left-[8px] md:left-[10px] bottom-0 w-1 h-1" aria-hidden="true" />
      </div>
    </section>
  );
}
