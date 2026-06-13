// Extracts layout metrics from a page for visual comparison.
// Usage: node scripts/measure.mjs <url> [width]
import { chromium } from "playwright-core";

const url = process.argv[2];
const width = Number(process.argv[3] || 1440);
if (!url) {
  console.error("usage: node scripts/measure.mjs <url> [width]");
  process.exit(1);
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
const ctx = await browser.newContext({ viewport: { width, height: 900 } });
const page = await ctx.newPage();
try {
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
} catch {}
await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  const cs = (el) => getComputedStyle(el);
  const box = (el) => {
    const r = el.getBoundingClientRect();
    const sy = window.scrollY;
    return {
      x: Math.round(r.x),
      y: Math.round(r.y + sy),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  };
  const textInfo = (el) => {
    const c = cs(el);
    return {
      text: (el.textContent || "").trim().slice(0, 80),
      fontFamily: c.fontFamily.slice(0, 60),
      fontSize: c.fontSize,
      fontWeight: c.fontWeight,
      lineHeight: c.lineHeight,
      letterSpacing: c.letterSpacing,
      textTransform: c.textTransform,
      color: c.color,
      ...box(el),
    };
  };

  const out = {};
  out.title = document.title;
  out.bodyBg = cs(document.body).backgroundColor;
  out.htmlBg = cs(document.documentElement).backgroundColor;
  out.bodyFont = cs(document.body).fontFamily;
  out.docHeight = Math.round(document.documentElement.scrollHeight);

  // all links (nav)
  out.links = [...document.querySelectorAll("a")].slice(0, 20).map(textInfo);

  // headings-ish: first few block text nodes
  out.headers = [...document.querySelectorAll("h1,h2,h3,header *")]
    .slice(0, 10)
    .map(textInfo);

  // images
  const imgs = [...document.querySelectorAll("img")];
  out.imgCount = imgs.length;
  out.imgs = imgs.slice(0, 12).map((im) => ({
    src: im.currentSrc.split("/").slice(-2).join("/").slice(0, 70),
    natural: `${im.naturalWidth}x${im.naturalHeight}`,
    objectFit: cs(im).objectFit,
    ...box(im),
  }));
  return out;
});

console.log(JSON.stringify(data, null, 1));
await browser.close();
