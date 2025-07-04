import { FilterOption } from "../components/FilterCard";

export const TIME_PARAM_KEY = "timeframe";
export const ENGINE_PARAM_KEY = "engines";
export const CATEGORY_PARAM_KEY = "categories";

export const timeFilterOptions: FilterOption[] = [
  {
    id: "24h",
    label: "24 Hours",
    value: "24h",
  },
  {
    id: "7d",
    label: "Last 7 days",
    value: "7d",
  },
];

export const engineFilterOptions: FilterOption[] = [
  {
    id: "hyperliquid",
    label: "Hyperliquid",
    value: "hyperliquid",
  },
  {
    id: "symm",
    label: "SYMM",
    value: "symm",
  },
  {
    id: "vertex",
    label: "Vertex",
    value: "vertex",
  },
  {
    id: "gmx",
    label: "GMX",
    value: "gmx",
  },
];

export const categoryFilterOptions: FilterOption[] = [
  {
    id: "defi",
    label: "DeFi",
    value: "defi",
  },
  {
    id: "meme",
    label: "Meme",
    value: "meme",
  },
  {
    id: "gaming",
    label: "Gaming",
    value: "gaming",
  },
  {
    id: "ai",
    label: "AI",
    value: "ai",
  },
]; 