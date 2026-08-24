#!/usr/bin/env bash
# Run ON EC2 after git pull in cleenzo-landing-page clone.
# Publishes build/ (including prerendered route folders) to nginx docroot.
set -euo pipefail

# Must match nginx/cleenzo-frontend.conf root
DEPLOY_PATH="${EC2_DEPLOY_PATH:-/var/www/cleenzo.co.in/html}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$REPO_ROOT"

echo "→ Branch: $(git rev-parse --abbrev-ref HEAD) @ $(git rev-parse --short HEAD)"
echo "→ npm ci + build..."
npm ci
npm run build

REQUIRED=(
  build/index.html
  build/about/index.html
  build/commercial-laundry/index.html
  build/laundry-service-ghaziabad/index.html
  build/dry-cleaning-ghaziabad/index.html
  build/sitemap.xml
  build/robots.txt
)

for f in "${REQUIRED[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo ":: error: missing prerender/deploy file $f (npm run build failed?)"
    exit 1
  fi
done

if ! grep -q 'About Cleenzo' build/about/index.html; then
  echo ":: error: build/about/index.html missing About Cleenzo title — prerender broken"
  exit 1
fi

echo "→ rsync to ${DEPLOY_PATH} (includes about/, blog/, service folders)..."
sudo mkdir -p "$DEPLOY_PATH"
sudo rsync -av --delete \
  --exclude '.DS_Store' \
  build/ "${DEPLOY_PATH}/"
sudo find "$DEPLOY_PATH" -type d -exec chmod 755 {} \;
sudo find "$DEPLOY_PATH" -type f -exec chmod 644 {} \;

if [[ ! -f "${DEPLOY_PATH}/about/index.html" ]]; then
  echo ":: error: ${DEPLOY_PATH}/about/index.html missing after rsync"
  exit 1
fi

TITLE="$(grep -oE '<title>[^<]+' "${DEPLOY_PATH}/about/index.html" | head -1 || true)"
echo "→ Deployed about title: ${TITLE}"
if [[ "$TITLE" != *"About Cleenzo"* ]]; then
  echo ":: error: deployed about page still has wrong title"
  exit 1
fi

echo "✓ Landing page deployed to ${DEPLOY_PATH}"
echo "  Next: ./apply-nginx-seo.sh  (if not already applied)"
echo "  Check: curl -sL https://cleenzo.co.in/about/ | grep -oE '<title>[^<]+'"
