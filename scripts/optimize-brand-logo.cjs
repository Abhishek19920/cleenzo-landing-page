#!/usr/bin/env node
/**
 * Brand logo: resize for nav/footer + WebP/AVIF with transparent background.
 * Usage: node scripts/optimize-brand-logo.cjs [source-image] [--key black|white]
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT_DIR = path.join(__dirname, "..", "src", "assets", "image");
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const keyArg = process.argv.find((a) => a.startsWith("--key="));
const KEY = keyArg ? keyArg.split("=")[1] : "black";

const defaultSrc = path.join(OUT_DIR, "cleenzo-logo.png");
const src = path.resolve(args[0] || defaultSrc);

/** Max CSS width ~192px (footer md:w-48) × 2 for retina */
const MAX_WIDTH = 384;

/** Pixels at or below this (black key) or above (white key) become transparent. */
const BLACK_THRESHOLD = 28;
const WHITE_THRESHOLD = 245;

async function applyTransparency(rgba, width, height) {
  const out = Buffer.from(rgba);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    let transparent = false;

    if (KEY === "white") {
      transparent =
        r >= WHITE_THRESHOLD &&
        g >= WHITE_THRESHOLD &&
        b >= WHITE_THRESHOLD;
    } else {
      transparent =
        r <= BLACK_THRESHOLD &&
        g <= BLACK_THRESHOLD &&
        b <= BLACK_THRESHOLD;
    }

    if (transparent) {
      out[i + 3] = 0;
    }
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function main() {
  if (!fs.existsSync(src)) {
    console.error("Source not found:", src);
    process.exit(1);
  }

  const meta = await sharp(src).metadata();
  const width = Math.min(MAX_WIDTH, meta.width || MAX_WIDTH);
  const height = Math.round((width / (meta.width || width)) * (meta.height || width));

  const { data, info } = await sharp(src)
    .rotate()
    .resize(width, height, { fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const transparent = await applyTransparency(data, info.width, info.height);

  const pngOut = path.join(OUT_DIR, "cleenzo-logo.png");
  const webpOut = path.join(OUT_DIR, "cleenzo-logo.webp");
  const avifOut = path.join(OUT_DIR, "cleenzo-logo.avif");

  await transparent
    .clone()
    .png({ compressionLevel: 9, effort: 10, palette: false })
    .toFile(pngOut);
  await transparent
    .clone()
    .webp({ quality: 86, effort: 4, alphaQuality: 90 })
    .toFile(webpOut);
  await transparent
    .clone()
    .avif({ quality: 55, effort: 4 })
    .toFile(avifOut);

  const alphaCheck = await sharp(pngOut).metadata();
  const sizes = ["png", "webp", "avif"].map((ext) => {
    const f = path.join(OUT_DIR, `cleenzo-logo.${ext}`);
    return `${ext}: ${(fs.statSync(f).size / 1024).toFixed(1)} KB`;
  });

  console.log(
    `Logo optimized from ${path.basename(src)} → ${info.width}×${info.height}px, key=${KEY}, hasAlpha=${alphaCheck.hasAlpha}`,
  );
  console.log(sizes.join(", "));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
