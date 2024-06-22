import { ErrorBoundary } from 'shared/observability';
import { useExtensionSettings, useDaoHandles } from 'shared/extension';
import { useTwitterLocationInfo } from 'host/twitter';

import { ProposalHandleContainer, ProposalMainContainer } from './widgets';
import { getTallyFromTwitterUsername } from './utils';
import { TallyProvider } from './tally.context';

export const App = () => {
  const { experimentalFeatures } = useExtensionSettings();

  const {
    isTwitter,
    isTwitterHandlePage,
    isTwitterHomePage,
    twitterHandleFromPathname,
  } = useTwitterLocationInfo();

  const { data: daoHandles } = useDaoHandles('tally');

  if (!experimentalFeatures || !isTwitter) {
    return null;
  }

  const tallyUserHandle =
    isTwitterHandlePage && daoHandles
      ? getTallyFromTwitterUsername(daoHandles, twitterHandleFromPathname)
      : null;

  return (
    <ErrorBoundary exceptionEventName="tally-runtime-error">
      <TallyProvider>
        <>
          {tallyUserHandle ? (
            <ProposalHandleContainer tallyName={tallyUserHandle} />
          ) : null}
          {isTwitterHomePage ? <ProposalMainContainer /> : null}
        </>
      </TallyProvider>
    </ErrorBoundary>
  );
};
