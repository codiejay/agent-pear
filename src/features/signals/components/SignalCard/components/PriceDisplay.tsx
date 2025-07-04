import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PriceDisplayProps } from "../types";

export const PriceDisplayAndCategory = ({
  price,
  percentageChange,
  className,
  category,
}: PriceDisplayProps) => {
  const isPositive = percentageChange >= 0;

  return (
    <div className={cn("flex items-center gap-2 bg-[#080C03]", className)}>
      <span className="text-[24px] font-bold text-white">
        ${price.toFixed(2)}
      </span>
      <Badge
        className={cn(
          "px-[8px] py-[4px] text-[12px] font-bold rounded-[30px] border-none bg-[#A2DB5C]/20 text-[#A2DB5C]",
          isPositive
            ? "bg-[#A2DB5C]/20 text-[#A2DB5C]"
            : "bg-[#FF0000]/20 text-[#FF0000]"
        )}
      >
        {isPositive ? "+" : ""}
        {percentageChange.toFixed(1)}%
      </Badge>
      <Badge
        className={cn(
          "px-[8px] py-[4px] text-[12px] font-bold rounded-[30px] border-none bg-[#40A6A6]/20 text-[#40A6A6]"
        )}
      >
        {category}
      </Badge>
    </div>
  );
};
