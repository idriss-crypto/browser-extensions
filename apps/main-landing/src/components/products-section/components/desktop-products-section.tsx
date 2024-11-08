'use client'
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { classes } from '@idriss-xyz/ui/utils';

import { ProductSection } from './product-section';
import { ExtensionSectionData } from './extension-section';
import { CreatorsSectionData } from './creators-section';
import { PredictionMarketsSectionData } from './prediction-markets-section';

type Properties = {
  className?: string;
};

const numberOfSections = 3;

export const DesktopProductsSection = ({ className }: Properties) => {
  const containerReference = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [debouncedCurrentSectionIndex, setDebouncedCurrentSectionIndex] =
    useState(0);

  const [_] = useDebounce(
    () => {
      return setDebouncedCurrentSectionIndex(currentSectionIndex);
    },
    1000,
    [currentSectionIndex],
  );

  const sectionsData = useMemo(() => {
    return [
      ExtensionSectionData,
      CreatorsSectionData,
      PredictionMarketsSectionData,
    ];
  }, []);

  const selectedSectionData = useMemo(() => {
    return sectionsData[debouncedCurrentSectionIndex] ?? ExtensionSectionData;
  }, [debouncedCurrentSectionIndex]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!containerReference.current) {
        setCurrentSectionIndex(0);
        return;
      }

      const { top } = containerReference.current.getBoundingClientRect();
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

  return (
    <div
      className={classes('relative flex bg-neutral-700', className)}
      ref={containerReference}
    >
      <div className="sticky left-0 top-0 z-[99999] h-screen w-[calc(100vw-0.01px)]">
        <ProductSection
          actions={selectedSectionData.actions}
          activeOptionKey={selectedSectionData.defaultOptionKey}
          description={selectedSectionData.info.description}
          title={selectedSectionData.info.title}
          features={selectedSectionData.info.features}
          tabsAsLinks
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
