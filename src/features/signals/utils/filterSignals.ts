import { EnrichedSignal } from "@/types/Signal";
import { FilterOption } from "@/features/layout/components/FilterCard";

interface FilterOptions {
  engines?: string[];
  timeframe?: '24h' | '7d' | 'all';
  categories?: string[]; // Updated to string[]
  // We'll add more filter options here as we need them
}

/**
 * Filters signals based on selected engines
 * @param signals - Array of enriched signals to filter
 * @param engines - Array of engine names to filter by (case insensitive)
 * @returns Filtered array of signals
 */
export function filterByEngines(signals: EnrichedSignal[], engines: string[]): EnrichedSignal[] {
  if (!engines?.length) return signals;

  return signals.filter(signal => 
    engines.some(engine => engine.toLowerCase() === signal.engine.toLowerCase())
  );
}

/**
 * Filters signals based on categories (both trading and token categories)
 * @param signals - Array of enriched signals to filter
 * @param categories - Array of categories to filter by
 * @returns Filtered array of signals
 */
export const filterByCategories = (signals: EnrichedSignal[], categories: string[]): EnrichedSignal[] => {
  if (!categories?.length) return signals;

  return signals.filter(signal => {
    const signalCategories = [signal.tradingCategory.toLowerCase()];
    
    const isMatch = categories.some(category => 
      signalCategories.includes(category.toLowerCase())
    );
    
    return isMatch;
  });
}

/**
 * Filters signals based on how long ago they were sent
 * @param signals - Array of enriched signals to filter
 * @param timeframe - Time range to filter by (24h, 7d, or all)
 * @returns Filtered array of signals
 */
export function filterByTimeframe(signals: EnrichedSignal[], timeframe?: string): EnrichedSignal[] {
  if (!timeframe || timeframe === 'all') return signals;

  const now = new Date();
  const hoursToFilter = timeframe === '24h' ? 24 : 168;

  return signals.filter(signal => {
    const signalDate = new Date(signal.sent_at);
    const hoursDifference = (now.getTime() - signalDate.getTime()) / (1000 * 60 * 60);
    return hoursDifference <= hoursToFilter;
  });
}

/**
 * Main filtering function that applies all filters
 * @param signals - Array of enriched signals to filter
 * @param options - Object containing all filter options
 * @returns Filtered array of signals
 */
export function filterSignals(signals: EnrichedSignal[], options: FilterOptions): EnrichedSignal[] {
  // Return original signals if no filters are active
  if (!options.engines?.length && (!options.timeframe || options.timeframe === 'all') && !options.categories?.length) {
    return signals;
  }

  // Apply only the active filters
  let filteredSignals = signals;

  // Apply engine filter if engines are specified
  if (options.engines?.length) {
    filteredSignals = filterByEngines(filteredSignals, options.engines);
  }

  // Apply category filter if categories are specified
  if (options.categories?.length) {
    filteredSignals = filterByCategories(filteredSignals, options.categories);
  }

  // Only apply time filter if timeframe is specified and not 'all'
  if (options.timeframe && options.timeframe !== 'all') {
    filteredSignals = filterByTimeframe(filteredSignals, options.timeframe);
  }

  return filteredSignals;
}

/**
 * Generates category filter options from available signals
 * Only includes categories that are present in the current signals
 */
export function generateCategoryOptions(signals: EnrichedSignal[]): FilterOption[] {
  const categories = new Set<string>();
  
  signals.forEach(signal => {
    if (signal.tradingCategory) {
      categories.add(signal.tradingCategory.toLowerCase());
    }
  });

  return Array.from(categories).map(category => ({
    id: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
    value: category,
  }));
} 