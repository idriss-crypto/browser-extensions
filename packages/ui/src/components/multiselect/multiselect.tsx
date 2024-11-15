import { useMemo, useState } from 'react';
import { Dropdown } from '../dropdown';
import { Option } from './types';
import { MultiselectInputList, MultiselectInput } from './components';

type Properties = {
  options: Option[];
  value: string[];
  onValueChange: (newValue: string[]) => void;
  placeholder?: string;
  maxCount?: number;
  className?: string;
};

export const Multiselect = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select options',
  maxCount = 3,
  className,
}: Properties) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const selectedOptions = useMemo(() => {
    return options.filter((option) => selectedValues.includes(option.value));
  }, [selectedValues]);

  const toggleOption = (optionValue: string) => {
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((val) => val !== optionValue)
      : [...selectedValues, optionValue];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  return (
    <Dropdown
      trigger={() => (
        <MultiselectInput
          selectedOptions={selectedOptions}
          placeholder={placeholder}
          showOptionIconOnly
          trimDisplayedOptions={maxCount}
          className={className}
        />
      )}
      children={() => (
        <MultiselectInputList
          onOptionChange={toggleOption}
          options={options}
          selectedValues={selectedValues}
        />
      )}
    ></Dropdown>
  );
};
