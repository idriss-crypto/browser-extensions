import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';
import { CHAIN, createContract } from 'shared/web3';

import {
  DONATION_CONTRACT_ABI,
  DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID,
} from '../constants';

interface Payload {
  donor: string;
  chainId: number;
}

export class GetNonceByChainAndDonor extends Command<Payload, number> {
  public readonly name = 'GetNonceByChainAndDonor' as const;

  constructor(
    public payload: Payload,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const wrapper = createContract({
        abi: DONATION_CONTRACT_ABI,
        address: DONATION_CONTRACT_ADDRESS_PER_CHAIN_ID[this.payload.chainId]!,
        signerOrProvider: Object.values(CHAIN).find((chain) => {
          return chain.id === this.payload.chainId;
        })?.rpcUrls[0],
      });

      return new OkResult((await wrapper.nonces(this.payload.donor)) as number);
    } catch (error) {
      await this.logException();

      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
