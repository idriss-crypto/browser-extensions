import { z } from 'zod';

export const proposalSchema = z.object({
  proposalId: z.string(),
  contractAddress: z.string(),
  proposerAddress: z.string(),
  description: z.string(),
  ordinal: z.string(),
  createBlock: z.string(),
  startBlock: z.string(),
  endBlock: z.string(),
  cancelledBlock: z.string(),
  executedBlock: z.string(),
  proposalData: z.object({
    votingStrategy: z.enum(['STANDARD']),
    title: z.string(),
    startTimestamp: z.string().datetime(),
    endTimestamp: z.string().datetime(),
    createdTimestamp: z.string().datetime(),
    link: z.string(),
    scores: z.string().array(),
    votes: z.string(),
    state: z.enum(['ACTIVE']),
  }),
  proposalTemplate: z.object({
    name: z.string(),
    proposalTemplateId: z.number(),
    votingStrategy: z.enum(['STANDARD']),
    quorum: z.string(),
    approvalThreshold: z.string(),
    contractAddress: z.string(),
    createBlock: z.string(),
  }),
});

export const getProposalsResponseSchema = z.object({
  data: z.object({
    proposals: z.array(proposalSchema),
  }),
});
