"use client";

import { cn } from "@/lib/utils";

export const MainContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={cn("flex-1 p-6 pt-[0px] mt-[0px]", className)}>
      {children}
    </main>
  );
};
