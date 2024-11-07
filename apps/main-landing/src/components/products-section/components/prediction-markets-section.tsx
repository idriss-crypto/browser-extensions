'use client';
import { Button } from '@idriss-xyz/ui/button';
import { ProductSection } from './product-section';
import { PREDICTION_MARKETS_INFO } from '../constants';

export const PredictionMarketsSection = () => {
  return (
    <ProductSection
      actions={
        <>
          <input
            className="flex h-11 w-[290px] flex-[1_0_0] items-center gap-[2px] rounded-md border border-neutral-200 bg-white p-[8px_12px]"
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
      defaultOption="Prediction Market"
      description={PREDICTION_MARKETS_INFO.describtion}
      title={PREDICTION_MARKETS_INFO.title}
      features={PREDICTION_MARKETS_INFO.features}
      onOptionChange={() => {}}
      readOnly={false}
    />
  );
};
