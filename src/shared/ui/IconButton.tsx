import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface IconButtonProps {
  icon?: ReactNode;
  alt?: string;
  src?: string;
  className?: string;
  onClick?: () => void;
}

export function IconButton({
  icon,
  alt,
  src,
  className,
  onClick,
}: IconButtonProps) {
  if (!icon && !src) {
    throw new Error("Either icon or src must be provided to IconButton");
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "bg-[#A2DB5C]/10 p-0 h-[42px] w-[42px] rounded-[8px]",
        "hover:bg-[#080807]",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "Icon"}
          width={24}
          height={24}
          className="text-[#A2DB5C]"
        />
      ) : (
        icon
      )}
    </Button>
  );
}
