import { useCallback, useEffect, useState } from 'react';

import { ErrorBoundary } from 'shared/monitoring';
import { useCommandQuery } from 'shared/messaging';

import { useTwitterVisibleAgoraNodes } from '../hooks';
import { ProposalData } from '../types';
import { GetAgoraProposalsCommand } from '../commands';

import { Proposal } from './proposal';

export const ProposalMainContainer = () => {
  const [hiddenAgoraUsers, setHiddenAgoraUsers] = useState<string[]>([]);
  const [currentProposalIndex, setCurrentProposalIndex] = useState<number>(0);
  const [currentProposal, setCurrentProposal] = useState<ProposalData>();

  const { visibleAgoraNodes } = useTwitterVisibleAgoraNodes({
    hidden: hiddenAgoraUsers,
  });

  const hideAgoraUser = useCallback((agoraUsername: string) => {
    setHiddenAgoraUsers((previous) => {
      return [...previous, agoraUsername];
    });
  }, []);

  const proposalQuery = useCommandQuery({
    command: new GetAgoraProposalsCommand({
      limit: 1,
      offset: currentProposalIndex,
    }),
    enabled: visibleAgoraNodes ? visibleAgoraNodes.length > 0 : false,
  });

  const isPreviousProposalAvailable = currentProposalIndex > 0;
  const isNextProposalAvailable = Boolean(
    proposalQuery.data?.metadata.has_next,
  );

  const showPreviousProposal = () => {
    if (!isPreviousProposalAvailable) {
      return;
    }

    setCurrentProposalIndex((previous) => {
      return previous - 1;
    });
  };

  const showNextProposal = () => {
    if (!isNextProposalAvailable) {
      return;
    }

    setCurrentProposalIndex((previous) => {
      return previous + 1;
    });
  };

  useEffect(() => {
    const proposalResponse = proposalQuery.data?.proposals?.at(0);
    if (proposalResponse) {
      setCurrentProposal(proposalResponse);
    }
  }, [proposalQuery.data?.proposals]);

  if (!currentProposal || !visibleAgoraNodes?.length) {
    return null;
  }

  return visibleAgoraNodes.map(({ top }) => {
    return (
      <ErrorBoundary
        key={currentProposal.proposalId}
        exceptionEventName="agora-widget-twitter-main-runtime-error"
      >
        <Proposal
          isPreviousProposalAvailable={isPreviousProposalAvailable}
          isNextProposalAvailable={isNextProposalAvailable}
          showNextProposal={showNextProposal}
          showPreviousProposal={showPreviousProposal}
          loadingNextProposal={proposalQuery.isLoading}
          data={currentProposal}
          className="absolute"
          top={top - 12}
          onClose={() => {
            hideAgoraUser(currentProposal.proposerAddress);
          }}
        />
      </ErrorBoundary>
    );
  });
};
