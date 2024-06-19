import { useExtensionSettings } from 'shared/extension';
import { ErrorBoundary } from 'shared/monitoring';
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

  if (!experimentalFeatures || !isTwitter) {
    return null;
  }

  const tallyUserHandle = isTwitterHandlePage
    ? getTallyFromTwitterUsername(twitterHandleFromPathname)
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
