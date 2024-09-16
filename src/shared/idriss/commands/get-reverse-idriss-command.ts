import { createPublicClient, Hex, http } from 'viem';

import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import {
  GET_MULTIPLE_IDRISS_REGISTRY_ABI,
  MULTI_RESOVER_CONTRACT_ADDRESS,
} from '../constants';

interface Payload {
  addresses: Hex[];
}

type Response = Record<string, string | null>;

export class GetReverseResolution extends Command<Payload, Response> {
  public readonly name = 'GetReverseResolution' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const publicClient = createPublicClient({
        transport: http('https://polygon-rpc.com/'),
      });
      const results = (await publicClient.readContract({
        abi: GET_MULTIPLE_IDRISS_REGISTRY_ABI,
        address: MULTI_RESOVER_CONTRACT_ADDRESS,
        functionName: 'getMultipleReverse',
        args: [this.payload.addresses],
      })) as { _address: Hex; result: string }[];

      return new OkResult(
        Object.fromEntries(
          results.map((result) => {
            return [result._address, result.result];
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
