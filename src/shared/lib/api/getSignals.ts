import { SignalsResponse } from '@/types/Signal';

/**
 * Fetches trading signals through our Next.js API route
 * This avoids CORS issues by proxying the request through our server
 * 
 * @returns Promise<SignalsResponse> The API response containing all signals
 */
export async function getSignals(): Promise<SignalsResponse> {
  try {
    // Fetch data from our Next.js API route
    const response = await fetch('/api/signals');
    
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