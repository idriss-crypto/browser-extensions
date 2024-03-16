import { FailureResult, Handler, OkResult } from 'shared/messaging';

import { POLYMARKET_CLOB_API } from '../../polymarket.constants';
import { getApiKeyResponseSchema } from '../../polymarket.schema';

import { GetApiKeyCommand } from './get-api-key.command';

export class GetApiKeyHandler implements Handler {
  async handle(command: GetApiKeyCommand) {
    const response = await fetch(`${POLYMARKET_CLOB_API}/auth/derive-api-key`, {
      method: 'GET',
      headers: {
        ...command.details.headers,
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'User-Agent': `@polymarket/clob-client`,
        'Accept': '*/*',
        'Connection': 'keep-alive',
      },
    });

    if (response.status !== 200) {
      return new FailureResult(
        'Something went wrong when fetching polymarket api.',
      );
    }

    const json = await response.json();

    const validResponse = getApiKeyResponseSchema.parse(json);
    return new OkResult(validResponse);
  }
}
