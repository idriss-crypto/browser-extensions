import { useMemo } from 'react';

import { useCommandQuery } from 'shared/messaging';

import { GetProposalsCommand } from '../commands';

import { useTwitterVisibleTallyUsersNodes } from './use-twitter-visible-tally-users-nodes';

interface Properties {
  hidden: string[];
}

export const useTwitterProposalsToDisplay = ({ hidden }: Properties) => {
  const { visibleTallys, visibleTallysNames } =
    useTwitterVisibleTallyUsersNodes({
      hidden,
    });

  const proposalsQuery = useCommandQuery({
    command: new GetProposalsCommand({
      tallyUserIds: visibleTallysNames.sort(),
    }),
    placeholderData: (previousData) => {
      return previousData;
    },
  });

  const proposalsToDisplay = useMemo(() => {
    return visibleTallys
      .map((tallyNode) => {
        const data = proposalsQuery.data?.find((proposal) => {
          return proposal.space.id === tallyNode.name;
        });

        if (!data) {
          return;
        }

        return { data, top: tallyNode.top };
      })
      .filter(Boolean);
  }, [proposalsQuery.data, visibleTallys]);

  return { proposalsToDisplay };
};
