import { createContext } from 'react';
import { EIP1193Provider } from 'mipd';

import { Hex } from '../web3.types';

export interface WalletContextValue {
  provider?: EIP1193Provider;
  account?: Hex;
  isModalOpened: boolean;
  isConnecting: boolean;
  availableAccounts: Hex[];
  openConnectionModal: () => void;
  closeConnectionModal: () => void;
  chooseProvider: (provider: EIP1193Provider) => Promise<void>;
  chooseAccount: (account: Hex) => void;
}

export const WalletContext = createContext<WalletContextValue | undefined>(
  undefined,
);
