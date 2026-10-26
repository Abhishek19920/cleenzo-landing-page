#!/usr/bin/env bash
# Post-deploy checks: route-level static HTML + sitemap/robots (run on EC2 or after deploy).
set -euo pipefail

BASE="${1:-https://cleenzo.co.in}"

check_url() {
  local path="$1"
  local expect_canon="$2"
  local expect_snippet="$3"
  local url="${BASE}${path}"
  local html
  html="$(curl -sL "$url")"
  local canon title
  canon="$(echo "$html" | grep -oE 'rel="canonical" href="[^"]+"' | head -1 || true)"
  title="$(echo "$html" | grep -oE '<title>[^<]+' | head -1 || true)"

  if [[ "$canon" != *"$expect_canon"* ]]; then
    echo "FAIL $url canonical expected $expect_canon got ${canon:-none}"
    return 1
  fi
  if [[ -n "$expect_snippet" && "$html" != *"$expect_snippet"* ]]; then
    echo "FAIL $url missing content: $expect_snippet"
    return 1
  fi
  echo "OK   $url"
  echo "     $title"
  echo "     $canon"
}

echo "→ Homepage"
check_url "/" "https://cleenzo.co.in/" "Raj Nagar"

echo "→ Service pages"
check_url "/laundry-service-ghaziabad/" \
  "https://cleenzo.co.in/laundry-service-ghaziabad/" \
  "Laundry Service in Ghaziabad"

check_url "/dry-cleaning-ghaziabad/" \
  "https://cleenzo.co.in/dry-cleaning-ghaziabad/" \
  "Dry Cleaning"

check_url "/dry-cleaners-raj-nagar-extension/" \
  "https://cleenzo.co.in/dry-cleaners-raj-nagar-extension/" \
  "Raj Nagar"

echo "→ Trailing slash redirect"
loc="$(curl -sI "${BASE}/laundry-service-ghaziabad" | tr -d '\r' | grep -i '^location:' | awk '{print $2}' || true)"
if [[ "$loc" != *"/laundry-service-ghaziabad/"* ]]; then
  echo "FAIL non-slash redirect Location=${loc:-empty}"
  exit 1
fi
echo "OK   301 /laundry-service-ghaziabad → ${loc}"

echo "→ About page must NOT be homepage shell"
about_title="$(curl -sL "${BASE}/about/" | grep -oE '<title>[^<]+' | head -1 || true)"
if [[ "$about_title" != *"About Cleenzo"* ]]; then
  echo "FAIL /about/ title is homepage shell: ${about_title:-empty}"
  echo "     Deploy prerendered build/ (ec2-deploy-landing-from-git.sh) and apply-nginx-seo.sh"
  exit 1
fi
echo "OK   /about/ → ${about_title}"

echo "→ Soft-404 must be real HTTP 404 (not homepage shell)"
soft_code="$(curl -s -o /tmp/cleenzo-soft404.html -w '%{http_code}' "${BASE}/this-page-does-not-exist-seo-check/")"
soft_title="$(grep -oE '<title>[^<]+' /tmp/cleenzo-soft404.html | head -1 || true)"
soft_robots="$(grep -oE 'name="robots" content="[^"]+"' /tmp/cleenzo-soft404.html | head -1 || true)"
if [[ "$soft_code" != "404" ]]; then
  echo "FAIL unknown URL returned HTTP $soft_code (expected 404)"
  exit 1
fi
if [[ "$soft_title" == *"Raj Nagar Extension"* && "$soft_title" != *"not found"* ]]; then
  echo "FAIL soft-404 still serving homepage title: ${soft_title}"
  exit 1
fi
if [[ "$soft_robots" != *"noindex"* ]]; then
  echo "FAIL 404 page missing noindex robots: ${soft_robots:-none}"
  exit 1
fi
echo "OK   unknown URL → HTTP 404 + noindex (${soft_title})"

echo "→ Location pages"
check_url "/laundry-dry-cleaning-indirapuram/" \
  "https://cleenzo.co.in/laundry-dry-cleaning-indirapuram/" \
  "Indirapuram"
check_url "/laundry-dry-cleaning-vaishali/" \
  "https://cleenzo.co.in/laundry-dry-cleaning-vaishali/" \
  "Vaishali"
check_url "/laundry-dry-cleaning-noida-extension/" \
  "https://cleenzo.co.in/laundry-dry-cleaning-noida-extension/" \
  "Noida Extension"

echo "→ robots.txt"
curl -sf "${BASE}/robots.txt" | grep -q 'Sitemap: https://cleenzo.co.in/sitemap.xml'
echo "OK   robots.txt"

echo "→ sitemap"
count="$(curl -s "${BASE}/sitemap.xml" | grep -c '<loc>' || true)"
if [[ "$count" -lt 20 ]]; then
  echo "FAIL sitemap URL count=$count (expected at least 20)"
  exit 1
fi
curl -s "${BASE}/sitemap.xml" | grep -q 'https://cleenzo.co.in/laundry-service-ghaziabad/'
curl -s "${BASE}/sitemap.xml" | grep -q 'https://cleenzo.co.in/dry-cleaning-ghaziabad/'
curl -s "${BASE}/sitemap.xml" | grep -q 'https://cleenzo.co.in/laundry-dry-cleaning-indirapuram/'
echo "OK   sitemap (${count} URLs, apex)"

echo "All SEO route serving checks passed."
