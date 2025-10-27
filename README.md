# Google Maps List Viewer

A React app for viewing and comparing restaurant lists on an interactive map using Leaflet, with Google Places API integration.

## Features

- 📍 View restaurant locations on an interactive map
- 🔍 Search restaurants by name
- ✅ Filter by cuisine type (Korean, American, etc.)
- 💰 Filter by price level

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the dev server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── FilterSidebar.jsx    # Left sidebar with filters
│   ├── RestaurantMap.jsx      # Leaflet map display
├── hooks/
│   └── useRestaurantData.js   # Data loading logic
└── App.jsx                     # Main app component
```
# PlaceFinder
