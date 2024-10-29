import {
  AavegotchiLogo,
  AcrossLogo,
  GitcoinLogo,
  ParallelLogo,
  PolymarketLogo,
  TallyLogo,
} from '@idriss-xyz/ui/branding-assets';
import { classes } from '@idriss-xyz/ui/utils';

type CollaborationsShowcaseProperties = {
  className?: string;
};

export const CollaborationsShowcase = ({
  className,
}: CollaborationsShowcaseProperties) => {
  return (
    <div
      className={classes(
        'z-1 flex flex-col items-center justify-center gap-4 lg:gap-8',
        className,
      )}
    >
      <span className="text-button1 text-neutralGreen-500">
        WORKED WITH TOP CRYPTO PROJECTS
      </span>
      <div className="flex items-center gap-10 text-neutralGreen-500">
        <ParallelLogo className="h-5.5 w-fit lg:h-10" />
        <AcrossLogo className="h-5.5 w-fit lg:h-10" />
        <PolymarketLogo className="h-5.5 w-fit lg:h-10" />
        <GitcoinLogo className="h-5.5 w-fit lg:h-10" />
        <AavegotchiLogo className="h-5.5 w-fit lg:h-10" />
        <TallyLogo className="h-5.5 w-fit lg:h-10" />
      </div>
    </div>
  );
};
