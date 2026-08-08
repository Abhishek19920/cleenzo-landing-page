#!/usr/bin/env bash
# Production deploy on EC2 when nginx proxies cleenzo.co.in → 127.0.0.1:3003 (PM2).
# Run from repo root, e.g. ~/cleenzo-website
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PM2_NAME="${PM2_APP_NAME:-cleenzo-website}"
WEBSITE_PORT="${WEBSITE_PORT:-3003}"

cd "$REPO_ROOT"

echo "→ Branch: $(git rev-parse --abbrev-ref HEAD) @ $(git rev-parse --short HEAD)"
git pull origin main

echo "→ npm ci + build..."
npm ci
npm run build

for f in \
  build/index.html \
  build/laundry-service-ghaziabad/index.html \
  build/dry-cleaning-ghaziabad/index.html \
  build/dry-cleaners-raj-nagar-extension/index.html; do
  if [[ ! -f "$f" ]]; then
    echo ":: error: missing prerender file $f (run npm run build)"
    exit 1
  fi
done

MAIN="$(grep -oE 'static/js/main\.[a-f0-9]+\.js' build/index.html | head -1)"
echo "→ Built ${MAIN}"

echo "→ PM2: serve prerendered routes (NOT serve -s)..."
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 startOrRestart ecosystem.config.cjs --only "$PM2_NAME"
else
  pm2 start ecosystem.config.cjs --only "$PM2_NAME"
fi
pm2 save

sleep 1
LIVE="$(curl -sS "http://127.0.0.1:${WEBSITE_PORT}/" | grep -oE 'static/js/main\.[a-f0-9]+\.js' | head -1 || true)"
if [[ "$LIVE" != "$MAIN" ]]; then
  echo ":: error: port ${WEBSITE_PORT} serves '${LIVE:-<none>}', expected '${MAIN}'"
  pm2 show "$PM2_NAME" || true
  exit 1
fi

CANON="$(curl -sS "http://127.0.0.1:${WEBSITE_PORT}/laundry-service-ghaziabad/" | grep -oE 'rel="canonical" href="[^"]+"' | head -1 || true)"
if [[ "$CANON" != *"/laundry-service-ghaziabad/"* ]]; then
  echo ":: error: laundry page canonical wrong: ${CANON:-none}"
  echo "   PM2 must use: node scripts/serve-production.cjs (see ecosystem.config.cjs)"
  exit 1
fi

echo "→ Local SEO route checks..."
bash scripts/verify-production-seo.sh "http://127.0.0.1:${WEBSITE_PORT}"

echo "✓ Live on :${WEBSITE_PORT} → ${MAIN} (nginx → https://cleenzo.co.in)"
