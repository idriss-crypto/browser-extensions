import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import { generateGetProposalsQuery } from '../utils';
import { TALLY_GRAPHQL_API_URL } from '../constants';
import { getProposalsResponseSchema } from '../schema';
import { ProposalsResponse } from '../types';

interface Details {
  tallyUserId: string;
  afterCursor: string | null;
}

export class GetTallyProposalsCommand extends Command<
  Details,
  ProposalsResponse
> {
  public readonly name = 'GetTallyProposalsCommand' as const;

  constructor(
    public details: Details,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const query = generateGetProposalsQuery();

      const response = await fetch(TALLY_GRAPHQL_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          query: query,
          variables: {
            input: {
              filters: {
                includeArchived: false,
                organizationId: this.details.tallyUserId,
              },
              page: {
                limit: 1,
                afterCursor: this.details.afterCursor,
              },
            },
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          'Api-Key':
            'a0a4cd00bb6953720c9c201c010cdd36a563e65c97e926a36a8acdfcd1d1eeb7',
        },
      });

      if (response.status !== 200) {
        throw new HandlerError('Something went wrong when fetching tally api.');
      }

      const json = await response.json();

      const validResponse = getProposalsResponseSchema.parse(json);

      return new OkResult(validResponse.data.proposalsV2);
    } catch (error) {
      await this.trackHandlerException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
