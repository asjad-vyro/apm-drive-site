"use client";
import { useState, type FormEvent } from "react";
import { APPLY } from "@/lib/data/copy";

const NO_PWD = { autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: false, "data-1p-ignore": "true", "data-lpignore": "true", "data-bwignore": "true", "data-form-type": "other" } as const;

const field = "w-full h-12 px-4 rounded-[12px] bg-white border border-line-2 text-[15px] text-ink placeholder:text-ink-4 outline-none focus:border-ink transition-colors";
const label = "block t-mono text-ink-3 mb-2";

export function ApplyForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "fail">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.source = new URLSearchParams(window.location.search).get("utm_campaign") ?? "";
    try {
      const r = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setState(r.ok ? "ok" : "fail");
    } catch { setState("fail"); }
  }

  return (
    <section id="apply" className="relative z-[1] py-16 md:py-24">
      <div className="container-page">
        <span data-line="apply-in" className="absolute left-[8px] md:left-[10px] top-0 w-1 h-1" aria-hidden="true" />
        <span data-line="apply-low" className="absolute left-[8px] md:left-[10px] bottom-[58px] md:bottom-[62px] w-1 h-1" aria-hidden="true" />
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
          <div>
            <div className="t-mono text-ink-3">{APPLY.eyebrow}</div>
            <h2 className="t-h2 mt-4 text-ink">{APPLY.title}</h2>
            <p className="t-lead mt-5 max-w-[40ch] text-ink-2">{APPLY.body}</p>
          </div>

          {state === "ok" ? (
            <div className="rounded-[20px] bg-white border border-line p-8 md:p-10">
              <p className="t-h3 text-ink m-0">{APPLY.success}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-[20px] bg-paper-2/60 border border-line p-5 md:p-8 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={label} htmlFor="name">Name</label><input id="name" name="name" required className={field} placeholder="Your name" {...NO_PWD} /></div>
                <div><label className={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required className={field} placeholder="you@example.com" {...NO_PWD} /></div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className={label} htmlFor="university">University</label>
                  <input id="university" name="university" required className={field} placeholder="University" {...NO_PWD} /></div>
                <div><label className={label} htmlFor="graduation">Graduation</label>
                  <select id="graduation" name="graduation" required className={field} defaultValue="">
                    <option value="" disabled>Year</option>{APPLY.years.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select></div>
                <div><label className={label} htmlFor="city">City</label>
                  <input id="city" name="city" required className={field} placeholder="City" {...NO_PWD} /></div>
              </div>
              <div><label className={label} htmlFor="link">A link to something you built or made</label><input id="link" name="link" type="url" required className={field} placeholder="https://" {...NO_PWD} /></div>
              <div><label className={label} htmlFor="shipped">One thing you shipped, in two sentences</label>
                <textarea id="shipped" name="shipped" required maxLength={1200} rows={4} className={`${field} h-auto py-3 resize-y`} placeholder="What it was, who used it, what happened." {...NO_PWD} /></div>
              <div><label className={label} htmlFor="handle">Optional: X, LinkedIn or ImagineArt handle</label><input id="handle" name="handle" className={field} placeholder="@" {...NO_PWD} /></div>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="relative">
                  <button type="submit" disabled={state === "sending"} className="inline-flex items-center justify-center h-12 px-7 rounded-[24px] bg-ink text-paper font-medium text-[15px] transition-transform hover:-translate-y-px disabled:opacity-60">
                    {state === "sending" ? "Sending…" : APPLY.submit}
                  </button>
                  {/* The line ends here. */}
                  <span data-line="end" data-line-x="left" data-line-y="center" className="absolute left-[-2px] top-1/2 w-1 h-1" aria-hidden="true" />
                </div>
                {state === "fail" && <p className="m-0 text-[14px] text-signal-deep">{APPLY.failure}</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
