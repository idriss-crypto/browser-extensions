import { createPublicClient, http } from 'viem';

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

type Payload = {
  digestedMessages: string[];
};

type Response = Record<string, string>;

export class GetDigestToWalletAddressCommand extends Command<
  Payload,
  Response
> {
  public readonly name = 'GetDigestToWalletAddressCommand' as const;

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
        functionName: 'getMultipleIDriss',
        args: [this.payload.digestedMessages],
      });

      return new OkResult(
        Object.fromEntries(
          results.map((result) => {
            return [result._hash, result.result];
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
