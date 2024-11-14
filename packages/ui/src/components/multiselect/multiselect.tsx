import React, { ReactElement, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, XIcon } from 'lucide-react';
import { classes } from '../../utils';

interface Option {
  label: string;
  value: string;
  icon?: ReactElement;
}

interface MultiselectProps {
  options: Option[];
  value: string[];
  onValueChange: (newValue: string[]) => void;
  placeholder?: string;
  maxCount?: number;
  className?: string;
}

export const Multiselect: React.FC<MultiselectProps> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select options',
  maxCount = 3,
  className,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((val) => val !== option)
      : [...selectedValues, option];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const toggleAll = () => {
    if (selectedValues.length === options.length) {
      handleClear();
    } else {
      const allValues = options.map((option) => option.value);
      setSelectedValues(allValues);
      onValueChange(allValues);
    }
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger
        className={classes(
          'bg-inherit hover:bg-inherit flex h-auto min-h-10 w-full items-center justify-between rounded-md border p-1',
          className,
        )}
      >
        {selectedValues.length > 0 ? (
          <div className="flex flex-wrap items-center">
            {selectedValues.slice(0, maxCount).map((value) => {
              const option = options.find((o) => o.value === value);
              return (
                <div
                  key={value}
                  className={classes(
                    'm-1 flex items-center gap-1 rounded-md px-2 py-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110',
                    'border-foreground/10 text-foreground bg-card hover:bg-card/80',
                  )}
                >
                  <div className="mr-2 h-4 w-4">
                    {option?.icon && option.icon}
                  </div>
                  {option?.label}
                  <Checkbox.Root
                    className="ml-2 h-4 w-4 cursor-pointer"
                    checked={true}
                    onCheckedChange={() => toggleOption(value)}
                  >
                    <Checkbox.Indicator className="text-foreground flex items-center justify-center">
                      <XIcon className="h-4 w-4" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </div>
              );
            })}
            {selectedValues.length > maxCount && (
              <div
                className={classes(
                  'm-1 rounded-md px-2 py-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110',
                  'text-foreground border-foreground/1 bg-transparent hover:bg-transparent',
                )}
              >
                {`+ ${selectedValues.length - maxCount} more`}
                <Checkbox.Root
                  className="ml-2 h-4 w-4 cursor-pointer"
                  checked={true}
                  onCheckedChange={() => clearExtraOptions()}
                >
                  <Checkbox.Indicator className="text-foreground flex items-center justify-center">
                    <XIcon className="h-4 w-4" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto flex w-full items-center justify-between">
            <span className="text-muted-foreground mx-3 text-sm">
              {placeholder}
            </span>
          </div>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-card border-foreground/10 w-auto rounded-md border p-2 shadow-lg"
          alignOffset={-8}
        >
          <DropdownMenu.Item
            className="hover:bg-card/50 flex cursor-pointer items-center rounded-md px-3 py-2"
            onSelect={(event) => {
              event.preventDefault();
              toggleAll();
            }}
          >
            <Checkbox.Root
              className={classes(
                'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                selectedValues.length === options.length
                  ? 'bg-primary text-primary-foreground'
                  : 'opacity-50 [&_svg]:invisible',
              )}
              checked={selectedValues.length === options.length}
            >
              <Checkbox.Indicator className="text-primary flex items-center justify-center">
                <CheckIcon className="h-4 w-4" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span>(Select All)</span>
          </DropdownMenu.Item>
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <DropdownMenu.Item
                key={option.value}
                className="hover:bg-card/50 flex cursor-pointer items-center rounded-md px-3 py-2"
                onSelect={(event) => {
                  event.preventDefault();
                  toggleOption(option.value);
                }}
              >
                <Checkbox.Root
                  className={classes(
                    'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible',
                  )}
                  checked={isSelected}
                >
                  <Checkbox.Indicator className="text-primary flex items-center justify-center">
                    <CheckIcon className="h-4 w-4" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                {option.icon && (
                  <div className="text-muted-foreground mr-2 h-4 w-4">
                    {option.icon}
                  </div>
                )}
                <span>{option.label}</span>
              </DropdownMenu.Item>
            );
          })}
          {selectedValues.length > 0 && (
            <>
              <DropdownMenu.Separator className="my-2" />
              <DropdownMenu.Item
                className="hover:bg-card/50 flex cursor-pointer items-center justify-center rounded-md px-3 py-2"
                onSelect={(event) => {
                  event.preventDefault();
                  handleClear();
                }}
              >
                Clear
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
