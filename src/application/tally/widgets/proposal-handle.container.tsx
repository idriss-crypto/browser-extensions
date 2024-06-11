import { useCommandQuery } from 'shared/messaging';

import { GetOrganizationInfoCommand, GetProposalsCommand } from '../commands';
import { getTallyFromTwitterUsername } from '../utils';

import { Proposal } from './proposal';

interface Properties {
  handle: string;
}

export const ProposalHandleContainer = ({ handle }: Properties) => {
  const tallyName = getTallyFromTwitterUsername(handle);

  const organizationInfoQuery = useCommandQuery({
    command: new GetOrganizationInfoCommand({ twitterName: handle ?? '' }),
    enabled: handle ? handle.length > 0 : false,
  });
  const hasActiveProposal =
    organizationInfoQuery.data?.hasActiveProposals ?? false;

  const proposalQuery = useCommandQuery({
    command: new GetProposalsCommand({
      tallyUserId: organizationInfoQuery.data?.id?.toString() ?? '',
    }),
    enabled: hasActiveProposal,
  });

  if (!proposalQuery.data || !tallyName) {
    return null;
  }

  return <Proposal data={proposalQuery.data} className="fixed top-20" />;
};
