import { useLayoutEffect, useRef, useState } from 'react';
import { ExtensionSection } from './components/extension-section';
import { CreatorsSection } from './components/creators-section';
import { PredictionMarketsSection } from './components/prediction-markets-section';

export const ProductsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const numberOfSections = 3;

  const scrollToNextSection = () => {
    if (!containerRef.current) {
      return;
    }

    const offsetTop = containerRef.current.offsetTop;
    const viewportHeight = window.innerHeight;

    const targetScrollPosition =
      offsetTop + (currentSectionIndex + 1) * viewportHeight;

    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'instant',
    });
  };

  const scrollToPrevSection = () => {
    if (!containerRef.current) {
      return;
    }

    const offsetTop = containerRef.current.offsetTop;
    const viewportHeight = window.innerHeight;

    const targetScrollPosition =
      offsetTop + (currentSectionIndex - 1) * viewportHeight;

    window.scrollTo({
      top: targetScrollPosition,
      behavior: 'instant',
    });
  };

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

  const sections = [
    <ExtensionSection onOptionChange={() => scrollToNextSection()} />,
    <CreatorsSection
      onOptionChange={(option) =>
        option === 'Extension' ? scrollToPrevSection() : scrollToNextSection()
      }
    />,
    <PredictionMarketsSection onOptionChange={() => scrollToPrevSection()} />,
  ];

  return (
    <div className="relative flex bg-neutral-700" ref={containerRef}>
      <div className="sticky left-0 top-0 z-[99999] h-screen w-[calc(100vw-0.01px)]">
        {sections[currentSectionIndex]}
      </div>
      <div className="w-[0.01px]">
        <div id="products-section1" className="h-screen bg-lime-700" />
        <div id="products-section2" className="h-screen bg-midnightGreen-500" />
        <div id="products-section3" className="h-screen bg-indigo-500" />
      </div>
    </div>
  );
};
