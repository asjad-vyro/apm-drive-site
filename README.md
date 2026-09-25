# ImagineArt APM Drive — site

Recruiting site for the 2026 Associate Product Manager batch drive (Islamabad; FAST, LUMS, NUST). Built 2026-09-25 from the brief in the Slack group DM "Hiring APM's drive" and the research in `~/recruitment-site-context/`.

## Concept

**"One line, generated."** A single continuous line runs from the headline's underline to the submit button. It becomes the APM → Group PM curve, threads the scope timeline and the company milestones, lifts from Islamabad to San Francisco, ticks through the six process steps and closes on the apply button. Scroll draws it. The hero image resolves from coarse blocks to full detail the way a generation resolves; it is ImagineArt's own published showcase output, labelled as such. One kinetic block ("for you if / not for you if") is pinned and stamps in line by line.

Design references, in order of influence: Linear (typographic restraint, numbered principles), the Ai in Design Report 2026 (charts that draw themselves), Ramp (people as receipts), PostHog (transparency artifacts, humour as culture test), Perplexity (published process), Raycast (the whole team, named).

## Stack

Next.js 15 (App Router) + Tailwind 4 from the ImagineArt campaign-LP kit (Google Sans Flex only, weights 300–600, kit nav and footer). GSAP 3.15 (ScrollTrigger) + Lenis on pointer devices only. No Three.js. First-load JS ≈ 160 KB.

- `components/motion/LineSystem.tsx` — reads every `[data-line]` anchor in DOM order, builds a Catmull-Rom spline through them, scrubs `stroke-dashoffset` on scroll, rides a dot along it and sets `data-lit` on anchors it has passed. Anchors hidden at the current breakpoint are skipped. Recomputes on resize and font load.
- `components/motion/GenerateReveal.tsx` — canvas progressive-resolution reveal computed from the final image. Nothing is faked; under reduced motion the image just shows.
- `components/motion/Stamp.tsx` — pinned, scrubbed stamp-in for the fit block (desktop); simple reveals on mobile.
- `components/motion/Typewriter.tsx`, `Counter.tsx`, `Reveal.tsx` — small, self-explanatory.
- `app/api/apply/route.ts` — receives applications. Delivery: `APPLY_WEBHOOK_URL` (Slack incoming webhook or any JSON endpoint) first, else Vercel Blob via `BLOB_READ_WRITE_TOKEN` (one private JSON per application), else a 503 the form reports honestly.

## Where the words and numbers live

- `lib/data/copy.ts` — every sentence on the page.
- `lib/data/facts.ts` — every number, logo, milestone and event, each with the URL it was taken from. Nothing on the page asserts a figure that is not in this file with a source.
- `lib/data/assets.ts` — hero image and the product surfaces shown in "What you'll ship", each mapped to the imagine.art page it came from.

## Claim safety

Rules from the kit's `references/claims.md` apply. Specifically on this page:

- Numbers: only from `facts.ts`, only with a source URL, only what the source actually says.
- Logos: only publications that actually covered ImagineArt/Vyro, each linked to the article.
- People: names and titles are the current Slack profile titles of the product team. No photos are used; nothing is generated in anyone's likeness.
- Imagery: ImagineArt's own published showcase assets, labelled "Generated with ImagineArt". No stock, no third-party imagery, no generated "employees" or "customers".

## Deliberate deviations from the brief, with reasons

| Brief said | Page does | Why |
|---|---|---|
| "Show our SF office" | Islamabad → SF route board and the events list; no office photos | No office photography exists on any public ImagineArt/Vyro surface. A photo slot is ready in `Places.tsx`; add real photos, never generated ones. |
| "Include team photos" | Typographic team wall, names + titles | No public team photography; using Slack avatars without consent is not acceptable on a public page. Add photos once each person agrees. |
| "In depth growth curves" | Role curve (ladder with what you own at each level), scope curve (week 1 → year 1), company curve (public milestones) | Individual career timelines (who was promoted when) were not publicly verifiable and were not requested from the team per the "don't wait" instruction. |
| Perks list | Rewritten as four trust lines under the route board | Benefit grids above the fold read as a template; the research shows perks work as culture signals, not a list. |

## Decisions still needed before the domain goes live (`TODO(marketing)`)

1. **Compensation.** The page says "we say the number in the first conversation". Confirm that is the policy, or replace with a band.
2. **The SF opportunity.** The page says it is a chance, earned, not scheduled. Confirm the actual terms.
3. **In-person.** The page says the product team works from the Islamabad office and the role is in person. Confirm.
4. **Process and the two-week promise.** Steps and durations in `PROCESS` are a proposal: apply → meet us (campus or call) → first interview (30 min) → product case day (half day, Islamabad) → final conversation with product leadership and founders (45 min) → offer. Confirm, and confirm the team will honour "you hear back within two weeks".
5. **Ladder definitions and the six "how product works" lines.** Written to reflect the org as observed; Saad should edit.
6. **Campus dates.** `PROCESS.datesNote` promises dates on this page first. Add them when set.
7. **Application delivery.** Set `APPLY_WEBHOOK_URL` (Slack incoming webhook to a channel such as `#apm-applications`) or provision Vercel Blob. Until one is set the form returns a 503 and shows the failure line.
8. **Ashby.** Create the APM posting on jobs.ashbyhq.com/imagineart so the role exists in the system of record; keep seat count in one place.
9. **Domain** (`apm.imagine.art` or a path on imagine.art) and update `metadataBase` in `app/layout.tsx` and `SITE.url`.

## Running

```
pnpm install
pnpm dev                                  # http://localhost:3000 (or the next free port)
BASE=http://localhost:3001 node scripts/shots.mjs 1440 d   # scrolling screenshots → scripts/shots/
node scripts/og.mjs                       # regenerate the OG card
pnpm build
```

Verification done on 2026-09-25: scrolling screenshots at 1440 and 390, zero broken images, no console errors, production build clean.

## Candidate-facing copy rule

The page is public. It never names target universities or cities, never says "batch" or "drive", never names internal screeners or internal titles, and never describes internal sourcing. The team section lists names only, grouped Product and Design. The role title appears once in the hero and once on the career curve.
