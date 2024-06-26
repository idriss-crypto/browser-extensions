import { useEffect, useState } from 'react';

import { useCommandQuery } from 'shared/messaging';

import { GetTallyProposalsCommand } from '../commands';

import { Proposal } from './proposal';

interface Properties {
  twitterHandle: string;
  className?: string;
  top?: number;
  onClose?: () => void;
}

export const OrganizationProposalsContainer = ({
  twitterHandle: tallyName,
  className = 'fixed top-20',
  top,
  onClose,
}: Properties) => {
  const [previousProposalCursors, setPreviousProposalCursors] = useState<
    (string | null)[]
  >([]);
  const [currentProposalCursor, setCurrentProposalCursor] = useState<
    string | null
  >(null);
  const [nextProposalCursor, setNextProposalCursor] = useState<string | null>(
    null,
  );

  const proposalQuery = useCommandQuery({
    command: new GetTallyProposalsCommand({
      twitterHandle: tallyName ?? '',
      afterCursor: currentProposalCursor,
    }),
    retry: 5,
    retryDelay: 1800,
    staleTime: Number.POSITIVE_INFINITY,
    placeholderData: (previousData) => {
      return previousData;
    },
  });

  const currentProposal = proposalQuery.data?.nodes[0];

  const isLoadingProposal =
    proposalQuery.isLoading || proposalQuery.isPlaceholderData;
  const isPreviousProposalAvailable = previousProposalCursors.length > 0;
  const isNextProposalAvailable = nextProposalCursor !== null;

  const showPreviousProposal = () => {
    const previousProposalCursor = previousProposalCursors.at(-1);
    if (
      !isPreviousProposalAvailable ||
      isLoadingProposal ||
      previousProposalCursor === undefined
    ) {
      return;
    }

    setNextProposalCursor(currentProposalCursor);
    setCurrentProposalCursor(previousProposalCursor);
    setPreviousProposalCursors((previous) => {
      return previous.slice(0, -1);
    });
  };

  const showNextProposal = () => {
    if (!isNextProposalAvailable || isLoadingProposal) {
      return;
    }

    setCurrentProposalCursor(nextProposalCursor);
    setPreviousProposalCursors((previous) => {
      return [...previous, currentProposalCursor];
    });
  };

  useEffect(() => {
    if (proposalQuery.isLoading) {
      return;
    }

    const newFetchedProposalInfo = proposalQuery.data;
    if (newFetchedProposalInfo) {
      setNextProposalCursor(newFetchedProposalInfo.pageInfo.lastCursor);
    }
  }, [proposalQuery]);
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
