import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, mantle, base } from 'wagmi/chains';
import { defineChain, createPublicClient, http } from 'viem';

import { ALEPH_LOGO } from '../logos';

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

export const wagmiconfig = getDefaultConfig({
  appName: 'IDRISS Creators Login',
  projectId: 'd9b05a544ca612833e810a77724e5af8', // TODO: change for production WalletConnect ID
  chains: [mainnet, polygon, optimism, mantle, base, alephzero],
  ssr: true,
});

export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: http(), // TODO: Add custom RPC provider if needed
});