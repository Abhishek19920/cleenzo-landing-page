# Cleenzo Technical SEO — Audit & Implementation Report

**Repo:** `cleenzo-landing-page`  
**Canonical:** `https://www.cleenzo.co.in` (www, trailing slash on inner routes)  
**Date:** 2026-08-06  
**Status:** Implementation complete — **not committed** (review `git diff` first)

---

## Phase 0 — Pre-change audit (summary)

| Issue | Severity | Notes |
|--------|----------|--------|
| Duplicate SEO config | P0 | `public/index.html`, `src/seo.js`, `scripts/route-seo-data.cjs` diverged (titles, FAQ, coords, hours) |
| Conflicting coordinates | P0 | `index.html` 28.6722 vs Maps/seo.js 28.7035856 |
| Conflicting opening hours | P1 | `index.html` 09:00 vs seo.js 09:30 |
| Hidden `.seo-prerender` | P0 | Clipped, `aria-hidden` crawler-targeted block |
| `<meta name="keywords">` | P1 | Present in index + runtime; low value, inconsistency risk |
| Duplicate JSON-LD | P1 | Static index FAQ + runtime LocalBusiness; second LocalBusiness via `getGoogleReviewsJsonLd` on homepage |
| Stale sitemap `lastmod` | P2 | Fixed dates 2026-07-19 on all URLs |
| SPA 404 soft-404 | P1 | Unknown routes → HTTP 200 + React NotFound (documented; nginx/CRA limit) |
| Service page cannibalization | P2 | `/dry-cleaning-ghaziabad/` vs `/dry-cleaners-raj-nagar-extension/` both “best / near me” heavy |
| Homepage runtime SEO spam | P1 | “Best”, “near me” in default `SEO` title/description |

**Not changed (per scope):** offers, GTM, booking, API URLs, Freedom/Rakhi campaign logic, nginx on EC2.

---

## 1. SEO scores (estimated)

| Area | Before | After |
|------|--------|-------|
| Technical SEO | 6/10 | 8/10 |
| On-page SEO | 5/10 | 7.5/10 |
| Local SEO | 6/10 | 7.5/10 |
| Performance SEO | 6/10 | 6/10 (no major image compression this pass) |
| Structured data | 5/10 | 8/10 |

---

## 2. Files changed / created

**Modified:** `public/index.html`, `public/sitemap.xml`, `package.json`, `scripts/generate-route-html.cjs`, `scripts/route-seo-data.cjs`, `src/seo.js`, `src/seoMeta.js`, `src/data/servicePages.js` (laundry + dry-cleaning H1/titles only)

**Created:**

- `src/seo/site-data.json` — business facts, geo, hours, TODO notes  
- `src/seo/routes.json` — 17 routes (title, description, h1, intro, indexable)  
- `src/seo/routes.js`, `src/seo/business.js` — runtime helpers  
- `scripts/seo/schema-static.cjs` — postbuild WebPage + homepage LocalBusiness/WebSite  
- `scripts/generate-sitemap.cjs` — build-time sitemap (no fake lastmod)  
- `scripts/validate-seo.cjs` — `npm run seo:validate`  
- `docs/SEO_AUDIT_REPORT.md` (this file)

---

## 3. P0 fixes

- Single source: `site-data.json` + `routes.json` → static HTML + runtime `metaFromRoute()`  
- Removed hidden `.seo-prerender` and meta keywords from shell  
- Aligned static ICBM/geo with Google Maps listing coordinates (see TODO below)  
- Per-route static HTML: unique title, description, canonical, OG/Twitter  
- Removed duplicate homepage `getGoogleReviewsJsonLd` block (reviews remain in main LocalBusiness)  
- Build generates fresh `sitemap.xml` + validation gate

---

## 4. P1 fixes

- Natural FAQ copy + schema in `SEO_FAQ`  
- Homepage title direction: Raj Nagar Extension, Ghaziabad (no seasonal offer in permanent meta)  
- Dry cleaning vs laundry service titles/H1s differentiated (city vs local page partially via RNE data)  
- AggregateRating `reviewCount` uses `GOOGLE_RATING.count` consistently in LocalBusiness  

---

## 5. P2 / not done this pass

- Image weight optimization (Freedom PNG, heroes) — recommend WebP/AVIF + dimensions  
- True HTTP 404 for unknown URLs behind nginx `proxy_pass` / SPA  
- Full servicePages.js de-duplication with `routes.json` (runtime still uses `servicePages` for body + FAQ schema)  
- `getGoogleReviewsJsonLd` still exported if used elsewhere — homepage no longer duplicates  

---

## 6. Business data — NEEDS_OWNER_CONFIRMATION

| Field | Current in code | Conflict |
|-------|-----------------|----------|
| **Coordinates** | 28.7035856, 77.4311244 (`site-data.json`, Maps URL in `constants.js`) | Was 28.6722 in old `index.html` |
| **Opening hours** | 09:30–21:00 (`site-data.json`) | Was 09:00 in old `index.html` |
| **Service areas** | Unchanged list in `seo.js` | Verify vs GBP |
| **Google rating** | `GOOGLE_RATING` + `GOOGLE_REVIEWS_SCHEMA` in `googleReviews.js` | Confirm count matches live GBP |

Markers: `TODO_VERIFY_GBP_COORDINATES`, `TODO_VERIFY_OPENING_HOURS` in `site-data.json`.

---

## 7. Canonical strategy

**Unchanged:** `https://www.cleenzo.co.in` with trailing slash on directory routes.  
Nginx repo config still documents apex → www 301 (apply on server separately).

---

## 8. Indexable routes (canonical)

`/`, `/about/`, `/commercial-laundry/`, `/laundry-service-ghaziabad/`, `/dry-cleaning-ghaziabad/`, `/dry-cleaners-raj-nagar-extension/`, `/shoe-cleaning/`, `/sofa-cleaning/`, `/carpet-cleaning/`, `/curtain-cleaning/`, `/blog/`, plus 6 blog posts (see `src/seo/routes.json`).

---

## 9. Structured data (where)

| Type | Where |
|------|--------|
| LocalBusiness + AggregateRating + Review | Runtime `getLocalBusinessJsonLd()` (React head) |
| WebSite | Homepage runtime + static homepage JSON-LD |
| FAQPage | Homepage runtime FAQ; service/RNE pages from page FAQs |
| Service | Service + commercial pages |
| Article + BreadcrumbList | Blog posts |
| WebPage | Static postbuild per route |

Static postbuild does **not** duplicate full FAQ on every URL anymore.

---

## 10. Performance

No asset byte changes in this pass. Carousel/offers untouched.

---

## 11. Build

```
npm run build — PASS
npm run seo:validate — PASS (17 routes)
```

---

## 12. Static HTML strategy (Phase 4)

- **Removed:** clipped `.seo-prerender`  
- **Kept:** CRA + React hydration on `#root` only for JS users (no duplicate visible H1)  
- **Enhanced:** `<noscript>` per-route main content (legitimate non-JS fallback)  
- **Added:** route-specific JSON-LD in static HTML for crawlers that do not execute JS  

---

## 13. Manual server actions

- Deploy new `build/` after merge  
- Confirm nginx still 301 apex → www and serves trailing-slash folders  
- Soft-404: optional future nginx `map` / separate 404 doc — not implemented  

---

## 14. Google Search Console (after deploy)

Re-request indexing for: `/`, `/dry-cleaning-ghaziabad/`, `/dry-cleaners-raj-nagar-extension/`, `/laundry-service-ghaziabad/`, `/curtain-cleaning/` if newly emphasized.

---

## 15. Future content (not implemented)

Lehenga/saree/suit care pages, monsoon care, etc. — list only per brief.

---

## Review before commit

```bash
git status
git diff
git diff --stat
```

**Do not commit** until you confirm business hours/coordinates with GBP.
