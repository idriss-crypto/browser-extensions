import { classes } from '@idriss-xyz/ui/utils';
import { TabOption } from '../../types';
import Link from 'next/link';

type Properties = {
  options: TabOption[];
  activeOptionKey: string;
} & (
  | {
      readOnly?: false;
      onChange: (option: TabOption) => void;
    }
  | {
      readOnly: true;
    }
);

export const Tabs = (properties: Properties) => {
  return (
    <div className="flex items-start gap-1 rounded-[50px] bg-[#022218] p-1 text-label4">
      {properties.options.map((option) => {
        return properties.readOnly ? (
          <span
            className={classes(
              'flex items-start rounded-[100px] bg-[#17ff4a1a] px-4 py-2 text-midnightGreen-100',
              properties.activeOptionKey === option.key &&
                'bg-mint-400 text-neutralGreen-900',
            )}
          >
            {option.name}
          </span>
        ) : (
          <Link
            href={`/#${option.key}`}
            passHref
            legacyBehavior
            key={option.key}
          >
            <a
              className={classes(
                'flex cursor-pointer items-start rounded-[100px] bg-[#17ff4a1a] px-4 py-2 text-midnightGreen-100 transition-colors duration-1000',
                properties.activeOptionKey === option.key &&
                  'bg-mint-400 text-neutralGreen-900',
              )}
              onClick={() => {
                properties.onChange(option);
              }}
            >
              {option.name}
            </a>
          </Link>
        );
      })}
    </div>
  );
};
