"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { PrivyProvider } from "@/features/wallet/providers/PrivyProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <PrivyProvider>
      <QueryProvider>{children}</QueryProvider>
    </PrivyProvider>
  );
}
