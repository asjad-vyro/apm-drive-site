/** Single source of truth for URLs and identity strings. */
export const SITE = {
  title: "Associate Product Manager | ImagineArt Careers",
  description:
    "ImagineArt is hiring Associate Product Managers in Islamabad, for final-year students and recent graduates. Own a product used by millions in your first year.",
  // TODO(deploy): replace with the production host once the domain is decided.
  url: "https://apm-drive-site.vercel.app",
  imagineArt: "https://www.imagine.art",
  ashbyBoard: "https://jobs.ashbyhq.com/imagineart",
  /** Public Ashby sourcing form. Cannot be iframed (X-Frame-Options: DENY), so every Apply opens it in a new tab. */
  applyUrl: "https://jobs.ashbyhq.com/imagineart/form/5f77898f-59e7-4fc3-a25b-4e3551e66e4a",
} as const;

export const NAV_LINKS = [
  { label: "Why", href: "#why" },
  { label: "Growth", href: "#growth" },
  { label: "FAQ", href: "#faq" },
] as const;
