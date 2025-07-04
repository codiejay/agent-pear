/**
 * Base signal type from the API
 * These are the raw fields we receive from: https://pear-stat-arbs.onrender.com/signals/history
 */
export interface BaseSignal {
  id: string;
  asset1_id: string;  // First token in the pair (e.g., "CELOUSDT")
  asset2_id: string;  // Second token in the pair (e.g., "MINAUSDT")
  pair_price: number; // Current trading ratio between the two assets
  timeframe: string;  // Trading timeframe (e.g., "1h")
  signal_type: "LONG_SPREAD" | "SHORT_SPREAD"; // Direction of the trade
  
  // Statistical metrics
  zscore: number;        // Current z-score value
  roll_zscore: number;   // Rolling z-score for trend analysis
  correlation: number;   // Correlation coefficient between assets (0 to 1)
  cointegration: boolean; // Whether the pair is cointegrated
  half_life: number;     // Mean reversion period estimation
  hurst: number;         // Hurst exponent for trend strength
  hedge_ratio: number;   // Optimal hedge ratio between assets
  signal_strength: number; // Overall signal quality metric
  
  // Timing fields
  sent_at: string;    // When the signal was generated
  expires_at: string; // When the signal becomes invalid
}

/**
 * Enriched signal type with our custom fields
 * These fields are added by our enrichment logic in lib/utils/enrichSignal.ts
 */
export interface EnrichedSignal extends BaseSignal {
  // Added by our engine mapping logic
  engine: string[];
  
  // Categories for filtering
  tradingCategory: string;
  tokenCategory: string;
  
  // Human-readable descriptions
  tradingStyle: string;
  remarks: string;
  
  // Formatted time for UI
  timeAgo: string;
}

/**
 * API response structure with pagination
 * Used in the getSignals.ts fetch function
 */
export interface SignalsResponse {
  signals: BaseSignal[];
  count: number;
  limit: number;
  offset: number;
} 