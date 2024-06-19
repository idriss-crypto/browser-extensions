import { GetOrganizationInfoCommand } from './get-organization-info.command';
import { GetTallyProposalsCommand } from './get-proposals.command';

export const COMMAND_MAP = {
  [GetOrganizationInfoCommand.name]: GetOrganizationInfoCommand,
  [GetTallyProposalsCommand.name]: GetTallyProposalsCommand,
};

export { GetOrganizationInfoCommand } from './get-organization-info.command';
export { GetTallyProposalsCommand } from './get-proposals.command';
