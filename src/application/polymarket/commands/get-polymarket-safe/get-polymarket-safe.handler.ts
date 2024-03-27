import { FailureResult, OkResult, Handler } from 'shared/messaging';

import { GetPolymarketSafeCommand } from './get-polymarket-safe.command';

export class GetPolymarketSafeHandler implements Handler {
  async handle(command: GetPolymarketSafeCommand) {
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
      return new FailureResult(
        'Something went wrong when fetching polymarket api',
      );
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
      return new FailureResult(
        'Something went wrong when fetching polymarket api',
      );
    }
    return new OkResult(pickedSafe);
  }
}
