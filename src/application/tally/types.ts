import { z } from 'zod';

import {
  organizationInfoSchema,
  proposalSchema,
  proposalsResponseObjectSchema,
} from './schema';

export type ProposalData = z.infer<typeof proposalSchema>;

export type ProposalsResponse = z.infer<typeof proposalsResponseObjectSchema>;

export type OrganizationInfo = z.infer<typeof organizationInfoSchema>;
