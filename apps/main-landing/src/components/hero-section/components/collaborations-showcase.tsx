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
    <div>
      <span className="text-button1 font-medium uppercase">
        Worked with top crypto projects
      </span>
      <div>
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
