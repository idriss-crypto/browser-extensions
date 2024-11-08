import { useLayoutEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { ProductSection } from './components/product-section';
import { Button } from '@idriss-xyz/ui/button';
import {
  BROWSER_EXTENSION_INFO,
  CREATORS_INFO,
  PREDICTION_MARKETS_INFO,
} from './constants';
import { ExtensionSectionActions } from './components/extension-section-actions';
import { classes } from '@idriss-xyz/ui/utils';

type Properties = {
  className?: string;
};

export const DesktopProductsSection = ({ className }: Properties) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [debouncedCurrentSectionIndex, setDebouncedCurrentSectionIndex] =
    useState(0);
  const [_] = useDebounce(
    () => setDebouncedCurrentSectionIndex(currentSectionIndex),
    1000,
    [currentSectionIndex],
  );
  const numberOfSections = 3;

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        setCurrentSectionIndex(0);
        return;
      }

      const { top } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const amountAboveViewport = Math.max(0, -top);
      const normalizedPercentAbove =
        amountAboveViewport / viewportHeight / numberOfSections;

      const sectionId = Math.floor(
        Math.min(
          (normalizedPercentAbove * 100) / ((1 / (numberOfSections + 2)) * 100),
          numberOfSections - 1,
        ),
      );

      setCurrentSectionIndex(sectionId);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log('currentSectionIndex', currentSectionIndex);
  console.log('debouncedCurrentSectionIndex', debouncedCurrentSectionIndex);

  const sectionMeta = [
    {
      actions: <ExtensionSectionActions />,
      info: BROWSER_EXTENSION_INFO,
      defaultOptionKey: 'extension-product',
    },
    {
      actions: (
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
      ),
      info: CREATORS_INFO,
      defaultOptionKey: 'creators-product',
    },
    {
      actions: (
        <>
          <input
            className="flex h-12 w-full flex-[1_0_0] items-center rounded-[12px] border px-3 py-2 shadow-[0_0_0_4px_rgba(242,242,242,0.14)] lg:w-[290px]"
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
      ),
      info: PREDICTION_MARKETS_INFO,
      defaultOptionKey: 'prediction-markets-product',
    },
  ];

  const selectedSectionMeta =
    sectionMeta[debouncedCurrentSectionIndex] ?? sectionMeta[0];

  return (
    <div
      className={classes('relative flex bg-neutral-700', className)}
      ref={containerRef}
    >
      <div className="sticky left-0 top-0 z-[99999] h-screen w-[calc(100vw-0.01px)]">
        <ProductSection
          actions={selectedSectionMeta!.actions}
          activeOptionKey={selectedSectionMeta!.defaultOptionKey}
          description={selectedSectionMeta!.info.describtion}
          title={selectedSectionMeta!.info.title}
          features={selectedSectionMeta!.info.features}
          onOptionChange={() => {}}
          readOnly={false}
          fadeOut={currentSectionIndex !== debouncedCurrentSectionIndex}
        />
      </div>
      <div className="w-[0.01px] py-5">
        <div id="extension-product" className="h-screen bg-lime-700" />
        <div id="creators-product" className="h-screen bg-midnightGreen-500" />
        <div
          id="prediction-markets-product"
          className="h-screen bg-indigo-500"
        />
      </div>
    </div>
  );
};
