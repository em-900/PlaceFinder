import { useEffect, useState } from 'react';

// const fileList = ["places.json"];

export function useRestaurantData() {
  const [allPlaces, setAllPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/places.json')
      .then(res => {
        if (!res.ok) {
          console.error('Failed to fetch places.json:', res.status);
          return [];
        }
        return res.json();
      })
      .then(places => {
        // Transform data to expected format
        const transformed = places
          .filter(p => p.Title && p.Title.trim() !== '' && p.google_place_data?.location && p.google_place_data?.businessStatus !== 'CLOSED_PERMANENTLY') // Only include places with valid title and location data and are not permanently closed
          .map(p => ({
            Title: p.Title,
            Note: p.Note,
            URL: p.URL,
            Tags: p.Tags,
            Comment: p.Comment,
            lat: p.google_place_data.location.latitude,
            lng: p.google_place_data.location.longitude,
            address: p.google_place_data.formattedAddress,
            rating: p.google_place_data.rating,
            user_ratings_total: p.google_place_data.userRatingCount,
            price_range: p.google_place_data.priceRange,
            price_start: p.google_place_data.priceRange?.startPrice?.units ? Number(p.google_place_data.priceRange.startPrice.units) : null,
            price_end: p.google_place_data.priceRange?.endPrice?.units ? Number(p.google_place_data.priceRange.endPrice.units) : null,
            types: p.google_place_data.types,
            primaryType: p.google_place_data.primaryType,
            place_id: p.google_place_data.id,
            list: 'places.json',
          }));

        setAllPlaces(transformed);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading places.json:', err);
        setAllPlaces([]);
        setLoading(false);
      });
  }, []);

  return { allPlaces, loading };
}

// export { fileList };

