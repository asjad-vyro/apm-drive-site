/** Single source of truth for URLs and identity strings. */
export const SITE = {
  title: "APM Drive 2026 | ImagineArt",
  description:
    "ImagineArt is hiring a batch of Associate Product Managers in Islamabad. Fresh graduates and people within a year of graduating, from FAST, LUMS and NUST. Own a product used by millions in your first year.",
  // TODO(deploy): replace with the production host once the domain is decided.
  url: "https://apm-drive-site.vercel.app",
  imagineArt: "https://www.imagine.art",
  ashbyBoard: "https://jobs.ashbyhq.com/imagineart",
  applyAnchor: "#apply",
} as const;

export const NAV_LINKS = [
  { label: "Why", href: "#why" },
  { label: "Growth", href: "#growth" },
  { label: "Team", href: "#team" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;
