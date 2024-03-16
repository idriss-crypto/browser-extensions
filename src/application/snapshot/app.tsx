import { ErrorInfo, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useTwitterPage } from 'shared/twitter';
import { useExtensionSettings } from 'shared/extension';
import { sendExceptionEvent } from 'shared/monitoring';

import { TwitterHandleWidget, TwitterMainWidget } from './widgets';

export const App = () => {
  const page = useTwitterPage();
  const { experimentalFeatures } = useExtensionSettings();

  const onRuntimeError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    void sendExceptionEvent({
      name: 'snapshot-runtime-error',
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
      {page.name === 'twitter' && page.type === 'handle' ? (
        <TwitterHandleWidget handle={page.handle} />
      ) : null}
      {page.name === 'twitter' && page.type === 'main' ? (
        <TwitterMainWidget />
      ) : null}
    </ErrorBoundary>
  );
};
