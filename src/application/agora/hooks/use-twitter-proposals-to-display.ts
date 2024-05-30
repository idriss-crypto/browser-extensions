import { useMemo } from 'react';

import { useCommandQuery } from 'shared/messaging';

import { GetAgoraProposalsCommand } from '../commands';

import { useTwitterVisibleAgoraNodes } from './use-twitter-visible-agora-nodes';

interface Properties {
  hidden: string[];
}

export const useTwitterProposalsToDisplay = ({ hidden }: Properties) => {
  const { visibleAgoraNodes } = useTwitterVisibleAgoraNodes({
    hidden,
  });

  const proposalsQuery = useCommandQuery({
    command: new GetAgoraProposalsCommand({
      limit: 10,
      offset: 0,
    }),
    placeholderData: (previousData) => {
      return previousData;
    },
  });

  const proposalsToDisplay = useMemo(() => {
    return visibleAgoraNodes
      .map((agoraNode) => {
        const data = proposalsQuery.data?.find((proposal) => {
          return proposal.proposerAddress === agoraNode.username;
        });

        if (!data) {
          return;
        }

        return { data, top: agoraNode.top };
      })
      .filter(Boolean);
  }, [proposalsQuery.data, visibleAgoraNodes]);

  return { proposalsToDisplay };
};
