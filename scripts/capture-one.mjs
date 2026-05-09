// One-off capture for debugging a single site.
// Usage: node scripts/capture-one.mjs <name> <url>
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "showcase");
const [name, url] = process.argv.slice(2);

if (!name || !url) {
  console.error("Usage: node scripts/capture-one.mjs <name> <url>");
  process.exit(1);
}

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});

const page = await context.newPage();

// Log what the server actually returns so we can see if it's a 403 vs real content
page.on("response", (resp) => {
  if (resp.url() === url) {
    console.log(`response: ${resp.status()} ${resp.url()}`);
  }
});

console.log("→", url);
const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
console.log("main response status:", resp?.status());
await page.waitForTimeout(4000);
await page.screenshot({
  path: path.join(OUT, `${name}.png`),
  fullPage: false,
});
console.log("✓ saved", `${name}.png`);

await browser.close();
