import { cn } from "@/lib/utils";
import { MetricsGridProps } from "../types";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";

interface MetricItemProps {
  label: string;
  value: string | number | boolean;
}

function MetricItem({ label, value }: MetricItemProps) {
  const EngineTag = () => {
    const engine = value as string;
    return (
      <div className="text-[12px] uppercase text-[#40A6A6] bg-[#40A6A6]/10 rounded-[4px] p-[4px] px-[8px] font-semibold">
        {engine.charAt(0).toUpperCase() + engine.slice(1)}
      </div>
    );
  };

  const MetricValue = () => {
    if (label === "Trading Engine") {
      return <EngineTag />;
    }
    if (label === "Spread") {
      return (
        <div className="text-[12px] font-semibold text-white">
          ${typeof value === "number" ? value.toFixed(2) : value}
        </div>
      );
    }
    return (
      <div className="text-[12px] font-semibold text-white">
        {typeof value === "boolean" ? (value ? "True" : "False") : value}
      </div>
    );
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex flex-row cursor-help w-full justify-between">
          <span className="text-[12px] font-semibold text-[#A0A0A0]">
            {label}:
          </span>
          <MetricValue />
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
}

export const MetricsGrid = ({
  correlation,
  cointegrated,
  spread,
  zscore,
  beta,
  engine,
  className,
}: MetricsGridProps) => {
  const metrics: MetricItemProps[] = [
    {
      label: "Correlation",
      value: correlation.toFixed(2),
    },
    {
      label: "Cointegrated",
      value: cointegrated,
    },
    {
      label: "Spread",
      value: spread.toFixed(1),
    },
    {
      label: "Z-Score",
      value: zscore.toFixed(1),
    },
    {
      label: "Beta",
      value: beta.toFixed(2),
    },
    {
      label: "Trading Engine",
      value: engine.charAt(0).toUpperCase() + engine.slice(1),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col gap-[8px] p-[16px] rounded-[8px] bg-[#080C03]",
        className
      )}
    >
      {metrics.map((metric) => (
        <MetricItem key={metric.label} {...metric} />
      ))}
    </div>
  );
};
