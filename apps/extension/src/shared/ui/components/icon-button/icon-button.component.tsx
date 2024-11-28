import { Icon as IdrissIcon } from '@idriss-xyz/ui/icon';

import { classes } from '../../utils';
import { Icon } from '../icon';

import {
  IconButtonProperties,
  IdrissIconButtonProperties,
} from './icon-button.types';

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
        'flex rounded bg-white/10 p-1',
        'hover:enabled:bg-white/20 active:enabled:bg-white/40',
        'disabled:opacity-50',
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

export const IdrissIconButton = ({
  onClick,
  className,
  testId,
  ariaLabel,
  iconProps,
  type = 'button',
  disabled = false,
}: IdrissIconButtonProperties) => {
  const size = iconProps.size ?? 20;
  
  return (
    <button
      className={classes(
        'flex rounded bg-white/10 p-1',
        'hover:enabled:bg-white/20 active:enabled:bg-white/40',
        'disabled:opacity-50',
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-testid={testId}
      aria-label={ariaLabel}
    >
      <IdrissIcon {...iconProps} size={size - 4} />
    </button>
  );
};