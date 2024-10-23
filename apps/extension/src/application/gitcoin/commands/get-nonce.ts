import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';
import { Hex } from 'shared/web3';

import { getNonce } from '../utils';

type Payload = {
  senderAddress: Hex;
  destinationChainId: number;
};

type Response = string;

export class GetNonceCommand extends Command<Payload, Response> {
  public readonly name = 'GetNonceCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const nonce = await getNonce(
        this.payload.senderAddress,
        this.payload.destinationChainId,
      );
      return new OkResult(nonce.toString());
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
