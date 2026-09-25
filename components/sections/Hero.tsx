"use client";
import { useState } from "react";
import { Typewriter } from "@/components/motion/Typewriter";
import { GenerateReveal } from "@/components/motion/GenerateReveal";
import { HERO } from "@/lib/data/copy";
import { SITE } from "@/lib/site";

export function Hero({ image, video }: { image: string; video?: string }) {
  const [typed, setTyped] = useState(false);
  return (
    <section id="top" className="relative z-[1] pt-[132px] md:pt-[168px] pb-10 md:pb-16">
      <div className="container-page">
        <div className="chip" aria-label="Prompt">
          <span className="chip-dot" aria-hidden="true" />
          <span className="normal-case tracking-normal text-[12px] md:text-[13px]">
            <span className="text-ink-4">prompt / </span>
            <Typewriter text={HERO.prompt} startDelay={420} onDone={() => setTyped(true)} />
          </span>
        </div>

        <h1 className="t-display mt-7 md:mt-9 max-w-[14ch] text-ink">
          <span className="block">{HERO.h1a}</span>
          <span className="block relative">
            {HERO.h1b}
            {/* The line starts here, as the headline's underline. */}
            <span data-line="hero-start" className="absolute left-[-22px] bottom-[-6px] w-1 h-1" aria-hidden="true" />
          </span>
        </h1>

        <div className="mt-8 md:mt-10 grid md:grid-cols-[minmax(0,58ch)_auto] gap-6 md:gap-10 items-end">
          <p className="t-lead text-ink-2 m-0">{HERO.sub}</p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href={SITE.applyAnchor} className="inline-flex items-center justify-center h-12 px-6 rounded-[24px] bg-ink text-paper font-medium text-[15px] transition-transform hover:-translate-y-px">{HERO.primary}</a>
            <a href="#process" className="inline-flex items-center justify-center h-12 px-6 rounded-[24px] border border-line-2 text-ink font-medium text-[15px] hover:bg-ink/5 transition-colors">{HERO.secondary}</a>
          </div>
        </div>

        <div className="relative mt-10 md:mt-14">
          <GenerateReveal
            src={image}
            video={video}
            focusX={0.72}
            alt={HERO.imageAlt}
            trigger="now"
            start={typed}
            priority
            duration={1700}
            className="w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] rounded-[20px] md:rounded-[28px] bg-paper-2"
          />
          <div className="grain rounded-[20px] md:rounded-[28px]" aria-hidden="true" />
          <span className="chip absolute left-4 bottom-4 md:left-6 md:bottom-6 bg-paper/80 backdrop-blur">
            <span className="chip-dot" aria-hidden="true" />{HERO.madeWith}
          </span>
          <span data-line="hero-frame" data-line-x="left" data-line-y="bottom" className="absolute left-[8px] md:left-[10px] bottom-0 w-1 h-1" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
