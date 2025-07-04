import { Card, CardContent } from "@/components/ui/card";
import { SignalCardProps } from "./types";
import { SignalHeader } from "./components/SignalHeader";
import { SignalHeaderPair } from "./components/SignalHeaderPair";
import { PriceChart } from "./components/PriceChart";
import { TradingInfo } from "./components/TradingInfo";
import { MetricsGrid } from "./components/MetricsGrid";
import { ActionButtons } from "./components/ActionButtons";
import { cn } from "@/lib/utils";

// Function to generate price data based on statistical metrics
function generateStatisticalPriceData(
  currentPrice: number,
  zscore: number,
  halfLife: number,
  numPoints: number = 24
) {
  const data = [];
  // For short positions (positive PNL), price should trend up
  // For long positions (positive PNL), price should trend down
  const meanPrice = currentPrice * (1 + zscore * 0.1); // Adjusted mean price calculation
  const volatility = Math.abs(currentPrice - meanPrice) / 2;

  // Generate points showing the deviation and expected mean reversion
  for (let i = 0; i < numPoints; i++) {
    const progress = i / (numPoints - 1);
    const timeEffect = Math.exp(-progress * 3); // Decay factor based on half-life

    // Price follows mean reversion pattern
    const expectedPrice = meanPrice - (meanPrice - currentPrice) * timeEffect;

    // Add some noise based on volatility
    const noise = (Math.random() - 0.5) * volatility * 0.2;

    data.push({
      timestamp: i.toString(),
      value: expectedPrice + noise,
    });
  }

  return data;
}

export function SignalCard({ signal, className }: SignalCardProps) {
  // Calculate percentage change based on zscore
  const percentageChange = (signal.zscore * 5).toFixed(1);

  // Generate chart data using actual signal metrics
  const chartData = generateStatisticalPriceData(
    signal.pair_price,
    signal.zscore,
    signal.half_life
  );

  const handleOpenPosition = () => {
    // Implement position opening logic
    console.log("Opening position...");
  };

  const handleCopyLink = () => {
    // Implement link copying logic
    console.log("Copying link...");
  };

  return (
    <Card className={cn("bg-[#0E140F] pt-[0px] border-none w-full", className)}>
      <CardContent className="p-6 space-y-[16px]">
        {/* Header */}
        <SignalHeader timeAgo={signal.timeAgo} />

        {/* Trading Pair */}
        <SignalHeaderPair asset1={signal.asset1_id} asset2={signal.asset2_id} />

        {/* Chart */}
        <PriceChart
          data={chartData}
          pair_price={signal.pair_price}
          percentageChange={Number(percentageChange)}
          category={signal.tradingCategory}
        />

        {/* Trading Info */}
        <TradingInfo
          tradingStyle={signal.tradingStyle}
          remarks={signal.remarks}
        />

        {/* Metrics Grid */}
        <MetricsGrid
          correlation={signal.correlation}
          cointegrated={signal.cointegration}
          spread={signal.hedge_ratio}
          zscore={signal.zscore}
          beta={signal.hurst}
          engine={signal.engine}
        />

        {/* Action Buttons */}
        <ActionButtons
          onOpenPosition={handleOpenPosition}
          onCopyLink={handleCopyLink}
        />
      </CardContent>
    </Card>
  );
}
