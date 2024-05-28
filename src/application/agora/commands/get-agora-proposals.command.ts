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
  agoraUsernames: string[];
}

export class GetAgoraProposalsCommand extends Command<Details, ProposalData[]> {
  public readonly name = 'GetAgoraProposalsCommand' as const;

  constructor(
    public details: Details,
    id?: string,
  ) {
    super(id ?? null);
  }

  async handle() {
    try {
      const query = generateGetProposalsQuery(this.details.agoraUsernames, {
        first: 30,
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
        throw new HandlerError('Something went wrong when fetching agora api.');
      }

      const json = await response.json();
      const validResponse = getProposalsResponseSchema.parse(json);
      const proposals = validResponse.data.proposals;

      const uniqueAuthors = [
        ...new Set(
          proposals.map((proposal) => {
            return proposal.proposerAddress;
          }),
        ),
      ];

      const resolvedAddressesMap: Record<string, string> = Object.fromEntries(
        await Promise.all(
          uniqueAuthors.map(async (authorAddress) => {
            const resolvedAddress = await resolveAddress(authorAddress);
            return [authorAddress, resolvedAddress];
          }),
        ),
      );

      const mappedProposals = proposals.map((proposal) => {
        return {
          ...proposal,
          author: {
            address: proposal.proposerAddress,
            resolvedAddress: resolvedAddressesMap[proposal.proposerAddress],
          },
        };
      });

      return new OkResult(mappedProposals);
    } catch (error) {
      await this.trackHandlerException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
