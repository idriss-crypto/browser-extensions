import { ErrorBoundary } from 'react-error-boundary';
import { ErrorInfo, useCallback } from 'react';

import { useTwitterPage } from 'shared/twitter';
import { useExtensionSettings } from 'shared/extension';
import { sendExceptionEvent } from 'shared/monitoring';

import { TwitterPolymarketWidget } from './widgets';

export const App = () => {
  const page = useTwitterPage();
  const { experimentalFeatures } = useExtensionSettings();

  const onRuntimeError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    void sendExceptionEvent({
      name: 'polymarket-runtime-error',
      meta: {
        error,
        errorInfo,
      },
    });
  }, []);

  if (!experimentalFeatures) {
    return null;
  }

  return (
    <ErrorBoundary
      fallbackRender={() => {
        return null;
      }}
      onError={onRuntimeError}
    >
      {page.name === 'twitter' ? <TwitterPolymarketWidget /> : null}
    </ErrorBoundary>
  );
};
