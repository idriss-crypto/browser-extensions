import { forwardRef } from 'react';

import { classes } from 'shared/ui/utils';

import { Spinner } from '../spinner';

import { ButtonProperties } from './button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProperties>(
  (
    {
      children,
      className,
      onClick,
      spinnerClassName,
      title,
      type = 'button',
      loading = false,
      disabled = false,
    },
    reference,
  ) => {
    return (
      <button
        ref={reference}
        type={type}
        disabled={loading || disabled}
        onClick={onClick}
        className={classes('flex items-center justify-center', className)}
        title={title}
      >
        <span
          className={classes(
            'flex items-center justify-center',
            loading && 'invisible',
          )}
        >
          {children}
        </span>
        <Spinner
          className={classes(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            spinnerClassName,
            !loading && 'invisible',
          )}
        />
      </button>
    );
  },
);

Button.displayName = 'Button';
