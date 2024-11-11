'use client';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { classes } from '@idriss-xyz/ui/utils';

import { ProductSection } from './product-section';
import { ExtensionSectionData } from './extension-section';
import { CreatorsSectionData } from './creators-section';
import { PredictionMarketsSectionData } from './prediction-markets-section';

type Properties = {
  className?: string;
};

type AnimatedCoin = {
  images: string[];
  direction: 'forward' | 'backward';
  animated: true;
};

type StaticCoin = {
  image: string | undefined;
  animated: false;
};

const numberOfSections = 3;

const CREATORS_TO_PREDICTION_MARKETS_BASE_NAME = `creators-to-prediciton-markets-circle/IDRISS_CIRCLE_`;
const CREATORS_TO_PREDICTION_MARKETS_START_INDEX = 96;
const creatorsToPredictionMarketsImages = Array.from(Array(55).keys()).map(
  (_, index) =>
    `${CREATORS_TO_PREDICTION_MARKETS_BASE_NAME}${(index + CREATORS_TO_PREDICTION_MARKETS_START_INDEX).toString().padStart(4, '0')}.png`,
);

const EXTENSION_TO_CREATORS_BASE_NAME = `extension-to-creators-circle/IDRISS_CIRCLE_`;
const EXTENSION_TO_CREATORS_START_INDEX = 38;
const extensionToCreatorsImages = Array.from(Array(58).keys()).map(
  (_, index) =>
    `${EXTENSION_TO_CREATORS_BASE_NAME}${(index + EXTENSION_TO_CREATORS_START_INDEX).toString().padStart(4, '0')}.png`,
);

const EXTENSION_TO_PREDICTION_MARKETS_BASE_NAME = `extension-to-prediction-markets-circle/IDRISS_CIRCLE_`;
const EXTENSION_TO_PREDICTION_MARKETS_START_INDEX = 38;
const extensionToPredictionMarketsImages = Array.from(Array(114).keys()).map(
  (_, index) =>
    `${EXTENSION_TO_PREDICTION_MARKETS_BASE_NAME}${(index + EXTENSION_TO_PREDICTION_MARKETS_START_INDEX).toString().padStart(4, '0')}.png`,
);

export const DesktopProductsSection = ({ className }: Properties) => {
  const containerReference = useRef<HTMLDivElement>(null);
  const topOfContainerReference = useRef<HTMLDivElement>(null);
  const firstSectionAnchorReference = useRef<HTMLDivElement>(null);
  const [padding, setPadding] = useState(40);
  const [borderRadius, setBorderRadius] = useState(40);
  const [isTopOfContainerFullyVisible, setIsTopOfContainerFullyVisible] =
    useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);

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

  const coinAnimation = useMemo(() => {
    if (currentSectionIndex === 0 && debouncedCurrentSectionIndex === 1) {
      return {
        images: extensionToCreatorsImages,
        direction: 'forward',
        animated: true,
      } as AnimatedCoin;
    }

    if (currentSectionIndex === 0 && debouncedCurrentSectionIndex === 2) {
      return {
        images: extensionToPredictionMarketsImages,
        direction: 'forward',
        animated: true,
      } as AnimatedCoin;
    }

    if (currentSectionIndex === 1 && debouncedCurrentSectionIndex === 2) {
      return {
        images: creatorsToPredictionMarketsImages,
        direction: 'forward',
        animated: true,
      } as AnimatedCoin;
    }

    if (currentSectionIndex === 1 && debouncedCurrentSectionIndex === 0) {
      return {
        images: extensionToCreatorsImages,
        direction: 'backward',
        animated: true,
      } as AnimatedCoin;
    }

    if (currentSectionIndex === 2 && debouncedCurrentSectionIndex === 1) {
      return {
        images: creatorsToPredictionMarketsImages,
        direction: 'backward',
        animated: true,
      } as AnimatedCoin;
    }

    if (currentSectionIndex === 2 && debouncedCurrentSectionIndex === 0) {
      return {
        images: extensionToPredictionMarketsImages,
        direction: 'backward',
        animated: true,
      } as AnimatedCoin;
    }

    if (currentSectionIndex === debouncedCurrentSectionIndex) {
      switch (currentSectionIndex) {
        case 0:
          return { image: extensionToCreatorsImages[0], animated: false } as StaticCoin;
        case 1:
          return {
            image: creatorsToPredictionMarketsImages[0],
            animated: false,
          } as StaticCoin; 
        case 2:
          return {
            image: creatorsToPredictionMarketsImages.at(-1),
            animated: false,
          } as StaticCoin;
      }
    }
    return { image: extensionToCreatorsImages[0], animated: false } as StaticCoin;
  }, [currentSectionIndex, debouncedCurrentSectionIndex]);

  const selectedSectionData = useMemo(() => {
    return sectionsData[debouncedCurrentSectionIndex] ?? ExtensionSectionData;
  }, [debouncedCurrentSectionIndex, sectionsData]);

  useEffect(() => {
    const topOfContainerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsTopOfContainerFullyVisible(entry?.intersectionRatio === 1);
      },
      { threshold: 1 },
    );

    const containerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsContainerVisible((entry?.intersectionRatio ?? 0) > 0.25);
      },
      {
        threshold: Array.from({ length: 101 }, (_, index) => {
          return index / 100;
        }),
      },
    );

    const paddingObserver = new IntersectionObserver(
      ([entry]) => {
        //if we navigate to the anchor the top container is skipped so we need to set padding 0 manually
        if (!isTopOfContainerFullyVisible && isContainerVisible) {
          setPadding(0);
          setBorderRadius(0);
          return;
        }

        if (isTopOfContainerFullyVisible) {
          const intersectionRatio = entry?.intersectionRatio ?? 0;

          if (intersectionRatio <= 0.5) {
            // When intersection is 0-50%, padding and radius stays at 40px
            setPadding(40);
            setBorderRadius(40);
          } else {
            // Map intersection ratio from 0.5-1 to 50-0 for padding and 40-0 for radius
            const calculatedValue = Math.round(
              40 * (2 - 2 * intersectionRatio),
            );
            setPadding(calculatedValue > 5 ? calculatedValue : 0);
            setBorderRadius(calculatedValue > 5 ? calculatedValue : 0);
          }
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, index) => {
          return index / 100;
        }),
      },
    );

    if (containerReference.current) {
      containerObserver.observe(containerReference.current);
    }
    if (topOfContainerReference.current) {
      topOfContainerObserver.observe(topOfContainerReference.current);
    }
    if (firstSectionAnchorReference.current) {
      paddingObserver.observe(firstSectionAnchorReference.current);
    }

    return () => {
      containerObserver.disconnect();
      topOfContainerObserver.disconnect();
      paddingObserver.disconnect();
    };
  }, [isTopOfContainerFullyVisible, isContainerVisible]);

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
    <section>
      <div ref={topOfContainerReference} className="h-px w-full" />
      <div
        className={classes('relative flex bg-mint-100', className)}
        ref={containerReference}
      >
        <div
          style={{ padding: `${padding / 2}px ${padding}px` }}
          className="sticky left-0 top-0 z-[99999] h-screen w-screen transition-[padding] duration-150 will-change-[padding]"
        >
          <ProductSection
            style={{ borderRadius: `${borderRadius}px` }}
            actions={selectedSectionData.actions}
            activeOptionKey={selectedSectionData.defaultOptionKey}
            description={selectedSectionData.info.description}
            title={selectedSectionData.info.title}
            features={selectedSectionData.info.features}
            tabsAsLinks
            fadeOut={currentSectionIndex !== debouncedCurrentSectionIndex}
            animationConfig={coinAnimation}
          />
        </div>
        <div className="w-[0.5px]">
          <div
            ref={firstSectionAnchorReference}
            id="extension-product"
            className="my-10 h-screen"
          />
          <div id="creators-product" className="h-screen" />
          <div id="prediction-markets-product" className="h-screen" />
        </div>
      </div>
    </section>
  );
};
