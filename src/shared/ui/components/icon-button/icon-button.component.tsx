import { classes } from 'shared/ui/utils';

import { Icon } from '../icon';

import { IconButtonProperties } from './icon-button.types';

export const IconButton = ({
  onClick,
  className,
  testId,
  ariaLabel,
  iconProps,
  type = 'button',
  disabled = false,
}: IconButtonProperties) => {
  const size = iconProps.size ?? 20;

  return (
    <button
      className={classes(
        'rounded bg-zinc-600 p-1',
        !disabled && 'hover:bg-zinc-500 active:bg-zinc-400',
        disabled && 'bg-zinc-300 text-zinc-500',
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-testid={testId}
      aria-label={ariaLabel}
    >
      <Icon {...iconProps} size={size - 4} />
    </button>
  );
};
