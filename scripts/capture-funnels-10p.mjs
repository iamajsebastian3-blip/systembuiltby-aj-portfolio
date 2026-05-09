import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "showcase");

const targets = [
  { url: "https://primebody-10p.vercel.app/", name: "primebody-10p" },
  { url: "https://funnelmastery-10p.vercel.app/", name: "funnelmastery-10p" },
  { url: "https://bloom-10p.vercel.app/", name: "bloom-10p" },
];

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1.5,
});

for (const t of targets) {
  console.log("→", t.url);
  const page = await context.newPage();
  await page.goto(t.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(OUT, `${t.name}.png`),
    fullPage: false,
  });
  console.log("   ✓ saved", `${t.name}.png`);
  await page.close();
}

await browser.close();
console.log("Done.");
