import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useMemo } from 'react';

import { CHAIN, createEthersProvider, useWallet } from 'shared/web3';

import {
  POLYMARKET_CONDITIONAL_TOKENS_CONTRACT_ADDRESS,
  ERC_20_ABI,
  SAFE_USDC_ADDRES,
} from '../../polymarket.constants';
import { useSafeWallet } from '../use-safe-wallet';

export const useIsUsdcAllowed = () => {
  const { wallet } = useWallet();
  const safeWalletQuery = useSafeWallet();

  const safeWalletAddress = safeWalletQuery.data?.address;

  const usdcContract = useMemo(() => {
    if (!wallet?.provider || wallet.chainId !== CHAIN.POLYGON.id) {
      return;
    }
    const ethersProvider = createEthersProvider(wallet.provider);

    const safeUsdcContract = new ethers.Contract(
      SAFE_USDC_ADDRES,
      ERC_20_ABI,
      ethersProvider,
    );

    return safeUsdcContract;
  }, [wallet?.provider, wallet?.chainId]);

  return useQuery({
    queryKey: [
      'isUsdcAllowed',
      wallet?.chainId,
      wallet?.account,
      safeWalletAddress,
    ],
    enabled:
      !!wallet &&
      wallet.chainId === CHAIN.POLYGON.id &&
      safeWalletQuery.isSuccess &&
      Boolean(usdcContract),
    queryFn: async () => {
      if (!wallet || !usdcContract) {
        return;
      }

      const allowance =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await usdcContract.allowance(
          safeWalletAddress,
          POLYMARKET_CONDITIONAL_TOKENS_CONTRACT_ADDRESS,
        );

      return allowance > 0;
    },
  });
};
