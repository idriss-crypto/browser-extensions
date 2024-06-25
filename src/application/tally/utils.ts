import { TALLY_WEBSITE_URL } from './constants';
import { ProposalData } from './types';

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
          slug
        }
      }
    }
    pageInfo {
      lastCursor
    }
  }
}`;
};

export const getProposalUrl = (userName: string, proposalId: string) => {
  return `${TALLY_WEBSITE_URL}/gov/${userName}/proposal/${proposalId}`;
};

const getOrganizationUrl = (organizationName: string) => {
  return `${TALLY_WEBSITE_URL}/gov/${organizationName}`;
};

const getOrganizationDelegateUrl = (
  organizationName: string,
  delegateEns: string,
) => {
  return `${TALLY_WEBSITE_URL}/gov/${organizationName}/delegate/${delegateEns}`;
};

export const getProposalAuthorUrl = (proposalDetails: ProposalData) => {
  return proposalDetails.creator.ens.length > 0 ||
    proposalDetails.creator.address.length > 0
    ? getOrganizationDelegateUrl(
        proposalDetails.organization.slug ?? '',
        proposalDetails.creator.ens.length > 0
          ? proposalDetails.creator.ens
          : proposalDetails.creator.address,
      )
    : getOrganizationUrl(proposalDetails.organization.slug ?? '');
};

export const getProposalAuthorLabel = (proposalDetails: ProposalData) => {
  return proposalDetails.creator.name.length > 0
    ? proposalDetails.creator.name
    : proposalDetails.creator.address;
};

export const getProposalStatusLabel = (status: string) => {
  return status.toLowerCase() === 'active' ? 'Vote' : 'View';
};
