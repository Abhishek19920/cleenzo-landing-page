# Production deploy — cleenzo.co.in

## How production actually works (EC2)

| Layer | What |
|--------|------|
| **Nginx** | `cleenzo.co.in` / `www` → `proxy_pass http://127.0.0.1:3003` (not static `/var/www/...`) |
| **PM2** | `cleenzo-website` runs **`node scripts/serve-production.cjs`** on port **3003** (serves prerendered `build/<route>/index.html` first). **Do not use `serve -s`** — SPA mode breaks route SEO. |
| **Git clone on server** | `~/cleenzo-website` = repo `cleenzo-landing-page` |

**Do not rsync to `/var/www/cleenzo.co.in/html`** unless nginx is switched back to a static `root`.

## One-shot deploy on the server

```bash
cd ~/cleenzo-website
bash scripts/ec2-deploy-website-pm2.sh
```

Or manually:

```bash
cd ~/cleenzo-website && git pull origin main && npm ci && npm run build
pm2 startOrRestart ecosystem.config.cjs --only cleenzo-website || pm2 start ecosystem.config.cjs
pm2 save
bash scripts/verify-production-seo.sh http://127.0.0.1:3003
bash scripts/verify-production-seo.sh https://cleenzo.co.in
```

**One-time migration off `serve -s`:**

```bash
cd ~/cleenzo-website
pm2 delete cleenzo-website 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 show cleenzo-website
```

Verify bundle matches `build/index.html`:

```bash
grep -o 'static/js/main\.[a-f0-9]*\.js' build/index.html
curl -sS http://127.0.0.1:3003/ | grep -o 'static/js/main\.[a-f0-9]*\.js'
```

## GitHub Actions

Push to **`main`** → build in CI → rsync `build/` to **`EC2_APP_DIR/build`** (default `/home/ubuntu/cleenzo-website/build`) → **`pm2 restart cleenzo-website`**.

Secrets: `EC2_HOST`, `EC2_SSH_PRIVATE_KEY` or `EC2_SSH_KEY`, optional `EC2_USER`, optional `EC2_APP_DIR`.

## Other apps on the same host

| App | Path | Deploy |
|-----|------|--------|
| **Admin ERP** | `~/cleenzo-website/cleenzo-web` | `git pull` on **`main`**, `npm ci`, `npm run build`, `pm2 restart cleenzo-web` |
| **API / rider** | separate PM2 names | their own workflows |

## Troubleshooting

| Symptom | Cause |
|---------|--------|
| Pull OK, site old | Forgot `npm run build` or `pm2 restart` |
| rsync to `/var/www` fails / no effect | Nginx uses **proxy :3003**, not that folder |
| Same JS hash, UI unchanged | Before campaign start: offers/Tiranga use dates in `offers.js` / `freedomCampaign.js` (IST) |
| PM2 wrong port | `pm2 delete cleenzo-website` then from `~/cleenzo-website`: `pm2 start ecosystem.config.cjs && pm2 save` |
| Service URLs show homepage canonical | PM2 still on `serve -s` — switch to `ecosystem.config.cjs` / `npm run serve:production` |

## Google Search Console (indexing)

| GSC reason | Cause on cleenzo.co.in | Fix |
|------------|------------------------|-----|
| **Page with redirect** (many URLs) | Sitemap/canonical used `https://www.cleenzo.co.in` while live site is **`https://cleenzo.co.in`** (www → apex 301) | Deploy this repo: apex canonicals + sitemap. Only **www** and **http** should remain as redirects in GSC. |
| **Excluded by noindex** | 404 / not-found page (`noindex, follow`) | Expected for bad URLs; do not remove noindex on 404. |
| **Not found (404)** | Old or mistyped URL | Add nginx/SPA redirect if URL is known; otherwise ignore. |
| **Alternate page with proper canonical** | Duplicate URL (e.g. with/without trailing slash) | Trailing-slash normalization + one host in sitemap. |
| **Crawled – currently not indexed** | Quality / duplicate signals | Unique static titles per route (`npm run build` prerender); request indexing for key URLs after deploy. |

After deploy:

1. Search Console → **Sitemaps** → submit `https://cleenzo.co.in/sitemap.xml` (remove old www sitemap if listed).
2. **URL inspection** → test live URL `https://cleenzo.co.in/` → confirm Google tag **AW-18378385588** (Tag Assistant or page source).
3. **Page indexing** → open “Page with redirect” → **Validate fix** after 48h (count should drop to redirect-only URLs: http, www).

## Google Ads tag

Global tag **AW-18378385588** is in `public/index.html` (also on every prerendered route). Contact conversion fires when users open `/#contact` (once per session).
