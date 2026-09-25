/**
 * Every number, milestone and mention on the page comes from here, and every
 * entry carries the URL it was taken from. Collected 2026-09-25.
 *
 * Deliberately NOT used, because they were only in secondary sources
 * (LinkedIn posts, podcast titles): ARR figures, "next unicorn", DAU counts.
 */
export type Fact = { label: string; value: number; suffix?: string; prefix?: string; decimals?: number; note?: string; source: string };
export type Mention = { outlet: string; domain: string; headline: string; url: string; date?: string; logo?: string };
export type Milestone = { when: string; label: string; source: string };
export type Event = { name: string; where: string; when: string; url: string };

const ABOUT = "https://www.imagine.art/about";

export const RECEIPTS: Fact[] = [
  { label: "people have created on ImagineArt, across web and mobile", value: 30, suffix: "M+", source: ABOUT },
  { label: "monthly active creators on the web product", value: 3, suffix: "M+", source: ABOUT },
  { label: "app downloads", value: 32, suffix: "M+", source: ABOUT },
  { label: "image, video and audio models in one workspace", value: 50, suffix: "+", source: ABOUT },
];

/** The company curve. Wording condensed from ImagineArt's own journey section. */
export const MILESTONES: Milestone[] = [
  { when: "2022", label: "ImagineArt launches as a text-to-image app on web, Android and iOS, built by a small independent team with no major funding.", source: ABOUT },
  { when: "2024", label: "Video generation arrives and the first in-house model family ships. Image, video and more come together in one workspace.", source: ABOUT },
  { when: "Sep 2025", label: "ImagineArt 1.0, the first fully in-house image model, becomes the platform default. ImagineArt 1.5 follows and places third on AI Arena.", source: ABOUT },
  { when: "Late 2025", label: "Apps and the node-based Workflows canvas launch alongside ImagineArt 2.0.", source: ABOUT },
  { when: "May 2026", label: "Film Studio and Ad Studio launch: storyboards and camera control for long-form work, and product links turned into finished ads.", source: ABOUT },
  { when: "Jun 2026", label: "Imagine MCP connects ImagineArt to Claude, Cursor and other agents. The Imagine Plugin brings generation into the editing timeline.", source: ABOUT },
  { when: "Aug 2026", label: "Fashion Studio launches, then Imagine Computer: an agent that plans and carries out creative work across tools.", source: "https://www.financialcontent.com/article/abnewswire-2026-8-29-imagineart-launches-imagine-computer-bringing-agentic-ai-to-creative-workflows" },
];

export const MENTIONS: Mention[] = [
  { outlet: "TechJuice", domain: "techjuice.pk", headline: "Pakistani Startup Vyro AI Releases ImagineArt 1.5, Sets New Bar for Photoreal-AI", url: "https://www.techjuice.pk/pakistani-startup-vyro-ai-releases-imagineart-1-5-sets-new-bar-for-photoreal-ai/amp/" },
  { outlet: "TechJuice", domain: "techjuice.pk", headline: "Pakistani Startup Successfully Surpasses Leading AI Image Generators in Photorealism", url: "https://www.techjuice.pk/pakistani-startup-successfully-surpasses-leading-ai-image-generators-in-photorealism/" },
  { outlet: "We Talk Startups", domain: "wetalkstartups.com", headline: "Bootstrapped Pakistani AI Startup Vyro.ai Beats Global Giants in Image Generation Rankings", url: "https://wetalkstartups.com/2025/11/vyro-ai-imagine-1-5/", date: "Nov 2025" },
  { outlet: "Klever Content", domain: "klevercontent.com", headline: "ImagineArt by Vyro.ai Ranks Among the World's Top 3 Text-to-Image Models", url: "https://klevercontent.com/pakistans-ai-powerhouse-imagineart-by-vyro-ai-ranks-among-the-worlds-top-3-text-to-image-models/" },
  { outlet: "Gadinsider", domain: "gadinsider.com", headline: "Pakistan's ImagineArt recognised as 'world's most realistic' AI image generator", url: "https://www.gadinsider.com/pakistans-imagineart-recognised-as-worlds-most-realistic-ai-image-generator-24439" },
  { outlet: "Think with Google", domain: "business.google.com", headline: "Vyro AI's app roadmap to grow profitably", url: "https://business.google.com/ca-en/think/future-of-marketing/ai-app-roadmap-grow-profitably/" },
  { outlet: "Stripe", domain: "stripe.com", headline: "Vyro uses Stripe to power global expansion of its AI SaaS platform", url: "https://stripe.com/customers/vyro-ai" },
  { outlet: "Unite.AI", domain: "unite.ai", headline: "10 Best AI Art Generators: ImagineArt listed first", url: "https://www.unite.ai/ai-art-generators/", date: "Sep 2026" },
  { outlet: "Artificial Analysis", domain: "artificialanalysis.ai", headline: "ImagineArt's own models on the text-to-image leaderboard", url: "https://artificialanalysis.ai/image/leaderboard/text-to-image" },
  { outlet: "FinancialContent", domain: "financialcontent.com", headline: "ImagineArt Launches Imagine Computer, Bringing Agentic AI to Creative Workflows", url: "https://www.financialcontent.com/article/abnewswire-2026-8-29-imagineart-launches-imagine-computer-bringing-agentic-ai-to-creative-workflows", date: "Aug 2026" },
  { outlet: "FinancialContent", domain: "financialcontent.com", headline: "ImagineArt Launches AI Fashion Studio", url: "https://www.financialcontent.com/article/newsfile-2026-8-11-imagineart-launches-ai-fashion-studio", date: "Aug 2026" },
  { outlet: "Filmora", domain: "filmora.wondershare.com", headline: "ImagineArt 2026 Review: Features, Pricing & More", url: "https://filmora.wondershare.com/video-editor-review/imagineart-review.html" },
];

/** No event appearances could be verified from public sources; add real ones only. */
export const EVENTS: Event[] = [];
export const SF_ADDRESS: string | null = null;
