import { useCallback, useState } from 'react';

import { ErrorBoundary } from 'shared/monitoring';

import { useTwitterVisibleTallyUsersNodes } from '../hooks';

import { OrganizationProposalsContainer } from './organization-proposals.container';

export const ProposalMainContainer = () => {
  const [hiddenUsers, setHiddenUsers] = useState<string[]>([]);

  const { visibleTallys } = useTwitterVisibleTallyUsersNodes({
    hidden: hiddenUsers,
  });

  const hideTally = useCallback((tallyName: string) => {
    setHiddenUsers((previous) => {
      return [...previous, tallyName];
    });
  }, []);

  return visibleTallys.map(({ name, top }) => {
    return (
      <ErrorBoundary
        key={name}
        exceptionEventName="tally-widget-twitter-main-runtime-error"
      >
        <OrganizationProposalsContainer
          twitterName={name}
          className="absolute"
          top={top - 12}
          onClose={() => {
            hideTally(name);
          }}
        />
      </ErrorBoundary>
    );
  });
};
