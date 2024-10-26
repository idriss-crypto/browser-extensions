'use client';
import { Button } from '@idriss-xyz/ui';
import { BackgroundLines, Header, TokensFlowImage } from './components';
import { CollaborationsShowcase } from './components/collaborations-showcase';

export const HeroSection = () => {
  return (
    <header className="relative flex min-h-screen w-full flex-col items-center gap-9 overflow-hidden bg-[radial-gradient(222.94%_366.93%_at_16.62%_20%,_#E7F5E7_0%,_#76C282_100%)] pt-26 lg:pt-46">
      <BackgroundLines />
      <Header>Apps uniquely enabled by crypto and AI</Header>
      <Button intent="primary" size="large">
        EXPLORE →
      </Button>
      <TokensFlowImage />
      <CollaborationsShowcase />
    </header>
  );
};
