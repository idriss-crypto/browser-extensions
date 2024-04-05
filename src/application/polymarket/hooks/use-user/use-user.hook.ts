import { useCallback } from 'react';
import { EIP1193Provider } from 'mipd';

import { CHAIN, useSwitchChain, useWallet } from 'shared/web3';

import { useSafeWallet } from '../use-safe-wallet';
import { useIsUsdcAllowed } from '../use-is-usdc-allowed';

export const useUser = () => {
  const { wallet, openConnectionModal } = useWallet();

  const safeWalletQuery = useSafeWallet();
  console.log({error: safeWalletQuery.error})
  const safeWalletDetails = safeWalletQuery.data;
  const isUsdcAllowedQuery = useIsUsdcAllowed();

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
  }, [openConnectionModal, switchToPolygon]);

  const isSigning =
    safeWalletQuery.isLoading ||
    switchChain.isPending ||
    isUsdcAllowedQuery.isLoading;
  const isSigningError = switchChain.isError;
  const hasPolymarketAccount = !safeWalletQuery.isError;
  const hasUsdcAllowed = isUsdcAllowedQuery.data;

  return {
    wallet,
    signIn,
    isSigning,
    hasUsdcAllowed,
    isSigningError,
    switchToPolygon,
    safeWalletDetails,
    hasPolymarketAccount,
  };
};
