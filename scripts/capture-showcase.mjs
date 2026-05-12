import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "showcase");
const BASE = "https://workwithaj.ajautomate.co";

const pages = [
  { slug: "/about", name: "about" },
  { slug: "/projects", name: "portfolio" },
  { slug: "/services", name: "services" },
  { slug: "/packages", name: "packages" },
];

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
// Phone-sized viewport so the captured image already looks mobile-mockup-y
const context = await browser.newContext({
  viewport: { width: 420, height: 720 },
  deviceScaleFactor: 2,
});

for (const p of pages) {
  const url = BASE + p.slug;
  console.log("→", url);
  const page = await context.newPage();
  await page.addInitScript(() => {
    try { sessionStorage.setItem("intro-played", "1"); } catch (_) {}
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  // Capture only the visible viewport (top of page) — that's the "mockup" hero
  await page.screenshot({
    path: path.join(OUT, `${p.name}.png`),
    fullPage: false,
  });
  console.log("   ✓ saved", `${p.name}.png`);
  await page.close();
}

await browser.close();
console.log("Done.");
