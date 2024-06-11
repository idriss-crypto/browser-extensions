import { GetOrganizationInfoCommand } from './get-organization-info.command';
import { GetProposalsCommand } from './get-proposals.command';

export const COMMAND_MAP = {
  [GetOrganizationInfoCommand.name]: GetOrganizationInfoCommand,
  [GetProposalsCommand.name]: GetProposalsCommand,
};

export { GetOrganizationInfoCommand } from './get-organization-info.command';
export { GetProposalsCommand } from './get-proposals.command';
