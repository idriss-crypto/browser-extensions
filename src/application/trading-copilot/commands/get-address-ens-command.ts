import { createPublicClient, Hex, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

import { Command, FailureResult, HandlerError, OkResult } from 'shared/messaging';


type Payload = {
  ensName: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class GetEnsAddressCommand extends Command<Payload, Hex | null> {
  public readonly name = 'GetEnsAddressCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const client = createPublicClient({
        chain: { ...mainnet, fees: undefined },
        transport: http(),
      });
      const response = await client.getEnsAddress({
        name: normalize(this.payload.ensName),
      });

      return new OkResult(response ?? null)
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
