import { forwardRef } from 'react';

import { Button, ButtonProperties } from 'shared/ui/components';
import { classes } from 'shared/ui/utils';

export const SuccessButton = forwardRef<
  HTMLButtonElement,
  Pick<ButtonProperties, 'className'>
>(({ className }, reference) => {
  return (
    <Button
      ref={reference}
      className={classes(
        'relative w-full rounded-lg bg-[#27AE60] text-white',
        'disabled:bg-[#27AE60] disabled:text-white',
        className,
      )}
      disabled
    >
      Success
    </Button>
  );
});

SuccessButton.displayName = 'SuccessButton';
