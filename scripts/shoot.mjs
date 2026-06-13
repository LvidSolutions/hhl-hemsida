// Screenshot harness: captures pages from a base URL at multiple viewports.
// Usage: node scripts/shoot.mjs <baseUrl> <outPrefix> [path1 path2 ...]
// Example: node scripts/shoot.mjs https://hhl.se ref / /projects /practice /news
import { chromium } from "playwright-core";
import { mkdirSync } from "fs";

const [baseUrl, prefix, ...paths] = process.argv.slice(2);
if (!baseUrl || !prefix) {
  console.error("usage: node scripts/shoot.mjs <baseUrl> <outPrefix> [paths...]");
  process.exit(1);
}
const pagePaths = paths.length ? paths : ["/"];
const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1280", width: 1280, height: 800 },
  { name: "390", width: 390, height: 844 },
];

mkdirSync("shots", { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    for (const p of pagePaths) {
      const url = baseUrl.replace(/\/$/, "") + p;
      const slug = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_");
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      } catch {
        // networkidle may never settle (long-polling etc.) — proceed with what loaded
      }
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: `shots/${prefix}-${slug}-${vp.name}-full.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `shots/${prefix}-${slug}-${vp.name}-fold.png`,
      });
      console.log(`shot ${prefix} ${slug} @${vp.name}`);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
