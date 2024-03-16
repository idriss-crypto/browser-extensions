import { classes } from 'shared/ui/utils';

import { InputBaseLabelProperties } from './input-base.types';

export const InputBaseLabel = ({
  label,
  className,
}: InputBaseLabelProperties) => {
  return (
    <span
      className={classes(
        'text-sm font-semibold leading-tight text-gray-300',
        className,
      )}
    >
      {label}
    </span>
  );
};
