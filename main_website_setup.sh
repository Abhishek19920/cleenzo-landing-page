#!/bin/bash

# Exit immediately if any command returns a non-zero exit status
set -e

# --- CONFIGURATION VARIABLES ---
DOMAIN="cleenzo.co.in"
WWW_DOMAIN="www.cleenzo.co.in"
WEB_ROOT="/var/www/$DOMAIN/html"
FRONTEND_CONF="/etc/nginx/sites-available/cleenzo-frontend"
ADMIN_EMAIL="cs.shineworks@gmail.com"  

echo "======================================================================="
echo "⚙️  STARTING COMPLETE FRONTEND ENVIRONMENT PROVISIONING"
echo "======================================================================="

# 1. Install System Prerequisites Safely
echo "📥 Updating system package repositories..."
sudo apt-get update -y

echo "📦 Installing Nginx, Certbot, and Python Nginx automation modules..."
# Combining these here ensures the 'command not found' error can never happen on a fresh machine
sudo apt-get install -y nginx certbot python3-certbot-nginx

# 2. Provision the Target Web Root Folder Structure
echo "📂 Creating static folder structure at $WEB_ROOT..."
sudo mkdir -p "$WEB_ROOT"

# Adjust ownership so your standard 'ubuntu' user can upload React assets later
sudo chown -R ubuntu:ubuntu /var/www/$DOMAIN
sudo chmod -R 755 /var/www/$DOMAIN

# 3. Create a Structural Placeholder index.html File
echo "📝 Creating temporary testing index.html..."
cat <<EOF > "$WEB_ROOT/index.html"
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cleenzo Frontend Framework</title>
    <style>
        body { font-family: system-ui, sans-serif; text-align: center; background: #f8fafc; color: #1e293b; padding-top: 100px; }
        .box { background: white; max-width: 550px; margin: 0 auto; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        h1 { color: #3b82f6; }
        span { color: #10b981; font-weight: bold; }
    </style>
</head>
<body>
    <div class="box">
        <h1>🚀 Cleenzo React Frontend is Live!</h1>
        <p>Running securely under HTTPS alongside your <span>Django API Backend</span>.</p>
    </div>
</body>
</html>
EOF

# 4. Create the Dedicated Nginx Server Block Configuration
echo "🛠️ Generating isolated Nginx site configuration block..."
sudo cat <<EOF > "$FRONTEND_CONF"
server {
    listen 80;
    listen [::]:80;

    # This configuration explicitly catches ONLY main domain traffic strings
    server_name $DOMAIN $WWW_DOMAIN;

    root $WEB_ROOT;
    index index.html index.htm;

    # Gracefully routes single-page application requests back to the React index
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# 5. Activate the Configuration Layer and Reset the Daemons
echo "🔗 Activating frontend configuration layer..."
sudo ln -sf "$FRONTEND_CONF" "/etc/nginx/sites-enabled/"

echo "🔄 Reloading systemctl units to clear configuration warnings..."
sudo systemctl daemon-reload

echo "🔍 Verifying overall Nginx system configuration health..."
sudo nginx -t

echo "🔄 Restarting Nginx service..."
sudo systemctl restart nginx

# 6. Secure the Domain Mapping via Certbot SSL
echo "🔐 Initiating Certbot automated SSL challenge sequence..."
# The flags below ensure the script runs completely automatically without stopping to ask you questions
sudo certbot --nginx \
             --non-interactive \
             --agree-tos \
             --email "$ADMIN_EMAIL" \
             -d "$DOMAIN" \
             -d "$WWW_DOMAIN"

# Final reload to apply the newly acquired SSL mappings securely
sudo systemctl reload nginx

echo "======================================================================="
echo "🎉 DEPLOYMENT SUITE SUCCESSFUL & INSTANCE READY!"
echo "======================================================================="