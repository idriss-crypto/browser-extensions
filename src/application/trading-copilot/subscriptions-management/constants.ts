export const UNISWAP_V3_SUBGRAPH_ID = {
  // MAINNET: '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV',
  // POLYGON: '3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm',
  BASE: '43Hwfi3dJSoGpyas9VwNoDAv55yjgGrPpNSmbQZArzMG',
  CELO: 'ESdrTJ3twMwWVoQ1hUE2u7PugEHX3QkenudD6aXCkDQ4',
  OPTIMISM: 'Cghf4LfVqPiFw6fp6Y5X5Ubc8UpmUhSfJL82zwiBFLaj',
  // ARBITRUM: 'FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM',
} as const;


//TODO replace const with command
export const TWITTER_TO_ETH = {
  vitalikbuterin: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  dwr: '0xD7029BDEa1c17493893AAfE29AAD69EF892B8ff2',
  geoist_: '0xcCE9A28b570946123f392Cf1DbfA6D2D5e636a1f',
  levertz_: '0x4a3755eB99ae8b22AaFB8f16F0C51CF68Eb60b85',
} as const;

//TODO replace const with command
export const WARPCAST_TO_ETH = {
  'vitalik.eth': '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  'dwr': '0xD7029BDEa1c17493893AAfE29AAD69EF892B8ff2',
  'geoist': '0xcCE9A28b570946123f392Cf1DbfA6D2D5e636a1f',
  'levertz': '0x4a3755eB99ae8b22AaFB8f16F0C51CF68Eb60b85',
} as const;

//TODO replace const with command
export const ENS_TO_TWITTER: Record<string, string> = {
  'vitalik.eth': 'vitalikbuterin',
  'dwr.eth': 'dwr',
  'levertz.eth': 'levertz_',
  'geoist.eth': 'geoist_',
};

//TODO replace const with command
export const ENS_TO_FARCASTER: Record<string, string> = {
  'vitalik.eth': 'vitalik.eth',
  'dwr.eth': 'dwr',
  'levertz.eth': 'levertz',
  'geoist.eth': 'geoist',
};

//TODO replace with png image
export const warpcastLogo =
  'data:image/png;base64,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';

export const SUBSCRIPTIONS_STORAGE_KEY = 'COPILOT_SUBSCRIPTIONS';