import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';
import { resolveAddress } from 'shared/web3';

import { ProposalData } from '../types';
import { generateGetProposalsQuery } from '../utils';
import { AGORA_API_URL } from '../constants';
import { getProposalsResponseSchema } from '../schema';

interface Details {
  agoraUsername: string;
}

export class GetAgoraProposalCommand extends Command<Details, ProposalData> {
  public readonly name = 'GetAgoraProposalCommand' as const;

  constructor(
    public details: Details,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const query = generateGetProposalsQuery([this.details.agoraUsername], {
        first: 1,
      });
      const response = await fetch(AGORA_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          query: query,
          operationName: 'Proposals',
          variables: undefined,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new HandlerError();
      }
      const json = await response.json();
      const validResponse = getProposalsResponseSchema.parse(json);
      const proposal = validResponse.data.proposals[0];
      if (!proposal) {
        throw new HandlerError('Proposal not found');
      }

      const resolvedAddress = await resolveAddress(proposal.proposerAddress);
      return new OkResult({
        ...proposal,
        author: {
          address: proposal.proposerAddress,
          resolvedAddress,
        },
      });
    } catch (error) {
      await this.trackHandlerException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
