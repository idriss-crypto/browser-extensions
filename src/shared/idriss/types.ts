import { Hex } from 'viem';

export interface SendFormValues {
  chainId: number;
  tokenAddress: Hex;
  amount: number;
}
