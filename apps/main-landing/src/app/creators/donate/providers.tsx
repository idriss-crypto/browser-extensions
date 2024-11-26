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
  mantle,
  base,
} from 'wagmi/chains';
import { defineChain } from 'viem';

import { QueryProvider } from '@/providers';
import { ALEPH_LOGO } from './logos';

type Properties = {
  children: ReactNode;
};

// TODO: Check correct place for this config

export const alephzero = defineChain({
  id: 41_455,
  name: 'Aleph Zero EVM',
  logo: ALEPH_LOGO,
  nativeCurrency: {
    name: 'AZERO',
    symbol: 'AZERO',
    decimals: 18,
  },
  rpcUrls: { default: { http: ['https://rpc.alephzero.raas.gelato.cloud'] } },
  blockExplorers: {
    default: {
      name: 'Evm Explorer',
      url: 'https://evm-explorer.alephzero.org',
    },
  },
})

const config = getDefaultConfig({
  appName: 'IDRISS Creators Login',
  projectId: 'd9b05a544ca612833e810a77724e5af8', // TODO: change for WalletConnect ID
  chains: [mainnet, polygon, optimism, mantle, base],
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
