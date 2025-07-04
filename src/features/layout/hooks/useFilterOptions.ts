import { useSignals } from "@/features/signals/hooks/useSignals";
import { timeFilterOptions, engineFilterOptions } from "../constants/filters";

export function useFilterOptions() {
  const { data } = useSignals();
  
  return {
    timeFilterOptions,
    engineFilterOptions,
    categoryFilterOptions: data?.availableCategories || []
  };
} 