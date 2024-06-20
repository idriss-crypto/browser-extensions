import { useExtensionSettings } from 'shared/extension';
import { ErrorBoundary } from 'shared/monitoring';
import { useTwitterLocationInfo } from 'host/twitter';
import { useGetDaoHandles } from 'shared/extension/commands/get-dao-handles';

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

  const { data: daoHandles } = useGetDaoHandles('tally');

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
