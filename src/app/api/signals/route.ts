import { NextResponse } from 'next/server';

const SIGNALS_API = 'https://pear-stat-arbs.onrender.com/signals/history';
const SIGNAL_LIMIT = 10;

/**
 * Next.js API Route handler for fetching signals
 * This bypasses CORS issues by proxying the request through our Next.js server
 * Returns the 10 most recent signals
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
    
    // Take only the first 10 signals
    const limitedSignals = data.signals.slice(0, SIGNAL_LIMIT);

    return NextResponse.json({
      signals: limitedSignals,
      count: limitedSignals.length
    });
  } catch (error) {
    console.error('Error fetching signals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signals' },
      { status: 500 }
    );
  }
} 