import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu';

import { classes } from '../../../utils';
import { Icon } from '../../icon';
import { MultiselectOption } from '../types';

type Properties<T> = HTMLAttributes<HTMLDivElement> &
  DropdownMenuTriggerProps & {
    selectedOptions: MultiselectOption<T>[];
    trimDisplayedOptions?: number;
    placeholder?: string;
    showOptionIconOnly?: boolean;
    className?: string;
    label?: string;
    renderLabel?: () => ReactNode;
  };

const _MultiselectInput = <T,>(
  properties: Properties<T>,
  reference: React.Ref<HTMLDivElement>,
) => {
  const {
    selectedOptions,
    trimDisplayedOptions,
    placeholder,
    showOptionIconOnly,
    className,
    onClick,
    onKeyDown,
    renderLabel,
    label,
    ...rest
  } = properties;

  const displayedOptions = trimDisplayedOptions
    ? selectedOptions.slice(0, trimDisplayedOptions)
    : selectedOptions;

  return (
    <div
      role="button"
      tabIndex={0}
      ref={reference}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...rest}
      className={classes(
        'flex flex-row items-center justify-between rounded-xl border border-neutral-200 bg-white px-3 py-2 text-neutralGreen-900 shadow-xs ring-1 ring-[#D1D5DB] focus:outline-none focus:ring-indigo-500',
        className,
      )}
    >
      {renderLabel ? (
        renderLabel()
      ) : label ? (
        <p className="mb-2 text-label5 text-neutral-700 lg:text-label4">
          {label}
        </p>
      ) : null}
      {displayedOptions.length === 0 ? (
        <div className="w-full">
          <span className="text-body4 text-neutral-700">{placeholder}</span>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-1">
          {displayedOptions.map((option) => {return (
            <div
              key={String(option.value)}
              className={classes('flex size-6 items-center justify-center')}
            >
              {!showOptionIconOnly && option.label}
              {option.icon && <div>{option.icon}</div>}
            </div>
          )})}
          {trimDisplayedOptions &&
            selectedOptions.length > trimDisplayedOptions && (
              <div className="text-body4 text-neutral-900">
                {`+ ${selectedOptions.length - trimDisplayedOptions} more`}
              </div>
            )}
        </div>
      )}
      <Icon name="ExpandUpDown" size={12} className="" />
    </div>
  );
};

_MultiselectInput.displayName = 'MultiselectInput';

// export default forwardRef(MultiselectInput);
export const MultiselectInput = forwardRef(_MultiselectInput);
