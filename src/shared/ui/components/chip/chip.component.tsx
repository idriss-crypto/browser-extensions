import { classes } from 'shared/ui/utils';

import { ChipProperties } from './chip.types';

// TODO: compound component
export const Chip = ({ children, className, onClick }: ChipProperties) => {
  return (
    <div
      className={classes(
        'rounded-full px-3 py-1 text-xs',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
