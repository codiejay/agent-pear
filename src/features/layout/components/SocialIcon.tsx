"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  href: string;
  icon: string;
  alt: string;
  className?: string;
}

export function SocialIcon({ href, icon, alt, className }: SocialIconProps) {
  return (
    <Link href={href} target="_blank" className={cn("", className)}>
      <Image
        src={icon}
        alt={alt}
        width={36}
        height={36}
        className="opacity-60 hover:opacity-100 transition-opacity"
      />
    </Link>
  );
}
