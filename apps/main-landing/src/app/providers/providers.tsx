import { ReactNode } from 'react';

import { QueryProvider } from './query';

type Properties = {
  children: ReactNode;
  disabledWalletRdns?: string[];
};

export const Providers = ({ children }: Properties) => {
  return <QueryProvider>{children}</QueryProvider>;
};
