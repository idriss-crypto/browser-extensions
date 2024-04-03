import {
  FailureResult,
  OkResult,
  Handler,
  HandlerError,
} from 'shared/messaging';
import { sendHandlerExceptionEvent } from 'shared/monitoring';

import { GetPolymarketSafeCommand } from './get-polymarket-safe.command';

export class GetPolymarketSafeHandler implements Handler {
  async handle(command: GetPolymarketSafeCommand) {
    try {
      const response = await fetch(
        `https://safe-transaction-polygon.safe.global/api/v1/owners/${command.details.address}/safes/`,
        {
          method: 'GET',
          headers: {
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/json',
            'User-Agent': `@polymarket/clob-client`,
            'Accept': '*/*',
            'Connection': 'keep-alive',
          },
        },
      );

      if (response.status !== 200) {
        throw new HandlerError();
      }
      const { safes } = (await response.json()) as { safes: string[] };
      const safesCreationResponse = await Promise.all(
        safes.map(async (safe) => {
          const response = await fetch(
            `https://safe-transaction-polygon.safe.global/api/v1/safes/${safe}/creation/`,
          );
          const json = (await response.json()) as { factoryAddress: string };
          if (
            json.factoryAddress === '0xaacFeEa03eb1561C4e67d661e40682Bd20E3541b'
          ) {
            return safe;
          }
          return;
        }),
      );
      const safesCreatedByPolymarket = safesCreationResponse.find(Boolean);
      const pickedSafe = safesCreatedByPolymarket;
      if (!pickedSafe) {
        throw new HandlerError();
      }
      return new OkResult(pickedSafe);
    } catch (error) {
      await sendHandlerExceptionEvent(command);
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }
      return new FailureResult();
    }
  }
}
