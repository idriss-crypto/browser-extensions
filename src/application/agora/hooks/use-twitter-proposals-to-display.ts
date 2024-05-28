import { useMemo } from 'react';

import { useCommandQuery } from 'shared/messaging';

import { GetAgoraProposalsCommand } from '../commands';

import { useTwitterVisibleAgoraNodes } from './use-twitter-visible-agora-nodes';

interface Properties {
  hidden: string[];
}

export const useTwitterProposalsToDisplay = ({ hidden }: Properties) => {
  const { visibleAgoraNodes, visibleAgoraUsernames } =
    useTwitterVisibleAgoraNodes({
      hidden,
    });

  const proposalsQuery = useCommandQuery({
    command: new GetAgoraProposalsCommand({
      agoraUsernames: visibleAgoraUsernames.sort(),
    }),
    placeholderData: (previousData) => {
      return previousData;
    },
  });

  const proposalsToDisplay = useMemo(() => {
    return visibleAgoraNodes
      .map((agoraNode) => {
        const data = proposalsQuery.data?.find((proposal) => {
          return proposal.author.address === agoraNode.username;
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
