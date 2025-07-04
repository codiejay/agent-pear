"use client";

import { GlowingDot } from "@/shared/ui/GlowingDot";
import { cn } from "@/lib/utils";
import { SocialIcon } from "./SocialIcon";

interface FooterProps {
  className?: string;
}

const RICKROLL_URL =
  "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1";

const SOCIAL_ICONS = [
  { icon: "/twitter.svg", alt: "Twitter" },
  { icon: "/github.svg", alt: "GitHub" },
  { icon: "/discord.svg", alt: "Discord" },
] as const;

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-[#121512] border-none p-[24px] ", className)}>
      <div className="mx-auto flex items-center justify-between">
        {/* System Status */}
        <div className="flex items-center gap-2">
          <GlowingDot size="md" />
          <span className="text-[14px] text-[#8DD339] font-regular">
            All systems operational
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-[16px]">
          {SOCIAL_ICONS.map((social) => (
            <SocialIcon
              key={social.alt}
              href={RICKROLL_URL}
              icon={social.icon}
              alt={social.alt}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
