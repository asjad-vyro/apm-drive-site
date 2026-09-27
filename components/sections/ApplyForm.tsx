import { APPLY } from "@/lib/data/copy";
import { SITE } from "@/lib/site";

/** Closing call to action. The application itself lives on Ashby; the line ends on this button. */
export function ApplyForm() {
  return (
    <section id="apply" className="relative z-[1] py-16 md:py-28">
      <div className="container-page">
        <span data-line="apply-in" className="absolute left-[8px] md:left-[10px] top-0 w-1 h-1" aria-hidden="true" />
        <div className="max-w-[720px]">
          <h2 className="t-display-sm text-ink">{APPLY.title}</h2>
          <p className="t-lead mt-5 max-w-[52ch] text-ink-2">{APPLY.body}</p>
          <div className="relative mt-9 inline-block">
            <span data-line="end" className="absolute left-[-2px] top-1/2 w-1 h-1" aria-hidden="true" />
            <a href={SITE.applyUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-[28px] bg-ink text-paper font-medium text-[16px] transition-transform hover:-translate-y-px">
              {APPLY.button} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
