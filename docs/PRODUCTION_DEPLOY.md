# Production deploy — cleenzo.co.in

## How production actually works (EC2)

| Layer | What |
|--------|------|
| **Nginx** | `cleenzo.co.in` / `www` → `proxy_pass http://127.0.0.1:3003` (not static `/var/www/...`) |
| **PM2** | `cleenzo-website` serves `build/` on port **3003** (e.g. `serve -s build -l 3003`) |
| **Git clone on server** | `~/cleenzo-website` = repo `cleenzo-landing-page` |

**Do not rsync to `/var/www/cleenzo.co.in/html`** unless nginx is switched back to a static `root`.

## One-shot deploy on the server

```bash
cd ~/cleenzo-website
bash scripts/ec2-deploy-website-pm2.sh
```

Or manually:

```bash
cd ~/cleenzo-website && git pull origin main && npm ci && npm run build && pm2 restart cleenzo-website && curl -sS http://127.0.0.1:3003/ | grep -o 'static/js/main\.[a-f0-9]*\.js'
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
| Same JS hash, UI unchanged | Offer/Tiranga dates start **9 Aug IST** in `offers.js` / `freedomCampaign.js` |
| PM2 wrong port | `pm2 delete cleenzo-website` then `pm2 start npx --name cleenzo-website -- serve -s build -l 3003` from `~/cleenzo-website` |
