import { SOCIAL_LINK } from '@idriss-xyz/constants';
import { IconButton } from '@idriss-xyz/ui/icon-button';
import { classes } from '@idriss-xyz/ui/utils';

type Properties = {
  className?: string;
};

export const Socials = ({ className }: Properties) => {
  return (
    <div
      className={classes(
        'grid grid-cols-3 justify-between gap-y-3 [&>:nth-child(3n+1)]:justify-self-start [&>:nth-child(3n+2)]:justify-self-center [&>:nth-child(3n+3)]:justify-self-end',
        className,
      )}
    >
      <IconButton
        iconName="TwitterX"
        intent="tertiary"
        size="large"
        onClick={() => {
          // TODO: we need to create isomorphic button component so it will be as="a" href={...}
          window.open(SOCIAL_LINK.X, '_blank');
        }}
      />
      <IconButton
        iconName="Farcaster"
        intent="tertiary"
        size="large"
        onClick={() => {
          // TODO: we need to create isomorphic button component so it will be as="a" href={...}
          window.open(SOCIAL_LINK.WARPCAST, '_blank');
        }}
      />

      <IconButton
        iconName="Discord"
        intent="tertiary"
        size="large"
        onClick={() => {
          // TODO: we need to create isomorphic button component so it will be as="a" href={...}
          window.open(SOCIAL_LINK.DISCORD, '_blank');
        }}
      />

      <IconButton
        iconName="Instagram"
        intent="tertiary"
        size="large"
        onClick={() => {
          // TODO: we need to create isomorphic button component so it will be as="a" href={...}
          window.open(SOCIAL_LINK.INSTAGRAM, '_blank');
        }}
      />
      <IconButton
        iconName="Tiktok"
        intent="tertiary"
        size="large"
        onClick={() => {
          // TODO: we need to create isomorphic button component so it will be as="a" href={...}
          window.open(SOCIAL_LINK.TIKTOK, '_blank');
        }}
      />

      <IconButton
        iconName="Youtube"
        intent="tertiary"
        size="large"
        onClick={() => {
          // TODO: we need to create isomorphic button component so it will be as="a" href={...}
          window.open(SOCIAL_LINK.YOUTUBE, '_blank');
        }}
      />
    </div>
  );
};
