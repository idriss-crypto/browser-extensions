import { ErrorBoundary } from 'shared/observability';
import { MarketWidgetContainer } from 'application/polymarket';

import { useNewestMarket } from '../hooks';


export const NewestMarketWidget = () => {
  const { data: market, error, isLoading } = useNewestMarket();
  if (!market?.[0]?.markets[0]) {
    return null;
  }

  const newestMarket = market[0].markets[0]

  if (isLoading) {
    return <div>Loading newest market...</div>;
  }

  if (error) {
    return <div>Error loading newest market: {error.message}</div>;
  }
  return (
    <ErrorBoundary>
      <MarketWidgetContainer
        key={`${55}-${newestMarket.conditionId}`}
        top={55}
        conditionId={newestMarket.conditionId}
      />
    </ErrorBoundary>
  );
};
