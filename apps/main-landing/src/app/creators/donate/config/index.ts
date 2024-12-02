import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, mantle, base } from 'wagmi/chains';
import { defineChain, createClient, http } from 'viem';

import { ALEPH_LOGO } from '../logos';
import { createConfig } from 'wagmi';

const alephzero = defineChain({
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
});

const connectors = connectorsForWallets(
  [...getDefaultWallets().wallets],
  {
    appName: 'IDRISS Creators Login',
    projectId: 'c68a9fb876e8a1c0a99f89debcfeb2bf'
  }
);

export const wagmiconfig = createConfig({
  chains: [mainnet, polygon, optimism, mantle, base, alephzero],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
  ssr: true,
  // Do not store on localstorage. Does not work for injected providers
  storage: null,
  connectors: connectors,
});
