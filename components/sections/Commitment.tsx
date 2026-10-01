import { Stamp } from "@/components/motion/Stamp";
import { COMMITMENT } from "@/lib/data/copy";

/** What the job demands. Sits between what you'll ship and how you grow. */
export function Commitment() {
  return (
    <section id="commitment" className="relative z-[1] py-16 md:py-24">
      <Stamp className="container-page">
        <span data-line="commit-in" data-line-x="left" data-line-y="top" className="absolute left-[8px] md:left-[10px] top-0 w-1 h-1" aria-hidden="true" />
        <div className="t-mono text-ink-3">{COMMITMENT.eyebrow}</div>
        <div className="mt-6 grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5">
            <h2 data-stamp className="t-h2 text-ink m-0">{COMMITMENT.title}</h2>
            <p data-stamp className="t-lead text-ink-2 mt-5 mb-0">{COMMITMENT.body}</p>
          </div>
          <ol className="md:col-span-7 list-none m-0 p-0 grid sm:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-10">
            {COMMITMENT.items.map((c, i) => (
              <li key={c.t} data-stamp>
                <div className="t-mono t-num text-signal">{String(i + 1).padStart(2, "0")}</div>
                <div className="t-h3 text-ink mt-2">{c.t}</div>
                <p className="text-ink-3 mt-2 mb-0" style={{ fontSize: 16, lineHeight: 1.5 }}>{c.b}</p>
              </li>
            ))}
          </ol>
        </div>
        <span data-line="commit-out" data-line-x="left" data-line-y="bottom" className="absolute left-[8px] md:left-[10px] bottom-0 w-1 h-1" aria-hidden="true" />
      </Stamp>
    </section>
  );
}
