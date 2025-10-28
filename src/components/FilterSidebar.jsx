import { useState, useMemo, useRef, useEffect } from 'react';
import { formatSnakeCase } from '../utils/helpers';
import { useDebounce } from '../hooks/useDebounce';

export default function FilterSidebar({
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  allPlaces,
  filteredCount,
  selectedType,
  setSelectedType,
  searchTerm,
  setSearchTerm
}) {
  const [minRatingInput, setMinRatingInput] = useState('');
  const [typeSearch, setTypeSearch] = useState('');
  const debouncedTypeSearch = useDebounce(typeSearch, 300);
  const searchContainerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setTypeSearch('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract all unique types from places.types arrays and format them
  const allTypes = useMemo(() => {
    const typeSet = new Set();
    const typeCounts = {};

    allPlaces.forEach(place => {
      if (place.types && Array.isArray(place.types)) {
        place.types.forEach(type => {
          typeSet.add(type);
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
      }
    });

    return Array.from(typeSet)
      .map(type => ({
        value: type,
        label: formatSnakeCase(type),
        count: typeCounts[type]
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allPlaces]);

  // Filter types based on debounced search input
  const filteredTypes = useMemo(() => {
    if (!debouncedTypeSearch) return [];
    const searchLower = debouncedTypeSearch.toLowerCase();
    return allTypes.filter(type =>
      type.label.toLowerCase().includes(searchLower)
    ).slice(0, 10); // Limit to top 10 matches
  }, [allTypes, debouncedTypeSearch]);

  return (
    <div style={{ width: '280px', padding: '1.5rem', overflowY: 'auto', background: '#ffffff', color: '#000', paddingRight: '2rem' }}>
      <h2 style={{ fontWeight: 'bold' }}>PlaceFinder</h2>

      <h4 style={{ fontWeight: 'bold', marginTop: '1.5rem' }}>Search Restaurants</h4>
      <input
        type="text"
        value={searchTerm || ''}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or address..."
        style={{
          width: '100%',
          padding: '8px',
          background: '#f0f0f0',
          color: '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontSize: '14px',
          marginTop: '4px'
        }}
      />

      <h4 style={{ fontWeight: 'bold', marginTop: '1.5rem' }}>Type Filter</h4>
      <div ref={searchContainerRef} style={{ position: 'relative' }}>
        <input
          type="text"
          value={typeSearch}
          onChange={(e) => setTypeSearch(e.target.value)}
          placeholder="Type to search for type..."
          style={{
            width: '100%',
            padding: '8px',
            background: '#f0f0f0',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            marginTop: '4px'
          }}
        />
        {filteredTypes.length > 0 && typeSearch.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            marginTop: '2px'
          }}>
            {filteredTypes.map(type => (
              <div
                key={type.value}
                onClick={() => {
                  setSelectedType(selectedType === type.value ? null : type.value);
                  setTypeSearch('');
                }}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  backgroundColor: selectedType === type.value ? '#e3f2fd' : 'white'
                }}
                onMouseEnter={(e) => {
                  if (selectedType !== type.value) {
                    e.target.style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedType !== type.value) {
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{type.label}</div>
                <div style={{ fontSize: '11px', color: '#666' }}>{type.count} places</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedType && (
        <div style={{
          marginTop: '4px',
          padding: '4px 8px',
          background: '#e3f2fd',
          fontSize: '12px',
          display: 'inline-block'
        }}>
          Selected: {allTypes.find(t => t.value === selectedType)?.label}
          <button
            onClick={() => setSelectedType(null)}
            style={{
              marginLeft: '8px',
              background: 'none',
              border: 'none',
              color: '#1976d2',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Clear
          </button>
        </div>
      )}

      <h4 style={{ fontWeight: 'bold', marginTop: '1.5rem' }}>Max Price (CAD)</h4>
      <input
        type="text"
        inputMode="numeric"
        value={maxPrice || ''}
        placeholder="Max budget (e.g., 50)"
        onChange={(e) => {
          const val = e.target.value;
          setMaxPrice(val === '' ? null : Number(val));
        }}
        style={{
          width: '100%',
          padding: '8px',
          background: '#f0f0f0',
          color: '#000',
          border: '1px solid #ccc',
          marginTop: '4px',
          borderRadius: '4px'
        }}
      />

      <h4 style={{ fontWeight: 'bold', marginTop: '1.5rem' }}>Min Rating</h4>
      <input
        type="number"
        step="0.1"
        min="0"
        max="5"
        value={minRatingInput || ''}
        placeholder="Min rating (e.g., 4.0)"
        onChange={(e) => {
          const val = e.target.value;
          setMinRatingInput(val);
          setMinRating(val === '' ? null : Number(val));
        }}
        style={{
          width: '100%',
          padding: '8px',
          background: '#f0f0f0',
          color: '#000',
          border: '1px solid #ccc',
          marginTop: '4px',
          borderRadius: '4px'
        }}
      />
      {minRating && (
        <div style={{ fontSize: '11px', color: '#666' }}>
          Showing places with {minRating}+ stars
        </div>
      )}
    </div>
  );
}

