import { ErrorInfo, useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { sendExceptionEvent } from 'shared/monitoring';

import { useTwitterProposalsToDisplay } from '../../hooks';
import { Proposal } from '../proposal';

export const Container = () => {
  const [hiddenSnapshots, setHiddenSnapshots] = useState<string[]>([]);

  const { proposalsToDisplay } = useTwitterProposalsToDisplay({
    hidden: hiddenSnapshots,
  });

  const hideSnapshot = useCallback((snapshotName: string) => {
    setHiddenSnapshots((previous) => {
      return [...previous, snapshotName];
    });
  }, []);

  const onRuntimeError = useCallback(
    (error: Error, errorInfo: ErrorInfo, snapshotName: string) => {
      void sendExceptionEvent({
        name: 'snapshot-widget-twitter-main-runtime-error',
        meta: {
          error,
          errorInfo,
          snapshotName,
        },
      });
    },
    [],
  );

  return proposalsToDisplay.map(({ data, top }) => {
    return (
      <ErrorBoundary
        key={data.id}
        fallbackRender={() => {
          return null;
        }}
        onError={(error, errorInfo) => {
          onRuntimeError(error, errorInfo, data.space.id);
        }}
      >
        <Proposal
          data={data}
          className="absolute"
          top={top - 12}
          onHide={() => {
            hideSnapshot(data.space.id);
          }}
        />
      </ErrorBoundary>
    );
  });
};
