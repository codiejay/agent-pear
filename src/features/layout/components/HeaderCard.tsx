"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Search } from "lucide-react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface HeaderCardProps {
  className?: string;
  title: string;
  version?: string;
  description?: string;
  imagePath: string;
  imageAlt?: string;
}

export function HeaderCard({
  className,
  title,
  version,
  description,
  imagePath,
  imageAlt = "Logo",
}: HeaderCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchToken") || ""
  );
  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("searchToken", debouncedSearch);
    } else {
      params.delete("searchToken");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, router, searchParams]);

  return (
    <div className={cn("flex flex-col gap-[16px]", className)}>
      {/* Header */}
      <div className="flex flex-col items-start gap-[8px]">
        <div className="flex items-center justify-center rounded-[8px]">
          <Image
            src={imagePath}
            alt={imageAlt}
            width={48}
            height={48}
            className=" rounded-[100px]"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-[20px] font-semibold">{title}</h1>
            {version && (
              <span className="text-[#A2DB5C] text-[12px] font-bold">
                {version}
              </span>
            )}
          </div>

          {description && (
            <p className="text-[#A0A0A0] text-[12px] font-medium mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search
          className={cn(
            "absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#ffffff]"
          )}
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search tokens (BTC)"
          className={cn(
            "w-full h-[42px] bg-[#0C0D0A] rounded-lg pl-10 pr-4 text-[14px] text-[#ffffff] placeholder-[#717171] outline-none border border-[#222822] focus:border-[#2B2F2C]"
          )}
        />
      </div>
    </div>
  );
}
