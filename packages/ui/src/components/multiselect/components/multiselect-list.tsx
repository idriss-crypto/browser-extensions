import { Checkbox } from '../../checkbox';
import { Option } from '../types';

type Properties = {
  options: Option[];
  selectedValues: string[];
  onOptionChange: (optionValue: string) => void;
};

export const MultiselectInputList = ({
  options,
  selectedValues,
  onOptionChange,
}: Properties) => {
  return (
    <>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <Checkbox
            key={option.value}
            onChange={() => onOptionChange(option.value)}
            value={isSelected}
            label={
              <>
                <span>{option.label}</span>
                {option.icon && (
                  <div className="text-muted-foreground mr-2 h-4 w-4">
                    {option.icon}
                  </div>
                )}
              </>
            }
          />
        );
      })}
    </>
  );
};
