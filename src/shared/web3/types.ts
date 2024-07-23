import { ethers } from 'ethers';
import { EIP1193Provider } from 'mipd';

export type Hex = `0x${string}`;

export interface Chain {
  id: number;
  name: string;
  logo: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export interface Token {
  name: string;
  logo: string;
  symbol: string;
}

export interface ChainToken extends Token {
  decimals: number;
  address: Hex;
}

export interface GetEthPriceResponse {
  price: string;
}

export interface Wallet {
  provider: EIP1193Provider;
  account: Hex;
  chainId: number;
  providerRdns: string;
}

export interface TempWallet extends ethers.Wallet {
  account: Hex;
}

export interface Payload {
  chains: { id: number; wrappedEthAddress: string }[];
  destinationChainId: number;
  amount: string;
  message: string;
  recipient: string;
}
