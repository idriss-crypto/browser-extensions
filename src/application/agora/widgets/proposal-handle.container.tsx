import { useCommandQuery } from 'shared/messaging';

import { getAgoraUsernameFromTwitterUsername } from '../utils';
import { GetAgoraProposalsCommand } from '../commands';

import { Proposal } from './proposal';

interface Properties {
  handle: string;
}

export const ProposalHandleContainer = ({ handle }: Properties) => {
  const agoraUsername = getAgoraUsernameFromTwitterUsername(handle);

  const proposalQuery = useCommandQuery({
    command: new GetAgoraProposalsCommand({
      limit: 10,
      offset: 0,
    }),
    enabled: agoraUsername ? agoraUsername.length > 0 : false,
  });

  if (!proposalQuery.data || !proposalQuery.data[0] || !agoraUsername) {
    return null;
  }

  return <Proposal data={proposalQuery.data[0]} className="fixed top-20" />;
};
