import { createLookup } from 'shared/utils';

export const TWITTER_HANDLE_TO_AGORA: Record<string, string> = {
  optimism: 'optimism.eth',
  optimismgov: 'optimism.eth',
};

export const FARCASTER_HANDLE_TO_AGORA: Record<string, string> = {
  optimism: 'optimism.eth',
  optimismgov: 'optimism.eth',
};

export const AGORA_WEBSITE_URL = 'https://vote.optimism.io';
export const AGORA_API_URL = 'https://api.idriss.xyz/fetch-agora';

export const EVENT = createLookup(['AGORA_VOTE_CLICKED']);
