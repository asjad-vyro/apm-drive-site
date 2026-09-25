#!/usr/bin/env node
/** Renders the OG card (1200x630) from SVG with sharp. No generated imagery, no claims. */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const font = readFileSync(join(ROOT, "app/fonts/google-sans-flex.woff2")).toString("base64");
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><style>@font-face{font-family:GS;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;}</style></defs>
  <rect width="1200" height="630" fill="#f7f6f2"/>
  <path d="M 84 452 C 260 452, 300 330, 470 330 S 700 214, 860 214 S 1060 128, 1128 96" fill="none" stroke="#ff4d1c" stroke-width="5" stroke-linecap="round"/>
  <circle cx="1128" cy="96" r="9" fill="#ff4d1c"/>
  <text x="84" y="128" font-family="GS" font-weight="500" font-size="22" fill="#74726c" letter-spacing="2">IMAGINEART CAREERS · ISLAMABAD</text>
  <text x="84" y="252" font-family="GS" font-weight="500" font-size="84" letter-spacing="-3" fill="#121212">Own a product used</text>
  <text x="84" y="340" font-family="GS" font-weight="500" font-size="84" letter-spacing="-3" fill="#121212">by millions.</text>
  <text x="84" y="428" font-family="GS" font-weight="500" font-size="84" letter-spacing="-3" fill="#121212">In your first year.</text>
  <text x="84" y="548" font-family="GS" font-weight="400" font-size="26" fill="#3c3b38">Associate Product Manager · for final-year students and recent graduates</text>
</svg>`;
await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(join(ROOT, "public/assets/og-image.webp"));
await sharp(Buffer.from(svg)).png().toFile(join(ROOT, "public/assets/og-image.png"));
console.log("og written");
