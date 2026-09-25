import { Reveal } from "@/components/motion/Reveal";
import { LADDER, SCOPE } from "@/lib/data/copy";
import type { Milestone } from "@/lib/data/facts";

/**
 * The growth section. The page's line becomes the role curve here: four
 * anchors rise left→right across a chart area, so the spline through them IS
 * the curve. Then it threads down the scope timeline and the company milestones.
 */
const POS = [
  { x: "8%", y: "82%" }, { x: "36%", y: "60%" }, { x: "64%", y: "36%" }, { x: "92%", y: "10%" },
];

export function Growth({ milestones }: { milestones: Milestone[] }) {
  return (
    <section id="growth" className="relative z-[1] py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <div className="t-mono text-ink-3">Growth curves</div>
          <h2 className="t-h2 mt-4 max-w-[24ch] text-ink">The curve is the point. Here is what it looks like.</h2>
          <p className="t-lead mt-5 max-w-[60ch] text-ink-2">Three curves. The role you hold, the scope you own, and the company you are inside. The line on this page is drawing them.</p>
        </Reveal>

        {/* 1. Role curve — desktop: chart; mobile: stacked list with the same anchors */}
        <div className="mt-12 md:mt-16 relative">
          <span data-line="growth-in" className="absolute left-[-24px] top-0 w-1 h-1 hidden md:block" aria-hidden="true" />
          <div className="hidden md:block relative h-[420px] rounded-[24px] border border-line bg-white/50">
            {/* faint grid */}
            <div className="absolute inset-0 rounded-[24px] overflow-hidden" aria-hidden="true">
              {[20, 40, 60, 80].map((p) => (<div key={p} className="absolute left-0 right-0 border-t border-line" style={{ top: `${p}%` }} />))}
            </div>
            {LADDER.map((l, i) => (
              <div key={l.title} className="absolute" style={{ left: POS[i].x, top: POS[i].y, transform: "translate(-50%, -50%)" }}>
                <div data-line={`ladder-${i}`} className="relative w-3 h-3">
                  <span className="anchor-dot absolute inset-0 !w-3 !h-3" aria-hidden="true" />
                </div>
                <div className={`absolute w-[230px] ${i === 3 ? "right-0 top-6 text-right" : i === 0 ? "left-0 bottom-6" : "left-0 top-6"}`}>
                  <div className="t-mono text-signal">{l.years}</div>
                  <div className="mt-1 font-medium text-[17px] leading-[1.2] text-ink">{l.title}</div>
                  <p className="mt-1.5 text-[13.5px] leading-[1.45] text-ink-2 m-0">{l.own}</p>
                </div>
              </div>
            ))}
            <span data-line="ladder-exit" className="absolute right-[6%] bottom-[8%] w-1 h-1" aria-hidden="true" />
          </div>
          <ol className="md:hidden list-none m-0 p-0 flex flex-col gap-6 relative pl-6">
            {LADDER.map((l, i) => (
              <li key={l.title} className="relative">
                <span data-line={`ladder-m-${i}`} className="anchor-dot absolute left-[-36px] top-[6px]" aria-hidden="true" />
                <div className="t-mono text-signal">{l.years}</div>
                <div className="mt-1 font-medium text-[18px] leading-[1.2] text-ink">{l.title}</div>
                <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-2 m-0">{l.own}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 2. Scope curve */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-14">
          <Reveal>
            <div className="t-mono text-ink-3">Scope</div>
            <h3 className="t-h3 mt-3 text-ink max-w-[18ch]">What you own, and when.</h3>
          </Reveal>
          <ol className="list-none m-0 p-0 flex flex-col relative">
            {SCOPE.map((s, i) => (
              <li key={s.when} className="relative grid grid-cols-[96px_1fr] md:grid-cols-[140px_1fr] gap-4 py-5 hairline first:border-t-0">
                <span data-line={`scope-${i}`} className="anchor-dot absolute left-[-12px] md:left-[-28px] top-[50%] mt-[-5px]" aria-hidden="true" />
                <div className="t-mono text-ink-3 pt-[3px]">{s.when}</div>
                <p className="m-0 text-[16px] md:text-[17px] leading-[1.5] text-ink">{s.what}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 3. Company curve */}
        {milestones.length > 0 && (
          <div className="mt-16 md:mt-24 grid md:grid-cols-[1fr_2fr] gap-8 md:gap-14">
            <Reveal>
              <div className="t-mono text-ink-3">The company</div>
              <h3 className="t-h3 mt-3 text-ink max-w-[18ch]">Where the line has been.</h3>
              <p className="mt-3 text-[14px] leading-[1.5] text-ink-3 m-0">Bootstrapped, no major funding rounds. Public milestones, each linked to its source.</p>
            </Reveal>
            <ol className="list-none m-0 p-0 flex flex-col relative">
              {milestones.map((m, i) => (
                <li key={`${m.when}-${m.label}`} className="relative grid grid-cols-[96px_1fr] md:grid-cols-[140px_1fr] gap-4 py-5 hairline first:border-t-0">
                  <span data-line={`mile-${i}`} className="anchor-dot absolute left-[-12px] md:left-[-28px] top-[50%] mt-[-5px]" aria-hidden="true" />
                  <div className="t-h3 t-num text-ink leading-none pt-1">{m.when}</div>
                  <p className="m-0 text-[16px] md:text-[17px] leading-[1.5] text-ink pt-1">
                    {m.label} <a href={m.source} target="_blank" rel="noopener noreferrer" className="text-ink-4 hover:text-signal text-[13px] whitespace-nowrap">source ↗</a>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
