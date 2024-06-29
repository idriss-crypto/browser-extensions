import { useMemo, useState } from 'react';

import { ErrorBoundary } from 'shared/observability';

import { useTwitterVisibleTallyUsersNodes } from '../hooks';

import { OrganizationProposalsContainer } from './organization-proposals.container';

export const ProposalMainContainer = () => {
  const [hiddenUsers, setHiddenUsers] = useState<string[]>([]);

  const { visibleTallyNodes } = useTwitterVisibleTallyUsersNodes({
    hidden: hiddenUsers,
  });

  const hideTally = (tallyName: string) => {
    setHiddenUsers((previous) => {
      return [...previous, tallyName];
    });
  };

  const memoizedComponents = useMemo(() => {
    return visibleTallyNodes.map(({ name, top, twitterHandle }) => {
      return (
        <ErrorBoundary
          key={`${name}at_${top}`}
          exceptionEventName="tally-widget-twitter-main-runtime-error"
        >
          <OrganizationProposalsContainer
            twitterHandle={twitterHandle}
            className="absolute"
            top={top - 12}
            onClose={() => {
              return hideTally(name);
            }}
          />
        </ErrorBoundary>
      );
    });
  }, [visibleTallyNodes]); // Only re-create when visibleTallyNodes changes

  return memoizedComponents;
};
