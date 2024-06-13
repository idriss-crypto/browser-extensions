import { useEffect, useState } from 'react';

import { useCommandQuery } from 'shared/messaging';

import { GetOrganizationInfoCommand, GetProposalsCommand } from '../commands';
import { getTallyFromTwitterUsername } from '../utils';
import { ProposalData } from '../types';

import { Proposal } from './proposal';

interface Properties {
  handle: string;
}

export const ProposalHandleContainer = ({ handle }: Properties) => {
  const [fetchedProposals, setFetchedProposals] = useState<ProposalData[]>([]);
  const [currentProposalIndex, setCurrentProposalIndex] = useState(0);
  const [hasMoreProposalsToFetch, setHasMoreProposalsToFetch] = useState(true);

  const tallyName = getTallyFromTwitterUsername(handle);

  const organizationInfoQuery = useCommandQuery({
    command: new GetOrganizationInfoCommand({ twitterName: handle ?? '' }),
    enabled: handle ? handle.length > 0 : false,
  });

  const hasActiveProposals =
    organizationInfoQuery.data?.hasActiveProposals ?? false;

  const currentProposal = fetchedProposals.at(currentProposalIndex);
  const isCurrentProposalLastFetched =
    fetchedProposals.at(-1)?.id === currentProposal?.id;
  const isProposalQueryEnabled =
    hasActiveProposals &&
    hasMoreProposalsToFetch &&
    isCurrentProposalLastFetched;

  const proposalQuery = useCommandQuery({
    command: new GetProposalsCommand({
      tallyUserId: organizationInfoQuery.data?.id?.toString() ?? '',
      afterCursor: currentProposal?.id ? `0;${currentProposal.id}` : null,
    }),
    enabled: isProposalQueryEnabled,
    retry: 5,
    retryDelay: 1600,
  });

  const isLoadingProposal =
    proposalQuery.isLoading || proposalQuery.isPlaceholderData;
  const isPreviousProposalAvailable = currentProposalIndex > 0;
  const isNextProposalAvailable =
    currentProposalIndex < fetchedProposals.length - 1;

  const showPreviousProposal = () => {
    if (!isPreviousProposalAvailable || isLoadingProposal) {
      return;
    }

    setCurrentProposalIndex((previous) => {
      return previous - 1;
    });
  };

  const showNextProposal = () => {
    if (!isNextProposalAvailable || isLoadingProposal) {
      return;
    }

    setCurrentProposalIndex((previous) => {
      return previous + 1;
    });
  };

  useEffect(() => {
    if (!isProposalQueryEnabled || proposalQuery.isLoading) {
      return;
    }

    if (proposalQuery.data?.nodes.length === 0) {
      setHasMoreProposalsToFetch(false);
      return;
    }

    const newFetchedProposal = proposalQuery.data?.nodes[0];
    if (newFetchedProposal) {
      setFetchedProposals((previous) => {
        return [...previous, newFetchedProposal];
      });
    }
  }, [
    hasMoreProposalsToFetch,
    isProposalQueryEnabled,
    proposalQuery.data?.nodes,
    proposalQuery.isLoading,
  ]);

  if (!currentProposal || !tallyName) {
    return null;
  }

  return (
    <Proposal
      isPreviousProposalAvailable={isPreviousProposalAvailable}
      isNextProposalAvailable={isNextProposalAvailable}
      onNext={showNextProposal}
      onPrevious={showPreviousProposal}
      isLoading={isLoadingProposal}
      proposalDetails={currentProposal}
      className="fixed top-20"
    />
  );
};
