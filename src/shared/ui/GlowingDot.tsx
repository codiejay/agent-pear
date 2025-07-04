import { cn } from "@/shared/lib/utils/cn";

interface GlowingDotProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: {
    dot: "w-1.5 h-1.5",
    glow: "w-3 h-3",
  },
  md: {
    dot: "w-2 h-2",
    glow: "w-4 h-4",
  },
  lg: {
    dot: "w-3 h-3",
    glow: "w-6 h-6",
  },
};

export function GlowingDot({
  size = "sm",
  color = "#A2DB5C",
  className,
}: GlowingDotProps) {
  const { dot } = sizeMap[size];

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Animated glow effect */}
      <div
        className="absolute rounded-full animate-pulse-slow"
        style={{
          background: `${color}33`, // 20% opacity
          width: "200%",
          height: "200%",
        }}
      />
      <div
        className={cn("rounded-full z-10", dot)}
        style={{ background: color }}
      />
    </div>
  );
}
