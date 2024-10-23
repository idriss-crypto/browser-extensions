import { Command, FailureResult, HandlerError } from 'shared/messaging';
import {
  GetAcrossChainFeesCommand,
  GetAcrossChainFeesPayload,
  GetAcrossChainFeesResponse,
  Hex,
} from 'shared/web3';

import { generateAcrossMessage } from '../utils';

type Payload = {
  anchorAddress: Hex;
  roundId: number;
} & Omit<GetAcrossChainFeesPayload, 'message'>;

export class GetGitcoinAcrossChainFeesCommand extends Command<
  Payload,
  GetAcrossChainFeesResponse
> {
  public readonly name = 'GetGitcoinAcrossChainFeesCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const message = await generateAcrossMessage({
        amount: BigInt(this.payload.amount.toString()),
        anchorAddress: this.payload.anchorAddress,
        roundId: this.payload.roundId,
        destinationChainId: this.payload.destinationChainId,
      });
      const command = new GetAcrossChainFeesCommand({
        message,
        destinationChainId: this.payload.destinationChainId,
        amount: this.payload.amount,
        chains: this.payload.chains,
        recipient: this.payload.recipient,
      });
      return command.handle();
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
