"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOptionButtonProps {
  isSelected: boolean;
  label: string;
  onClick: () => void;
}

export function FilterOptionButton({
  isSelected,
  label,
  onClick,
}: FilterOptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-[8px] text-[12px] text-[white] p-[8px]"
    >
      <div
        className={cn(
          "w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center",
          isSelected
            ? "bg-[#A2DB5C] border-[#A2DB5C]"
            : "border-[#A2DB5C] bg-[#A2DB5C]/10"
        )}
      >
        {isSelected && <Check className="h-3 w-3 text-black stroke-[3]" />}
      </div>
      <span
        className={cn(
          "text-[12px]",
          isSelected ? "text-white" : "text-[#A0A0A0]"
        )}
      >
        {label}
      </span>
    </button>
  );
}
