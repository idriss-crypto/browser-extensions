import { useEffect, useState } from 'react';

import { useCommandQuery } from 'shared/messaging';

import { getAgoraUsernameFromTwitterUsername } from '../utils';
import { GetAgoraProposalsCommand } from '../commands';
import { ProposalData } from '../types';

import { Proposal } from './proposal';

interface Properties {
  handle: string;
}

export const ProposalHandleContainer = ({ handle }: Properties) => {
  const [currentProposalIndex, setCurrentProposalIndex] = useState(0);
  const [currentProposal, setCurrentProposal] = useState<ProposalData>();

  const agoraUsername = getAgoraUsernameFromTwitterUsername(handle);
  const proposalQuery = useCommandQuery({
    command: new GetAgoraProposalsCommand({
      limit: 1,
      offset: currentProposalIndex,
    }),
    enabled: agoraUsername ? agoraUsername.length > 0 : false,
  });

  const isPreviousProposalAvailable = currentProposalIndex > 0;
  const isNextProposalAvailable = Boolean(
    proposalQuery.data?.metadata.has_next,
  );

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

  useEffect(() => {
    const proposalResponse = proposalQuery.data?.proposals?.at(0);
    if (proposalResponse) {
      setCurrentProposal(proposalResponse);
    }
  }, [proposalQuery.data?.proposals]);

  if (!currentProposal || !agoraUsername) {
    return null;
  }

  return (
    <Proposal
      isPreviousProposalAvailable={isPreviousProposalAvailable}
      isNextProposalAvailable={isNextProposalAvailable}
      onNext={showNextProposal}
      onPrevious={showPreviousProposal}
      isLoading={proposalQuery.isLoading}
      data={currentProposal}
      className="fixed top-20"
    />
  );
};
