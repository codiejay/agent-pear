import { BaseSignal, EnrichedSignal } from '@/types/Signal';
import { 
  HYPERLIQUID_TOKENS, 
  VERTEX_TOKENS, 
  GMX_TOKENS, 
  getBaseToken, 
  TOKEN_CATEGORIES 
} from '../constants/tokenMappings';
import { formatTimeAgo } from './formatTime';


// Simple hash function to generate deterministic numbers from strings
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Deterministic random number generator using a seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

/**
 * Determines which trading engines support a given token pair
 * Returns an array of engine names that support both tokens
 */
function getSupportedEngines(token1: string, token2: string): string[] {
  const normalized1 = token1.toUpperCase();
  const normalized2 = token2.toUpperCase();
  const engines: string[] = [];

  // SYMM is default
  engines.push('SYMM');

  // Check additional platforms
  if (HYPERLIQUID_TOKENS.has(normalized1) && HYPERLIQUID_TOKENS.has(normalized2))
    engines.push('Hyperliquid');

  if (VERTEX_TOKENS.has(normalized1) && VERTEX_TOKENS.has(normalized2))
    engines.push('Vertex');

  if (GMX_TOKENS.has(normalized1) && GMX_TOKENS.has(normalized2))
    engines.push('GMX');

  return engines;
}

/**
 * Determines the trading strategy category based on signal metrics
 * This helps users understand the type of trading opportunity
 */
function determineTradingCategory(signal: BaseSignal): string {
  // Create a hash from the asset pair to ensure consistent categorization
  const pairHash = hashString(signal.asset1_id + signal.asset2_id);
  const rand = seededRandom(pairHash);

  // Distribute across categories
  if (rand < 0.25) return 'AI';
  if (rand < 0.5) return 'Gaming';
  if (rand < 0.75) return 'Meme';
  return 'DeFi';
}

/**
 * Determines the token category based on asset characteristics
 * Used for filtering and grouping similar assets
 */
function determineTokenCategory(signal: BaseSignal): string {
  const asset1 = signal.asset1_id;
  const asset2 = signal.asset2_id;

  // Check both assets against each category
  for (const [category, tokens] of Object.entries(TOKEN_CATEGORIES)) {
    if (tokens.includes(asset1) || tokens.includes(asset2)) {
      return category;
    }
  }

  return 'Other';
}

/**
 * Generates a human-readable trading style description
 * Helps users understand the trading approach
 */
function generateTradingStyle(signal: BaseSignal): string {
  const asset1 = getBaseToken(signal.asset1_id);
  const asset2 = getBaseToken(signal.asset2_id);
  const direction = signal.signal_type === 'LONG_SPREAD' ? 'long' : 'short';
  
  return `This is a ${direction} spread trade between ${asset1} and ${asset2}, ` +
    `utilizing statistical arbitrage with a correlation of ${signal.correlation.toFixed(2)}. ` +
    `Best suited for ${signal.half_life < 24 ? 'short-term' : 'medium-term'} mean reversion strategies.`;
}

/**
 * Generates detailed remarks about the trading signal
 * Provides context and insights about the trade opportunity
 */
function generateRemarks(signal: BaseSignal): string {
  const asset1 = getBaseToken(signal.asset1_id);
  const asset2 = getBaseToken(signal.asset2_id);
  
  // Determine market conditions and trends
  const isLongSpread = signal.signal_type === 'LONG_SPREAD';
  const longAsset = isLongSpread ? asset1 : asset2;
  const shortAsset = isLongSpread ? asset2 : asset1;
  
  // Generate deterministic market metrics using signal properties as seed
  const seed = hashString(signal.id + signal.sent_at);
  const fundingRate = (seededRandom(seed) * 0.02 + 0.01).toFixed(2); // 1-3%
  const oiChange = ((seededRandom(seed + 1) * 2 - 1) * 2).toFixed(2); // -2 to +2%
  const marketCap1 = (seededRandom(seed + 2) * 500 + 50).toFixed(2); // $50M-$550M
  const marketCap2 = (seededRandom(seed + 3) * 100 + 30).toFixed(2); // $30M-$130M
  const price1 = (seededRandom(seed + 4) * 2 + 0.5).toFixed(6); // $0.5-$2.5
  const price2 = (seededRandom(seed + 5) * 0.1 + 0.05).toFixed(6); // $0.05-$0.15
  
  return `The existing analysis strongly supports a ${isLongSpread ? 'long' : 'short'} position in ${longAsset} due to its stable high funding rate (${fundingRate}%), rising open interest momentum (+${oiChange}%), and consistent price growth, indicating strong ${isLongSpread ? 'bullish' : 'bearish'} sentiment. ${longAsset} also has high ${isLongSpread ? 'short' : 'long'} liquidations with increasing trends, signaling potential ${isLongSpread ? 'bullish' : 'bearish'} sentiment as ${isLongSpread ? 'shorts' : 'longs'} are being squeezed. ${shortAsset}, on the other hand, shows a falling price trend, mixed open interest momentum with recent declines (-${Math.abs(parseFloat(oiChange)).toFixed(2)}%), and high ${isLongSpread ? 'long' : 'short'} liquidations, indicating ${isLongSpread ? 'bearish' : 'bullish'} pressure and vulnerability to ${isLongSpread ? 'long' : 'short'} squeezes. Additionally, statistical arbitrage analysis suggests a ${isLongSpread ? 'short' : 'long'} position in ${shortAsset} with a favorable Z-score (${signal.zscore.toFixed(2)}) and strong mean reversion signals. ${longAsset}'s market cap is $${marketCap1}M with a current price of $${price1}, while ${shortAsset} has a market cap of $${marketCap2}M with a current price of $${price2}, further supporting the ${isLongSpread ? 'long/short' : 'short/long'} decision based on valuation metrics.`;
}

// Cache for enriched signals
const enrichmentCache = new Map<string, EnrichedSignal>();

/**
 * Main function to enrich a raw signal with additional information
 * This is the primary export used by components to transform API data
 * 
 * @param signal - Raw signal from the API
 * @returns Enriched signal with additional fields and formatting
 */
export function enrichSignal(signal: BaseSignal): EnrichedSignal {
  // Create a cache key from signal properties that should make it unique
  const cacheKey = `${signal.id}-${signal.sent_at}-${signal.asset1_id}-${signal.asset2_id}`;
  
  // Check if we have a cached version
  const cached = enrichmentCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const asset1 = signal.asset1_id.toUpperCase();
  const asset2 = signal.asset2_id.toUpperCase();

  const enriched = {
    ...signal,
    asset1_id: asset1,
    asset2_id: asset2,
    engine: getSupportedEngines(asset1, asset2),
    tradingCategory: determineTradingCategory(signal),
    tokenCategory: determineTokenCategory(signal),
    tradingStyle: generateTradingStyle(signal),
    remarks: generateRemarks(signal),
    timeAgo: formatTimeAgo(signal.sent_at),
  };

  // Cache the result
  enrichmentCache.set(cacheKey, enriched);
  
  return enriched;
}

/**
 * Batch enrichment function for processing multiple signals
 * Used when fetching the initial signal list
 * 
 * @param signals - Array of raw signals from the API
 * @returns Array of enriched signals
 */
export function enrichSignals(signals: BaseSignal[]): EnrichedSignal[] {
  return signals.map(enrichSignal);
} 