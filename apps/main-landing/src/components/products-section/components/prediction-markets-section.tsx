'use client';
import { Button } from '@idriss-xyz/ui/button';
import { ProductSection } from './product-section';
import { PREDICTION_MARKETS_INFO } from '../constants';
import { TabOption } from '../types';

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
      actions={
        <>
          <input
            className="flex h-12 w-[290px] flex-[1_0_0] items-center rounded-[12px] border px-3 py-2 shadow-[0_0_0_4px_rgba(242,242,242,0.14)]"
            placeholder="Your email"
          />
          <Button
            intent="secondary"
            size="medium"
            className="text-button2 lg:text-button1"
            asLink
            href="https://chromewebstore.google.com/detail/idriss/fghhpjoffbgecjikiipbkpdakfmkbmig"
            target="_blank"
            rel="noopener noreferrer"
          >
            GET EARLY ACCESS
          </Button>
        </>
      }
      defaultOptionKey="prediction-markets-product"
      description={PREDICTION_MARKETS_INFO.describtion}
      title={PREDICTION_MARKETS_INFO.title}
      features={PREDICTION_MARKETS_INFO.features}
      onOptionChange={onOptionChange}
      readOnly={false}
    />
  );
};
