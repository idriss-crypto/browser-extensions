import { CHAIN, Hex } from 'shared/web3';

export type SubscriptionRequest = {
  subscriberId: string;
  address: Hex;
};

export type SubscriptionResponse = Hex;

export type SubscriptionsRequest = {
  subscriberId: string;
};

export type SubscriptionsResponse = {
  subscriberId: string;
  addresses: SubscriptionResponse[];
};

type SwapDataToken = {
  address: Hex;
  symbol: string;
  amount: number;
  decimals: number;
  network: keyof typeof CHAIN;
};

export type SwapData = {
  transactionHash: Hex;
  from: Hex;
  to: Hex;
  tokenIn: SwapDataToken;
  tokenOut: SwapDataToken;
  timestamp: string;
  isComplete: boolean;
};
