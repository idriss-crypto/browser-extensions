import {
  Command,
  FailureResult,
  HandlerError,
  HandlerResponseError,
  OkResult,
} from 'shared/messaging';

import { Subscription } from '../types';

import { COPILOT_API_URL } from './constants';

interface Payload {
  subscription: Subscription;
  subscriberId: string;
}

type Response = boolean;

export class RemoveTradingCopilotSubscriptionCommand extends Command<
  Payload,
  Response
> {
  public readonly name = 'RemoveTradingCopilotSubscriptionCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const response = await fetch(`${COPILOT_API_URL}/unsubscribe`, {
        method: 'POST',
        body: JSON.stringify({
          subscriberId: this.payload.subscriberId,
          address: this.payload.subscription.walletAddress,
        }),
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

      const json = (await response.json()) as Response;

      return new OkResult(json);
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
