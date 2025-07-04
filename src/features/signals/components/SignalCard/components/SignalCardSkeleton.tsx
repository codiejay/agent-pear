import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SignalCardSkeletonProps {
  className?: string;
}

function SingleCardSkeleton({ className }: SignalCardSkeletonProps) {
  return (
    <Card
      className={cn(
        "bg-[#0E140F]/10 pt-[0px] border-none w-full min-w-[398px] [@media(min-width:1024px)]:min-w-[664px] [@media(max-width:834px)]:max-w-[667px] [@media(max-width:430px)]:max-w-[398px]",
        className
      )}
    >
      <CardContent className="p-6 space-y-[16px]">
        {/* Header with Alert and timestamp */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-32" /> {/* Pair Trade Alert */}
          <Skeleton className="h-4 w-24" /> {/* Timestamp */}
        </div>

        {/* Trading Pair Bar */}
        <div className="relative">
          <div className="flex w-full h-[48px] rounded-md overflow-hidden">
            <Skeleton className="w-1/2 h-full bg-[#A2DB5C]/60" />{" "}
            {/* Left side */}
            <Skeleton className="w-1/2 h-full bg-[#DB5C5C]/60" />{" "}
            {/* Right side */}
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>

        {/* Price, Change % and Category */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-20" /> {/* Price */}
          <Skeleton className="h-6 w-16 rounded-full" /> {/* Percentage */}
          <Skeleton className="h-6 w-14 rounded-md" /> {/* Category badge */}
        </div>

        {/* Chart */}
        <Skeleton className="h-[168px] w-full" />

        {/* Trading Style and Remarks */}
        <div className="space-y-2">
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" /> {/* Trading Style label */}
            <Skeleton className="h-5 w-3/4" /> {/* Trading style content */}
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" /> {/* Remarks label */}
            <Skeleton className="h-4 w-full" /> {/* Remarks line 1 */}
            <Skeleton className="h-4 w-4/5" /> {/* Remarks line 2 */}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="bg-[#080C03] p-4 rounded-lg space-y-3">
          {[
            "Correlation",
            "Cointegrated",
            "Spread",
            "Z-Score",
            "Beta",
            "Trading Engine",
          ].map((label) => (
            <div key={label} className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-[42px] flex-1" /> {/* Open Position button */}
          <Skeleton className="h-[42px] w-[42px]" /> {/* Copy Link button */}
        </div>
      </CardContent>
    </Card>
  );
}

interface SignalCardsSkeletonProps {
  count?: number;
  className?: string;
}

export function SignalCardSkeleton({
  count = 3,
  className,
}: SignalCardsSkeletonProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[664px] [@media(max-width:834px)]:max-w-[667px] [@media(max-width:430px)]:max-w-[398px] flex flex-col gap-[24px]",
        className
      )}
    >
      {[...Array(count)].map((_, i) => (
        <SingleCardSkeleton key={i} />
      ))}
    </div>
  );
}
