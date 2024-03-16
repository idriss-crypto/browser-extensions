import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderBuilder, OrderType } from '@polymarket/clob-client';
import { orderToJson } from '@polymarket/clob-client/dist/utilities';
import { createL2Headers } from '@polymarket/clob-client/dist/headers';

import { CHAIN, useWallet } from 'shared/web3';
import { sendMonitoringEvent } from 'shared/monitoring';
import { OrderSucceededEvent } from 'application/polymarket/monitoring/order-succeeded';

import { PostOrderCommand } from '../../commands';
import { POLYMARKET_GNOSIS_SAFE_SIGNATURE } from '../../polymarket.constants';

import {
  PostOrderMutationProperties,
  PostOrderProperties,
  UsePostOrderProperties,
} from './use-post-order.types';

const postOrder = async ({ l2Headers, orderPayload }: PostOrderProperties) => {
  const command = new PostOrderCommand({ orderPayload, headers: l2Headers });
  return command.send<void>();
};

export const usePostOrder = ({ conditionId }: UsePostOrderProperties) => {
  const queryClient = useQueryClient();
  const wallet = useWallet();

  return useMutation({
    onSuccess: (_, { amount, tokenID, funderAddress }) => {
      void sendMonitoringEvent(
        new OrderSucceededEvent({
          conditionId,
          tokenId: tokenID,
          amount,
          funderAddress,
        }),
      );
      queryClient.setQueryData<{ address: string; balance: number }>(
        ['funderAddress', wallet.account],
        (currentData) => {
          if (!currentData) {
            return { address: wallet.account ?? '0x', balance: 0 };
          }
          return {
            ...currentData,
            balance: currentData.balance - amount * 1_000_000,
          };
        },
      );
    },
    mutationFn: async ({
      signer,
      funderAddress,
      amount,
      negRisk,
      tokenID,
      tickSize,
      credentials,
    }: PostOrderMutationProperties) => {
      const orderBuilder = new OrderBuilder(
        signer,
        CHAIN.POLYGON.id,
        POLYMARKET_GNOSIS_SAFE_SIGNATURE,
        funderAddress,
      );
      const order = await orderBuilder.buildMarketOrder(
        {
          tokenID,
          amount,
        },
        { tickSize, negRisk },
      );
      const orderPayload = orderToJson(order, credentials.key, OrderType.FOK);
      const l2Headers = await createL2Headers(signer, credentials, {
        method: 'POST',
        requestPath: `/order`,
        body: JSON.stringify(orderPayload),
      });

      return postOrder({ orderPayload, l2Headers });
    },
  });
};
