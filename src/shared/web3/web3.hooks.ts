import { useMutation } from '@tanstack/react-query';
import { EIP1193Provider } from 'mipd';

import { hexStringToNumber, numberToHexString } from './web3.utils';
import { CHAIN } from './web3.constants';

interface SwitchChainArguments {
  walletProvider: EIP1193Provider | null;
  chainId: number;
}

export const useSwitchChain = () => {
  return useMutation({
    mutationFn: async ({ chainId, walletProvider }: SwitchChainArguments) => {
      if (!walletProvider || !walletProvider.request) {
        return;
      }
      const currentChainId = await walletProvider.request({
        method: 'eth_chainId',
      });

      if (hexStringToNumber(currentChainId) !== chainId) {
        const foundChain = Object.values(CHAIN).find((chain) => {
          return chain.id === chainId;
        });

        if (!foundChain) {
          throw new Error('Chain is not configured');
        }

        // TODO: call this only if user is not having chain, currently the side effect of calling this is that when user declines it, it will be called twice ( 1st time add, 2nd time switch)
        // TODO: possibly need to check for 4902 error
        // await walletProvider.request({
        //   method: 'wallet_addEthereumChain',
        //   params: [
        //     {
        //       chainId: numberToHexString(chainId),
        //       chainName: foundChain.name,
        //       nativeCurrency: foundChain.nativeCurrency,
        //       rpcUrls: foundChain.rpcUrls,
        //       blockExplorerUrls: foundChain.blockExplorerUrls,
        //     },
        //   ],
        // });
        await walletProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHexString(chainId) }],
        });
      }
    },
  });
};
