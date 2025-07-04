"use client";

import { cn } from "@/lib/utils";
import { LayoutProps } from "../types/layout.types";
import { HeaderCard } from "./HeaderCard";
import { FilterCard } from "./FilterCard";
import { SmallerMobileFilter } from "./SmallerMobileFilter";
import {
  TIME_PARAM_KEY,
  ENGINE_PARAM_KEY,
  CATEGORY_PARAM_KEY,
  timeFilterOptions,
  engineFilterOptions,
  categoryFilterOptions,
} from "../constants/filters";

export const Sidebar = ({ className }: Pick<LayoutProps, "className">) => {
  const FILTER_CARDS_DATA = [
    {
      title: "Updates",
      options: timeFilterOptions,
      paramKey: TIME_PARAM_KEY,
      defaultAllText: "Most Recent",
      isSingleSelect: true,
    },
    {
      title: "Engines",
      options: engineFilterOptions,
      paramKey: ENGINE_PARAM_KEY,
      defaultAllText: "All Engines",
    },
    {
      title: "Categories",
      options: categoryFilterOptions,
      paramKey: CATEGORY_PARAM_KEY,
      defaultAllText: "All Categories",
    },
  ];
  return (
    <aside
      className={cn(
        "[@media(min-width:834px)]:max-w-[312px]  [@media(min-width:834px)]:w-[312px]  w-full p-4 pt-[0px]",
        className
      )}
    >
      <div className="flex flex-col gap-[24px] relative">
        <HeaderCard
          imagePath="/agent-pear-avatar.svg"
          imageAlt="Agent Pear Logo"
          title="Agent Pear"
          version="v1.0"
          description="Analysing and updating with potential profitable pair trades."
        />

        {/* Desktop Filters */}
        <div className="hidden [@media(min-width:834px)]:flex flex-col gap-[24px] absolute top-[213px] left-0 w-full">
          {FILTER_CARDS_DATA.map((filterCard) => (
            <FilterCard
              key={filterCard.title}
              title={filterCard.title}
              options={filterCard.options}
              paramKey={filterCard.paramKey}
              defaultAllText={filterCard.defaultAllText}
            />
          ))}
        </div>

        {/* Mobile and Smaller Mobile Filters */}
        <div className="[@media(min-width:834px)]:hidden">
          <SmallerMobileFilter />
        </div>
      </div>
    </aside>
  );
};
