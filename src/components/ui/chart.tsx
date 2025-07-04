"use client";

import * as React from "react";
import { TooltipProps } from "recharts";

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactNode;
}

export function ChartContainer({
  config,
  children,
  ...props
}: ChartContainerProps) {
  // Create CSS variables for chart colors
  const style = React.useMemo(() => {
    return Object.entries(config).reduce((acc, [key, value]) => {
      acc[`--color-${key}`] = value.color;
      return acc;
    }, {} as Record<string, string>);
  }, [config]);

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
}

interface ChartTooltipContentProps
  extends Omit<TooltipProps<number, string>, "payload"> {
  payload?: Array<{
    value: number;
    dataKey: string;
    color?: string;
  }>;
  config?: ChartConfig;
}

export function ChartTooltipContent({
  active,
  payload,
  config,
}: ChartTooltipContentProps) {
  if (!active || !payload?.length || !config) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        {payload.map((item, index) => {
          const key = item.dataKey;
          const config_ = config[key];
          if (!config_) return null;

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ background: config_.color }}
              />
              <span className="font-medium">{config_.label}:</span>
              <span>{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
