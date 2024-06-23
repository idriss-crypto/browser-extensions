import { ErrorBoundary } from 'shared/observability';
import { useDaoHandles, useExtensionSettings } from 'shared/extension';
import { useTwitterLocationInfo } from 'host/twitter';

import { ProposalHandleContainer, ProposalMainContainer } from './widgets';
import { getSnapshotFromTwitterUsername } from './utils';

export const App = () => {
  const { experimentalFeatures } = useExtensionSettings();

  const {
    isTwitter,
    isTwitterHandlePage,
    isTwitterHomePage,
    twitterHandleFromPathname,
  } = useTwitterLocationInfo();

  const { data: daoHandles } = useDaoHandles('snapshot');
  const snapshotHandle = getSnapshotFromTwitterUsername(
    daoHandles ?? {},
    twitterHandleFromPathname,
  );

  if (!experimentalFeatures || !isTwitter) {
    return null;
  }

  return (
    <ErrorBoundary exceptionEventName="snapshot-runtime-error">
      {isTwitterHandlePage && snapshotHandle ? (
        <ProposalHandleContainer snapshotHandle={snapshotHandle} />
      ) : null}
      {isTwitterHomePage ? <ProposalMainContainer /> : null}
    </ErrorBoundary>
  );
};
