import {
  Command,
  FailureResult,
  HandlerError,
  HandlerResponseError,
  OkResult,
} from 'shared/messaging';

import { Hex } from '../types';

export type Payload = {
  chains: { id: number; wrappedEthAddress: string }[];
  amount: number;
  message: string;
  recipient: Hex;
  destinationChainId: number;
};

type SingleChainResponse = {
  totalRelayFee: {
    total: string;
  };
};

export type Response = Record<string, SingleChainResponse>;

export class GetAcrossChainFeesCommand extends Command<Payload, Response> {
  public readonly name = 'GetAcrossChainFeesCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const promises = this.payload.chains.map(async (chain) => {
        const url = `https://across.to/api/suggested-fees?${new URLSearchParams(
          {
            originChainId: chain.id.toString(),
            token: chain.wrappedEthAddress,
            amount: this.payload.amount.toString(),
            message: this.payload.message,
            recipient: this.payload.recipient,
            destinationChainId: this.payload.destinationChainId.toString(),
          },
        ).toString()}`;

        const response = await fetch(`https://api.idriss.xyz/post-data`, {
          method: 'POST',
          body: JSON.stringify({ url }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const responseText = await response.text();
          throw new HandlerResponseError(
            this.name,
            responseText,
            response.status,
          );
        }

        const json = (await response.json()) as SingleChainResponse;
        return [chain.id.toString(), json];
      });

      const response: Record<string, SingleChainResponse> = Object.fromEntries(
        await Promise.all(promises),
      );

      return new OkResult(response);
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
