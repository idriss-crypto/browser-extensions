import { useEffect, useState } from 'react';

import { useCommandQuery } from 'shared/messaging';

import {
  GetOrganizationInfoCommand,
  GetTallyProposalsCommand,
} from '../commands';
import { useTallyContext } from '../tally.context';
import { ProposalData } from '../types';

import { Proposal } from './proposal';

interface Properties {
  tallyName: string;
  className?: string;
  top?: number;
  onClose?: () => void;
}

export const OrganizationProposalsContainer = ({
  tallyName,
  className = 'fixed top-20',
  top,
  onClose,
}: Properties) => {
  const [currentProposalIndex, setCurrentProposalIndex] = useState(0);
  const {
    addOrganizationFetchedProposals,
    setOrganizationHasMoreProposalsToFetch,
    getOrganizationInfo,
  } = useTallyContext();

  const [fetchedProposals, setFetchedProposals] = useState<ProposalData[]>([]);
  const [hasMoreProposalsToFetch, setHasMoreProposalsToFetch] =
    useState<boolean>(true);

  const organizationInfoQuery = useCommandQuery({
    command: new GetOrganizationInfoCommand({ tallyName: tallyName ?? '' }),
    enabled: tallyName ? tallyName.length > 0 : false,
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
    command: new GetTallyProposalsCommand({
      tallyUserId: organizationInfoQuery.data?.id?.toString() ?? '',
      afterCursor: currentProposal?.id ? `0;${currentProposal.id}` : null,
    }),
    enabled: isProposalQueryEnabled,
    retry: 5,
    retryDelay: 1800,
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
    const { fetchedProposals: proposals, hasMoreProposalsToFetch: hasMore } =
      getOrganizationInfo(tallyName);

    setFetchedProposals(proposals);
    setHasMoreProposalsToFetch(hasMore);
  }, [getOrganizationInfo, tallyName]);

  useEffect(() => {
    if (!isProposalQueryEnabled || proposalQuery.isLoading) {
      return;
    }

    if (proposalQuery.data?.nodes.length === 0) {
      setOrganizationHasMoreProposalsToFetch(tallyName, false);
      return;
    }

    const newFetchedProposal = proposalQuery.data?.nodes[0];
    if (newFetchedProposal) {
      addOrganizationFetchedProposals(tallyName, [newFetchedProposal]);
    }
  }, [
    addOrganizationFetchedProposals,
    hasMoreProposalsToFetch,
    isProposalQueryEnabled,
    proposalQuery.data?.nodes,
    proposalQuery.isLoading,
    setOrganizationHasMoreProposalsToFetch,
    tallyName,
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
      className={className}
      top={top}
      onClose={onClose}
    />
  );
};
