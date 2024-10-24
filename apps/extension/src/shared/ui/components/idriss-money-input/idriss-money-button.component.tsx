import { classes } from '../../utils';

import { IdrissMoneyButtonProperties } from './idriss-money-input.types';

export const IdrissMoneyButton = ({
  children,
  onClick,
  isActive,
  className,
}: IdrissMoneyButtonProperties) => {
  return (
    <button
      className={classes(
        'hover:bg-idriss-primary-400 flex items-center justify-center rounded-md bg-green-100 px-4 py-2 text-base font-medium shadow-sm',
        isActive && 'bg-idriss-primary-400',
        className,
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
