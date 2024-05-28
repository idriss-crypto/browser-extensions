import { useCallback, useState } from 'react';

import { ErrorBoundary } from 'shared/monitoring';

import { useTwitterProposalsToDisplay } from '../hooks';

import { Proposal } from './proposal';

export const ProposalMainContainer = () => {
  const [hiddenAgoraUsers, setHiddenAgoraUsers] = useState<string[]>([]);

  const { proposalsToDisplay } = useTwitterProposalsToDisplay({
    hidden: hiddenAgoraUsers,
  });

  const hideAgoraUser = useCallback((agoraUsername: string) => {
    setHiddenAgoraUsers((previous) => {
      return [...previous, agoraUsername];
    });
  }, []);

  return proposalsToDisplay.map(({ data, top }) => {
    return (
      <ErrorBoundary
        key={data.proposalId}
        exceptionEventName="agora-widget-twitter-main-runtime-error"
      >
        <Proposal
          data={data}
          className="absolute"
          top={top - 12}
          onClose={() => {
            hideAgoraUser(data.author.address);
          }}
        />
      </ErrorBoundary>
    );
  });
};
