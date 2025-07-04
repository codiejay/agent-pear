import { useState } from "react";
import { cn } from "@/lib/utils";

interface TradingInfoProps {
  tradingStyle: string;
  remarks: string;
  className?: string;
}

export const TradingInfo = ({
  tradingStyle,
  remarks,
  className,
}: TradingInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200; // Characters to show in collapsed state

  const shouldTruncate = remarks.length > maxLength;
  const displayText =
    shouldTruncate && !isExpanded ? remarks.slice(0, maxLength) : remarks;

  return (
    <div className={cn("space-y-[16px]", className)}>
      {/* Trading Style Section */}
      <div className="space-y-[4px]">
        <h4 className="text-[12px] font-medium text-[white]">Trading Style:</h4>
        <p className="text-[12px] text-[#A0A0A0]">{tradingStyle}</p>
      </div>

      {/* Remarks Section */}
      <div className="space-y-2">
        <h4 className="text-[12px] font-medium text-[white]">Remarks:</h4>
        <p className="text-[12px] text-[#A0A0A0]">
          {displayText}
          {shouldTruncate && (
            <>
              {!isExpanded && "... "}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[#A2DB5C] font-medium cursor-pointer"
              >
                {isExpanded ? "See less" : "Read more"}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
