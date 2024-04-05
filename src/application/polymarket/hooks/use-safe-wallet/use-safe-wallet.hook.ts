import { useQuery } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';
import { useMemo } from 'react';

import { CHAIN, Hex, createEthersProvider, useWallet } from 'shared/web3';

import { GetFunderAddresCommand } from '../../commands';
import { AccountNotFoundError } from '../../errors';
import { ERC_20_ABI, SAFE_USDC_ADDRES } from '../../polymarket.constants';

import { getSafeWalletQueryKey } from './use-safe-wallet';

const getFunderAddress = async (address: string) => {
  const command = new GetFunderAddresCommand({ address });
  return command.send<string | undefined>();
};

export const useSafeWallet = () => {
  const { wallet } = useWallet();

  const usdcContract = useMemo(() => {
    if (!wallet?.provider) {
      return;
    }
    const ethersProvider = createEthersProvider(wallet.provider);

    const safeUsdcContract = new ethers.Contract(
      SAFE_USDC_ADDRES,
      ERC_20_ABI,
      ethersProvider,
    );

    return safeUsdcContract;
  }, [wallet?.provider]);

  return useQuery({
    retry: 3,
    retryDelay: 2000,
    queryKey: getSafeWalletQueryKey(wallet),
    enabled:
      !!wallet && wallet.chainId === CHAIN.POLYGON.id && Boolean(usdcContract),
    queryFn: async () => {
      if (!wallet || !usdcContract) {
        return;
      }
      const address = await getFunderAddress(wallet.account);
      if (!address) {
        throw new AccountNotFoundError();
      }

      const funderBalance: BigNumber =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await usdcContract.balanceOf(address);

      const balance = funderBalance.toNumber() / 1_000_000;

      return { address: address as Hex, balance };
    },
  });
};
