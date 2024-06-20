import { useMutation } from '@tanstack/react-query';
import { ethers } from 'ethers';

import {
  GetAcrossChainFeeCommand,
  Wallet,
  createContract,
  createSigner,
} from 'shared/web3';
import { useCommandMutation } from 'shared/messaging';

import {
  generateCombinedMessage,
  generateDonationData,
  generateVote,
} from '../utils';
import {
  DONATION_CONTRACT_ABI,
  DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID,
  WRAPPED_ETH_ADDRESS_PER_CHAIN_ID,
} from '../constants';
import { Application } from '../types';

interface Properties {
  wallet: Wallet;
  application: Application;
  userAmountInWei: number;
  chainId: number;
}

export const useAcrossDonateTransaction = () => {
  const checkAcrossChainFee = useCommandMutation(GetAcrossChainFeeCommand);

  return useMutation({
    mutationFn: async ({
      wallet,
      application,
      userAmountInWei,
      chainId,
    }: Properties) => {
      const signer = createSigner(wallet);

      const vote = generateVote(
        application.project.anchorAddress,
        userAmountInWei,
      );

      const encodedMessage = generateDonationData(
        Number(application.roundId),
        wallet.account,
        vote,
      );
      const contractOrigin = createContract({
        address: DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID[chainId] ?? '',
        abi: DONATION_CONTRACT_ABI,
        signerOrProvider: signer,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const messageHash = await contractOrigin.getMessageHash(encodedMessage);
      const signature = await signer.signMessage(
        ethers.utils.arrayify(messageHash),
      );
      const messageCombined = generateCombinedMessage(
        encodedMessage,
        signature,
      );

      const feeResponse = await checkAcrossChainFee.mutateAsync({
        amount: userAmountInWei.toString(),
        message: messageCombined,
        recipient:
          DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID[application.chainId] ?? '',
        chain: {
          id: chainId,
          wrappedEthAddress: WRAPPED_ETH_ADDRESS_PER_CHAIN_ID[chainId] ?? '',
        },
        destinationChainId: application.chainId,
      });

      const fee = Math.floor(Number(feeResponse.totalRelayFee.total) * 1.01);

      const inputAmount = userAmountInWei + fee;

      const depositParameters = {
        recipient:
          DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID[application.chainId] ?? '',
        inputAmount: inputAmount,
        outputAmount: userAmountInWei,
        inputToken: WRAPPED_ETH_ADDRESS_PER_CHAIN_ID[chainId] ?? '',
        outputToken: '0x0000000000000000000000000000000000000000',
        destinationChainId: application.chainId,
        exclusiveRelayer: '0x0000000000000000000000000000000000000000',
        quoteTimestamp: feeResponse.timestamp,
        fillDeadline: Math.round(Date.now() / 1000) + 21_600,
        exclusivityDeadline: 0,
      };

      const preparedTx =
        await contractOrigin.populateTransaction.callDepositV3?.(
          depositParameters,
          messageCombined,
        );

      const sendOptions = {
        from: wallet.account,
        value: inputAmount,
      };

      const result = await signer.sendTransaction({
        ...preparedTx,
        ...sendOptions,
        to: contractOrigin.address,
      });

      const { transactionHash } = await result.wait();
      return { transactionHash };
    },
  });
};
