import { ErrorBoundary } from 'shared/observability';
import { useExtensionSettings } from 'shared/extension';
import { useTwitterLocationInfo, useHandleToUsernameMap } from 'host/twitter';

import { ProposalHandleContainer, ProposalMainContainer } from './widgets';
import { TallyProvider } from './tally.context';

export const App = () => {
  const { experimentalFeatures } = useExtensionSettings();

  const {
    isTwitter,
    isTwitterHandlePage,
    isTwitterHomePage,
    twitterHandleFromPathname,
  } = useTwitterLocationInfo();

  const { data: daoHandles } = useHandleToUsernameMap('tally');

  if (!experimentalFeatures || !isTwitter) {
    return null;
  }

  const tallyUserHandle =
    isTwitterHandlePage && daoHandles
      ? daoHandles[twitterHandleFromPathname.toLowerCase()]
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
