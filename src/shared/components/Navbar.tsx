"use client";

import Image from "next/image";
import Link from "next/link";
import { GlowingDot } from "@/shared/ui/GlowingDot";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown } from "lucide-react";
import { IconButton } from "@/shared/ui/IconButton";
import { ConnectWalletButton } from "@/features/wallet/components/ConnectWalletButton";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState, useEffect, Suspense } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const navigationItems = [
  { name: "Dashboard", href: "/" },
  { name: "Trade", href: "/trade" },
  { name: "Staking", href: "/staking" },
  { name: "Agent Pear", href: "/agent-pear", isActive: true },
  { name: "Markets", href: "/markets" },
  { name: "More", href: "#" },
];

const SearchInput = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchPair") || ""
  );
  const debouncedSearch = useDebounce(searchValue);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("searchPair", debouncedSearch);
    } else {
      params.delete("searchPair");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, router, searchParams]);

  return (
    <div
      className={`relative w-[133px] flex items-center rounded-[8px] h-[42px] bg-[#080807] ${className}`}
    >
      <Image
        src="/search-icon.svg"
        alt="Search"
        width={25}
        height={25}
        className="absolute left-[8px]"
      />
      <Input
        name="search"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Pair"
        className="pl-[41px] border-none"
      />
    </div>
  );
};

const SearchInputWithSuspense = ({ className }: { className?: string }) => (
  <Suspense
    fallback={
      <div
        className={`relative w-[133px] flex items-center rounded-[8px] h-[42px] bg-[#080807] ${className}`}
      >
        <Image
          src="/search-icon.svg"
          alt="Search"
          width={25}
          height={25}
          className="absolute left-[8px]"
        />
        <Input
          name="search"
          type="text"
          placeholder="Loading..."
          className="pl-[41px] border-none"
          disabled
        />
      </div>
    }
  >
    <SearchInput className={className} />
  </Suspense>
);

const NavigationItems = () => (
  <>
    {navigationItems.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={`text-[14px] font-medium ${
          item.isActive
            ? "text-white font-medium flex items-center"
            : "text-[#717171] hover:text-white"
        }`}
      >
        {item.name}
        {item.isActive && <GlowingDot className="ml-2" />}
        {item.name === "More" && (
          <ChevronDown className="ml-[4px] size-[16px] inline-block" />
        )}
      </Link>
    ))}
  </>
);

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#0F110F] w-full fixed top-0 z-50">
        <div className="mx-auto p-[8px] flex items-center justify-between">
          {/* Left section: Logo and Navigation */}
          <div className="flex items-center space-x-[32px]">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/pear-agent-logo.svg"
                alt="Pear Protocol"
                width={97}
                height={32}
                className="h-8 w-auto no-repeat"
              />
            </Link>

            {/* Navigation Items - Desktop */}
            <div className="hidden [@media(min-width:1026px)]:flex items-center space-x-[24px]">
              <NavigationItems />
            </div>
          </div>

          {/* Right section: Search, Connect Wallet, and Icons */}
          <div className="flex items-center space-x-[8px]">
            {/* Search - Hide on mobile */}
            <div className="hidden [@media(min-width:435px)]:block">
              <SearchInputWithSuspense />
            </div>

            {/* Connect Wallet Button */}
            <ConnectWalletButton className="" />

            {/* Notification Bell */}
            <IconButton icon={<Bell className="h-6 w-6 text-[#A2DB5C]" />} />

            {/* Profile Icon */}
            <div className="hidden [@media(min-width:435px)]:block">
              <IconButton src="/user-default-icon.svg" alt="User Profile" />
            </div>

            {/* Mobile Menu - Only visible below 1026px */}
            <div className="[@media(min-width:1026px)]:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <IconButton
                    src={isMenuOpen ? "/close-menu.svg" : "/menu-icon.svg"}
                    alt={isMenuOpen ? "Close Menu" : "Open Menu"}
                  />
                </SheetTrigger>
                <SheetContent
                  side="top"
                  className="bg-[#0F110F] px-[8px] pt-[16px] border-[#222822] h-[100vh] mt-[56px] border-t-0 [&>button]:hidden"
                >
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  {/* Show search on mobile */}
                  <div className="[@media(max-width:435px)]:flex hidden mb-[24px] justify-between w-full">
                    <SearchInputWithSuspense className="w-[364px]" />
                    <IconButton
                      src="/user-default-icon.svg"
                      alt="User Profile"
                    />
                  </div>
                  <div className="flex flex-col space-y-[24px]">
                    <NavigationItems />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[56px]" />
    </>
  );
}
