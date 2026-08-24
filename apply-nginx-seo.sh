#!/usr/bin/env bash
# Apply SEO nginx config on EC2 (www → apex, HTTP → HTTPS, trailing slash, prerender try_files)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
CONF_SRC="$ROOT/nginx/cleenzo-frontend.conf"
CONF_DEST="/etc/nginx/sites-available/cleenzo-frontend"

if [[ ! -f "$CONF_SRC" ]]; then
  echo "Missing $CONF_SRC"
  exit 1
fi

echo "Copying nginx config from $CONF_SRC ..."
sudo cp "$CONF_SRC" "$CONF_DEST"
sudo ln -sf "$CONF_DEST" /etc/nginx/sites-enabled/cleenzo-frontend

# Disable conflicting site configs that may serve SPA-only or strip .html
for f in /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/cleenzo /etc/nginx/sites-enabled/cleenzo.co.in; do
  if [[ -e "$f" ]]; then
    echo "Note: $f exists — ensure it does not override server_name cleenzo.co.in / www"
  fi
done

echo "Testing nginx..."
sudo nginx -t

echo "Reloading nginx..."
sudo systemctl reload nginx

echo ""
echo "Done. Verify (expect 301 → apex / trailing slash, then correct titles):"
echo "  curl -sI https://www.cleenzo.co.in/about/ | grep -i location"
echo "    → Location: https://cleenzo.co.in/about/"
echo "  curl -sI https://cleenzo.co.in/about | grep -i location"
echo "    → Location: https://cleenzo.co.in/about/"
echo "  curl -sL https://cleenzo.co.in/about/ | grep -oE '<title>[^<]+'"
echo "    → About Cleenzo | ..."
echo "  curl -sI http://cleenzo.co.in/ | grep -i location"
echo "    → Location: https://cleenzo.co.in/"
