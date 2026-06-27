import { useEffect, useMemo, useState } from "react";

import PlaceOrderCTA from "../components/PlaceOrderCTA";
import AlphabetFilter from "../components/pricing/AlphabetFilter";
import { PRICING_SECTION } from "../constants";
import { GHAZIABAD_PRICING } from "../data/ghaziabadPricing";
import {
  filterPricingItems,
  getAvailableLetters,
  hasSearchQuery,
  matchesPricingSearch,
} from "../utils/pricingSearch";

function formatInr(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const pricing = GHAZIABAD_PRICING;
const INITIAL_VISIBLE = 12;
const SHOW_MORE_STEP = 12;

function KgServiceCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {pricing.kgServices.map((service) => (
        <article
          key={service.name}
          className="rounded-2xl border-2 border-cleenzo bg-cleenzo-pale/50 p-5 sm:p-6 text-center hover:shadow-lg transition"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-cleenzo mb-2">
            {service.subGroup}
          </p>
          <h3 className="font-black text-slate-900 text-base sm:text-lg leading-tight min-h-[2.5rem]">
            {service.name}
          </h3>
          <p className="text-4xl sm:text-5xl font-black text-cleenzo mt-3 leading-none">
            {formatInr(service.price)}
            <span className="text-base font-bold text-slate-500">/kg</span>
          </p>
          <p className="text-xs text-slate-500 font-semibold mt-2">{service.turnaround}</p>
        </article>
      ))}
    </div>
  );
}

function AddonGrid({ items, searchQuery = "" }) {
  const filtered = useMemo(() => {
    if (!items?.length) return [];
    if (!hasSearchQuery(searchQuery)) return items;
    return items.filter((addon) => matchesPricingSearch(addon.name, searchQuery));
  }, [items, searchQuery]);

  if (!items?.length) return null;
  if (!filtered.length) return null;

  return (
    <div className="mt-8 border-t border-cleenzo-sky-light pt-8">
      <h4 className="text-sm font-black uppercase tracking-widest text-cleenzo-deep mb-4">
        Add-ons &amp; prices
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {filtered.map((addon, index) => (
          <div
            key={`${addon.name}-${addon.price}-${index}`}
            className="flex items-center justify-between gap-3 bg-cleenzo-pale/40 border border-cleenzo-sky-light rounded-xl px-4 py-3"
          >
            <span className="text-sm font-semibold text-slate-800">{addon.name}</span>
            <span className="text-sm font-black text-cleenzo shrink-0">
              {formatInr(addon.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceSearchBar({ value, onChange, placeholder, resultHint }) {
  return (
    <div className="mb-5">
      <label htmlFor="pricing-search" className="sr-only">
        Search price list
      </label>
      <div className="relative">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          aria-hidden="true"
        >
          🔍
        </span>
        <input
          id="pricing-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full border border-cleenzo-sky-light rounded-2xl pl-11 pr-11 py-3.5 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cleenzo/30 focus:border-cleenzo bg-white"
          autoComplete="off"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 font-bold text-lg leading-none px-2"
            aria-label="Clear search"
          >
            ×
          </button>
        ) : null}
      </div>
      {resultHint ? (
        <p className="text-xs text-slate-500 mt-2 font-medium">{resultHint}</p>
      ) : null}
    </div>
  );
}

function PriceTable({ items, unitLabel, emptyMessage, showCategory = false }) {
  if (!items?.length) {
    return (
      <p className="text-slate-500 text-sm py-8 text-center">
        {emptyMessage ?? "No items listed for this category yet."}
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-cleenzo-sky-light bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left">
          <thead>
            <tr className="bg-cleenzo text-white">
              {showCategory ? (
                <th className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wide w-28 sm:w-36">
                  Category
                </th>
              ) : null}
              <th className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wide">
                Item
              </th>
              <th className="px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-right w-32 sm:w-40">
                Price {unitLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={`${item.sectionId ?? "item"}-${item.name}-${item.price}-${index}`}
                className={index % 2 === 0 ? "bg-white" : "bg-cleenzo-pale/30"}
              >
                {showCategory ? (
                  <td className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold text-cleenzo-dark whitespace-nowrap">
                    {item.sectionLabel}
                  </td>
                ) : null}
                <td className="px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-slate-800">
                  {item.name}
                </td>
                <td className="px-4 sm:px-6 py-3 text-sm sm:text-base font-black text-cleenzo text-right">
                  {formatInr(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoryTabs({ selectedCategory, activeService, isBrowsingAll, onSelectSection }) {
  return (
    <div
      className="flex flex-wrap gap-2 mb-6"
      role="tablist"
      aria-label="Garment category"
    >
      {pricing.sectionTabs.map((tab) => {
        const isCategorySelected = !isBrowsingAll && selectedCategory === tab.id;
        const count = pricing.items[activeService]?.[tab.id]?.length ?? 0;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isCategorySelected}
            onClick={() => onSelectSection(tab.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border transition ${
              isCategorySelected
                ? "bg-cleenzo border-cleenzo text-white shadow-sm"
                : "bg-cleenzo-pale/50 border-cleenzo-sky-light text-slate-700 hover:border-cleenzo/30"
            }`}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isCategorySelected ? "bg-white/20" : "bg-white text-slate-500"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ShowMoreBar({ visibleCount, totalCount, onShowMore, onShowAll }) {
  const remaining = totalCount - visibleCount;
  if (remaining <= 0) return null;

  return (
    <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
      <p className="text-sm text-slate-500 font-medium">
        Showing {visibleCount} of {totalCount} items
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onShowMore}
          className="bg-cleenzo text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-cleenzo-dark transition shadow-sm"
        >
          Show more ({Math.min(SHOW_MORE_STEP, remaining)})
        </button>
        {remaining > SHOW_MORE_STEP ? (
          <button
            type="button"
            onClick={onShowAll}
            className="border border-cleenzo-sky-light bg-white text-cleenzo-dark font-bold text-sm px-5 py-2.5 rounded-full hover:border-cleenzo/40 transition"
          >
            Show all {totalCount}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function PricingSection() {
  const [activeService, setActiveService] = useState("dry-clean");
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const serviceMeta = useMemo(
    () => pricing.serviceTabs.find((tab) => tab.id === activeService),
    [activeService],
  );

  const sectionTabById = useMemo(
    () => Object.fromEntries(pricing.sectionTabs.map((tab) => [tab.id, tab])),
    [],
  );

  const allSectionItems = useMemo(() => {
    if (activeService === "kg-wash") return [];
    const serviceItems = pricing.items[activeService] ?? {};
    return pricing.sectionTabs.flatMap((tab) =>
      (serviceItems[tab.id] ?? []).map((item) => ({
        ...item,
        sectionId: tab.id,
        sectionLabel: tab.label,
      })),
    );
  }, [activeService]);

  const sectionItems = useMemo(() => {
    if (activeService === "kg-wash") return [];
    return (pricing.items[activeService]?.[selectedCategory] ?? []).map((item) => ({
      ...item,
      sectionId: selectedCategory,
      sectionLabel: sectionTabById[selectedCategory]?.label ?? selectedCategory,
    }));
  }, [activeService, selectedCategory, sectionTabById]);

  const isSearching = hasSearchQuery(searchQuery);
  const isLetterFilter = Boolean(activeLetter);
  const isBrowsingAll = isSearching || isLetterFilter;

  const letterCounts = useMemo(
    () => getAvailableLetters(allSectionItems),
    [allSectionItems],
  );

  const filteredItems = useMemo(() => {
    if (isBrowsingAll) {
      return filterPricingItems(allSectionItems, {
        searchQuery,
        letter: activeLetter,
      });
    }
    return sectionItems;
  }, [allSectionItems, sectionItems, searchQuery, activeLetter, isBrowsingAll]);

  const displayedItems = useMemo(() => {
    if (isBrowsingAll) return filteredItems;
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, isBrowsingAll, visibleCount]);

  const serviceAddons = useMemo(() => {
    if (activeService === "kg-wash") {
      return [...(pricing.addons["kg-wash"] ?? [])];
    }
    return pricing.addons[activeService] ?? [];
  }, [activeService]);

  const unitLabel = serviceMeta?.unit === "kg" ? "per kg" : "per pc";

  useEffect(() => {
    setSearchQuery("");
    setActiveLetter(null);
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeService]);

  const handleSelectCategory = (sectionId) => {
    setSelectedCategory(sectionId);
    setSearchQuery("");
    setActiveLetter(null);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (hasSearchQuery(value)) {
      setActiveLetter(null);
    } else if (!activeLetter) {
      setSelectedCategory("men");
      setVisibleCount(INITIAL_VISIBLE);
    }
  };

  const handleLetterSelect = (letter) => {
    setActiveLetter(letter);
    if (letter) setSearchQuery("");
  };

  const searchHint = isBrowsingAll
    ? filteredItems.length
      ? `${filteredItems.length} result${filteredItems.length === 1 ? "" : "s"}${
          isLetterFilter ? ` starting with “${activeLetter}”` : ""
        }${isSearching ? ` matching “${searchQuery.trim()}”` : ""} — all categories`
      : isLetterFilter
          ? `No items starting with “${activeLetter}”`
          : `No results for “${searchQuery.trim()}” across all categories`
    : sectionItems.length > INITIAL_VISIBLE
      ? `Showing first ${Math.min(visibleCount, sectionItems.length)} of ${sectionItems.length} — search or pick a letter for instant results`
      : `${sectionItems.length} items in this category`;

  return (
    <section id="pricing" className="bg-cleenzo-pale-bg border-t border-cleenzo-sky-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
          <p className="text-cleenzo font-bold text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
            {PRICING_SECTION.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.12] tracking-tight text-cleenzo-deep">
            {PRICING_SECTION.headline}
            <span className="block text-cleenzo mt-1">{PRICING_SECTION.headlineAccent}</span>
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            {PRICING_SECTION.subtext}
          </p>
          <div className="mt-6 inline-block bg-cleenzo-deep text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-3 rounded-lg tracking-wide">
            {pricing.promoStrip}
          </div>
          <p className="text-cleenzo-dark/70 text-xs font-semibold mt-3 uppercase tracking-wide">
            Prices for {pricing.city} · Raj Nagar
          </p>
        </div>

        <KgServiceCards />

        <div className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-8 items-start">
          <aside className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">
              Select service
            </p>
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-visible">
              {pricing.serviceTabs.map((tab) => {
                const isActive = activeService === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveService(tab.id);
                      if (tab.id !== "kg-wash") setSelectedCategory("men");
                    }}
                    className={`shrink-0 flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left font-bold text-sm transition border ${
                      isActive
                        ? "bg-cleenzo border-cleenzo text-white shadow-md"
                        : "bg-white border-cleenzo-sky-light text-slate-700 hover:border-cleenzo/40"
                    }`}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {tab.icon}
                    </span>
                    <span>
                      {tab.label}
                      <span
                        className={`block text-[11px] font-semibold mt-0.5 ${
                          isActive ? "text-cleenzo-sky" : "text-slate-400"
                        }`}
                      >
                        {tab.turnaround}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
            {activeService === "kg-wash" ? (
              <div className="bg-white border border-cleenzo-sky-light rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-black text-cleenzo-deep mb-2">Services &amp; prices</h3>
                <p className="text-slate-600 text-sm mb-6">
                  Laundry charged per kilo — stack packing, wash &amp; fold or wash &amp; iron.
                  Premium laundry includes stain removal and individual packing.
                </p>
                <div className="space-y-3">
                  {pricing.kgServices.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between gap-4 border border-slate-200 rounded-xl px-4 py-4"
                    >
                      <div>
                        <p className="font-black text-slate-900">{service.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{service.turnaround}</p>
                      </div>
                      <p className="text-2xl font-black text-cleenzo">
                        {formatInr(service.price)}
                        <span className="text-sm text-slate-500 font-bold">/kg</span>
                      </p>
                    </div>
                  ))}
                </div>
                <PriceSearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search add-ons…"
                  resultHint={
                    searchQuery.trim()
                      ? `${serviceAddons.filter((a) => matchesPricingSearch(a.name, searchQuery)).length} add-on matches`
                      : null
                  }
                />
                <AddonGrid items={serviceAddons} searchQuery={searchQuery} />
              </div>
            ) : (
              <div className="bg-white border border-cleenzo-sky-light rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-black text-cleenzo-deep">Items &amp; prices</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {serviceMeta?.label} · {serviceMeta?.turnaround}
                    </p>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-cleenzo">
                    {sectionItems.length} items listed
                  </p>
                </div>

                <CategoryTabs
                  selectedCategory={selectedCategory}
                  activeService={activeService}
                  isBrowsingAll={isBrowsingAll}
                  onSelectSection={handleSelectCategory}
                />

                <PriceSearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Type to search — e.g. shirt, saree, blazer…"
                  resultHint={searchHint}
                />

                <AlphabetFilter
                  activeLetter={activeLetter}
                  letterCounts={letterCounts}
                  onSelectLetter={handleLetterSelect}
                  totalCount={allSectionItems.length}
                />

                <PriceTable
                  items={displayedItems}
                  unitLabel={unitLabel}
                  showCategory={isBrowsingAll}
                  emptyMessage={
                    isBrowsingAll
                      ? isSearching
                        ? `No items match “${searchQuery.trim()}”. Try another letter or keyword.`
                        : `No items start with “${activeLetter}”.`
                      : undefined
                  }
                />

                {!isBrowsingAll ? (
                  <ShowMoreBar
                    visibleCount={displayedItems.length}
                    totalCount={filteredItems.length}
                    onShowMore={() =>
                      setVisibleCount((count) =>
                        Math.min(count + SHOW_MORE_STEP, filteredItems.length),
                      )
                    }
                    onShowAll={() => setVisibleCount(filteredItems.length)}
                  />
                ) : null}

                <AddonGrid items={serviceAddons} searchQuery={searchQuery} />
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-slate-400 text-[11px] sm:text-xs mt-8 max-w-2xl mx-auto">
          {PRICING_SECTION.disclaimer}
        </p>
      </div>

      <PlaceOrderCTA title="Ready to book? Schedule a free pickup" variant="white" />
    </section>
  );
}

export default PricingSection;
