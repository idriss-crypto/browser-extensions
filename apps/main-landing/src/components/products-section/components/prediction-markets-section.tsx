'use client';
import { ProductSection } from './product-section';
import { PREDICTION_MARKETS_INFO } from '../constants';
import { TabOption } from '../types';
import { PredictionMarketsSectionActions } from './prediction-markets-section-actions';

type Properties = {
  onOptionChange: (option: TabOption) => void;
  className?: string;
  fadeOut: boolean;
};

export const PredictionMarketsSection = ({
  onOptionChange,
  className,
  fadeOut,
}: Properties) => {
  return (
    <ProductSection
      fadeOut={fadeOut}
      className={className}
      actions={<PredictionMarketsSectionActions />}
      activeOptionKey="prediction-markets-product"
      description={PREDICTION_MARKETS_INFO.describtion}
      title={PREDICTION_MARKETS_INFO.title}
      features={PREDICTION_MARKETS_INFO.features}
      onOptionChange={onOptionChange}
      readOnly={false}
    />
  );
};
