import { forwardRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { classes } from '../../utils';

import { CheckboxProperties } from './checkbox.types';
import { CheckboxLabel } from './checkbox-label.component';

const Base = forwardRef<HTMLButtonElement, CheckboxProperties>(
  (
    {
      indicator,
      label,
      disabled,
      value,
      className,
      wrapperClassName,
      title,
      onChange,
    },
    reference,
  ) => {
    return (
      <label className={classes('flex items-center', wrapperClassName)}>
        <RadixCheckbox.Root
          ref={reference}
          title={title}
          className={classes(
            'bg-gray-100 hover:bg-gray-200 flex size-[22px] appearance-none items-center justify-center rounded-[4px] shadow-[0_0_0_1px_black] outline-none focus:shadow-[0_0_0_1px_gray]',
            'disabled:cursor-not-allowed disabled:opacity-60 disabled:brightness-90 disabled:grayscale',
            label && 'mr-2',
            className,
          )}
          disabled={disabled}
          checked={value}
          onCheckedChange={onChange}
        >
          <RadixCheckbox.Indicator
            className="text-green-500 flex items-center"
            forceMount={indicator ? true : undefined}
          >
            {indicator ?? <CheckIcon />}
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label}
      </label>
    );
  },
);

Base.displayName = 'Checkbox';

export const Checkbox = Object.assign(Base, {
  Label: CheckboxLabel,
  displayName: 'Checkbox',
});
