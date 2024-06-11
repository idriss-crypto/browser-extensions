/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TwitterUserPoolingResult } from 'src/host/twitter';

import { TALLY_WEBSITE_URL } from './constants';

export const generateGetOrganizationInfoQuery = () => {
  return `query Organization($input: OrganizationInput!) {
  organization(input: $input) {
    id
    slug
    name
    chainIds
    governorIds
    tokenIds
    metadata {
      color
      description
      icon
      karmaName
    }
    creator {
      id
      address
      ens
      twitter
      name
      bio
      picture
      safes
      type
    }
    hasActiveProposals
    proposalsCount
    votersCount
    delegatesCount
    delegatesVotesCount
    tokenHoldersCount
    tokenOwnersCount
  }
}`;
};

export const generateGetProposalsQuery = () => {
  return `query ProposalsV2($input: ProposalsInput!) {
  proposalsV2(input: $input) {
    nodes {
      ... on ProposalV2 {
        id
        end {
          ... on Block {
            timestamp
          }
        }
        metadata {
          title
          description
        }
        status
        organization {
          id
          name
        }
      }
    }
    pageInfo {
      firstCursor
      lastCursor
      count
    }
  }
}`;
};

export const getProposalUrl = (userName: string, proposalId: string) => {
  return `${TALLY_WEBSITE_URL}/gov/${userName}/proposal/${proposalId}`;
};

export const getUserUrl = (userName: string) => {
  return `${TALLY_WEBSITE_URL}/gov/${userName}`;
};

export const getTallyFromTwitterUsername = (handle: string) => {
  return handle.toLowerCase();
};

export const getTallyUsernameNodes = (
  poolingResults: TwitterUserPoolingResult[],
) => {
  return poolingResults
    .map((result) => {
      const tallyName = getTallyFromTwitterUsername(result.username);
      if (!tallyName) {
        return;
      }

      return {
        tallyName,
        ...result,
      };
    })
    .filter(Boolean);
};
