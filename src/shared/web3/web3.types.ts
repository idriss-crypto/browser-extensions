import { EIP1193Provider } from 'mipd';

export interface Wallet {
  provider: EIP1193Provider;
  account: `0x${string}`;
}

export type Hex = `0x${string}`;
