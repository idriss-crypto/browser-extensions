import { ReactNode, useMemo } from 'react';
import { Multiselect, MultiselectOption } from '@idriss-xyz/ui/multiselect';

import { Chain } from '../types';
import { CHAIN } from '../constants';


interface Properties {
  value: number[];
  label?: string;
  renderLabel?: () => ReactNode;
  className?: string;
  onChange: (value: number[]) => void;
  allowedChainsIds?: number[];
}

export const ChainSelect = ({
  value,
  label,
  onChange,
  className,
  allowedChainsIds,
  renderLabel,
}: Properties) => {
  const options = useMemo(() => {
    return getOptions(allowedChainsIds);
  }, [allowedChainsIds]);

  return (
    <Multiselect<number>
      inputClassName={className}
      label={label}
      renderLabel={renderLabel}
      options={options}
      onChange={onChange}
      value={value}
    />
  );
};

const optionsFrom = (chain: Chain): MultiselectOption<number> => {
  return {
    label: chain.name,
    value: chain.id,
    // eslint-disable-next-line @next/next/no-img-element
    icon: <img src={chain.logo} className="size-6 rounded-full" alt="" />,
  };
};

const getOptions = (allowedChainsIds?: number[]) => {
  if (!allowedChainsIds) {
    return Object.values(CHAIN).map((chain) => {
      return optionsFrom(chain);
    });
  }

  return allowedChainsIds.map((chainId) => {
    const foundChain = Object.values(CHAIN).find((chain) => {
      return chain.id === chainId;
    });
    if (!foundChain) {
      throw new Error(`${chainId} not found`);
    }
    return optionsFrom(foundChain);
  });
};
