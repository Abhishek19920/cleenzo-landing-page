import { resolvePricingDeepLink, PRICING_DEEP_LINK_IDS } from "./pricingDeepLinks";

describe("pricingDeepLinks", () => {
  test("resolves required public hashes", () => {
    expect(resolvePricingDeepLink("#pricing")).toEqual({ scrollId: "pricing" });
    expect(resolvePricingDeepLink("#mens")).toEqual({
      scrollId: "mens",
      service: "dry-clean",
      category: "men",
    });
    expect(resolvePricingDeepLink("#womens")).toEqual({
      scrollId: "womens",
      service: "dry-clean",
      category: "women",
    });
    expect(resolvePricingDeepLink("#household")).toEqual({
      scrollId: "household",
      service: "dry-clean",
      category: "household",
    });
    expect(resolvePricingDeepLink("#toy-cleaning")).toEqual({
      scrollId: "toy-cleaning",
      service: "toy-cleaning",
    });
  });

  test("IDs are stable explicit strings", () => {
    expect(PRICING_DEEP_LINK_IDS).toEqual([
      "pricing",
      "mens",
      "womens",
      "household",
      "toy-cleaning",
    ]);
  });

  test("ignores unknown hashes", () => {
    expect(resolvePricingDeepLink("#offers")).toBeNull();
    expect(resolvePricingDeepLink("")).toBeNull();
    expect(resolvePricingDeepLink(null)).toBeNull();
  });
});
