'use client';
import { WalletContextProvider } from '@idriss-xyz/wallet-connect';
import NiceModal from '@ebay/nice-modal-react';
import { WithPortal } from '@idriss-xyz/ui/providers/with-portal';
import { ReactNode } from 'react';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryProvider } from '@/providers';
import { wagmiconfig } from './config';

type Properties = {
  children: ReactNode;
};

export const RainbowKitProviders = ({ children }: Properties) => {
  return (
    <WagmiProvider config={wagmiconfig}>
      <QueryProvider>
        <WithPortal>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </WithPortal>
      </QueryProvider>
    </WagmiProvider>
  );
};

export const Providers = ({ children }: Properties) => {
  return (
    <QueryProvider>
      <WithPortal>
        <NiceModal.Provider>
          <WalletContextProvider>
            <>{children}</>
          </WalletContextProvider>
        </NiceModal.Provider>
      </WithPortal>
    </QueryProvider>
  );
};
