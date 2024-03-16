// https://clob.polymarket.com/midpoint
import { FailureResult, Handler, OkResult } from 'shared/messaging';

import { POLYMARKET_CLOB_API } from '../../polymarket.constants';

import { GetTokenChanceCommand } from './get-token-chance.command';

export class GetTokenChanceHandler implements Handler {
  async handle(command: GetTokenChanceCommand) {
    const response = await fetch(
      `${POLYMARKET_CLOB_API}/midpoint?token_id=${command.details.tokenId}`,
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
        'Something went wrong when fetching polymarket api.',
      );
    }

    // TODO: validate response
    const json = (await response.json()) as { mid: string };
    return new OkResult(Math.round(Number(json.mid) * 100) / 100);
  }
}
