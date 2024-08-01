import { ScrapingResult } from 'shared/scraping';

import {
  AGORA_ETHERSCAN_WEBSITE_URL,
  AGORA_WEBSITE_URL,
  TWITTER_HANDLE_TO_AGORA,
} from './constants';

export const getProposalUrl = (proposalId: string) => {
  return `${AGORA_WEBSITE_URL}/proposals/${proposalId}`;
};

export const getProposerUrl = (proposerAddress: string) => {
  return `${AGORA_ETHERSCAN_WEBSITE_URL}/address/${proposerAddress}`;
};

export const getAgoraUsernameFromTwitterUsername = (handle: string) => {
  return TWITTER_HANDLE_TO_AGORA[handle.toLowerCase()];
};

export const getAgoraWidgetsInfo = (poolingResults: ScrapingResult[]) => {
  return poolingResults
    .map((result) => {
      const agoraUsername = getAgoraUsernameFromTwitterUsername(result.value);
      if (!agoraUsername) {
        return;
      }

      return {
        agoraUsername,
        ...result,
      };
    })
    .filter(Boolean);
};

export const formatProposalAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(Math.max(0, address.length - 4))}`;
};
