"use client";

import { useSignals } from "../../hooks/useSignals";
import { SignalCard } from "../SignalCard";
import { cn } from "@/lib/utils";
import { SignalCardSkeleton } from "../SignalCard/components/SignalCardSkeleton";
import { EmptyState } from "../SignalCard/components/EmptyState";
import { useEffect, useMemo, useRef, useState } from "react";

interface SignalListProps {
  className?: string;
}

const ITEMS_PER_PAGE = 10;

export function SignalList({ className }: SignalListProps) {
  const { data, isLoading } = useSignals();
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef(null);
  const signals = useMemo(() => data?.signals || [], [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && signals.length > visibleItems) {
          // Load 10 more items when we reach the bottom
          setVisibleItems((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, signals.length)
          );
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [signals, visibleItems]);

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

  const hasNoSignals = signals.length === 0;

  if (hasNoSignals) {
    return <EmptyState />;
  }

  return (
    <div
      className={cn(
        "w-full max-w-[664px] [@media(max-width:834px)]:max-w-[667px] [@media(max-width:430px)]:max-w-[398px] flex flex-col gap-[24px]",
        className
      )}
    >
      {signals.slice(0, visibleItems).map((signal) => (
        <SignalCard key={signal.id} signal={signal} />
      ))}

      {/* This triggers the next batch of signsls to be loaded */}
      {visibleItems < signals.length && (
        <div ref={loadMoreRef} className="h-1" />
      )}
    </div>
  );
}
