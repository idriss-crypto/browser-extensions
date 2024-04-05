import { EIP1193Provider } from 'mipd';

import { Hex } from 'shared/web3';

export interface CheckUsdcAllowanceArguments {
  provider: EIP1193Provider;
  safeWalletAddress: Hex;
}
