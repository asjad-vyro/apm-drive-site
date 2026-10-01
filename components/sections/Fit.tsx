import { Stamp } from "@/components/motion/Stamp";
import { FIT, COMMITMENT } from "@/lib/data/copy";

/** The kinetic block. Pinned on desktop; each line stamps in as you scroll. */
export function Fit() {
  return (
    <section id="fit" className="relative z-[1] py-10 md:py-16">
      <Stamp className="container-page">
        <div className="t-mono text-ink-3">{FIT.eyebrow}</div>
        <div className="mt-6 md:mt-10 grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <div className="t-mono text-signal">For you if</div>
            <ul className="list-none m-0 p-0 mt-4 flex flex-col gap-3 md:gap-4">
              {FIT.yes.map((l) => (<li key={l} data-stamp className="t-display-sm text-ink" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.08 }}>{l}</li>))}
            </ul>
          </div>
          <div>
            <div className="t-mono text-ink-3">Not for you if</div>
            <ul className="list-none m-0 p-0 mt-4 flex flex-col gap-3 md:gap-4">
              {FIT.no.map((l) => (<li key={l} data-stamp className="t-display-sm text-ink-4" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.08 }}>{l}</li>))}
            </ul>
          </div>
        </div>
        <div className="mt-16 md:mt-28 pt-10 md:pt-14 border-t border-line">
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
        </div>
        <span data-line="fit-out" data-line-x="left" data-line-y="bottom" className="absolute left-[8px] md:left-[10px] bottom-0 w-1 h-1" aria-hidden="true" />
      </Stamp>
    </section>
  );
}
