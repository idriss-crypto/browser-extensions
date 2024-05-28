import { useCommandQuery } from 'shared/messaging';

import { GetAgoraProposalCommand } from '../commands';
import { getAgoraUsernameFromTwitterUsername } from '../utils';

import { Proposal } from './proposal';

interface Properties {
  handle: string;
}

export const ProposalHandleContainer = ({ handle }: Properties) => {
  const agoraUsername = getAgoraUsernameFromTwitterUsername(handle);

  const proposalQuery = useCommandQuery({
    command: new GetAgoraProposalCommand({
      agoraUsername: agoraUsername ?? '',
    }),
    enabled: agoraUsername ? agoraUsername.length > 0 : false,
  });

  if (!proposalQuery.data || !agoraUsername) {
    return null;
  }

  return <Proposal data={proposalQuery.data} className="fixed top-20" />;
};
