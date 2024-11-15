import { classes } from '../../../utils';
import { Option } from '../types';
import { forwardRef, HTMLAttributes } from 'react';
import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';
import { Icon } from '../../icon';

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
          'flex flex-row items-center justify-between rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutralGreen-900 shadow-xs ring-1 ring-[#D1D5DB] focus:outline-none focus:ring-indigo-500',
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

        <Icon name="ExpandUpDown" size={12} className="" />
      </div>
    );
  },
);

MultiselectInput.displayName = 'MultiselectInput';
