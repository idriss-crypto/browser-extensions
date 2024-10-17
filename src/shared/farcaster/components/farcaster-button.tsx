import { ReactNode } from 'react';

import { Button, classes } from 'shared/ui';

type Properties = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const FarcasterButton = ({
  children,
  onClick,
  className,
}: Properties) => {
  return (
    <Button
      onClick={onClick}
      className={classes('bg-farcaster-primary', className)}
    >
      {children}
    </Button>
  );
};
