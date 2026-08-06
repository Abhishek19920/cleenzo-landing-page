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

MAIN="$(grep -oE 'static/js/main\.[a-f0-9]+\.js' build/index.html | head -1)"
echo "→ Built ${MAIN}"

echo "→ pm2 restart ${PM2_NAME}..."
pm2 restart "$PM2_NAME"

sleep 1
LIVE="$(curl -sS "http://127.0.0.1:${WEBSITE_PORT}/" | grep -oE 'static/js/main\.[a-f0-9]+\.js' | head -1 || true)"
if [ "$LIVE" != "$MAIN" ]; then
  echo ":: error: port ${WEBSITE_PORT} serves '${LIVE:-<none>}', expected '${MAIN}'"
  echo "   Check: pm2 show ${PM2_NAME}  (should serve this repo's build/ on :${WEBSITE_PORT})"
  exit 1
fi

echo "✓ Live on :${WEBSITE_PORT} → ${MAIN} (nginx → https://www.cleenzo.co.in)"
