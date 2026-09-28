#!/usr/bin/env node
/**
 * Builds a framework-free static copy of the site into static/.
 *
 *   pnpm build:static
 *
 * 1. `next build` with output: "export" renders the exact HTML + compiled CSS.
 * 2. This script strips every Next.js runtime script, rewrites paths to be
 *    relative (so the folder works from any host, sub-path or file://), copies
 *    the stylesheet, font and media, and wires in scripts/static/app.js — a
 *    vanilla port of the React behaviour — plus vendored GSAP.
 *
 * Output: static/index.html, static/css/styles.css, static/js/*, static/fonts/*,
 * static/assets/*, static/icon.svg. No build step is needed to host it.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "out");
const DEST = join(ROOT, "static");
if (!existsSync(join(OUT, "index.html"))) throw new Error("out/index.html missing — run STATIC_EXPORT=1 next build first");

rmSync(DEST, { recursive: true, force: true });
mkdirSync(join(DEST, "css"), { recursive: true });
mkdirSync(join(DEST, "js"), { recursive: true });
mkdirSync(join(DEST, "fonts"), { recursive: true });

let html = readFileSync(join(OUT, "index.html"), "utf8");

// --- stylesheet + font --------------------------------------------------------
const cssHref = html.match(/<link rel="stylesheet" href="([^"]+\.css)"[^>]*>/);
if (!cssHref) throw new Error("stylesheet link not found");
let css = readFileSync(join(OUT, cssHref[1]), "utf8");
const fontFiles = new Set();
css = css.replace(/url\(\/_next\/static\/media\/([^)]+\.woff2)\)/g, (_, f) => { fontFiles.add(f); return `url(../fonts/${f})`; });
for (const f of fontFiles) cpSync(join(OUT, "_next/static/media", f), join(DEST, "fonts", f));
writeFileSync(join(DEST, "css/styles.css"), css);

// --- strip the Next.js runtime ------------------------------------------------
const ldJson = [];
html = html.replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, (m) => { ldJson.push(m); return `%%LD${ldJson.length - 1}%%`; });
html = html.replace(/<script\b[\s\S]*?<\/script>/g, "");
html = html.replace(/%%LD(\d+)%%/g, (_, i) => ldJson[Number(i)]);
html = html.replace(/<link rel="preload" as="script"[^>]*\/?>/g, "");
html = html.replace(/<link rel="modulepreload"[^>]*\/?>/g, "");
html = html.replace(/<meta name="next-size-adjust"[^>]*\/?>/g, "");
html = html.replace(/<!--[\s\S]*?-->/g, "");
html = html.replace(/<link rel="stylesheet" href="[^"]+\.css"[^>]*\/?>/, '<link rel="stylesheet" href="css/styles.css"/>');
html = html.replace(/<link rel="preload" href="\/_next\/static\/media\/([^"]+\.woff2)"/g, '<link rel="preload" href="fonts/$1"');
html = html.replace(/<link rel="icon" href="\/icon\.svg[^"]*"/, '<link rel="icon" href="icon.svg"');

// --- relative paths -------------------------------------------------------------
html = html.replace(/(src|href|poster|data-src|data-video)="\/assets\//g, '$1="assets/');
html = html.replace(/(srcSet|srcset)="([^"]*)"/g, (_, a, v) => `${a}="${v.replace(/\/assets\//g, "assets/")}"`);
if (/"\/_next\//.test(html)) throw new Error("a /_next/ reference survived: " + html.match(/.{60}"\/_next\/.{60}/)[0]);

// --- behaviour ------------------------------------------------------------------
const scripts = '<script src="js/gsap.min.js" defer></script><script src="js/ScrollTrigger.min.js" defer></script><script src="js/app.js" defer></script>';
html = html.replace("</body>", scripts + "</body>");
for (const f of ["gsap.min.js", "ScrollTrigger.min.js", "app.js"]) cpSync(join(ROOT, "scripts/static", f), join(DEST, "js", f));

writeFileSync(join(DEST, "index.html"), html);

// --- media ----------------------------------------------------------------------
const used = new Set([...html.matchAll(/assets\/[A-Za-z0-9_\-./]+\.(?:webp|png|svg|mp4|jpg|jpeg)/g)].map((m) => m[0]));
for (const rel of used) {
  const from = join(ROOT, "public", rel);
  if (!existsSync(from)) throw new Error("missing asset " + rel);
  mkdirSync(dirname(join(DEST, rel)), { recursive: true });
  cpSync(from, join(DEST, rel));
}
cpSync(join(ROOT, "public/assets/og-image.webp"), join(DEST, "assets/og-image.webp"));
cpSync(join(ROOT, "app/icon.svg"), join(DEST, "icon.svg"));

console.log(`static/ written: index.html (${html.length} bytes), ${used.size} assets, ${fontFiles.size} font(s)`);
console.log("scripts left in html:", (html.match(/<script/g) || []).length, "(ld+json + 3 local)");
void readdirSync;
