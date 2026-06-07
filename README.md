# Cleenzo Landing Page

Single-page laundry landing — WhatsApp booking, express delivery USP, and app download.

## Structure

```
src/
  App.jsx              # Routes + sticky CTA
  constants.js         # WhatsApp, discount, app links
  whatsapp.js          # Open WhatsApp chat helper
  index.js
  index.css
  layout/              # Navbar, Footer, MainLayout
  sections/            # Landing page blocks
  pages/               # Home, NotFound
```

## Run

```bash
npm install
npm start
```

## Configure

Edit `src/constants.js` for phone number, offers, services, and store links.

## Local dev (skip launch gate)

`.env.development` sets `REACT_APP_DISABLE_LAUNCH_GATE=true` so you can work inside the app before 16 June 2026.

Restart `npm start` after changing env files. For production builds, the launch gate stays enabled unless you set that variable.
