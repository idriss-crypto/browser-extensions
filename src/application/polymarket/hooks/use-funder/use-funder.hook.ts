import { useQuery } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';

import { createEthersProvider, useWallet } from 'shared/web3';

import { GetPolymarketSafeCommand } from '../../commands';
import { AccountNotFoundError } from '../../errors';

import { ERC_20_ABI, SAFE_USDC_ADDRES } from './use-funder.constants';

const getFunderAddress = async (address: string) => {
  const command = new GetPolymarketSafeCommand({ address });
  return command.send<string | undefined>();
};

export const useFunder = () => {
  const wallet = useWallet();

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['funderAddress', wallet.account],
    enabled: Boolean(wallet.account) && Boolean(wallet.provider),
    queryFn: async () => {
      if (!wallet.account || !wallet.provider) {
        throw new Error('Expected wallet to be connected');
      }
      const funderAddress = await getFunderAddress(wallet.account);
      if (!funderAddress) {
        throw new AccountNotFoundError();
      }

      const safeUsdcContract = new ethers.Contract(
        SAFE_USDC_ADDRES,
        ERC_20_ABI,
        createEthersProvider(wallet.provider),
      );

      console.log({
        safeUsdcContract,
        provider: wallet.provider,
        funderAddress,
      });

      try {
        const funderBalance: BigNumber =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          await safeUsdcContract.balanceOf(funderAddress);

        // TODO: type response and re-use it in place where we do optimistic update
        return { address: funderAddress, balance: funderBalance.toNumber() };
      } catch (error) {
        console.log('error while loading balance:', error);
        throw error;
      }
    },
  });
};
