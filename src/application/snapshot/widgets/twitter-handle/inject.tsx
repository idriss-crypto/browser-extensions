import { ErrorBoundary } from 'react-error-boundary';
import { ErrorInfo, useCallback } from 'react';

import { sendExceptionEvent } from 'shared/monitoring';

import { getSnapshotFromTwitterHandle } from '../../utils';

import { Container } from './container';

interface Properties {
  handle: string;
}

export const Inject = ({ handle }: Properties) => {
  const snapshotName = getSnapshotFromTwitterHandle(handle);

  const onRuntimeError = useCallback(
    (error: Error, errorInfo: ErrorInfo) => {
      void sendExceptionEvent({
        name: 'snapshot-widget-twitter-handle-runtime-error',
        meta: {
          error,
          errorInfo,
          handle,
        },
      });
    },
    [handle],
  );

  if (!snapshotName) {
    return null;
  }

  return (
    <ErrorBoundary
      fallbackRender={() => {
        return null;
      }}
      onError={onRuntimeError}
    >
      <Container snapshotName={snapshotName} />
    </ErrorBoundary>
  );
};
