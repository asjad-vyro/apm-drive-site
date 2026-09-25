#!/usr/bin/env node
/**
 * Scrolls the page like a person (so ScrollTrigger and lazy images fire) and
 * writes viewport screenshots at intervals plus a full-page capture, at the
 * given width. Usage: node scripts/shots.mjs [width] [label]
 */
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire("/Users/vyro/");
const puppeteer = require("puppeteer-core");
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "scripts", "shots"); mkdirSync(OUT, { recursive: true });
const BASE = process.env.BASE || "http://localhost:3000";
const W = Number(process.argv[2] || 1440), H = W < 500 ? 844 : 900, LABEL = process.argv[3] || `w${W}`;
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--no-sandbox", `--user-data-dir=/tmp/apm-shots-profile-${W}`] });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3200)); // let the prompt type and the hero generate
const total = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += Math.round(H * 0.85)) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
  await new Promise((r) => setTimeout(r, 650));
  await page.screenshot({ path: join(OUT, `${LABEL}-${String(i).padStart(2, "0")}.png`) });
  i++;
}
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: join(OUT, `${LABEL}-full.png`), fullPage: true });
const broken = await page.evaluate(() => Array.from(document.images).filter((im) => im.complete && im.naturalWidth === 0).map((im) => im.getAttribute("src")));
console.log(JSON.stringify({ width: W, height: total, shots: i, broken, errors: errors.slice(0, 10) }, null, 2));
await browser.close();
