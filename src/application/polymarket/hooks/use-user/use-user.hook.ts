import { useCallback } from 'react';
import { EIP1193Provider } from 'mipd';

import { CHAIN, useSwitchChain, useWallet } from 'shared/web3';

import { useSafeWallet } from '../use-safe-wallet';
import { useUsdcAllowanceChecker } from '../use-usdc-allowance-checker';

export const useUser = () => {
  const { wallet, openConnectionModal } = useWallet();

  const safeWallet = useSafeWallet();
  const safeWalletDetails = safeWallet.details;
  const usdcAllowanceChecker = useUsdcAllowanceChecker();

  const switchChain = useSwitchChain();

  const switchToPolygon = useCallback(
    (provider: EIP1193Provider) => {
      return switchChain.mutateAsync({
        walletProvider: provider,
        chainId: CHAIN.POLYGON.id,
      });
    },
    [switchChain],
  );

  const signIn = useCallback(async () => {
    const connectedWallet = await openConnectionModal();
    await switchToPolygon(connectedWallet.provider);
    const foundSafeWallet = await safeWallet.find({
      wallet: connectedWallet,
    });
    await usdcAllowanceChecker.check({
      provider: connectedWallet.provider,
      safeWalletAddress: foundSafeWallet.address,
    });
  }, [openConnectionModal, safeWallet, switchToPolygon, usdcAllowanceChecker]);

  const orderPlacedFor = useCallback(
    (amount: number) => {
      safeWallet.spend(amount);
    },
    [safeWallet],
  );

  const isSigning =
    safeWallet.isFinding ||
    switchChain.isPending ||
    usdcAllowanceChecker.isChecking;
  const isSigningError = switchChain.isError;
  const hasPolymarketAccount = !safeWallet.isError;
  const hasUsdcAllowed = usdcAllowanceChecker.isAllowed;

  return {
    wallet,
    signIn,
    isSigning,
    hasUsdcAllowed,
    orderPlacedFor,
    isSigningError,
    switchToPolygon,
    safeWalletDetails,
    hasPolymarketAccount,
  };
};
