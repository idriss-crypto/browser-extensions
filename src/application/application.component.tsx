import { ErrorInfo, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  PortalContextProvider,
  WithQueryClient,
  WithTailwind,
} from 'shared/ui/providers';
import { WalletContextProvider, WithWalletConnectModal } from 'shared/web3';
import { ExtensionSettingsProvider } from 'shared/extension';
import { TwitterPageProvider } from 'shared/twitter';
import { sendExceptionEvent } from 'shared/monitoring';

import { PolymarketApp } from './polymarket';
import { SnapshotApp } from './snapshot';

export const Application = () => {
  const onApiError = useCallback((error: Error, variables: unknown) => {
    void sendExceptionEvent({
      name: 'http-error',
      meta: { name: error.name, message: error.message, variables },
    });
  }, []);

  const onRuntimeError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    void sendExceptionEvent({
      name: 'application-runtime-error',
      meta: {
      error,
      errorInfo},
    });
  }, []);

  return (
    <ErrorBoundary
      fallbackRender={() => {
        return null;
      }}
      onError={onRuntimeError}
    >
      <PortalContextProvider>
        <WithTailwind>
          <WithQueryClient onError={onApiError}>
            <WalletContextProvider>
              <WithWalletConnectModal>
                <ExtensionSettingsProvider>
                  <TwitterPageProvider>
                    <PolymarketApp />
                    <SnapshotApp />
                  </TwitterPageProvider>
                </ExtensionSettingsProvider>
              </WithWalletConnectModal>
            </WalletContextProvider>
          </WithQueryClient>
        </WithTailwind>
      </PortalContextProvider>
    </ErrorBoundary>
  );
};
