"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWalletAuth } from "../hooks/useWalletAuth";
import { Wallet, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface ConnectWalletButtonProps {
  className?: string;
}

export function ConnectWalletButton({ className }: ConnectWalletButtonProps) {
  const { handleConnect, authenticated, user, logout, ready, loginSuccess } =
    useWalletAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (loginSuccess && authenticated && user?.wallet?.address) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, authenticated, user?.wallet?.address]);

  const buttonText = authenticated
    ? user?.wallet?.address?.slice(0, 6) +
      "..." +
      user?.wallet?.address?.slice(-4)
    : "Connect Wallet";

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          colors={["#A2DB5C", "#080807", "#4CAF50", "#8BC34A"]}
        />
      )}
      <Button
        onClick={authenticated ? logout : handleConnect}
        className={cn(
          "bg-[#A2DB5C] font-bold px-[12px] text-[14px] text-[#080807] rounded-[8px] h-[42px] w-[150px]",
          "hover:bg-[#A2DB5C] flex items-center justify-center gap-2 cursor-pointer",
          className
        )}
        disabled={!ready}
      >
        {!ready ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {authenticated && <Wallet className="h-4 w-4" />}
            {buttonText}
          </>
        )}
      </Button>
    </>
  );
}
