import { Reveal } from "@/components/motion/Reveal";
import { TEAM } from "@/lib/data/copy";

export function Team() {
  return (
    <section id="team" className="relative z-[1] py-16 md:py-24">
      <div className="container-page">
        <span data-line="team-in" data-line-x="left" data-line-y="top" className="absolute left-[8px] md:left-[10px] top-0 w-1 h-1" aria-hidden="true" />
        <Reveal>
          <div className="t-mono text-ink-3">{TEAM.eyebrow}</div>
          <h2 className="t-h2 mt-4 text-ink">{TEAM.title}</h2>
          <p className="t-lead mt-5 max-w-[56ch] text-ink-2">{TEAM.body}</p>
        </Reveal>
        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-x-10 gap-y-10">
          {TEAM.groups.map((gp) => (
            <div key={gp.label}>
              <div className="t-mono text-ink-3 pb-3 hairline border-t-0 border-b border-line">{gp.label}</div>
              <ul className="list-none m-0 p-0">
                {gp.people.map((p, i) => (
                  <li key={p.name} className="hairline first:border-t-0 py-4">
                    <Reveal delay={i * 30}>
                      <div className="font-medium text-[17px] leading-[1.25] text-ink">{p.name}</div>
                      <div className="mt-0.5 text-[13.5px] leading-[1.4] text-ink-3">{p.role}</div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <span data-line="team-out" data-line-x="left" data-line-y="bottom" className="absolute left-[8px] md:left-[10px] bottom-0 w-1 h-1" aria-hidden="true" />
      </div>
    </section>
  );
}
