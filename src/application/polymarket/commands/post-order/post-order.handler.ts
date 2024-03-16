import { FailureResult, Handler, OkResult } from 'shared/messaging';

import { POLYMARKET_CLOB_API } from '../../polymarket.constants';

import { PostOrderCommand } from './post-order.command';

export class PostOrderHandler implements Handler {
  async handle(command: PostOrderCommand) {
    const response = await fetch(`${POLYMARKET_CLOB_API}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...command.details.headers,
      },
      body: JSON.stringify(command.details.orderPayload),
    });

    if (response.status !== 200) {
      return new FailureResult(
        'Something went wrong when fetching polymarket api',
      );
    }

    return new OkResult(undefined);
  }
}
