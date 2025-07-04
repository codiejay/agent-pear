import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ActionButtonsProps } from "../types";
import { Copy } from "lucide-react";

export function ActionButtons({
  onOpenPosition,
  onCopyLink,
  className,
}: ActionButtonsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        className="flex-1 bg-[#A2DB5C] hover:bg-[#A2DB5C]/80 max-w-[509px] py-[13.5px] rounded-[8px] text-[#080807] font-bold text-[12px]"
        onClick={onOpenPosition}
      >
        Open Position
      </Button>

      <Button
        size="icon"
        className={cn(
          "border-none bg-[#202919] w-[115px] p-[13.5px] rounded-[8px] hover:bg-[#202919]/80"
        )}
        onClick={onCopyLink}
      >
        <Copy className="h-4 w-4 text-[white]" />
        <span className="text-[12px] font-bold text-[white]">Copy Link</span>
      </Button>
    </div>
  );
}
