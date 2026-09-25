import { Reveal } from "@/components/motion/Reveal";
import { HOW } from "@/lib/data/copy";

export function How() {
  return (
    <section id="how" className="relative z-[1] py-16 md:py-24">
      <div className="container-page">
        <span data-line="how-in" data-line-x="left" data-line-y="top" className="absolute left-[8px] md:left-[10px] top-0 w-1 h-1" aria-hidden="true" />
        <Reveal>
          <div className="t-mono text-ink-3">{HOW.eyebrow}</div>
          <h2 className="t-h2 mt-4 max-w-[20ch] text-ink">{HOW.title}</h2>
        </Reveal>
        <ol className="list-none m-0 p-0 mt-10 md:mt-14 grid md:grid-cols-2 gap-x-14">
          {HOW.items.map((it, i) => (
            <li key={it.n} className="hairline py-6 md:py-7 grid grid-cols-[52px_1fr] md:grid-cols-[64px_1fr] gap-4">
              <Reveal delay={i * 40}><span className="t-num text-ink-4 leading-none font-medium tracking-[-0.03em] text-[30px] md:text-[38px]">{it.n}</span></Reveal>
              <Reveal delay={i * 40 + 40}>
                <h3 className="t-h3 text-ink">{it.t}</h3>
                <p className="mt-2 text-[15.5px] leading-[1.55] text-ink-2 m-0">{it.b}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <span data-line="how-out" data-line-x="left" data-line-y="bottom" className="absolute left-[8px] md:left-[10px] bottom-0 w-1 h-1" aria-hidden="true" />
      </div>
    </section>
  );
}
