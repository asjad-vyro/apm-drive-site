import { Reveal } from "@/components/motion/Reveal";
import { PROCESS } from "@/lib/data/copy";

export function Process() {
  return (
    <section id="process" className="relative z-[1] py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <div className="t-mono text-ink-3">{PROCESS.eyebrow}</div>
          <h2 className="t-h2 mt-4 text-ink">{PROCESS.title}</h2>
          <p className="t-lead mt-5 max-w-[50ch] text-ink-2">{PROCESS.sla}</p>
        </Reveal>
        <ol className="list-none m-0 p-0 mt-10 md:mt-14 relative pl-6 md:pl-8 max-w-[820px]">
          {PROCESS.steps.map((s, i) => (
            <li key={s.n} className="relative hairline first:border-t-0 py-6 md:py-7 grid grid-cols-[48px_1fr] gap-4">
              <span data-line={`step-${i}`} className="anchor-dot absolute left-[-36px] md:left-[-40px] top-[50%] mt-[-5px]" aria-hidden="true" />
              <span className="t-mono text-ink-4 pt-[6px]">{s.n}</span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="t-h3 text-ink">{s.t}</h3>
                  <span className="t-mono text-signal">{s.d}</span>
                </div>
                <p className="mt-2 text-[15.5px] leading-[1.55] text-ink-2 m-0">{s.b}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 md:mt-14 flex flex-wrap items-center gap-2">
          {PROCESS.campuses.map((c) => (<span key={c} className="chip">{c}</span>))}
          <span className="text-[13px] text-ink-3 ml-1">{PROCESS.datesNote}</span>
        </div>
      </div>
    </section>
  );
}
