import { useQuery } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';

import { CHAIN, createEthersProvider, useWallet } from 'shared/web3';

import { GetPolymarketSafeCommand } from '../../commands';
import { AccountNotFoundError } from '../../errors';

import { ERC_20_ABI, SAFE_USDC_ADDRES } from './use-funder.constants';

const getFunderAddress = async (address: string) => {
  const command = new GetPolymarketSafeCommand({ address });
  return command.send<string | undefined>();
};

export const useFunder = () => {
  const { wallet } = useWallet();

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['funderAddress', wallet?.account, wallet?.chainId],
    enabled: Boolean(wallet) && wallet?.chainId === CHAIN.POLYGON.id,
    retry: 3,
    queryFn: async () => {
      if (!wallet) {
        throw new Error('Expected wallet to be connected');
      }
      const funderAddress = await getFunderAddress(wallet.account);
      if (!funderAddress) {
        throw new AccountNotFoundError();
      }

      const ethersProvider = createEthersProvider(wallet.provider);

      const safeUsdcContract = new ethers.Contract(
        SAFE_USDC_ADDRES,
        ERC_20_ABI,
        ethersProvider,
      );

      const funderBalance: BigNumber =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await safeUsdcContract.balanceOf(funderAddress);

      // TODO: type response and re-use it in place where we do optimistic update
      return { address: funderAddress, balance: funderBalance.toNumber() };
    },
  });
};
