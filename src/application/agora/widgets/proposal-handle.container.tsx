import { useState } from 'react';

import { useCommandQuery } from 'shared/messaging';

import { getAgoraUsernameFromTwitterUsername } from '../utils';
import { GetAgoraProposalsCommand } from '../commands';

import { Proposal } from './proposal';

interface Properties {
  handle: string;
}

export const ProposalHandleContainer = ({ handle }: Properties) => {
  const [currentProposalIndex, setCurrentProposalIndex] = useState<number>(0);

  const agoraUsername = getAgoraUsernameFromTwitterUsername(handle);
  const proposalQuery = useCommandQuery({
    command: new GetAgoraProposalsCommand({
      limit: 1,
      offset: currentProposalIndex,
    }),
    enabled: agoraUsername ? agoraUsername.length > 0 : false,
  });
  const currentProposal = proposalQuery.data?.proposals?.at(0);
  const isPreviousProposalAvailable = currentProposalIndex > 0;
  const isNextProposalAvailable = Boolean(
    proposalQuery.data?.metadata.has_next,
  );

  console.log('proposalQuery', proposalQuery);

  const showPreviousProposal = () => {
    if (!isPreviousProposalAvailable) {
      return;
    }

    setCurrentProposalIndex((previous) => {
      return previous - 1;
    });
  };

  const showNextProposal = () => {
    if (!isNextProposalAvailable) {
      return;
    }

    setCurrentProposalIndex((previous) => {
      return previous + 1;
    });
  };

  if (!currentProposal || !agoraUsername) {
    return null;
  }

  return (
    <Proposal
      isPreviousProposalAvailable={isPreviousProposalAvailable}
      isNextProposalAvailable={isNextProposalAvailable}
      showNextProposal={showNextProposal}
      showPreviousProposal={showPreviousProposal}
      data={currentProposal}
      className="fixed top-20"
    />
  );
};
