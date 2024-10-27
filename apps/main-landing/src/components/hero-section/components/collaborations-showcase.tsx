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
    <div className='flex flex-col gap-4 lg:gap-8 items-center justify-center z-1'>
      <span className="text-button1 font-medium uppercase text-neutralGreen-500">
        Worked with top crypto projects
      </span>
      <div className='flex gap-10 h-5.5 lg:h-10 items-center'>
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
