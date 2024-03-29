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
        'rounded bg-[#2c3f4f] p-1',
        !disabled && 'hover:bg-[#5f7282] active:bg-[#92a5b5]',
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
