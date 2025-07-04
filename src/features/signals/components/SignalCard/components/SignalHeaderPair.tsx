import { cn } from "@/lib/utils";
import Image from "next/image";
import { getBaseToken } from "@/shared/lib/constants/tokenMappings";

interface TokenPairItemProps {
  token: string;
  iconUrl: string;
  bgColorClass: string;
  roundedClass: string;
}

function TokenPairItem({
  token,
  iconUrl,
  bgColorClass,
  roundedClass,
}: TokenPairItemProps) {
  return (
    <div
      className={cn(
        "flex-1 flex items-center justify-center gap-2 p-[8px]",
        bgColorClass,
        roundedClass
      )}
    >
      <div className="relative w-6 h-6">
        <Image
          src={iconUrl}
          alt={token}
          width={20}
          height={20}
          className="object-contain rounded-full"
          unoptimized // Skipnn Next.js image optimization for external URLs
        />
      </div>
      <span className="text-white font-semibold text-[14px]">{token}</span>
    </div>
  );
}

interface SignalHeaderPairProps {
  asset1: string;
  asset2: string;
  className?: string;
}

export const SignalHeaderPair = ({
  asset1,
  asset2,
  className,
}: SignalHeaderPairProps) => {
  // Remove USDT suffix for display
  const token1 = getBaseToken(asset1);
  const token2 = getBaseToken(asset2);

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full rounded-[8px]",
        className
      )}
    >
      <TokenPairItem
        token={token1}
        iconUrl="https://s2.coinmarketcap.com/static/img/coins/200x200/32956.png"
        bgColorClass="bg-[#A2DB5C]/20"
        roundedClass="rounded-l-lg"
      />

      <TokenPairItem
        token={token2}
        iconUrl="https://s2.coinmarketcap.com/static/img/coins/200x200/34103.png"
        bgColorClass="bg-[#FF7272]/20"
        roundedClass="rounded-r-lg"
      />
    </div>
  );
};
