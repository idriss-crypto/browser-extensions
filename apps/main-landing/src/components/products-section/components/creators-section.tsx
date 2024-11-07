'use client';
import { Button } from '@idriss-xyz/ui/button';
import { ProductSection } from './product-section';
import { CREATORS_INFO } from '../constants';

type Properties = {
  onOptionChange: (option: string) => void
}

export const CreatorsSection = ({onOptionChange}: Properties) => {
  return (
    <ProductSection
      actions={
        <Button
          intent="secondary"
          size="large"
          className="text-button2 lg:text-button1"
          asLink
          href="https://chromewebstore.google.com/detail/idriss/fghhpjoffbgecjikiipbkpdakfmkbmig"
          target="_blank"
          rel="noopener noreferrer"
        >
          CREATE DONATION LINK
        </Button>
      }
      defaultOption="Creators"
      description={CREATORS_INFO.describtion}
      title={CREATORS_INFO.title}
      features={CREATORS_INFO.features}
      onOptionChange={onOptionChange}
      readOnly={false}
    />
  );
};
