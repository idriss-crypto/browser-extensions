import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import { ProposalData } from '../types';
import { getProposalsResponseSchema } from '../schema';

interface Details {
  limit: number;
  offset: number;
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
      // TODO Uncomment when API will start working
      // const response = await fetch(
      //   `${AGORA_API_URL}/proposals?limit=${this.details.limit}&offset=${this.details.offset}`,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${AGORA_API_KEY}`,
      //     },
      //   },
      // );

      // if (response.status !== 200) {
      //   throw new HandlerError('Something went wrong when fetching agora api.');
      // }

      // const json = await response.json();
      // END OF TODO

      const response = new Promise((r) => {
        return setTimeout(() => {
          return r({
            data: {
              metadata: {
                has_next: true,
                total_returned: 1_073_741_824,
                next_offset: 1_073_741_824,
              },
              proposals: [
                {
                  proposalId:
                    '46662599590868619415724059715206858415123913604990481279137083354870809650669',
                  contractAddress: 'contractAddress',
                  proposerAddress: 'proposerAddress',
                  description: `This update enables voters with advanced delegated voting power to cast their votes in a single transaction. This enhancement addresses user feedback on the advanced delegation feature, simplifying the voting process.

                  If approved by governance, the Optimism Foundation admin will set the governor proxy to a new implementation deployed at 0x637DA4Eeac836188D8C46F63Cb2655f4d3C9F893.
                  
                  This proposal is eligible for Voting Cycle #21: https://gov.optimism.io/t/proposal-improve-advanced-delegation-voting/7932/1`,
                  ordinal: 'ordinal',
                  createBlock: 'createBlock',
                  startBlock: 'startBlock',
                  endBlock: 'endBlock',
                  cancelledBlock: 'cancelledBlock',
                  executedBlock: 'executedBlock',
                  proposalData: {
                    votingStrategy: 'STANDARD',
                    title:
                      'Governor Upgrade #1: Improve advanced delegation voting',
                    startTimestamp: '2024-05-29T16:54:38.631Z',
                    endTimestamp: '2024-05-29T16:54:38.631Z',
                    createdTimestamp: '2024-05-29T16:54:38.631Z',
                    link: 'link',
                    scores: ['scores'],
                    votes: 'votes',
                    state: 'ACTIVE',
                  },
                  proposalTemplate: {
                    name: 'name',
                    proposalTemplateId: 0,
                    votingStrategy: 'STANDARD',
                    quorum: 'quorum',
                    approvalThreshold: 'approvalThreshold',
                    contractAddress: 'contractAddress',
                    createBlock: 'createBlock',
                  },
                },
              ],
            },
          });
        }, 500);
      });

      const json = await response;
      const validResponse = getProposalsResponseSchema.parse(json);
      const proposals = validResponse.data.proposals;
      // const metadata = validResponse.metadata;

      return new OkResult(proposals as ProposalData[]);
    } catch (error) {
      await this.trackHandlerException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
