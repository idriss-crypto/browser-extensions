import { useAvailability, useTwitterMarkets } from '../../hooks';
import { MarketWidget } from '../market';

// TODO: widget generic component with padding, placement and shadow?
export const Container = () => {
  const marketsQuery = useTwitterMarkets();
  const availabilityQuery = useAvailability();

  return marketsQuery.data?.map((market) => {
    return (
      <MarketWidget
        key={`${market.top}-${market.conditionId}`}
        top={market.top}
        // conditionId={market.conditionId}
        conditionId="0x5338d1de000b91193e3ea4a066bef50d73c77d0d4ace294e474a236599608dc3"
        isAvailable={availabilityQuery.data ?? true}
      />
    );
  });
};
