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

interface Payload {
  tallyUserId: string;
  afterCursor: string | null;
}

export class GetTallyProposalsCommand extends Command<
  Payload,
  ProposalsResponse
> {
  public readonly name = 'GetTallyProposalsCommand' as const;

  constructor(
    public payload: Payload,
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
                organizationId: this.payload.tallyUserId,
              },
              page: {
                limit: 1,
                afterCursor: this.payload.afterCursor,
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
      const activeProposals = {
        nodes: validResponse.data.proposalsV2.nodes.filter((proposal) => {
          return proposal.status === 'active';
        }),
        pageInfo: validResponse.data.proposalsV2.pageInfo,
      };
      return new OkResult(activeProposals);
    } catch (error) {
      await this.logException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
