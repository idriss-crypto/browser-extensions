import { useCallback, useState } from 'react';

import { ErrorBoundary } from 'shared/monitoring';

import { useTwitterProposalsToDisplay } from '../hooks';

import { Proposal } from './proposal';

export const ProposalMainContainer = () => {
  const [hiddenTallys, setHiddenTallys] = useState<string[]>([]);

  const { proposalsToDisplay } = useTwitterProposalsToDisplay({
    hidden: hiddenTallys,
  });

  const hideTally = useCallback((tallyName: string) => {
    setHiddenTallys((previous) => {
      return [...previous, tallyName];
    });
  }, []);

  return proposalsToDisplay.map(({ data, top }) => {
    return (
      <ErrorBoundary
        key={data.id}
        exceptionEventName="tally-widget-twitter-main-runtime-error"
      >
        <Proposal
          data={data}
          className="absolute"
          top={top - 12}
          onClose={() => {
            hideTally(data.space.id);
          }}
        />
      </ErrorBoundary>
    );
  });
};
