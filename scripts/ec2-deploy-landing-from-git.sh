#!/usr/bin/env bash
# Run ON EC2 after git pull in cleenzo-landing-page clone.
# Publishes build/ to nginx docroot for www.cleenzo.co.in
set -euo pipefail

DEPLOY_PATH="${EC2_DEPLOY_PATH:-/var/www/cleenzo.co.in/html}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$REPO_ROOT"

echo "→ Branch: $(git rev-parse --abbrev-ref HEAD) @ $(git rev-parse --short HEAD)"
echo "→ npm ci + build..."
npm ci
npm run build

echo "→ rsync to ${DEPLOY_PATH}..."
sudo mkdir -p "$DEPLOY_PATH"
sudo rsync -av --delete build/ "${DEPLOY_PATH}/"
sudo find "$DEPLOY_PATH" -type d -exec chmod 755 {} \;
sudo find "$DEPLOY_PATH" -type f -exec chmod 644 {} \;

echo "✓ Landing page deployed. Check: https://www.cleenzo.co.in/deploy-info.json"
