import { useState } from 'react';

import { useCommandQuery } from 'shared/messaging';
import { Pagination } from 'shared/ui';

import { GetProposalCommand } from '../commands';

import { Proposal } from './proposal';

interface Properties {
  twitterHandle: string;
  snapshotHandle: string;
  className?: string;
  top?: number;
  onClose?: () => void;
}

export const OrganizationProposalsContainer = ({
  twitterHandle,
  snapshotHandle,
  className = 'fixed top-20',
  top,
  onClose,
}: Properties) => {
  const [currentProposalIndex, setCurrentProposalIndex] = useState(0);

  const currentProposalQuery = useCommandQuery({
    command: new GetProposalCommand({
      snapshotName: snapshotHandle ?? '',
      pageNumber: currentProposalIndex,
    }),
    enabled: snapshotHandle ? snapshotHandle.length > 0 : false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const nextProposalQuery = useCommandQuery({
    command: new GetProposalCommand({
      snapshotName: snapshotHandle ?? '',
      pageNumber: currentProposalIndex + 1,
    }),
    enabled: snapshotHandle ? snapshotHandle.length > 0 : false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const isLoadingProposal =
    currentProposalQuery.isLoading || nextProposalQuery.isLoading;

  const isPreviousProposalAvailable = currentProposalIndex > 0;
  const isNextProposalAvailable = !!nextProposalQuery.data;

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

  const pagination: Pagination = {
    hasPrevious: isPreviousProposalAvailable,
    hasNext: isNextProposalAvailable,
    onPrevious: showPreviousProposal,
    onNext: showNextProposal,
  };

  if (!currentProposalQuery.data || !snapshotHandle) {
    return null;
  }

  return (
    <Proposal
      twitterHandle={twitterHandle}
      pagination={pagination}
      isLoading={isLoadingProposal}
      data={currentProposalQuery.data}
      className={className}
      top={top}
      onClose={onClose}
    />
  );
};
