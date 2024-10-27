import {
  AavegotchiLogo,
  AcrossLogo,
  GitcoinLogo,
  ParallelLogo,
  PolymarketLogo,
  TallyLogo,
} from '@idriss-xyz/ui';

export const CollaborationsShowcase = () => {
  return (
    <div className="z-1 flex flex-col items-center justify-center gap-4 lg:my-20 lg:gap-8">
      <span className="text-button1 font-medium uppercase text-neutralGreen-500">
        Worked with top crypto projects
      </span>
      <div className="flex h-5.5 items-center gap-10 lg:h-10">
        <ParallelLogo />
        <AcrossLogo />
        <PolymarketLogo />
        <GitcoinLogo />
        <AavegotchiLogo />
        <TallyLogo />
      </div>
    </div>
  );
};
