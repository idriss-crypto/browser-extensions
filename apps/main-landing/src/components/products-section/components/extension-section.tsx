'use client';
import { Button } from '@idriss-xyz/ui/button';
import { ProductSection } from './product-section';
import { BROWSER_EXTENSION_INFO } from '../constants';
import { TabOption } from '../types';

type Properties = {
  onOptionChange: (option: TabOption) => void;
  className?: string;
  fadeOut: boolean;
};

export const ExtensionSection = ({
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
          <Button
            intent="secondary"
            size="large"
            className="text-button2 lg:text-button1"
            asLink
            href="https://chromewebstore.google.com/detail/idriss/fghhpjoffbgecjikiipbkpdakfmkbmig"
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD EXTENSION
          </Button>
          <Button
            intent="tertiary"
            size="large"
            className="pl-[28px] text-button2 text-[#E2E2E2] lg:text-button1"
            asLink
            href="https://docs.idriss.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LEARN MORE
          </Button>
        </>
      }
      defaultOptionKey="extension-product"
      description={BROWSER_EXTENSION_INFO.describtion}
      title={BROWSER_EXTENSION_INFO.title}
      features={BROWSER_EXTENSION_INFO.features}
      onOptionChange={onOptionChange}
      readOnly={false}
    />
  );
};
