import { classes } from '../../../utils';
import { Option } from '../types';
import { forwardRef, HTMLAttributes } from 'react';
import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';

type Properties = HTMLAttributes<HTMLDivElement> &
  DropdownMenuTriggerProps & {
    selectedOptions: Option[];
    trimDisplayedOptions?: number;
    placeholder?: string;
    showOptionIconOnly?: boolean;
    className?: string;
  };

export const MultiselectInput = forwardRef<HTMLDivElement, Properties>(
  (
    {
      selectedOptions,
      trimDisplayedOptions,
      placeholder,
      showOptionIconOnly,
      className,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const displayedOptions = trimDisplayedOptions
      ? selectedOptions.slice(0, trimDisplayedOptions)
      : selectedOptions;

    return (
      <div
        role="button"
        tabIndex={0}
        ref={ref}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...props}
        className={classes(
          'py-2 px-3 w-full rounded-xl bg-white text-neutralGreen-900 border border-neutral-200 shadow-xs ring-1 ring-[#D1D5DB] focus:outline-none focus:ring-indigo-500',
          className,
        )}
      >
        {displayedOptions.length === 0 ? (
          <div className="w-full">
            <span className="text-body4 text-neutral-700">{placeholder}</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-1">
            {displayedOptions.map((option) => {
              return (
                <div
                  key={option.value}
                  className={classes('flex size-6 items-center justify-center')}
                >
                  {!showOptionIconOnly && option?.label}
                  <div>{option?.icon && option.icon}</div>
                </div>
              );
            })}
            {trimDisplayedOptions &&
              selectedOptions.length > trimDisplayedOptions && (
                <div className={'text-body4 text-neutral-900'}>
                  {`+ ${selectedOptions.length - trimDisplayedOptions} more`}
                </div>
              )}
          </div>
        )}
      </div>
    );
  },
);

MultiselectInput.displayName = 'MultiselectInput';
