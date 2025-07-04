import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useFilterUpdate(paramKey: string, isSingleSelect = false) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentValues = useMemo(
    () => searchParams.get(paramKey)?.split(",") || [],
    [searchParams, paramKey]
  );

  const updateFilters = useCallback(
    (value: string, isAll: boolean = false) => {
      const params = new URLSearchParams(searchParams.toString());

      if (isAll) {
        params.delete(paramKey);
      } else if (isSingleSelect) {
        if (currentValues.includes(value)) {
          return;
        } else {
          params.set(paramKey, value);
        }
      } else {
        let newValues: string[];

        if (currentValues.includes(value)) {
          newValues = currentValues.filter((v) => v !== value);
        } else {
          newValues = [...currentValues, value];
        }

        if (newValues.length > 0) {
          params.set(paramKey, newValues.join(","));
        } else {
          params.delete(paramKey);
        }
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [currentValues, paramKey, pathname, router, searchParams, isSingleSelect]
  );

  return {
    currentValues,
    updateFilters
  };
} 