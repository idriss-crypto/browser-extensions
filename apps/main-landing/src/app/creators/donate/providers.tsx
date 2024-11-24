'use client';
import { WalletContextProvider } from '@idriss-xyz/wallet-connect';
import NiceModal from '@ebay/nice-modal-react';
import { WithPortal } from '@idriss-xyz/ui/providers/with-portal';
import { ReactNode } from 'react';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';

import { QueryProvider } from '@/providers';

type Properties = {
  children: ReactNode;
};

// TODO: Check correct place for this config
const config = getDefaultConfig({
  appName: 'IDRISS Creators Login',
  projectId: 'YOUR_PROJECT_ID', // TODO: change for WalletConnect ID
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});


export const RainbowKitProviders = ({ children }: Properties) => {
  return (
    <WagmiProvider config={config}>
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
