/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TwitterUserPoolingResult } from 'src/host/twitter';

import { AGORA_WEBSITE_URL, TWITTER_HANDLE_TO_AGORA } from './constants';
import { GetProposalsOptions, ProposalData } from './types';

export const generateGetProposalsQuery = (
  agoraUsernames: string[],
  options: GetProposalsOptions,
) => {
  // TODO: use GQL variables for this
  return `query Proposals {
  proposals (
    first: ${options.first},
    skip: 0,
    where: {
      space_in: [${agoraUsernames.map((name) => {
        return `"${name}"`;
      })}],
      state: "active"
    },
    orderBy: "end",
    orderDirection: asc
  ) {
    id
    title
    body
    end
    author
    space {
      id
    }
  }
}`;
};

export const getProposalUrl = (agoraUsernames: string, proposalId: string) => {
  return `${AGORA_WEBSITE_URL}/#/${agoraUsernames}/proposal/${proposalId}`;
};

export const getUserUrl = (userId: string) => {
  return `${AGORA_WEBSITE_URL}/#/profile/${userId}`;
};

export const getAgoraUsernameFromTwitterUsername = (handle: string) => {
  return TWITTER_HANDLE_TO_AGORA[handle.toLowerCase()];
};

export const getDaysUntil = (dateInMs: number) => {
  const currentDate = new Date();

  // Set the time of the current date to 00:00:00 for accurate day difference calculation
  currentDate.setHours(0, 0, 0, 0);

  // Create a new date object for the target date, also set to 00:00:00
  const targetDate = new Date(dateInMs);
  targetDate.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const differenceInMillis = targetDate.getTime() - currentDate.getTime();

  // Convert the difference from milliseconds to days
  const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);

  return Math.round(differenceInDays);
};

export const getEndsInLabel = (daysUntil: number) => {
  if (daysUntil < 0) {
    return '-';
  }

  if (daysUntil === 0) {
    return 'Ends today';
  }

  if (daysUntil === 1) {
    return 'Ends in 1 day';
  }

  return `Ends in ${daysUntil} days`;
};

export const getProposalAuthor = (proposal: ProposalData) => {
  return (
    proposal.author.resolvedAddress ??
    `${proposal.author.address.slice(0, 6)}...${proposal.author.address.slice(Math.max(0, proposal.author.address.length - 4))}`
  );
};

export const getAgoraUserNodes = (
  poolingResults: TwitterUserPoolingResult[],
) => {
  return poolingResults
    .map((result) => {
      const agoraUsername = getAgoraUsernameFromTwitterUsername(
        result.username,
      );
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
