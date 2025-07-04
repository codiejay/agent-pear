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
  
  const filters = useMemo(() => {
    const engines = searchParams.get('engines')?.split(',') || [];
    const timeframe = searchParams.get('timeframe') as TimeframeType;
    const categories = (searchParams.get('categories')?.split(',') || [])
      .map(cat => cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase());
    const searchPair = searchParams.get('searchPair') || undefined;
    const searchToken = searchParams.get('searchToken') || undefined;
    
    return {
      engines,
      timeframe: timeframe === '24h' || timeframe === '7d' ? timeframe : undefined,
      categories,
      searchPair,
      searchToken
    };
  }, [searchParams]);

  const query = useQuery({
    queryKey: ['signals'],
    queryFn: () => getSignals(),
  });

  const processedData = useMemo(() => {
    if (!query.data) return null;

    const sortedSignals = [...query.data.signals].sort(
      (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
    );

    const enrichedSignals = enrichSignals(sortedSignals);

    // Apply search filters first (this is very subjective, but if the team has an in-house method of searching hireachy, we can adjust this)
    let filteredSignals = enrichedSignals;

    if (filters.searchToken || filters.searchPair) {
      filteredSignals = enrichedSignals.filter(signal => {
        const matchesToken = !filters.searchToken || (
          signal.asset1_id.toLowerCase().includes(filters.searchToken.toLowerCase()) ||
          signal.asset2_id.toLowerCase().includes(filters.searchToken.toLowerCase())
        );
        
        const searchPairLower = filters.searchPair?.toLowerCase() || '';
        const matchesPair = !filters.searchPair || (
          signal.asset1_id.toLowerCase().includes(searchPairLower) ||
          signal.asset2_id.toLowerCase().includes(searchPairLower)
        );

        return matchesToken && matchesPair;
      });
    }

    // Then apply the rest of the filters
    const finalFilteredSignals = filterSignals(filteredSignals, {
      engines: filters.engines,
      timeframe: filters.timeframe,
      categories: filters.categories
    });

    return {
      signals: finalFilteredSignals,
      count: finalFilteredSignals.length,
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