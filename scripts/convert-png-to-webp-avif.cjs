#!/usr/bin/env node
/**
 * Convert PNGs in a directory to WebP + AVIF (same folder, web-safe filenames).
 * Usage: node scripts/convert-png-to-webp-avif.cjs /path/to/images
 */
const fs = require("fs");
const path = require("path");

const inputDir = process.argv[2];
if (!inputDir) {
  console.error("Usage: node convert-png-to-webp-avif.cjs <directory>");
  process.exit(1);
}

const absDir = path.resolve(inputDir);
if (!fs.existsSync(absDir)) {
  console.error("Directory not found:", absDir);
  process.exit(1);
}

function slugifyBase(name) {
  return name
    .replace(/\.png$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

async function main() {
  const sharp = require("sharp");

  const pngs = fs
    .readdirSync(absDir)
    .filter((f) => f.toLowerCase().endsWith(".png"))
    .sort();

  if (!pngs.length) {
    console.log("No PNG files in", absDir);
    return;
  }

  const manifest = [];
  const usedSlugs = new Set();

  for (const file of pngs) {
    const src = path.join(absDir, file);
    let slug = slugifyBase(file);
    if (usedSlugs.has(slug)) {
      let n = 2;
      while (usedSlugs.has(`${slug}-${n}`)) n += 1;
      slug = `${slug}-${n}`;
    }
    usedSlugs.add(slug);

    const webpOut = path.join(absDir, `${slug}.webp`);
    const avifOut = path.join(absDir, `${slug}.avif`);

    const inputStat = fs.statSync(src);
    await sharp(src)
      .rotate()
      .webp({ quality: 85, effort: 4 })
      .toFile(webpOut);
    await sharp(src)
      .rotate()
      .avif({ quality: 62, effort: 4 })
      .toFile(avifOut);

    const webpStat = fs.statSync(webpOut);
    const avifStat = fs.statSync(avifOut);

    manifest.push({
      source: file,
      webp: path.basename(webpOut),
      avif: path.basename(avifOut),
      bytes: {
        png: inputStat.size,
        webp: webpStat.size,
        avif: avifStat.size,
      },
    });

    console.log(
      `✓ ${file}\n  → ${path.basename(webpOut)} (${(webpStat.size / 1024).toFixed(0)} KB)\n  → ${path.basename(avifOut)} (${(avifStat.size / 1024).toFixed(0)} KB)`,
    );
  }

  fs.writeFileSync(
    path.join(absDir, "conversion-manifest.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), files: manifest }, null, 2),
  );
  console.log(`\nWrote conversion-manifest.json (${manifest.length} images)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
