/** Mirrors backend website-service-area.ts — keep in sync when coverage changes. */
export const SERVICE_AREA_PINCODES = new Set([
  "201001",
  "201002",
  "201003",
  "201005",
  "201006",
  "201007",
  "201009",
  "201010",
  "201011",
  "201013",
  "201014",
  "201015",
  "201016",
  "201017",
  "201018",
  "201301",
  "201303",
  "201304",
  "201305",
  "201306",
  "201307",
  "201308",
  "201309",
  "201310",
  "201318",
]);

const LOCALITY_PATTERNS = [
  /\braj\s*nagar\s*(extn?|extension|rne)\b/i,
  /\brajnagar\s*(extn?|extension|rne)\b/i,
  /\braj\s*nagar\b/i,
  /\brajnagar\b/i,
  /\bkavi\s*nagar\b/i,
  /\bkavinagar\b/i,
  /\bindirapuram\b/i,
  /\bnoida\s*ext(ension)?\b/i,
  /\bgreater\s*noida\s*west\b/i,
  /\bgaur\s*city\b/i,
  /\bcrossing\s*republik\b/i,
  /\bvasundhara\b/i,
  /\bvaishali\b/i,
  /\bahinsa\s*khand\b/i,
  /\bsidharth\s*vihar\b/i,
  /\bkanawani\b/i,
  /\bdundahera\b/i,
  /\bbhopura\b/i,
  /\bsahibabad\b/i,
  /\bkaushambi\b/i,
];

export const SERVICE_AREA_HELP =
  "We pick up in Raj Nagar, Raj Nagar Extension, Kavi Nagar, Indirapuram, Noida Extension and neighbouring societies in between (Vasundhara, Vaishali, Crossing Republik).";

export function isLocallyServiceable(pincode, addressLine) {
  const pin = String(pincode || "").replace(/\D/g, "").slice(0, 6);
  if (pin.length === 6 && SERVICE_AREA_PINCODES.has(pin)) return true;
  const text = String(addressLine || "");
  return LOCALITY_PATTERNS.some((re) => re.test(text));
}
