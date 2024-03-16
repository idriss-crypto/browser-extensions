import { resolveAddress } from 'shared/web3';
import { FailureResult, Handler, OkResult } from 'shared/messaging';

import { SNAPSHOT_GRAPHQL_API_URL } from '../constants';
import { getProposalsResponseSchema } from '../schema';
import { generateGetProposalsQuery } from '../utils';

import { GetProposalCommand } from './get-proposal.command';

export class GetProposalHandler implements Handler {
  async handle(command: GetProposalCommand) {
    const query = generateGetProposalsQuery([command.details.snapshotName], {
      first: 1,
    });

    const response = await fetch(SNAPSHOT_GRAPHQL_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        query: query,
        operationName: 'Proposals',
        // TODO: make sure undefined is fine
        variables: undefined,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Something went wrong when fetching snapshot api.');
    }

    const json = await response.json();
    const validResponse = getProposalsResponseSchema.parse(json);
    const proposal = validResponse.data.proposals[0];
    if (!proposal) {
      return new FailureResult('Proposal not found');
    }

    const resolvedAddress = await resolveAddress(proposal.author);

    return new OkResult({
      ...proposal,
      author: {
        address: proposal.author,
        resolvedAddress,
      },
    });
  }
}
