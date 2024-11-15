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
    <div className="mt-1 flex max-h-[184px] flex-col gap-2 overflow-y-auto rounded-[12px] border border-[#DBDDE2] bg-[#FFF] p-[8px_0px] shadow-lg">
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <div className="px-3 py-1" key={option.value}>
            <Checkbox
              key={option.value}
              onChange={() => onOptionChange(option.value)}
              value={isSelected}
              label={
                <div className="flex flex-row items-center gap-3">
                  <span className="truncate text-body4 text-neutral-900">
                    {option.label}
                  </span>
                  {option.icon && (
                    <div className="text-muted-foreground mr-2 h-4 w-4">
                      {option.icon}
                    </div>
                  )}
                </div>
              }
            />
          </div>
        );
      })}
    </div>
  );
};
