import { useMemo } from 'react';
import { Multiselect, MultiselectOption } from '@idriss-xyz/ui/multiselect';

import { ChainToken } from '../types';

import { Select } from './select';


interface Properties {
  value: string[];
  label?: string;
  className?: string;
  tokens: ChainToken[];
  onChange: (value: string[]) => void;
}

export const TokenSelect = ({
  value,
  label,
  onChange,
  tokens,
  className,
}: Properties) => {
  const options = useMemo(() => {
    return optionsFrom(tokens);
  }, [tokens]);

  console.log('tokenSelectValue', value);

  return (
    <Multiselect<string>
      inputClassName={className}
      label={label}
      options={options}
      onChange={onChange}
      value={value}
    />
  );
};

const optionsFrom = (tokens: ChainToken[]): MultiselectOption<string>[] => {
  return tokens.map((token) => {
    return {
      label: token.name,
      value: token.address,
      icon: (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={token.logo}
          className="size-6 rounded-full"
          alt={token.symbol}
        />
      ),
    };
  });
};
