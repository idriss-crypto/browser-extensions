'use client';
import { classes } from '@idriss-xyz/ui/utils';
import { useState } from 'react';

type Properties = {
  options: string[];
  defaultOption?: string;
} & (
  | {
      readOnly?: false;
      onChange: (option: string) => void;
    }
  | {
      readOnly: true;
    }
);

export const Tabs = (properties: Properties) => {
  const [activeOption, setActiveOption] = useState(
    properties.defaultOption ?? properties.options[0],
  );
  return (
    <div className="flex items-start gap-1 rounded-[50px] bg-[#022218] p-1 text-label4">
      {properties.options.map((option) => {
        return (
          <div
            key={option}
            className={classes(
              'bg-mi flex cursor-pointer items-start rounded-[100px] bg-[#17ff4a1a] px-4 py-2 text-midnightGreen-100',
              activeOption === option && 'bg-mint-400 text-neutralGreen-900',
            )}
            onClick={() => {
              setActiveOption(option);
              if (!properties.readOnly) {
                properties.onChange(option);
              }
            }}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};
