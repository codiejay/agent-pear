import { NextResponse } from 'next/server';

const SIGNALS_API = 'https://pear-stat-arbs.onrender.com/signals/history';

/**
 * Next.js API Route handler for fetching signals
 * This bypasses CORS issues by proxying the request through our Next.js server
 * Returns all available signals which will be filtered client-side
 */
export async function GET() {
  try {
    // Fetch data from the external API
    const response = await fetch(SIGNALS_API, {
      // Cache the response for 1 minute
      next: {
        revalidate: 60
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      signals: data.signals,
      count: data.signals.length
    });
  } catch (error) {
    console.error('Error fetching signals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signals' },
      { status: 500 }
    );
  }
} 