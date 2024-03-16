import { FailureResult, Handler, OkResult } from 'shared/messaging';

import { POLYMARKET_CLOB_API } from '../../polymarket.constants';
import { MarketData } from '../../polymarket.types';

import { GetMarketByConditionIdCommand } from './get-market-by-condition-id.command';

export class GetMarketsByConditionIdHandler implements Handler {
  async handle(command: GetMarketByConditionIdCommand) {
    const response = await fetch(
      `${POLYMARKET_CLOB_API}/markets/${command.details.conditionId}`,
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
    const json = await response.json();
    return new OkResult(json as MarketData);
  }
}
