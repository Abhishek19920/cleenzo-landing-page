export function normalizeForMatch(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function hasSearchQuery(searchQuery) {
  return normalizeForMatch(searchQuery).length > 0;
}

export function getFirstLetter(name) {
  const trimmed = name.trim();
  const char = trimmed[0]?.toUpperCase();
  if (char >= "A" && char <= "Z") return char;
  return "#";
}

export function matchesPricingSearch(name, searchQuery) {
  const query = normalizeForMatch(searchQuery);
  if (!query) return true;
  return normalizeForMatch(name).includes(query);
}

/** Prefix matches rank above contains; then A–Z by name */
export function sortPricingSearchResults(items, searchQuery) {
  const query = normalizeForMatch(searchQuery);
  if (!query) {
    return [...items].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
  }

  return [...items].sort((a, b) => {
    const aNorm = normalizeForMatch(a.name);
    const bNorm = normalizeForMatch(b.name);
    const aStarts = aNorm.startsWith(query);
    const bStarts = bNorm.startsWith(query);
    if (aStarts !== bStarts) return aStarts ? -1 : 1;
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
}

export function filterPricingItems(items, { searchQuery = "", letter = null }) {
  let result = items;

  if (letter) {
    result = result.filter((item) => getFirstLetter(item.name) === letter);
  }

  if (hasSearchQuery(searchQuery)) {
    result = result.filter((item) => matchesPricingSearch(item.name, searchQuery));
    return sortPricingSearchResults(result, searchQuery);
  }

  return [...result].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}

export function getAvailableLetters(items) {
  const counts = new Map();
  for (const item of items) {
    const letter = getFirstLetter(item.name);
    counts.set(letter, (counts.get(letter) ?? 0) + 1);
  }
  return counts;
}

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
