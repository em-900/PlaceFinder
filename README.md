# Google Maps List Viewer

A React app for viewing and comparing restaurant lists on an interactive map using Leaflet, with Google Places API integration.

## Features

- 📍 View restaurant locations on an interactive map
- 🔍 Search restaurants by name
- ✅ Filter by cuisine lists (BBQ, Bulgogi, etc.)
- 💰 Filter by price level
- 🗺️ Compare local restaurant data with Google Places API results
- 🎨 Color-coded markers for different cuisine types

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

Get your API key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Make sure to enable the **Places API**.

3. Add restaurant JSON files to the `public/` folder. Format:
```json
[
  {
    "Title": "Restaurant Name",
    "lat": 37.5570994,
    "lng": 127.0116712,
    "address": "Full address",
    "rating": 4.2,
    "user_ratings_total": 2723,
    "price_level": 2,
    "URL": "https://maps.google.com/..."
  }
]
```

4. Run the dev server:
```bash
npm run dev
```

## How It Works

### Google Places API Integration

When you search for a cuisine (e.g., "bbq", "korean"), the app:
1. Queries Google Places API for matching restaurants in Seoul
2. Compares those results with your local JSON files
3. Shows only restaurants that appear in BOTH datasets (matches by location)

This helps you verify which restaurants in your curated lists are also recognized by Google.

## Project Structure

```
src/
├── components/
│   ├── FilterSidebar.jsx    # Left sidebar with filters
│   ├── RestaurantMap.jsx      # Leaflet map display
│   └── PlacesSearch.jsx       # Google Places API search
├── hooks/
│   └── useRestaurantData.js   # Data loading logic
└── App.jsx                     # Main app component
```
# PlaceFinder
