import { Hex } from 'shared/web3';

export type Subscription = {
  ensName: string;
  walletAddress: Hex;
};

export type SwapDataToken = {
  symbol: string;
  amount: number;
};

export type SwapData = {
  tokenIn: SwapDataToken;
  tokenOut: SwapDataToken;
};
