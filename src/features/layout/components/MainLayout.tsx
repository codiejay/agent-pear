"use client";

import { cn } from "@/lib/utils";
import { LayoutProps } from "../types/layout.types";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";

export const MainLayout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen h-full bg-[#080807] w-full flex flex-col items-center overflow-hidden justify-top">
      <div className="flex [@media(max-width:834px)]:flex-col pt-[56px] overflow-hidden h-full min-h-full w-full">
        <Sidebar />
        <MainContent className={cn("pt-[0px]", className)}>
          {children}
        </MainContent>
      </div>
    </div>
  );
};
