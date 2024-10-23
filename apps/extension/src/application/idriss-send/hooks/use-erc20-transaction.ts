import { useMutation } from '@tanstack/react-query';
import { encodeFunctionData } from 'viem';

import {
  createWalletClient,
  EMPTY_HEX,
  getChainById,
  Hex,
  TransactionRevertedError,
  Wallet,
} from 'shared/web3';
import { useObservabilityScope } from 'shared/observability';

import {
  CHAIN_TO_IDRISS_TIPPING_ADDRESS,
  ERC20_ABI,
  TIPPING_ABI,
} from '../constants';

interface Properties {
  tokenAddress: Hex;
  chainId: number;
  wallet: Wallet;
  tokensToSend: bigint;
  recipientAddress: Hex;
}

export const useErc20Transaction = () => {
  const observabilityScope = useObservabilityScope();

  return useMutation({
    mutationFn: async ({
      tokenAddress,
      wallet,
      chainId,
      tokensToSend,
      recipientAddress,
    }: Properties) => {
      const walletClient = createWalletClient(wallet);

      const idrissTippingAddress =
        CHAIN_TO_IDRISS_TIPPING_ADDRESS[chainId] ?? EMPTY_HEX;

      const allowanceData = {
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [wallet.account, idrissTippingAddress],
      } as const;
      const allowance = await walletClient.readContract({
        ...allowanceData,
        address: tokenAddress,
      });

      if (allowance < tokensToSend) {
        const approveData = {
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [idrissTippingAddress, tokensToSend],
        } as const;
        const gas = await walletClient.estimateContractGas({
          ...approveData,
          address: tokenAddress,
          account: wallet.account,
        });

        const encodedData = encodeFunctionData(approveData);

        const transactionHash = await walletClient.sendTransaction({
          chain: getChainById(chainId),
          to: tokenAddress,
          data: encodedData,
          gas,
        });

        const receipt = await walletClient.waitForTransactionReceipt({
          hash: transactionHash,
        });

        if (receipt.status === 'reverted') {
          const error = new TransactionRevertedError({ transactionHash });
          observabilityScope.captureException(error);
          throw error;
        }
      }

      const sendTokenToData = {
        abi: TIPPING_ABI,
        functionName: 'sendTokenTo',
        args: [recipientAddress, tokensToSend, tokenAddress, ''],
      } as const;

      const gas = await walletClient.estimateContractGas({
        ...sendTokenToData,
        address: idrissTippingAddress,
        account: wallet.account,
      });

      const data = encodeFunctionData(sendTokenToData);

      const transactionHash = await walletClient.sendTransaction({
        chain: getChainById(chainId),
        data: data,
        to: idrissTippingAddress,
        gas,
      });
      const receipt = await walletClient.waitForTransactionReceipt({
        hash: transactionHash,
      });

      if (receipt.status === 'reverted') {
        const error = new TransactionRevertedError({ transactionHash });
        observabilityScope.captureException(error);
        throw error;
      }

      return { transactionHash };
    },
  });
};
