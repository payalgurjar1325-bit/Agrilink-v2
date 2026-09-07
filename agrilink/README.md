# AgriLink

Frontend prototype for Smart India Hackathon — "Strengthening Market Linkages and Price Discovery for Farmers."

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

To type-check and build for production:

```bash
npm run build
npm run preview
```

## Stack

React + TypeScript + Vite + Tailwind CSS + React Router + Lucide React + Recharts. No Redux, no backend — all data is mocked in `src/data/` and served through a service layer in `src/services/` designed to be swapped for real APIs later.

## Folder structure

```
src/
  components/   Reusable UI (Navbar, Footer, cards, form controls, charts, feedback states)
  pages/        One file per route
  data/         Mock datasets (crops, markets, prices, listings, dashboard data)
  services/     marketService.ts, marketplaceService.ts — the API-shaped layer
  context/      AppContext — language + auth state
  types/        Shared TypeScript interfaces
  utils/        Formatting helpers
```

## Pages

Home · Market Prices · Compare Markets · Marketplace (+ listing detail) · Sell Produce · Farmer Dashboard (incl. price trends, demand insights, nearby markets) · Price Alerts · Login · Register · About

## Core differentiator

`src/services/marketService.ts` → `recommendBestMarket()` ranks mandis by **estimated net earnings after transport cost**, not headline price. The Compare Markets page and the Farmer Dashboard both surface this, including a written reason when the top pick isn't the highest-priced market.

## Next integrations (backend/API)

- Replace mock functions in `marketService.ts` / `marketplaceService.ts` with calls to a real backend
- Government mandi data: AGMARKNET, eNAM
- Maps/distance API for real transport-cost estimates (replacing the fixed ₹/km assumption)
- Weather API for crop/harvest context
- Auth backend (current login/register just sets local state)
- Push/SMS delivery for Price Alerts (currently client-side only, resets on reload)
