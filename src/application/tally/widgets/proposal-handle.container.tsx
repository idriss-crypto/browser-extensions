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
  const [isNextProposalAvailable, setIsNextProposalAvailable] = useState(true);
  const isPreviousProposalAvailable = currentProposalIndex > 0;

  const tallyName = getTallyFromTwitterUsername(handle);

  const organizationInfoQuery = useCommandQuery({
    command: new GetOrganizationInfoCommand({ twitterName: handle ?? '' }),
    enabled: handle ? handle.length > 0 : false,
  });

  const hasActiveProposal =
    organizationInfoQuery.data?.hasActiveProposals ?? false;

  const currentProposal = fetchedProposals.at(currentProposalIndex);

  const proposalQuery = useCommandQuery({
    command: new GetProposalsCommand({
      tallyUserId: organizationInfoQuery.data?.id?.toString() ?? '',
      afterCursor: currentProposal?.id ? `0;${currentProposal.id}` : null,
    }),
    enabled: hasActiveProposal,
  });

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
    if (proposalQuery.isLoading) {
      return;
    }

    if (proposalQuery.data?.nodes.length === 0) {
      setIsNextProposalAvailable(false);
      return;
    }

    const newFetchedProposal = proposalQuery.data?.nodes[0];
    if (!newFetchedProposal) {
      return;
    }

    setFetchedProposals((previous) => {
      return [...previous, newFetchedProposal];
    });
  }, [proposalQuery.data?.nodes, proposalQuery.isLoading]);

  const isLoadingProposal =
    proposalQuery.isLoading || proposalQuery.isPlaceholderData;

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
