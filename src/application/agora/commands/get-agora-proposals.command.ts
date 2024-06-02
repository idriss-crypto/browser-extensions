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
          description: `This proposal introduces improvements to the Alligator allowance storage system, enabling partial and sub-delegation for OP voters. This update ensures accurate voting power calculation, addressing issues found in advanced delegation.

          If approved by governance, the Optimism Foundation admin will set the new implementation of governor proxy at 0xcDF27F107725988f2261Ce2256bDfCdE8B382B10 to new implementation deployed at 0xb7b1c8d8cc590b91623f493af3ee8c0a0a282b74 ordinal`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Season 6: Intent Budgets',
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

         in Season 6. It is now time for delegates to assess whether the Council should be renewed.
        
         The Token House experimented with a Code of Conduct Council to oversee the Rules of Engagement in Season 6, effectively electing the proposal author as Council Lead. If delegates do not believe an elected Council is necessary to enforce the Rules of Engagement, they should not approve any operating budget for a Code of Conduct Council.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Season 6: Grants Council Operating Budget',
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
          description: `In Season 5, the Token House will approval rank Mission Requests that work towards our Collective Intents. Mission Requests outline specific initiatives aimed at achieving one of the Intents. Once approved, teams will apply to fulfill each Request by submitting a Mission Application. Below are the Mission Requests under Intent #1: Progress towards technical decentralization.

          NOTE: YOU WILL NOT BE ABLE TO CHANGE YOUR VOTE ONCE CAST
          
          This vote utilizes approval voting. Mission Requests will be approval ranked based on the number of yes votes. Each Mission Request must receive a minimum number of yes votes, equal to 51% of quorum. Any Mission that does not receive > required number of yes votes will not qualify for a budget allocation. The top ranked Requests, above the minimum number of yes votes, will be accepted until the Intent Budget runs out. If a Mission would push the Intent Budget over the approved amount, it will not be included. Any Intent Budgets left over will be returned to the Governance Fund. For examples, see How to Vote on Missions Guide.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title:
              'Governor Update Proposal #2: Improvements to advanced delegation allowance calculations',
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

         in Protocol Upgrade #8: Changes for Stage 1 Decentralization. It is now time for delegates to assess whether the Council should be renewed.
        
         The Token House experimented with a Code of Conduct Council to oversee the Rules of Engagement in Season 6, effectively electing the proposal author as Council Lead. If delegates do not believe an elected Council is necessary to enforce the Rules of Engagement, they should not approve any operating budget for a Code of Conduct Council.`,
          ordinal: 'ordinal',
          createBlock: 'createBlock',
          startBlock: 'startBlock',
          endBlock: 'endBlock',
          cancelledBlock: 'cancelledBlock',
          executedBlock: 'executedBlock',
          proposalData: {
            votingStrategy: 'STANDARD',
            title: 'Protocol Upgrade #8: Changes for Stage 1 Decentralization',
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

      const response = new Promise((r) => {
        return setTimeout(() => {
          return r(proposalsResponses[this.details.offset]);
        }, Math.random() * 600);
      });
      const json = await response;
      const validResponse = getProposalsResponseSchema.parse(json);
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
