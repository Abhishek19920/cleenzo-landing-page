/**
 * Generate Cleenzo Ghaziabad rate list PDF from src/data/ghaziabadPricing.js
 * Output: public/cleenzo-rate-list-ghaziabad.pdf
 */
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const OUTPUT = path.join(__dirname, "..", "public", "cleenzo-rate-list-ghaziabad.pdf");
const PRICING_FILE = path.join(__dirname, "..", "src", "data", "ghaziabadPricing.js");

const BRAND = {
  navy: "#0A3D91",
  sky: "#7EC8E3",
  text: "#1e293b",
  muted: "#64748b",
  line: "#e2e8f0",
};

const MARGIN = 48;
const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function loadPricing() {
  let code = fs.readFileSync(PRICING_FILE, "utf8");
  code = code.replace("export const GHAZIABAD_PRICING", "const GHAZIABAD_PRICING");
  code += "\nmodule.exports = { GHAZIABAD_PRICING };";
  const m = new module.constructor();
  m._compile(code, PRICING_FILE);
  return m.exports.GHAZIABAD_PRICING;
}

function formatInr(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function ensureSpace(doc, y, needed = 40) {
  if (y + needed > PAGE_HEIGHT - MARGIN - 30) {
    doc.addPage();
    return MARGIN + 10;
  }
  return y;
}

function drawPageFooter(doc, pageNum) {
  const y = PAGE_HEIGHT - MARGIN + 8;
  doc
    .fontSize(8)
    .fillColor(BRAND.muted)
    .text(
      `Cleenzo — LGF-19, AVS City Square, Raj Nagar Extension, Ghaziabad 201017 · +91 99992 25311 · www.cleenzo.co.in`,
      MARGIN,
      y,
      { width: CONTENT_WIDTH, align: "center" },
    );
  doc.text(`Page ${pageNum}`, MARGIN, y, { width: CONTENT_WIDTH, align: "right" });
}

function drawHeader(doc) {
  doc.rect(0, 0, PAGE_WIDTH, 110).fill(BRAND.navy);
  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(26)
    .text("Cleenzo", MARGIN, 32);
  doc
    .fontSize(14)
    .font("Helvetica")
    .text("Rate List — Ghaziabad · Raj Nagar Extension", MARGIN, 62);
  doc
    .fontSize(10)
    .text("Laundry · Dry Cleaning · Steam Press · Free pickup & delivery", MARGIN, 82);
  doc
    .fontSize(9)
    .text("Generated from cleenzo.co.in pricing · Prices in INR", MARGIN, 98, {
      align: "right",
      width: CONTENT_WIDTH,
    });
  doc.fillColor(BRAND.text);
  return 130;
}

function drawPromoStrip(doc, y, text) {
  y = ensureSpace(doc, y, 36);
  doc
    .roundedRect(MARGIN, y, CONTENT_WIDTH, 28, 6)
    .fillAndStroke("#eff6ff", BRAND.sky);
  doc
    .fillColor(BRAND.navy)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(text, MARGIN + 12, y + 9, { width: CONTENT_WIDTH - 24 });
  doc.fillColor(BRAND.text);
  return y + 40;
}

function drawSectionTitle(doc, y, title, subtitle) {
  y = ensureSpace(doc, y, 50);
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor(BRAND.navy)
    .text(title, MARGIN, y);
  y += 22;
  if (subtitle) {
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(BRAND.muted)
      .text(subtitle, MARGIN, y);
    y += 16;
  }
  doc.fillColor(BRAND.text);
  return y;
}

function drawCategoryTitle(doc, y, label) {
  y = ensureSpace(doc, y, 28);
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(BRAND.navy)
    .text(label, MARGIN, y);
  doc
    .moveTo(MARGIN, y + 14)
    .lineTo(PAGE_WIDTH - MARGIN, y + 14)
    .strokeColor(BRAND.line)
    .lineWidth(0.5)
    .stroke();
  doc.fillColor(BRAND.text);
  return y + 22;
}

function drawPriceRow(doc, y, name, price, unit) {
  y = ensureSpace(doc, y, 18);
  const priceText = unit === "kg" ? `${formatInr(price)}/kg` : formatInr(price);
  doc.font("Helvetica").fontSize(9).fillColor(BRAND.text).text(name, MARGIN, y, {
    width: CONTENT_WIDTH - 80,
  });
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(BRAND.navy)
    .text(priceText, MARGIN, y, { width: CONTENT_WIDTH, align: "right" });
  return y + 16;
}

function drawKgCards(doc, y, kgServices) {
  y = ensureSpace(doc, y, 90);
  const cardW = (CONTENT_WIDTH - 16) / 3;
  kgServices.forEach((service, i) => {
    const x = MARGIN + i * (cardW + 8);
    doc.roundedRect(x, y, cardW, 72, 6).strokeColor(BRAND.navy).lineWidth(1).stroke();
    doc
      .font("Helvetica-Bold")
      .fontSize(7)
      .fillColor(BRAND.muted)
      .text(service.subGroup.toUpperCase(), x + 8, y + 8, { width: cardW - 16 });
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(BRAND.text)
      .text(service.name, x + 8, y + 20, { width: cardW - 16 });
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor(BRAND.navy)
      .text(`${formatInr(service.price)}/kg`, x + 8, y + 38, { width: cardW - 16 });
    doc
      .font("Helvetica")
      .fontSize(7)
      .fillColor(BRAND.muted)
      .text(service.turnaround, x + 8, y + 58, { width: cardW - 16 });
  });
  doc.fillColor(BRAND.text);
  return y + 88;
}

function drawAddons(doc, y, addons) {
  if (!addons?.length) return y;
  y = ensureSpace(doc, y, 30);
  y = drawCategoryTitle(doc, y, "Add-ons");
  for (const addon of addons) {
    y = drawPriceRow(doc, y, addon.name, addon.price, "pc");
  }
  return y + 8;
}

function drawServiceSection(doc, y, pricing, serviceTab) {
  const unit = serviceTab.unit;
  y = drawSectionTitle(
    doc,
    y,
    serviceTab.label,
    `Turnaround: ${serviceTab.turnaround} · Rates per ${unit === "kg" ? "kg" : "piece"}`,
  );

  if (serviceTab.id === "kg-wash") {
    y = drawKgCards(doc, y, pricing.kgServices);
    y += 8;
  }

  const serviceItems = pricing.items[serviceTab.id] || {};
  for (const section of pricing.sectionTabs) {
    const items = serviceItems[section.id];
    if (!items?.length) continue;
    y = drawCategoryTitle(doc, y, section.label);
    for (const item of items) {
      y = drawPriceRow(doc, y, item.name, item.price, unit);
    }
    y += 6;
  }

  y = drawAddons(doc, y, pricing.addons[serviceTab.id]);
  return y + 16;
}

function main() {
  const pricing = loadPricing();
  const doc = new PDFDocument({ size: "A4", margin: 0, bufferPages: true });
  const stream = fs.createWriteStream(OUTPUT);
  doc.pipe(stream);

  let y = drawHeader(doc);
  y = drawPromoStrip(doc, y, pricing.promoStrip);

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(BRAND.muted)
    .text(
      "All prices are for Ghaziabad (Raj Nagar Extension). T&C apply. Visit cleenzo.co.in or WhatsApp +91 99992 25311 to book pickup.",
      MARGIN,
      y,
      { width: CONTENT_WIDTH },
    );
  y += 36;

  for (const serviceTab of pricing.serviceTabs) {
    y = drawServiceSection(doc, y, pricing, serviceTab);
  }

  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    drawPageFooter(doc, i + 1);
  }

  doc.end();

  stream.on("finish", () => {
    const stats = fs.statSync(OUTPUT);
    console.log(`Generated ${OUTPUT} (${(stats.size / 1024).toFixed(1)} KB)`);
  });
}

main();
