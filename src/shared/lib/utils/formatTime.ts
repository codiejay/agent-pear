import { formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Formats a date string into a relative time string (e.g., "2 hours ago")
 * Used in the SignalCard component to show when signals were sent
 * 
 * @param dateString - ISO date string from the API
 * @returns Formatted relative time string
 * 
 * @example
 * formatTimeAgo("2024-03-20T10:00:00Z") // returns "2 hours ago"
 */
export function formatTimeAgo(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Time unavailable';
  }
}

/**
 * Checks if a signal is expired based on its expires_at field
 * Used to filter out or visually indicate expired signals
 * 
 * @param expiresAt - ISO date string from the API
 * @returns boolean indicating if the signal has expired
 */
export function isExpired(expiresAt: string): boolean {
  try {
    const expiryDate = parseISO(expiresAt);
    return expiryDate < new Date();
  } catch (error) {
    console.error('Error checking expiry:', error);
    return true; // Safer to consider invalid dates as expired
  }
} 