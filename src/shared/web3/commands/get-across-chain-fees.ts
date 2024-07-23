import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';
import { generateDummyData } from 'application/gitcoin/utils';
import { Payload } from '../types';
import { Application } from 'application/gitcoin/types';

interface SingleChainResponse {
  totalRelayFee: {
    total: string;
  };
}

type Response = Record<string, SingleChainResponse>;

export class GetAcrossChainFeesCommand extends Command<Payload, Response> {
  public readonly name = 'GetAcrossChainFeesCommand' as const;

  constructor(
    public payload: Payload,
    public application: Application,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const dummyMessage = await generateDummyData(this.payload, this.application);

      const promises = this.payload.chains.map(async (chain) => {
        const url = `https://across.to/api/suggested-fees?${new URLSearchParams(
          {
            originChainId: chain.id.toString(),
            token: chain.wrappedEthAddress,
            amount: this.payload.amount,
            message: dummyMessage,
            recipient: this.payload.recipient,
            destinationChainId: this.payload.destinationChainId.toString(),
          },
        ).toString()}`;

        const response = await fetch(`https://www.idriss.xyz/post-data`, {
          method: 'POST',
          body: JSON.stringify({ url }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new HandlerError();
        }

        const json = (await response.json()) as SingleChainResponse;
        return [chain.id.toString(), json];
      });

      const response: Record<string, SingleChainResponse> = Object.fromEntries(
        await Promise.all(promises),
      );

      return new OkResult(response);
    } catch (error) {
      await this.logException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
