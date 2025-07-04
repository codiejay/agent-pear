import { EnrichedSignal } from "@/types/Signal";

export interface SignalCardProps {
  signal: EnrichedSignal;
  className?: string;
}

export interface SignalHeaderProps {
  timeAgo: string;
  className?: string;
}

export interface PriceDisplayProps {
  price: number;
  percentageChange: number;
  className?: string;
  category: string;
}

export interface PriceChartProps {
  data: Array<{ timestamp: string; value: number }>;
  className?: string;
}

export interface TradingInfoProps {
  tradingStyle: string;
  remarks: string;
  className?: string;
}

export interface MetricsGridProps {
  correlation: number;
  cointegrated: boolean;
  spread: number;
  zscore: number;
  beta: number;
  engine: EnrichedSignal['engine'];
  className?: string;
}

export interface ActionButtonsProps {
  onOpenPosition: () => void;
  onCopyLink: () => void;
  className?: string;
} 