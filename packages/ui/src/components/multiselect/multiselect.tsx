import { ReactNode, useMemo } from 'react';

import { Dropdown } from '../dropdown';
import { classes } from '../../utils';

import { MultiselectOption } from './types';
import { MultiselectInputList, MultiselectInput } from './components';

type Properties<T> = {
  options: MultiselectOption<T>[];
  value: T[];
  onChange: (selectedValues: T[]) => void;
  placeholder?: string;
  maxCount?: number;
  inputClassName?: string;
  listClassName?: string;
  label?: string;
  renderLabel?: () => ReactNode;
};

export const Multiselect = <T,>({
  options,
  value,
  onChange: onChange,
  placeholder = 'Select options',
  maxCount = 10,
  inputClassName,
  listClassName,
}: Properties<T>) => {
  const selectedOptions = useMemo(() => {
    return options.filter((option) => {return value.includes(option.value)});
  }, [value, options]);

  const toggleOption = (optionValue: T) => {
    const newSelectedValues = value.includes(optionValue)
      ? value.filter((value_) => {return value_ !== optionValue})
      : [...value, optionValue];
    onChange(newSelectedValues);
  };

  return (
    <Dropdown
      className={classes('z-portal')}
      trigger={() => {return (
        <MultiselectInput
          selectedOptions={selectedOptions}
          placeholder={placeholder}
          showOptionIconOnly
          trimDisplayedOptions={maxCount}
          className={inputClassName}
        />
      )}}
      children={() => {return (
        <MultiselectInputList
          onOptionChange={toggleOption}
          options={options}
          selectedValues={value}
          className={listClassName}
        />
      )}}
     />
  );
};
