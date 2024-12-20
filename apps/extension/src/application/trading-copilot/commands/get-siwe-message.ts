
import {
  Command,
  FailureResult,
  HandlerError,
  HandlerResponseError,
  OkResult,
} from 'shared/messaging';

import {
  SiweMessageRequest as Payload,
  SiweMessageResponse as Response,
} from '../types';

export class GetSiweMessageCommand extends Command<Payload, Response> {
  public readonly name = 'GetSiweMessageCommand' as const;

  constructor(public payload: Payload) {
    super();
  }

  async handle() {
    try {
      const response = await fetch('http://localhost:8080/auth/wallet-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: this.payload.walletAddress,
          chainId: this.payload.chainId,
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new HandlerResponseError(
          this.name,
          responseText,
          response.status,
        );
      }

      const data = await response.json() as Response;
      return new OkResult(data);
    } catch (error) {
      this.captureException(error);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
