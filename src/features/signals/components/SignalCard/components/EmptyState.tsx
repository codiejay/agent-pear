import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  className?: string;
  message?: string;
}

export function EmptyState({
  className,
  message = "No pair matches your current filters",
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        "bg-[#0E140F] pt-[0px] border-none w-full min-w-[398px] [@media(min-width:1024px)]:min-w-[664px] [@media(max-width:834px)]:max-w-[667px] [@media(max-width:430px)]:max-w-[398px]",
        className
      )}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
        <AlertCircle className="w-12 h-12 text-[#A0A0A0] mb-4" />
        <h3 className="text-[16px] font-medium text-white mb-2">{message}</h3>
        <p className="text-[14px] text-[#A0A0A0] text-center">
          Try adjusting your filters or check back later for new pairs
        </p>
      </CardContent>
    </Card>
  );
}
