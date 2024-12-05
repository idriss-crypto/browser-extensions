import { normalize } from 'viem/ens';
import { isAddress } from 'viem';

import { ethereumClient } from './donate/config';

export const validateAddress = async (
  value: string,
): Promise<string | true> => {
  console.log('called with', value);
  try {
    if (value.includes('.') && !value.endsWith('.')) {
      const resolvedAddress = await ethereumClient?.getEnsAddress({
        name: normalize(value),
      });
      return resolvedAddress ? true : 'This address doesn’t exist.';
    }
    return isAddress(value) ? true : 'This address doesn’t exist.';
  } catch (error) {
    console.error(error);
    return 'An unexpected error occurred. Try again.';
  }
};
