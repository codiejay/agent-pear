"use client";

import { cn } from "@/lib/utils";
import { FilterOptionButton } from "./FilterOptionButton";
import { useFilterUpdate } from "../hooks/useFilterUpdate";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterCardProps {
  title: string;
  options: FilterOption[];
  paramKey: string;
  defaultAllText?: string;
  className?: string;
  isSingleSelect?: boolean;
}

export function FilterCard({
  title,
  options,
  paramKey,
  defaultAllText,
  className,
  isSingleSelect = false,
}: FilterCardProps) {
  const { currentValues, updateFilters } = useFilterUpdate(
    paramKey,
    isSingleSelect
  );

  return (
    <div
      className={cn(
        "flex flex-col p-[8px] gap-[8px] rounded-[12px] bg-[#121512]",
        className
      )}
    >
      {/* Header */}
      <span className="text-[12px] mb-[8px] w-full border-b border-[#222822] pb-[8px] font-medium text-[#A0A0A0]">
        {title}
      </span>

      {/* Options */}
      <div className="flex flex-col gap-[12px]">
        {/* "All" option */}
        {defaultAllText && (
          <FilterOptionButton
            isSelected={currentValues.length === 0}
            label={defaultAllText}
            onClick={() => updateFilters("", true)}
          />
        )}

        {/* Individual options */}
        {options.map((option) => (
          <FilterOptionButton
            key={option.id}
            isSelected={currentValues.includes(option.value)}
            label={option.label}
            onClick={() => updateFilters(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
