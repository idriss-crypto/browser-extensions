import { ErrorBoundary } from 'shared/observability';
import { MarketWidgetContainer } from 'application/polymarket';

import { useNewestMarket } from '../hooks';


export const NewestMarketWidget = () => {
  const { data: market, error, isLoading } = useNewestMarket();
  if (!market) {
    return null;
  }

  if (isLoading) {
    return <div>Loading newest market...</div>;
  }

  if (error) {
    return <div>Error loading newest market: {error.message}</div>;
  }
  return (
    <ErrorBoundary>
      <MarketWidgetContainer
        key={`${55}-${market.conditionId}`}
        top={55}
        conditionId={market.conditionId}
      />
    </ErrorBoundary>
  );
};
