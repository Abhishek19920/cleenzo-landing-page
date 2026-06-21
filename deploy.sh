#!/bin/bash

# Exit immediately if any command exits with a non-zero status
set -e

# --- CONFIGURATION VARIABLES ---
EC2_IP="3.110.16.94"                         # Replace with your actual EC2 Elastic IP
KEY_PATH="../../AWS/qa-cleenzo-pem.pem"                     # Path to your AWS .pem key file
SERVER_DIR="ubuntu@$EC2_IP:/var/www/cleenzo.co.in/html/"
BUILD_FOLDER="build"                                 # Change to "dist" if you are using Vite

echo "======================================================================="
echo "🏗️  STARTING CLEENZO FRONTEND BUILD & PRODUCTION DEPLOYMENT"
echo "======================================================================="

# 1. Compile the production assets locally
echo "📦 Compiling fresh production build assets..."
npm run build

# 2. Wipe the old remote assets to prevent clutter accumulation
echo "🧹 Purging old assets from the EC2 target folder..."
ssh -i "$KEY_PATH" ubuntu@"$EC2_IP" "rm -rf /var/www/cleenzo.co.in/html/*"

# 3. Securely upload the contents of the new build folder to EC2
echo "🚀 Uploading fresh compiled artifacts over SCP..."
scp -i "$KEY_PATH" -r $BUILD_FOLDER/* "$SERVER_DIR"

# 4. Enforce strict permissions settings on the target server
echo "🔒 Restructuring remote directory permissions for Nginx..."
ssh -i "$KEY_PATH" ubuntu@"$EC2_IP" "sudo chown -R ubuntu:ubuntu /var/www/cleenzo.co.in/html && sudo chmod -R 755 /var/www/cleenzo.co.in/html"

echo "======================================================================="
echo "🎉 DEPLOYMENT SUCCESSFUL! https://www.cleenzo.co.in is updated."
echo "======================================================================="