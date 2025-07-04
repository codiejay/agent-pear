"use client";

import { Suspense } from "react";
import { MainLayout } from "@/features/layout/components/MainLayout";
import { SignalList } from "@/features/signals/components/SignalList";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainLayout>
        <div>
          <SignalList />
        </div>
      </MainLayout>
    </Suspense>
  );
}
