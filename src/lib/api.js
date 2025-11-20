/**
 * API service for connecting to Django F1 API backend
 */

// Use empty string to use the Vite proxy, or set VITE_API_URL env var for production
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetch data from the API
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Get all drivers
 */
export async function getDrivers(search = '', ordering = '') {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (ordering) params.append('ordering', ordering);
  
  const queryString = params.toString();
  const endpoint = `/api/drivers/${queryString ? `?${queryString}` : ''}`;
  
  return fetchAPI(endpoint);
}

/**
 * Get all races
 */
export async function getRaces(search = '', ordering = '') {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (ordering) params.append('ordering', ordering);
  
  const queryString = params.toString();
  const endpoint = `/api/races/${queryString ? `?${queryString}` : ''}`;
  
  return fetchAPI(endpoint);
}

/**
 * Get race results
 * @param {string} raceName - Filter by race name (exact match)
 * @param {number} year - Filter by year
 * @param {string} ordering - Order by field (e.g., 'position', '-position')
 */
export async function getRaceResults(raceName = '', year = null, ordering = 'position') {
  const params = new URLSearchParams();
  // Use search for race name (backend supports race__name in search_fields)
  if (raceName) params.append('search', raceName);
  if (ordering) params.append('ordering', ordering);
  
  const queryString = params.toString();
  const endpoint = `/api/results/${queryString ? `?${queryString}` : ''}`;
  
  const results = await fetchAPI(endpoint);
  
  // Filter by year on the client side if specified
  // (Backend search filter doesn't support exact year matching)
  if (year !== null) {
    return results.filter(result => result.race.year === year && 
      (!raceName || result.race.name === raceName));
  }
  
  // If race name is specified, filter for exact match
  if (raceName) {
    return results.filter(result => result.race.name === raceName);
  }
  
  return results;
}

/**
 * Get unique years from races
 */
export async function getAvailableYears() {
  const races = await getRaces();
  const years = [...new Set(races.map(race => race.year))];
  return years.sort((a, b) => b - a); // Sort descending
}

/**
 * Get unique race names for a given year
 */
export async function getRacesByYear(year) {
  const races = await getRaces('', `-year,-round`);
  return races.filter(race => race.year === year);
}

