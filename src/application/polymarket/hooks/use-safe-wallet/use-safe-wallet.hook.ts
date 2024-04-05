import { useMutation } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';
import { useCallback, useMemo, useState } from 'react';

import { Hex, Wallet, createEthersProvider } from 'shared/web3';

import { GetFunderAddresCommand } from '../../commands';
import { AccountNotFoundError } from '../../errors';
import { ERC_20_ABI, SAFE_USDC_ADDRES } from '../../polymarket.constants';

const getFunderAddress = async (address: string) => {
  const command = new GetFunderAddresCommand({ address });
  return command.send<string | undefined>();
};

interface CheckFunderArguments {
  wallet: Wallet;
}

export const useSafeWallet = () => {
  const [balance, setBalance] = useState(0);

  const { mutateAsync, data, isPending, isError } = useMutation({
    retry: 3,
    mutationFn: async ({ wallet }: CheckFunderArguments) => {
      const address = await getFunderAddress(wallet.account);
      if (!address) {
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
        await safeUsdcContract.balanceOf(address);

      const safeWalletBalance = funderBalance.toNumber() / 1_000_000;

      setBalance(safeWalletBalance);

      return { address: address as Hex, balance };
    },
  });

  const find = useCallback(
    async ({ wallet }: CheckFunderArguments) => {
      return mutateAsync({ wallet });
    },
    [mutateAsync],
  );

  const spend = useCallback((amount: number) => {
    setBalance((currentBalance) => {
      return currentBalance - amount;
    });
  }, []);

  const details = useMemo(() => {
    return {
      balance,
      address: data?.address ?? '0x',
    };
  }, [balance, data?.address]);

  const isFinding = isPending;

  return { find, details, spend, isFinding, isError };
};
