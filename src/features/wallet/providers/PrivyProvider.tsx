"use client";

import { PrivyProvider as PrivyProviderBase } from "@privy-io/react-auth";
import { ReactNode } from "react";

interface PrivyProviderProps {
  children: ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["wallet", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#A2DB5C",
          showWalletLoginFirst: true,
        },
        supportedChains: [
          {
            id: 1,
            name: "Ethereum",
            nativeCurrency: {
              name: "Ether",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: {
              public: { http: ["https://eth.llamarpc.com"] },
              default: { http: ["https://eth.llamarpc.com"] },
            },
          },
        ],
      }}
    >
      {children}
    </PrivyProviderBase>
  );
}
