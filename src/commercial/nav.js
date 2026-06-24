export const RETAIL_SITE_LABEL = "Personal & Home Laundry";
export const RETAIL_SITE_SHORT = "For Homes & Individuals";

export const COMMERCIAL_PAGE_PATH = "/commercial-laundry";

export const COMMERCIAL_SECTIONS = [
  { id: "commercial-industries", label: "Industries" },
  { id: "commercial-workflow", label: "How It Works" },
  { id: "commercial-services", label: "Services" },
  { id: "commercial-trial", label: "Free Trial" },
  { id: "commercial-enquiry", label: "Enquire" },
];

/** @deprecated use COMMERCIAL_SECTIONS */
export const COMMERCIAL_NAV_LINKS = COMMERCIAL_SECTIONS.map((section) => ({
  label: section.label,
  href: `#${section.id}`,
}));
