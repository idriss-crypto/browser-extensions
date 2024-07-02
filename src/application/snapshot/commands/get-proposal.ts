import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';
import { resolveAddress } from 'shared/web3';

import { ProposalData } from '../types';
import { generateGetProposalsQuery } from '../utils';
import { SNAPSHOT_GRAPHQL_API_URL } from '../constants';
import { getProposalsResponseSchema } from '../schema';

interface Payload {
  snapshotName: string;
  pageNumber: number;
}

interface Response {
  proposal: ProposalData | null;
  hasNextProposal: boolean;
}

export class GetProposalCommand extends Command<Payload, Response> {
  public readonly name = 'GetProposalCommand' as const;

  constructor(
    public payload: Payload,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const query = generateGetProposalsQuery();
      const response = await fetch(SNAPSHOT_GRAPHQL_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          query: query,
          operationName: 'Proposals',
          variables: {
            first: 2,
            snapshotNames: this.payload.snapshotName,
            skip: this.payload.pageNumber,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new HandlerError();
      }
      const json = await response.json();
      const validationResult = getProposalsResponseSchema.safeParse(json);
      if (!validationResult.success) {
        throw new HandlerError('Schema validation failed');
      }
      const proposal = validationResult.data.data.proposals[0];
      let proposalWithResolvedAddress = null;

      if (proposal) {
        const resolvedProposalAddress = await resolveAddress(proposal.author);

        proposalWithResolvedAddress = {
          ...proposal,
          author: {
            address: proposal.author,
            resolvedProposalAddress,
          },
        };
      }

      return new OkResult({
        proposal: proposalWithResolvedAddress,
        hasNextProposal: !!validationResult.data.data.proposals[1],
      } as Response);
    } catch (error) {
      await this.logException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
