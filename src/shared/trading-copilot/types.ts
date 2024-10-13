import { Hex } from 'viem';

export type Subscription = {
  ensName: string;
  walletAddress: Hex;
  avatarSrc?: string;
  twitterUsername?: string;
  farcasterUsername?: string;
};
