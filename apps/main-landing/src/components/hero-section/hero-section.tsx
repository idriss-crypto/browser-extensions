import { Button } from '@idriss-xyz/ui/button';
import Image from 'next/image';

import { ImageSequencer } from '../image-sequencer';

import { backgroundLines } from '@/assets';
import { INTERNAL_LINK } from '@/constants';

import { CollaborationsShowcase } from './components';
import { backgroundLines } from './assets';

const BASE_NAME = `hero-tokens-flow/IDRISS_HERO_FIXED_`;
const images = [...Array.from({ length: 45 }).keys()].map((_, index) => {
  return `${BASE_NAME}${index.toString().padStart(4, '0')}.png`;
});

export const HeroSection = () => {
  return (
    <header className="relative flex w-full flex-col items-center overflow-hidden bg-[radial-gradient(111.94%_122.93%_at_16.62%_0%,_#E7F5E7_0%,_#76C282_100%)] pb-[60px] pt-[104px] lg:bg-[radial-gradient(222.94%_366.93%_at_16.62%_20%,_#E7F5E7_0%,_#76C282_100%)] lg:pb-[120px] lg:pt-[200px]">
      <Image
        priority
        src={backgroundLines}
        className="pointer-events-none absolute top-0 hidden opacity-40 lg:block"
        alt=""
      />
      <h1 className="container z-1 my-0 text-balance text-center text-display4 font-normal gradient-text lg:text-display1">
        APPS UNIQUELY ENABLED BY CRYPTO AND AI
      </h1>
      <Button
        aria-label="Get started"
        intent="primary"
        size="large"
        className="z-1 my-9 lg:mb-0 lg:mt-9"
        suffixIconName="IdrissArrowRight"
        asLink
        href={INTERNAL_LINK.SUPERPOWERS}
      >
        EXPLORE
      </Button>
      <ImageSequencer
        images={images}
        className="pointer-events-none z-0 mt-[-22%] w-full min-w-[500px]"
      />
      <CollaborationsShowcase className="container mt-9 text-center lg:my-20" />
    </header>
  );
};
