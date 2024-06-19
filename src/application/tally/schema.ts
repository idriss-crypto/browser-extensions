import { z } from 'zod';

export const proposalSchema = z.object({
  id: z.string(),
  end: z.object({
    timestamp: z.string().datetime(),
  }),
  metadata: z.object({
    title: z.string(),
    description: z.string(),
  }),
  status: z.string(),
  organization: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
  creator: z.object({
    address: z.string(),
    name: z.string(),
    ens: z.string(),
  }),
});

export const proposalsPageInfoSchema = z.object({
  firstCursor: z.string(),
  lastCursor: z.string(),
  count: z.number(),
});

export const proposalsResponseObjectSchema = z.object({
  nodes: z.array(proposalSchema),
  pageInfo: proposalsPageInfoSchema,
});

export const getProposalsResponseSchema = z.object({
  data: z.object({
    proposalsV2: proposalsResponseObjectSchema,
  }),
});

export const organizationInfoSchema = z.object({
  id: z.string(),
  proposalsCount: z.number(),
  hasActiveProposals: z.boolean(),
  chainIds: z.array(z.string()),
  name: z.string(),
  slug: z.string(),
});

export const getOrganizationInfoResponseSchema = z.object({
  data: z.object({
    organization: organizationInfoSchema,
  }),
});
