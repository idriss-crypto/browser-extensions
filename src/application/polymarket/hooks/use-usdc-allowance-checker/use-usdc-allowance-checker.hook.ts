import { useMutation } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useCallback } from 'react';

import { createEthersProvider } from 'shared/web3';

import {
  POLYMARKET_CONDITIONAL_TOKENS_CONTRACT_ADDRESS,
  ERC_20_ABI,
  SAFE_USDC_ADDRES,
} from '../../polymarket.constants';

import { CheckUsdcAllowanceArguments } from './use-usdc-allowance-checker.types';

export const useUsdcAllowanceChecker = () => {
  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: async ({
      provider,
      safeWalletAddress,
    }: CheckUsdcAllowanceArguments) => {
      const ethersProvider = createEthersProvider(provider);

      const safeUsdcContract = new ethers.Contract(
        SAFE_USDC_ADDRES,
        ERC_20_ABI,
        ethersProvider,
      );

      const allowance =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await safeUsdcContract.allowance(
          safeWalletAddress,
          POLYMARKET_CONDITIONAL_TOKENS_CONTRACT_ADDRESS,
        );

      return allowance > 0;
    },
  });

  const check = useCallback(
    ({ provider, safeWalletAddress }: CheckUsdcAllowanceArguments) => {
      return mutateAsync({ provider, safeWalletAddress });
    },
    [mutateAsync],
  );

  const isAllowed = Boolean(data);
  const isChecking = isPending;

  return {
    check,
    isAllowed,
    isChecking,
  };
};
