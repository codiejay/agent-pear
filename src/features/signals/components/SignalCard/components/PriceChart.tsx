"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { PriceDisplayAndCategory } from "./PriceDisplay";

interface PriceChartProps {
  data: Array<{
    timestamp: string;
    value: number;
  }>;
  className?: string;
  pair_price: number;
  percentageChange: number;
  category: string;
}

// Chart color configuration using CSS variables
const chartConfig = {
  value: {
    label: "Price",
    color: "#A2DB5C", // Primary green color for the chart
  },
} satisfies ChartConfig;

export const PriceChart = ({
  data,
  className,
  pair_price,
  percentageChange,
  category,
}: PriceChartProps) => {
  // Format dollar values for Y-axis
  const formatDollarValue = (value: number) => `$${value.toFixed(2)}`;
  return (
    <Card
      className={cn(
        "border-none rounded-[8px] p-[8px] px-[16px] bg-[#080C03] [@media(max-width:450px)]:hidden",
        className
      )}
    >
      <PriceDisplayAndCategory
        price={pair_price}
        percentageChange={Number(percentageChange)}
        category={category}
      />
      <CardContent className="p-0">
        {/* ChartContainer manages CSS variables for consistent colors */}
        <ChartContainer config={chartConfig}>
          {/* ResponsiveContainer ensures the chart fills its container */}
          <ResponsiveContainer width="100%" height={168}>
            {/* Main chart component with data and margins */}
            <AreaChart
              data={data}
              margin={{
                top: 5, // Space at top
                right: 12, // Space for right labels
                bottom: 5, // Space at bottom
                left: 0, // No left margin needed
              }}
            >
              {/* Gradient definition for the area fill */}
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  {/* Gradient starts semi-transparent at top */}
                  <stop
                    offset="0%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.2}
                  />
                  {/* Fades to fully transparent at bottom */}
                  <stop
                    offset="100%"
                    stopColor="var(--color-value)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              {/* Grid lines for better readability */}
              <CartesianGrid
                vertical={false} // Only show horizontal lines
                stroke="#1F1F1F" // Dark grid lines
              />

              {/* Y-axis configuration */}
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false} // Hide tick lines
                axisLine={false} // Hide axis line
                tickMargin={8} // Space between ticks and labels
                tickCount={3} // Show 3 ticks for clean look
                tick={{
                  // Label styling
                  fill: "#717171", // Grey color
                  fontSize: 12, // Small font size
                }}
                width={40} // Width for labels
                tickFormatter={formatDollarValue} // Add dollar sign
              />

              {/* The actual chart line and area */}
              <Area
                yAxisId="right"
                type="natural" // Natural curve interpolation
                dataKey="value" // Data point to plot
                stroke="var(--color-value)" // Line color
                strokeWidth={2} // Line thickness
                fill="url(#colorValue)" // Gradient fill
                dot={false} // Hide dots on line
                activeDot={{
                  // Dot shown on hover
                  r: 4, // Dot radius
                  fill: "var(--color-value)", // Dot color
                  stroke: "#121512", // Dot border
                  strokeWidth: 2, // Dot border thickness
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
