import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "showcase");

const sites = [
  { name: "casa-lume-hotel",     url: "https://casa-lume-hotel.vercel.app/" },
  { name: "dermaglow-clinic",    url: "https://dermaglow-clinic.vercel.app/" },
  { name: "the-cozy-cup",        url: "https://the-cozy-cup-one.vercel.app/" },
  { name: "lumiere-skin-clinic", url: "https://lumiere-skin-clinic.vercel.app/" },
  { name: "coach-gym-funnel",    url: "https://coach-gym-funnel.vercel.app/" },
  { name: "merbau-beach-resort", url: "https://merbau-beach-resort.vercel.app/" },
  { name: "amberbrew-cafe",      url: "https://amberbrew-cafe.vercel.app/" },
  { name: "smilecraft-dental",   url: "https://smilecraft-dental-ten.vercel.app/" },
];

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
  // Real Chrome UA — Vercel's bot detection 403s the default "HeadlessChrome" UA
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});

for (const site of sites) {
  console.log("→", site.url);
  const page = await context.newPage();
  try {
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 60000 });
    // Give hero animations / lazy images time to settle
    await page.waitForTimeout(2500);
    await page.screenshot({
      path: path.join(OUT, `${site.name}.png`),
      fullPage: false,
    });
    console.log("   ✓ saved", `${site.name}.png`);
  } catch (err) {
    console.error("   ✗ failed:", site.name, "—", err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("Done.");
