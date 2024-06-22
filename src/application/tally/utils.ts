import { ScrapingResult } from 'shared/scraping';

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
          ... on BlocklessTimestamp {
            timestamp
          }
        }
        metadata {
          title
          description
        }
        status
        creator {
          address
          name
          ens
        }
        organization {
          id
          name
          slug
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
  return `${TALLY_WEBSITE_URL}gov/${userName}/proposal/${proposalId}`;
};

export const getOrganizationUrl = (organizationName: string) => {
  return `${TALLY_WEBSITE_URL}gov/${organizationName}`;
};

export const getOrganizationDelegateUrl = (
  organizationName: string,
  delegateEns: string,
) => {
  return `${TALLY_WEBSITE_URL}gov/${organizationName}/delegate/${delegateEns}`;
};

export const getTallyFromTwitterUsername = (
  daoHandles: Record<string, string>,
  handle: string,
) => {
  return daoHandles[handle.toLowerCase()];
};

export const getTallyUserNodes = (
  daoHandles: Record<string, string>,
  poolingResults: ScrapingResult[],
) => {
  return poolingResults
    .map((result) => {
      const tallyName = getTallyFromTwitterUsername(daoHandles, result.value);
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

export const getStatusBadgeColorClassNames = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': {
      return 'text-tally-purple-500 bg-tally-purple-100';
    }
    case 'defeated': {
      return 'text-tally-red-500 bg-tally-red-100';
    }
    default: {
      return 'text-tally-teal-600 bg-tally-teal-50';
    }
  }
};
