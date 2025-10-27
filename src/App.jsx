import { useState } from 'react';
import { useRestaurantData } from './hooks/useRestaurantData';
import FilterSidebar from './components/FilterSidebar';
import RestaurantMap from './components/RestaurantMap';

export default function App() {
  const { allPlaces, loading } = useRestaurantData();
  const [filters, setFilters] = useState({ maxPrice: null, minRating: null, selectedType: null });

  // Filter restaurants based on max price, min rating, and selected type
  const filtered = allPlaces.filter(p => {
    // Check selected type (must be in the types array)
    if (filters.selectedType) {
      if (!p.types || !Array.isArray(p.types) || !p.types.includes(filters.selectedType)) {
        return false;
      }
    }

    // Check max price
    if (filters.maxPrice) {
      // If place has no price data and we're filtering by price, exclude it
      if (!p.price_start) return false;
      // Check if the start price (lowest price) is within budget
      if (p.price_start > filters.maxPrice) return false;
    }

    // Check min rating
    if (filters.minRating) {
      // If place has no rating and we're filtering by rating, exclude it
      if (!p.rating) return false;
      // Check if rating meets minimum
      if (p.rating < filters.minRating) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        Loading restaurants...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif', background: '#ffffff' }}>
      <FilterSidebar
        maxPrice={filters.maxPrice}
        setMaxPrice={(value) => setFilters({ ...filters, maxPrice: value || null })}
        minRating={filters.minRating}
        setMinRating={(value) => setFilters({ ...filters, minRating: value || null })}
        selectedType={filters.selectedType}
        setSelectedType={(value) => setFilters({ ...filters, selectedType: value || null })}
        allPlaces={allPlaces}
        filteredCount={filtered.length}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <RestaurantMap restaurants={filtered} />
      </div>
    </div>
  );
}
