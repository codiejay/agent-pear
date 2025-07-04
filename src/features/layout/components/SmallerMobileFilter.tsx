"use client";

import { MobileFilters } from "./MobileFilters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";

export function SmallerMobileFilter() {
  return (
    <>
      <div className="hidden [@media(min-width:600px)]:block w-full">
        <MobileFilters />
      </div>

      {/* Show Filter button dropdown below 430px */}
      <div className="[@media(min-width:600px)]:hidden relative">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-[8px] bg-[#121512] w-[100%] border-none outline-none text-[12px] text-white">
            <Settings2 className="w-4 h-4 text-[#A0A0A0]" />
            <div className="text-[12px] font-medium p-[12px] text-[#A0A0A0]">
              Filter
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="w-[100%] bg-[#121512] border-none rounded-[12px] mt-2 p-4 mx-auto"
            sideOffset={5}
          >
            <MobileFilters isVertical className="pb-0" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
