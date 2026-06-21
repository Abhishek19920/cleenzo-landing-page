#!/bin/bash
# Apply canonical www redirect on EC2 (run on server after reviewing nginx/cleenzo-frontend.conf)
set -e

CONF_SRC="$(dirname "$0")/nginx/cleenzo-frontend.conf"
CONF_DEST="/etc/nginx/sites-available/cleenzo-frontend"

echo "Copying nginx config..."
sudo cp "$CONF_SRC" "$CONF_DEST"
sudo ln -sf "$CONF_DEST" /etc/nginx/sites-enabled/cleenzo-frontend

echo "Testing nginx..."
sudo nginx -t

echo "Reloading nginx..."
sudo systemctl reload nginx

echo "Done. Verify:"
echo "  curl -sI https://cleenzo.co.in/ | grep -i location"
echo "  Expected: Location: https://www.cleenzo.co.in/"
