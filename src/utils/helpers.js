/**
 * Format primary type name from snake_case to Title Case
 * e.g., "barbecue_restaurant" -> "Barbecue Restaurant"
 */
export function formatSnakeCase(type) {
  if (!type) return '';
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

