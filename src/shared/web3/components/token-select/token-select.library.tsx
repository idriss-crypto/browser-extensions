import { ETHEREUM_TOKEN_LOGO } from 'shared/web3/web3.constants';

export const getOptions = () => {
  return [
    {
      label: 'Ethereum',
      value: 'ETH',
      prefix: <img src={ETHEREUM_TOKEN_LOGO} className="size-4" alt="" />,
    },
  ];
};
