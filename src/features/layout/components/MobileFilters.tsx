"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TIME_PARAM_KEY,
  ENGINE_PARAM_KEY,
  CATEGORY_PARAM_KEY,
} from "../constants/filters";
import { useFilterUpdate } from "../hooks/useFilterUpdate";
import { useFilterOptions } from "../hooks/useFilterOptions";

interface MobileFilterDropdownProps {
  title: string;
  options: Array<{ id: string; label: string; value: string }>;
  paramKey: string;
  defaultAllText?: string;
  isSingleSelect?: boolean;
}

const MobileFilterDropdown = ({
  title,
  options,
  paramKey,
  defaultAllText,
  isSingleSelect = false,
}: MobileFilterDropdownProps) => {
  const { currentValues, updateFilters } = useFilterUpdate(
    paramKey,
    isSingleSelect
  );

  const currentLabel = useMemo(() => {
    if (currentValues.length === 0 && defaultAllText) return defaultAllText;
    if (currentValues.length === 0) return title;

    const selectedOption = options.find(
      (opt) => opt.value === currentValues[0]
    );
    return selectedOption?.label || title;
  }, [currentValues, defaultAllText, options, title]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center justify-between px-[16px] py-[8px] rounded-[8px] bg-[#121512] min-w-[140px]",
          "border border-none hover:border-[#2B2F2C] transition-colors outline-none"
        )}
      >
        <div className="flex items-center gap-[4px]">
          <span className="text-[12px] font-medium text-[#A0A0A0]">
            {title}:
          </span>
          <span className="text-[12px] font-medium text-white bg-[#0F110F] rounded-[8px] flex p-[8px]">
            {currentLabel}{" "}
            {currentValues.length > 1 && `+${currentValues.length - 1}`}
          </span>
        </div>

        <ChevronDown
          className="ml-2 h-4 w-4 text-[#A0A0A0] transition-transform duration-200"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] bg-[#121512] border-[#222822] rounded-[8px] p-[8px] z-50"
      >
        {defaultAllText && (
          <DropdownMenuItem
            onClick={() => updateFilters("", true)}
            className={cn(
              "px-[16px] py-[8px] text-[14px] cursor-pointer",
              currentValues.length === 0 ? "text-white" : "text-[#A0A0A0]",
              "hover:bg-[#1A1D1A] focus:bg-[#1A1D1A] focus:text-white "
            )}
          >
            {defaultAllText}
          </DropdownMenuItem>
        )}
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => updateFilters(option.value)}
            className={cn(
              "px-[16px] py-[8px] text-[14px] cursor-pointer",
              currentValues.includes(option.value)
                ? "text-[#A2DB5C]"
                : "text-[#A0A0A0]",
              "hover:bg-[#1A1D1A] focus:bg-[#1A1D1A] focus:text-white"
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export interface MobileFiltersProps {
  className?: string;
  isVertical?: boolean;
}

export function MobileFilters({
  className,
  isVertical = false,
}: MobileFiltersProps) {
  const { timeFilterOptions, engineFilterOptions, categoryFilterOptions } =
    useFilterOptions();

  const FILTER_CARDS_DATA = [
    {
      title: "Updates",
      options: timeFilterOptions,
      paramKey: TIME_PARAM_KEY,
      defaultAllText: "Most Recent",
    },
    {
      title: "Engines",
      options: engineFilterOptions,
      paramKey: ENGINE_PARAM_KEY,
      defaultAllText: "All Engines",
    },
    ...(categoryFilterOptions.length > 0
      ? [
          {
            title: "Categories",
            options: categoryFilterOptions,
            paramKey: CATEGORY_PARAM_KEY,
            defaultAllText: "All Categories",
          },
        ]
      : []),
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-[8px] pb-[16px] z-10",
        isVertical ? "flex-col items-stretch" : "overflow-x-auto",
        className
      )}
    >
      {FILTER_CARDS_DATA.map((filterCard) => (
        <MobileFilterDropdown
          key={filterCard.title}
          title={filterCard.title}
          options={filterCard.options}
          paramKey={filterCard.paramKey}
          defaultAllText={filterCard.defaultAllText}
        />
      ))}
    </div>
  );
}
