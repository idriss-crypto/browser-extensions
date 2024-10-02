import { ErrorBoundary } from 'shared/observability';
import { MarketWidgetContainer, NewestMarketWidget } from 'application/polymarket';
import { useExtensionSettings } from 'shared/extension';

import { usePolymarketMarkets } from '../hooks';

export const PolymarketMarkets = () => {
  const markets = usePolymarketMarkets();
  const { extensionSettings } = useExtensionSettings();

  if (!extensionSettings['polymarket-enabled']) {
    return null;
  }

  return (
    <ErrorBoundary>
      <NewestMarketWidget />
      {markets.map((market) => {
        return (
          <MarketWidgetContainer
            key={`${market.top}-${market.conditionId}`}
            top={market.top}
            conditionId={market.conditionId}
          />
        );
      })}
    </ErrorBoundary>
  );
};
