import { useExtensionSettings } from 'shared/extension';
import { ErrorBoundary } from 'shared/monitoring';
import { extractTwitterHandleFromPathname } from 'host/twitter';
import { useTwitterLocationInfo } from 'host/twitter/hooks';

import { ProposalHandleContainer, ProposalMainContainer } from './widgets';

export const App = () => {
  const { experimentalFeatures } = useExtensionSettings();
  const { isTwitter, isTwitterHandlePage, isTwitterHomePage } =
    useTwitterLocationInfo();

  if (!experimentalFeatures || !isTwitter) {
    return null;
  }

  return (
    <ErrorBoundary exceptionEventName="agora-runtime-error">
      {isTwitterHandlePage ? (
        <ProposalHandleContainer
          handle={extractTwitterHandleFromPathname(location.pathname ?? '')}
        />
      ) : null}
      {isTwitterHomePage ? <ProposalMainContainer /> : null}
    </ErrorBoundary>
  );
};
