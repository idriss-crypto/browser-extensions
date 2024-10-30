import {
  AavegotchiLogo,
  AcrossLogo,
  AgoraFullLogo,
  GitcoinLogo,
  ParallelLogo,
  PolymarketLogo,
  SnapshotFullLogo,
  TallyLogo,
} from '@idriss-xyz/ui/branding-assets';
import { Marquee } from '@idriss-xyz/ui/marquee';
import { classes } from '@idriss-xyz/ui/utils';

type CollaborationsShowcaseProperties = {
  className?: string;
};

export const CollaborationsShowcase = ({
  className,
}: CollaborationsShowcaseProperties) => {
  const logoClassName = 'mx-2.5 h-5.5 w-fit text-neutralGreen-500 lg:h-10';
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
      <Marquee>
        <ParallelLogo className={logoClassName} />
        <AcrossLogo className={logoClassName} />
        <PolymarketLogo className={logoClassName} />
        <GitcoinLogo className={logoClassName} />
        <AavegotchiLogo className={logoClassName} />
        <TallyLogo className={logoClassName} />
        <AgoraFullLogo className={logoClassName} />
        <SnapshotFullLogo className={logoClassName} />
      </Marquee>
    </div>
  );
};
