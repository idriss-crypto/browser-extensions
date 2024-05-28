import { GetAgoraProposalCommand } from './get-agora-proposal.command';
import { GetAgoraProposalsCommand } from './get-agora-proposals.command';

export const COMMAND_MAP = {
  [GetAgoraProposalCommand.name]: GetAgoraProposalCommand,
  [GetAgoraProposalsCommand.name]: GetAgoraProposalsCommand,
};

export { GetAgoraProposalCommand } from './get-agora-proposal.command';
export { GetAgoraProposalsCommand } from './get-agora-proposals.command';
