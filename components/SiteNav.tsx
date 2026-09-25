"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2">
      <img src="/assets/imagine-logo.svg" alt="ImagineArt" className="w-[26px] h-[26px] rounded-[8px] shrink-0" />
      <span className="font-display font-semibold text-[19px] tracking-[-0.4px] text-ink">ImagineArt</span>
      <span aria-hidden="true" className="w-px h-[18px] bg-line-2" />
      <span className="font-display font-medium text-[17px] tracking-[-0.3px] text-ink-3">APM Drive</span>
    </span>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60]" style={{ padding: scrolled ? "10px 16px" : "16px", transition: "padding 0.3s ease" }}>
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: scrolled ? "min(1180px, calc(100vw - 32px))" : "calc(100vw - 32px)",
            padding: scrolled ? "8px 12px 8px 16px" : "10px 12px 10px 20px",
            borderRadius: "28px",
            background: scrolled ? "rgba(247,246,242,0.82)" : "transparent",
            border: scrolled ? "1px solid rgba(18,18,18,0.08)" : "1px solid transparent",
            backdropFilter: scrolled ? "blur(28px) saturate(160%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(28px) saturate(160%)" : "none",
            boxShadow: scrolled ? "0 16px 40px rgba(18,18,18,0.10), 0 2px 6px rgba(18,18,18,0.04)" : "none",
            transition: "max-width 0.48s cubic-bezier(0.22,1,0.36,1), padding 0.48s cubic-bezier(0.22,1,0.36,1), background 0.48s cubic-bezier(0.22,1,0.36,1), box-shadow 0.48s cubic-bezier(0.22,1,0.36,1), border-color 0.48s",
          }}
        >
          <a href="#top" className="inline-flex items-center shrink-0" aria-label="ImagineArt APM Drive, back to top">
            <Wordmark />
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="px-[14px] py-[6px] rounded-lg font-sans text-[14px] font-medium tracking-[0.1px] whitespace-nowrap text-ink-2 hover:text-ink hover:bg-ink/5 transition-colors duration-150">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href={SITE.applyAnchor} className="inline-flex items-center justify-center h-[38px] px-[20px] rounded-[22px] font-sans text-[14px] font-medium bg-ink text-paper transition-transform duration-200 hover:-translate-y-px">
              Apply
            </a>
          </div>

          <button onClick={() => setMenuOpen((o) => !o)} className="lg:hidden flex items-center justify-center w-[38px] h-[38px] rounded-[10px] border-none cursor-pointer bg-transparent text-ink" aria-label={menuOpen ? "Close menu" : "Open menu"}>
            <span className="flex flex-col gap-[5px]">
              <span className="block w-[18px] h-[1.5px] rounded-sm bg-current transition-transform duration-[250ms]" style={{ transform: menuOpen ? "translateY(3.25px) rotate(45deg)" : "none" }} />
              <span className="block w-[18px] h-[1.5px] rounded-sm bg-current transition-transform duration-[250ms]" style={{ transform: menuOpen ? "translateY(-3.25px) rotate(-45deg)" : "none" }} />
            </span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[101] bg-paper flex flex-col" style={{ animation: "mobileMenuIn 0.22s cubic-bezier(0.4,0,0.2,1) forwards" }}>
          <div className="flex items-center justify-between px-6 py-[18px] shrink-0">
            <a href="#top" onClick={() => setMenuOpen(false)} className="inline-flex items-center" aria-label="Back to top"><Wordmark /></a>
            <button onClick={() => setMenuOpen(false)} className="flex items-center justify-center p-1 border-none bg-transparent cursor-pointer text-ink-3" aria-label="Close menu">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center pb-10">
            <div className="flex flex-col items-center gap-1">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-center px-8 py-2.5 rounded-[10px] font-sans text-[26px] font-light tracking-[-0.3px] text-ink-2">{l.label}</a>
              ))}
            </div>
            <div className="w-[calc(100%-48px)] h-px bg-line my-4" />
            <a href={SITE.applyAnchor} onClick={() => setMenuOpen(false)} className="bg-ink text-paper inline-flex items-center justify-center h-11 px-6 rounded-[22px] font-sans text-[14px] font-medium">Apply</a>
          </div>
        </div>
      )}
    </>
  );
}
