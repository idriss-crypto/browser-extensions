import { useCallback } from 'react';

import { createEthersProvider } from 'shared/web3';

import { useRequestAuth } from '../use-request-auth';
import { usePostOrder } from '../use-post-order';

import { PlaceOrderArguments } from './use-order.types';

// void sendMonitoringEvent(
//   new OrderSucceededEvent({
//     conditionId,
//     tokenId: tokenID,
//     amount,
//     funderAddress,
//   }),
// );

export const useOrderPlacer = () => {
  const requestAuth = useRequestAuth();
  const postOrder = usePostOrder();

  const isPlacing = requestAuth.isPending || postOrder.isPending;
  const isPlaced = postOrder.isSuccess;
  const isError = requestAuth.isError || postOrder.isError;

  const place = useCallback(
    async ({ wallet, orderDetails, funderAddress }: PlaceOrderArguments) => {
      const ethersProvider = createEthersProvider(wallet.provider);
      const signer = ethersProvider.getSigner(wallet.account);
      const credentials = await requestAuth.mutateAsync(signer);

      await postOrder.mutateAsync({
        funderAddress,
        tickSize: orderDetails.minimumTickSize,
        negRisk: orderDetails.negRisk,
        tokenID: orderDetails.tokenId,
        amount: orderDetails.amount,
        credentials: {
          passphrase: credentials.passphrase,
          secret: credentials.secret,
          key: credentials.apiKey,
        },
        signer,
      });
    },
    [postOrder, requestAuth],
  );

  const reset = useCallback(() => {
    requestAuth.reset();
    postOrder.reset();
  }, [postOrder, requestAuth]);

  return {
    reset,
    place,
    isError,
    isPlaced,
    isPlacing,
  };
};
