import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef } from 'react';

import { CheckIcon } from './assets';

type Properties = {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const Base = forwardRef<HTMLButtonElement, Properties>(
  ({ label, value, onChange }, reference) => {
    return (
      <form>
        <div className="flex items-center">
          <RadixCheckbox.Root
            ref={reference}
            className="flex size-5 appearance-none items-center justify-center rounded border-2 border-neutral-400 hover:border-mint-500 focus:border-mint-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:border-mint-600 disabled:border-neutral-200 data-[state=checked]:border-none data-[state=checked]:bg-mint-400"
            checked={value}
            onCheckedChange={onChange}
            id="_checkbox"
          >
            <RadixCheckbox.Indicator className="text-mint-900">
              <CheckIcon />
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>
          {label && (
            <label
              className="pl-2 text-body5 text-neutralGreen-900 disabled:text-neutral-500"
              htmlFor="_checkbox"
            >
              {label}
            </label>
          )}
        </div>
      </form>
    );
  },
);

export const Checkbox = Object.assign(Base, {
  displayName: 'Checkbox',
});
