import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import type { Fact } from "@/lib/data/facts";

/**
 * Verified numbers. On desktop the line runs along a rail beneath the row and
 * lights each figure's dot; on phones the figures stack and the dots sit in
 * the gutter so the line never crosses a number.
 */
export function Receipts({ facts }: { facts: Fact[] }) {
  if (facts.length === 0) return null;
  return (
    <section id="why" className="relative z-[1] py-14 md:py-20">
      <div className="container-page">
        <p className="t-mono text-ink-3 m-0 mb-8 md:mb-10">
          As published on{" "}
          <a className="underline decoration-line-2 underline-offset-2 hover:text-signal" href={facts[0].source} target="_blank" rel="noopener noreferrer">imagine.art/about</a>, Sep 2026
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-8">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 60} className="h-full">
              <div className="relative h-full pl-6 md:pl-0 md:pb-9">
                <span data-line={`receipt-m-${i}`} className="anchor-dot absolute left-[-12px] top-[18px] md:hidden" aria-hidden="true" />
                <span data-line={`receipt-${i}`} className="anchor-dot absolute left-0 bottom-0 hidden md:block" aria-hidden="true" />
                <div className="t-display-sm text-ink t-num">
                  {f.prefix}<Counter value={f.value} decimals={f.decimals} />{f.suffix}
                </div>
                <div className="mt-2 text-[15px] text-ink-2 leading-[1.4] max-w-[26ch]">{f.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
