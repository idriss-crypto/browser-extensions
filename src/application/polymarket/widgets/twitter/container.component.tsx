import { ErrorBoundary } from 'react-error-boundary';
import { ErrorInfo, useCallback } from 'react';

import { sendExceptionEvent } from 'shared/monitoring';

import { useAvailability, useTwitterMarkets } from '../../hooks';
import { MarketWidget } from '../market';

// TODO: widget generic component with padding, placement and shadow?
export const Container = () => {
  const marketsQuery = useTwitterMarkets();
  const availabilityQuery = useAvailability();

  const onRuntimeError = useCallback(
    (error: Error, errorInfo: ErrorInfo, conditionId: string) => {
      void sendExceptionEvent({
        name: 'polymarket-widget-twitter-runtime-error',
        meta: {
          error,
          errorInfo,
          conditionId,
        },
      });
    },
    [],
  );

  return marketsQuery.data?.map((market) => {
    return (
      <ErrorBoundary
        key={`${market.top}-${market.conditionId}`}
        fallbackRender={() => {
          return null;
        }}
        onError={(error, errorInfo) => {
          onRuntimeError(error, errorInfo, market.conditionId);
        }}
      >
        <MarketWidget
          top={market.top}
          conditionId={market.conditionId}
          isAvailable={availabilityQuery.data ?? true}
        />
      </ErrorBoundary>
    );
  });
};
