# Cleenzo SEO Audit & Implementation Report — 2026-09-24

**Repo:** `cleenzo-landing-page` (Create React App + custom static-HTML/sitemap build pipeline — not Next.js)
**Live site:** https://cleenzo.co.in
**Canonical:** `https://cleenzo.co.in` (apex, trailing slash on inner routes) — unchanged, already correct
**Status:** Implementation complete for the items below — **not committed** (review `git diff` first, per repo convention)

This is a follow-up to `docs/SEO_AUDIT_REPORT.md` (2026-08-06). That pass already built a real SEO system — per-route metadata, JSON-LD, sitemap generation, FAQ schema, blog content. This pass verified what's actually **live in production** (not just in the repo), found where the two have diverged, and fixed what was safe to fix without touching business logic, pricing, or unverified claims.

---

## 0. Correction to the brief

The brief assumes a Next.js app (`metadataBase`, App Router). The actual stack is **Create React App + react-router-dom**, with a custom postbuild pipeline (`scripts/generate-route-html.cjs`) that writes per-route static `index.html` files with unique title/meta/canonical/JSON-LD, plus a runtime layer (`src/seoMeta.js`) that re-applies the same data client-side. This is a deliberate, working substitute for SSR — not a gap. All fixes below work within this architecture.

---

## 1. Headline finding: production is running a stale build

This is the single highest-impact issue found, and it isn't a code bug.

Fetching `https://cleenzo.co.in/best-dry-cleaners-in-ghaziabad/` returns the **homepage's** title, meta description, H1 and canonical (`canonical: https://cleenzo.co.in/`) instead of its own. The route exists in the repo (`src/pages/BestDryCleanersGhaziabad.jsx`, added in commit `1746039`, "feat: changes", 2026-09-22) with full unique content, its own FAQ schema, and its own entry in `src/seo/routes.json` — but the deployed server doesn't have the built file for it, so nginx's SPA fallback (`try_files ... /index.html`) serves the homepage instead. The effect: this URL is currently telling Google "I am a duplicate of the homepage," which can suppress it entirely and wastes the page's content and its FAQ schema.

The live `sitemap.xml` (18 URLs) also doesn't include `/best-dry-cleaners-in-ghaziabad/`, confirming the deployed build predates that commit. `public/sitemap.xml` in git was equally stale (the build script writes it back automatically, but nobody had re-run `npm run build` in the repo since).

**This means several rounds of already-completed SEO work in this repo — including part or all of the August 6 pass — may not be fully live.** I could not check GitHub Actions run history (no access to the private Actions API from here), so I can't confirm whether the deploy workflow failed, wasn't triggered, or is just behind by a few commits.

**Action needed from you:** trigger the `Deploy production` GitHub Action (or push to `main`) to redeploy. This is a deploy step, not something I can do from here — I don't have your EC2/deploy credentials.

**What I fixed in the repo:** re-ran `npm run build` locally to confirm the pipeline still produces correct output (19/19 routes, `npm run seo:validate` passes), and regenerated `public/sitemap.xml` so the next deploy carries the correct 19-URL sitemap instead of the stale 18-URL one.

---

## 2. Changes made this pass

| File | Change | Why |
|---|---|---|
| `public/sitemap.xml` | Regenerated (18 → 19 URLs; adds `/best-dry-cleaners-in-ghaziabad/`) | Was stale relative to `src/seo/routes.json` |
| `scripts/seo/schema-static.cjs` | Every static route now emits `LocalBusiness` JSON-LD (previously homepage only) and a `Home → Page` `BreadcrumbList` (previously none). Homepage keeps `WebSite` instead of a breadcrumb. | Non-JS crawlers and social scrapers that read the static HTML only (not the client-rendered version) previously saw `LocalBusiness` and breadcrumbs on the homepage alone. Google itself renders JS and already gets the fuller runtime version via `src/seo.js`, so this specifically closes the gap for crawlers that don't execute JS. |
| `src/data/servicePages.js` | Reworded 2 of 6 `heroImageAlt` values (laundry, dry cleaning) from keyword-stacked phrasing ("Best laundry service near me at Cleenzo Raj Nagar Extension Ghaziabad with free pickup") to natural descriptions ("Cleenzo laundry pickup and delivery service in Raj Nagar Extension, Ghaziabad") | These were the only two alt texts that matched the "bad example" pattern from the brief; the other four service pages' alt text was already natural |

Verified after each change: `npm run build` (clean, no warnings) → `node scripts/generate-route-html.cjs` (19/19 routes) → `node scripts/seo:validate` equivalent (`npm run seo:validate`, PASS). No business logic, pricing, booking flow, or API code touched.

I deliberately did **not** touch: `USP`/`ExpressUSP.jsx` marketing copy, the "Every delivery is express" claim, offer terms, or any pricing/business data. See §3.

---

## 3. Flagged for your confirmation (not assumed, not implemented)

These are places where the code either has unresolved `TODO_VERIFY` markers already left by the previous pass, or where existing copy risks the exact "misleading universal promise" pattern your brief explicitly warned against. I did not guess at any of these.

1. **Opening hours (`src/seo/site-data.json`): 09:30–21:00.** Flagged `TODO_VERIFY_OPENING_HOURS` since August 6, still unresolved. Used in `LocalBusiness` schema on every page. Please confirm against your Google Business Profile.
2. **Coordinates: 28.7035856, 77.4311244.** Also flagged since August 6. These now match the Google Maps place URL hardcoded in `src/constants.js` (`STORE_MAPS_URL`), so they're *probably* fine — but I can't independently verify against your GBP listing, so the TODO should stay until you confirm, then it can be removed.
3. **"India's Fastest Growing Cleaning Brand."** Not present anywhere on the live site or in the codebase today. Per your own instruction, this needs evidence before it's added anywhere (meta, schema, or on-page). I did not add it. If you have something to substantiate it (order growth, city/customer count growth, a specific comparable metric), tell me what and I'll add it with appropriate, non-fabricated framing.
4. **24-Hour Express Delivery — the eligibility terms are inconsistent across the codebase, not just unwritten:**
   - `src/constants.js` → `USP.headline`: **"Every delivery is express"**, `USP.description`: **"No slow lanes or extra charges"** — a blanket claim with no conditions, rendered sitewide via `ExpressUSP.jsx`.
   - The same file's carousel copy (`CAROUSEL_BANNERS`) says turnaround is **"12–48 hrs"**, not 24 hours.
   - `src/data/dryCleanersRajNagarExtension.js` says **"24 hour dry cleaning options"** (worded as selective, not universal).
   - `src/data/bestDryCleanersGhaziabad.js` FAQ is the most careful: **"free delivery applies on orders above ₹480 — confirm details when you book."**
   - `ghaziabadPricing.js` promo strip: **"Free pickup & delivery on orders above ₹480"** — this is a delivery-fee threshold, and it's not clear from the code whether it's the same condition that governs the 24-hour turnaround, or a separate one.

   I did not merge or rewrite these, because I don't know which one is actually true. Please tell me: is 24-hour delivery available on all services or specific ones (laundry only? dry cleaning only?)? All locations, or only near AVS City Square? Is there a minimum order? What happens to specialty/heavy items (sarees, lehengas, leather)? Once I have real answers, I can (a) fix the sitewide "every delivery is express" overclaim, and (b) build the dedicated 24-hour-delivery FAQ block your brief asks for (Step 6) using only true statements — the `bestDryCleanersGhaziabad.js` FAQ pattern above is a good template to extend everywhere once the terms are confirmed.
5. **Keyword cannibalization risk (P1, not fixed — needs a business decision, not just a copy edit):** three indexable pages target overlapping "dry cleaners near Raj Nagar Extension / Ghaziabad" intent — `/dry-cleaning-ghaziabad/` (city-wide service), `/dry-cleaners-raj-nagar-extension/` (local/premium framing), `/best-dry-cleaners-in-ghaziabad/` (comparison + first-order-offer framing). Their content is distinct enough today that I wouldn't recommend merging them outright, but Google may still struggle to decide which one to rank for "dry cleaners Ghaziabad." Recommend: either strengthen internal linking so each page's distinct intent is unambiguous (RNE page = "our shop," Ghaziabad page = "what we clean," best-dry-cleaners page = "why choose us / offer"), or decide which one is the primary target for that query cluster and note the other two as `rel="canonical"`-linked variants — a call I'd rather make with you than unilaterally.
6. **Google rating (5.0) and monthly order counts (319 orders / 148 new / 56 returning) in `src/constants.js`** are already marked as manually-updated marketing figures ("Update when you refresh monthly figures"). I used them nowhere new — just flagging that if they're stale, that affects both trust signals on-page and any `AggregateRating` schema built from `googleReviews.js`.

---

## 4. SEO scores (my estimate, code + live-site audit — no Lighthouse/PSI run, see note)

| Area | Before this pass | After this pass |
|---|---|---|
| Technical SEO | 6.5/10 (solid pipeline, but sitemap/production drift undetected) | 7.5/10 (drift found & sitemap fixed; **redeploy still required** to realize this) |
| On-page SEO | 8/10 (already strong: unique title/H1/meta per route, natural FAQ copy) | 8.5/10 (2 keyword-stuffed alt texts fixed) |
| Local SEO | 7/10 (consistent NAP in code; 2 unresolved TODO_VERIFY items) | 7/10 (unchanged — needs your confirmation, not more code) |
| Content | 7.5/10 (blog already covers real differentiators: German chemicals, barcode tracking, spot cleaning — not filler) | 7.5/10 (unchanged this pass) |
| Performance | Not independently measured — no Lighthouse/PageSpeed Insights tool available in this session. Code shows AVIF/WebP already generated for hero and gallery images (`scripts/convert-png-to-webp-avif.cjs`), which is a good sign. | Recommend running PageSpeed Insights on 2–3 live URLs and Search Console's Core Web Vitals report directly; I can act on the results. |
| Structured data | 6.5/10 (rich runtime JSON-LD; static/non-JS coverage was homepage-only) | 8/10 (LocalBusiness + Breadcrumb now static on every page) |

---

## 5. Keyword map (brief's keyword list → actual page → intent)

| Keyword(s) | Page | Intent |
|---|---|---|
| laundry service near me, laundry service in Ghaziabad, wash and fold, wash and iron, laundry pickup and delivery | `/laundry-service-ghaziabad/` | Transactional — book laundry |
| laundry service in Raj Nagar Extension | `/` (homepage H1 + content) and `/laundry-service-ghaziabad/` | Local navigational/transactional |
| dry cleaning, dry cleaner near me, suit/saree/wedding dress dry cleaning | `/dry-cleaning-ghaziabad/` | Transactional — garment-category intent |
| dry cleaning Raj Nagar Extension, dry cleaner near me (local) | `/dry-cleaners-raj-nagar-extension/` | Local/branch intent |
| best dry cleaners in Ghaziabad, dry cleaning in Ghaziabad (comparison) | `/best-dry-cleaners-in-ghaziabad/` | Comparison/decision intent + first-order offer |
| sofa cleaning, sofa cleaning near me/Ghaziabad | `/sofa-cleaning/` | Transactional |
| carpet cleaning, carpet cleaning near me/Ghaziabad | `/carpet-cleaning/` | Transactional |
| curtain cleaning (not in original brief list, but already live) | `/curtain-cleaning/` | Transactional |
| shoe cleaning (not in original brief list, but already live) | `/shoe-cleaning/` | Transactional |
| express laundry, 24 hour laundry service, same day laundry | Currently split across homepage, `/laundry-service-ghaziabad/`, `/dry-cleaners-raj-nagar-extension/` — **no single canonical page** for this intent | Transactional, urgency-driven — see §6 |
| commercial/bulk laundry (hotels, hospitals) | `/commercial-laundry/` | B2B transactional |

---

## 6. Recommended new pages (only where there's real search + business value)

1. **A dedicated express/24-hour delivery page or clearly-labeled section**, once eligibility terms are confirmed (§3.4). Right now "express laundry," "24 hour laundry service," and "same day laundry service" from your keyword list have no single canonical target — they're scattered fragments across three pages. This is the biggest content gap I found relative to your keyword list.
2. **"Laundry cost in Ghaziabad" blog post** — genuinely useful (you already publish real per-kg/per-piece prices), and it's the one blog topic from your Step 10 list that isn't covered yet. The other suggested topics (dry clean vs. laundry, stain removal, sofa/carpet cleaning frequency) are already live or largely covered by existing posts.
3. Do **not** recommend neighborhood-by-neighborhood location pages beyond what exists — Raj Nagar Extension already has its own page, and the nearby-areas list (Vaishali, Indirapuram, etc.) is handled as service-area mentions within existing pages, which matches your "don't create dozens of fake location pages" instruction.

---

## 7. Priority list

- **P0** — Redeploy production from current `main` (after this pass's changes are reviewed/committed). This alone likely fixes the `/best-dry-cleaners-in-ghaziabad/` duplicate-canonical issue and brings the live sitemap current.
- **P0** — Confirm 24-hour express delivery eligibility terms (§3.4) before any sitewide "Free 24-Hour Express Delivery" claim is added or the current blanket "Every delivery is express" copy is left as-is — it currently risks being the exact kind of unconditional promise your brief says to avoid.
- **P1** — Confirm opening hours and (ideally) coordinates against Google Business Profile so the two-month-old `TODO_VERIFY` markers can finally be cleared from `site-data.json`.
- **P1** — Decide on the dry-cleaning page cannibalization question (§3.5) — internal-linking fix vs. canonical consolidation.
- **P1** — Provide evidence (or explicitly decline) for "India's Fastest Growing Cleaning Brand" before it's used anywhere.
- **P2** — Run PageSpeed Insights / Search Console Core Web Vitals on the live site and share results so real performance fixes (not guesses) can follow.
- **P2** — Add a "Laundry cost in Ghaziabad" blog post.
- **P3** — Consider whether `/best-dry-cleaners-in-ghaziabad/` should be added to primary nav/service dropdown, or stay as a lighter-weight landing page reached only via the homepage's About section and ads/search — currently the latter, which may be intentional.

---

## 8. Not touched (per scope)

Booking flow, pricing data structure, payment/tracking, WhatsApp integration, API calls, login, offers/campaign logic, nginx server config (repo copy already includes the `best-dry-cleaners-in-ghaziabad` route — matches the code, ready to apply on the server whenever it's next synced), commercial/B2B section, and the pre-existing uncommitted `ghaziabadPricing.js` curtain-pricing change (unrelated, already reviewed separately).

## Review before commit

```bash
git status
git diff scripts/seo/schema-static.cjs src/data/servicePages.js public/sitemap.xml
```
