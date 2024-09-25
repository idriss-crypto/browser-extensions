import { createPublicClient, Hex, http } from 'viem';

import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import {
  GET_MULTIPLE_IDRISS_REGISTRY_ABI,
  MULTI_RESOLVER_CONTRACT_ADDRESS,
} from '../constants';

interface Payload {
  addresses: Hex[];
}

type Response = Record<string, string | undefined>;

export class GetReverseIdrissCommand extends Command<Payload, Response> {
  public readonly name = 'GetReverseIdrissCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const publicClient = createPublicClient({
        transport: http('https://polygon-rpc.com/'),
      });

      const results = await publicClient.readContract({
        abi: GET_MULTIPLE_IDRISS_REGISTRY_ABI,
        address: MULTI_RESOLVER_CONTRACT_ADDRESS,
        functionName: 'getMultipleReverse',
        args: [this.payload.addresses],
      });

      return new OkResult(
        Object.fromEntries(
          results.map((result) => {
            return [
              result._address,
              result.result.length > 0 ? result.result : undefined,
            ];
          }),
        ),
      );
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
