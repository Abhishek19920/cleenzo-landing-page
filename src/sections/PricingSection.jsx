import { useEffect, useMemo, useState } from "react";

import PlaceOrderCTA from "../components/PlaceOrderCTA";
import AlphabetFilter from "../components/pricing/AlphabetFilter";
import { PRICING_SECTION } from "../constants";
import {
  filterPricingItems,
  getAvailableLetters,
  hasSearchQuery,
  matchesPricingSearch,
} from "../utils/pricingSearch";
import { useWebsitePricing } from "../hooks/useWebsitePricing";

function formatInr(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const INITIAL_VISIBLE = 12;
const SHOW_MORE_STEP = 12;

function KgServiceCards({ pricing }) {
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

function PriceTable({ items, unitLabel, emptyMessage }) {
  if (!items?.length) {
    return (
      <p className="text-slate-500 text-sm py-8 text-center">
        {emptyMessage ?? "No items listed for this category yet."}
      </p>
    );
  }

  return (
    <>
      <ul className="md:hidden space-y-2">
        {items.map((item, index) => (
          <li
            key={`${item.sectionId ?? "item"}-${item.name}-${item.price}-${index}`}
            className="flex items-start justify-between gap-3 rounded-xl border border-cleenzo-sky-light bg-white px-4 py-3.5 shadow-sm"
          >
            <span className="text-sm font-semibold text-slate-800 leading-snug min-w-0">
              {item.name}
            </span>
            <span className="text-sm font-black text-cleenzo shrink-0 text-right">
              {formatInr(item.price)}
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                {unitLabel}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="hidden md:block overflow-hidden rounded-2xl border border-cleenzo-sky-light bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-left">
            <thead>
              <tr className="bg-cleenzo text-white">
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
                  <td className="px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-slate-800">
                    {item.name}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-sm sm:text-base font-black text-cleenzo text-right whitespace-nowrap">
                    {formatInr(item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function CategoryTabs({ pricing, selectedCategory, activeService, onSelectSection }) {
  return (
    <div
      className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory flex-nowrap sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0"
      role="tablist"
      aria-label="Garment category"
    >
      {pricing.sectionTabs.map((tab) => {
        const isCategorySelected = selectedCategory === tab.id;
        const count = pricing.items[activeService]?.[tab.id]?.length ?? 0;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isCategorySelected}
            onClick={() => onSelectSection(tab.id)}
            className={`inline-flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2 text-sm font-bold border transition ${
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
  const { pricing, loading } = useWebsitePricing();
  const [activeService, setActiveService] = useState("dry-clean");
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const serviceMeta = useMemo(
    () => pricing.serviceTabs.find((tab) => tab.id === activeService),
    [activeService, pricing.serviceTabs],
  );

  const sectionTabById = useMemo(
    () => Object.fromEntries(pricing.sectionTabs.map((tab) => [tab.id, tab])),
    [pricing.sectionTabs],
  );

  const sectionItems = useMemo(() => {
    if (activeService === "kg-wash") return [];
    return (pricing.items[activeService]?.[selectedCategory] ?? []).map((item) => ({
      ...item,
      sectionId: selectedCategory,
      sectionLabel: sectionTabById[selectedCategory]?.label ?? selectedCategory,
    }));
  }, [activeService, selectedCategory, sectionTabById, pricing.items]);

  const isSearching = hasSearchQuery(searchQuery);
  const isLetterFilter = Boolean(activeLetter);
  const isFiltering = isSearching || isLetterFilter;

  const letterCounts = useMemo(
    () => getAvailableLetters(sectionItems),
    [sectionItems],
  );

  const filteredItems = useMemo(
    () =>
      filterPricingItems(sectionItems, {
        searchQuery,
        letter: activeLetter,
      }),
    [sectionItems, searchQuery, activeLetter],
  );

  const displayedItems = useMemo(() => {
    if (isFiltering) return filteredItems;
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, isFiltering, visibleCount]);

  const serviceAddons = useMemo(() => {
    if (activeService === "kg-wash") {
      return [...(pricing.addons["kg-wash"] ?? [])];
    }
    return pricing.addons[activeService] ?? [];
  }, [activeService, pricing.addons]);

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
      setVisibleCount(INITIAL_VISIBLE);
    }
  };

  const handleLetterSelect = (letter) => {
    setActiveLetter(letter);
    if (letter) setSearchQuery("");
  };

  const activeCategoryLabel =
    sectionTabById[selectedCategory]?.label ?? selectedCategory;

  const searchHint = isFiltering
    ? filteredItems.length
      ? `${filteredItems.length} result${filteredItems.length === 1 ? "" : "s"} in ${activeCategoryLabel}${
          isLetterFilter ? ` starting with “${activeLetter}”` : ""
        }${isSearching ? ` matching “${searchQuery.trim()}”` : ""}`
      : isLetterFilter
          ? `No items in ${activeCategoryLabel} starting with “${activeLetter}”`
          : `No results for “${searchQuery.trim()}” in ${activeCategoryLabel}`
    : sectionItems.length > INITIAL_VISIBLE
      ? `Showing first ${Math.min(visibleCount, sectionItems.length)} of ${sectionItems.length} in ${activeCategoryLabel} — search or pick a letter to narrow`
      : `${sectionItems.length} items in ${activeCategoryLabel}`;

  return (
    <section id="pricing" className="bg-cleenzo-pale-bg border-t border-cleenzo-sky-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {loading ? (
          <p className="text-center text-sm text-slate-500 mb-6">Loading latest prices…</p>
        ) : null}
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
            Prices for {pricing.city} &amp; nearby areas
          </p>
        </div>

        <KgServiceCards pricing={pricing} />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,240px)_1fr] gap-6 lg:gap-8 items-start">
          <aside className="min-w-0 lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">
              Select service
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory flex-nowrap lg:flex-col lg:pb-0 lg:overflow-visible lg:snap-none lg:flex-wrap">
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
                    className={`shrink-0 snap-start flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left font-bold text-sm transition border min-w-[11.5rem] lg:min-w-0 lg:w-full ${
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
                  <p className="text-xs font-bold uppercase tracking-widest text-cleenzo text-right sm:text-left">
                    {isFiltering ? filteredItems.length : sectionItems.length} items
                    {isFiltering ? " shown" : " listed"}
                  </p>
                </div>

                <CategoryTabs
                  pricing={pricing}
                  selectedCategory={selectedCategory}
                  activeService={activeService}
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
                  totalCount={sectionItems.length}
                />

                <PriceTable
                  items={displayedItems}
                  unitLabel={unitLabel}
                  emptyMessage={
                    isFiltering
                      ? isSearching
                        ? `No items match “${searchQuery.trim()}” in ${activeCategoryLabel}. Try another keyword or category.`
                        : `No items in ${activeCategoryLabel} start with “${activeLetter}”.`
                      : undefined
                  }
                />

                {!isFiltering ? (
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
