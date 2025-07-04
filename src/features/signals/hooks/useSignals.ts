import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { getSignals } from '@/shared/lib/api/getSignals';
import { enrichSignals } from '@/shared/lib/utils/enrichSignal';
import { filterSignals, generateCategoryOptions } from '../utils/filterSignals';
import type { EnrichedSignal } from '@/types/Signal';
import type { FilterOption } from '@/features/layout/components/FilterCard';

type TimeframeType = '24h' | '7d' | 'all' | undefined;

/**
 * Custom hook for fetching and managing trading signals
 * This hook will be used in any component that needs access to the signals data
 * 
 * Example usage in a component:
 * ```tsx
 * function SignalsList() {
 *   const { data, isLoading, error } = useSignals();
 *   
 *   if (isLoading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *   
 *   return <SignalsGrid signals={data.signals} />;
 * }
 * ```
 */
export function useSignals() {
  const searchParams = useSearchParams();
  
  // Memoize filter parameters
  const filters = useMemo(() => {
    const engines = searchParams.get('engines')?.split(',') || [];
    const timeframe = searchParams.get('timeframe') as TimeframeType;
    const categories = (searchParams.get('categories')?.split(',') || [])
      .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase());
    return {
      engines,
      timeframe: timeframe === '24h' || timeframe === '7d' ? timeframe : undefined,
      categories
    };
  }, [searchParams]);

  const query = useQuery({
    queryKey: ['signals'],
    queryFn: () => getSignals(),
  });

  // Memoize the filtered and enriched signals
  const processedData = useMemo(() => {
    if (!query.data) return null;

    // First sort signals by timestamp (newest first)
    const sortedSignals = [...query.data.signals].sort(
      (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
    );

    // Then enrich them with additional data (categories, timeAgo, etc)
    const enrichedSignals = enrichSignals(sortedSignals);

    // Apply all active filters
    const filteredSignals = filterSignals(enrichedSignals, {
      engines: filters.engines,
      timeframe: filters.timeframe,
      categories: filters.categories
    });

    return {
      signals: filteredSignals,
      count: filteredSignals.length,
      availableCategories: generateCategoryOptions(enrichedSignals),
    };
  }, [query.data, filters]);

  return {
    ...query,
    data: processedData,
  };
}

export type SignalsData = {
  count: number;
  signals: EnrichedSignal[];
  availableCategories: FilterOption[];
}; 