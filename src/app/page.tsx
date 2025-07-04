"use client";

import { MainLayout } from "@/features/layout/components/MainLayout";
import { SignalList } from "@/features/signals/components/SignalList";

export default function Home() {
  return (
    <MainLayout>
      <div>
        <SignalList />
      </div>
    </MainLayout>
  );
}
