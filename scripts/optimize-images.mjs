import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const PUBLIC = path.resolve("public");

const targets = [
  { dir: "showcase", maxWidth: 1920, quality: 88 },
  { dir: "system-builds", maxWidth: 1920, quality: 88 },
];

const rootFiles = [
  { name: "aj-about.png", maxWidth: 1600, quality: 88 },
  { name: "aj-profile.png", maxWidth: 800, quality: 90 },
  { name: "ecommerce-thumbnail.png", maxWidth: 1920, quality: 88 },
  { name: "pipeline-lead-capture.png", maxWidth: 1600, quality: 88 },
  { name: "pipeline-app-booking.png", maxWidth: 1600, quality: 88 },
  { name: "pipeline-sales.png", maxWidth: 1600, quality: 88 },
  { name: "pipeline-order.png", maxWidth: 1600, quality: 88 },
  { name: "pipeline-nurture.png", maxWidth: 1600, quality: 88 },
  { name: "pipeline-reservation.png", maxWidth: 1600, quality: 88 },
  { name: "pipeline-high-ticket.png", maxWidth: 1600, quality: 88 },
  { name: "pipeline-client-onboarding.png", maxWidth: 1600, quality: 88 },
];

async function convertOne(srcAbs, { maxWidth, quality }) {
  const webpAbs = srcAbs.replace(/\.png$/i, ".webp");
  const meta = await sharp(srcAbs).metadata();
  const beforeBytes = (await stat(srcAbs)).size;

  const pipeline = sharp(srcAbs);
  if (meta.width && meta.width > maxWidth) {
    pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  await pipeline.webp({ quality, effort: 6 }).toFile(webpAbs);

  const afterBytes = (await stat(webpAbs)).size;
  const saved = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(1);
  console.log(
    `  ${path.relative(PUBLIC, srcAbs)} -> ${(beforeBytes / 1024).toFixed(0)} KB -> ${(afterBytes / 1024).toFixed(0)} KB (-${saved}%)`,
  );
}

for (const t of targets) {
  const dirAbs = path.join(PUBLIC, t.dir);
  const files = (await readdir(dirAbs)).filter((f) => f.toLowerCase().endsWith(".png"));
  console.log(`\n[${t.dir}] ${files.length} files`);
  for (const f of files) {
    await convertOne(path.join(dirAbs, f), t);
  }
}

console.log(`\n[root] ${rootFiles.length} files`);
for (const f of rootFiles) {
  await convertOne(path.join(PUBLIC, f.name), f);
}

console.log("\nDone.");
