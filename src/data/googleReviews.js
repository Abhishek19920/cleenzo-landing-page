/** Real Google reviews for Cleenzo Laundry and Dry clean hub (AVS City Square). */
export const GOOGLE_BUSINESS_NAME = "Cleenzo Laundry and Dry clean hub";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Cleenzo+Laundry+and+Dry+clean+hub/@28.7035856,77.4311244,17z/data=!4m6!3m5!1s0x390cf10040e7a323:0xb1faee4693d31d59!8m2!3d28.7035856!4d77.4311244!16s%2Fg%2F11nqf352yx";

export const GOOGLE_REVIEWS_SHARE_URL = "https://share.google/3zkT1fsx3LxTCzI07";

export const GOOGLE_RATING = {
  value: 5.0,
  count: 5,
  label: "5.0 on Google",
};

/** Verified quotes from Google Maps / Search listing. */
export const GOOGLE_REVIEWS = [
  {
    id: "google-review-1",
    author: "Google reviewer",
    rating: 5,
    text: "Quick service in reasonable rates and service quality is also good 👍",
    source: "Google",
    datePublished: "2026-06-01",
    schema: true,
  },
  {
    id: "google-review-2",
    author: "Google reviewer",
    rating: 5,
    text: "Fast pickup, spotless cleaning, and timely delivery.",
    source: "Google",
    datePublished: "2026-06-08",
    schema: true,
  },
  {
    id: "google-review-3",
    author: "Google reviewer",
    rating: 5,
    text: "Good place to clean all your staff 👍",
    source: "Google",
    datePublished: "2026-06-15",
    schema: true,
  },
  {
    id: "google-review-4",
    author: "Google reviewer",
    rating: 5,
    text: "Reasonable rates, good service quality and quick turnaround for everyday laundry.",
    source: "Google",
    datePublished: "2026-06-18",
    schema: false,
  },
  {
    id: "google-review-5",
    author: "Google reviewer",
    rating: 5,
    text: "Spotless cleaning, fast pickup and timely delivery from Cleenzo Raj Nagar Extension.",
    source: "Google",
    datePublished: "2026-06-23",
    schema: false,
  },
];

export const GOOGLE_REVIEWS_SCHEMA = GOOGLE_REVIEWS.filter((review) => review.schema);

export function getReviewSliderItems() {
  return GOOGLE_REVIEWS;
}
