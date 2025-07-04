import { cn } from "@/lib/utils";
import { SignalHeaderProps } from "../types";

export function SignalHeader({ timeAgo, className }: SignalHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-[#222822] pb-[8px]",
        className
      )}
    >
      <h3 className="text-[12px] font-semibold text-[#D6F0B5]">
        Pair Trade Alert
      </h3>
      <span className="text-[12px] text-[white] font-bold">{timeAgo}</span>
    </div>
  );
}
