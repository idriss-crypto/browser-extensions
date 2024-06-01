import {
  Command,
  FailureResult,
  HandlerError,
  OkResult,
} from 'shared/messaging';

import { ProposalsResponseData } from '../types';
import { getProposalsResponseSchema } from '../schema';

const proposalsResponses = [
  {
    data: {
      metadata: {
        has_next: true,
        total_returned: 1_073_741_824,
        next_offset: 1_073_741_824,
      },
      proposals: [
        {
          proposalId:
            '63758762292293008954414933414904836930778692439616923618399126968620365661274',
          contractAddress: 'contractAddress',
          proposerAddress: 'optimism.eth',
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
            title: 'Governor Upgrade #1: Improve advanced delegation voting',
            startTimestamp: '2024-05-29T16:54:38.631Z',
            endTimestamp: '2024-06-01T16:54:38.631Z',
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
  },
  {
    data: {
      metadata: {
        has_next: true,
        total_returned: 1_073_741_824,
        next_offset: 1_073_741_824,
      },
      proposals: [
        {
          proposalId:
            '105090569675606228680479820654354019470447822380910214626164858605991232311940',
          contractAddress: 'contractAddress',
          proposerAddress: 'optimism.eth',
          description: `Please read Code of Conduct Rescoping #2 before voting on this proposal: https://gov.optimism.io/t/season-6-code-of-conduct-rescoping-2/8101

        The Token House experimented with a Code of Conduct Council in Season 5. It is now time for delegates to assess whether the Council should be renewed.
        
        Delegates may choose to approve an operating budget for the Code of Conduct Council to oversee the Rules of Engagement in Season 6, effectively electing the proposal author as Council Lead. If delegates do not believe an elected Council is necessary to enforce the Rules of Engagement, they should not approve any operating budget for a Code of Conduct Council.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Season 6: Code of Conduct Council Renewal',
            startTimestamp: '2024-05-29T16:54:38.631Z',
            endTimestamp: '2024-06-02T16:54:38.631Z',
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
  },
  {
    data: {
      metadata: {
        has_next: true,
        total_returned: 1_073_741_824,
        next_offset: 1_073_741_824,
      },
      proposals: [
        {
          proposalId:
            '105090569675606228680479820654354019470447822380910214626164858605991232311940',
          contractAddress: 'contractAddress',
          proposerAddress: 'optimism.eth',
          description: `Please read Code of Conduct Rescoping #2 before voting on this proposal: https://gov.optimism.io/t/season-6-code-of-conduct-rescoping-2/8101

         in Season N+1. It is now time for delegates to assess whether the Council should be renewed.
        
         The Token House experimented with a Code of Conduct Council to oversee the Rules of Engagement in Season 6, effectively electing the proposal author as Council Lead. If delegates do not believe an elected Council is necessary to enforce the Rules of Engagement, they should not approve any operating budget for a Code of Conduct Council.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Season N+1: Code of Renewal',
            startTimestamp: '2024-05-29T16:54:38.631Z',
            endTimestamp: '2024-06-02T16:54:38.631Z',
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
  },
  {
    data: {
      metadata: {
        has_next: true,
        total_returned: 1_073_741_824,
        next_offset: 1_073_741_824,
      },
      proposals: [
        {
          proposalId:
            '105090569675606228680479820654354019470447822380910214626164858605991232311940',
          contractAddress: 'contractAddress',
          proposerAddress: 'optimism.eth',
          description: `Please read Code of Conduct Rescoping #2 before voting on this proposal: https://gov.optimism.io/t/season-6-code-of-conduct-rescoping-2/8101

         in Season N+2. It is now time for delegates to assess whether the Council should be renewed.
        
         The Token House experimented with a Code of Conduct Council to oversee the Rules of Engagement in Season 6, effectively electing the proposal author as Council Lead. If delegates do not believe an elected Council is necessary to enforce the Rules of Engagement, they should not approve any operating budget for a Code of Conduct Council.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Season N+2: Code of Renewal',
            startTimestamp: '2024-05-29T16:54:38.631Z',
            endTimestamp: '2024-06-02T16:54:38.631Z',
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
  },
  {
    data: {
      metadata: {
        has_next: true,
        total_returned: 1_073_741_824,
        next_offset: 1_073_741_824,
      },
      proposals: [
        {
          proposalId:
            '105090569675606228680479820654354019470447822380910214626164858605991232311940',
          contractAddress: 'contractAddress',
          proposerAddress: 'optimism.eth',
          description: `Please read Code of Conduct Rescoping #2 before voting on this proposal: https://gov.optimism.io/t/season-6-code-of-conduct-rescoping-2/8101

         in Season N+3. It is now time for delegates to assess whether the Council should be renewed.
        
         The Token House experimented with a Code of Conduct Council to oversee the Rules of Engagement in Season 6, effectively electing the proposal author as Council Lead. If delegates do not believe an elected Council is necessary to enforce the Rules of Engagement, they should not approve any operating budget for a Code of Conduct Council.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Season N+3: Code of Renewal',
            startTimestamp: '2024-05-29T16:54:38.631Z',
            endTimestamp: '2024-06-02T16:54:38.631Z',
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
  },
  {
    data: {
      metadata: {
        has_next: true,
        total_returned: 1_073_741_824,
        next_offset: 1_073_741_824,
      },
      proposals: [
        {
          proposalId:
            '105090569675606228680479820654354019470447822380910214626164858605991232311940',
          contractAddress: 'contractAddress',
          proposerAddress: 'optimism.eth',
          description: `Please read Code of Conduct Rescoping #2 before voting on this proposal: https://gov.optimism.io/t/season-6-code-of-conduct-rescoping-2/8101

         in Season N+4. It is now time for delegates to assess whether the Council should be renewed.
        
         The Token House experimented with a Code of Conduct Council to oversee the Rules of Engagement in Season 6, effectively electing the proposal author as Council Lead. If delegates do not believe an elected Council is necessary to enforce the Rules of Engagement, they should not approve any operating budget for a Code of Conduct Council.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Season N+4: Code of Renewal',
            startTimestamp: '2024-05-29T16:54:38.631Z',
            endTimestamp: '2024-06-02T16:54:38.631Z',
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
  },
  {
    data: {
      metadata: {
        has_next: true,
        total_returned: 1_073_741_824,
        next_offset: 1_073_741_824,
      },
      proposals: [
        {
          proposalId:
            '105090569675606228680479820654354019470447822380910214626164858605991232311940',
          contractAddress: 'contractAddress',
          proposerAddress: 'optimism.eth',
          description: `Please read Code of Conduct Rescoping #2 before voting on this proposal: https://gov.optimism.io/t/season-6-code-of-conduct-rescoping-2/8101

         in Season N+5. It is now time for delegates to assess whether the Council should be renewed.
        
         The Token House experimented with a Code of Conduct Council to oversee the Rules of Engagement in Season 6, effectively electing the proposal author as Council Lead. If delegates do not believe an elected Council is necessary to enforce the Rules of Engagement, they should not approve any operating budget for a Code of Conduct Council.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Season N+5: Code of Renewal',
            startTimestamp: '2024-05-29T16:54:38.631Z',
            endTimestamp: '2024-06-02T16:54:38.631Z',
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
  },
  {
    data: {
      metadata: {
        has_next: false,
        total_returned: 1_073_741_824,
        next_offset: 1_073_741_824,
      },
      proposals: [
        {
          proposalId:
            '27439950952007920118525230291344523079212068327713298769307857575418374325849',
          contractAddress: 'contractAddress',
          proposerAddress: 'optimism.eth',
          description: `This proposal requires a vote to approve Phase 0's addition of the Security Council as a signer on a 2/2 multisig that controls protocol upgrades for OP Mainnet. This does not require any protocol changes, but as this represents a fundamental change to OP Mainnet's security model, it should be approved by the Token House. This is one of three votes required to fully implement the Security Council as outlined here: https://gov.optimism.io/t/intro-to-optimisms-security-council/6885`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Security Council: Vote #1',
            startTimestamp: '2024-05-29T16:54:38.631Z',
            endTimestamp: '2024-06-06T16:54:38.631Z',
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
  },
];

interface Details {
  limit: number;
  offset: number;
}

export class GetAgoraProposalsCommand extends Command<
  Details,
  ProposalsResponseData
> {
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

      console.log('this.details.offset', this.details.offset);
      console.log(
        'proposalsResponses[this.details.offset]',
        proposalsResponses[this.details.offset],
      );
      const response = new Promise((r) => {
        return setTimeout(() => {
          return r(proposalsResponses[this.details.offset]);
        }, Math.random() * 3400);
      });

      const json = await response;
      console.log('json', json);
      const validResponse = getProposalsResponseSchema.parse(json);
      console.log('validResponse', validResponse);

      return new OkResult(validResponse.data);
    } catch (error) {
      await this.trackHandlerException();
      if (error instanceof HandlerError) {
        return new FailureResult(error.message);
      }

      return new FailureResult();
    }
  }
}
