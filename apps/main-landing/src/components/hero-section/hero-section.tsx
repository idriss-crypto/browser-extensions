'use client';
import { Button } from '@idriss-xyz/ui';

import { BackgroundLines, TokensFlowImage, CollaborationsShowcase } from './components';

export const HeroSection = () => {
  return (
    <header className="relative flex min-h-screen w-full flex-col items-center gap-9 overflow-hidden bg-[radial-gradient(111.94%_122.93%_at_16.62%_0%,_#E7F5E7_0%,_#76C282_100%)] pt-26 lg:bg-[radial-gradient(222.94%_366.93%_at_16.62%_20%,_#E7F5E7_0%,_#76C282_100%)] lg:pt-50">
      <BackgroundLines />
      <h1 className="gradient-text">Apps uniquely enabled by crypto and AI</h1>
      <Button intent="primary" size="large" className="z-1">
        EXPLORE →
      </Button>
      <TokensFlowImage />
      <CollaborationsShowcase className='lg:my-20' />
    </header>
  );
};
