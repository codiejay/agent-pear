'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';

export function useWalletAuth() {
  const {
    ready,
    authenticated,
    user,
    login,
    logout: privyLogout,
    connectWallet,
    createWallet,
  } = usePrivy();

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleConnect = async () => {
    try {
      if (!authenticated) {
        await login();
        setLoginSuccess(true);
      } else {
        if (!user?.wallet) {
          await createWallet();
          setLoginSuccess(true);
        }
        else if (!user?.wallet.address) {
          await connectWallet();
          setLoginSuccess(true);
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setLoginSuccess(false);
    }
  };

  const logout = async () => {
    await privyLogout();
    setLoginSuccess(false);
  };

  return {
    ready,
    authenticated,
    user,
    handleConnect,
    logout,
    loginSuccess,
  };
} 