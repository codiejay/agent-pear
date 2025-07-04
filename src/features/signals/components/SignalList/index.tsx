"use client";

import { useSignals } from "../../hooks/useSignals";
import { SignalCard } from "../SignalCard";
import { cn } from "@/lib/utils";
import { SignalCardSkeleton } from "../SignalCard/components/SignalCardSkeleton";
import { EnrichedSignal } from "@/types/Signal";

interface SignalListProps {
  className?: string;
}

export function SignalList({ className }: SignalListProps) {
  const { data, isLoading } = useSignals();
  const signals = data?.signals;

  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full max-w-[664px] [@media(max-width:834px)]:max-w-[667px] [@media(max-width:430px)]:max-w-[398px] flex flex-col gap-[24px]",
          className
        )}
      >
        <SignalCardSkeleton />
        <SignalCardSkeleton />
        <SignalCardSkeleton />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full max-w-[664px] [@media(max-width:834px)]:max-w-[667px] [@media(max-width:430px)]:max-w-[398px] flex flex-col gap-[24px]",
        className
      )}
    >
      {signals?.map((signal: EnrichedSignal) => (
        <SignalCard key={signal.id} signal={signal} />
      ))}
    </div>
  );
}
