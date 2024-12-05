import { ForwardedRef, forwardRef } from 'react';

import { classes } from '../../utils';

import { SelectOptionProperties } from './select.types';

export const SelectOption = forwardRef(
  (
    { option, className }: SelectOptionProperties<unknown>,
    reference: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={reference}
        className={classes(
          'flex w-full cursor-pointer items-center space-x-2 border-none border-r border-r-neutral-200 px-3 py-2 text-left',
          'hover:bg-black/10 focus:bg-black/50',
          className,
        )}
      >
       <div className='relative pr-2 mr-1 after:absolute after:right-0 after:-top-1.5 after:bg-gray-200 after:w-px after:h-[calc(2.625rem_-_6px)]'>
         {option.prefix}
       </div>
        <div className="whitespace-nowrap text-neutralGreen-900">
          {option.label}
        </div>
        {option.suffix}
      </div>
    );
  },
);

SelectOption.displayName = 'SelectOption';
