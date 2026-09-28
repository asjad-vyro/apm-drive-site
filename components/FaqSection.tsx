"use client";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Item = { q: string; a: string };

function PlusToggle({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5 text-ink-3">
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" style={{ transition: "transform 240ms cubic-bezier(0.2,0.7,0.2,1), opacity 200ms ease", transformOrigin: "center", transform: open ? "scaleY(0)" : "scaleY(1)", opacity: open ? 0 : 1 }} />
    </svg>
  );
}

function FaqCard({ q, a, delay }: Item & { delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <div className="rounded-[12px] bg-white border border-line">
        <button data-faq="" onClick={() => setOpen((v) => !v)} className="w-full flex items-start justify-between gap-6 px-6 py-5 text-left cursor-pointer bg-transparent border-0" aria-expanded={open}>
          <span className="font-sans font-medium text-[16px] leading-[1.4] text-ink">{q}</span>
          <PlusToggle open={open} />
        </button>
        <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 280ms cubic-bezier(0.2,0.7,0.2,1)" }}>
          <div className="overflow-hidden"><p className="font-sans text-[15px] leading-[1.68] text-ink-2 px-6 pb-5 m-0">{a}</p></div>
        </div>
      </div>
    </Reveal>
  );
}

export function FaqSection({ items, title = "Questions" }: { items: Item[]; title?: string }) {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) };
  return (
    <section id="faq" className="relative z-[1] pb-20 md:pb-28 pt-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container-page">
        <Reveal><h2 className="t-h2 text-ink">{title}</h2></Reveal>
        <div className="max-w-[640px] mt-8 md:mt-10 flex flex-col gap-3">
          {items.map((it, i) => (<FaqCard key={it.q} q={it.q} a={it.a} delay={i * 40} />))}
        </div>
      </div>
    </section>
  );
}
