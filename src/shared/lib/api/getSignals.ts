import { SignalsResponse } from '@/types/Signal';

interface GetSignalsOptions {
  limit?: number;
  offset?: number;
}

/**
 * Fetches trading signals through our Next.js API route
 * This avoids CORS issues by proxying the request through our server
 * 
 * @param options - Pagination options
 * @param options.limit - Number of signals to fetch (default: 10)
 * @param options.offset - Number of signals to skip (default: 0)
 * @throws Will throw an error if the API request fails
 * @returns Promise<SignalsResponse> The API response containing signals array and count
 */
export async function getSignals(options: GetSignalsOptions = {}): Promise<SignalsResponse> {
  const { limit = 10, offset = 0 } = options;

  try {
    // Build URL with query parameters
    const url = new URL('/api/signals', window.location.origin);
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('offset', offset.toString());

    // Fetch data from our Next.js API route
    const response = await fetch(url);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Parse and validate the response
    const data: SignalsResponse = await response.json();
    
    // Basic validation of the response structure
    if (!data.signals || !Array.isArray(data.signals)) {
      throw new Error('Invalid API response format');
    }

    return data;
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching signals:', error);
    
    // Re-throw the error to be handled by the React Query error boundary
    throw error;
  }
} 